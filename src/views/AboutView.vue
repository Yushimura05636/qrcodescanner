<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center">
    <!-- Header Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full flex items-center justify-between">
      <!-- Left side: Logo and Title -->
      <div class="flex items-center ml-8">
        <svg 
          class="h-8 w-8 text-white mr-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
        <h1 class="text-2xl font-bold text-white">QR Scanner</h1>
      </div>

      <!-- Right side: Navigation -->
      <nav class="flex items-center mr-8">
        <router-link 
          to="/scanner" 
          class="px-4 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
          :class="{ 'opacity-75 font-semibold': $route.path === '/scanner' }"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/history" 
          class="px-4 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
          :class="{ 'opacity-75 font-semibold': $route.path === '/history' }"
        >
          History
        </router-link>
        <router-link 
          to="/about" 
          class="px-4 py-2 text-sm font-medium text-white hover:opacity-75 transition-all duration-200"
          :class="{ 'opacity-75 font-semibold': $route.path === '/about' }"
        >
          Users
        </router-link>
        <button 
          @click="logout" 
          class="ml-4 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex-grow">
      <div class="relative -mt-24 flex flex-col items-center">
        <div class="bg-white rounded-xl shadow-md p-8 w-full mt-12">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b">
                <th class="p-4 text-left bg-gray-50">Gender</th>
                <th class="p-4 text-left bg-gray-50">First Name</th>
                <th class="p-4 text-left bg-gray-50">Last Name</th>
                <th class="p-4 text-left bg-gray-50">Email</th>
                <th class="p-4 text-left bg-gray-50">Phone</th>
                <th class="p-4 text-left bg-gray-50">QR Code</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="people.length === 0">
                <td colspan="6" class="p-4 text-center">Loading people...</td>
              </tr>
              <tr 
                v-else 
                v-for="person in people" 
                :key="person.id" 
                class="border-b hover:bg-gray-50 cursor-pointer"
                @click="openProfile(person.id, $event)"
              >
                <td class="p-4">
                  <div class="flex flex-col items-center gap-2">
                    <img 
                      :src="getGenderImage(person.gender)" 
                      :alt="person.gender"
                      class="w-10 h-10 rounded-full"
                    >
                    <span class="text-sm text-gray-600">{{ capitalizeFirstLetter(person.gender) }}</span>
                  </div>
                </td>
                <td class="p-4">{{ person.firstname }}</td>
                <td class="p-4">{{ person.lastname }}</td>
                <td class="p-4">{{ person.email }}</td>
                <td class="p-4">{{ person.phone }}</td>
                <td class="p-4">
                  <div 
                    class="flex justify-center cursor-pointer hover:scale-105 transition-transform" 
                    @click.stop="showQRModal(person.qr_code)"
                  >
                    <qrcode-vue 
                      :value="person.qr_code" 
                      :size="100" 
                      level="H" 
                      render-as="canvas"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto"></div>

    <!-- Modal -->
    <div v-if="showModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
         @click="showModal = false">
      <div class="bg-white rounded-xl p-8 flex flex-col items-center gap-4" @click.stop>
        <qrcode-vue 
          :value="selectedQR" 
          :size="300" 
          level="H" 
          render-as="canvas"
        />
        <p class="text-sm text-gray-600 break-all max-w-md text-center">{{ selectedQR }}</p>
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
    console.log('AboutView component created');
    this.getPeople();
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    },
    async getPeople() {
      try {
        console.log('Fetching people data...');
        const response = await axios.get('https://qrscannerdb-production.up.railway.app/api/call/people');
        console.log('People data received:', response.data);
        this.people = response.data;
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    },
    showQRModal(qrCode) {
      this.selectedQR = qrCode;
      this.showModal = true;
    },
    getGenderImage(gender) {
      return this.genderImages[gender?.toLowerCase()] || this.genderImages.male;
    },
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    openProfile(id, event) {
      // Prevent opening profile if clicking on QR code
      if (event.target.closest('.qr-code')) return;
      
      // Open profile in new tab
      window.open(`/profile/${id}`, '_blank');
    }
  },
  async mounted() {
    console.log('mounted about view');
    await this.getPeople();
    console.log('People from mounted:', this.people);
  }
}
</script>
