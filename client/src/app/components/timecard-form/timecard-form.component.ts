import { TimeCard } from './../../models/timecard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeCardsService } from './../timecards/timecards.service';
@Component({
	selector: 'app-timecard-form',
	templateUrl: './timecard-form.component.html',
	styleUrls: ['./timecard-form.component.scss']
})
export class TimecardFormComponent implements OnInit {
	public currentWeek: number;
	public currentYear: number;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private timecardService: TimeCardsService
	) {}

	ngOnInit() {
		this.currentWeek = this.route.snapshot.params.get('week');
		this.currentYear = this.route.snapshot.params.get('year');
		this.timecardService
			.getTimeCard(this.currentWeek, this.currentYear)
			.subscribe((timeCard: TimeCard) => {
				console.log(timeCard);
			});
	}
}
