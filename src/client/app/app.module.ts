import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy  } from '@angular/common';
import { AppComponent }  from './app.component';
// import { SearchComponent } from './search/search';
// import { ResultsListComponent } from './results/results-list';
// import { NavigationComponent } from './navigation/navigation';
import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './views/about/about';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [ BrowserModule , RouterModule.forRoot(routes) ],
  declarations: [ 
                  AppComponent,
                  // SearchComponent,
                  // ResultsListComponent,
                  // NavigationComponent,
                  HomeComponent,
                  // AboutComponent
                ],
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
