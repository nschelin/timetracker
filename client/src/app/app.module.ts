import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { ProjectCodeListComponent } from './components/projectcodes/projectcode.list.component';
import { TimecardsComponent } from './components/timecards/timecards.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AutofocusDirective } from './directives/autofocus.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectCodeListComponent,
    TimecardsComponent,
    ClientsComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


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
