import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaPrimaryIndividualComponent } from './ra-primary-individual.component';

describe('RaPrimaryIndividualComponent', () => {
  let component: RaPrimaryIndividualComponent;
  let fixture: ComponentFixture<RaPrimaryIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaPrimaryIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaPrimaryIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
