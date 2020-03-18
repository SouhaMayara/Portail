import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesArticlesComponent } from './les-articles.component';

describe('LesArticlesComponent', () => {
  let component: LesArticlesComponent;
  let fixture: ComponentFixture<LesArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
