import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaApplicantDetailsComponent } from './ra-applicant-details.component';

describe('RaApplicantDetailsComponent', () => {
  let component: RaApplicantDetailsComponent;
  let fixture: ComponentFixture<RaApplicantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaApplicantDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaApplicantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
