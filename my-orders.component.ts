import { Component, OnInit } from '@angular/core';
import { Order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  constructor(private product:ProductService){}

  orderData:undefined|Order[];
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result) => {
      this.orderData=result;
    })
  }
}
