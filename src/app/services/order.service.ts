import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  product: number; // Produkt-ID
  quantity: number;
}

export interface OrderPayload {
  customer_name: string;
  customer_email: string;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl = 'http://localhost:8000/orders/'; // ggf. anpassen

  constructor(private http: HttpClient) {}

  submitOrder(order: OrderPayload): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

}
