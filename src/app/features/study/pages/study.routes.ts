import { Routes } from "@angular/router";

export const studyRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import ('../pages/study-page/study-page.component').then(m => m.StudyPageComponent)
  }
];
