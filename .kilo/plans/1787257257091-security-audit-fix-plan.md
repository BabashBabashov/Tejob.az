# Tejob.az — Tam Audit Həll Planı

UI və Backend pozulmadan, sıra ilə, hər addım test olunaraq.

---

## Mərhələ 1 — Kritik Təhlükəsizlik

### 1.1 JWT mandatory et (K1)
**Fayl:** `src/lib/auth.ts` sətir 6
- `const JWT_SECRET = process.env.JWT_SECRET || "tejob-secret"` → `const JWT_SECRET = process.env.JWT_SECRET`
- Əgər `JWT_SECRET` yoxdursa, server başlanarkən xəta versin
- **Test:** `.env`-dən `JWT_SECRET` sil, serveri yenidən başlat — xəta verməlidir

### 1.2 View endpoint rate limiting (K2)
**Fayl:** `src/app/api/jobs/[slug]/view/route.ts`
- Sadə in-memory rate limit: `Map<string, number[]>` — IP → timestamp array
- 1 IP-dən 1 saatda max 5 view
- Məhdudiyyət aşıldıqda 429 qaytar
- **Test:** Bircə POST 5 dəfə göndər, 6-cı 429 qaytarmalıdır

### 1.3 Subscribe rate limiting (K3)
**Fayl:** `src/app/api/subscribe/route.ts`
- Eyni in-memory rate limit patterni: 1 IP-dən 1 saatda max 3 abunəlik
- 409 error-da email-i göstərmə, sadəcə "Bu email artıq abunədir" qaytar
- **Test:** 3 dəfə abunə ol, 4-cü 429 qaytarmalıdır

### 1.4 `.env.example` yarat (K4)
- `.env.example` faylı yarat (dəyərlər olmadan, yalnız açar adları)
- `.gitignore` artıq `.env*` ehtiva edir — yoxla, doğru işləyir ✅
- **Test:** `git status` — `.env` committed olmamalıdır

### 1.5 Middleware yarat (K5)
**Yeni fayl:** `src/middleware.ts`
- `/api/admin/*` və `/api/upload` üçün JWT cookie yoxlaması
- Token yoxsa 401 qaytar
- `requireAuth()` artıq hər route-da çağırılmasa da, middleware qoruyur
- **Test:** Cookie olmadan `/api/admin/jobs` GET → 401 qaytarmalıdır

---

## Mərhələ 2 — Yüksək Təhlükəsizlik

### 2.1 Cookie sameSite "strict" (Y1 qismən)
**Fayl:** `src/lib/auth.ts` sətir 35
- `sameSite: "lax"` → `sameSite: "strict"`
- Bu CSRF riskini əhəmiyyətli dərəcədə azaldır
- **Test:** Admin paneli işləyir — login, elan yaratma, redaktə

### 2.2 JWT expiration-i azalt (Y2)
**Fayl:** `src/lib/auth.ts` sətir 23
- `{ expiresIn: "7d" }` → `{ expiresIn: "24h" }`
- 24 saatdan sonra token keçərsizləşir, yenidən login tələb olunur
- **Test:** Login ol, 1 saniyə gözlə, səhifəni yenilə — işləyir. 24h sonra keçərsiz olacaq

### 2.3 `views` sahəsini update schema-dan çıxar (Y3)
**Fayllar:**
- `src/app/api/admin/jobs/route.ts` — `jobSchema`-dan `views: z.number().int().default(0)` sil
- `src/app/api/admin/jobs/[id]/route.ts` — `jobUpdateSchema`-dan `views: z.number().int().optional()` sil
- `src/app/api/admin/jobs/route.ts` POST handler-da `views: validated.views` → `views: 0`
- `src/app/api/admin/jobs/[id]/route.ts` PUT handler-da `if (typeof validated.views...)` blokunu sil
- **Test:** Admin formda views sahəsi görünməməlidir. Yeni elan 0 view ilə yaranmalıdır

### 2.4 Upload MIME type yoxlaması (Y4)
**Fayl:** `src/app/api/upload/route.ts`
- `file.type` yoxlaması əlavə et: `image/jpeg`, `image/png` icazə ver
- MIME type sniffing: buffer-ın ilk 4 byte-ına bax (JPEG: `FF D8 FF`, PNG: `89 50 4E 47`)
- **Test:** `malware.exe` adlı faylı `.png` uzantısı ilə yüklə — rədd edilməlidir

### 2.5 Description max length (Y5)
**Fayllar:**
- `src/app/api/admin/jobs/route.ts` — `description: z.string().min(10)` → `z.string().min(10).max(5000)`
- `src/app/api/admin/jobs/[id]/route.ts` — eyni
- `src/app/api/admin/companies/route.ts` — `description: z.string().min(10)` → `z.string().min(10).max(2000)`
- **Test:** 5001 simvol description ilə elan yarat — xəta qaytarmalıdır

### 2.6 Premium expiration hər yerdə (Y6 + Y7)
**Fayl:** `src/lib/api.ts` — köməkçi funksiya yarat:
```ts
function computePremium(job: any, now: Date) {
  return job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now;
}
function expiresFilter(now: Date) {
  return { OR: [{ expiresAt: null }, { expiresAt: { gte: now } }] };
}
```
- `getJobBySlug` — `expiresFilter` + `computePremium` əlavə et
- `getCompanyBySlug` — job-lara `expiresFilter` + `computePremium` əlavə et
- `getRegionBySlug` — eyni
- `getCategoryBySlug` — eyni
- **Test:** `/elanlar/[slug]`, `/sirketler/[slug]`, `/rayonlar/[slug]` — passive elanlar görünməməlidir

