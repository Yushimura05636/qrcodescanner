import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            showError: false,
            showSuccess: false
        };
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/login', {
                    email: this.email,
                    password: this.password
                });
                if (response.data) {
                    this.showSuccess = true;
                    console.log(response.data.token);
                    this.$router.push('/profile');
                }
            }
            catch (error) {
                console.error('Login error:', error);
                this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                }, 2000);
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen bg-gray-100 flex items-center justify-center p-6") },
    });
    if (__VLS_ctx.showError) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white rounded-2xl p-8 flex flex-col items-center transform animate-popup") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-12 h-12 text-red-500 animate-error") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("3"),
            d: ("M6 18L18 6M6 6l12 12"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-xl font-semibold text-gray-900") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 mt-2") },
        });
    }
    if (__VLS_ctx.showSuccess) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white rounded-2xl p-8 flex flex-col items-center transform animate-popup") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-12 h-12 text-green-500 animate-success") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("3"),
            d: ("M5 13l4 4L19 7"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-xl font-semibold text-gray-900") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 mt-2") },
        });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl min-h-[600px] flex relative") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("hidden lg:block lg:w-1/2 bg-cover bg-center relative") },
        ...{ style: ({}) },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 bg-gradient-to-r from-black/30 to-black/10") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full lg:w-1/2 p-16 relative z-10") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-md mx-auto w-full") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-3xl font-bold text-orange-600 pb-12") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: ("space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("pt-4 pb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email"),
        ...{ class: ("block text-sm font-medium text-gray-700 pb-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("email"),
        id: ("email"),
        ...{ class: ("\u006d\u0074\u002d\u0031\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0078\u002d\u0034\u0020\u0070\u0079\u002d\u0032\u002e\u0035\u0020\u0074\u0065\u0078\u0074\u002d\u0062\u0061\u0073\u0065\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0035\u0030\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0034\u0030\u0030") },
        placeholder: ("Enter your email"),
        required: (true),
    });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("pt-4 pb-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("password"),
        ...{ class: ("block text-sm font-medium text-gray-700 pb-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("password"),
        id: ("password"),
        ...{ class: ("\u006d\u0074\u002d\u0031\u0020\u0062\u006c\u006f\u0063\u006b\u0020\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0070\u0078\u002d\u0034\u0020\u0070\u0079\u002d\u0032\u002e\u0035\u0020\u0074\u0065\u0078\u0074\u002d\u0062\u0061\u0073\u0065\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u0020\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0033\u0030\u0030\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0073\u006d\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0035\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0062\u006f\u0072\u0064\u0065\u0072\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0035\u0030\u0030\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0070\u006c\u0061\u0063\u0065\u0068\u006f\u006c\u0064\u0065\u0072\u002d\u0067\u0072\u0061\u0079\u002d\u0034\u0030\u0030") },
        placeholder: ("Enter your password"),
        required: (true),
    });
    (__VLS_ctx.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center justify-between pt-6 pb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("checkbox"),
        id: ("remember-me"),
        ...{ class: ("h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded") },
    });
    (__VLS_ctx.rememberMe);
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("remember-me"),
        ...{ class: ("ml-2 block text-sm text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-sm") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({
        href: ("#"),
        ...{ class: ("font-medium text-orange-600 hover:text-orange-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("pt-6 pb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u0062\u0067\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0036\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0070\u0079\u002d\u0032\u002e\u0035\u0020\u0070\u0078\u002d\u0036\u0020\u0074\u0065\u0078\u0074\u002d\u0062\u0061\u0073\u0065\u0020\u0066\u006f\u006e\u0074\u002d\u006d\u0065\u0064\u0069\u0075\u006d\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u006c\u0067\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0037\u0030\u0030\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u006f\u0075\u0074\u006c\u0069\u006e\u0065\u002d\u006e\u006f\u006e\u0065\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u0032\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u006f\u0066\u0066\u0073\u0065\u0074\u002d\u0032\u0020\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u0063\u0075\u0073\u003a\u0072\u0069\u006e\u0067\u002d\u006f\u0072\u0061\u006e\u0067\u0065\u002d\u0035\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0063\u006f\u006c\u006f\u0072\u0073\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-center pt-6") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/register"),
        ...{ class: ("text-sm text-orange-600 hover:text-orange-500 transition-colors duration-200") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/register"),
        ...{ class: ("text-sm text-orange-600 hover:text-orange-500 transition-colors duration-200") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    ['min-h-screen', 'bg-gray-100', 'flex', 'items-center', 'justify-center', 'p-6', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black/50', 'backdrop-blur-sm', 'bg-white', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'items-center', 'transform', 'animate-popup', 'w-20', 'h-20', 'rounded-full', 'bg-red-100', 'flex', 'items-center', 'justify-center', 'mb-4', 'w-12', 'h-12', 'text-red-500', 'animate-error', 'text-xl', 'font-semibold', 'text-gray-900', 'text-gray-600', 'mt-2', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black/50', 'backdrop-blur-sm', 'bg-white', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'items-center', 'transform', 'animate-popup', 'w-20', 'h-20', 'rounded-full', 'bg-green-100', 'flex', 'items-center', 'justify-center', 'mb-4', 'w-12', 'h-12', 'text-green-500', 'animate-success', 'text-xl', 'font-semibold', 'text-gray-900', 'text-gray-600', 'mt-2', 'bg-white', 'shadow-lg', 'rounded-lg', 'overflow-hidden', 'w-full', 'max-w-6xl', 'min-h-[600px]', 'flex', 'relative', 'hidden', 'lg:block', 'lg:w-1/2', 'bg-cover', 'bg-center', 'relative', 'absolute', 'inset-0', 'bg-gradient-to-r', 'from-black/30', 'to-black/10', 'w-full', 'lg:w-1/2', 'p-16', 'relative', 'z-10', 'max-w-md', 'mx-auto', 'w-full', 'text-3xl', 'font-bold', 'text-orange-600', 'pb-12', 'space-y-6', 'pt-4', 'pb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'pb-2', 'mt-1', 'block', 'w-full', 'px-4', 'py-2.5', 'text-base', 'border', 'border-gray-300', 'rounded-lg', 'shadow-sm', 'focus:outline-none', 'focus:ring-orange-500', 'focus:border-orange-500', 'placeholder-gray-400', 'pt-4', 'pb-4', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'pb-2', 'mt-1', 'block', 'w-full', 'px-4', 'py-2.5', 'text-base', 'border', 'border-gray-300', 'rounded-lg', 'shadow-sm', 'focus:outline-none', 'focus:ring-orange-500', 'focus:border-orange-500', 'placeholder-gray-400', 'flex', 'items-center', 'justify-between', 'pt-6', 'pb-6', 'flex', 'items-center', 'h-4', 'w-4', 'text-orange-600', 'focus:ring-orange-500', 'border-gray-300', 'rounded', 'ml-2', 'block', 'text-sm', 'text-gray-700', 'text-sm', 'font-medium', 'text-orange-600', 'hover:text-orange-500', 'pt-6', 'pb-6', 'w-full', 'bg-orange-600', 'text-white', 'py-2.5', 'px-6', 'text-base', 'font-medium', 'rounded-lg', 'hover:bg-orange-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-orange-500', 'transition-colors', 'duration-200', 'text-center', 'pt-6', 'text-sm', 'text-orange-600', 'hover:text-orange-500', 'transition-colors', 'duration-200',];
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
let __VLS_self;
//# sourceMappingURL=Login.vue.js.map