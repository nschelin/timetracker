import Company from './CompanyModel';

export default class ProjectCode {
    id: string;
    code: string;
    company: Company;
    created: Date;
    modified: Date;
}