import { Router } from '@angular/router';
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
	public show = false;

	constructor(private router: Router) {}

	generateWeeks() {
		const currentWeek = getWeek(Date.now());
		for (let i = currentWeek + 5; i >= currentWeek - 5; i--) {
			this.recentWeekNumbers.push(i);
		}
	}

	setCurrentWeek(weekNum: number = -1) {
		const d = new Date();
		const currentWeek = +weekNum === -1 ? getWeek(d) : weekNum;
		this.show = false;
		this.router.navigate([`/timecards/${d.getFullYear()}/${currentWeek}`]);
	}

	addTimeCard() {
		this.show = true;
	}

	ngOnInit() {
		this.generateWeeks();
	}
}
