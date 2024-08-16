import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError: any;

  constructor(private http:HttpClient, private route:Router) { }

  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/users", user, {observe:'response'}).subscribe((result) => {
      console.log(result);
      if(result){
        localStorage.setItem('user', JSON.stringify(result.body));
        this.route.navigate(['/']);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.route.navigate(['/'])
    }
  }

  invalidUserAuth = new EventEmitter<boolean>(false);
  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, 
    {observe:'response'}).subscribe((result) =>{
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.route.navigate(['/']);
      }
      else{
        this.invalidUserAuth.emit(true);
      }
    })

  }
}
