import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showWarning() {
    this.show('Opération failed !', { classname: 'bg-warning text-light', delay: 3000 ,autohide: true,horizontalPosition: 'right',
    verticalPosition: 'top'
});
  }



  showSuccess() {
    this.show('Opération réussi !', { classname: 'bg-success text-light', delay: 3000 ,autohide: true,horizontalPosition: 'right',
    verticalPosition: 'top'
});
  }


}
