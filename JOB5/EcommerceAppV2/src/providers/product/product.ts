import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ tap} from'rxjs/operators';
import{ EnvProvider} from'../env/env';
import { Product } from '../../models/product/product-model';

@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, private env: EnvProvider) {
    
  }

  getAllPublicProduct(page:number){
    return this.http.get(this.env.API_URL + 'public/product?page='+page).pipe(
      tap(message=>{return message;
      }),
    );
  }

  getAllUserProduct(){
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+ JSON.parse(
        localStorage.getItem('user')).token,
      'Accept':'application/json'});

      return this.http.get(this.env.API_URL+'product',
      {headers:headers}).pipe(tap(response=>{
        return response;
      }),
    );
  }

  deleteProduct(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(
        localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    return this.http.delete(this.env.API_URL + 'product/' + id, { 
      headers: headers }).pipe(
        tap(response => {
          return response;
        }),
      );
    }

  getSelectedProduct(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(
        localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    return this.http.get(this.env.API_URL + 'product/' + id, { 
      headers: headers }).pipe(
        tap(response => {
          return response;
        }),
      );
    }

  saveProduct(product: Product) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(
        localStorage.getItem('user')).token,
      'Accept': 'application/json'
    });
    return this.http.post(this.env.API_URL +'product', product, { 
      headers: headers }).pipe(
        tap(response => {
          return response;
        }),
      );
    }

  updateProduct(product: Product) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(
        localStorage.getItem('user')).token,
        'Accept': 'application/json'
      });
      return this.http.post(this.env.API_URL + 'product/' + product.id, product, { 
        headers: headers }).pipe(tap(
          response => {
            return response;
          }),
        );
      }

  getCategoryProduct(){
    const headers= new HttpHeaders({
      'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('user')).token,
      'Accept':'application/json'});

      return this.http.get(this.env.API_URL+'category', 
      {headers:headers}).pipe(tap(response=>{return response;
      }),
    );
  }

  searchProduct(key:string){
    return this.http.get(this.env.API_URL+ 'public/product/search?name='+ key).pipe(
      tap(response => {return response;
    })
  );
}

}
