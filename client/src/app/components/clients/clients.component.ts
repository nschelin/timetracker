import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from '@angular/forms';

import { ClientService } from './client.service';
import Client from '../../models/client';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
	public originalClient: Client;
	public clients: Client[];
	public client: Client;
	public editIndex: Number = -1;
	public show: boolean = false;

	constructor(private clientService: ClientService) {}

	cancelled(cancel) {
		this.show = cancel;
	}

	saved(ok) {
		this.show = false;
	}

	addClient() {
		this.client = null;
		this.show = !this.show;
	}

	onClose(client: Client) {
		if (client != null) {
			if (client._id) {
				const index = this.clients.findIndex(cl => cl._id === client._id);
				this.clients[index] = client;
			} else {
				this.clients.push(client);
			}

			this.clients.sort((a, b) => (a.name > b.name ? 1 : -1));
		}
		this.show = false;
	}

	editClient(client: Client) {
		this.client = client;
		this.show = true;
	}

	deleteClient(index: number, client: Client) {
		if (confirm('Delete this Client?')) {
			this.clientService.deleteClient(client).subscribe(() => {
				this.clients.splice(index, 1);
			});
		}
	}

	cancelItem(index: number, client: Client) {
		this.editIndex = -1;
		if (client._id === null) {
			this.clients.shift();
		} else if (this.originalClient !== null) {
			this.clients[index] = this.originalClient;
			this.originalClient = null;
		}
	}

	getClients() {
		this.clientService
			.getClients()
			.subscribe((clients: Client[]) =>
				(this.clients = clients).sort((a, b) => (a.name > b.name ? 1 : -1))
			);
	}

	ngOnInit() {
		this.getClients();
	}
}
