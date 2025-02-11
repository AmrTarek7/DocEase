import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';

interface ExternalEntity {
  name: string;
}

interface InternalDepartment {
  name: string;
}

interface Attachment {
  name: string;
}

export interface Letter {
  id: number;
  date: string;
  sender: string;
  internalDepartment: string;
  status: string;
  content: string;
  attachments: Attachment[];
  type: string;
  sever: string;
}

export interface Data {
  externalEntities: ExternalEntity[];
  internalDepartments: InternalDepartment[];
  letters: Letter[];
}

@Component({
  selector: 'app-archive',
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './archive.component.html',
})
export class ArchiveComponent implements OnInit {
  data: Data | null = null;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient

  ngOnInit() {
    this.getData().subscribe(
      (jsonData) => {
        this.data = jsonData;
      },
      (err) => {
        this.error = 'Error loading data. Please try again later.';
        console.error(err);
        this.data = null;
      }
    );
  }

  getData(): Observable<Data> {
    return this.http.get<Data>('./assets/external.json').pipe(
      catchError((error) => {
        console.error('HTTP Error:', error);
        return of({
          externalEntities: [],
          internalDepartments: [],
          letters: [],
        });
      })
    );
  }

  // Helper Function for Status Tag
  getSeverity(status: string) {
    switch (status) {
      case 'مستلم':
        return 'success';
      case 'قيد المراجعة':
        return 'warn';
      case 'معاد إرساله':
        return 'info';
      default:
        return 'danger';
    }
  }

  // view letter
  viewLetter(letter: Letter) {
    this.router.navigate(['./home/archiveViewLetter', { id: letter.id }]);
  }
}
