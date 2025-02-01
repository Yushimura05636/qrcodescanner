import { Html5Qrcode } from "html5-qrcode";
export default (await import('vue')).defineComponent({
    name: 'QrScanner',
    data() {
        return {
            html5QrCode: null,
            error: '',
            scannedResult: null
        };
    },
    mounted() {
        this.initializeScanner();
    },
    beforeDestroy() {
        if (this.html5QrCode) {
            this.html5QrCode.stop().catch(error => {
                console.error('Error stopping scanner:', error);
            });
        }
    },
    methods: {
        initializeScanner() {
            this.html5QrCode = new Html5Qrcode("reader", {
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true
                },
                willReadFrequently: true
            });
            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            };
            this.html5QrCode.start({ facingMode: "environment" }, config, this.onScanSuccess, this.onScanError).catch(error => {
                this.error = `Error starting scanner: ${error}`;
            });
        },
        onScanSuccess(decodedText) {
            this.scannedResult = decodedText;
            console.log('QR Code detected:', decodedText);
            // Stop scanning after successful scan
            if (this.html5QrCode) {
                this.html5QrCode.stop().catch(error => {
                    console.error('Error stopping scanner:', error);
                });
            }
        },
        onScanError(error) {
            // Handle scan errors (usually just ignore them as they happen frequently)
            console.debug(`QR Code scan error: ${error}`);
        }
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['success-message',];
    // CSS variable injection 
    // CSS variable injection end 
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
    }
    if (__VLS_ctx.scannedResult) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("success-message") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.scannedResult);
    }
    ['qr-scanner', 'error-message', 'success-message',];
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