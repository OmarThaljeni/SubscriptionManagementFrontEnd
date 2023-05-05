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
    this.show('Opération failed !', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }



  showSuccess() {
    this.show('Opération réussi !', {
      classname: 'bg-success text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


  showCannotAdd() {
    this.show('Opération echoué vous avez atteint le nombre maximum des services!', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showCannotDelete() {
    this.show('Opération echoué tu peux pas supprimer cette abonnement ', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showCannotAddService() {
    this.show('Opération echoué vous étes déja abonnée a ce service ', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


  showCannotDeleteCustomer() {
    this.show('Opération echoué tu peux pas supprimer ce client car il posséde des abonnements', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showCannotAcceptCustomer() {
    this.show('Opération echoué ce client déja est accepté', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


  showCannotOpenListSubscription() {
    this.show('Opération echoué ce client ne posséde pas aucune abonnement', {
      classname: 'bg-warning text-light', delay: 3000, autohide: true, horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }


}
