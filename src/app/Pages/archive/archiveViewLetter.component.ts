import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Letter, Data } from './archive.component'; // Import the interface
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-archive-view-letter',
  imports: [
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    TagModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    CommonModule
  ],
  template: `
    <div class="card min-h-screen" dir="rtl">
      <div
        class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
        *ngIf="letter"
      >
        <h2 class="text-xl font-bold mb-4">تفاصيل الخطاب</h2>

        <div class="mb-4">
          <p><strong>رقم الخطاب:</strong> {{ letter.id }}</p>
          <p><strong>تاريخ الاستلام:</strong> {{ letter.date }}</p>
          <p><strong>الجهة المرسلة:</strong> {{ letter.sender }}</p>
          <p>
            <strong>الجهة الداخلية:</strong> {{ letter.internalDepartment }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">محتوى الخطاب</label>
          <div class="p-4 bg-gray-50 rounded">{{ letter.content }}</div>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">المرفقات</label>
          <div
            *ngFor="let attachment of letter.attachments"
            class="flex items-center justify-between p-2 bg-gray-50 rounded mb-2"
          >
            <span>{{ attachment.name }}</span>
            <button
              pButton
              icon="pi pi-download"
              class="p-button-success p-button-sm"
            ></button>
          </div>
        </div>

        <button
          pButton
          icon="pi pi-arrow-left"
          label="العودة للأرشيف"
          class="p-button-secondary w-full"
          (click)="backToArchive()"
        ></button>
      </div>
      <div *ngIf="!letter">Loading...</div>
    </div>
  `,
})
export class ArchiveViewLetterComponent implements OnInit {
  letter: Letter | undefined; // To store the letter details
  letterId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
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

  backToArchive() {
    this.router.navigate(['./home/archive']);
  }
}
