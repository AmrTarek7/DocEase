import { Component } from '@angular/core';
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

@Component({
  selector: 'app-test',
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
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  // Sample Data
  letters = [
    {
      id: 1,
      date: '2023-10-01',
      sender: 'وزارة الكهرباء',
      internalDepartment: 'قسم الشؤون الإدارية',
      status: 'مستلم',
      content: 'تفاصيل الخطاب 1',
      attachments: [{ name: 'ملف1.pdf' }],
    },
    {
      id: 2,
      date: '2023-10-02',
      sender: 'وزارة الصحة',
      internalDepartment: 'قسم المالية',
      status: 'قيد المراجعة',
      content: 'تفاصيل الخطاب 2',
      attachments: [{ name: 'ملف2.docx' }],
    },
  ];

  externalEntities = [
    { name: 'وزارة الكهرباء' },
    { name: 'وزارة الصحة' },
    { name: 'وزارة التعليم' },
  ];

  internalDepartments = [
    { name: 'قسم الشؤون الإدارية' },
    { name: 'قسم المالية' },
    { name: 'قسم العلاقات العامة' },
  ];

  selectedSender: any;
  selectedDepartment: any;
  letterDetails: string = '';
  selectedLetter: any;
  response: string = '';

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

  // Search Criteria
  searchCriteria = {
    id: null,
    sender: null,
    date: null,
  };

  // Search Results
  searchResults: any[] = [];
  isSearchPerformed = false;
}
