import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as blogsAction from './blogs.action'
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { BlogsService } from '../services/blogs.services';
import { of } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class BlogsEffects{
    constructor(
        private action$: Actions,
        private router: Router,
        private blogsService: BlogsService
    ){

    }

    loadBlogsList$ = createEffect(() =>
    this.action$.pipe(
        ofType(blogsAction.loadBlogsList),
        exhaustMap(() =>
        this.blogsService.getBlogsList().pipe(
            map(res => blogsAction.loadBlogsListSuccess({blogs: res})),
            catchError(error => of(blogsAction.loadBlogsListFailed({errors: error})))
        )
        )
    ) 
    );

    loadBlogs$ = createEffect(() =>
    this.action$.pipe(
        ofType(blogsAction.loadBlogs),
        exhaustMap((action) =>
        this.blogsService.getBlogsById(action.id).pipe(
            map(res => blogsAction.loadBlogsSuccess({blog: res})),
            catchError(error => of(blogsAction.loadBlogsFailed({errors: error})))
        )
        )
    ) 
    );

    createBlogs$ = createEffect(()=>
    this.action$.pipe(
        ofType(blogsAction.createBlogs),
        exhaustMap(action=>
        this.blogsService.addNewBlogs(action.blogs).pipe(
            map(res => {
                return blogsAction.createBlogsSuccess({blog: res})
            }),
            catchError(error => of(blogsAction.createBlogsFailed({errors:error})))
        ))
    )
    )


    createBlogsSuccess$ = createEffect(()=>
    this.action$.pipe(
        ofType(blogsAction.createBlogsSuccess),
        tap((res) => {
            this.router.navigate(['/blogs']);
        })
    ),
    {
        dispatch: false
    }
    )

    updateBlogs$ = createEffect(() => 
    this.action$.pipe(
        ofType(blogsAction.updateBlogs),
        exhaustMap(action =>
            this.blogsService.updateBlogs(action.blog).pipe(
                map(res =>{
                    return blogsAction.updateBlogsSuccess({blog: res})
                }),
                catchError(error => of(blogsAction.updateBlogsFailed({errors: error})))
            ))
    )
    );

    updateBlogsSucs$ = createEffect(
        () =>
        this.action$.pipe(
            ofType(blogsAction.updateBlogsSuccess),
            tap((res) => {
                this.router.navigate(['/blogs']);
            })
        ),
        {
            dispatch: false
        }
    )

    deleteBlogs$ = createEffect(
        () =>
        this.action$.pipe(
            ofType(blogsAction.deleteBlogs),
            exhaustMap(action => 
                this.blogsService.removeBlogs(action.blog).pipe(
                    map(res =>{
                        return blogsAction.deleteBlogsSuccess({blog: res})
                    }),
                    catchError(error => of(blogsAction.deleteBlogsFailed({errors: error})))
      
                ))
        )
    )

    deleteBlogsSuccess$ = createEffect(
        () =>
        this.action$.pipe(
            ofType(blogsAction.deleteBlogsSuccess),
            tap((res) => {
                this.router.navigate(['/blogs']);
            })
        ),
        {
            dispatch: false
        }
    )
}