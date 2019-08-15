import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	ViewChild,
	SimpleChanges,
	ElementRef
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Client from 'src/app/models/client';
import { ClientService } from '../clients/client.service';

@Component({
	selector: 'app-clients-form',
	templateUrl: './clients-form.component.html',
	styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit, OnChanges {
	@Input() client: Client;
	@Output() close = new EventEmitter<Client>();
	@ViewChild('focus', { static: true }) input: ElementRef;
	public clientVal: Client;
	public clientForm: FormGroup;
	public exists = false;

	constructor(private clientService: ClientService, private fb: FormBuilder) {}

	onSubmit() {
		this.clientVal.name = this.clientForm.value.name;

		this.clientService.saveClient(this.clientVal).subscribe(
			(client: Client) => {
				this.close.emit(client);
				this.clientVal = null;
				this.reset();
			},
			error => {
				if (error.error === 'Client Already Exists') {
					this.exists = true;
				} else {
					this.exists = false;
				}
			}
		);
	}

	cancel() {
		this.close.emit(null);
		this.clientVal = null;
		this.reset();
	}

	ngOnInit() {
		this.clientForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	// get client controls for use in form;
	get f() {
		return this.clientForm.controls;
	}

	// hack
	reset() {
		this.clientForm.reset();
		Object.keys(this.clientForm.controls).forEach(key => {
			this.clientForm.controls[key].setErrors(null);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.clientVal = changes.client.currentValue;

		// focus
		setTimeout(() => this.input.nativeElement.focus(), 200);

		if (this.clientVal && this.clientForm) {
			this.clientForm.setValue({ name: this.clientVal.name });
		} else {
			this.clientVal = {
				name: '',
				created: null,
				modified: null
			};
		}
	}
}
