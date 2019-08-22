import { Component, OnInit } from '@angular/core';

import { TimeCard } from '../../models/timecard';
import { TimeCardWeek } from 'src/app/models/timecardWeek';

@Component({
	selector: 'app-timecards',
	templateUrl: './timecards.component.html',
	styleUrls: ['./timecards.component.scss']
})
export class TimecardsComponent implements OnInit {
	public timecards: TimeCard[];
	public timecardWeeks: TimeCardWeek[];
	public editIndex: Number = -1;
	public showAvailableWeeks: boolean = false;

	constructor() {}

	generateWeeks() {}

	ngOnInit() {
		this.generateWeeks();
	}
}
