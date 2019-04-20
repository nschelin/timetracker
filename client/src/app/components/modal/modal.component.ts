import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string = 'Modal Title';
  @Input() okText: string = 'Ok';
  @Input() cancelText: string = 'Cancel';
  @Input() show: boolean = false;
  @Output('onClosed') closed = new EventEmitter<boolean>();
  @Output('onOk') ok = new EventEmitter();
  constructor() { }

  onClick(eventType) {
    switch(eventType) {
      case 'ok':
        this.ok.emit(true);
        break;
      default:
        this.closed.emit(false)
        break;
    }
  }

  ngOnInit() {
  }

}
