import { Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LandingComponent } from './landing/landing.component';
import { SerivesComponent } from './aboutus/serives/serives.component';

export const routes: Routes = [
    {
        path:'',component:LandingComponent    },
    {
        path: 'about', component:AboutusComponent
    },
    {
        path:'service', component:SerivesComponent
    }
];
