import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroHeader } from './hero-header';

describe('HeroHeader', () => {
  let component: HeroHeader;
  let fixture: ComponentFixture<HeroHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroHeader);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heroHeaderText', 'Presupuesto digital');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
