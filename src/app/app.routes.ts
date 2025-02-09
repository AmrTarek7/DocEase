import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { AppLayout } from './layout/components/layouts/layout.component';

import { Notfound } from './Pages/notfound/notfound';
import { Dashboard } from './Pages/dashboard/dashboard';
import { TestComponent } from './Pages/test/test.component';
import { ArchiveComponent } from './Pages/archive/archive.component';
import { ArchiveViewLetterComponent } from './Pages/archive/components/archiveViewLetter/archiveViewLetter.component';

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
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'archiveViewLetter',
        component: ArchiveViewLetterComponent,
      },
    ],
  },
  { path: '**', component: Notfound },
];
