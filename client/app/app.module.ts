import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy  } from '@angular/common';
import { AppComponent }  from './app.component';
// import { SearchComponent } from './search/search';
// import { ResultsListComponent } from './results/results-list';
import { NavigationComponent } from './components/navigation/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectCodeListComponent } from './components/projectcodes/projectcode.list.component';
// import { AboutComponent } from './views/about/about';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projectcodes', component: ProjectCodeListComponent }
];

@NgModule({
  imports: [ BrowserModule , RouterModule.forRoot(routes) ],
  declarations: [ 
                  AppComponent,
                  // SearchComponent,
                  // ResultsListComponent,
                  NavigationComponent,
                  HomeComponent,
                  ProjectCodeListComponent
                  // AboutComponent
                ],
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
