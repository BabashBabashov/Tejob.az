import { Company, Region, Category, Job, SocialLink, PageContent } from "./types";

export const companies: Company[] = [
  {
    id: "c1",
    slug: "oba-marketler",
    name: "OBA marketlər şəbəkəsi",
    logo: "/logo.png",
    sector: "Retail / Satış",
    description: "Azərbaycanın ən böyük marketlər şəbəkələrindən biri.",
    email: "hr@oba.az",
    phone: "+994 12 123 45 67",
  },
  {
    id: "c2",
    slug: "milla-dairy",
    name: "Milla Dairy",
    logo: "/logo.png",
    sector: "İstehsal / Qida",
    description: "Süd və süd məhsulları istehsalçısı.",
    email: "career@milla.az",
    phone: "+994 12 234 56 78",
  },
  {
    id: "c3",
    slug: "az-innovations",
    name: "AZ Innovations",
    logo: "/logo.png",
    sector: "İnformasiya Texnologiyaları",
    description: "Yerli IT şirkəti, proqram təminatı və konsaltinq xidmətləri.",
    email: "jobs@azinnovations.az",
    phone: "+994 55 345 67 89",
  },
  {
    id: "c4",
    slug: "baku-construction",
    name: "Baku Construction",
    logo: "/logo.png",
    sector: "Tikinti",
    description: "Tikinti və infrastruktur layihələri üzrə iri şirkət.",
    email: "info@bakuc.az",
    phone: "+994 55 456 78 90",
  },
  {
    id: "c5",
    slug: "medlife-clinic",
    name: "MedLife Clinic",
    logo: "/logo.png",
    sector: "Tibb",
    description: "Müasir tibb mərkəzi.",
    email: "hr@medlife.az",
    phone: "+994 55 567 89 01",
  },
];

export const regions: Region[] = [
  { id: "r1", slug: "baki", name: "Bakı" },
  { id: "r2", slug: "sumqayit", name: "Sumqayıt" },
  { id: "r3", slug: "ganja", name: "Gəncə" },
  { id: "r4", slug: "salyan", name: "Salyan" },
  { id: "r5", slug: "absheron", name: "Abşeron" },
  { id: "r6", slug: "mingecevir", name: "Mingəçevir" },
  { id: "r7", slug: "lenkeran", name: "Lənkəran" },
  { id: "r8", slug: "seki", name: "Şəki" },
];

export const categories: Category[] = [
  { id: "cat1", slug: "vakansiyalar", name: "Vakansiyalar", type: "position" },
  { id: "cat2", slug: "vezifeler", name: "Vəzifələr", type: "position" },
  { id: "cat3", slug: "sektorlar", name: "Sektorlar", type: "sector" },
  { id: "cat4", slug: "sirketler", name: "Şirkətlər", type: "sector" },
  { id: "cat5", slug: "rayonlar", name: "Rayonlar", type: "sector" },
  { id: "cat6", slug: "qadin-isleri", name: "Qadın işləri", type: "women" },
  { id: "cat7", slug: "tecrube-proqramlari", name: "Təcrübə Proqramları", type: "internship" },
  { id: "cat8", slug: "secilmis-elanlar", name: "Seçilmiş elanlar", type: "position" },
];

