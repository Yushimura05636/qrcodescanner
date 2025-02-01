import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
export default (await import('vue')).defineComponent({
    name: 'AboutView',
    components: {
        QrcodeVue
    },
    data() {
        return {
            people: [],
            history: [],
            user: [],
            showModal: false,
            selectedQR: '',
            genderImages: {
                male: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
                female: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
            }
        };
    },
    created() {
        console.log('AboutView component created');
        this.getPeople();
    },
    methods: {
        async getPeople() {
            try {
                console.log('Fetching people data...');
                const response = await axios.get('http://localhost:8000/api/call/people');
                console.log('People data received:', response.data);
                this.people = response.data;
            }
            catch (error) {
                console.error('Error fetching people:', error);
            }
        },
        showQRModal(qrCode) {
            this.selectedQR = qrCode;
            this.showModal = true;
        },
        getGenderImage(gender) {
            return this.genderImages[gender?.toLowerCase()] || this.genderImages.male;
        },
        capitalizeFirstLetter(string) {
            if (!string)
                return '';
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
    },
    async mounted() {
        console.log('mounted about view');
        await this.getPeople();
        console.log('People from mounted:', this.people);
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_componentsOption = {
        QrcodeVue
    };
    let __VLS_components;
    let __VLS_directives;
    ['qr-container', 'no-qr', 'container', 'api-url',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("api-url") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.people.length);
    __VLS_elementAsFunction(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    (JSON.stringify(__VLS_ctx.people, null, 2));
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: ("table table-hover") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    if (__VLS_ctx.people.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: ("6"),
        });
    }
    else {
        for (const [person] of __VLS_getVForSourceType((__VLS_ctx.people))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: ((person.id)),
                ...{ class: ("table-secondary") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                scope: ("row"),
                ...{ class: ("gender-cell") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("gender-container") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
                src: ((__VLS_ctx.getGenderImage(person.gender))),
                alt: ((person.gender)),
                ...{ class: ("gender-icon") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("gender-text") },
            });
            (__VLS_ctx.capitalizeFirstLetter(person.gender));
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                scope: ("row"),
            });
            (person.firstname);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                scope: ("row"),
            });
            (person.lastname);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                scope: ("row"),
            });
            (person.email);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                scope: ("row"),
            });
            (person.phone);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
                ...{ class: ("qr-cell") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.people.length === 0))))
                            return;
                        __VLS_ctx.showQRModal(person.qr_code);
                    } },
                ...{ class: ("qr-container") },
            });
            const __VLS_0 = {}.QrcodeVue;
            /** @type { [typeof __VLS_components.QrcodeVue, typeof __VLS_components.qrcodeVue, ] } */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                value: ((person.qr_code)),
                size: ((100)),
                level: ("H"),
                renderAs: ("canvas"),
            }));
            const __VLS_2 = __VLS_1({
                value: ((person.qr_code)),
                size: ((100)),
                level: ("H"),
                renderAs: ("canvas"),
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        }
    }
    if (__VLS_ctx.showModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showModal)))
                        return;
                    __VLS_ctx.showModal = false;
                } },
            ...{ class: ("modal-overlay") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: () => { } },
            ...{ class: ("modal-content") },
        });
        const __VLS_6 = {}.QrcodeVue;
        /** @type { [typeof __VLS_components.QrcodeVue, typeof __VLS_components.qrcodeVue, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            value: ((__VLS_ctx.selectedQR)),
            size: ((300)),
            level: ("H"),
            renderAs: ("canvas"),
        }));
        const __VLS_8 = __VLS_7({
            value: ((__VLS_ctx.selectedQR)),
            size: ((300)),
            level: ("H"),
            renderAs: ("canvas"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_elementAsFunction(__VLS_intrinsicElements.small, __VLS_intrinsicElements.small)({
            ...{ class: ("qr-string") },
        });
        (__VLS_ctx.selectedQR);
    }
    ['container', 'api-url', 'table', 'table-hover', 'table-secondary', 'gender-cell', 'gender-container', 'gender-icon', 'gender-text', 'qr-cell', 'qr-container', 'modal-overlay', 'modal-content', 'qr-string',];
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
//# sourceMappingURL=AboutView.vue.js.map