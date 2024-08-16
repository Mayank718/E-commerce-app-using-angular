import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  constructor(private product:ProductService){}

  addProductMessage:string|undefined;

  submitProduct(data:Product){
    console.log(data);
    this.product.addProduct(data).subscribe((result) => {
      console.log(result)
      
      if(result){
        this.addProductMessage = "Product is successfully added"
      }
      setTimeout(() => this.addProductMessage=undefined,3000)
    });   
  }
}
