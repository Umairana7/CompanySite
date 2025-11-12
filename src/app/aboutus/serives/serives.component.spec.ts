import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerivesComponent } from './serives.component';

describe('SerivesComponent', () => {
  let component: SerivesComponent;
  let fixture: ComponentFixture<SerivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerivesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
