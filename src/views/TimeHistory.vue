<template>
  <div class="history-container">
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
            <td>{{ record.personDetails ? `${record.personDetails.firstname} ${record.personDetails.lastname}` : 'Unknown' }}</td>
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
      error: null
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

        this.history = historyResponse.data;
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
      window.open(`/profile?id=${personId}`, '_blank');
    }
  }
}
</script>

<style scoped>
.history-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  min-width: 120px;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

tr:hover {
  background-color: #f8f9fa;
}

.time-in {
  border-left: 4px solid #2563eb;
}

.time-out {
  border-left: 4px solid #dc2626;
}

.loading-message, .no-records {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error-message {
  color: #dc2626;
  text-align: center;
  margin: 20px 0;
}

.history-table td:nth-child(2),
.history-table td:nth-child(3) {
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .history-container {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  th, td {
    padding: 10px;
    font-size: 0.9rem;
  }

  .table-container {
    border-radius: 8px;
    overflow-x: auto;
  }
}

@media (max-width: 1024px) {
  .history-table {
    font-size: 0.9rem;
  }

  .history-table th,
  .history-table td {
    padding: 10px 8px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .table-container {
    background: #1a1c20;
  }

  .history-table {
    background: #1a1c20;
  }

  th {
    background-color: #2c3e50;
    color: #fff;
  }

  td {
    color: #fff;
  }

  tr:hover {
    background-color: #2c3e50;
  }

  .loading-message, .no-records {
    color: #95a5a6;
  }

  .history-table td:nth-child(2),
  .history-table td:nth-child(3) {
    color: #95a5a6;
  }
}

/* Add styles for the edit button */
.edit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
}

.edit-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.edit-button:active {
  transform: translateY(0);
}

.button-text {
  display: inline-block;
}

.icon {
  display: inline-block;
  font-size: 1.1rem;
}

/* Responsive styles for the button */
@media (max-width: 768px) {
  .button-text {
    display: none;
  }
  
  .edit-button {
    padding: 8px;
  }
  
  .icon {
    margin: 0;
  }
}

/* Dark mode support for the button */
@media (prefers-color-scheme: dark) {
  .edit-button {
    background-color: #2ecc71;
  }
  
  .edit-button:hover {
    background-color: #27ae60;
  }
}

/* Update table styles for the new column */
.history-table th:last-child,
.history-table td:last-child {
  text-align: center;
  min-width: 100px;
}

@media (max-width: 480px) {
  .history-table th:last-child,
  .history-table td:last-child {
    min-width: 50px;
  }
}
</style> 