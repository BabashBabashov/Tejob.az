# Tejob.az - Sayt Təhlili və Düzəlişlər Planı

## Mövcud Vəziyyət Təhlili

Kod bazası tam təhlil edildi. Aşağıdakı məsələlər müəyyən edildi:

### Artıq İşləyən (Dəyişiklik Tələb Etmir)
- Şirkət formunda logo yükləmə (upload) funksiyası artıq var, JPG/JPEG/PNG dəstəkləyir
- Şirkət formunda banner yükləmə artıq var
- Vəzifə adı autocomplete (təklif) sistemi artıq işləyir (`/api/positions?q=`)
- Sektor adı autocomplete sistemi artıq işləyir (`/api/sectors?q=`)
- Vəzifə avtomatik yaratma (findOrCreatePosition) artıq işləyir
- Sektor avtomatik yaratma (findOrCreateSector) artıq işləyir
- Şirkət seçildikdə telefon/poçt avtomatik dolur (yaratma zamanı)
- Defoult əmək haqqı "Razılaşma yolu ilə" artıq var
- `showViews` defoult olaraq `true`-dur
- 3 sütunlu layout artıq mövcuddur (sol kateqoriya, orta elan siyahısı, sağ detail panel)
- Şirkət səhifəsində banner artıq göstərilir
- "Şirkətin digər elanları" düyməsi artıq var

### Tələb Olunan Düzəlişlər (9 əsas məsələ)

---

## Düzəliş 1: Seçilmiş Elanlar - Bookmark Toggle

**Məsələ:** `JobCard.tsx`-dəki Star (ulduz) düyməsinin `onClick` handler-i yoxdur. İstifadəçilər elanları "Seçilmişlər" əlavə edə bilmirlər.

**Həll:**
- `JobCard.tsx` faylında Star düyməsinə `onClick` əlavə et
- `localStorage`-da `bookmarkedJobs` (array of job IDs) saxla
- Toggle məntiqi: əgər ID artıq varsa sil, yoxdursa əlavə et
- Seçilmiş elanlarda Star ikonu doldurulmuş (filled) görünsün
- Bookmark səhifəsində (`secilmis-elanlar/page.tsx`) real-vaxtda yenilənmə

**Fayllar:** `src/components/JobCard.tsx`

---

## Düzəliş 2: Baxış Sayı - Public Saytda Göstərilmə

**Məsələ:** İstifadəçi bildirir ki, baxış sayı ancaq admin paneldə göstərilir, saytda yox.

**Təhlil:** Kodda `JobCard.tsx` (sətir 83-88) və `JobDetailPanel.tsx` (sətir 97-102) baxış sayını `job.showViews`-a əsasən göstərir. Bu artıq işləməlidir. Ancaq `/api/jobs` endpointində `showViews` və `views` sahələrinin dəqiq qaytarıldığını yoxlamaq lazımdır.

**Həll:**
- `/api/jobs` GET endpointində `showViews` və `views` sahələrinin daxil edildiyini təmin et (Prisma scalar field-lər avtomatik qaytarılır, amma verify edilməlidir)
- Baxış sayı defoult olaraq göstərilsin (`showViews: true`)
- `Views` input-u (elle reqem girmə) yaratma zamanı da göstərilsin (indi ancaq redaktə zamanı göstərilir) -ancaq bu mənasızdır, yeni elan 0 baxışla başlamalıdır. **Mövcud davranış düzgündür.**
- Admin paneldə toggle düyməsi (Eye/EyeOff) hər elan üçün fərdi işləyir - bu artıq düzgündür

**Fayllar:** `src/app/api/jobs/route.ts` (əgər lazımdırsa)

---

## Düzəliş 3: Kateqoriyalar/Vəzifələr - Struktur Yenilənməsi

**Məsələ:** İstifadəçi təsvir edir ki, sol menyu "Vəzifələr" bölməsində vəzifə adları + elan sayı göstərilməlidir. Bu artıq işləyir.

**Əlavə olaraq:**
- Şirkət formunda ("CompanyForm.tsx") sektor sahəsinə autocomplete əlavə et (indi sadə text input-dur, `JobForm`-dakı kimi)

**Fayllar:** `src/app/admin/CompanyForm.tsx`

---

## Düzəliş 4: Şirkət Formunda Sektor Autocomplete

**Məsələ:** `CompanyForm.tsx`-də sektor sahəsi sadə text input-dur. `JobForm.tsx`-dəki kimi autocomplete olmalıdır.

**Həll:**
- `CompanyForm.tsx`-ə autocomplete əlavə et (eyni məntiq: `/api/sectors?q=` ilə təkliflər)
- Sektor adı yazanda dropdown suggestion çıxsın

**Fayllar:** `src/app/admin/CompanyForm.tsx`

---

## Düzəliş 5: Şirkət Səhifəsi - LinkedIn Stili Banner+Logo

**Məsələ:** Şirkət detallarında logo banner-in üstündə qalmalıdır (LinkedIn stili).

**Həll:**
- `sirketler/[slug]/page.tsx` - banner alt-üst overlay layout yenilə
- Logo banner-in aşağı hissəsinə yerləşdirilməli (translate-y ilə overlap)
- `CompanyDetailPanel.tsx` - eyni dəyişiklik

**Fayllar:** `src/app/sirketler/[slug]/page.tsx`, `src/components/CompanyDetailPanel.tsx`

---

## Düzəliş 6: JobCard `onSelect` Prop Səhvi

**Məsələ:** Bir çox səhifədə `JobCard`-a `onSelect` prop-u keçirilir, amma `JobCard` `onSelectJob` prop-u gözləyir. Bu səbəbdən elanlara kliklədikdə sağ paneldə açılmır.

