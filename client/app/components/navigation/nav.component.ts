import { Component } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './app/components/navigation/nav.component.html'
})

export class NavigationComponent {
	// TODO: Come up with a better solution;
	isRoot: boolean = true;
	isProjectCode: boolean;
	currentPath: string;

	setActive(path) {
		switch(path) {
			case '/':
				this.isRoot = true;
				this.isProjectCode = false;
			break;
			case '/projectcodes':
				this.isProjectCode = true;
				this.isRoot = false;
			break;
			default:
			break;
		}
			
	}
}