import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

// PrimeNG Module Imports - MUST be in the imports array
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { Dialog, DialogModule } from 'primeng/dialog';

import { LettComponent } from '../lett/lett.component';

export interface ExternalEntity {
  name: string;
}

export interface InternalDepartment {
  name: string;
}

export interface Attachment {
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
}

export interface Data {
  externalEntities: ExternalEntity[];
  internalDepartments: InternalDepartment[];
  letters: Letter[];
}

@Component({
  selector: 'app-ceo',
  standalone: true, // Mark as standalone
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    LettComponent,
  ],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css',
})
export class CEOComponent implements OnInit {
  data: Data | null = null;
  error: string | null = null;

  letter: Letter | undefined; // To store the letter details
  letterId: number | undefined;

  selectedLetterId: number | undefined; // Add this property

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {} // Inject HttpClient

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

    this.route.paramMap.subscribe((params) => {
      this.letterId = +params.get('id')!; // Get the ID from the URL
      if (this.letterId) {
        this.fetchLetterDetails(this.letterId); // Fetch letter details
      }
    });
  }

  fetchLetterDetails(id: number) {
    this.http
      .get<Data>('./assets/external.json')
      .pipe(
        catchError((error) => {
          console.error('HTTP Error:', error);
          return of({
            externalEntities: [],
            internalDepartments: [],
            letters: [],
          });
        })
      )
      .subscribe((data) => {
        const foundLetter = data.letters.find((letter) => letter.id === id);
        this.letter = foundLetter;
        console.log(this.letter);
      });
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
  getStatus(status: string) {
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

  getSeverity(sever: string) {
    switch (sever) {
      case 'متوسطة':
        return 'success';
      case 'عالية':
        return 'warn';
      case 'عاجل':
        return 'info';
      default:
        return 'danger';
    }
  }

  // view letter

  visible: boolean = false;

  showDialog(letter: Letter) {
    this.selectedLetterId = letter.id; // Set the ID when the button is clicked
    this.visible = true;
  }


}
