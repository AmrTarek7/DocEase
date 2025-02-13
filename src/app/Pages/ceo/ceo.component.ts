import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { letterViewCeoComponent } from './components/letterViewCeo/letterViewCeo.component';
import { Letter, Data } from '../../interfaces/letters';
import { LetterjsonService } from '../../service/letterjson.service';

@Component({
  selector: 'app-ceo',
  standalone: true, // Mark as standalone
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    TagModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    letterViewCeoComponent,
  ],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css',
})
export class CEOComponent implements OnInit {
  data: Data | null = null;

  // letter: Letter | undefined; // To store the letter details
  letterId: number | undefined;

  selectedLetterId: number | undefined; // Add this property

  constructor(private _letterjsonService: LetterjsonService) {} // Inject HttpClient

  ngOnInit() {
    this._letterjsonService.getLettersData().subscribe({
      next: (jsonData) => {
        this.data = jsonData;
        console.log('here data', this.data);
      },
      error: (e) => console.log(e),
      complete: () => console.log('Complete fetching data from Ceo Component'),
    });
  }

  // Helper Function for Status Tag
  getStatus(status: string) {
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

  getSeverity(sever: string) {
    switch (sever) {
      case 'متوسطة':
        return 'success';
      case 'عالية':
        return 'warn';
      case 'عاجل':
        return 'info';
      default:
        return 'danger';
    }
  }

  // view letter

  visible: boolean = false;

  showDialog(letter: Letter) {
    this.selectedLetterId = letter.id; // Set the ID when the button is clicked
    this.visible = true;
  }
}
