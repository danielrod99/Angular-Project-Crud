import{ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import {DetailComponent} from './components/detail/detail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {EditComponent} from './components/edit/edit.component';

const appRoutes:Routes=[
    {path:'',component:AboutComponent},
    {path:'about',component:AboutComponent},
    {path:'projects',component:ProjectsComponent},
    {path:'create-project',component:CreateComponent},
    {path:'contact',component:ContactComponent},
    {path:'project/:id',component:DetailComponent},
    {path:'edit-project/:id',component:EditComponent},
    {path:'**',component:NotfoundComponent}
];
export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);

