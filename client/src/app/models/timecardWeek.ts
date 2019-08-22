import { ProjectInfo } from './projectInfo';

export interface TimeCardWeek {
	weekNumber: number;
	projects: [ProjectInfo];
}
