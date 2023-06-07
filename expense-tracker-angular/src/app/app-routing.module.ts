import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { DashComponent } from './views/dash/dash.component';
import { ExpensesByCategoryComponent } from './components/charts/expenses-by-category/expenses-by-category';

const routes: Routes = [
  {path: "dashboard", component: DashComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
  {path: "test", component: ExpensesByCategoryComponent},
  // Catch-all
  {path: "**", redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
