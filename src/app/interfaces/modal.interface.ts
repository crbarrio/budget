export interface ModalAlertData {
  variant: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  confirmText?: string;
}