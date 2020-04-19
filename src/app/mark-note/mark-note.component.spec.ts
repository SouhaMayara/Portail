import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkNoteComponent } from './mark-note.component';

describe('MarkNoteComponent', () => {
  let component: MarkNoteComponent;
  let fixture: ComponentFixture<MarkNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
