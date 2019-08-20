import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Project from '../../models/project';
import { Collection } from '../../models/collection';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectsService {
	constructor(private http: HttpClient) {}

	public getProjects(page?): Observable<Collection> {
		if (!page) {
			return this.http.get<Collection>('/api/projects');
		} else {
			return this.http.get<Collection>(`/api/projects?page=${page}`);
		}
	}

	public saveProject(project: Project) {
		if (project._id) {
			return this.http.put(`/api/project/${project._id}`, project);
		} else {
			return this.http.post(`/api/project`, project);
		}
	}

	public deleteProject(project: Project) {
		return this.http.delete(`/api/project/${project._id}`);
	}
}
