const account = {
  getDetails: 'account/details',
  getLoginHistory: 'account/login-history',
  passwordReset: 'account/password-reset',
  login: 'account/login',
  initializeRegistration: 'account/initialize-registration',
  verifyRegistration: 'account/verify-registration',
  finalizeRegistration: 'account/finalize-registration',
  getCurrentEmailCode: 'account/get-code/current-email',
  getNewEmailCode: 'account/get-code/new-email',
  changeEmail: 'account/change-email',
  changePassword: 'account/change-password',
  setUsername: 'account/set-username'
};

const coin = {
  getDetails: 'coin/'
}


export default {
  account,
  coin
};
