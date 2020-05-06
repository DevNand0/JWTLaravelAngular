import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name:null,
    email:null,
    password:null,
    password_confirmation:null
  };
  public error = [];

  constructor(private Jarwis: JarwisService, private token: TokenService, private router: Router) { }
  
  ngOnInit(): void {}

  onSubmit(){
    
    
    this.Jarwis.signUp(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error){
    this.error= error.error.errors;
  }

  handleResponse(data){
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
