import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from '../../models/blogs.model';
import { BlogsState, loadBlogsList, selectBlogsList, selectBlogErrors, deleteBlogs } from '../../store';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit {

  blogsList$: Observable<Blogs[]>;
  errors$: Observable<any>;

  constructor(private blogStore: Store<BlogsState>) { }

  ngOnInit(): void {
    this.blogStore.dispatch(loadBlogsList());

    //Get blog from store
    this.blogsList$ = this.blogStore.pipe(select(selectBlogsList));
    this.errors$ = this.blogStore.pipe(select(selectBlogErrors));
    
  }

  onRemove(blog: Blogs){
    const remove = window.confirm('Are you sure want to delete?');
    if(remove){
      this.blogStore.dispatch(deleteBlogs({blog: blog}));
      window.location.reload();
    }
  }

}
