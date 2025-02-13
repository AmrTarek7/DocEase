import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { LetterjsonService } from '../../service/letterjson.service';
import {
  SearchCriteria,
  ExternalEntity,
  Letter,
  InternalDepartment,
} from '../../interfaces/letters';

@Component({
  selector: 'app-archive',
  imports: [
    FormsModule,
    DatePicker,
    TableModule,
    SelectModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    RouterModule,
  ],
  templateUrl: './archive.component.html',
})
export class ArchiveComponent implements OnInit {
  // تعريف المتغيرات
  letters: Letter[] = []; // قائمة الخطابات
  externalEntities: ExternalEntity[] = []; // قائمة الجهات الخارجية
  internalDepartments: InternalDepartment[] = []; // قائمة الأقسام الداخلية
  searchCriteria: SearchCriteria = {
    id: null,
    sender: null,
    date: null,
  }; // معايير البحث
  searchResults: Letter[] = []; // نتائج البحث
  isSearchPerformed = false; // متغير لتحديد ما إذا تم إجراء البحث

  constructor(
    private _LetterjsonService: LetterjsonService,
    private _router: Router
  ) {}

  //todo => function to get data from service
  ngOnInit() {
    this._LetterjsonService.getLettersData().subscribe({
      next: (data) => {
        this.letters = data.letters;
        this.externalEntities = data.externalEntities;
        this.internalDepartments = data.internalDepartments;
      },
      error: (e) => console.log(e),
      complete: () => console.log('Complete fetching data'),
    });
  }

  // دالة لتحديد شدة الحالة بناءً على حالة الخطاب
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

  // دالة البحث
  search() {
    this.isSearchPerformed = true;
    const formattedDate = this.searchCriteria.date
      ? new Date(
          new Date(this.searchCriteria.date).getTime() -
            new Date(this.searchCriteria.date).getTimezoneOffset() * 60000
        )
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '/')
      : null;

    // تصفية الخطابات بناءً على معايير البحث
    this.searchResults = this.letters.filter((letter) => {
      return (
        // تحقق مما إذا كان رقم الخطاب يطابق معايير البحث أو إذا لم يتم تحديد رقم خطاب في معايير البحث
        (!this.searchCriteria.id || letter.id === +this.searchCriteria.id) &&
        // تحقق مما إذا كانت الجهة المرسلة تطابق معايير البحث أو إذا لم يتم تحديد جهة مرسلة في معايير البحث
        (!this.searchCriteria.sender ||
          letter.sender === this.searchCriteria.sender.name) &&
        // تحقق مما إذا كان تاريخ الاستلام يطابق معايير البحث أو إذا لم يتم تحديد تاريخ في معايير البحث
        (!formattedDate || letter.date === formattedDate)
      );
    });
    console.log(this.searchResults);
  }

  // viewLetter(letter: Letter) {
  //   this._router.navigate(['./home/archive/archiveViewLetter',{ id: letter.id },]);
  // }
  // viewLetter(letter: Letter) {
  //   this._router.navigateByUrl(`./home/archive/archiveViewLetter/${letter.id}`);
  // }
}
