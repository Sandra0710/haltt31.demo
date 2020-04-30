import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogsRoutingModule } from './blogs-routing.module';

import * as fromContainer from './containers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {BlogsEffects, blogReducer} from './store';
import { BlogsService } from './services/blogs.services';

@NgModule({
  declarations: [
    ...fromContainer.containers
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BlogsRoutingModule,

    StoreModule.forFeature('blogs', blogReducer),
    EffectsModule.forFeature([BlogsEffects]),
  ],
  providers: [
    BlogsService
  ]
})
export class BlogsModule { }
