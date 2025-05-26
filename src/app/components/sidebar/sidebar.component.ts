import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
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
