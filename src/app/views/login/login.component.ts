import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.class';
import { ApiCallsService } from 'src/app/services/api-calls.service';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  //form!: FormGroup;
    loading = false;
    submitted = false;
    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private api: ApiCallsService,
  ) { }

  ngOnInit() {
      /*this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });*/
  }

  // convenience getter for easy access to form fields
  //get f() { return this.form.controls; }

  onSubmit(username: string, password: string) {
      this.submitted = true;
      let credentials = new Login(username, password);
      this.auth.login(credentials).then((user:any)=>{
        
        console.log(user.user.accessToken);
        this.api.getUserinfo(user.user.accessToken).subscribe((data)=>{
          console.log(data);
          this.router.navigateByUrl('index');
        });
      });


      this.loading = true;
      
  }

}
