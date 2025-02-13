import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FileUploadEvent } from 'primeng/fileupload'; // تأكد من استيراد FileUploadEvent
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';

interface externalEntitie {
  name: string;
  code: string;
}
interface communicationType {
  name: string;
  code: string;
}
interface letterType {
  name: string;
  code: string;
}
interface importanceLevel {
  name: string;
  code: string;
}

@Component({
  selector: 'app-send-new-letter',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FileUploadModule,
    TextareaModule,
    FileUpload,
    ToastModule,
    CommonModule,
    SelectModule,
    DatePicker,
    InputNumber,
  ],
  templateUrl: './send-new-letter.component.html',
  styleUrls: ['./send-new-letter.component.css'],
})
export class SendNewLetterComponent implements OnInit {
  letterForm!: FormGroup;
  uploadedFiles: any[] = [];

  externalEntities: externalEntitie[] | undefined;
  selectedSender: externalEntitie | undefined;

  communicationTypes: communicationType[] | undefined;
  selectedCommunicationType: communicationType | undefined;

  letterTypes: letterType[] | undefined;
  selectedLetterType: letterType | undefined;

  importanceLevels: importanceLevel[] | undefined;
  selectedImportanceLevel: importanceLevel | undefined;

  constructor(private messageService: MessageService, private fb: FormBuilder) {
    this.letterForm = this.fb.group({
      selectedSender: [null, Validators.required],
      communicationType: [null, Validators.required],
      letterType: [null, Validators.required],
      importanceLevel: [null, Validators.required],
      internalIncomingNumber: ['', Validators.required],
      internalIncomingDate: [null, Validators.required],
      externalIncomingNumber: ['', Validators.required],
      externalIncomingDate: [null, Validators.required],
      letterDetails: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.externalEntities = [
      { name: 'وزارة الكهرباء', code: 'وزارة الكهرباء' },
      { name: 'وزارة الصحة', code: 'وزارة الصحة' },
      { name: 'وزارة التعليم', code: 'وزارة التعليم' },
    ];

    this.communicationTypes = [
      { name: 'مراسلة', code: 'مراسلة' },
      { name: 'استقبال', code: 'استقبال' },
    ];

    this.letterTypes = [
      { name: 'استعلام', code: 'استعلام' },
      { name: 'اعلام', code: 'اعلام' },
    ];

    this.importanceLevels = [
      { name: 'قصوي', code: 'قصوي' },
      { name: 'عالية', code: 'عالية' },
      { name: 'متوسطة', code: 'متوسطة' },
      { name: 'عاجل', code: 'عاجل' },
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

    const senderCode = this.letterForm.value.selectedSender?.code;
    const communicationTypeCode = this.letterForm.value.communicationType?.code;
    const letterTypeCode = this.letterForm.value.letterType?.code;
    const importanceLevelCode = this.letterForm.value.importanceLevel?.code;

    const letterData = {
      sender: senderCode ? senderCode : 'غير محدد',
      communicationType: communicationTypeCode
        ? communicationTypeCode
        : 'غير محدد',
      letterType: letterTypeCode ? letterTypeCode : 'غير محدد',
      importanceLevel: importanceLevelCode ? importanceLevelCode : 'غير محدد',
      internalIncomingNumber: this.letterForm.value.internalIncomingNumber,
      internalIncomingDate: this.letterForm.value.internalIncomingDate,
      externalIncomingNumber: this.letterForm.value.externalIncomingNumber,
      externalIncomingDate: this.letterForm.value.externalIncomingDate,
      details: this.letterForm.value.letterDetails,
      attachments: this.uploadedFiles,
    };

    console.log('Data submitted:', letterData);

    this.messageService.add({
      severity: 'success',
      summary: 'نجح إرسال الرسالة',
      detail: 'تم إرسال الرسالة بنجاح.',
    });

    this.letterForm.reset();
    this.uploadedFiles = [];
  }
}
