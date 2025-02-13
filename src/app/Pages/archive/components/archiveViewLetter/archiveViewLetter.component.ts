import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Letter } from '../../../../interfaces/letters';
import { SelectModule } from 'primeng/select';
import { LetterjsonService } from '../../../../service/letterjson.service';

@Component({
  selector: 'app-archive-view-letter',
  imports: [FormsModule, ButtonModule, CommonModule, SelectModule],
  templateUrl: './archiveViewLetter.component.html',
})
export class ArchiveViewLetterComponent implements OnInit {
  letter: Letter | undefined; // To store the letter details
  letterId: number | undefined;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _letterjsonService: LetterjsonService
  ) {}

  // Fetch the letter details when the component is initialized
  ngOnInit() {
    this.route.paramMap.subscribe((res: ParamMap) => {
      const letterID = +res.get('id')!;
      this.letterId = letterID;
    });
    if (this.letterId) {
      console.log('Fetching letter details for ID:', this.letterId); // طباعة معرف الرسالة
      this.fetchLetterDetails(this.letterId); // جلب تفاصيل الرسالة بعد التأكد من تعيين letterId
    }
  }

  // Fetch the letter details from the JSON file
  fetchLetterDetails(id: number) {
    this._letterjsonService.getLettersData().subscribe({
      next: (data) => {
        const foundLetter = data.letters.find((letter) => letter.id === id);
        this.letter = foundLetter;
        this.isLoading = true;
        console.log('Found letter:', this.letter); // طباعة تفاصيل الرسالة التي تم العثور عليها
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed fetching letter details'),
    });
  }

  backToArchive() {
    this.router.navigate(['./home/archive']);
  }
}
