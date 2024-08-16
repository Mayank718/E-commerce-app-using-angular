import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, Login} from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient, private route:Router) { }
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  isLoginError = new EventEmitter<boolean>(false)

  userSignUp(data:SignUp){
   this.http.post('http://localhost:3000/seller', data, {observe:"response"}).subscribe((result) =>{
    this.isSellerLoggedIn.next(true);
    this.route.navigate(['seller-home']);
    localStorage.setItem('seller', JSON.stringify(result.body));
    console.log("Result : ", result)
   });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
   }

   userLogin(data:Login){
    console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}
    ).subscribe((result:any) => {
      console.warn(result)
      if(result && result.body && result.body.length){
        console.warn("User logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.route.navigate(['seller-home']);
      }
      else{
        console.warn("Loggin failed");
        this.isLoginError.emit(true);
      }
    })
   }

}
