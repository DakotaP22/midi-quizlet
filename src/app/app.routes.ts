import { Routes } from '@angular/router';

import { configRoutes } from './features/config/pages/config.routes';

export const routes: Routes = [
  {
    path: 'config',
    loadChildren: () =>
      import('./features/config/pages/config.routes').then(
        (r) => r.configRoutes
      ),
  },
  {
    path: 'play',
    loadChildren: () =>
      import('./features/play/pages/play.routes').then(
        (r) => r.playRoutes
      ),
  },
];
