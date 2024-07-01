<template>
  <div class="container">
    <CommonTab />
    <div class="right-pane">
      <div class="profile-edit">
        <h2>Edit Profile</h2>
        <div class="profile-field">
          <label for="username">Username:</label>
          <input id="username" v-model="localUserProfile.username" @input="validateUsername" placeholder="Username" />
          <span v-if="errors.username" class="error">{{ errors.username }}</span>
        </div>
        <div class="profile-field">
          <label for="email">Email:</label>
          <input id="email" v-model="localUserProfile.email" @input="validateEmail" placeholder="Email" />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="profile-field">
          <label for="phone">Phone:</label>
          <input id="phone" v-model="localUserProfile.phone" @input="validatePhone" placeholder="Phone" />
          <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
        </div>
        <button class="save-button" @click="saveProfile" :disabled="hasErrors">Save</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import CommonTab from './CommonTab.vue';

interface UserProfile {
  username: string;
  email: string;
  phone: string;
}

export default defineComponent({
  name: 'ProfileEdit',
  components: {
    CommonTab
  },
  props: {
    userProfile: {
      type: Object as () => UserProfile,
      required: true
    }
  },
  setup(props, { emit }) {
    const localUserProfile = ref<UserProfile>({ ...props.userProfile });
    const errors = ref<{ username: string, email: string, phone: string }>({ username: '', email: '', phone: '' });

    const validateUsername = () => {
      if (!localUserProfile.value.username) {
        errors.value.username = 'Username is required.';
      } else {
        errors.value.username = '';
      }
    };

    const validateEmail = () => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!localUserProfile.value.email) {
        errors.value.email = 'Email is required.';
      } else if (!emailPattern.test(localUserProfile.value.email)) {
        errors.value.email = 'Invalid email format.';
      } else {
        errors.value.email = '';
      }
    };

    const validatePhone = () => {
      const phonePattern = /^[0-9]{10}$/;
      if (!localUserProfile.value.phone) {
        errors.value.phone = 'Phone is required.';
      } else if (!phonePattern.test(localUserProfile.value.phone)) {
        errors.value.phone = 'Invalid phone format.';
      } else {
        errors.value.phone = '';
      }
    };

    const saveProfile = () => {
      validateUsername();
      validateEmail();
      validatePhone();
      if (!hasErrors.value) {
        emit('save', localUserProfile.value);
      }
    };

    const hasErrors = ref<boolean>(false);

    watch(errors, (newErrors) => {
      hasErrors.value = !!newErrors.username || !!newErrors.email || !!newErrors.phone;
    }, { deep: true });

    return {
      localUserProfile,
      errors,
      validateUsername,
      validateEmail,
      validatePhone,
      saveProfile,
      hasErrors
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  background-color: #f0f0f0;
}

.right-pane {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.profile-edit {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.profile-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
}

.error {
  color: red;
  font-size: 0.875rem;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.save-button[disabled] {
  background-color: #9b8cf0;
  cursor: not-allowed;
}

.save-button:hover:not([disabled]) {
  background-color: #3700b3;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .right-pane {
    padding: 20px;
  }

  .save-button {
    padding: 8px;
  }
}
</style>
