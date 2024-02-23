import { RouteRecordRaw } from 'vue-router';
import appRoutes from 'src/router/routes/appRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      ...appRoutes,
      {
        path: '',
        component: () => import('pages/public/IndexPage.vue')
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
        path: 'support',
        name: 'support',
        component: () => import('src/core/support/SupportPage.vue')
      },
      {
        path: 'register-account',
        name: 'initiate.register.account',
        component: () => import('src/core/accounts/pages/registration/InitiateRegistrationPage.vue'),
        props: true
      },
      {
        path: 'register-account/verify',
        name: 'verify.register.account',
        component: () => import('src/core/accounts/pages/registration/VerifyRegistrationPage.vue'),
        props: true
      },
      {
        path: 'register-account/finalize',
        name: 'finalize.register.account',
        component: () => import('src/core/accounts/pages/registration/FinalizeRegistrationPage.vue'),
        props: true
      },
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
