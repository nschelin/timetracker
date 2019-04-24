import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges,
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
	@Output('onClose') close = new EventEmitter<Client>();
	public clientVal: Client;
	public clientForm: FormGroup;

	constructor(private clientService: ClientService, private fb: FormBuilder) {}

	ngOnInit() {
		this.clientForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {
		this.clientVal.name = this.clientForm.value.name;

		this.clientService.saveClient(this.clientVal).subscribe(
			(client: Client) => {
				this.close.emit(client);
				this.clientForm.reset();
				this.clientVal = null;
			},
			error => {}
		);
	}

	onCancel() {
		this.close.emit(null);
		this.clientVal = null;
		this.clientForm.reset();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.clientVal = changes.client.currentValue;
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
