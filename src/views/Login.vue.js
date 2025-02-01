import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
                    email: this.email,
                    password: this.password
                });
                console.log('Response status:', response.status);
                const responseData = await response.data;
                const data = responseData.data; // Extract the nested data
                console.log('Full response data:', data);
                console.log('Email:', data.user.email);
                console.log('Token:', data.token);
                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }
                // Check if token exists in response
                if (!data.token) {
                    console.error('No token received in response:', data);
                    throw new Error('No authentication token received');
                }
                // Store the token in localStorage
                localStorage.setItem('token', data.token);
                console.log('Token stored:', data.token);
                // Update Authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                // Redirect to home page or dashboard
                this.$router.push('/register');
            }
            catch (error) {
                console.error('Login error:', error);
                // Here you might want to add error handling UI feedback
                alert(error.message || 'An error occurred during login');
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['login-form', 'submit-btn', 'submit-btn', 'register-link', 'register-link', 'login-form', 'submit-btn',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("login-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleLogin) },
        ...{ class: ("login-form") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("email"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("email"),
        id: ("email"),
        required: (true),
        placeholder: ("Enter your email"),
    });
    (__VLS_ctx.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("password"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("password"),
        id: ("password"),
        required: (true),
        placeholder: ("Enter your password"),
    });
    (__VLS_ctx.password);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("submit-btn") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("register-link") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/register"),
    }));
    const __VLS_2 = __VLS_1({
        to: ("/register"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    ['login-container', 'login-form', 'form-group', 'form-group', 'submit-btn', 'register-link',];
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