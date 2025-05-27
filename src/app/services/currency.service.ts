
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private exchangeRates: Record<string, number> = {};
  private ratesLoadedForBase: string | null = null;
  private ratesObservableCache: { [base: string]: Observable<Record<string, number>> } = {};

  constructor(private http: HttpClient) {}

  fetchRates(base: string = 'USD'): Observable<Record<string, number>> {
    if (this.ratesLoadedForBase === base && Object.keys(this.exchangeRates).length > 0) {
      return of(this.exchangeRates);
    }

    if (!this.ratesObservableCache[base]) {
      this.ratesObservableCache[base] = this.http.get(`https://open.er-api.com/v6/latest/${base}`).pipe(
        map((data: any) => {
          if (!data || !data.rates) {
            throw new Error('EXCHANGE_RATES_RESPONSE_INVALID');
          }
          this.exchangeRates = data.rates;
          this.ratesLoadedForBase = base;
          return this.exchangeRates;
        }),
        shareReplay(1)
      );
    }

    return this.ratesObservableCache[base];
  }

  convert(amount: number, base: string, target: string): number {
    if (!this.exchangeRates || Object.keys(this.exchangeRates).length === 0) {
      throw new Error('EXCHANGE_RATES_NOT_LOADED');
    }

    const rate = this.exchangeRates[target];
    if (!rate) {
      throw new Error('EXCHANGE_RATE_NOT_FOUND');
    }

    return amount * rate;
  }
}
