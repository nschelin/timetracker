import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ClientService } from './../clients/client.service';
import { ProjectsService } from './projects.service';

import Project from '../../models/project';
import Client from "../../models/client";

import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public originalProject: Project;
  public clients: Client[];
  public projects: Project[];
  public editIndex: Number = -1;

  constructor(private projectService: ProjectsService, private clientService: ClientService) { }

  addProject() {
    const newProject: Project = { name: '', projectCode: '', clientId: '', created: new Date(), modified: new Date() };
    this.projects.unshift(newProject);
    this.editIndex = 0;
  }

  editProject(index: number, project: Project) {
    this.editIndex = index;
    this.originalProject = project;
  }

  saveProject(index, project: Project) {
    this.projectService.saveProject(project).subscribe((project: Project) => {
      this.projects[index] = project;
      this.projects.sort((a, b) => a.name > b.name ? 1 : -1);
      this.editIndex = -1;
    });
  }

  deleteProject(index: number, project: Project) {
    if (confirm('Delete this Project?')) {
      this.projectService.deleteProject(project).subscribe(() => {
        this.projects.splice(index, 1);
      });
    }
  }

  cancelItem(index: number, project: Project) {
    this.editIndex = -1;
    if (project._id === null) {
      this.projects.shift();
    }
    else if (this.originalProject !== null) {
      this.projects[index] = this.originalProject;
      this.originalProject = null;
    }
  }

  getProjectName(id: string) {
    if(id !== undefined) {
      const client = this.clients.find(i => i._id === id);
      return client !== null && client !== undefined ? client.name : '<No Name>';
    }
  }

  ngOnInit() {
    forkJoin(
      this.clientService.getClients(),
      this.projectService.getProjects()
    ).subscribe(([clients, projects]) => {
      this.clients = (clients as any[]).sort((a, b) => a.name > b.name ? 1 : -1);
      this.projects = (projects as any[]).sort((a, b) => a.name > b.name ? 1 : -1);
    });
  }
}
