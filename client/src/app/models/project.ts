import { Client } from './client';

export interface Project {
	_id?: string;
	name: string;
	projectCode: string;
	clientId: string;
	client: Client;
	created: Date;
	modified: Date;
}
