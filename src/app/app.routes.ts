import { Routes } from '@angular/router';
import { Dashboard } from './component/dashboard/dashboard';

export const routes: Routes = [
    { path: '', loadComponent: () => import("./component/dashboard/dashboard").then(c => c.Dashboard) }
];
