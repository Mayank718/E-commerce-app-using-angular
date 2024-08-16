import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, Order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  constructor(private product:ProductService, private router:Router){}

  totalPrice:undefined|number;
  cartData:undefined|Cart[];
  orderMsg:undefined|string;

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData=result;
      let price = 0
      result.forEach((item) => {
        // price=price+(+item.price);
        if(item.quantity){
          price=price+(item.price* + item.quantity);
        }
      })
      this.totalPrice=price+(price/10)+100-(price/10);
      console.log(this.totalPrice);
    })
  }

  orderNow(data:{email:string, address:string, contact:string}){
    // console.log(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
     let orderData:Order= {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item) => {
       setTimeout(() => {
        item.id && this.product.deleteCartItems(item.id)
       }, 6000);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if(result){
          // alert("Order Confirmed")
          this.orderMsg="Your Order has been placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg=undefined;
          }, 3000);
        }
      })
    }
  }

}
