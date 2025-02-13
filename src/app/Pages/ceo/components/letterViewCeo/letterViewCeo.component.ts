import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import {
  Letter,
  ExternalEntity,
  InternalDepartment,
} from '../../../../interfaces/letters';
import { MultiSelectModule } from 'primeng/multiselect'; // Import MultiSelectModule
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { LetterjsonService } from '../../../../service/letterjson.service';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-letter-view-ceo',
  imports: [
    CommonModule,
    TableModule,
    MultiSelectModule,
    SelectModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './letterViewCeo.component.html',
  styleUrls: ['./letterViewCeo.component.css'],
})
export class letterViewCeoComponent implements OnInit, OnChanges {
  @Input() letterId: number | undefined;
  letter: Letter | undefined;
  letterDetails: string = ''; // store letter details
  allLetters: Letter[] = []; // تخزين جميع الخطابات محليًا
  cols: any[] = [];

  selectedDepartments: any[] = []; // Array to store selected departments (multiple)
  collectedDep: InternalDepartment | undefined;
  externalEntities: ExternalEntity[] = []; // Initialize
  internalDepartments: InternalDepartment[] = [];
  uploadedFiles: any[] = [];
  isDataLoaded: boolean = false; // ✅ ضمان تحميل البيانات مرة واحدة فقط

  constructor(
    private messageService: MessageService,
    private _letterjsonService: LetterjsonService
  ) {}

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

    if (!this.isDataLoaded) {
      // ✅ تحميل البيانات مرة واحدة فقط
      this._letterjsonService.getLettersData().subscribe({
        next: (data) => {
          this.allLetters = data.letters;
          this.internalDepartments = data.internalDepartments;
          this.externalEntities = data.externalEntities;
          this.isDataLoaded = true; // ✅ تحديد أن البيانات قد تم تحميلها
        },
        error: (err) => console.log(err),
        complete: () => console.log('✅ تم تحميل جميع البيانات بنجاح'),
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['letterId'] && changes['letterId'].currentValue) {
      const currentId = changes['letterId'].currentValue;
      this.letter = this.allLetters.find((letter) => letter.id === currentId);
    }
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'نجاح',
      detail: 'تم رفع الملف بنجاح',
    });
    console.log('file uploaded successfully');
  }
}
