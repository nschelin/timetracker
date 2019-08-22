import { Component, OnInit } from '@angular/core';
import { getWeek } from 'date-fns';

import { TimeCard } from '../../models/timecard';
import { TimeCardWeek } from 'src/app/models/timecardWeek';

@Component({
	selector: 'app-timecards',
	templateUrl: './timecards.component.html',
	styleUrls: ['./timecards.component.scss']
})
export class TimecardsComponent implements OnInit {
	public timecards: TimeCard[];
	public recentWeekNumbers: number[] = [];
	public currentWeek: number;
	public show = false;

	constructor() {}

	generateWeeks() {
		const currentWeek = getWeek(Date.now());
		for (let i = currentWeek + 5; i >= currentWeek - 5; i--) {
			this.recentWeekNumbers.push(i);
		}
	}

	setCurrentWeek(weekNum: number = -1) {
		this.currentWeek = +weekNum === -1 ? getWeek(Date.now()) : weekNum;
		// create week
		this.show = false;
	}

	addTimeCard() {
		this.show = true;
	}

	ngOnInit() {
		this.generateWeeks();
	}
}
