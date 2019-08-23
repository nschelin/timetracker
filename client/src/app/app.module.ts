import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NavigationComponent } from './components/navigation/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TimecardsComponent } from './components/timecards/timecards.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { PagerComponent } from './components/pager/pager.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TimecardFormComponent } from './components/timecard-form/timecard-form.component';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		HomeComponent,
		TimecardsComponent,
		ClientsComponent,
		AutofocusDirective,
		ProjectsComponent,
		ClientsFormComponent,
		ModalComponent,
		PagerComponent,
		ProjectFormComponent,
		TimecardFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes, Router } from '@angular/router';
// import { LocationStrategy, HashLocationStrategy  } from '@angular/common';
// import { AppComponent }  from './app.component';
// // import { SearchComponent } from './search/search';
// // import { ResultsListComponent } from './results/results-list';
// import { NavigationComponent } from './components/navigation/nav.component';
// import { HomeComponent } from './components/home/home.component';
// import { ProjectCodeListComponent } from './components/projectcodes/projectcode.list.component';
// // import { AboutComponent } from './views/about/about';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'projectcodes', component: ProjectCodeListComponent }
// ];

// @NgModule({
//   imports: [ BrowserModule , RouterModule.forRoot(routes) ],
//   declarations: [
//                   AppComponent,
//                   // SearchComponent,
//                   // ResultsListComponent,
//                   NavigationComponent,
//                   HomeComponent,
//                   ProjectCodeListComponent
//                   // AboutComponent
//                 ],
//   providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
//   bootstrap: [ AppComponent ]
// })

// export class AppModule { }
