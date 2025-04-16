import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'control-panel',
    loadComponent: () => import('./control-panel/control-panel.page').then( m => m.ControlPanelPage)
  },
  {
    path: 'assignments',
    loadComponent: () => import('./assignments/assignments.page').then( m => m.AssignmentsPage)
  },
  {
    path: 'timer',
    loadComponent: () => import('./timer/timer.page').then( m => m.TimerPage)
  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.page').then( m => m.StatsPage)
  },
];
