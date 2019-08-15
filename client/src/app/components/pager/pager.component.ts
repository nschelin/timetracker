import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-pager',
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnChanges {
	@Input() items: any[];
	@Input() currentPage: number;
	@Input() total: number;
	@Input() pageSize: number;

	@Output() next = new EventEmitter<number>();
	@Output() prev = new EventEmitter<number>();

	public isPrevDisabled = true;
	public isNextDisabled: boolean;

	constructor() {}

	_previous() {
		if (this.currentPage > 1) {
			this.currentPage--;
		} else {
			this.currentPage = 1;
		}

		this.isPrevDisabled = this.currentPage === 1 ? true : false;
		this.isNextDisabled = this.currentPage * this.pageSize > this.total;
		this.prev.emit(this.currentPage);
	}

	_next() {
		if (this.currentPage * this.pageSize <= this.total) {
			this.currentPage++;
		}

		this.isPrevDisabled = this.currentPage === 1 ? true : false;
		this.isNextDisabled = (this.currentPage * this.pageSize) >= this.total;

		this.next.emit(this.currentPage);
	}

	ngOnInit() {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.total <= this.pageSize) {
			this.isNextDisabled = true;
		}
	}
}
