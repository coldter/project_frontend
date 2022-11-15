import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ImageSnippet } from '../models/image.model';
import { RestService } from '../services/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mimType } from './mime-type.validator';
import { RoutesService } from '../services/routes.service';
import { StateService } from '../services/state.service';
import { NotificationService } from '../services/notification.service';
import { async } from '@angular/core/testing';

declare var previewFile: any;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    url: ArrayBuffer;
    student: Student;
    studentId = null;
    imgPreview: string;
    form: FormGroup;
    mode = 'Create';
    selectedFile: ImageSnippet;
    file: File;
    dataBlob: Blob;
    fileChanges = false;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private notifService: NotificationService,
        public routes: RoutesService,
        // tslint:disable-next-line: variable-name
        private _snackBar: MatSnackBar,
        private state: StateService,
        // private _location: Location,
        private rest: RestService) {
        // tslint:disable-next-line: triple-equals
        if (this.router.getCurrentNavigation().extras.state != undefined) {
            this.student = this.router.getCurrentNavigation().extras.state.data;
        }
        this.downloadImageStudent();
        this.form = new FormGroup({
            _id: new FormControl(null),
            name: new FormControl(this.student?.name, { validators: [Validators.required] }),
            department: new FormControl(this.student?.department, { validators: [Validators.required] }),
            address: new FormControl(this.student?.address, { validators: [Validators.required] }),
            joining_year: new FormControl(this.student?.joining_year, { validators: [Validators.required] }),
            year: new FormControl(this.student?.year, { validators: [Validators.required] }),
            passing_year: new FormControl(this.student?.passing_year, { validators: [Validators.required] }),
            email: new FormControl(this.student?.email, { validators: [Validators.required] }),
            phone: new FormControl(this.student?.phone, { validators: [Validators.required] }),
            image: new FormControl(this.dataBlob, {
                asyncValidators: [mimType]
            })
            // only accept images
        });
        console.log(this.form);
        console.log(this.student);
    }

    ngOnInit(): void {
    }

    async downloadImageStudent() {
        if (this.student) {
            const resp = await this.rest.downloadImage(this.student.image);
            this.dataBlob = resp;
            console.log(this.dataBlob);
            this.form.patchValue({ image: this.dataBlob });
            this.form.get('image').updateValueAndValidity();
            this.imgPreview = `${this.rest.baseUrl}images/${this.student.image}`;
        }
    }

    onImagePicked($event: Event) {
        this.file = ($event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: this.file }); // for single control
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imgPreview = reader.result as string;
        };
        this.fileChanges = true;
        reader.readAsDataURL(this.file);
    }

    async onSubmit() {
        // tslint:disable-next-line: triple-equals
        if (this.routes.route == '/newStudent') {
            const value = this.form.value;
            console.log(value);
            const { name, department, address, joining_year, year, passing_year, email, phone } = value;
            const student: Student = {
                name,
                department,
                address,
                joining_year: parseInt(joining_year, 10),
                year: parseInt(year, 10),
                passing_year: parseInt(passing_year, 10),
                email,
                phone,
            };
            console.log(student);
            const message = `Adding new Student: ${name}`;
            const action = 'Undo';
            let undo = false;
            const ref = this._snackBar.open(message, action, {
                duration: 2000,
            });
            this.router.navigate(['/list']);
            ref.onAction().subscribe(() => undo = true);
            ref.afterDismissed().subscribe(async () => {
                if (!undo) {
                    this.notifService.addNotifs(message);
                    const resp = await this.rest.addStudent(student, this.file);
                    if (resp.status) {
                        // alert(`New student ${name} added`);
                        this.notifService.addNotifs(`New student ${name} added`);
                    }
                    else {
                        // alert(`New student ${name} not added`);
                        this.notifService.addNotifs(`New student ${name} not added`);
                    }
                }
                else {
                    // alert('New student was not created');
                    this.notifService.addNotifs('New student was not created');
                }
                this.state.updateList();
            });
        }
        else if (this.routes.route === '/editStudent') {
            const value = this.form.value;
            const { name, department, address, joining_year, year, passing_year, email, phone } = value;
            const student: Student = {
                _id: this.student._id,
                name,
                department,
                address,
                joining_year: parseInt(joining_year, 10),
                year: parseInt(year, 10),
                passing_year: parseInt(passing_year, 10),
                email,
                phone,
            };
            const message = `Updating student: ${name}`;
            const action = 'Undo';
            let undo = false;
            const ref = this._snackBar.open(message, action, {
                duration: 2000,
            });
            this.router.navigate(['/list']);
            ref.onAction().subscribe(() => undo = true);
            ref.afterDismissed().subscribe(async () => {
                // console.log(undo);
                if (!undo) {
                    this.notifService.addNotifs(message);
                    const resp = await this.rest.updateStudent(student, (this.fileChanges) ? this.file : null);
                    if (resp.status) {
                        alert(`Student ${name} updated`);
                        this.notifService.addNotifs(`Student ${name} updated`);
                    }
                    else {
                        alert(`Student ${name} not updated`);
                        this.notifService.addNotifs(`Student ${name} updated`);
                    }
                }
                else {
                    alert('Updation cancelled');
                }
                this.state.updateList();
            });

            // this.router.navigate(['/list']);
        }


        // this.router.navigate(['/list']);
    }

    onClose() {
        window.history.back();
    }
}
