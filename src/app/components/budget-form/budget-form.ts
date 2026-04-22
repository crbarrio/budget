import { Component, output, signal,  } from '@angular/core';
import { email, form, FormField, required, submit, validate } from '@angular/forms/signals';
import { BudgetFormData } from '../../interfaces/budget-form.interface';



@Component({
  selector: 'app-budget-form',
  imports: [FormField],
  templateUrl: './budget-form.html',
})
export class BudgetForm {

  budgetModel = signal<BudgetFormData>({
    name: '',
    telephone: '',
    email: ''
  })

  formSubmited = output<BudgetFormData>();

  budgetForm = form(this.budgetModel, (path) => {
    required(path.name, {message: 'El nombre es requerido.'});
    required(path.telephone, {message: 'El teléfono es requerido.'});
    required(path.email, {message: 'El email es requerido.'});
    email(path.email, {message:'El formato de email no es válido.'})

    // validacion personalizada
    validate(path.telephone, ({value}) => {
      const spainPhoneRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
      const isValid = spainPhoneRegex.test(value());
      if (!isValid) {
        return {
          message: 'No es un telefono español válido',
          kind: 'error'
        }
      }
      return null;
    })
  });

  isFieldInvalid(fieldName: keyof BudgetFormData): boolean {
    const fieldSignal = this.budgetForm[fieldName];
    if (!fieldSignal) return false;
    
    const field = fieldSignal();  
    return field && field.touched() && field.errors().length > 0;
  }
  
  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.budgetForm, async () => {
      this.formSubmited.emit(this.budgetModel());      
    });

  }

  // Reset formulario, actualmente no implementado
  onReset() {
    this.budgetModel.set({
      name: '',
      telephone: '',
      email: ''
    })

    this.budgetForm().reset();
  }
}
