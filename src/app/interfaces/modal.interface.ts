export interface ModalData {
  variant: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  confirmText?: string;
}