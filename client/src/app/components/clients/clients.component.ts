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

	previous() {
		if (this.currentPage > 1) {
			this.currentPage--;
		} else {
			this.currentPage = 1;
		}

		this.prevBtnDisable = this.currentPage === 1 ? true : false;
		this.nextBtnDisable = this.currentPage * this.pageSize > this.total;

		this.getClients(this.currentPage);
	}

	next() {
		if (this.currentPage + 1 * this.pageSize <= this.total) {
			this.currentPage++;
		}

		this.prevBtnDisable = this.currentPage === 1 ? true : false;
		this.nextBtnDisable = this.currentPage * this.pageSize > this.total;

		this.getClients(this.currentPage);
	}

	addClient() {
		this.client = {
			name: '',
			created: null,
			modified: null
		};
		
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
		if (client._id === null) {
			this.clients.shift();
		} else if (this.originalClient !== null) {
			this.clients[index] = this.originalClient;
			this.originalClient = null;
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
