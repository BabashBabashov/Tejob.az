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
"[project]/src/app/kateqoriya/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryPage,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$JobCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/JobCard.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"].map((category)=>({
            slug: category.slug
        }));
}
async function CategoryPage({ params }) {
    const { slug } = await params;
    const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryBySlug"])(slug);
    if (!category) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const categoryJobs = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.categoryIds.includes(category.id));
    const sortedJobs = [
        ...categoryJobs
    ].sort((a, b)=>{
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-slate-900 dark:text-slate-100",
                        children: category.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-500 dark:text-slate-400",
                        children: [
                            sortedJobs.length,
                            " ",
                            sortedJobs.length === 1 ? "elan" : "elan",
                            " tapıldı"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            sortedJobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-500 dark:text-slate-400",
                    children: "Bu kateqoriyada aktiv elan yoxdur."
                }, void 0, false, {
                    fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-3",
                children: sortedJobs.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$JobCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        job: job
                    }, job.id, false, {
                        fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/kateqoriya/[slug]/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/kateqoriya/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/kateqoriya/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/JobCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JobCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.mjs [app-rsc] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-rsc] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-rsc] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.mjs [app-rsc] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
;
function JobCard({ job }) {
    const company = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanyById"])(job.companyId);
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRegionById"])(job.regionId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: `/elanlar/${job.slug}`,
        className: "group flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-[#1e293b] dark:hover:border-emerald-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white dark:border-slate-700 dark:bg-slate-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: company?.logo || "/logo.png",
                        alt: company?.name || "Şirkət logosu",
                        width: 56,
                        height: 56,
                        className: "h-10 w-10 object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/JobCard.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/JobCard.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/JobCard.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col gap-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-semibold text-slate-900 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-400",
                                children: job.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/JobCard.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            job.isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/JobCard.tsx",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this),
                                    "PREMIUM"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/JobCard.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/JobCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-slate-600 dark:text-slate-400",
                        children: company?.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/JobCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400",
                        children: [
                            region && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/JobCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    region.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/JobCard.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/JobCard.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatDate"])(job.createdAt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/JobCard.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                        size: 13
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/JobCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    job.views
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/JobCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/JobCard.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/JobCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/JobCard.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
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
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDate",
    ()=>formatDate,
    "getCategoryBySlug",
    ()=>getCategoryBySlug,
    "getCompanyById",
    ()=>getCompanyById,
    "getCompanyBySlug",
    ()=>getCompanyBySlug,
    "getCompanyJobCount",
    ()=>getCompanyJobCount,
    "getJobBySlug",
    ()=>getJobBySlug,
    "getJobsByCategory",
    ()=>getJobsByCategory,
    "getJobsByCompany",
    ()=>getJobsByCompany,
    "getJobsByRegion",
    ()=>getJobsByRegion,
    "getRegionById",
    ()=>getRegionById,
    "getRegionBySlug",
    ()=>getRegionBySlug,
    "getRegionJobCount",
    ()=>getRegionJobCount,
    "searchJobs",
    ()=>searchJobs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
;
function getCompanyById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["companies"].find((c)=>c.id === id);
}
function getCompanyBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["companies"].find((c)=>c.slug === slug);
}
function getRegionById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regions"].find((r)=>r.id === id);
}
function getRegionBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regions"].find((r)=>r.slug === slug);
}
function getCategoryBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"].find((c)=>c.slug === slug);
}
function getJobsByCompany(companyId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.companyId === companyId);
}
function getJobsByRegion(regionId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.regionId === regionId);
}
function getJobsByCategory(categoryId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.categoryIds.includes(categoryId));
}
function getJobBySlug(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].find((j)=>j.slug === slug);
}
function getCompanyJobCount(companyId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.companyId === companyId).length;
}
function getRegionJobCount(regionId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((j)=>j.regionId === regionId).length;
}
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
}
function searchJobs(query) {
    const lower = query.toLowerCase();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jobs"].filter((job)=>{
        const company = getCompanyById(job.companyId);
        return job.title.toLowerCase().includes(lower) || company?.name.toLowerCase().includes(lower) || false;
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05kbt_z._.js.map