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
                const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/login', {
                    email: this.email,
                    password: this.password
                });
                // Log the entire response to see its structure
                console.log('Full Response:', response);
                console.log('Response Data:', response.data);
                if (response.data) {
                    console.log('Login successful!');
                    // Log the data we're trying to access
                    console.log('Token:', response.data.token);
                    console.log('User:', response.data.user);
                    // Store in localStorage if needed
                    localStorage.setItem('userToken', response.data.token);
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                    this.$router.push('/AboutView');
                }
                else {
                    console.log('No response data received');
                    throw new Error('Login failed - no data received');
                }
            }
            catch (error) {
                console.error('Login error details:', error);
                alert('Login failed. Please check your credentials and try again.');
            }
        }
    },
    mounted() {
        console.log('Login component mounted');
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['login-form', 'submit-btn', 'submit-btn', 'register-link', 'register-link', 'login-form', 'register-link', 'login-container', 'login-container', 'login-form', 'submit-btn', 'login-form', 'login-form', 'form-group',];
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
        autocomplete: ("email"),
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
        autocomplete: ("current-password"),
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