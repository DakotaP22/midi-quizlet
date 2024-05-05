import { Route } from "@angular/router";

export const playRoutes: Route[] = [
  {
    path: 'piano',
    loadComponent: () => import('../pages/piano/piano.component').then(m => m.PianoComponent)
  }
]
