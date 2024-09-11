import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EstadoCocherasComponent } from './pages/estado-cocheras/estado-cocheras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardcontainerComponent } from './pages/dashboardcontainer/dashboardcontainer.component';
import { soloAdminGuard } from './guards/solo-admin.guard';
import { ReportesComponent } from './pages/reportes/reportes.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardcontainerComponent,
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
        component: LoginComponent
    },
    {
        path: "estado-cocheras",
        component: EstadoCocherasComponent
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
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
