import { Component, OnInit } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  constructor(private user:UserService, private product:ProductService){}

  signUp(data:SignUp){
    //  console.log(data);
    this.user.userSignUp(data)
  }

  ngOnInit(): void {
      this.user.userAuthReload();
  }

  authError:string=""
  login(data:Login){
    // console.log(data)
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      console.log("Result is invalid? :", result)
      if(result){
        this.authError="Please enter valid user details"
      }
      else{
        setTimeout(() => {
        this.localCartToRemoteCart();
      }, 300);
       }
    })
  }
  // login(val: Login) {
  //   this.user.userLogin(val);
  //   this.user.invalidUserAuth.subscribe((isError) => {
  //     if(isError) {
  //       this.authError = "Email And Password Doesn't Match"
  //     }else {
  //       setTimeout(() => {
  //         this.localCartToRemoteCart();
  //       }, 300);
  //     }
  //   })
  // }

  showLogin:boolean=true;

  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:Product[] = JSON.parse(data); 
      cartDataList.forEach((product:Product, index) => {
        let cartData:Cart = {
          ...product,
          productId:product.id,
          userId,
        };
        //  console.log(userId)
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if(result){
              console.log("Item stored in DB");
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000); //3 sec baad cart mai no. update hoga
  }
}
