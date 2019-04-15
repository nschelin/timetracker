import { ClientService } from './client.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public originalClient: any;
	public clients: any[];
	public editIndex: Number = -1;

	constructor(private clientService: ClientService) {}

	addClient() {
		const newClient = { name: '' };
		this.clients.unshift(newClient);
		this.editIndex = 0;
	}

	editClient(index: Number, client) {
    console.log(client);
    this.editIndex = index;
    this.originalClient = client;
	}

	saveClient(client) {
		this.clientService.saveClient(client).subscribe(() => {
			this.editIndex = -1;
			this.clients.sort((a, b) => a.name > b.name ? 1 : -1);
		});
	}

	deleteClient(index, client) {
		if(confirm('Delete this Client?')) {
			this.clientService.deleteClient(client).subscribe(() => {
				this.clients.splice(index, 1);
			});
		}
	}

	cancelItem(index, client) {
    this.editIndex = -1;
    if(typeof client._id === 'undefined') {
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
			.subscribe(results => (this.clients = results as any[]).sort((a,b) => a.name > b.name ? 1 : -1));
	}
}
