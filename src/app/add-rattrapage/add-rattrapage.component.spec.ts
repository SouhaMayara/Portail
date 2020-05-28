import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRAttrapageComponent } from './add-rattrapage.component';

describe('AddRAttrapageComponent', () => {
  let component: AddRAttrapageComponent;
  let fixture: ComponentFixture<AddRAttrapageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRAttrapageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRAttrapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
