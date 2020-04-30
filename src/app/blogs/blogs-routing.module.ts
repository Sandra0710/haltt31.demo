import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsListComponent, BlogsDetailComponent } from './containers';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blogs-list'
  },
  {
    path: 'blogs-list',
    component: BlogsListComponent
  },
  {
    path: 'create',
    component: BlogsDetailComponent
  },
  
  {
    path: ':blogsId',
    component: BlogsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
