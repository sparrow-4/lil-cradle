import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getImageUrl(path: string): string {
    if (!path) return '/images/p1.jpg';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) {
      // If production and path is relative, prepend the API base (without /api suffix)
      if (environment.production) {
        const base = environment.apiUrl.replace('/api', '');
        return `${base}${path}`;
      }
      return path;
    }
    return path;
  }

  // ── PRODUCTS ──
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/products`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.api}/products`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.api}/products/${id}`, product);
  }

  bulkUpdateProducts(products: any[]): Observable<any[]> {
    return this.http.put<any[]>(`${this.api}/products`, products);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/products/${id}`);
  }

  uploadProductImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(`${this.api}/products/${id}/image`, formData);
  }

  // ── SITE CONTENT ──
  getSiteContent(): Observable<any> {
    return this.http.get<any>(`${this.api}/site-content`);
  }

  updateSiteContent(content: any): Observable<any> {
    return this.http.put<any>(`${this.api}/site-content`, content);
  }

  updateCompanyInfo(info: any): Observable<any> {
    return this.http.put<any>(`${this.api}/site-content/company-info`, info);
  }

  updateBanners(banners: any[]): Observable<any> {
    return this.http.put<any>(`${this.api}/site-content/banners`, banners);
  }

  updateCategories(categories: any[]): Observable<any> {
    return this.http.put<any>(`${this.api}/site-content/categories`, categories);
  }

  updatePromoBanners(promos: any[]): Observable<any> {
    return this.http.put<any>(`${this.api}/site-content/promos`, promos);
  }

  uploadSiteImage(section: string, index: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<any>(`${this.api}/site-content/upload/${section}/${index}`, formData);
  }

  // ── ORDERS ──
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/orders`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.api}/orders`, order);
  }

  updateOrderStatus(id: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.api}/orders/${id}/status`, { status });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/orders/${id}`);
  }
}
