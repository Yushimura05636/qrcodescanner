import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'ProfileView',
    data() {
        return {
            person: null,
            originalPerson: null,
            loading: true,
            error: null,
            isEditing: false,
            saving: false
        };
    },
    created() {
        const id = this.$route.query.id;
        if (id) {
            this.fetchProfile(id);
        }
        else {
            this.error = 'No profile ID provided';
            this.loading = false;
        }
    },
    methods: {
        async fetchProfile(id) {
            try {
                this.loading = true;
                const response = await axios.get(`https://qrscannerdb-production.up.railway.app/api/call/people/${id}`);
                this.person = response.data;
                this.originalPerson = { ...response.data };
            }
            catch (error) {
                console.error('Error fetching profile:', error);
                this.error = 'Failed to load profile';
            }
            finally {
                this.loading = false;
            }
        },
        startEditing() {
            this.isEditing = true;
        },
        cancelEditing() {
            this.person = { ...this.originalPerson };
            this.isEditing = false;
        },
        async saveChanges() {
            try {
                this.saving = true;
                const response = await axios.put(`https://qrscannerdb-production.up.railway.app/api/call/people/${this.person.id}`, this.person);
                this.person = response.data;
                this.originalPerson = { ...response.data };
                this.isEditing = false;
                // Show success message
                alert('Profile updated successfully!');
                // Safely handle window closing
                try {
                    // Check if window.opener exists and is accessible
                    if (window.opener && !window.opener.closed) {
                        window.opener.location.href = '/history';
                    }
                    window.close();
                }
                catch (e) {
                    console.log('Window handling error:', e);
                    // Fallback: redirect in current window
                    this.$router.push('/history');
                }
            }
            catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile. Please try again.');
            }
            finally {
                this.saving = false;
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['edit-btn', 'save-btn', 'cancel-btn', 'edit-btn', 'save-btn', 'cancel-btn', 'edit-btn', 'save-btn', 'cancel-btn', 'error', 'profile-card', 'profile-card', 'button-group', 'edit-btn', 'save-btn', 'cancel-btn',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("profile-container") },
    });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("loading") },
        });
    }
    else if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("error") },
        });
        (__VLS_ctx.error);
    }
    else if (__VLS_ctx.person) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-card") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-section") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("text"),
            value: ((__VLS_ctx.person.firstname)),
            disabled: ((!__VLS_ctx.isEditing)),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("text"),
            value: ((__VLS_ctx.person.lastname)),
            disabled: ((!__VLS_ctx.isEditing)),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("email"),
            disabled: ((!__VLS_ctx.isEditing)),
        });
        (__VLS_ctx.person.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("tel"),
            disabled: ((!__VLS_ctx.isEditing)),
        });
        (__VLS_ctx.person.phone);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
            value: ((__VLS_ctx.person.gender)),
            disabled: ((!__VLS_ctx.isEditing)),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            value: ("male"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
            value: ("female"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("profile-field") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.input)({
            type: ("text"),
            value: ((__VLS_ctx.person.qr_code)),
            disabled: (true),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("button-group") },
        });
        if (!__VLS_ctx.isEditing) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.startEditing) },
                ...{ class: ("edit-btn") },
            });
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.saveChanges) },
                ...{ class: ("save-btn") },
                disabled: ((__VLS_ctx.saving)),
            });
            (__VLS_ctx.saving ? 'Saving...' : 'Save Changes');
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.cancelEditing) },
                ...{ class: ("cancel-btn") },
                disabled: ((__VLS_ctx.saving)),
            });
        }
    }
    ['profile-container', 'loading', 'error', 'profile-card', 'profile-section', 'profile-field', 'profile-field', 'profile-field', 'profile-field', 'profile-field', 'profile-field', 'button-group', 'edit-btn', 'save-btn', 'cancel-btn',];
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
//# sourceMappingURL=ProfileView.vue.js.map