import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../models/student.model';
import { RestService } from '../services/rest.service';
import { Chart } from 'node_modules/chart.js';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  students: Student[];
  toggle = true;
  years = [1, 2, 3, 4];
  yearsData = [];
  streams = ['B.SC.(IT)', 'BCA', 'MCA', 'M.SC.(IT)'];
  streamsData = [];
  totalStudents = 0;
  chart1: any;
  chart2: any;
  constructor(private rest: RestService, private router: Router) {
    this.fetchData();
  }

  // students:Student[];
  // buttonClickd=false;

  async ngOnInit() {}

  async fetchData() {
    const resp = await this.rest.getAllStudents();
    this.students = resp.data;
    this.totalStudents = this.students.length;
    this.streams.forEach(async (stream) => {
      const res = await this.rest.getStudents({ department: stream });
      this.streamsData.push(res.data.length);
    });
    this.years.forEach(async (year) => {
      const res = await this.rest.getStudents({ year });
      this.yearsData.push(res.data.length);
    });
    console.log(this.streamsData);
    console.log(this.yearsData);
    this.chart1 = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.streams,
        datasets: [
          {
            data: this.streamsData,
            label: 'Students',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 30,
              },
            },
          ],
        },
        responsive: true,
      },
    });

    this.chart2 = new Chart('myPChart', {
      type: 'pie',
      data: {
        labels: ['First', 'Second', 'Third', 'Fourth'],
        datasets: [
          {
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
            data: this.yearsData,
          },
        ],
      },
      options: {
        legend: {
          position: 'right',
        },
      },
    });
    console.log(this.chart1.data.datasets[0]);
    console.log(this.chart2.data.datasets[0]);
  }

  async onClick(num: number) {
    // const resp = await this.rest.getStudents({ year:num});
    this.router.navigate(['list'], { state: { filterYear: num } });
  }

  async onStream(s: string) {
    // const resp = await this.rest.getStudents({ department:s });
    console.log(s);
    this.router.navigate(['list'], { state: { filterDept: s } });
  }
}
