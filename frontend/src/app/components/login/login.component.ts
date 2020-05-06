import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = null;
  public form = {
    email: null,
    password: null
  };

  constructor( private Jarwis: JarwisService, 
               private token: TokenService, 
               private router: Router, 
               private auth: AuthService ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.Jarwis.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
  }

  handleError(error){
    this.error= error.error.errors;
  }

  handleResponse(data){
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

}
