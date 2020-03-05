import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutEtudiantComponent } from './layout-etudiant.component';

describe('LayoutEtudiantComponent', () => {
  let component: LayoutEtudiantComponent;
  let fixture: ComponentFixture<LayoutEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
