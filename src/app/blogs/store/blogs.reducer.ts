import { Blogs } from '../models/blogs.model';
import { Action,createReducer, on, State } from '@ngrx/store';
import * as blogsAction from './blogs.action';
import { error } from '@angular/compiler/src/util';


export interface BlogsState{
    blogs: Blogs[];
    blog: Blogs;
    errors: any;
}

export const initialState: BlogsState = {
    blogs: [],
    errors: null,
    blog: null
};

const blogsReducer = createReducer(
    initialState,
    on(blogsAction.loadBlogsList, state => ({
        ...state,
        blogs: [],
        errors: null
    })),

    on(blogsAction.loadBlogsListSuccess, (state, {blogs}) =>({
        ...state,
        blogs: blogs,
        errors: null
    })),

    on(blogsAction.loadBlogsListFailed, (state, {errors}) =>({
        ...state,
        errors: errors
    })),

    on(blogsAction.createBlogs, state => ({
        ...state,
        errors: null
    })),
    on(blogsAction.createBlogsSuccess, (state, {blog}) =>({
        ...state,
        blogs: [...state.blogs, blog],
        errors: null
    })),
    on(blogsAction.createBlogsFailed, (state, {errors}) =>({
        ...state,
        errors: errors
    })),
    on(blogsAction.updateBlogs, state =>({
        ...state,
        errors: null
    })),
    on(blogsAction.updateBlogsSuccess, (state, {blog}) =>({
        ...state,
        errors:  null
    })),
    on(blogsAction.updateBlogsFailed, (state, {errors}) =>({
        ...state,
        errors: errors
    })),
    on(blogsAction.loadBlogs, state =>({
        ...state,
        blog: null,
        errors: null
    })),
    on(blogsAction.loadBlogsSuccess, (state, {blog}) =>({
        ...state,
        blog: blog,
        errors: null

    })),
    on(blogsAction.loadBlogsFailed, (state, {errors}) =>({
        ...state,
        errors: errors
    })),
    on(blogsAction.deleteBlogs, state =>({
        ...state,
        errors: null
    })),
    on(blogsAction.deleteBlogsSuccess, (state, {blog}) =>({
        ...state,
        errors:null
    })),
    on(blogsAction.deleteBlogsFailed, (state, {errors}) =>({
        ...state,
        errors: errors
    })),

);
export function blogReducer(state: BlogsState | undefined, action: Action) {
    return blogsReducer(state, action);
  }
  