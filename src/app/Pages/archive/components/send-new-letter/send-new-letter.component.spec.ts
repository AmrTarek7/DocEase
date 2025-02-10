import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNewLetterComponent } from './send-new-letter.component';

describe('SendNewLetterComponent', () => {
  let component: SendNewLetterComponent;
  let fixture: ComponentFixture<SendNewLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendNewLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNewLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
