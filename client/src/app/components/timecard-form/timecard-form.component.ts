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
	public timeCard: TimeCard;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private timecardService: TimeCardsService
	) {}

	ngOnInit() {
		this.currentWeek = +this.route.snapshot.params.week;
		this.currentYear = +this.route.snapshot.params.year;
		this.timecardService
			.getTimeCardByWeekYear(this.currentWeek, this.currentYear)
			.subscribe((timeCard: TimeCard) => {
				if (timeCard === null) {
					if (confirm('No Timecard Exists. Create?')) {
						this.timecardService
							.createTimecardWeek(this.currentWeek, this.currentYear)
							.subscribe((newTimeCard: TimeCard) => {
								this.timeCard = newTimeCard;
							});
					} else {
						this.router.navigate([`/timecards`]);
					}
				} else {
					// TODO: display existing timecard data
					this.timeCard = timeCard;
				}
			});
	}
}
