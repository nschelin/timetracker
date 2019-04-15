import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ClientService {
	constructor(private http: HttpClient) {}

	public getClients() {
		return this.http.get('/api/clients');
	}

	public saveClient(client) {
		if (client._id) {
			return this.http.put(`/api/client/${client._id}`, client);
		} else {
			return this.http.post(`/api/client`, client);
		}
	}

	public deleteClient(client) {
		return this.http.delete(`/api/client/${client._id}`);
	}
}

