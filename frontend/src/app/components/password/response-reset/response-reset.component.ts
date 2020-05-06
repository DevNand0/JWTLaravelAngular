import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];
  public form = {
    email:null,
    password:null,
    password_confirmation:null,
    reset_token:null
  };

  constructor(
    private route: ActivatedRoute,
    private jarwis: JarwisService,
    private router: Router,
    private notify: ToastrService
  ) 
  {
    this.route.queryParams.subscribe( params => {
        this.form.reset_token = params['token']
    });
    
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.jarwis.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data){
    let _router = this.router;
    this.notify.success('Done! ', 'Now Login with new Password',{timeOut: 2000});
    _router.navigateByUrl('/login');
  }

  handleError(error){
    this.notify.error(error.error.error);
  }
}
