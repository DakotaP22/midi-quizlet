import { Routes } from "@angular/router";

export const configRoutes: Routes = [
  {
    path: 'midi',
    loadComponent: () => import('./midi-config-page/midi-config-page.component').then(m => m.MidiConfigPageComponent)
  }
];
