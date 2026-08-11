module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/src/app/niye-biz/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhyUsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
;
;
const brandGradients = {
    Telegram: "bg-gradient-to-r from-sky-600 to-sky-400",
    WhatsApp: "bg-gradient-to-r from-emerald-700 to-emerald-500",
    LinkedIn: "bg-gradient-to-r from-blue-700 to-blue-500",
    Facebook: "bg-gradient-to-r from-blue-800 to-blue-600",
    Instagram: "bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600",
    TikTok: "bg-gradient-to-r from-black to-slate-800"
};
const brandIcons = {
    Telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
    WhatsApp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    TikTok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
};
function WhyUsPage() {
    const page = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["pageContents"]["niye-biz"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-3xl space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#1e293b]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100",
                        children: page.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/niye-biz/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prose prose-slate max-w-none dark:prose-invert",
                        dangerouslySetInnerHTML: {
                            __html: page.content
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/niye-biz/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/niye-biz/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#1e293b]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100",
                        children: "Bizi izləyin"
                    }, void 0, false, {
                        fileName: "[project]/src/app/niye-biz/page.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["socialLinks"].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: link.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: `flex items-center justify-between rounded-xl px-5 py-4 text-white shadow-lg transition-transform hover:-translate-y-0.5 ${brandGradients[link.name]}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium opacity-90",
                                                children: "Bizi izlə"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/niye-biz/page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg font-bold",
                                                children: link.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/niye-biz/page.tsx",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/niye-biz/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-10 w-10 opacity-90",
                                        fill: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: brandIcons[link.name]
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/niye-biz/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/niye-biz/page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, link.name, true, {
                                fileName: "[project]/src/app/niye-biz/page.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/niye-biz/page.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/niye-biz/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/niye-biz/page.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/niye-biz/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/niye-biz/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "companies",
    ()=>companies,
    "jobs",
    ()=>jobs,
    "pageContents",
    ()=>pageContents,
    "regions",
    ()=>regions,
    "socialLinks",
    ()=>socialLinks
]);
const companies = [
    {
        id: "c1",
        slug: "oba-marketler",
        name: "OBA marketlər şəbəkəsi",
        logo: "/logo.png",
        sector: "Retail / Satış",
        description: "Azərbaycanın ən böyük marketlər şəbəkələrindən biri.",
        email: "hr@oba.az",
        phone: "+994 12 123 45 67"
    },
    {
        id: "c2",
        slug: "milla-dairy",
        name: "Milla Dairy",
        logo: "/logo.png",
        sector: "İstehsal / Qida",
        description: "Süd və süd məhsulları istehsalçısı.",
        email: "career@milla.az",
        phone: "+994 12 234 56 78"
    },
    {
        id: "c3",
        slug: "az-innovations",
        name: "AZ Innovations",
        logo: "/logo.png",
        sector: "İnformasiya Texnologiyaları",
        description: "Yerli IT şirkəti, proqram təminatı və konsaltinq xidmətləri.",
        email: "jobs@azinnovations.az",
        phone: "+994 55 345 67 89"
    },
    {
        id: "c4",
        slug: "baku-construction",
        name: "Baku Construction",
        logo: "/logo.png",
        sector: "Tikinti",
        description: "Tikinti və infrastruktur layihələri üzrə iri şirkət.",
        email: "info@bakuc.az",
        phone: "+994 55 456 78 90"
    },
    {
        id: "c5",
        slug: "medlife-clinic",
        name: "MedLife Clinic",
        logo: "/logo.png",
        sector: "Tibb",
        description: "Müasir tibb mərkəzi.",
        email: "hr@medlife.az",
        phone: "+994 55 567 89 01"
    }
];
const regions = [
    {
        id: "r1",
        slug: "baki",
        name: "Bakı"
    },
    {
        id: "r2",
        slug: "sumqayit",
        name: "Sumqayıt"
    },
    {
        id: "r3",
        slug: "ganja",
        name: "Gəncə"
    },
    {
        id: "r4",
        slug: "salyan",
        name: "Salyan"
    },
    {
        id: "r5",
        slug: "absheron",
        name: "Abşeron"
    },
    {
        id: "r6",
        slug: "mingecevir",
        name: "Mingəçevir"
    },
    {
        id: "r7",
        slug: "lenkeran",
        name: "Lənkəran"
    },
    {
        id: "r8",
        slug: "seki",
        name: "Şəki"
    }
];
const categories = [
    {
        id: "cat1",
        slug: "vakansiyalar",
        name: "Vakansiyalar",
        type: "position"
    },
    {
        id: "cat2",
        slug: "vezifeler",
        name: "Vəzifələr",
        type: "position"
    },
    {
        id: "cat3",
        slug: "sektorlar",
        name: "Sektorlar",
        type: "sector"
    },
    {
        id: "cat4",
        slug: "sirketler",
        name: "Şirkətlər",
        type: "sector"
    },
    {
        id: "cat5",
        slug: "rayonlar",
        name: "Rayonlar",
        type: "sector"
    },
    {
        id: "cat6",
        slug: "qadin-isleri",
        name: "Qadın işləri",
        type: "women"
    },
    {
        id: "cat7",
        slug: "tecrube-proqramlari",
        name: "Təcrübə Proqramları",
        type: "internship"
    },
    {
        id: "cat8",
        slug: "secilmis-elanlar",
        name: "Seçilmiş elanlar",
        type: "position"
    }
];
const jobs = [
    {
        id: "j1",
        slug: "maltozlayan-servis-movcuddur",
        title: "Maltoplayan - Servis mövcuddur",
        companyId: "c1",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "OBA marketlər şəbəkəsinin Bakı şəhərindəki hipermarketlərinə maltoplayan tələb olunur. İş yeri xidməti mövcuddur.",
        requirements: [
            "Yaş həddi: 20-45",
            "Əlaqəli sahədə təcrübə arzuolunandır",
            "Dəqiqlik və məsuliyyətli yanaşma"
        ],
        salary: "600 - 800 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-15",
        contactPhone: "+994 55 111 22 33",
        isPremium: true,
        views: 371,
        createdAt: "2026-08-10"
    },
    {
        id: "j2",
        slug: "anbar-fehlesi-salyan",
        title: "Anbar fəhləsi - Salyan",
        companyId: "c1",
        regionId: "r4",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "Salyan rayonunda yerləşən anbar kompleksimizdə anbar fəhləsi vəzifəsinə işçi tələb olunur.",
        requirements: [
            "Fiziki hazırlıq",
            "Anbar işlərində təcrübə arzuolunandır",
            "Salyan və ətraf rayonlarda yaşayanlar üçün üstünlük"
        ],
        salary: "500 - 650 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-10",
        contactPhone: "+994 55 111 22 33",
        isPremium: true,
        views: 72,
        createdAt: "2026-08-10"
    },
    {
        id: "j3",
        slug: "keyfiyyete-nezaret-uzre-mutexessis",
        title: "Keyfiyyətə nəzarət üzrə mütəxəssis",
        companyId: "c1",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "OBA marketlər şəbəkəsində keyfiyyətə nəzarət bölməsinə mütəxəssis tələb olunur.",
        requirements: [
            "Ali təhsil (istehsalat/istehsalat menecmenti üzrə üstünlük)",
            "Əlaqəli sahədə minimum 2 illik təcrübə",
            "MS Office proqramlarını bilmək"
        ],
        salary: "900 - 1200 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-20",
        contactPhone: "+994 55 111 22 33",
        isPremium: true,
        views: 142,
        createdAt: "2026-08-10"
    },
    {
        id: "j4",
        slug: "elektrik-muhendisi-uzre-texnik",
        title: "Elektrik mühəndisi üzrə texnik",
        companyId: "c2",
        regionId: "r5",
        categoryIds: [
            "cat1",
            "cat3"
        ],
        description: "Milla Dairy-nin Abşeron ərazisindəki istehsalat müəssisəsinə elektrik mühəndisliyi üzrə texnik tələb olunur.",
        requirements: [
            "Texniki təhsil",
            "Sənaye elektriki sahəsində təcrübə",
            "Avadanlıqların quraşdırılması və texniki xidməti"
        ],
        salary: "1000 - 1400 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-18",
        contactPhone: "+994 55 222 33 44",
        isPremium: false,
        views: 130,
        createdAt: "2026-08-09"
    },
    {
        id: "j5",
        slug: "tehlukesizlik-emekdasi",
        title: "Təhlükəsizlik əməkdaşı",
        companyId: "c1",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "OBA marketlər şəbəkəsinin Bakı şəhərindəki obyektlərinə təhlükəsizlik əməkdaşı tələb olunur.",
        requirements: [
            "Yaş həddi: 22-45",
            "Fiziki hazırlıq",
            "Oxşar vəzifədə təcrübə arzuolunandır"
        ],
        salary: "550 - 750 AZN",
        workType: "Növbəli",
        deadline: "2026-09-12",
        contactPhone: "+994 55 111 22 33",
        isPremium: true,
        views: 416,
        createdAt: "2026-08-10"
    },
    {
        id: "j6",
        slug: "frontend-developer",
        title: "Frontend Developer (React)",
        companyId: "c3",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat2",
            "cat3"
        ],
        description: "AZ Innovations şirkətinin proqram təminatı komandasına React developer tələb olunur.",
        requirements: [
            "React, TypeScript bilikləri",
            "Tailwind CSS və ya oxşar CSS framework təcrübəsi",
            "REST API və Git bilikləri",
            "Minimum 2 illik təcrübə"
        ],
        salary: "1500 - 2500 AZN",
        workType: "Tam ştat / Uzaqdan",
        deadline: "2026-09-25",
        contactEmail: "jobs@azinnovations.az",
        isPremium: false,
        views: 210,
        createdAt: "2026-08-08"
    },
    {
        id: "j7",
        slug: "tikinti-fehlesi",
        title: "Tikinti fəhləsi",
        companyId: "c4",
        regionId: "r2",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "Sumqayıtda yerləşən tikinti layihəmizə tikinti fəhləsi tələb olunur.",
        requirements: [
            "Fiziki hazırlıq",
            "Tikinti sahəsində təcrübə",
            "İş qrafikinə riayət etmək"
        ],
        salary: "700 - 900 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-05",
        contactPhone: "+994 55 333 44 55",
        isPremium: false,
        views: 98,
        createdAt: "2026-08-07"
    },
    {
        id: "j8",
        slug: "hemsire-qadin-isi",
        title: "Tibb bacısı",
        companyId: "c5",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat6"
        ],
        description: "MedLife Clinic-in Bakı şəhərindəki klinikasına tibb bacısı tələb olunur. Qadın namizədlər üçün əlverişli iş şəraiti.",
        requirements: [
            "Tibb təhsili",
            "Nursing sahəsində təcrübə",
            "Dəqiqlik və məsuliyyət"
        ],
        salary: "800 - 1100 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-22",
        contactPhone: "+994 55 444 55 66",
        isPremium: false,
        views: 156,
        createdAt: "2026-08-06"
    },
    {
        id: "j9",
        slug: "satis-meneceri-telebe",
        title: "Satış meneceri - Təcrübə proqramı",
        companyId: "c1",
        regionId: "r1",
        categoryIds: [
            "cat7"
        ],
        description: "OBA marketlər şəbəkəsi tələbələr və yenicə məzun olmuşlar üçün satış üzrə təcrübə proqramı elan edir.",
        requirements: [
            "Universitet tələbəsi və ya son tədris ili",
            "Kommunikatİv bacarıqlar",
            "Yaradıcı düşüncə"
        ],
        salary: "500 AZN + bonus",
        workType: "Tam ştat",
        deadline: "2026-09-30",
        contactPhone: "+994 55 111 22 33",
        isPremium: false,
        views: 89,
        createdAt: "2026-08-05"
    },
    {
        id: "j10",
        slug: "muhasibat-uzre-isci",
        title: "Mühasibat üzrə işçi",
        companyId: "c3",
        regionId: "r1",
        categoryIds: [
            "cat1",
            "cat2"
        ],
        description: "AZ Innovations şirkətinə mühasibat uçotu üzrə işçi tələb olunur.",
        requirements: [
            "Ali təhsil (iqtisadiyyat/mühasibatlıq)",
            "1C proqramını bilmək",
            "MS Excel bilikləri"
        ],
        salary: "900 - 1300 AZN",
        workType: "Tam ştat",
        deadline: "2026-09-15",
        contactEmail: "jobs@azinnovations.az",
        isPremium: true,
        views: 244,
        createdAt: "2026-08-10"
    }
];
const socialLinks = [
    {
        name: "Telegram",
        url: "https://t.me/TEJob_LLC",
        color: "#0088cc"
    },
    {
        name: "WhatsApp",
        url: "https://whatsapp.com/channel/0029VafSTdhAYlUISg5om63z",
        color: "#25D366"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/tejob-az",
        color: "#0A66C2"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/tejob.az",
        color: "#1877F2"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/tejob.az",
        color: "#E4405F"
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@tejob.az",
        color: "#000000"
    }
];
const pageContents = {
    "niye-biz": {
        title: "Niyə Biz",
        content: `
      <p>TEJOB platforması vasitəsilə 2021-ci ildən iş elanlarının paylaşılması xidməti göstərilir.</p>
      <p>Şirkətlərin və fərdi sahibkarların iş elanları tejob.az saytında, Telegram və WhatsApp kanallarında, TikTok, Facebook, Instagram və LinkedIn səhifələrində paylaşılır.</p>
      <p>Bizimlə əməkdaşlıq edərək vakansiyalarınızı geniş auditoriyaya çatdıra bilərsiniz.</p>
    `
    },
    elaqe: {
        title: "Əlaqə Məlumatları",
        content: `
      <p><strong>E-mail ünvanı:</strong> info@tejob.az</p>
      <p><strong>Zəng / WhatsApp:</strong> +994 55 500 29 20</p>
      <p><strong>Ünvan:</strong> Bakı şəhəri, Nərimanov rayonu</p>
    `
    },
    "is-elani-yerlesdir": {
        title: "İş elanı yerləşdir",
        content: `
      <p>İş elanı yerləşdirmək üçün elan təsvirini Word və ya PDF faylında info@tejob.az elektron poçt ünvanına göndərməyiniz xahiş olunur.</p>
      <p>İş elanı 30 gün ərzində saxlanılmaqla tejob.az saytında dərc edilir və tejob-un bütün sosial media səhifələrində paylaşılır.</p>
      <p>Əlaqə: info@tejob.az | +994 55 500 29 20</p>
    `
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
    `
    }
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1q49koy._.js.map