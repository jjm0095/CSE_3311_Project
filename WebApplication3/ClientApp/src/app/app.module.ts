import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ToDoComponent } from './todo/todo.component';
import { MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatDialogModule, MatSlider } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatDividerModule } from '@angular/material'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakComponent } from './break/break.component'
import { BreatheComponent } from './breathe/breathe.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FeedbackComponent } from './feedback/feedback.component';
import { SoundComponent } from './sound/sound.component';
import { MatSliderModule } from '@angular/material';
//Import for all app components including angular components
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    ToDoComponent,
    BreakComponent,
    BreatheComponent,
    FeedbackComponent,
    SoundComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LoginComponent },
      { path: 'todo', component: ToDoComponent },
      { path: 'break', component: BreakComponent },
      { path: 'breathe', component: BreatheComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'sound', component: SoundComponent }
    ]),
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
