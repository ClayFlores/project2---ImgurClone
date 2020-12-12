import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   email: string = '';
   password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const request = {
      email: this.email,
      password: this.password
    };

    console.log(request);
    this.http.post('http://localhost:8080/project2-server/users/createUser', request)
      .subscribe(response => {
        this.router.navigate(['/login']);
      },
        error => console.log('Error during account sign up'));
  }
}
