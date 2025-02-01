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
            loading: false
        };
    },
    mounted() {
        console.log('QrScanner mounted');
        this.initScanner();
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
                    fps: 20
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
                const user = response.data.find(user => {
                    console.log('Comparing:', user.qr_code, decodedText);
                    return user.qr_code === decodedText;
                });
                if (user) {
                    console.log('User found:', user);
                    this.userData = user;
                    this.error = null;
                    if (this.scanner) {
                        this.scanner.pause();
                    }
                }
                else {
                    console.log('No user found for QR code:', decodedText);
                    this.error = 'No user found';
                    this.userData = null;
                }
            }
            catch (error) {
                console.error('Error:', error);
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
                    description,
                    datetime: this.formatDateTime(new Date()),
                    person_id: this.userData.id
                };
                console.log('Sending time record:', timeRecord);
                const response = await axios.post('https://qrscannerdb-production.up.railway.app/api/call/history', timeRecord);
                if (response.data) {
                    alert(`${description} recorded successfully!`);
                    this.restartScanner();
                }
            }
            catch (error) {
                console.error('Time record error:', error);
                alert(`Failed to record ${description}. Please try again.`);
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
                this.scanner.clear();
                this.userData = null;
                this.error = null;
                this.scannedResult = null;
                this.initScanner();
            }
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['user-details', 'time-in-button', 'time-out-button', 'time-in-button', 'time-out-button', 'time-in-button', 'time-out-button', 'qr-scanner-container', 'time-buttons', 'time-in-button', 'time-out-button', 'modal-content', 'user-details', 'user-details', 'user-details', 'time-buttons', 'time-in-button', 'time-out-button', 'time-in-button', 'time-out-button', 'time-in-button', 'time-out-button', 'rescan-button', 'rescan-button', 'time-in-button', 'time-out-button', 'modal-content', 'time-buttons', 'time-in-button', 'time-out-button', 'user-details',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("qr-scanner-container") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("qr-scanner") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        id: ("reader"),
    });
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("error-message") },
        });
        (__VLS_ctx.error);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.restartScanner) },
            ...{ class: ("rescan-button") },
        });
    }
    if (__VLS_ctx.userData) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("modal-overlay") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("modal-content") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("user-details") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.userData.firstname);
        (__VLS_ctx.userData.lastname);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.userData.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.userData.phone);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.userData.qr_code);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("time-buttons") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleTimeIn) },
            ...{ class: ("time-in-button") },
            disabled: ((__VLS_ctx.loading)),
        });
        (__VLS_ctx.loading ? 'Processing...' : 'Time In');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleTimeOut) },
            ...{ class: ("time-out-button") },
            disabled: ((__VLS_ctx.loading)),
        });
        (__VLS_ctx.loading ? 'Processing...' : 'Time Out');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.restartScanner) },
            ...{ class: ("rescan-button") },
        });
    }
    ['qr-scanner-container', 'qr-scanner', 'error-message', 'rescan-button', 'modal-overlay', 'modal-content', 'user-details', 'time-buttons', 'time-in-button', 'time-out-button', 'rescan-button',];
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