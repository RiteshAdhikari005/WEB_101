(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/practical1/src/components/ui/VideoCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function VideoCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "c096f8195c31bb332be0cb73236d83ed5e7045a7f9a0afd4add3da0593273473") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c096f8195c31bb332be0cb73236d83ed5e7045a7f9a0afd4add3da0593273473";
    }
    const { post } = t0;
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { caption, audio, likes, shares } = post;
    let t1;
    if ($[1] !== liked) {
        t1 = ({
            "VideoCard[handleLikeClick]": ()=>{
                setLiked(!liked);
            }
        })["VideoCard[handleLikeClick]"];
        $[1] = liked;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleLikeClick = t1;
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mr-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-12 w-12 rounded-full bg-gray-300"
            }, void 0, false, {
                fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                lineNumber: 39,
                columnNumber: 32
            }, this)
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm ml-1",
            children: " 2d ago "
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== caption) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-2",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm mt-1",
                    children: [
                        " ",
                        caption,
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 53,
                    columnNumber: 36
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[5] = caption;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaMusic"], {
            className: "mr-2 text-xs"
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== audio) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center text-sm mb-3",
            children: [
                t5,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "truncate max-w-[250px]",
                    children: audio
                }, void 0, false, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 68,
                    columnNumber: 62
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[8] = audio;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white",
            children: " Video Placeholder"
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mr-5 w-[300px] h-[530px] bg-black rounded-md flex items-center justify-center relative overflow-hidden",
            children: [
                t7,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-4 left-4 text-white text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-1",
                        children: " 0:30 "
                    }, void 0, false, {
                        fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                        lineNumber: 83,
                        columnNumber: 195
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 83,
                    columnNumber: 134
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== liked) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-10 w-10 rounded-full bg-gray-200 flex items-center justidy-center",
            children: liked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaHeart"], {
                className: "text-red-500"
            }, void 0, false, {
                fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                lineNumber: 90,
                columnNumber: 104
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaRegHeart"], {}, void 0, false, {
                fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                lineNumber: 90,
                columnNumber: 143
            }, this)
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[12] = liked;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    const t10 = liked ? likes + 1 : likes;
    let t11;
    if ($[14] !== t10) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs mt-1",
            children: [
                " ",
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 99,
            columnNumber: 11
        }, this);
        $[14] = t10;
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== handleLikeClick || $[17] !== t11 || $[18] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "flex flex-col items-center",
            onClick: handleLikeClick,
            children: [
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 107,
            columnNumber: 11
        }, this);
        $[16] = handleLikeClick;
        $[17] = t11;
        $[18] = t9;
        $[19] = t12;
    } else {
        t12 = $[19];
    }
    let t13;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaShare"], {}, void 0, false, {
                fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                lineNumber: 117,
                columnNumber: 96
            }, this)
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 117,
            columnNumber: 11
        }, this);
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== shares) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "flex flex-col items-center",
            children: [
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs mt-1",
                    children: [
                        " ",
                        shares
                    ]
                }, void 0, true, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 124,
                    columnNumber: 63
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[21] = shares;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] !== t12 || $[24] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col justify-end space-y-3 py-2",
                    children: [
                        t12,
                        t14
                    ]
                }, void 0, true, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 132,
                    columnNumber: 37
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 132,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t14;
        $[25] = t15;
    } else {
        t15 = $[25];
    }
    let t16;
    if ($[26] !== t15 || $[27] !== t4 || $[28] !== t6) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex py-6 border-b",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1",
                    children: [
                        t4,
                        t6,
                        t15
                    ]
                }, void 0, true, {
                    fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
                    lineNumber: 141,
                    columnNumber: 51
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/practical1/src/components/ui/VideoCard.jsx",
            lineNumber: 141,
            columnNumber: 11
        }, this);
        $[26] = t15;
        $[27] = t4;
        $[28] = t6;
        $[29] = t16;
    } else {
        t16 = $[29];
    }
    return t16;
}
_s(VideoCard, "5oFMLl0KA2P+7Df5hTCAaQ+yYE8=");
_c = VideoCard;
var _c;
__turbopack_context__.k.register(_c, "VideoCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/practical1/src/components/ui/VideoFeed.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VideoFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$src$2f$components$2f$ui$2f$VideoCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/practical1/src/components/ui/VideoCard.jsx [app-client] (ecmascript)");
'use client';
;
;
;
// Sample data for our feed
const DUMMY_POSTS = [
    {
        id: '1',
        username: '@user1',
        caption: 'Check out this cool video! #trending #tikotk #viral',
        audio: 'original Sounds - User1',
        likes: 1234,
        comments: 432,
        shares: 89
    },
    {
        id: '2',
        username: '@user2',
        caption: 'Learning to dance #dance #fun #trending',
        audio: 'Popular Song - Artist',
        likes: 5678,
        comments: 321,
        shares: 52
    },
    {
        id: '3',
        username: '@user3',
        caption: 'Beautiful sunset today! #Nature #Sunset #Vibes',
        audio: 'Sunset vibes - Chilll Music',
        likes: 2468,
        comments: 135,
        shares: 46
    }
];
function VideoFeed() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "4d241f0c390c3f5b8bd23631eee5d214bc8ab939ece25f1745fd9d56166b3840") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4d241f0c390c3f5b8bd23631eee5d214bc8ab939ece25f1745fd9d56166b3840";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-[550px] mx-auto",
            children: DUMMY_POSTS.map(_VideoFeedDUMMY_POSTSMap)
        }, void 0, false, {
            fileName: "[project]/practical1/src/components/ui/VideoFeed.jsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c = VideoFeed;
function _VideoFeedDUMMY_POSTSMap(post) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$practical1$2f$src$2f$components$2f$ui$2f$VideoCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        post: post
    }, post.id, false, {
        fileName: "[project]/practical1/src/components/ui/VideoFeed.jsx",
        lineNumber: 50,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "VideoFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=practical1_src_components_ui_fe6b381d._.js.map