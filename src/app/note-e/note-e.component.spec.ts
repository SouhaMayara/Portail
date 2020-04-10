import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEComponent } from './note-e.component';

describe('NoteEComponent', () => {
  let component: NoteEComponent;
  let fixture: ComponentFixture<NoteEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
