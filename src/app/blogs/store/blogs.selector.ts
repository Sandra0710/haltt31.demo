import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogsState } from './blogs.reducer';

export const getBlogsState = createFeatureSelector<BlogsState>(
    'blogs',
);

export const selectBlogsList = createSelector(
    getBlogsState,
    state => state.blogs
);

export const selectBlog = createSelector(
    getBlogsState,
    state =>state.blog
)

export const selectBlogErrors = createSelector(
    getBlogsState,
    state => state.errors
)