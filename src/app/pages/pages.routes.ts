import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'progress'}  },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'graficas1'}  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'promesas'}  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs'}  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}   },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
