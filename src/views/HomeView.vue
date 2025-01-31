<template>
  <h1>Hello World</h1>
  <div>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="decodedText">Scanned Result: {{ decodedText }}</p>
    <qrcode-stream @init="onInit" @decode="onDecode" :track="{ facingMode: 'environment' }" class="qr-scanner"/>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
export default {
  components: {
    QrcodeStream
  },
  data(){
    return {
      error: '',
      decodedText: ''
    }
  },
  methods: {
    async onInit(promise) {
      this.error = ''; // Clear any previous errors
      
      try {
        await promise;
      } catch (error) {
        if(error.name === 'NotAllowedError'){
          this.error = 'Error: Camera permission denied';
        } else if(error.name === 'NotFoundError'){
          this.error = 'Error: No camera found';
        } else if(error.name === 'NotSupportedError'){
          this.error = 'Error: Camera not supported';
        } else if(error.name === 'NotReadableError'){
          this.error = 'Error: Camera not readable';
        } else {
          this.error = `Error: ${error.message}`;
        }
      }
    },
    onDecode(decodedText) {
      try {
        this.error = ''; // Clear any previous errors
        this.decodedText = decodedText;
        console.log('Decoded text:', decodedText); // For debugging
      } catch (error) {
        this.error = `Decoding error: ${error.message}`;
      }
    }
  }
}
</script>

<style scoped>
.qr-scanner {
  width: 100%;
  max-width: 400px;
  height: 300px;
}

.error {
  color: red;
}
</style>