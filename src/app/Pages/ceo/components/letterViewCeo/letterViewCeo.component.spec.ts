import { ComponentFixture, TestBed } from '@angular/core/testing';

import { letterViewCeoComponent } from './letterViewCeo.component';

describe('LettComponent', () => {
  let component: letterViewCeoComponent;
  let fixture: ComponentFixture<letterViewCeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [letterViewCeoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(letterViewCeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
