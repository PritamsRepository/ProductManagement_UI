import { Routes } from '@angular/router';

export const routes: Routes = [

    // default
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // login page (no layout)
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component')
                .then(m => m.LoginComponent)
    },

    // MAIN APP LAYOUT
    {
        path: '',
        loadComponent: () =>
            import('./components/layout/layout.component')
                .then(m => m.LayoutComponent),

        children: [

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./components/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },

            {
                path: 'products',
                loadComponent: () =>
                    import('./components/products/products.component')
                        .then(m => m.ProductsComponent)
            },

            // landing page after login
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }

        ]
    }

];