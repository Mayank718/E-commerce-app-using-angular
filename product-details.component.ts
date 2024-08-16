import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{

  removeCart = false;
  cartData: undefined | Product;
  constructor(private activeRoute: ActivatedRoute, private product:ProductService){}

  productData: undefined | Product;
  ngOnInit(): void {
      let productId = this.activeRoute.snapshot.paramMap.get('productId')
      console.log(productId);
      productId && this.product.getProduct(productId).subscribe((result) => {
        console.log(result); 
        this.productData=result;

        let cartData = localStorage.getItem('localCart');
        if(productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item:Product)=>productId=== item.id.toString());
          if(items.length){
            this.removeCart=true;
          }
          else{
            this.removeCart=false;
          }
        }
        let user = localStorage.getItem('user');
        if(user){
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result) => {
            let item = result.filter((item:Product)=>productId?.toString()===item.productId?.toString());
            if(item.length){
              this.cartData=item[0];
              this.removeCart=true;
            }
          })
        }
      })
  }

  productQuantity:number=1;
  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  addToCart(){
    // checking product quantity in console
    // also checking user is logged in or not
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      // here user is not logged in
      if(!localStorage.getItem('user')){
      // console.log(this.productData)  if user not logged in
      this.product.localAddToCart(this.productData);
      this.removeCart=true;
      }
      else{
        // console.log("User is logged in"); tells if user is logged in or not
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId); // tells userid which has logged in the db
        let cartData:Cart = {
          ...this.productData,
          userId,
          productId:this.productData.id,
        }
        delete cartData.id;
        // console.log(cartData); will get all cart cart
        this.product.addToCart(cartData).subscribe((result) => {
          if(result){
            // alert('Product is added to cart');
            this.product.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
    }
  }

  removeToCart(productId:number){
    if(!localStorage.getItem('user')){
     this.product.removeItemFromCart(productId);
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      // console.log(this.cartData); shows data in cart
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if(result){
          this.product.getCartList(userId)
        }
      })
      this.removeCart=false;
    }
  }
}
