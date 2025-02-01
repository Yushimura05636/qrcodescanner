<template>
  <div class="container">
    <!-- Add debug info -->
    <p>Number of people: {{ people.length }}</p>
    <pre>{{ JSON.stringify(people, null, 2) }}</pre>
    
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Gender</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>QR Code</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="people.length === 0">
          <td colspan="6">Loading people...</td>
        </tr>
        <tr v-else v-for="person in people" :key="person.id" class="table-secondary">
          <td scope="row" class="gender-cell">
            <img 
              :src="getGenderImage(person.gender)" 
              :alt="person.gender"
              class="gender-icon"
            >
          </td>
          <td scope="row">{{ person.firstname }}</td>
          <td scope="row">{{ person.lastname }}</td>
          <td scope="row">{{ person.email }}</td>
          <td scope="row">{{ person.phone }}</td>
          <td class="qr-cell">
            <div class="qr-container" @click="showQRModal(person.qr_code)">
              <template v-if="person.qr_code">
                <qrcode-vue 
                  :value="person.qr_code" 
                  :size="100" 
                  level="H" 
                  render-as="canvas"
                />
                <small class="qr-string">{{ person.qr_code }}</small>
              </template>
              <template v-else>
                <div class="no-qr">
                  <span>QR Code Not Available</span>
                </div>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Modal -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal-content" @click.stop>
        <qrcode-vue 
          :value="selectedQR" 
          :size="300" 
          level="H" 
          render-as="canvas"
        />
        <small class="qr-string">{{ selectedQR }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'AboutView',
  components: {
    QrcodeVue
  },
  data() {
    return {
      people: [],
      history: [],
      user: [],
      showModal: false,
      selectedQR: '',
      genderImages: {
        male: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
        female: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png'
      }
    }
  },
  created() {
    this.getPeople();
  },
  methods: {
    async getPeople() {
      try {
        const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
        this.people = response.data;
        console.log('People from getPeople:', this.people);
      } catch (error) {
        console.error(error);
      }
    },
    showQRModal(qrCode) {
      this.selectedQR = qrCode;
      this.showModal = true;
    },
    getGenderImage(gender) {
      const lowerGender = gender?.toLowerCase() || 'male';
      return this.genderImages[lowerGender] || this.genderImages.male;
    }
  },
  async mounted() {
    console.log('mounted about view');
    await this.getPeople();
    console.log('People from mounted:', this.people);
  }
}
</script>

<style scoped>
.container {
  padding: 2rem;
}

.qr-cell {
  vertical-align: middle !important;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.qr-container:hover {
  transform: scale(1.05);
}

.qr-string {
  font-family: monospace;
  font-size: 0.8rem;
  color: #666;
  word-break: break-all;
  max-width: 150px;
  text-align: center;
}

.no-qr {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
}

.no-qr span {
  font-size: 0.8rem;
  color: #6b7280;
  text-align: center;
  padding: 0.5rem;
}

table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th {
  background-color: #f8f9fa;
  padding: 1rem !important;
}

td {
  padding: 1rem !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.gender-cell {
  text-align: center;
  vertical-align: middle !important;
}

.gender-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
  transition: transform 0.2s ease;
}

.gender-icon:hover {
  transform: scale(1.1);
  border-color: #4CAF50;
}
</style>
