import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProfComponent } from './layout-prof.component';

describe('LayoutProfComponent', () => {
  let component: LayoutProfComponent;
  let fixture: ComponentFixture<LayoutProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
