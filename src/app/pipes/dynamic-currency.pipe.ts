import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { LocaleService } from '../services/locale.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Pipe({
    name: 'dynamicCurrency',
    standalone: true,
    pure: false
})

export class DynamicCurrencyPipe implements PipeTransform {

    constructor(
        private currencyService: CurrencyService,
        private localeService: LocaleService
    ) {}

    transform(value: number, fromCurrency: string): Observable<string> {
        const toCurrency = this.localeService.getCurrency();

        if (!fromCurrency || !toCurrency || value == null) {
            return of(value?.toFixed(2) ?? '');
        }

        return this.currencyService.fetchRates(fromCurrency).pipe(
            map(() => {
                try {
                    const converted = this.currencyService.convert(value, fromCurrency, toCurrency);
                    return new Intl.NumberFormat(this.localeService.getLocale(), {
                        style: 'currency',
                        currency: toCurrency,
                    }).format(converted);
                } catch (e) {
                    console.warn('CURRENCY_CONVERSION_FAILED:', e);
                    return new Intl.NumberFormat(this.localeService.getLocale(), {
                        style: 'currency',
                        currency: fromCurrency,
                    }).format(value);
                }
            }),
            catchError(err => {
                console.error('CURRENCY_FETCH_FAILED:', err);
                return of(new Intl.NumberFormat(this.localeService.getLocale(), {
                    style: 'currency',
                    currency: fromCurrency,
                }).format(value));
            })
        );
    }
}
