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
	public client: Client;
	public currentPage: number;
	public prevBtnDisable: boolean = true;
	public nextBtnDisable: boolean;
	public total: number;
	public show: boolean = false;

	constructor(private clientService: ClientService) {}

	cancelled(cancel: boolean) {
		this.show = cancel;
	}

	saved() {
		this.show = false;
	}

	previous(page) {
		this.getClients(page);
	}

	next(page) {
		this.getClients(page);
	}

	addClient() {
		this.client = {
			name: '',
			created: null,
			modified: null
		} as Client;

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

	getClients(page?: number) {
		this.clientService
			.getClients(page)
			.subscribe((clientCollection: ClientCollection) => {
				this.clients = clientCollection.clients.sort((a, b) =>
					a.name > b.name ? 1 : -1
				);
				this.currentPage = clientCollection.page;
				this.total = clientCollection.total;
			});
	}

	ngOnInit() {
		this.getClients();
	}
}
