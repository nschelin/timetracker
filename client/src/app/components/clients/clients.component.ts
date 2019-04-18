import { Component, OnInit } from '@angular/core';
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
	public editIndex: Number = -1;

	constructor(private clientService: ClientService) {}

	addClient() {
		const newClient: Client = { name: '', created: new Date(), modified: new Date() };
		this.clients.unshift(newClient);
		this.editIndex = 0;
	}

	editClient(index: number, client: Client) {
    this.editIndex = index;
    this.originalClient = client;
	}

	saveClient(client: Client) {
		this.clientService.saveClient(client).subscribe((client: Client) => {
			this.clients[0] = client;
			this.clients.sort((a, b) => a.name > b.name ? 1 : -1);
			this.editIndex = -1;
		});
	}

	deleteClient(index: number, client: Client) {
		if(confirm('Delete this Client?')) {
			this.clientService.deleteClient(client).subscribe(() => {
				this.clients.splice(index, 1);
			});
		}
	}

	cancelItem(index: number, client: Client) {
    this.editIndex = -1;
    if(client._id === null) {
      this.clients.shift();
    }
    else if(this.originalClient !== null) {
      this.clients[index] = this.originalClient;
      this.originalClient = null;
    }
  }

	ngOnInit() {
		this.clientService
			.getClients()
			.subscribe((clients: Client[]) => (this.clients = clients).sort((a,b) => a.name > b.name ? 1 : -1));
	}
}
