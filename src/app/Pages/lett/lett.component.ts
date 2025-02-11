import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Letter, Data } from '../ceo/ceo.component'; // Import your Letter interface
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ExternalEntity, InternalDepartment } from '../ceo/ceo.component';
import { MultiSelectModule } from 'primeng/multiselect'; // Import MultiSelectModule
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-lett',
  imports: [
    CommonModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    FileUploadModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './lett.component.html', // Or your template URL
  styleUrls: ['./lett.component.css'], // Or your style URL
})
export class LettComponent implements OnChanges {
  @Input() letterId: number | undefined;
  letter: Letter | undefined;

  cols: any[] = [];

  letterDetails: string = '';

  selectedDepartments: any[] = []; // Array to store selected departments (multiple)
  collectedDep: InternalDepartment | undefined
  externalEntities: ExternalEntity[] = []; // Initialize
  internalDepartments: InternalDepartment[] = [];

  uploadedFiles: any[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.loadDropdownData(); // Load dropdown options on init
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  }

  loadDropdownData() {
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
        this.internalDepartments = data.internalDepartments;
      });
  }

  ngOnInit() {
    this.cols = [
      { field: 'numIn', header: 'رقم وارد' },
      { field: 'dateIn', header: 'تاريخ وارد' },
      { field: 'numOut', header: 'رقم صادر' }, // Corrected property name
      { field: 'dateOut', header: 'تاريخ صادر' }, // Corrected property name
      { field: 'type', header: 'نوع المراسلة' },
      { field: 'sender', header: 'الجهة الخارجية' },
      { field: 'sever', header: 'درجة الاهمية' }, // Corrected property name
      { field: 'status', header: 'حالة الخطاب' },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    // Implement ngOnChanges
    if (changes['letterId'] && changes['letterId'].currentValue) {
      // Check if letterId changed
      const currentId = changes['letterId'].currentValue;
      this.fetchLetterDetails(currentId);
    }
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
        this.letter = data.letters.find((letter) => letter.id === id);
        console.log(this.letter);
      });
  }
}
