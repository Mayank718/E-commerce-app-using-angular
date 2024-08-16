import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
   
  constructor(private route:Router, private product:ProductService){}
  menuType:string = 'default';
  sellerName:string = '';
  userName:string = '';
  cartItems = 0;

  ngOnInit(): void {
      this.route.events.subscribe((val:any) => {
        
        if(val.url){
          // console.warn(val.url)
          if(localStorage.getItem('seller') && val.url.includes('seller')){
            // console.warn("In seller area")
            this.menuType='seller';
            if(localStorage.getItem('seller')){
              let sellerStore = localStorage.getItem('seller');
              let sellerData = sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName = sellerData.name;
            }
          }
          else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.product.getCartList(userData.id);
          }
          else{
            // console.warn("Outside seller")
            this.menuType='default'
          }
        }
      });

      let cartData = localStorage.getItem('localCart');
      if(cartData){
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((items)=>{
        this.cartItems=items.length;
      })
  }

  // This is seller logout
  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  // This is user logout
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }

  searchResult:undefined|Product[];
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log(result)
        if(result.length>5){
          result.length=5;
        }
        this.searchResult=result;
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  submitSearch(val:string){
    // console.log(val);
    this.route.navigate([`search/${val }`])
  }

  redirectDetail(id:number){
    this.route.navigate(['/details/'+id])
  }


}



