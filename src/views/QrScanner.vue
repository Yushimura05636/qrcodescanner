<template>
  <div class="qr-scanner">
    <h2>QR Code Scanner</h2>
    <div id="reader"></div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="scannedResult" class="success-message">
      <h3>Scanned Successfully!</h3>
      <p>Result: {{ scannedResult }}</p>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode"

export default {
  name: 'QrScanner',
  data() {
    return {
      html5QrCode: null,
      error: '',
      scannedResult: null
    }
  },
  mounted() {
    this.initializeScanner()
  },
  beforeDestroy() {
    if (this.html5QrCode) {
      this.html5QrCode.stop().catch(error => {
        console.error('Error stopping scanner:', error)
      })
    }
  },
  methods: {
    initializeScanner() {
      this.html5QrCode = new Html5Qrcode("reader", { 
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        willReadFrequently: true
      })
      
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      this.html5QrCode.start(
        { facingMode: "environment" },
        config,
        this.onScanSuccess,
        this.onScanError
      ).catch(error => {
        this.error = `Error starting scanner: ${error}`
      })
    },
    onScanSuccess(decodedText) {
      this.scannedResult = decodedText
      console.log('QR Code detected:', decodedText)
      
      // Stop scanning after successful scan
      if (this.html5QrCode) {
        this.html5QrCode.stop().catch(error => {
          console.error('Error stopping scanner:', error)
        })
      }
    },
    onScanError(error) {
      // Handle scan errors (usually just ignore them as they happen frequently)
      console.debug(`QR Code scan error: ${error}`)
    }
  }
}
</script>

<style scoped>
.qr-scanner {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

#reader {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ecfdf5;
  color: #047857;
  border-radius: 4px;
  text-align: center;
}

.success-message h3 {
  margin-bottom: 10px;
}
</style>