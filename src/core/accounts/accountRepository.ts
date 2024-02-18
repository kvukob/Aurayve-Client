import { useAccountStore } from 'src/core/accounts/accountStore';
import fetcher from 'src/util/api/fetcher';
import routes from 'src/util/api/fetcher/routes';
import { ApiResponse } from 'src/util/api/types';
import { AccountDetails, LoginHistory } from 'src/core/accounts/types';
import hub from 'src/util/api/hub';

export default class AccountRepository {
  async getDetails() {
    const res: ApiResponse<AccountDetails> = await fetcher.getData(routes.account.getDetails);
    const accountStore = useAccountStore();
    accountStore.setMaskedEmail(res.data.maskedEmail);
    accountStore.setDateRegistered(res.data.dateRegistered);
    accountStore.setLastLogin(res.data.lastLogin);
    accountStore.setUsername(res.data.username);
  }

  async getLoginHistory() {
    const res: ApiResponse<LoginHistory> = await fetcher.getData(routes.account.getLoginHistory);
    return res.data.loginHistory;
  }

  async login(email: string, password: string) {
    const req = {
      email: email,
      password: password
    };
    const res = await fetcher.postData(routes.account.login, req);
    if (res.success) {
      const accountStore = useAccountStore();
      accountStore.setToken(res.data.token);
      accountStore.setIsLoggedIn(true);
      await hub.closeConnection();
      await hub.connect();
      window.localStorage.setItem('token', res.data.token);
      return null;
    } else {
      return res.message;
    }
  }

  async initializeRegistration(email: string) {
    const req = {
      email: email
    };
    const res = await fetcher.postData(routes.account.initializeRegistration, req);
    return res.success ? null : res;
  }

  async verifyRegistration(email: string, verificationCode: string) {
    const req = {
      email: email,
      verificationCode: verificationCode
    };
    const res = await fetcher.postData(routes.account.verifyRegistration, req);
    return res.success ? null : res;
  }

  async finalize(email: string, verificationCode: string, password: string) {
    const req = {
      email: email,
      verificationCode: verificationCode,
      password: password
    };
    const res = await fetcher.postData(routes.account.finalizeRegistration, req);
    return res.success ? null : res;
  }

  async getCurrentEmailCode() {
    const res = await fetcher.getData(routes.account.getCurrentEmailCode);
    return res.success ? true : res;
  }

  async getNewEmailCode(email: string) {
    const res = await fetcher.getData(routes.account.getNewEmailCode + '/' + email);
    return res.success ? true : res;
  }

  async changeEmail(newEmail: string, newEmailCode: string, currentEmailCode: string) {

    const req = {
      newEmail: newEmail,
      newEmailCode: newEmailCode,
      currentEmailCode: currentEmailCode
    };
    return await fetcher.postData(routes.account.changeEmail, req);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const req = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };
    return await fetcher.postData(routes.account.changePassword, req);
  }
  async setUsername(username: string) {
    const req = {
      username: username,
    };
    const res = await fetcher.postData(routes.account.setUsername, req);
    if (res.success) {
      const accountStore = useAccountStore();
      accountStore.setUsername(username);
    }
    return res;
  }
}
