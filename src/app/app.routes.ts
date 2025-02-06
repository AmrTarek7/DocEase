import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AppLayout } from './layout/components/app.layout';
import { Notfound } from './Pages/notfound/notfound';
import { Dashboard } from './Pages/dashboard/dashboard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Dashboard,
      },
    ],
  },
  { path: '**', component: Notfound },
];