**Səhv olan fayllar:**
- `src/app/vezifeler/[slug]/VezifeClient.tsx` (sətir 43): `onSelect={setSelectedJob}` → `onSelectJob={setSelectedJob}`
- `src/app/sektorlar/[slug]/SektorClient.tsx` (sətir 43): eyni səhv
- `src/app/kateqoriya/[slug]/KateqoriyaClient.tsx` (sətir 52): eyni səhv
- `src/app/secilmis-elanlar/page.tsx` (sətir 71): eyni səhv

**Həll:** Bütün bu fayllarda `onSelect`-i `onSelectJob` ilə dəyiş.

**Fayllar:** Yuxarıda göstərilən 4 fayl

---

## Düzəliş 7: Ölü Kod Təmizlənməsi

**Məsələ:** `admin/page.tsx` (sətir 24-28) `job.requirements`-ı JSON.parse etməyə çalışır, amma `requirements` sahəsi Prisma sxemində yoxdur.

**Həll:** Bu dead code-u sil.

**Fayllar:** `src/app/admin/page.tsx`

---

## Düzəliş 8: Şirkətlər Səhifəsində Company Detail Panelə Klikləmə

**Məsələ:** `SirketlarClient.tsx`-də şirkət kartlarına kliklədikdə sağ paneldə açılır. Bu artıq düzgün işləyir. Ancaq `ListingLayout`-a `onSelectJob` prop-u keçirilmir (şirkətlər üçün lazım deyil, şirkətlər öz state idarə edir).

**Mövcud davranış düzgündür, dəyişiklik lazım deyil.**

---

## Düzəliş 9: Şəxsi Elanlar (Təcrübə Proqramı / Qadın İşləri)

**Məsələ:** Admin paneldə bu选项lar artıq mövcuddur (`isInternship`, `isWomenOnly` checkbox-ları `JobForm.tsx`-də). İstifadəçi deyir ki, bu seçimlər `secilmis-elanlar` bölməsində də görünməlidir.

**Mövcud davranış:** `JobForm.tsx`-də hər iki checkbox var. `secilmis-elanlar` səhifəsi localStorage-based bookmark-ları göstərir. Seçilmiş elanlar bölməsində filter option-ları yoxdur - bu normaldır, çünki istifadəçinin öz seçimi olan elanlar göstərilir.

**Dəyişiklik lazım deyil.**

---

## Düzəliş 10: "Razılaşma yolu ilə" Defoult

**Mövcud davranış:** `JobForm.tsx` sətir 56: `salary: job?.salary || "Razılaşma yolu ilə"` - artıq defoult olaraq bu dəyər gəlir.

**Dəyişiklik lazım deyil.**

---

## Düzəliş 11: İş Qrafiki Seçimləri

**Mövcud seçimlər:** "Tam ştat", "Yarımştat", "Uzaqdan", "Növbəli", "Frilans"
- "Təcrübə" sözü yoxdur → artıq silinib
- "Hissevi" sözü yoxdur, "Yarımştat" var → artıq dəyişdirilib

**Dəyişiklik lazım deyil.**

---

## Düzəliş 12: Elan Yerləşdirmə - Tələblər Bölməsi

**Mövcud vəziyyət:** `JobForm.tsx`-də "Tələblər" adlı ayrı sahə yoxdur. Yalnız "İş haqqında" (description) sahəsi var. Bu artıq düzgündür.

**Dəyişiklik lazım deyil.**

---

## İcra Planı

### Addım 1: Bookmark Toggle (JobCard.tsx)
- Star düyməsinə `onClick` handler əlavə et
- `localStorage` CRUD məntiqi
- Doldurulmuş/göyüşmüş Star vizual fərqi

### Addım 2: `onSelect` → `onSelectJob` Dəyişikliyi
- 4 faylda prop adını düzəlt (VezifeClient, SektorClient, KateqoriyaClient, BookmarkedJobsPage)

### Addım 3: CompanyForm Sektor Autocomplete
- `CompanyForm.tsx`-ə `/api/sectors?q=` autocomplete sistemi əlavə et
- Eyni UX: text input + dropdown təkliflər

### Addım 4: LinkedIn Stili Şirkət Səhifəsi
- `sirketler/[slug]/page.tsx`: banner + logo overlap layout
- `CompanyDetailPanel.tsx`: eyni layout yenilənməsi

### Addım 5: Dead Code Təmizlənməsi
- `admin/page.tsx`: `job.requirements` JSON.parse sil

### Addım 6: Verify & Test
- `npm run build` ilə build yoxla
- Bütün dəyişikliklərin mövcud kodla uyğunluğunu təmin et

---

## Risk Qiymətləndirməsi

- **Dəyişiklik 1 (Bookmark):** Təhlükəsiz - localStorage-based, backend tələb etmir
- **Dəyişiklik 2 (onSelect):** Təhlükəsiz - sadəcə prop adı dəyişikliyi
- **Dəyişiklik 3 (Sektor Autocomplete):** Düşük risk - `/api/sectors` artıq mövcuddur
- **Dəyişiklik 4 (LinkedIn layout):** Orta risk - CSS dəyişiklikləri, vizual test lazımdır
- **Dəyişiklik 5 (Dead code):** Təhlükəsiz - dead code silinir

---

## Doğrulama

1. `npm run build` - Build uğurlu olmalıdır
2. Şirkət yaratma səhifəsində logo yükləmə testi
3. Şirkət yaratma səhifəsində sektor autocomplete testi
4. Elan səhifəsində Star düyməsi ilə bookmark toggle testi
5. Seçilmiş elanlar səhifəsində bookmark-ların görünməsi
6. Vəzifələr/Sektorlar/Kateqoriya səhifələrində elana kliklədikdə sağ paneldə açılması
7. Şirkət səhifəsində LinkedIn stili banner+logo görünüşü
