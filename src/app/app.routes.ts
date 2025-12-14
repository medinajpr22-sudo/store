import { Routes } from '@angular/router';
import { LayoutLanding } from './shared/layout-landing/layout-landing';
import { Landing } from './landing/landing';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutLanding,

    children: [
      { path: '', component: Landing },
      { path: 'cart', loadComponent: () => import('./components/cart/cart') },
      {
        path: 'detail-product/:slug',
        loadComponent: () =>
          import('./components/detail-product/detail-product').then((c) => c.DetailProduct),
      },
      //   {
      //     path: 'cacaoCartilla',
      //     loadComponent: () =>
      //       import(
      //         './landing/pages/cacao-cartilla/cacao-cartilla.component'
      //       ).then((c) => c.CacaoCartillaComponent),
      //   },
    ],
  },
  //   {
  //     path: 'login',
  //     loadComponent: () =>
  //       import('./auth/login/login.component').then((c) => c.LoginComponent),
  //   },

  // { path: '**', component: PageNotFoundComponent },
];
