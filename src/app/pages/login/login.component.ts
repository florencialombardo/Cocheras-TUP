import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  authService = inject(DataAuthService);

  

  router = inject(Router);

  
  

  errorLogin = false;
  async login(loginForm: NgForm){

    const {username, password} = loginForm.value;
    const loginData: Login = {username, password};

    const res = await this.authService.login(loginData);
    
    if(res?.status === "ok") this.router.navigate(['/estado-cocheras']);
    else this.errorLogin = true;
    

  }

}