### 2.6.1 `getPositions`/`getSectors` expired job count (Y7 əlavə)
**Fayl:** `src/lib/api.ts`
- `_count: { select: { jobs: true } }` → `_count: { select: { jobs: { where: { OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }] } } } }`
- **Test:** Sidebar-da vəzifə/sektor sayı düzgün olmalıdır

### 2.7 Infinite scroll page reset (Y8)
**Fayl:** `src/app/HomeClient.tsx`
- Filter dəyişəndə `page`-i 1-ə reset et
- `allJobs`-ı `initialJobs` ilə yenidən yüklə
- **Test:** Səhifəni aşağı sürüşdür → filter tətbiq et → filter təmizlə → yeni elanlar görünməlidir

### 2.8 DOMPurify (Y9)
- `npm install dompurify @types/dompurify`
- `src/lib/sanitize.ts` yarat — `sanitize(html: string): string` wrapper
- `dangerouslySetInnerHTML` istifadə olunan 5 faylda sanitize et:
  - `src/app/niye-biz/page.tsx`
  - `src/app/elaqe/page.tsx`
  - `src/app/sertler/page.tsx`
  - `src/app/is-elani-yerlesdir/page.tsx`
  - `src/app/layout.tsx`
- **Test:** Səhifələr əvvəlki kimi görünməlidir

### 2.9 Error handler təmizlənməsi (Y10)
**Fayl:** `src/app/api/admin/companies/route.ts` sətir 58-63
- `message: error instanceof Error ? error.message : "Unknown error"` → sil
- Yalnız umumi error message qaytar
- **Test:** Server error — client-ə "Şirkət əlavə edilərkən xəta baş verdi" görünməlidir

---

## Mərhələ 3 — Kod Keyfiyyəti

### 3.1 Custom UnauthorizedError (O1)
**Yeni fayl:** `src/lib/errors.ts`
```ts
export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
```
**Fayl:** `src/lib/auth.ts`
- `throw new Error("Unauthorized")` → `throw new UnauthorizedError()`
**Bütün admin route-lar:**
- `error instanceof Error && error.message === "Unauthorized"` → `error instanceof UnauthorizedError`
- **Test:** Login olmadan admin API çağır — 401 qaytarmalıdır

### 3.2 `createdAt` time-itini saxla (O4)
**Fayl:** `src/lib/api.ts`
- `createdAt: job.createdAt.toISOString().split("T")[0]` → `createdAt: job.createdAt.toISOString()`
- **Test:** Elanlar düzgün tarixlərlə sıralanmalıdır

### 3.3 Duplicate `formatDate` (O6)
**Fayl:** `src/lib/api.ts` — `formatDate` funksiyasını sil
- Bütün `api.ts` istifadəçiləri `utils.ts`-dən `formatDate` import etsin
- **Test:** Tarix formatı əvvəlki kimi görünməlidir

### 3.4 Bookmarks shared utility (O7)
**Yeni fayl:** `src/lib/bookmarks.ts`
- `getBookmarks()`, `toggleBookmark(id)`, `isBookmarked(id)` — shared
- `JobCard.tsx` və `JobDetailPanel.tsx` — import et, duplicate sil
- **Test:** Ulduz icon hər iki yerdə işləyir

### 3.5 HomeClient memoization (O8, O9)
**Fayl:** `src/app/HomeClient.tsx`
- `detailPanel` → `useMemo` ilə sabitləşdir
- `allJobs.map(j => j.title)` → `useMemo` ilə sabitləşdir
- **Test:** Performance yaxşılaşır, UI eyni görünür

### 3.6 Race condition fixes (O11, O12, O13)
**Fayl:** `src/app/HomeClient.tsx`
- `page` → `useRef` ilə track et, closure stale olmasın
- `loadMore` debounce əlavə et

**Fayl:** `src/components/JobDetailPanel.tsx`
- `otherJobs` fetch üçün `AbortController` əlavə et
- View count fetch üçün `AbortController` + cleanup
- **Test:** Sürətli klikləmələrdə düzgün işləyir

### 3.7 `isPremium` type fix (O10, O14)
**Fayl:** `src/lib/api.ts`
- `isPremium: job.isPremium && ...` → `isPremium: !!(job.isPremium && job.premiumExpiresAt && new Date(job.premiumExpiresAt) > now)`
- **Test:** Premium badge düzgün görünür

### 3.8 page.tsx try-catch (O15)
**Fayl:** `src/app/page.tsx`
- `Promise.all`-a `try/catch` əlavə et
- Xəta halında sadə error page qaytar
- **Test:** DB xətası → qırılmır, error görünür

### 3.9 Error messages təmizlənməsi (Y10 tam)
**Bütün admin route-lar:**
- `error.message` client-ə qaytarılmamalıdır
- Yalnız umumi mesajlar: "Xəta baş verdi"
- Detail logs-da qalır
- **Test:** DB xətası → client-ə "Xəta baş verdi" görünür

---

## Validasiya Sırası

Hər mərhələ tamamlandıqdan sonra:
1. `npx next build` — TypeScript xətası yoxdur
2. `npm run dev` — server başlanır
3. `http://localhost:3000` — ana səhifə açılır, elanlar görünür
4. `http://localhost:3000/admin/login` — login işləyir
5. `http://localhost:3000/admin` — admin panel açılır
6. Yeni elan yaratma — form işləyir
7. Elan redaktə — form işləyir
8. Şirkət yaratma — form işləyir
9. View endpoint — rate limiting işləyir
10. Subscribe — rate limiting işləyir
11. Infinite scroll — aşağı sürüşdürmə işləyir
12. Mobil görünüş — filterlər düzgün responsive
