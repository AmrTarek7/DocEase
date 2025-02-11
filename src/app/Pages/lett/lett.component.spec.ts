import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettComponent } from './lett.component';

describe('LettComponent', () => {
  let component: LettComponent;
  let fixture: ComponentFixture<LettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LettComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
