import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    
    const accessToken = useLocalStorage('accessToken', null);
    const successLogin = ref(false);
    
    async function login(state) {
        try {
            
            const url = 'http://localhost:3000/login';
            const response = await axios.post(url, state)
            
            const aToken = response.data.accessToken;
            
            accessToken.value = aToken;

            successLogin.value = true;
        }
        catch (e) {
            console.log(e);
        }
    }

    function logout() {
        return new Promise( (resolve, reject) => {
            try {
                accessToken.value = null;
                successLogin.value = false;
                resolve();
            }
            catch (e) {
                reject();
            }
        });
    }

    const loggedIn = () => !!accessToken.value
    // const loggedIn = () => accessToken.value ? true : false

    const authSuccess = computed ( () => successLogin.value );

    return { 
        accessToken,
        login,
        loggedIn,
        logout,
        authSuccess,
    }
})