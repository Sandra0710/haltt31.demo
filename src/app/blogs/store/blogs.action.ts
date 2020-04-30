import { createAction, props } from '@ngrx/store';
import { Blogs } from '../models/blogs.model';


export const loadBlogsList = createAction(
    '[Blogs list page] Load Blogs List'
);

export const loadBlogsListSuccess = createAction(
    '[Blogs list API] load blogs list success',
    props<{blogs: Blogs[] }>()
);

export const loadBlogsListFailed = createAction(
    '[Blogs list API] load blogs list failed',
    props<{errors: any}>()
);

export const loadBlogs = createAction(
    '[blogs page] Load blogs',
    props<{id: number}>()
);

export const loadBlogsSuccess = createAction(
    '[blogs page] Load blogs success',
    props<{blog: Blogs}>()
);


export const loadBlogsFailed = createAction(
    '[blogs page] Load blogs failed',
    props<{errors: any}>()
);

/***************Create blogs**************/ 

export const createBlogs = createAction(
    '[CreateBlogs page] Create Blogs',
    props<{blogs: Blogs}>()
);

export const createBlogsSuccess = createAction(
    '[Create Api] Create Blogs Success',
    props<{blog: Blogs}>()
);

export const createBlogsFailed = createAction(
    '[Create Api] Create Blogs Failed',
    props<{errors: any}>()
);

export const updateBlogs = createAction(
    '[UpdateBlogs page] Update blogs',
    props<{blog: Blogs}>()
);

export const updateBlogsSuccess = createAction(
    '[Blogs API] Update Blogs Success',
    props<{blog: Blogs}>()
);

export const updateBlogsFailed = createAction(
    '[Blogs API] Update Blogs Failed',
    props<{errors: any}>()
);

export const deleteBlogs = createAction(
    '[blogs page] Delete blogs',
    props<{blog: Blogs}>()
);

export const deleteBlogsSuccess = createAction(
    '[blogs page] Delete blogs success',
    props<{blog: Blogs}>()
);


export const deleteBlogsFailed = createAction(
    '[blogs page] Delete blogs failed',
    props<{errors: any}>()
);