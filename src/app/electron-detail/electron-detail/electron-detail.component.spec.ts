import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronDetailComponent } from './electron-detail.component';

describe('ElectronDetailComponent', () => {
  let component: ElectronDetailComponent;
  let fixture: ComponentFixture<ElectronDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
