import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['router-link-exact-active', 'logo',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        alt: ("Vue logo"),
        ...{ class: ("logo") },
        src: ("@/assets/logo.svg"),
        width: ("125"),
        height: ("125"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("wrapper") },
    });
    // @ts-ignore
    /** @type { [typeof HelloWorld, ] } */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(HelloWorld, new HelloWorld({
        msg: ("You did it!"),
    }));
    const __VLS_1 = __VLS_0({
        msg: ("You did it!"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-1xl font-bold text-blue-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("mt-4 text-2xl italic text-green-600 hover:text-purple-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({});
    const __VLS_5 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        to: ("/Login"),
    }));
    const __VLS_7 = __VLS_6({
        to: ("/Login"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_10.slots.default;
    var __VLS_10;
    const __VLS_11 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        to: ("/Register"),
    }));
    const __VLS_13 = __VLS_12({
        to: ("/Register"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_16.slots.default;
    var __VLS_16;
    const __VLS_17 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        to: ("/about"),
    }));
    const __VLS_19 = __VLS_18({
        to: ("/about"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_22.slots.default;
    var __VLS_22;
    const __VLS_23 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ] } */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        to: ("/QrScanner"),
    }));
    const __VLS_25 = __VLS_24({
        to: ("/QrScanner"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_28.slots.default;
    var __VLS_28;
    const __VLS_29 = {}.RouterView;
    /** @type { [typeof __VLS_components.RouterView, ] } */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
    const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
    ['logo', 'wrapper', 'text-1xl', 'font-bold', 'text-blue-500', 'mt-4', 'text-2xl', 'italic', 'text-green-600', 'hover:text-purple-500',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            RouterView: RouterView,
            HelloWorld: HelloWorld,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=App.vue.js.map