export const jobs: Job[] = [
  {
    id: "j1",
    slug: "maltozlayan-servis-movcuddur",
    title: "Maltoplayan - Servis mövcuddur",
    companyId: "c1",
    regionId: "r1",
    categoryIds: ["cat1", "cat2"],
    description:
      "OBA marketlər şəbəkəsinin Bakı şəhərindəki hipermarketlərinə maltoplayan tələb olunur. İş yeri xidməti mövcuddur.",
    requirements: [
      "Yaş həddi: 20-45",
      "Əlaqəli sahədə təcrübə arzuolunandır",
      "Dəqiqlik və məsuliyyətli yanaşma",
    ],
    salary: "600 - 800 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-15",
    contactPhone: "+994 55 111 22 33",
    isPremium: true,
    views: 371,
    createdAt: "2026-08-10",
  },
  {
    id: "j2",
    slug: "anbar-fehlesi-salyan",
    title: "Anbar fəhləsi - Salyan",
    companyId: "c1",
    regionId: "r4",
    categoryIds: ["cat1", "cat2"],
    description:
      "Salyan rayonunda yerləşən anbar kompleksimizdə anbar fəhləsi vəzifəsinə işçi tələb olunur.",
    requirements: [
      "Fiziki hazırlıq",
      "Anbar işlərində təcrübə arzuolunandır",
      "Salyan və ətraf rayonlarda yaşayanlar üçün üstünlük",
    ],
    salary: "500 - 650 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-10",
    contactPhone: "+994 55 111 22 33",
    isPremium: true,
    views: 72,
    createdAt: "2026-08-10",
  },
  {
    id: "j3",
    slug: "keyfiyyete-nezaret-uzre-mutexessis",
    title: "Keyfiyyətə nəzarət üzrə mütəxəssis",
    companyId: "c1",
    regionId: "r1",
    categoryIds: ["cat1", "cat2"],
    description:
      "OBA marketlər şəbəkəsində keyfiyyətə nəzarət bölməsinə mütəxəssis tələb olunur.",
    requirements: [
      "Ali təhsil (istehsalat/istehsalat menecmenti üzrə üstünlük)",
      "Əlaqəli sahədə minimum 2 illik təcrübə",
      "MS Office proqramlarını bilmək",
    ],
    salary: "900 - 1200 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-20",
    contactPhone: "+994 55 111 22 33",
    isPremium: true,
    views: 142,
    createdAt: "2026-08-10",
  },
  {
    id: "j4",
    slug: "elektrik-muhendisi-uzre-texnik",
    title: "Elektrik mühəndisi üzrə texnik",
    companyId: "c2",
    regionId: "r5",
    categoryIds: ["cat1", "cat3"],
    description:
      "Milla Dairy-nin Abşeron ərazisindəki istehsalat müəssisəsinə elektrik mühəndisliyi üzrə texnik tələb olunur.",
    requirements: [
      "Texniki təhsil",
      "Sənaye elektriki sahəsində təcrübə",
      "Avadanlıqların quraşdırılması və texniki xidməti",
    ],
    salary: "1000 - 1400 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-18",
    contactPhone: "+994 55 222 33 44",
    isPremium: false,
    views: 130,
    createdAt: "2026-08-09",
  },
  {
    id: "j5",
    slug: "tehlukesizlik-emekdasi",
    title: "Təhlükəsizlik əməkdaşı",
    companyId: "c1",
    regionId: "r1",
    categoryIds: ["cat1", "cat2"],
    description:
      "OBA marketlər şəbəkəsinin Bakı şəhərindəki obyektlərinə təhlükəsizlik əməkdaşı tələb olunur.",
    requirements: [
      "Yaş həddi: 22-45",
      "Fiziki hazırlıq",
      "Oxşar vəzifədə təcrübə arzuolunandır",
    ],
    salary: "550 - 750 AZN",
    workType: "Növbəli",
    deadline: "2026-09-12",
    contactPhone: "+994 55 111 22 33",
    isPremium: true,
    views: 416,
    createdAt: "2026-08-10",
  },
  {
    id: "j6",
    slug: "frontend-developer",
    title: "Frontend Developer (React)",
    companyId: "c3",
    regionId: "r1",
    categoryIds: ["cat1", "cat2", "cat3"],
    description:
      "AZ Innovations şirkətinin proqram təminatı komandasına React developer tələb olunur.",
    requirements: [
      "React, TypeScript bilikləri",
      "Tailwind CSS və ya oxşar CSS framework təcrübəsi",
      "REST API və Git bilikləri",
      "Minimum 2 illik təcrübə",
    ],
    salary: "1500 - 2500 AZN",
    workType: "Tam ştat / Uzaqdan",
    deadline: "2026-09-25",
    contactEmail: "jobs@azinnovations.az",
    isPremium: false,
    views: 210,
    createdAt: "2026-08-08",
  },
  {
    id: "j7",
    slug: "tikinti-fehlesi",
    title: "Tikinti fəhləsi",
    companyId: "c4",
    regionId: "r2",
    categoryIds: ["cat1", "cat2"],
    description:
      "Sumqayıtda yerləşən tikinti layihəmizə tikinti fəhləsi tələb olunur.",
    requirements: [
      "Fiziki hazırlıq",
      "Tikinti sahəsində təcrübə",
      "İş qrafikinə riayət etmək",
    ],
    salary: "700 - 900 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-05",
    contactPhone: "+994 55 333 44 55",
    isPremium: false,
    views: 98,
    createdAt: "2026-08-07",
  },
  {
    id: "j8",
    slug: "hemsire-qadin-isi",
    title: "Tibb bacısı",
    companyId: "c5",
    regionId: "r1",
    categoryIds: ["cat1", "cat6"],
    description:
      "MedLife Clinic-in Bakı şəhərindəki klinikasına tibb bacısı tələb olunur. Qadın namizədlər üçün əlverişli iş şəraiti.",
    requirements: [
      "Tibb təhsili",
      "Nursing sahəsində təcrübə",
      "Dəqiqlik və məsuliyyət",
    ],
    salary: "800 - 1100 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-22",
    contactPhone: "+994 55 444 55 66",
    isPremium: false,
    views: 156,
    createdAt: "2026-08-06",
  },
  {
    id: "j9",
    slug: "satis-meneceri-telebe",
    title: "Satış meneceri - Təcrübə proqramı",
    companyId: "c1",
    regionId: "r1",
    categoryIds: ["cat7"],
    description:
      "OBA marketlər şəbəkəsi tələbələr və yenicə məzun olmuşlar üçün satış üzrə təcrübə proqramı elan edir.",
    requirements: [
      "Universitet tələbəsi və ya son tədris ili",
      "Kommunikatİv bacarıqlar",
      "Yaradıcı düşüncə",
    ],
    salary: "500 AZN + bonus",
    workType: "Tam ştat",
    deadline: "2026-09-30",
    contactPhone: "+994 55 111 22 33",
    isPremium: false,
    views: 89,
    createdAt: "2026-08-05",
  },
  {
    id: "j10",
    slug: "muhasibat-uzre-isci",
    title: "Mühasibat üzrə işçi",
    companyId: "c3",
    regionId: "r1",
    categoryIds: ["cat1", "cat2"],
    description:
      "AZ Innovations şirkətinə mühasibat uçotu üzrə işçi tələb olunur.",
    requirements: [
      "Ali təhsil (iqtisadiyyat/mühasibatlıq)",
      "1C proqramını bilmək",
      "MS Excel bilikləri",
    ],
    salary: "900 - 1300 AZN",
    workType: "Tam ştat",
    deadline: "2026-09-15",
    contactEmail: "jobs@azinnovations.az",
    isPremium: true,
    views: 244,
    createdAt: "2026-08-10",
  },
];

