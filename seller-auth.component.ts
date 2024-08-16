import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Route, Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  authError:string = '';

  constructor(private seller:SellerService, private router:Router){}

  signUp(data:SignUp):void { 
    // this.seller.userSignUp(data).subscribe((result) => {
    //   if(result){
    //     this.router.navigate(['seller-home'])
    //   }
    // })
    console.warn("data");
    this.seller.userSignUp(data)
  }

  login(data:SignUp):void { 
    this.authError=''
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      this.authError = 'Email or password is incorrect'
    })
    // console.warn(data);
  }

  ngOnInit():void{
    this.seller.reloadSeller()
  }

  showLogin = false;
  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
