import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FileUploadEvent } from 'primeng/fileupload'; // تأكد من استيراد FileUploadEvent
import { Select } from 'primeng/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface externalEntitie {
  name: string;
  code: string;
}
interface internalDepartment {
  name: string;
  code: string;
}

@Component({
  selector: 'app-send-new-letter',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    TextareaModule,
    FileUpload,
    ToastModule,
    CommonModule,
    Select,
  ],
  templateUrl: './send-new-letter.component.html',
  styleUrls: ['./send-new-letter.component.css'],
})
export class SendNewLetterComponent implements OnInit {
  letterForm!: FormGroup;
  uploadedFiles: any[] = [];

  externalEntities: externalEntitie[] | undefined;
  selectedSender: externalEntitie | undefined;

  internalDepartments: internalDepartment[] | undefined;
  selectedDepartment: internalDepartment | undefined;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.letterForm = this.fb.group({
      selectedSender: [null, Validators.required],
      selectedDepartment: [null, Validators.required],
      letterDetails: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.externalEntities = [
      { name: 'وزارة الكهرباء', code: 'وزارة الكهرباء' },
      { name: 'وزارة الصحة', code: 'وزارة الصحة' },
      { name: 'وزارة التعليم', code: 'وزارة التعليم' },
    ];

    this.internalDepartments = [
      { name: 'قسم الشؤون الإدارية', code: 'قسم الشؤون الإدارية' },
      { name: 'قسم المالية', code: 'قسم المالية' },
      { name: 'قسم العلاقات العامة', code: 'قسم العلاقات العامة' },
    ];
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(this.uploadedFiles);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  onSubmit() {
    if (this.letterForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Form Invalid',
        detail: 'Please fill in all required fields correctly.',
      });
      return;
    }

    // التأكد من أن selectedSender و selectedDepartment تم تعيينهما
    const senderCode = this.letterForm.value.selectedSender?.code;
    const departmentCode = this.letterForm.value.selectedDepartment?.code;

    const letterData = {
      sender: senderCode ? senderCode : 'غير محدد',
      department: departmentCode ? departmentCode : 'غير محدد',
      details: this.letterForm.value.letterDetails,
      attachments: this.uploadedFiles,
    };

    console.log('Data submitted:', letterData);

    // إظهار رسالة النجاح
    this.messageService.add({
      severity: 'success',
      summary: 'نجح إرسال الرسالة',
      detail: 'تم إرسال الرسالة بنجاح.',
    });

    // تهيئة الفورم من جديد
    this.letterForm.reset();

    // إعادة تعيين المرفقات
    this.uploadedFiles = [];
    // يمكنك إرسال البيانات إلى السيرفر أو حفظها حسب الحاجة.
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DropdownModule } from 'primeng/dropdown';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { FileUploadModule } from 'primeng/fileupload';
// import { InputGroupModule } from 'primeng/inputgroup';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// import { TextareaModule } from 'primeng/textarea';
// import { MessageService } from 'primeng/api';
// import { FileUpload } from 'primeng/fileupload';
// import { ToastModule } from 'primeng/toast';
// import { CommonModule } from '@angular/common';
// import { FileUploadEvent } from 'primeng/fileupload'; // تأكد من استيراد FileUploadEvent
// import { Select } from 'primeng/select';

// interface externalEntitie {
//   name: string;
//   code: string;
// }
// interface internalDepartment {
//   name: string;
//   code: string;
// }
// @Component({
//   selector: 'app-send-new-letter',
//   imports: [
//     FormsModule,
//     DropdownModule,
//     InputGroupAddonModule,
//     InputGroupModule,
//     InputTextModule,
//     ButtonModule,
//     FileUploadModule,
//     TextareaModule,
//     FileUpload,
//     ToastModule,
//     CommonModule,
//     Select,
//   ],
//   templateUrl: './send-new-letter.component.html',
//   styleUrl: './send-new-letter.component.css',
// })
// export class SendNewLetterComponent implements OnInit {
//   letterDetails: string = '';
//   uploadedFiles: any[] = [];

//   externalEntities: externalEntitie[] | undefined;
//   selectedSender: externalEntitie | undefined;

//   internalDepartments: internalDepartment[] | undefined;
//   selectedDepartment: internalDepartment | undefined;

//   constructor(private messageService: MessageService) {}

//   onUpload(event: FileUploadEvent) {
//     for (let file of event.files) {
//       this.uploadedFiles.push(file);
//       console.log(this.uploadedFiles);
//     }

//     this.messageService.add({
//       severity: 'info',
//       summary: 'File Uploaded',
//       detail: '',
//     });
//   }

//   // دالة إرسال البيانات
//   onSubmit() {
//     const letterData = {
//       sender: this.selectedSender?.code,
//       department: this.selectedDepartment?.code,
//       details: this.letterDetails,
//       attachments: this.uploadedFiles,
//     };

//     console.log('Data submitted:', letterData);

//     // هنا يمكنك إرسال البيانات إلى السيرفر أو حفظها في مكان آخر حسب الحاجة
//   }
//   // printletter() {
//   //   return console.log(this.letterDetails);
//   // }

//   ngOnInit(): void {
//     this.externalEntities = [
//       { name: 'وزارة الكهرباء', code: 'وزارة الكهرباء' },
//       { name: 'وزارة الصحة', code: 'وزارة الصحة' },
//       { name: 'وزارة التعليم', code: 'وزارة التعليم' },
//     ];

//     this.internalDepartments = [
//       { name: 'قسم الشؤون الإدارية', code: 'قسم الشؤون الإدارية' },
//       { name: 'قسم المالية', code: 'قسم المالية' },
//       { name: 'قسم العلاقات العامة', code: 'قسم العلاقات العامة' },
//     ];

//     //   setInterval(() => {
//     //     this.printletter();
//     //   }, 3000);
//   }
// }
