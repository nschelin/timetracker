import Project from './project';

export default interface TimeCard {
    _id?: string,
    week: number,
    projects: Project[],
    created: Date,
    modified: Date
}