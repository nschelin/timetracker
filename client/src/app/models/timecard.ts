import { TimeCardWeek } from './timecardWeek';

export interface TimeCard {
	_id?: string;
	week: TimeCardWeek;
	created: Date;
	modified: Date;
}
