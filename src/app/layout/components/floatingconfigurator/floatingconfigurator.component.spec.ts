import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFloatingConfigurator } from './floatingconfigurator.component';

describe('AppFloatingConfigurator', () => {
  let component: AppFloatingConfigurator;
  let fixture: ComponentFixture<AppFloatingConfigurator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFloatingConfigurator],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFloatingConfigurator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