export const socialLinks: SocialLink[] = [
  { name: "Telegram", url: "https://t.me/TEJob_LLC", color: "#0088cc" },
  { name: "WhatsApp", url: "https://whatsapp.com/channel/0029VafSTdhAYlUISg5om63z", color: "#25D366" },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/tejob-az", color: "#0A66C2" },
  { name: "Facebook", url: "https://www.facebook.com/tejob.az", color: "#1877F2" },
  { name: "Instagram", url: "https://www.instagram.com/tejob.az", color: "#E4405F" },
  { name: "TikTok", url: "https://www.tiktok.com/@tejob.az", color: "#000000" },
];

export const pageContents: Record<string, PageContent> = {
  "niye-biz": {
    title: "Niyə Biz",
    content: `
      <p>TEJOB platforması vasitəsilə 2021-ci ildən iş elanlarının paylaşılması xidməti göstərilir.</p>
      <p>Şirkətlərin və fərdi sahibkarların iş elanları tejob.az saytında, Telegram və WhatsApp kanallarında, TikTok, Facebook, Instagram və LinkedIn səhifələrində paylaşılır.</p>
      <p>Bizimlə əməkdaşlıq edərək vakansiyalarınızı geniş auditoriyaya çatdıra bilərsiniz.</p>
    `,
  },
  elaqe: {
    title: "Əlaqə Məlumatları",
    content: `
      <p><strong>E-mail ünvanı:</strong> info@tejob.az</p>
      <p><strong>Zəng / WhatsApp:</strong> +994 55 500 29 20</p>
      <p><strong>Ünvan:</strong> Bakı şəhəri, Nərimanov rayonu</p>
    `,
  },
  "is-elani-yerlesdir": {
    title: "İş elanı yerləşdir",
    content: `
      <p>İş elanı yerləşdirmək üçün elan təsvirini Word və ya PDF faylında info@tejob.az elektron poçt ünvanına göndərməyiniz xahiş olunur.</p>
      <p>İş elanı 30 gün ərzində saxlanılmaqla tejob.az saytında dərc edilir və tejob-un bütün sosial media səhifələrində paylaşılır.</p>
      <p>Əlaqə: info@tejob.az | +994 55 500 29 20</p>
    `,
  },
  sertler: {
    title: "Tejob Şərtlər",
    content: `
      <p><strong>Son yenilənmə tarixi:</strong> 01.09.2026</p>
      <p>Xahiş edirik tejob.az saytından istifadə etməzdən əvvəl Məxfilik Siyasəti və Xidmət Şərtlərini diqqətlə oxuyun.</p>
      <h3>Ümumi Məlumat</h3>
      <p>Tejob.az – iş elanlarının yayımını həyata keçirən onlayn platformadır. İş elanları Azərbaycan Respublikasında dövlət qeydiyyatına alınmış vergi ödəyicilərindən qəbul olunur və son istifadəçilərə təqdim edilir.</p>
      <h3>Məxfilik Siyasəti</h3>
      <p>Bu məxfilik siyasəti, Tejob.az veb-saytında şəxsi məlumatların toplanması, saxlanması və istifadəsi prosedurlarını izah edir.</p>
      <h3>Xidmət Şərtləri</h3>
      <p>İşəgötürən təqdim etdiyi məlumatların doğruluğuna zəmanət verir. Tejob yalnız elanların yayımlanması ilə məşğul olur və müraciət olub-olmamasına zəmanət vermir.</p>
    `,
  },
};
