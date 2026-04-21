import { ComponentFixture, TestBed } from '@angular/core/testing';


import { SubserviceItem } from './subservice-item';
import { ServiceElement } from '../../../interfaces/service.interface';

describe('SubserviceItem', () => {
  let component: SubserviceItem;
  let fixture: ComponentFixture<SubserviceItem>;

  const mockSubservice: ServiceElement = {
    id: 1,
    name: 'Páginas',
    description: 'Número de páginas',
    price: 30,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubserviceItem],
    }).compileComponents();

    fixture = TestBed.createComponent(SubserviceItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subservice', mockSubservice);
    fixture.componentRef.setInput('quantity', 2);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit -1 when clicking the decrease button', () => {
    const emitSpy = vi.spyOn(component.quantityChanged, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();

    expect(emitSpy).toHaveBeenCalledWith(-1);
  });

  it('should emit 1 when clicking the increase button', () => {
    const emitSpy = vi.spyOn(component.quantityChanged, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();

    expect(emitSpy).toHaveBeenCalledWith(1);
  });

  it('should render the subservice name and quantity', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Páginas');

    const input = element.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2');
  });


});
