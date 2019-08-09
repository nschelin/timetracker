import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ClientService } from './../clients/client.service';
import { ProjectsService } from './projects.service';

import Project from '../../models/project';
import Client from '../../models/client';

// import { v4 as uuid } from 'uuid';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	public originalProject: Project;
	public clients: Client[];
	public projects: Project[];
	public project: Project;
	public editIndex: Number = -1;
	public show: boolean = false;

	constructor(
		private projectService: ProjectsService,
		private clientService: ClientService
	) {}

	cancelled(cancel: boolean) {
		this.show = cancel;
	}

	saved() {
		this.show = false;
	}

	addProject() {
		this.project = {
			name: '',
			projectCode: '',
			clientId: '',
			created: new Date(),
			modified: new Date()
		} as Project;
		this.show = !this.show;
	}

	onClose(project: Project) {
		if (project !== null) {
			if (project._id) {
				const index = this.projects.findIndex(p => p._id === p._id);
				this.projects[index] = project;
			} else {
				this.projects.push(project);
			}
		}

		this.show = false;
	}

	editProject(project: Project) {
		this.project = project;
		this.show = true;
	}

	deleteProject(index: number, project: Project) {
		if (confirm('Delete this Project?')) {
			this.projectService.deleteProject(project).subscribe(() => {
				this.projects.splice(index, 1);
			});
		}
	}

	getProjectName(id: string) {
		if (id !== undefined) {
			const client = this.clients.find(i => i._id === id);
			return client !== null && client !== undefined
				? client.name
				: '<No Name>';
		}
	}

	ngOnInit() {
		forkJoin([
			this.clientService.getClients(),
			this.projectService.getProjects()
		]).subscribe(([clientCollection, projects]) => {
			this.clients = (clientCollection.clients as any[]).sort((a, b) =>
				a.name > b.name ? 1 : -1
			);
			this.projects = (projects as any[]).sort((a, b) =>
				a.name > b.name ? 1 : -1
			);
		});
	}
}
