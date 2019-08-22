export default interface Client {
	_id?: string;
	name: string;
	created: Date;
	modified: Date;
	canDelete: boolean;
}
