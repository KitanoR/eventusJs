import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipandoComponent } from './participando.component';

describe('ParticipandoComponent', () => {
  let component: ParticipandoComponent;
  let fixture: ComponentFixture<ParticipandoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipandoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
