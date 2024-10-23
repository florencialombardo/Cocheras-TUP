import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardcontainerComponent } from './pages/dashboardcontainer/dashboardcontainer.component';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { soloLogeadoGuard } from './guards/solo-logeado.guard';
import { soloPublicoGuard } from './guards/solo-publico.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "",
        component: DashboardcontainerComponent,
        canActivate: [soloLogeadoGuard],
        children:[
            {
                path: "estado-cocheras",
                component: EstadoCocherasComponent
            
            },
            {
                path: "reportes",
                component: ReportesComponent,
                canActivate: [soloAdminGuard]

            },
        ]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [soloPublicoGuard],
    },
    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [soloPublicoGuard],
    },
    
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
