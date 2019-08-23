import { ProjectInfo } from './projectInfo';

export interface TimeCardWeek {
	weekNumber: number;
	year: number;
	projects: [ProjectInfo];
}
