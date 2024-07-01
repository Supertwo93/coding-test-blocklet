<template>
  <div class="container">
    <CommonTab />
    <div class="right-pane">
      <div class="profile-view">
        <h2>Profile Information</h2>
        <div v-for="item in Object.keys(userProfile)" :keys="item" class="profile-field">
          <label>{{item}}:</label>
          <span>{{ userProfile[item] }}</span>
        </div>
        <button class="edit-button" @click="$emit('edit')">Edit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CommonTab from './CommonTab.vue';
interface UserProfile {
  username: string;
  email: string;
  phone: string;
}

export default defineComponent({
  name: 'ProfileView',
  components: {
    CommonTab,
  },
  props: {
    userProfile: {
      type: Object as () => UserProfile,
      required: true
    }
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

.profile-view {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.profile-field {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

.edit-button {
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

.edit-button:hover {
  background-color: #3700b3;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left-pane {
    text-align: center;
    padding: 20px;
  }

  .right-pane {
    padding: 20px;
  }

  .edit-button {
    padding: 8px;
  }
}
</style>
