import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input() items: any[];
  @Input() currentPage: number;
  @Input() total: number;
  @Input() pageSize: number;

  @Output() onNext = new EventEmitter<number>();
  @Output() onPrev = new EventEmitter<number>();

  public isPrevDisabled: boolean = true;
  public isNextDisabled: boolean;

  constructor() { }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else {
      this.currentPage = 1;
    }

    this.isPrevDisabled = this.currentPage === 1 ? true : false;
    this.isNextDisabled = this.currentPage * this.pageSize > this.total;
    this.onPrev.emit(this.currentPage);
  }

  next() {

    if (this.currentPage + 1 * this.pageSize <= this.total) {
      this.currentPage++;
    }

    this.isPrevDisabled = this.currentPage === 1 ? true : false;
    this.isNextDisabled = this.currentPage * this.pageSize > this.total;

    this.onNext.emit(this.currentPage);
  }

  ngOnInit() {
  }

}
