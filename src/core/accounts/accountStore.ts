// @ts-check
import { defineStore } from 'pinia';
import {  formatUTCDateToLocal } from 'src/util/utils';

export const useAccountStore = defineStore({
  id: 'account',

  state: () => ({
    isLoggedIn: false,
    token: '',
    username: '',
    maskedEmail: '',
    dateRegistered: '',
    lastLogin: ''
  }),

  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },
    getToken(state) {
      return state.token;
    },
    getUsername(state) {
      return state.username;
    },
    getMaskedEmail(state) {
      return state.maskedEmail;
    },
    getDateRegistered(state) {
      return state.dateRegistered;
    },
    getLastLogin(state){
      return state.lastLogin
    }
  },

  actions: {
    setIsLoggedIn(flag: boolean) {
      this.isLoggedIn = flag;
    },
    setToken(token: string) {
      this.token = token;
    },
    setUsername(username: string) {
      this.username = username.toLowerCase();
    },
    setMaskedEmail(maskedEmail: string) {
      this.maskedEmail = maskedEmail;
    },
    setDateRegistered(dateRegistered: string) {
      this.dateRegistered = formatUTCDateToLocal(dateRegistered);
    },
    setLastLogin(lastLogin: string) {
      this.lastLogin = formatUTCDateToLocal(lastLogin);
    }
  }
});
