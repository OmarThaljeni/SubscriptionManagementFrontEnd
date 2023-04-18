import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/Services/Notification/toast.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.css']
})
export class ToastsContainerComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }


  
}
