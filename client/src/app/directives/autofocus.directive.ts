// Credit: https://shekhargulati.com/2017/12/02/adding-autofocus-to-an-input-field-in-an-angular-5-bootstrap-4-application/
import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
	constructor(private el: ElementRef) {}

	ngAfterViewInit() {
		this.el.nativeElement.focus();
	}
}
