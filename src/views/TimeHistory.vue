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
          <h2>Time Records History</h2>
          
          <div class="table-container">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Description</th>
                  <th>Date & Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="6" class="loading-message">Loading records...</td>
                </tr>
                <tr v-else-if="combinedHistory.length === 0">
                  <td colspan="6" class="no-records">No time records found</td>
                </tr>
                <tr v-else v-for="record in combinedHistory" :key="record.id" 
                    :class="{'time-in': record.description === 'Time In', 'time-out': record.description === 'Time Out'}">
                  <td>
                    <div class="flex items-center space-x-3">
                      <img 
                        :src="getProfileImage(record.personDetails?.gender)"
                        :alt="`${record.personDetails?.firstname}'s profile`"
                        class="w-8 h-8 rounded-full"
                      />
                      <span class="px-3">{{ record.personDetails ? `${record.personDetails.firstname} ${record.personDetails.lastname}` : 'Unknown' }}</span>
                    </div>
                  </td>
                  <td>{{ record.personDetails ? record.personDetails.email : 'N/A' }}</td>
                  <td>{{ record.personDetails ? record.personDetails.phone : 'N/A' }}</td>
                  <td>{{ record.description }}</td>
                  <td>{{ formatDateTime(record.datetime) }}</td>
                  <td>
                    <button 
                      v-if="record.personDetails"
                      class="edit-button"
                      @click="openProfile(record.personDetails.id)"
                      title="Edit Profile"
                    >
                      <span class="button-text">Edit Profile</span>
                      <span class="icon">📝</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="h-30 bg-gradient-to-r from-orange-500 to-orange-600 w-full mt-auto"></div>

    <!-- Success Toast -->
    <div 
      v-if="showSuccess" 
      class="fixed top-4 right-4 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-all duration-500 ease-in-out"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>Successfully scanned!</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TimeHistory',
  data() {
    return {
      history: [],
      people: [],
      loading: true,
      error: null,
      maleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
      femaleImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/45.png',
      showSuccess: false
    }
  },
  computed: {
    combinedHistory() {
      return this.history.map(record => {
        const personDetails = this.people.find(person => person.id === record.person_id);
        return {
          ...record,
          personDetails
        };
      });
    }
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    async fetchAllData() {
      try {
        this.loading = true;
        // Fetch both history and people data
        const [historyResponse, peopleResponse] = await Promise.all([
          axios.get('https://qrscannerdb-production.up.railway.app/api/call/history'),
          axios.get('https://qrscannerdb-production.up.railway.app/api/call/people')
        ]);

        console.log('History data:', historyResponse.data);
        console.log('People data:', peopleResponse.data);

        this.history = historyResponse.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
        this.people = peopleResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Failed to load data';
      } finally {
        this.loading = false;
      }
    },
    formatDateTime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    openProfile(personId) {
      window.open(`/profile/${personId}`, '_blank');
    },
    getProfileImage(gender) {
      return gender === 'male' ? this.maleImage : this.femaleImage
    },
    getGenderIcon(gender) {
      return gender === 'male' 
        ? 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png'
        : 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/86.png'
    },
    editRecord(record) {
      console.log('Editing record:', record)
    },
    showSuccessToast() {
      this.showSuccess = true
      setTimeout(() => {
        this.showSuccess = false
      }, 2000) // Hide after 2 seconds to match login/register
    }
  }
}
</script>

<style scoped>
/* Navigation styles */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: rgb(255, 237, 213);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after,
.router-link-active::after {
  width: 70%;
}

.router-link-active {
  font-weight: 500;
  color: rgb(255, 237, 213);
}

/* Enhanced Table Styles */
.table-container {
  max-height: 400px; /* Fixed height for 4-5 rows */
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.history-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
}

th {
  background-color: #f8f9fa;
  color: #4b5563;
  font-weight: 600;
  padding: 16px;
  text-align: left;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

td {
  padding: 16px;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

tr:hover td {
  background-color: #f9fafb;
}

.time-in {
  border-left: 4px solid #10b981;  /* Emerald-500 */
}

.time-out {
  border-left: 4px solid #ef4444;  /* Red-500 */
}

.loading-message, .no-records {
  text-align: center;
  padding: 24px;
  color: #6b7280;
  font-weight: 500;
}

/* Edit button styles */
.edit-button {
  padding: 8px 12px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.edit-button:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.edit-button .icon {
  font-size: 1.1em;
}

/* Sticky Header */
.history-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9fa;
}

/* Scrollbar Styling */
.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .history-table {
    background-color: #1f2937;
  }

  th {
    background-color: #374151;
    color: #e5e7eb;
    border-bottom-color: #4b5563;
  }

  td {
    color: #e5e7eb;
    border-bottom-color: #4b5563;
  }

  tr:hover td {
    background-color: #2d3748;
  }

  .loading-message, .no-records {
    color: #9ca3af;
  }

  .edit-button {
    background-color: #374151;
    color: #e5e7eb;
  }

  .edit-button:hover {
    background-color: #4b5563;
    color: #f3f4f6;
  }

  .history-table thead {
    background-color: #1f2937;
  }

  .table-container::-webkit-scrollbar-track {
    background: #374151;
  }

  .table-container::-webkit-scrollbar-thumb {
    background: #4b5563;
  }

  .table-container::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  th, td {
    padding: 12px;
    font-size: 0.875rem;
  }

  .edit-button {
    padding: 6px 10px;
  }
}
</style> 