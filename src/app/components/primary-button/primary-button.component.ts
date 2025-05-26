import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css'
})
export class PrimaryButtonComponent {
  label = input<string>('');
  disabled = input<boolean>(false);

  btnClicked = output<void>();

  handleClick() {
    if (!this.disabled) {
      this.btnClicked.emit();
    }
  }
}
