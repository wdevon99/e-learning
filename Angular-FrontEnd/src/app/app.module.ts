import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

//All Components
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/common/navbar/navbar.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ProfileComponent } from '../app/components/profile/profile.component'
//Page Components
import { HomePageComponent } from '../app/pages/home-page/home-page.component';
import { StudentDashboardPageComponent } from '../app/pages/student-dashboard-page/student-dashboard-page.component';

//All Services
import { AuthService }  from "../app/services/auth.service";
import { AuthGuard  }  from "../app/services/auth.gaurd";


//defining the routes of the app
const applicationRoutes:Routes =[
  {path : 'login' ,component :LoginComponent},
  {path : 'register' ,component :RegisterComponent},
  {path : 'profile' ,component :ProfileComponent , canActivate: [AuthGuard]},
  {path : 'unauthorized', component: LoginComponent },
  {path : '', component: HomePageComponent }
  
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomePageComponent,
    StudentDashboardPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(applicationRoutes),
    FlashMessagesModule
    
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
