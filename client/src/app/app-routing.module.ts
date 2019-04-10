import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProjectCodeListComponent } from './components/projectcodes/projectcode.list.component';
import { TimecardsComponent } from './components/timecards/timecards.component';
import { ClientsComponent } from './components/clients/clients.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'projectcodes', component: ProjectCodeListComponent },
    { path: 'timecards', component: TimecardsComponent },
    { path: 'clients', component: ClientsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
