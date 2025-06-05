import { Component, signal, inject } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from '../../pages/products-list/product-card/product-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgFor, ProductCardComponent, TranslateModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  private translate = inject(TranslateService);

  products = signal<Product[]>([]);
  currency = signal('USD');

  constructor() {
    this.translate.onLangChange.subscribe(() => {
      this.ngOnInit();
    })
  }

  async ngOnInit() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();

    const res = await fetch('http://127.0.0.1:8000/products/?format=json', {
      headers: {
        'Accept-Language': lang
      }
    });
    
    const data = await res.json();

    const parsed = data.map((product: any) => ({
      ...product,
      price: parseFloat(product.price),
    }));

    this.products.set(parsed);
  }
}
