import { TimeCard } from './../../models/timecard';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	constructor(private route: ActivatedRoute, private timecardService: TimeCardsService) {}

	ngOnInit() {
		this.currentWeek = +this.route.snapshot.params.week;
		this.currentYear = +this.route.snapshot.params.year;
		this.timecardService
			.getTimeCardByWeekYear(this.currentWeek, this.currentYear)
			.subscribe((timeCard: TimeCard) => {
				if (timeCard === null) {
					// TODO: create timecard
				} else {
					// TODO: display existing timecard data
					this.timeCard = timeCard;
				}
			});
	}
}
