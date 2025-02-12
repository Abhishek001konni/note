import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        accessToken: null,
        refreshToken: null, 
        user : null,
    }),
    actions: {
        setTokens(accessToken, refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
        },
        clearTokens() {
            this.accessToken = null;
            this.refreshToken = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            
        },
        loadTokens() {
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
        
        },
},
    
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
    }
});


