import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbProfComponent } from './list-ab-prof.component';

describe('ListAbProfComponent', () => {
  let component: ListAbProfComponent;
  let fixture: ComponentFixture<ListAbProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
