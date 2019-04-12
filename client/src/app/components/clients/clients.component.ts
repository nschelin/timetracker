import { ClientService } from './client.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
	public clients: any[];
	public editIndex: Number = -1;

	constructor(private clientService: ClientService) {}

	addClient() {
    const newClient = { name: ''};
    this.clients.unshift(newClient);
    this.editIndex = 0;
  }
	editClient(index: Number) {
		this.editIndex = index;
	}

	saveClient(client) {
		this.clientService.saveClient(client).subscribe(() => {
			this.editIndex = -1;
		});
	}

	ngOnInit() {
		this.clientService
			.getClients()
			.subscribe(results => (this.clients = results as any[]));
	}
}
