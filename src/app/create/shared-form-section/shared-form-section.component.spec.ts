import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFormSectionComponent } from './shared-form-section.component';

describe('SharedFormSectionComponent', () => {
  let component: SharedFormSectionComponent;
  let fixture: ComponentFixture<SharedFormSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SharedFormSectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
