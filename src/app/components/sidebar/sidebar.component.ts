import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private translate: TranslateService) {}

  close() {
    this.closed.emit();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.close();
  }

}
