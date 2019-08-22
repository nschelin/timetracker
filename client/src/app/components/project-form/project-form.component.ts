import { ClientService } from './../clients/client.service';
import { ProjectsService } from './../projects/projects.service';
import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Client } from 'src/app/models/client';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {
	@Input() project: Project;
	@Output() close = new EventEmitter<Project>();
	public projectVal: Project;
	public clients: Client[];
	public projectForm: FormGroup;

	public exists: boolean = false;

	constructor(
		private projectService: ProjectsService,
		private clientService: ClientService,
		private fb: FormBuilder
	) {}

	onSubmit() {
		this.projectVal.name = this.projectForm.value.name;
		this.projectVal.clientId = this.projectForm.value.clientId;
		this.projectVal.projectCode = this.projectForm.value.projectCode;
		this.projectService.saveProject(this.projectVal).subscribe(
			(project: Project) => {
				this.close.emit(project);
				this.projectVal = null;
				this.reset();
			},
			error => {
				if (error.error === 'Project Already Exists') {
				} else {
				}
			}
		);
	}

	cancel() {
		this.close.emit(null);
		this.projectVal = null;
		this.reset();
	}

	reset() {
		this.projectForm.reset();
		Object.keys(this.projectForm.controls).forEach(key => {
			this.projectForm.controls[key].setErrors(null);
		});
	}

	get f() {
		return this.projectForm.controls;
	}

	ngOnInit() {
		this.projectForm = this.fb.group({
			name: ['', Validators.required],
			clientId: ['', Validators.required],
			projectCode: ['', Validators.required]
		});

		this.clientService.getAllClients().subscribe(result => {
			this.clients = result;
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.projectVal = changes.project.currentValue;
		if (this.projectVal && this.projectForm) {
			this.projectForm.setValue({
				name: this.projectVal.name,
				clientId: this.projectVal.clientId,
				projectCode: this.projectVal.projectCode
			});
		} else {
			this.projectVal = {
				name: '',
				clientId: null,
				projectCode: null,
				client: null,
				created: null,
				modified: null
			};
		}
	}
}
