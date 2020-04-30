import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Blogs } from '../models/blogs.model'
import { catchError, retry } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable({
    providedIn: 'root'
})

export class BlogsService{
    constructor(private http:HttpClient){

    }

    getBlogsList(): Observable<Blogs[]> {
        return this.http
          .get<Blogs[]>(`/api/blogs`)
          .pipe(catchError((error: any) => throwError(error.json())));
      }

    addNewBlogs(blogsData: Blogs): Observable<Blogs>{
        return this.http
               .post<Blogs>(`/api/blogs`, blogsData)
               .pipe(catchError((error: any) => throwError(error.json())));

    }
    updateBlogs(blogsData: Blogs): Observable<Blogs>  {
        return this.http
          .put<Blogs>(`/api/blogs/${blogsData.id}`, blogsData)
          .pipe(catchError((error: any) => throwError(error.json())));
      }
    

    getBlogsById(id:  number): Observable<Blogs>{
        return this.http
        .get<Blogs>(`/api/blogs/${id}`)
        .pipe(catchError((error: any) => throwError(error.json())));
    }
     // DELETE
     removeBlogs(payload: Blogs): Observable<Blogs> {
      return this.http
        .delete<any>(`/api/blogs/${payload.id}`)
        .pipe(catchError((error: any) => throwError(error.json())));
    }
}

