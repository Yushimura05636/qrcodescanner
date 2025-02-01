import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'Register',
    data() {
        return {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            gender: '',
            qrString: null
        };
    },
    methods: {
        generateQRString() {
            // Generate a random string for QR code
            const timestamp = Date.now().toString(36);
            const randomStr = Math.random().toString(36).substring(2, 8);
            const qrString = `QR_${timestamp}_${randomStr}`.toUpperCase();
            console.log('Generated QR String:', qrString);
            return qrString;
        },
        async handleRegister() {
            try {
                const response = await axios.post('http://localhost:8000/api/call/people', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    phone: this.phone,
                    gender: this.gender || 'male',
                    qr_code: this.generateQRString()
                });
                console.log('Registration response:', response.data);
                this.qrString = this.generateQRString();
                // Show success message
                setTimeout(() => {
                    this.$router.push('/login');
                }, 3000);
            }
            catch (error) {
                console.error('Registration error:', error.response?.data || error);
                alert('Registration failed. Please make sure all fields are filled out.');
            }
        },
        async checkEmailExists() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/check-email`, {
                    email: this.email
                });
                // ... rest of the code
            }
            catch (error) {
                console.error('Error:', error);
            }
        },
        async registerUser() {
            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/register`, {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                });
                // ... rest of registration logic
            }
            catch (error) {
                console.error('Error:', error);
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['register-form', 'submit-btn', 'submit-btn', 'login-link', 'login-link', 'register-form', 'submit-btn', 'success-message', 'success-message', 'gender-select',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("register-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleRegister) },
        ...{ class: ("register-form") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("firstname"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("firstname"),
        value: ((__VLS_ctx.firstname)),
        required: (true),
        placeholder: ("Enter your first name"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("lastname"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("text"),
        id: ("lastname"),
        value: ((__VLS_ctx.lastname)),
        required: (true),
        placeholder: ("Enter your last name"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("gender"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        id: ("gender"),
        value: ((__VLS_ctx.gender)),
        required: (true),
        ...{ class: ("gender-select") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: (""),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ("male"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ("female"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("form-group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: ("phone"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("tel"),
        id: ("phone"),
        required: (true),
        placeholder: ("Enter your phone number"),
    });
    (__VLS_ctx.phone);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("submit-btn") },
    });
    if (__VLS_ctx.qrString) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("success-message") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.qrString);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("login-link") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/login"),
    }));
    const __VLS_2 = __VLS_1({
        to: ("/login"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    ['register-container', 'register-form', 'form-group', 'form-group', 'form-group', 'gender-select', 'form-group', 'form-group', 'submit-btn', 'success-message', 'login-link',];
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
//# sourceMappingURL=Register.vue.js.map