import { Component } from '@angular/core';
import { slideAnimation } from '../animations';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [slideAnimation]
})
export class AppComponent {
	title = 'Time Tracker';
}