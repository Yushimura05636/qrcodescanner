import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
export default (await import('vue')).defineComponent({
    name: 'QrScanner',
    data() {
        return {
            scanner: null,
            scannedResult: null,
            error: null,
            userData: null,
            loading: false,
            showSuccess: false,
            successTitle: '',
            successMessage: '',
            showError: false,
            errorTitle: '',
            errorMessage: ''
        };
    },
    mounted() {
        // Initialize scanner immediately
        this.$nextTick(() => {
            this.initScanner();
        });
    },
    beforeUnmount() {
        if (this.scanner) {
            this.scanner.clear();
        }
    },
    methods: {
        initScanner() {
            console.log('Initializing scanner...');
            try {
                this.scanner = new Html5QrcodeScanner('reader', {
                    qrbox: { width: 250, height: 250 },
                    fps: 20,
                    rememberLastUsedCamera: true,
                    showTorchButtonIfSupported: true
                });
                console.log('Scanner created:', this.scanner);
                this.scanner.render(this.onScanSuccess, this.onScanError);
            }
            catch (error) {
                console.error('Scanner initialization error:', error);
                this.error = 'Failed to initialize scanner';
            }
        },
        async onScanSuccess(decodedText) {
            console.log('QR Code detected:', decodedText);
            this.scannedResult = decodedText;
            try {
                const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
                console.log('API Response:', response.data);
                // Log all QR codes from the response
                console.log('Available QR codes in database:', response.data.map(user => user.qr_code));
                const user = response.data.find(user => {
                    console.log('Comparing:');
                    console.log('Database QR:', user.qr_code, typeof user.qr_code);
                    console.log('Scanned QR:', decodedText, typeof decodedText);
                    console.log('Match?:', user.qr_code === decodedText);
                    return user.qr_code === decodedText;
                });
                if (user) {
                    console.log('User found:', user);
                    this.userData = user;
                    this.error = null;
                    // Clear scanner when user is found
                    if (this.scanner) {
                        console.log('Clearing scanner - user found');
                        await this.scanner.clear();
                    }
                }
                else {
                    console.log('No user found for QR code:', decodedText);
                    this.error = 'No user found';
                    this.userData = null;
                }
            }
            catch (error) {
                console.error('Error details:', error);
                this.error = 'Error finding user';
                this.userData = null;
            }
        },
        onScanError(error) {
            console.warn('QR Scan error:', error);
        },
        async handleTimeIn() {
            await this.handleTimeRecord('Time In');
        },
        async handleTimeOut() {
            await this.handleTimeRecord('Time Out');
        },
        async handleTimeRecord(description) {
            try {
                this.loading = true;
                const timeRecord = {
                    description: description,
                    datetime: this.formatDateTime(new Date()),
                    person_id: this.userData.id
                };
                const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/call/history', timeRecord);
                if (response.data) {
                    this.successTitle = `${description} Successful`;
                    this.successMessage = `Time recorded for ${this.userData.firstname}`;
                    this.showSuccess = true;
                    this.userData = null;
                    setTimeout(() => {
                        this.closeSuccess();
                    }, 2000);
                }
            }
            catch (error) {
                console.error('Time record error:', error);
                this.errorTitle = 'Time Record Failed';
                this.errorMessage = `Unable to record ${description}. Please try again.`;
                this.showError = true;
                setTimeout(() => {
                    this.closeError();
                }, 2000);
            }
            finally {
                this.loading = false;
            }
        },
        formatDateTime(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        restartScanner() {
            if (this.scanner) {
                console.log('Clearing old scanner');
                this.scanner.clear();
                this.userData = null;
                this.error = null;
                this.scannedResult = null;
                console.log('Initializing new scanner');
                setTimeout(() => {
                    this.initScanner();
                }, 100); // Small delay to ensure clean initialization
            }
        },
        closeSuccess() {
            this.showSuccess = false;
            this.successTitle = '';
            this.successMessage = '';
            this.restartScanner();
        },
        closeError() {
            this.showError = false;
            this.errorTitle = '';
            this.errorMessage = '';
        },
        async logout() {
            try {
                // Add your logout logic here
                await this.$router.push('/login');
            }
            catch (error) {
                console.error('Logout error:', error);
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['modal-content', 'user-details', 'user-details', 'time-in-button', 'time-out-button', 'time-in-button', 'time-out-button', 'rescan-button', 'time-in-button', 'time-out-button', 'bg-white', 'bg-gray-50', 'text-gray-900', 'text-gray-500', 'text-gray-400', 'animate-popup', 'bg-white', 'text-gray-900', 'text-gray-600', 'nav-link', 'nav-link', 'router-link-active',];
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
        ...{ class: ("max-w-4xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex-grow") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative -mt-24 flex flex-col items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-white rounded-xl shadow-md p-8 w-full max-w-2xl mt-12 pt-8") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("bg-gray-50 rounded-xl p-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: ("reader"),
        ...{ class: ("overflow-hidden rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm text-gray-500 text-center mt-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto") },
    });
    if (__VLS_ctx.userData) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white rounded-2xl p-8 max-w-xl w-full mx-4 transform animate-popup shadow-2xl") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex justify-between items-center mb-6 pt-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center gap-3") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-10 h-10 rounded-full bg-green-100 flex items-center justify-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
            ...{ class: ("w-6 h-6 text-green-600") },
            fill: ("none"),
            stroke: ("currentColor"),
            viewBox: ("0 0 24 24"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
            'stroke-linecap': ("round"),
            'stroke-linejoin': ("round"),
            'stroke-width': ("2"),
            d: ("M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-xl font-semibold text-gray-900") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.restartScanner) },
            ...{ class: ("text-gray-400 hover:text-gray-600 transition-colors duration-200") },
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
            ...{ class: ("bg-gray-50 rounded-xl p-6 mb-6 pt-6 pb-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center mb-6 pt-2 pb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((`https://ui-avatars.com/api/?name=${__VLS_ctx.userData.firstname}+${__VLS_ctx.userData.lastname}&background=random`)),
            alt: ("User Avatar"),
            ...{ class: ("w-full h-full object-cover") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("ml-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
            ...{ class: ("text-lg font-semibold text-gray-900 pb-1") },
        });
        (__VLS_ctx.userData.firstname);
        (__VLS_ctx.userData.lastname);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500") },
        });
        (__VLS_ctx.userData.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-2 gap-4 pt-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white rounded-lg p-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500 pb-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-900 font-medium pt-1") },
        });
        (__VLS_ctx.userData.phone);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("bg-white rounded-lg p-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-gray-500 pb-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-900 font-medium font-mono text-sm pt-1") },
        });
        (__VLS_ctx.userData.qr_code);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-2 gap-4 pt-4 pb-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleTimeIn) },
            disabled: ((__VLS_ctx.loading)),
            ...{ class: ("\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0036\u0020\u0070\u0079\u002d\u0033\u0020\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0036\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u006e\u0074\u002d\u006d\u0065\u0064\u0069\u0075\u006d\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0062\u006c\u0075\u0065\u002d\u0037\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0063\u006f\u006c\u006f\u0072\u0073\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u0020\u0064\u0069\u0073\u0061\u0062\u006c\u0065\u0064\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0035\u0030") },
        });
        if (__VLS_ctx.loading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                ...{ class: ("animate-spin h-5 w-5 text-white") },
                fill: ("none"),
                viewBox: ("0 0 24 24"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({
                ...{ class: ("opacity-25") },
                cx: ("12"),
                cy: ("12"),
                r: ("10"),
                stroke: ("currentColor"),
                'stroke-width': ("4"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                ...{ class: ("opacity-75") },
                fill: ("currentColor"),
                d: ("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"),
            });
        }
        (__VLS_ctx.loading ? 'Processing...' : 'Time In');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleTimeOut) },
            disabled: ((__VLS_ctx.loading)),
            ...{ class: ("\u0066\u006c\u0065\u0078\u0020\u0069\u0074\u0065\u006d\u0073\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u006a\u0075\u0073\u0074\u0069\u0066\u0079\u002d\u0063\u0065\u006e\u0074\u0065\u0072\u0020\u0067\u0061\u0070\u002d\u0032\u0020\u0070\u0078\u002d\u0036\u0020\u0070\u0079\u002d\u0033\u0020\u0062\u0067\u002d\u0072\u0065\u0064\u002d\u0036\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0066\u006f\u006e\u0074\u002d\u006d\u0065\u0064\u0069\u0075\u006d\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0072\u0065\u0064\u002d\u0037\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0063\u006f\u006c\u006f\u0072\u0073\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030\u0020\u0064\u0069\u0073\u0061\u0062\u006c\u0065\u0064\u003a\u006f\u0070\u0061\u0063\u0069\u0074\u0079\u002d\u0035\u0030") },
        });
        if (__VLS_ctx.loading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
                ...{ class: ("animate-spin h-5 w-5 text-white") },
                fill: ("none"),
                viewBox: ("0 0 24 24"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.circle)({
                ...{ class: ("opacity-25") },
                cx: ("12"),
                cy: ("12"),
                r: ("10"),
                stroke: ("currentColor"),
                'stroke-width': ("4"),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.path)({
                ...{ class: ("opacity-75") },
                fill: ("currentColor"),
                d: ("M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"),
            });
        }
        (__VLS_ctx.loading ? 'Processing...' : 'Time Out');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.restartScanner) },
            ...{ class: ("\u0077\u002d\u0066\u0075\u006c\u006c\u0020\u006d\u0074\u002d\u0034\u0020\u0070\u0078\u002d\u0036\u0020\u0070\u0079\u002d\u0033\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0038\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0078\u006c\u0020\u0066\u006f\u006e\u0074\u002d\u006d\u0065\u0064\u0069\u0075\u006d\u000d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0062\u0067\u002d\u0067\u0072\u0061\u0079\u002d\u0039\u0030\u0030\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0063\u006f\u006c\u006f\u0072\u0073\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0032\u0030\u0030") },
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
        (__VLS_ctx.successTitle);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 mt-2") },
        });
        (__VLS_ctx.successMessage);
    }
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
        (__VLS_ctx.errorTitle);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-gray-600 mt-2") },
        });
        (__VLS_ctx.errorMessage);
    }
    ['min-h-screen', 'bg-gray-50', 'flex', 'flex-col', 'items-center', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'flex', 'items-center', 'justify-between', 'flex', 'items-center', 'ml-8', 'h-8', 'w-8', 'text-white', 'mr-3', 'text-2xl', 'font-bold', 'text-white', 'flex', 'items-center', 'mr-8', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'nav-link', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'hover:text-orange-100', 'transition-all', 'duration-200', 'ml-4', 'px-4', 'py-2', 'text-sm', 'font-medium', 'text-white', 'bg-orange-600', 'rounded-lg', 'hover:bg-orange-700', 'transition-all', 'duration-200', 'max-w-4xl', 'w-full', 'px-4', 'sm:px-6', 'lg:px-8', 'mx-auto', 'flex-grow', 'relative', '-mt-24', 'flex', 'flex-col', 'items-center', 'bg-white', 'rounded-xl', 'shadow-md', 'p-8', 'w-full', 'max-w-2xl', 'mt-12', 'pt-8', 'bg-gray-50', 'rounded-xl', 'p-4', 'overflow-hidden', 'rounded-lg', 'text-sm', 'text-gray-500', 'text-center', 'mt-4', 'h-30', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 'w-full', 'mt-auto', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black/50', 'backdrop-blur-sm', 'bg-white', 'rounded-2xl', 'p-8', 'max-w-xl', 'w-full', 'mx-4', 'transform', 'animate-popup', 'shadow-2xl', 'flex', 'justify-between', 'items-center', 'mb-6', 'pt-2', 'flex', 'items-center', 'gap-3', 'w-10', 'h-10', 'rounded-full', 'bg-green-100', 'flex', 'items-center', 'justify-center', 'w-6', 'h-6', 'text-green-600', 'text-xl', 'font-semibold', 'text-gray-900', 'text-gray-400', 'hover:text-gray-600', 'transition-colors', 'duration-200', 'w-6', 'h-6', 'bg-gray-50', 'rounded-xl', 'p-6', 'mb-6', 'pt-6', 'pb-6', 'flex', 'items-center', 'mb-6', 'pt-2', 'pb-4', 'w-16', 'h-16', 'rounded-full', 'overflow-hidden', 'border-4', 'border-white', 'shadow-md', 'w-full', 'h-full', 'object-cover', 'ml-4', 'text-lg', 'font-semibold', 'text-gray-900', 'pb-1', 'text-sm', 'text-gray-500', 'grid', 'grid-cols-2', 'gap-4', 'pt-2', 'bg-white', 'rounded-lg', 'p-4', 'text-sm', 'text-gray-500', 'pb-1', 'text-gray-900', 'font-medium', 'pt-1', 'bg-white', 'rounded-lg', 'p-4', 'text-sm', 'text-gray-500', 'pb-1', 'text-gray-900', 'font-medium', 'font-mono', 'text-sm', 'pt-1', 'grid', 'grid-cols-2', 'gap-4', 'pt-4', 'pb-4', 'flex', 'items-center', 'justify-center', 'gap-2', 'px-6', 'py-3', 'bg-blue-600', 'text-white', 'rounded-xl', 'font-medium', 'hover:bg-blue-700', 'transition-colors', 'duration-200', 'disabled:opacity-50', 'animate-spin', 'h-5', 'w-5', 'text-white', 'opacity-25', 'opacity-75', 'flex', 'items-center', 'justify-center', 'gap-2', 'px-6', 'py-3', 'bg-red-600', 'text-white', 'rounded-xl', 'font-medium', 'hover:bg-red-700', 'transition-colors', 'duration-200', 'disabled:opacity-50', 'animate-spin', 'h-5', 'w-5', 'text-white', 'opacity-25', 'opacity-75', 'w-full', 'mt-4', 'px-6', 'py-3', 'bg-gray-800', 'text-white', 'rounded-xl', 'font-medium', 'hover:bg-gray-900', 'transition-colors', 'duration-200', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black/50', 'backdrop-blur-sm', 'bg-white', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'items-center', 'transform', 'animate-popup', 'w-20', 'h-20', 'rounded-full', 'bg-green-100', 'flex', 'items-center', 'justify-center', 'mb-4', 'w-12', 'h-12', 'text-green-500', 'animate-success', 'text-xl', 'font-semibold', 'text-gray-900', 'text-gray-600', 'mt-2', 'fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black/50', 'backdrop-blur-sm', 'bg-white', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'items-center', 'transform', 'animate-popup', 'w-20', 'h-20', 'rounded-full', 'bg-red-100', 'flex', 'items-center', 'justify-center', 'mb-4', 'w-12', 'h-12', 'text-red-500', 'animate-error', 'text-xl', 'font-semibold', 'text-gray-900', 'text-gray-600', 'mt-2',];
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
//# sourceMappingURL=QrScanner.vue.js.map