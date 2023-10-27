import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HidricaComponent } from './hidrica.component';

describe('HidricaComponent', () => {
  let component: HidricaComponent;
  let fixture: ComponentFixture<HidricaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HidricaComponent]
    });
    fixture = TestBed.createComponent(HidricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
