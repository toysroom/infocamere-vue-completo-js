<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore} from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
    authStore.logout()
        .then( () => {
            router.push('/');
        })
        .catch( () => {

        })
        ;
}

</script>
<template>
    <div>
        <h1>Dahboard</h1>

        <button @click="logout">Logout</button>
    </div>
</template>