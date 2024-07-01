<template>
  <div class="profile-container">
    <ProfileView v-if="!editMode" :userProfile="userProfile" @edit="editMode = true" />
    <ProfileEdit v-else :userProfile="userProfile" @save="saveProfile" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import ProfileView from './components/ProfileView.vue';
import ProfileEdit from './components/ProfileEdit.vue';

interface UserProfile {
  username: string;
  email: string;
  phone: string;
}

export default defineComponent({
  name: 'Profile',
  components: {
    ProfileView,
    ProfileEdit
  },
  setup() {
    const userProfile = ref<UserProfile>({ username: '', email: '', phone: '' });
    const editMode = ref(false);

    const fetchProfile = async () => {
      const response = await axios.get('/api/profile');
      userProfile.value = response.data;
    };

    const saveProfile = async (updatedProfile: UserProfile) => {
      await axios.put('/api/profile', updatedProfile);
      userProfile.value = updatedProfile;
      editMode.value = false;
    };

    onMounted(fetchProfile);

    return {
      userProfile,
      editMode,
      saveProfile
    };
  }
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }
}
</style>