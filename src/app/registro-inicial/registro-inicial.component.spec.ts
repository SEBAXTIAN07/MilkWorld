import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroInicialComponent } from './registro-inicial.component';

describe('RegistroInicialComponent', () => {
  let component: RegistroInicialComponent;
  let fixture: ComponentFixture<RegistroInicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroInicialComponent]
    });
    fixture = TestBed.createComponent(RegistroInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
