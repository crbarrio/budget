# Planificación y seguimiento de tareas

## BUDGET

### Pendiente
- Funcionalidad Buscar en listados.
- favicon

BACKEND:
- Desplegar base de datos mysql en docker
- Hacer diseño de base de datos y tablas
- Enlace con front

EXTRA:
- i18n aprovechando que la mayoría de textos ya están desacoplados
- Exportar presupuesto a PDF (html2canvas?)

---

## HECHO

- Maquetación hardcoded
- Separación en componentes:
  - card
  - servicio
  - subservicio
  - budget-form
  - budget-item
- Pasar datos de cada concepto con su precio en archivo separado
- Componente header
- Componente tarjeta que envuelve
- Lógica para mostrar subservicios
- Lógica para sumar importes
- Formulario:
   - Validador y estilos
- Modales para mostrar info sobre número de páginas y número de lenguajes
- Llamada para guardar presupuestos
- Llamada para traer presupuestos
    - Filtros
- Página dedicada a cada presupuesto (url propia) - details
- Textos a archivo
- Revisión Accesibilidad
