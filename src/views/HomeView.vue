<template>
  <h1>Hello World</h1>
  <div>
    <p>{{ error }}</p>
    <p>{{ decodedText }}</p>
    <qrcode-stream @init="onInit" @decode="onDecode"/>
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
    async onInit( promise){
      console.log(promise);

      try {
        const { capabilities } = await promise;
        console.log(capabilities);
      } catch (error) {
        if(error.name === 'NotAllowedError'){
          console.log('Camera is not allowed');
        } else if(error.name === 'NotFoundError'){
          console.log('No camera found');
        } else if(error.name === 'NotSupportedError'){
          console.log('Camera is not supported');
        } else if(error.name === 'NotReadableError'){
          console.log('Camera is not readable');
        }
        console.error(error);
      }

    },
    onDecode(decodedText){
      this.decodedText = decodedText;
    }
  }
}
</script>