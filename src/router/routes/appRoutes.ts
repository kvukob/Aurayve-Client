const routes = [
  {
    path: 'dashboard',
    name: 'app.dashboard',
    component: () => import('src/core/dashboard/DashboardPage.vue'),
    props: true
  },
  {
    path: 'account',
    name: 'app.account',
    component: () => import('src/core/accounts/pages/AccountPage.vue')
  },
  {
    path: 'account/login-history',
    name: 'app.account.login.history',
    component: () => import('src/core/accounts/pages/LoginHistoryPage.vue')
  },
  {
    path: 'account/change-email',
    name: 'app.account.change.email',
    component: () => import('src/core/accounts/pages/ChangeEmailPage.vue')
  },
  {
    path: 'account/change-password',
    name: 'app.account.change.password',
    component: () => import('src/core/accounts/pages/ChangePasswordPage.vue')
  },
  {
    path: 'faucet',
    name: 'app.faucet',
    component: () => import('src/core/faucet/FaucetPage.vue')
  },
  {
    path: 'trade',
    name: 'app.trade',
    component: () => import('src/core/trading/TradingPage.vue')
  },
  {
    path: 'wallet',
    name: 'app.wallet',
    component: () => import('src/core/wallet/WalletPage.vue')
  }
];


export default routes;
