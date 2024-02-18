import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/public/IndexPage.vue') },
      {
        path: 'register-account',
        name: 'initiate.register.account',
        component: () => import('../core/accounts/pages/registration/InitiateRegistrationPage.vue'),
        props: true
      },
      {
        path: 'register-account/verify',
        name: 'verify.register.account',
        component: () => import('../core/accounts/pages/registration/VerifyRegistrationPage.vue'),
        props: true
      },
      {
        path: 'register-account/finalize',
        name: 'finalize.register.account',
        component: () => import('../core/accounts/pages/registration/FinalizeRegistrationPage.vue'),
        props: true
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('../core/accounts/pages/LoginPage.vue')
      },
      {
        path: 'terms',
        name: 'terms.and.conditions',
        component: () => import('pages/public/TermsAndConditionsPage.vue')
      },
      {
        path: 'app',
        name: 'app',
        component: () => import('pages/private/AppPage.vue')
      },
      {
        path: 'account',
        name: 'app.account',
        component: () => import('../core/accounts/pages/AccountPage.vue'),
      },
      {
        path: 'account/login-history',
        name: 'app.account.login.history',
        component: () => import('../core/accounts/pages/LoginHistoryPage.vue'),
      },
      {
        path: 'account/change-email',
        name: 'app.account.change.email',
        component: () => import('../core/accounts/pages/ChangeEmailPage.vue'),
      },
      {
        path: 'account/change-password',
        name: 'app.account.change.password',
        component: () => import('../core/accounts/pages/ChangePasswordPage.vue'),
      },
      {
        path: 'faucet',
        name: 'app.faucet',
        component: () => import('../core/faucet/FaucetPage.vue')
      },
      {
        path: 'wallet',
        name: 'app.wallet',
        component: () => import('../core/wallet/WalletPage.vue')
      },
      {
        path: 'trade',
        name: 'app.trade',
        component: () => import('src/core/trading/TradingPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
