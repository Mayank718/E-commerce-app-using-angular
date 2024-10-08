import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{

  cartData : undefined|Cart[];
  priceSummary : priceSummary = {
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}

  constructor(private product:ProductService, private router:Router){}

  ngOnInit(): void {
     this.loadDetails();
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId:undefined|number){
    cartId && this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      // console.log(result);
      this.cartData=result;
      let price = 0
      result.forEach((item) => {
        // price=price+(+item.price);
        if(item.quantity){
          price=price+(item.price* + item.quantity);
        }
      });
      // console.warn(price);
      this.priceSummary.price=price;
      this.priceSummary.discount=price/10;
      this.priceSummary.tax=price/10;
      this.priceSummary.delivery=100;
      this.priceSummary.total=price+(price/10)+100-(price/10);

      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
      console.log(this.priceSummary)
    });
  }
}
