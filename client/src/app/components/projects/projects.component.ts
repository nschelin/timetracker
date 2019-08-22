import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ClientService } from './../clients/client.service';
import { ProjectsService } from './projects.service';

import { Collection } from '../../models/collection';
import Project from '../../models/project';
import Client from '../../models/client';

// import { v4 as uuid } from 'uuid';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
	public pageSize = 5;
	public clients: Client[];
	public projects: Project[];
	public currentProject: Project;
	public show = false;
	public currentPage: number;
	public prevBtnDisable = true;
	public nextBtnDisable: boolean;
	public total: number;

	constructor(private projectService: ProjectsService, private clientService: ClientService) {}

	cancelled(cancel: boolean) {
		this.show = cancel;
	}

	saved() {
		this.show = false;
	}

	addProject() {
		this.currentProject = {
			name: '',
			projectCode: '',
			clientId: '',
			client: null,
			created: new Date(),
			modified: new Date()
		} as Project;
		this.show = !this.show;
	}

	closeModal(project: Project) {
		if (project != null) {
			if (project._id) {
				const index = this.projects.findIndex(cl => cl._id === project._id);
				this.projects[index] = project;
			} else {
				this.projects.push(project);
			}
			this.projects.sort((a, b) => (a.name > b.name ? 1 : -1));
		}

		this.show = false;
	}

	editProject(project: Project) {
		this.currentProject = project;
		this.show = true;
	}

	deleteProject(project: Project) {
		if (confirm('Delete this Project?')) {
			this.projectService.deleteProject(project).subscribe(() => {
				this.getProjects(this.currentPage);
			});
		}
	}

	getProjects(page?: number) {
		this.projectService.getProjects(page).subscribe((projectCollection: Collection) => {
			this.projects = projectCollection.items.sort((a, b) => (a.name > b.name ? 1 : -1));
			this.currentPage = projectCollection.page;
			this.total = projectCollection.total;
		});
	}

	previous(page) {
		this.currentPage = page;
		this.getProjects(page);
	}

	next(page) {
		this.currentPage = page;
		this.getProjects(page);
	}

	ngOnInit() {
		this.getProjects();
	}
}
