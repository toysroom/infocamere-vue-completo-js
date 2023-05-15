<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const state = reactive({
  email: '',
  password: ''
})

const login = async () => {
  authStore.login(state);
}



const router = useRouter();
const { authSuccess } = storeToRefs( authStore );
watch(authSuccess, (newValue) => {
  if (newValue) {
    router.push('dashboard');
  }
});

</script>
<template>
  <div>
  <h1>Login</h1>
  <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address*</label>
          <input type="email" class="form-control" id="email" v-model="state.email">
          
        </div>
        
        <div class="mb-3">
          <label for="password" class="form-label">Password*</label>
          <input type="password" class="form-control" id="password" v-model="state.password">
        </div>

        <button type="submit" class="btn btn-primary">accedi</button>

  </form>
</div>
</template>

