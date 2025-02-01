<template>
  <div class="qr-scanner-container">
    <div class="qr-scanner">
      <h2>QR Code Scanner</h2>
      <div id="reader"></div>
      
      <div v-if="error" class="error-message">
        {{ error }}
        <button class="rescan-button" @click="restartScanner">Re-scan</button>
      </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="userData" class="modal-overlay">
      <div class="modal-content">
        <h3>User Details Found!</h3>
        <div class="user-details">
          <p><strong>Name:</strong> {{ userData.firstname }} {{ userData.lastname }}</p>
          <p><strong>Email:</strong> {{ userData.email }}</p>
          <p><strong>Phone:</strong> {{ userData.phone }}</p>
          <p><strong>QR Code:</strong> {{ userData.qr_code }}</p>
        </div>
        
        <div class="time-buttons">
          <button 
            class="time-in-button" 
            @click="handleTimeIn"
            :disabled="loading"
          >
            {{ loading ? 'Recording...' : 'Time In' }}
          </button>
          <button 
            class="time-out-button" 
            @click="handleTimeOut"
            :disabled="loading"
          >
            {{ loading ? 'Recording...' : 'Time Out' }}
          </button>
        </div>
        
        <button class="rescan-button" @click="restartScanner">Re-scan</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

export default {
  name: 'QrScanner',
  data() {
    return {
      scanner: null,
      scannedResult: null,
      error: null,
      userData: null,
      loading: false
    }
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
        } else {
          console.log('No user found for QR code:', decodedText);
          this.error = 'No user found';
          this.userData = null;
        }
      } catch (error) {
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
      } catch (error) {
        console.error('Time In error:', error);
        alert('Failed to record Time In. Please try again.');
      } finally {
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
      } catch (error) {
        console.error('Time Out error:', error);
        alert('Failed to record Time Out. Please try again.');
      } finally {
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
}
</script>

<style scoped>
.qr-scanner-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.qr-scanner {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

#reader {
  width: 100%;
  margin: 0 auto;
}

.success-message {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.user-details {
  margin: 15px 0;
}

.user-details p {
  margin: 8px 0;
}

.time-buttons {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;
}

.time-in-button,
.time-out-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.time-in-button {
  background-color: #2563eb;
  color: white;
}

.time-out-button {
  background-color: #dc2626;
  color: white;
}

.time-in-button:hover,
.time-out-button:hover {
  transform: translateY(-2px);
}

.time-in-button:hover {
  background-color: #1d4ed8;
}

.time-out-button:hover {
  background-color: #b91c1c;
}

.rescan-button {
  display: block;
  margin: 15px auto 0;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin-top: 15px;
}

@media (max-width: 480px) {
  .qr-scanner-container {
    padding: 10px;
  }
  
  .time-buttons {
    flex-direction: column;
  }
  
  .time-in-button,
  .time-out-button {
    width: 100%;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  width: 400px;
  position: relative;
  animation: slideIn 0.3s ease;
}

.modal-content h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.user-details {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.user-details p {
  margin: 0.5rem 0;
  color: #4a5568;
}

.user-details strong {
  color: #2d3748;
}

.time-buttons {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  justify-content: center;
}

.time-in-button,
.time-out-button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.time-in-button {
  background-color: #2563eb;
  color: white;
}

.time-out-button {
  background-color: #dc2626;
  color: white;
}

.time-in-button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}

.time-out-button:hover {
  background-color: #b91c1c;
  transform: translateY(-2px);
}

.rescan-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.rescan-button:hover {
  background-color: #45a049;
}

.time-in-button:disabled,
.time-out-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Mobile Responsiveness */
@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    padding: 1.5rem;
  }

  .time-buttons {
    flex-direction: column;
  }

  .time-in-button,
  .time-out-button {
    width: 100%;
  }

  .user-details {
    padding: 0.75rem;
  }
}
</style>