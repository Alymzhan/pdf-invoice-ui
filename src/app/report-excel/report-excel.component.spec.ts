import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExcelComponent } from './report-excel.component';

describe('ReportExcelComponent', () => {
  let component: ReportExcelComponent;
  let fixture: ComponentFixture<ReportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportExcelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
