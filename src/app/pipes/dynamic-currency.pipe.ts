
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dynamicCurrency',
    standalone: true
})
export class DynamicCurrencyPipe implements PipeTransform {
    transform(value: number, currency: string): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
            //minimumFractionDigits: 2,
        }).format(value);
    }
}
