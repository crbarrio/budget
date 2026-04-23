import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home'),

        children: [
            {
                path: 'budget',
                loadComponent: () => import('./pages/budget-details/budget-details')
            },
            {
                path: 'services',
                loadComponent: () => import('./pages/services/services')
            },
            {
                path: '**',
                redirectTo: 'services'
            },
        ]
    },
    
    {
        path: '**',
        redirectTo: '',
    }
];
