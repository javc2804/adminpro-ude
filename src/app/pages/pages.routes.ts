import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificatokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [ VerificatokenGuard ],
        data: { titulo: 'dashboard'} 
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'progress'}  },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'graficas1'}  },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'promesas'}  },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'rxjs'}  },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}   },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'perfil de usuario'}  },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}  },
    //mantenimiento
    { 
        path: 'usuarios', 
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de usuario'}  
    },

    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospital'}  },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medico'}  },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizacion de medico'}  },

    // { path: '/', component: ProfileComponent, data: { titulo: 'perfil de usuario'}  },
    // { path: '/', component: ProfileComponent, data: { titulo: 'perfil de usuario'}  },
    // Fin mantenimiento
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
