import { TimeCard } from './../../models/timecard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';

@Injectable({
	providedIn: 'root'
})
export class TimeCardsService {
	constructor(private http: HttpClient) {}

	public getTimeCard(id: string): Observable<TimeCard> {
		return this.http.get<TimeCard>(`/api/timecards/${id}`);
	}

	public getTimeCardByWeekYear(weekNumber: number, year: number): Observable<TimeCard> {
		return this.http.get<TimeCard>(`/api/timecard/${year}/${weekNumber}`);
	}

	public getTimeCards(): Observable<Collection> {
		return this.http.get<Collection>('/api/timecards');
	}

	public createTimecardWeek(weekNumber: number, year: number): Observable<TimeCard> {
		return this.http.post<TimeCard>('/api/timecards', { weekNumber, year });
	}
}
