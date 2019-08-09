import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Project from '../../models/project';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectsService {
	constructor(private http: HttpClient) {}

	public getProjects(): Observable<Project[]> {
		return this.http.get<Project[]>('/api/projects');
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
