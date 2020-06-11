import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ tap} from'rxjs/operators';
import{ EnvProvider} from'../env/env';
import { Product } from '../../models/product/product-model';
import{ FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';

@Injectable()
export class ProductProvider {

  constructor(public http: HttpClient, private env: EnvProvider, private fileTransfer: FileTransfer) {
    
  }

  getAllPublicProduct(page:number){
    return this.http.get(this.env.API_URL + 'public/product?page='+page).pipe(
      tap(message=>{return message;
      }),
    );
  }

  uploadImage(fileName, fileUri,id) {
    const fileTransfer: FileTransferObject= this.fileTransfer.create();
    let options: FileUploadOptions= {
      fileKey:'image',
      fileName:fileName,
      chunkedMode:false,
      mimeType:"image/jpeg",
      headers:{
        'Authorization':'Bearer '+ 
        JSON.parse(localStorage.getItem('user')).token,
        'Accept':'application/json'}
      }
      return fileTransfer.upload(fileUri, 
        this.env.API_URL+'product/upload/'+id, options).then((data) =>{
          console.log(data+ " Uploaded Successfully");
        }, 
        (err) =>{console.log(err);
        });
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
