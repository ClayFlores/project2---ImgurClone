import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project2';
  userId:string|null = null;

  ngOnInit(){
   this.userId = localStorage.getItem('userId')
  }

  loginResponse():void{
    console.log('app component caught onLogin')
    this.userId = localStorage.getItem('userId')
  }
  logoutResponse():void{
    console.log('app component caught onLogout');
    this.userId = localStorage.getItem('userId');
  }
}
