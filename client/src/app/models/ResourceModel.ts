export default class Resource {
    id: string;
    firstName: string;
    lastName: string;
    created: Date;
    modified: Date;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}