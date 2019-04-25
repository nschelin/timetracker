import Client from './client';

export interface ClientCollection {
    clients: Client[],
    total: number,
    page: number
}
