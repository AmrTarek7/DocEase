import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Letter, Data } from '../../archive.component';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-archive-view-letter',
  imports: [FormsModule, ButtonModule, CommonModule, SelectModule],
  templateUrl: './archiveViewLetter.component.html',
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
