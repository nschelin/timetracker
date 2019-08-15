import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import Client from '../../models/client';
import { ClientCollection } from 'src/app/models/clientCollection';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
	public pageSize = 5;
	public originalClient: Client;
	public clients: Client[];
	public currentClient: Client;
	public currentPage: number;
	public prevBtnDisable = true;
	public nextBtnDisable: boolean;
	public total: number;
	public show = false;

	constructor(private clientService: ClientService) {}

	addClient() {
		this.currentClient = {
			name: '',
			created: null,
			modified: null
		} as Client;

		this.show = !this.show;
	}

	editClient(client: Client) {
		this.currentClient = client;
		this.show = true;
	}

	deleteClient(client: Client) {
		if (confirm('Delete this Client?')) {
			this.clientService.deleteClient(client).subscribe(() => {
				this.getClients(this.currentPage);
			});
		}
	}

	getClients(page?: number) {
		this.clientService.getClients(page).subscribe((clientCollection: ClientCollection) => {
			this.clients = clientCollection.clients.sort((a, b) => (a.name > b.name ? 1 : -1));
			this.currentPage = clientCollection.page;
			this.total = clientCollection.total;
		});
	}

	closeModal(client: Client) {
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

	previous(page) {
		this.currentPage = page;
		this.getClients(page);
	}

	next(page) {
		this.currentPage = page;
		this.getClients(page);
	}

	ngOnInit() {
		this.getClients();
	}
}
