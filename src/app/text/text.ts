import { ServiceElement } from '../interfaces/service.interface';


export const commonText = {
    navbar: {
        siteName: 'Frontender IT Academy'
    }
} as const;

export const homePageText = {
    heroHeader: 'Consigue la mejor calidad'
} as const;

export const servicesPageText = {
    addServiceCheckbox: 'Añadir',
    addSubserviceButton: 'Disminuir cantidad',
    decreaseSubserviceButton: 'Disminuir cantidad',
    budgetTotalLabel: 'Precio presupuestado',
    budgetformHeader: 'Solicitar presupuesto',
    budgetListHeader: 'Presupuestos en curso:',
    budgetListEmpty: 'No hay presupuestos en curso.',
    budgetForm: {
        name: 'Nombre',
        email: 'Email',
        telephone: 'Telephone',
        submitButton: 'Solicitar presupuesto →'
    }

} as const;

export const services: ServiceElement[] = [
    {
        id: 1,
        name: "Seo",
        description: "Optimización de motores de búsqueda para mejorar la visibilidad en línea",
        price: 300
    },
    {
        id: 2,
        name: "Ads",
        description: "Publicidad en línea para aumentar la visibilidad y las conversiones",
        price: 400
    },
    {
        id: 3,
        name: "Web",
        description: "Desarrollo de sitios web completos y responsivos ",
        price: 500,
        subservices: [
            {
                id: 1,
                name: "Numero de Páginas",
                description: "Añade el número de páginas que deseas para tu sitio web. Cada página adicional tiene un costo de 30€.",
                price: 30
            },
            {
                id: 2,
                name: "Numero de Idiomas",
                description: " Añade el número de idiomas que deseas para tu sitio web. Cada idioma adicional tiene un costo de 30€.",
                price: 30
            }
        ]
    }
]

export const modalAlertContent = {
  budgetSavedSuccess: {
    variant: 'success',
    title: 'Presupuesto enviado',
    message: 'Presupuesto guardado correctamente. Nos pondremos en contacto contigo pronto.',
  },
  budgetSavedError: {
    variant: 'error',
    title: 'Error al guardar',
    message: 'Se ha producido un error al guardar tu presupuesto. Por favor, inténtalo de nuevo más tarde.',
  },
  noServicesSelected: {
    variant: 'error',
    title: 'No hay servicios seleccionados',
    message: 'Por favor, selecciona al menos un servicio para generar el presupuesto.',
  }
} as const;



