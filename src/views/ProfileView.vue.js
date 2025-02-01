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
            saving: false,
            showSuccess: false,
            showQrModal: false,
            maleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
            femaleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
        };
    },
    computed: {
        profileImage() {
            return this.person.gender === 'male' ? this.maleImage : this.femaleImage;
        }
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
                // Show success popup
                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                    // Refresh the page
                    window.location.reload();
                }, 2000);
            }
            catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile. Please try again.');
            }
            finally {
                this.saving = false;
            }
        },
        async downloadQR() {
            try {
                const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(this.person.qr_code)}`);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qr-code-${this.person.firstname}-${this.person.lastname}.png`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
            catch (error) {
                console.error('Failed to download QR code:', error);
            }
        },
        logout() {
            // Clear local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login page
            window.location.href = '/login';
        },
        getProfileImage(gender) {
            return gender === 'male' ? this.maleImage : this.femaleImage;
        },
        async updateProfile() {
            try {
                this.loading = true;
                const response = await axios.put(`https://qrscannerdb-production.up.railway.app/api/call/people/${this.person.id}`, this.person);
                this.person = response.data;
                this.originalPerson = { ...response.data };
                this.isEditing = false;
                // Show success popup
                this.showSuccess = true;
                setTimeout(() => {
                    this.showSuccess = false;
                    // Refresh the page
                    window.location.href = '/history';
                }, 2000);
            }
            catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile. Please try again.');
            }
            finally {
                this.loading = false;
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['bg-gradient-pattern', 'bg-grid-pattern', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'bg-white', 'text-gray-900', 'text-gray-600', 'bg-white', 'text-gray-500', 'text-gray-500',];
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center mb-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center space-y-2 mb-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.showQrModal = true;
            } },
        ...{ class: ("w-48 h-48 bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow duration-200") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ((`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(__VLS_ctx.person?.qr_code)}`)),
        alt: ("QR Code"),
        ...{ class: ("w-full h-full object-contain") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm text-gray-600") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: ("text-2xl font-bold text-gray-900 mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 lg:grid-cols-3 gap-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col items-center space-y-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ((__VLS_ctx.getProfileImage(__VLS_ctx.person.gender))),
        alt: ("Profile"),
        ...{ class: ("w-full h-full object-cover") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-lg font-semibold text-gray-900") },
    });
    (__VLS_ctx.person.firstname);
    (__VLS_ctx.person.lastname);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-gray-600") },
    });
    (__VLS_ctx.person.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("lg:col-span-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.updateProfile) },
        ...{ class: ("space-y-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block text-sm font-medium text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("text"),
        value: ((__VLS_ctx.person.firstname)),
        ...{ class: ("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block text-sm font-medium text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("text"),
        value: ((__VLS_ctx.person.lastname)),
        ...{ class: ("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block text-sm font-medium text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("email"),
        ...{ class: ("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500") },
    });
    (__VLS_ctx.person.email);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block text-sm font-medium text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({
        type: ("tel"),
        ...{ class: ("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500") },
    });
    (__VLS_ctx.person.phone);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("block text-sm font-medium text-gray-700") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: ((__VLS_ctx.person.gender)),
        ...{ class: ("mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ("male"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: ("female"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex justify-end space-x-4 pt-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: ("submit"),
        ...{ class: ("px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200") },
        disabled: ((__VLS_ctx.loading)),
    });
    (__VLS_ctx.loading ? 'Saving...' : 'Save Changes');
    if (__VLS_ctx.showQrModal) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showQrModal)))
                        return;
                    __VLS_ctx.showQrModal = false;
                } },
            ...{ class: ("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: () => { } },
            ...{ class: ("bg-white rounded-xl p-6 max-w-lg w-full flex flex-col items-center space-y-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-full flex justify-end") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!((__VLS_ctx.showQrModal)))
                        return;
                    __VLS_ctx.showQrModal = false;
                } },
            ...{ class: ("text-gray-500 hover:text-gray-700") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-6 h-6") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M6 18L18 6M6 6l12 12"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-64 h-64 bg-white rounded-lg shadow-md p-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(__VLS_ctx.person.qr_code)}`)),
            alt: ("QR Code Large"),
            ...{ class: ("w-full h-full object-contain") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex space-x-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.downloadQR) },
            ...{ class: ("px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 flex items-center space-x-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-5 h-5") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    if (__VLS_ctx.showSuccess) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-6 h-6") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M5 13l4 4L19 7"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto") },
    });
    ['min-h-screen', 'bg-gray-50', 'flex', 'flex-col', 'items-center', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'ml-8', 'h-8', 'w-8', 'text-white', 'mr-3', 'text-2xl', 'font-bold', 'text-white', 'flex', 'items-center', 'mr-8', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'ml-4', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'bg-orange-600', 'rounded-lg', 'hover:bg-orange-700', 'transition-all', 'duration-200', 'max-w-7xl', 'w-full', 'px-4', 'sm:px-6', 'lg:px-8', 'mx-auto', 'flex-grow', 'relative', '-mt-24', 'flex', 'flex-col', 'items-center', 'bg-white', 'rounded-xl', 'shadow-md', 'p-8', 'w-full', 'mt-12', 'flex', 'flex-col', 'items-center', 'mb-8', 'flex', 'flex-col', 'items-center', 'space-y-2', 'mb-8', 'w-48', 'h-48', 'bg-white', 'rounded-lg', 'shadow-md', 'p-3', 'cursor-pointer', 'hover:shadow-lg', 'transition-shadow', 'duration-200', 'w-full', 'h-full', 'object-contain', 'text-sm', 'text-gray-600', 'text-2xl', 'font-bold', 'text-gray-900', 'mb-6', 'grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-8', 'flex', 'flex-col', 'items-center', 'space-y-4', 'w-32', 'h-32', 'rounded-full', 'overflow-hidden', 'border-4', 'border-orange-100', 'w-full', 'h-full', 'object-cover', 'text-lg', 'font-semibold', 'text-gray-900', 'text-gray-600', 'lg:col-span-2', 'space-y-6', 'grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-orange-500', 'focus:ring-orange-500', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-orange-500', 'focus:ring-orange-500', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-orange-500', 'focus:ring-orange-500', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-orange-500', 'focus:ring-orange-500', 'block', 'text-sm', 'font-medium', 'text-gray-700', 'mt-1', 'block', 'w-full', 'rounded-md', 'border-gray-300', 'shadow-sm', 'focus:border-orange-500', 'focus:ring-orange-500', 'flex', 'justify-end', 'space-x-4', 'pt-4', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'bg-orange-600', 'rounded-lg', 'hover:bg-orange-700', 'transition-all', 'duration-200', 'fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50', 'p-4', 'bg-white', 'rounded-xl', 'p-6', 'max-w-lg', 'w-full', 'flex', 'flex-col', 'items-center', 'space-y-4', 'w-full', 'flex', 'justify-end', 'text-gray-500', 'hover:text-gray-700', 'w-6', 'h-6', 'w-64', 'h-64', 'bg-white', 'rounded-lg', 'shadow-md', 'p-2', 'w-full', 'h-full', 'object-contain', 'flex', 'space-x-4', 'px-4', 'py-2', 'bg-orange-600', 'text-white', 'rounded-lg', 'hover:bg-orange-700', 'transition-colors', 'duration-200', 'flex', 'items-center', 'space-x-2', 'w-5', 'h-5', 'fixed', 'bottom-4', 'right-4', 'bg-green-500', 'text-white', 'px-6', 'py-3', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'space-x-2', 'w-6', 'h-6', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'mt-auto',];
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