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
    "subservices": [
      {
        "id": 1,
        "name": "Páginas",
        "description": "Número de páginas",
        "price": 30
      },
      {
        "id": 2,
        "name": "Idiomas",
        "description": "Número de idiomas",
        "price": 30
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

    expect(component.isSelected()).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith({
      id: 3,
      checked: true,
      subservices: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    });
  });

  it('should emit updated subservice quantities when a selected service changes', () => {
    const emitSpy = vi.spyOn(component.serviceToggled, 'emit');

    component.isSelected.set(true);
    component.updateSubservice(1, 1);

    expect(emitSpy).toHaveBeenCalledWith({
      id: 3,
      checked: true,
      subservices: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ],
    });
  });

  it('should not emit when updating a subservice if the service is not selected', () => {
    const emitSpy = vi.spyOn(component.serviceToggled, 'emit');

    component.updateSubservice(1, 1);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  


});
