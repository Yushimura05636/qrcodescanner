import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'TimeHistory',
    data() {
        return {
            history: [],
            people: [],
            loading: true,
            error: null,
            maleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
            femaleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
        };
    },
    computed: {
        combinedHistory() {
            return this.history.map(record => {
                const personDetails = this.people.find(person => person.id === record.person_id);
                return {
                    ...record,
                    personDetails
                };
            });
        }
    },
    created() {
        this.fetchAllData();
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
        async fetchAllData() {
            try {
                this.loading = true;
                // Fetch both history and people data
                const [historyResponse, peopleResponse] = await Promise.all([
                    axios.get('https://qrscannerdb-production.up.railway.app/api/call/history'),
                    axios.get('https://qrscannerdb-production.up.railway.app/api/call/people')
                ]);
                console.log('History data:', historyResponse.data);
                console.log('People data:', peopleResponse.data);
                this.history = historyResponse.data;
                this.people = peopleResponse.data;
            }
            catch (error) {
                console.error('Error fetching data:', error);
                this.error = 'Failed to load data';
            }
            finally {
                this.loading = false;
            }
        },
        formatDateTime(datetime) {
            const date = new Date(datetime);
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        openProfile(personId) {
            window.open(`/profile?id=${personId}`, '_blank');
        },
        getProfileImage(gender) {
            return gender === 'male' ? this.maleImage : this.femaleImage;
        },
        getGenderIcon(gender) {
            return gender === 'male'
                ? 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png'
                : 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/86.png';
        },
        editRecord(record) {
            console.log('Editing record:', record);
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['nav-link', 'nav-link', 'router-link-active', 'edit-button', 'edit-button', 'history-table', 'table-container', 'table-container', 'table-container', 'table-container', 'history-table', 'loading-message', 'no-records', 'edit-button', 'edit-button', 'history-table', 'table-container', 'table-container', 'table-container', 'edit-button',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("min-h-screen bg-gray-50 flex flex-col items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full flex items-center justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center ml-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        ...{ class: ("h-8 w-8 text-white mr-3") },
        fill: ("none"),
        stroke: ("currentColor"),
        viewBox: ("0 0 24 24"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
        'stroke-linecap': ("round"),
        'stroke-linejoin': ("round"),
        'stroke-width': ("2"),
        d: ("M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-2xl font-bold text-white") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: ("flex items-center mr-8") },
    });
    const __VLS_0 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ("/scanner"),
        ...{ class: ("nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200") },
    }));
    const __VLS_2 = __VLS_1({
        to: ("/scanner"),
        ...{ class: ("nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_5.slots.default;
    var __VLS_5;
    const __VLS_6 = {}.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        to: ("/history"),
        ...{ class: ("nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200") },
    }));
    const __VLS_8 = __VLS_7({
        to: ("/history"),
        ...{ class: ("nav-link px-4 py-2 text-sm font-medium text-white hover:text-orange-100 transition-all duration-200") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_11.slots.default;
    var __VLS_11;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.logout) },
        ...{ class: ("ml-4 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex-grow") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative -mt-24 flex flex-col items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white rounded-xl shadow-md p-8 w-full mt-12") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("table-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: ("history-table") },
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
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: ("6"),
            ...{ class: ("loading-message") },
        });
    }
    else if (__VLS_ctx.combinedHistory.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            colspan: ("6"),
            ...{ class: ("no-records") },
        });
    }
    else {
        for (const [record] of __VLS_getVForSourceType((__VLS_ctx.combinedHistory))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
                key: ((record.id)),
                ...{ class: (({ 'time-in': record.description === 'Time In', 'time-out': record.description === 'Time Out' })) },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex items-center space-x-3") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
                src: ((__VLS_ctx.getProfileImage(record.personDetails?.gender))),
                alt: ((`${record.personDetails?.firstname}'s profile`)),
                ...{ class: ("w-8 h-8 rounded-full") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("px-3") },
            });
            (record.personDetails ? `${record.personDetails.firstname} ${record.personDetails.lastname}` : 'Unknown');
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (record.personDetails ? record.personDetails.email : 'N/A');
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (record.personDetails ? record.personDetails.phone : 'N/A');
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (record.description);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (__VLS_ctx.formatDateTime(record.datetime));
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            if (record.personDetails) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                    ...{ onClick: (...[$event]) => {
                            if (!(!((__VLS_ctx.loading))))
                                return;
                            if (!(!((__VLS_ctx.combinedHistory.length === 0))))
                                return;
                            if (!((record.personDetails)))
                                return;
                            __VLS_ctx.openProfile(record.personDetails.id);
                        } },
                    ...{ class: ("edit-button") },
                    title: ("Edit Profile"),
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("button-text") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("icon") },
                });
            }
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto") },
    });
    ['min-h-screen', 'bg-gray-50', 'flex', 'flex-col', 'items-center', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'ml-8', 'h-8', 'w-8', 'text-white', 'mr-3', 'text-2xl', 'font-bold', 'text-white', 'flex', 'items-center', 'mr-8', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'ml-4', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'bg-orange-600', 'rounded-lg', 'hover:bg-orange-700', 'transition-all', 'duration-200', 'max-w-7xl', 'w-full', 'px-4', 'sm:px-6', 'lg:px-8', 'mx-auto', 'flex-grow', 'relative', '-mt-24', 'flex', 'flex-col', 'items-center', 'bg-white', 'rounded-xl', 'shadow-md', 'p-8', 'w-full', 'mt-12', 'table-container', 'history-table', 'loading-message', 'no-records', 'time-in', 'time-out', 'flex', 'items-center', 'space-x-3', 'w-8', 'h-8', 'rounded-full', 'px-3', 'edit-button', 'button-text', 'icon', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'mt-auto',];
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
//# sourceMappingURL=TimeHistory.vue.js.map