import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(
    private jarwis: JarwisService, 
    private notify: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.notify.info('Loading','wait..',{timeOut: 3000});

    this.jarwis.sendPasswordResetLink(this.form).subscribe(
      data=> this.handleResponse(data),
      error=> this.notify.error(error.error.error)
    );
  }


  handleResponse(data){
      this.notify.success("",data.data,{timeOut: 2000});
  }

}
