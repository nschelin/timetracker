import { Collection } from '../../models/collection';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Client from '../../models/client';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ClientService {
	constructor(private http: HttpClient) {}

	public getClients(page?): Observable<Collection> {
		if (!page) {
			return this.http.get<Collection>('/api/clients');
		} else {
			return this.http.get<Collection>(`/api/clients?page=${page}`);
		}
	}

	public saveClient(client: Client) {
		if (client._id) {
			return this.http.put(`/api/client/${client._id}`, client);
		} else {
			return this.http.post(`/api/client`, client);
		}
	}

	public deleteClient(client: Client) {
		return this.http.delete(`/api/client/${client._id}`);
	}
}
