import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class LocaleService {
  private languageToCurrencyMap: Record<string, string> = {
    'en': 'USD',
    'de': 'EUR',
  };

  private translate = inject(TranslateService);

  getCurrency(): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return this.languageToCurrencyMap[lang] || 'USD';
  }

  getLocale(): string {
    return this.translate.currentLang || 'en';
  }

  
  getCurrencyForLanguage(lang: string): string {
    return this.languageToCurrencyMap[lang] || 'USD';
  }

}

