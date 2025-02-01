<template>
  <div class="qr-scanner">
    <h2>QR Code Scanner</h2>
    <div id="reader"></div>
    <div v-if="error" class="error-message">
      {{ error }}
      <button class="rescan-button" @click="restartScanner">Re-scan</button>
    </div>
    <div v-if="userData" class="success-message">
      <h3>User Details Found!</h3>
      <div class="user-details">
        <p><strong>Name:</strong> {{ userData.firstname }} {{ userData.lastname }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <p><strong>Phone:</strong> {{ userData.phone }}</p>
        <p><strong>QR Code:</strong> {{ userData.qr_code }}</p>
      </div>
      <button class="rescan-button" @click="restartScanner">Re-scan</button>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode"
import axios from 'axios'

export default {
  name: 'QrScanner',
  data() {
    return {
      html5QrCode: null,
      error: '',
      scannedResult: null,
      userData: null
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
    async onScanSuccess(decodedText) {
      this.scannedResult = decodedText
      console.log('QR Code detected:', decodedText)
      
      try {
        const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
        
        if (response.data) {
          // Find the user with matching QR code from the array
          const user = response.data.find(user => user.qr_code === decodedText);
          
          if (user) {
            this.userData = user;
            this.error = '';
          } else {
            this.error = 'No user found';
            this.userData = null;
          }
        } else {
          this.error = 'No user found';
          this.userData = null;
        }
      } catch (error) {
        this.error = 'No user found';
        this.userData = null;
        console.error('Error:', error);
      }
      
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
    },
    async restartScanner() {
      this.error = '';
      this.userData = null;
      this.scannedResult = null;
      
      if (this.html5QrCode) {
        await this.html5QrCode.stop();
        this.initializeScanner();
      }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ecfdf5;
  color: #047857;
  border-radius: 4px;
  text-align: left;
}

.success-message h3 {
  margin-bottom: 15px;
  text-align: center;
}

.user-details p {
  margin: 8px 0;
  padding: 8px;
  background-color: #f8fafc;
  border-radius: 4px;
}

.user-details strong {
  color: #065f46;
}

.rescan-button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.rescan-button:hover {
  background-color: #2563eb;
}
</style>