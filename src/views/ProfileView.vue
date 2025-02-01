<template>
  <div class="profile-container">
    <div v-if="loading" class="loading">Loading profile...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="person" class="profile-card">
      <h2>Profile Details</h2>
      
      <div class="profile-section">
        <div class="profile-field">
          <label>First Name</label>
          <input type="text" v-model="person.firstname" :disabled="!isEditing" />
        </div>
        
        <div class="profile-field">
          <label>Last Name</label>
          <input type="text" v-model="person.lastname" :disabled="!isEditing" />
        </div>
        
        <div class="profile-field">
          <label>Email</label>
          <input type="email" v-model="person.email" :disabled="!isEditing" />
        </div>
        
        <div class="profile-field">
          <label>Phone</label>
          <input type="tel" v-model="person.phone" :disabled="!isEditing" />
        </div>
        
        <div class="profile-field">
          <label>Gender</label>
          <select v-model="person.gender" :disabled="!isEditing">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        
        <div class="profile-field">
          <label>QR Code</label>
          <input type="text" v-model="person.qr_code" disabled />
        </div>
      </div>

      <div class="button-group">
        <button v-if="!isEditing" @click="startEditing" class="edit-btn">
          Edit Profile
        </button>
        <template v-else>
          <button @click="saveChanges" class="save-btn" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
          <button @click="cancelEditing" class="cancel-btn" :disabled="saving">
            Cancel
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileView',
  data() {
    return {
      person: null,
      originalPerson: null,
      loading: true,
      error: null,
      isEditing: false,
      saving: false
    }
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      this.fetchProfile(id);
    } else {
      this.error = 'No profile ID provided';
      this.loading = false;
    }
  },
  methods: {
    async fetchProfile(id) {
      try {
        this.loading = true;
        const response = await axios.get(`https://qrscannerdb-production.up.railway.app/api/call/people/${id}`);
        this.person = response.data;
        this.originalPerson = { ...response.data };
      } catch (error) {
        console.error('Error fetching profile:', error);
        this.error = 'Failed to load profile';
      } finally {
        this.loading = false;
      }
    },
    startEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.person = { ...this.originalPerson };
      this.isEditing = false;
    },
    async saveChanges() {
      try {
        this.saving = true;
        const response = await axios.put(
          `https://qrscannerdb-production.up.railway.app/api/call/people/${this.person.id}`,
          this.person
        );
        this.person = response.data;
        this.originalPerson = { ...response.data };
        this.isEditing = false;
        
        // Show success message
        alert('Profile updated successfully!');
        
        // Safely handle window closing
        try {
          // Check if window.opener exists and is accessible
          if (window.opener && !window.opener.closed) {
            window.opener.location.href = '/history';
          }
          window.close();
        } catch (e) {
          console.log('Window handling error:', e);
          // Fallback: redirect in current window
          this.$router.push('/history');
        }
        
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      } finally {
        this.saving = false;
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.profile-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.profile-section {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #4a5568;
}

input, select {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:disabled, select:disabled {
  background-color: #f7fafc;
  cursor: not-allowed;
}

input:not(:disabled):focus, select:not(:disabled):focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn {
  background-color: #2563eb;
  color: white;
}

.cancel-btn {
  background-color: #dc2626;
  color: white;
}

.edit-btn:hover, .save-btn:hover, .cancel-btn:hover {
  transform: translateY(-2px);
}

.edit-btn:hover {
  background-color: #45a049;
}

.save-btn:hover {
  background-color: #1d4ed8;
}

.cancel-btn:hover {
  background-color: #b91c1c;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #dc2626;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .profile-card {
    background: #1a1c20;
  }

  h2 {
    color: #fff;
  }

  label {
    color: #e2e8f0;
  }

  input, select {
    background-color: #2c3e50;
    border-color: #4a5568;
    color: #fff;
  }

  input:disabled, select:disabled {
    background-color: #2c3e50;
    color: #95a5a6;
  }
}

/* Responsive Design */
@media (max-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;
  }

  .edit-btn, .save-btn, .cancel-btn {
    width: 100%;
  }
}
</style> 