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
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
    TableModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    TagModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    CommonModule,
  ],
  // templateUrl: './archive.component.html',
  template: `
    <div class="card min-h-screen" dir="rtl" *ngIf="data">
      <div class="flex">
        <div class="w-64 shadow-md p-4">
          <ul class="space-y-2">
            <li class="p-2 bg-blue-100 rounded">الأرشيف</li>
            <li class="p-2 hover:bg-gray-100 rounded">إرسال خطاب جديد</li>
            <li class="p-2 hover:bg-gray-100 rounded">البحث في الأرشيف</li>
            <li class="p-2 hover:bg-gray-100 rounded">الإعدادات</li>
          </ul>
        </div>

        <div class="flex-1 p-4">
          <!-- Search Bar -->
          <div class="mb-4">
            <p-inputGroup>
              <input
                pInputText
                placeholder="ابحث برقم الخطاب أو التاريخ أو الجهة"
                class="w-full"
              />
              <button
                pButton
                icon="pi pi-search"
                class="p-button-primary"
              ></button>
            </p-inputGroup>
          </div>

          
          <p-table
            [paginator]="true"
            [rows]="10"
            [value]="data.letters"
            class="w-full"
          >
            <ng-template pTemplate="header">
              <tr>
                <th>رقم الخطاب</th>
                <th>تاريخ الاستلام</th>
                <th>الجهة المرسلة</th>
                <th>الجهة الداخلية</th>
                <th>حالة الخطاب</th>
                <th>إجراءات</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-letter>
              <tr>
                <td>{{ letter.id }}</td>
                <td>{{ letter.date }}</td>
                <td>{{ letter.sender }}</td>
                <td>{{ letter.internalDepartment }}</td>
                <td>
                  <p-tag
                    [severity]="getSeverity(letter.status)"
                    [value]="letter.status"
                  ></p-tag>
                </td>
                <td>
                  <button
                    pButton
                    icon="pi pi-eye"
                    class="p-button-info p-button-sm"
                    (click)="viewLetter(letter)"
                  ></button>
                  <button
                    pButton
                    icon="pi pi-download"
                    class="p-button-success p-button-sm ml-2"
                  ></button>
                </td>
              </tr>
            </ng-template>
          </p-table>

          <button
            pButton
            icon="pi pi-plus"
            label="إضافة خطاب جديد"
            class="p-button-primary mt-4"
          ></button>
        </div>
      </div>
    </div>
    <!-- <div *ngIf="error">{{ error }}</div> -->
    <!-- <div *ngIf="!data && !error">Loading data...</div> -->
  `,
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

  // Sample Data
  // letters = [
  //   {
  //     id: 1,
  //     date: '2023-10-01',
  //     sender: 'وزارة الكهرباء',
  //     internalDepartment: 'قسم الشؤون الإدارية',
  //     status: 'مستلم',
  //     content: 'تفاصيل الخطاب 1',
  //     attachments: [{ name: 'ملف1.pdf' }],
  //   },
  //   {
  //     id: 2,
  //     date: '2023-10-02',
  //     sender: 'وزارة الصحة',
  //     internalDepartment: 'قسم المالية',
  //     status: 'قيد المراجعة',
  //     content: 'تفاصيل الخطاب 2',
  //     attachments: [{ name: 'ملف2.docx' }],
  //   },
  // ];

  // externalEntities = [
  //   { name: 'وزارة الكهرباء' },
  //   { name: 'وزارة الصحة' },
  //   { name: 'وزارة التعليم' },
  // ];

  // internalDepartments = [
  //   { name: 'قسم الشؤون الإدارية' },
  //   { name: 'قسم المالية' },
  //   { name: 'قسم العلاقات العامة' },
  // ];

  // selectedSender: any;
  // selectedDepartment: any;
  // letterDetails: string = '';
  // selectedLetter: any;
  // response: string = '';

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
