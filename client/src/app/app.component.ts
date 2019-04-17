import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Time Tracker';

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app',
//   templateUrl: './app/app.component.html' 
// })

// export class AppComponent {
 
// }