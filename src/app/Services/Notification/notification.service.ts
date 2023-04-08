import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.notifications.push({ textOrTpl, ...options });
  }

  remove(notifications: any) {
    this.notifications = this.notifications.filter(t => t !== notifications);
  }

  clear() {
    this.notifications.splice(0, this.notifications.length);
  }

  

}
