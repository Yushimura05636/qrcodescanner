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
    methods: {
        initScanner() {
            console.log('Initializing scanner...');
            this.scanner = new Html5QrcodeScanner('reader', {
                qrbox: { width: 250, height: 250 },
                fps: 20
            });
            this.scanner.render(this.onScanSuccess, this.onScanError);
        },
        async onScanSuccess(decodedText) {
            console.log('Scanned QR Code (decodedText):', decodedText);
            this.scannedResult = decodedText;
            try {
                const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
                console.log('API Response Data:', response.data);
                // Log all QR codes from the response
                console.log('Available QR codes in database:', response.data.map(user => user.qr_code));
                const user = response.data.find(user => {
                    console.log('Comparing:');
                    console.log('Database QR:', user.qr_code);
                    console.log('Scanned QR:', decodedText);
                    console.log('Match?:', user.qr_code === decodedText);
                    return user.qr_code === decodedText;
                });
                if (user) {
                    console.log('User found:', user);
                    this.userData = user;
                    this.error = null;
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
        async handleTimeIn() {
            try {
                this.loading = true;
                const timeRecord = {
                    description: 'Time In',
                    datetime: this.formatDateTime(new Date()),
                    person_id: this.userData.id
                };
                console.log('Sending Time In record:', timeRecord);
                const response = await axios.post('http://localhost:8000/api/call/history', timeRecord);
                if (response.data) {
                    alert('Time In recorded successfully!');
                    this.restartScanner();
                }
            }
            catch (error) {
                console.error('Time In error:', error);
                alert('Failed to record Time In. Please try again.');
            }
            finally {
                this.loading = false;
            }
        },
        async handleTimeOut() {
            try {
                this.loading = true;
                const timeRecord = {
                    description: 'Time Out',
                    datetime: this.formatDateTime(new Date()),
                    person_id: this.userData.id
                };
                console.log('Sending Time Out record:', timeRecord);
                const response = await axios.post('http://localhost:8000/api/call/history', timeRecord);
                if (response.data) {
                    alert('Time Out recorded successfully!');
                    this.restartScanner();
                }
            }
            catch (error) {
                console.error('Time Out error:', error);
                alert('Failed to record Time Out. Please try again.');
            }
            finally {
                this.loading = false;
            }
        },
        restartScanner() {
            if (this.scanner) {
                this.scanner.clear();
                this.initScanner();
                this.error = null;
                this.userData = null;
                this.scannedResult = null;
            }
        }
    },
    beforeUnmount() {
        if (this.scanner) {
            this.scanner.clear();
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
        (__VLS_ctx.loading ? 'Recording...' : 'Time In');
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleTimeOut) },
            ...{ class: ("time-out-button") },
            disabled: ((__VLS_ctx.loading)),
        });
        (__VLS_ctx.loading ? 'Recording...' : 'Time Out');
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