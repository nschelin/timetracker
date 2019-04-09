import ProjectCode from './ProjectCodeModel';
import Resource from './ResourceModel';

export default class Project {
    id: string;
    date: Date;
    projectCode: ProjectCode;
    resource: Resource;
    notes: string;
    created: Date;
    modified: Date;
}