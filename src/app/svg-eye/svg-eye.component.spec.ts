import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgEyeComponent } from './svg-eye.component';

describe('SvgEyeComponent', () => {
  let component: SvgEyeComponent;
  let fixture: ComponentFixture<SvgEyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgEyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
