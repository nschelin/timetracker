import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TimecardsComponent } from './components/timecards/timecards.component';
import { TimecardFormComponent } from './components/timecard-form/timecard-form.component';
import { ClientsComponent } from './components/clients/clients.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'projects', component: ProjectsComponent },
	{ path: 'timecards', component: TimecardsComponent },
	{ path: 'timecards/:year/:week', component: TimecardFormComponent },
	{ path: 'clients', component: ClientsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
