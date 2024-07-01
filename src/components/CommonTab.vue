<template>
  <div class="left-pane">
    <h1>Blocklet App</h1>
    <p>my first blocklet app</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftPane'
});
</script>

<style scoped>
.left-pane {
  text-align: center;
  flex: 1;
  background-color: #6200ea;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .left-pane {
    text-align: center;
    padding: 20px;
  }
}
</style>