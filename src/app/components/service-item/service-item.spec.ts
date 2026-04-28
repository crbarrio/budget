import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceItem } from './service-item';
import { ServiceElement } from '../../interfaces/service.interface';

describe('ServiceItem', () => {
  let component: ServiceItem;
  let fixture: ComponentFixture<ServiceItem>;

  const mockService: ServiceElement = {
    "id": 3,
    "name": "Web",
    "description": "Desarrollo de sitios web completos y responsivos ",
    "price": 500,
    "initialQuantity": 1,
    "subservices": [
      {
        "id": 1,
        "name": "Páginas",
        "description": "Número de páginas",
        "price": 30,
        "initialQuantity": 1
      },
      {
        "id": 2,
        "name": "Idiomas",
        "description": "Número de idiomas",
        "price": 30,
        "initialQuantity": 1
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('service', mockService);
    fixture.componentRef.setInput('checked', false);
    fixture.componentRef.setInput('subserviceQuantities', {});
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the service name and price', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Web');
    expect(element.textContent).toContain('Desarrollo de sitios web completos y responsivos');
    expect(element.textContent).toContain('500');

    
  });

  it('should emit serviceToggled with default subservice quantities when checked', () => {
    const emitSpy = vi.spyOn(component.serviceToggled, 'emit');

    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith({
      id: 3,
      checked: true,
    });
  });

  it('should emit subservice quantity changes when the service is selected', () => {
    const emitSpy = vi.spyOn(component.subserviceQuantityChanged, 'emit');

    fixture.componentRef.setInput('checked', true);
    component.updateSubservice(1, 1);

    expect(emitSpy).toHaveBeenCalledWith({
      serviceId: 3,
      subserviceId: 1,
      change: 1,
    });
  });

  it('should not emit when updating a subservice if the service is not selected', () => {
    const emitSpy = vi.spyOn(component.subserviceQuantityChanged, 'emit');

    component.updateSubservice(1, 1);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should render checked state and subservice quantities from inputs', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.componentRef.setInput('subserviceQuantities', { 1: 3, 2: 2 });
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const checkbox = element.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const quantityInputs = Array.from(element.querySelectorAll('input[readonly]')) as HTMLInputElement[];

    expect(quantityInputs.map((input) => input.value)).toEqual(['3', '2']);
    expect(checkbox.checked).toBe(true);
  });

  


});
