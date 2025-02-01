import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'TimeHistory',
    data() {
        return {
            history: [],
            people: [],
            loading: true,
            error: null
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
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['history-table', 'history-table', 'history-container', 'table-container', 'history-table', 'history-table', 'history-table', 'table-container', 'history-table', 'loading-message', 'no-records', 'history-table', 'history-table', 'edit-button', 'edit-button', 'button-text', 'edit-button', 'icon', 'edit-button', 'edit-button', 'history-table', 'history-table', 'history-table', 'history-table',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("history-container") },
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
    ['history-container', 'table-container', 'history-table', 'loading-message', 'no-records', 'time-in', 'time-out', 'edit-button', 'button-text', 'icon',];
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