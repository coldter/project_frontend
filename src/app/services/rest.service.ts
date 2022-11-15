import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { ServerResponse } from '../models/server-response.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  private students: Student[] = [];
  private studentsUpdated = new Subject<Student[]>();

  formatQuery(paramMap): string {
    const keys = Object.keys(paramMap);
    if (keys.length === 0) {
      return '';
    }

    let qparam = '';
    const key0 = keys[0];
    qparam = '?' + key0 + '=' + paramMap[key0];

    keys.forEach(element => {
      if (element === key0) {
        return;
      }
      qparam += '&' + element + '=' + paramMap[element];
    });
    return qparam;
  }

  public getStudentonSearch(query: string){
    const url = `${this.baseUrl}students/search`;
    return this.http.post<ServerResponse<Student[]>>(url, { query }).toPromise();

  }
  public getAllStudents(): Promise<ServerResponse<Student[]>> {
    const url = `${this.baseUrl}students`;
    return this.http.get<ServerResponse<Student[]>>(url).toPromise();
  }

  public getStudents(queries): Promise<ServerResponse<Student[]>> {
    const url = `${this.baseUrl}students${this.formatQuery(queries)}`;
    return this.http.get<ServerResponse<Student[]>>(url).toPromise();
  }
  public addStudent(student: Student, file: File): Promise<ServerResponse<Student>> {
    const postData = new FormData();
    Object.keys(student).forEach((key) => {
      postData.append(key, student[key]);
    });
    postData.append('student-image', file, file.name);
    console.log(postData);

    const url = `${this.baseUrl}students/create`;
    return this.http.post<ServerResponse<Student>>(url, postData).toPromise();
  }

  public getStudentById(id: string): Promise<ServerResponse<Student>> {
    const url = `${this.baseUrl}students/${id}`;
    return this.http.get<ServerResponse<Student>>(url).toPromise();
  }

  public downloadImage(imageId: string): Promise<Blob> {
    const url = `${this.baseUrl}images/${imageId}`;
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }
  public deleteStudent(id: string) {

    const url = `${this.baseUrl}students/${id}`;
    return this.http.delete<{ message: string, status: boolean }>(url).toPromise();
  }

  public updateStudent(student: Student, file?: File) {
    console.log(student);
    const postData = new FormData();
    Object.keys(student).forEach((key) => {
      postData.append(key, student[key]);
    });
    if (file) {
      console.log(file);
      postData.append('student-image', file, file.name);
    }
    console.log(postData);
    const url = `${this.baseUrl}students/${student._id}`;
    return this.http.put<ServerResponse<Student>>(url, postData).toPromise();
  }
}
