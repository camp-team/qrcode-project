import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronCardComponent } from './electron-card.component';

describe('ElectronCardComponent', () => {
  let component: ElectronCardComponent;
  let fixture: ComponentFixture<ElectronCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
