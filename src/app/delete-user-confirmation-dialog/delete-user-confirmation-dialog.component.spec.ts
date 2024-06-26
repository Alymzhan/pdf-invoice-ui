import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserConfirmationDialogComponent } from './delete-user-confirmation-dialog.component';

describe('DeleteUserConfirmationDialogComponent', () => {
  let component: DeleteUserConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteUserConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUserConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
