import { Component, OnInit } from '@angular/core';
import { Blogs } from '../../models/blogs.model';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsState, createBlogs, updateBlogs, loadBlogs, selectBlog } from '../../store';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.css']
})
export class BlogsDetailComponent implements OnInit {

  blogs$: Observable<Blogs>;
  checkExist: boolean;
  private unsubcribe$ = new Subject<void>();
  submitted = false;

  blogsForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl(''),
    des: new FormControl('')
  })
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogsStore: Store<BlogsState>
  ) { }

  ngOnInit(): void {
   
    const id: any = this.route.snapshot.paramMap.get('blogsId');
    if(id) {
      this.checkExist = true;
      this.blogsStore.dispatch(loadBlogs({id: id}));
      
      this.blogs$ = this.blogsStore.pipe(select(selectBlog));

      this.blogs$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if(res) {
          this.blogsForm.patchValue(res);
        }
      });
    } else {
      this.checkExist = false;
    }

    this.onValidate();
  }
  onSave(form: FormGroup){
  
    if(this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }

    this.submitted = true;
    if (this.blogsForm.invalid) {
      return;
    }
  }
    // convenience getter for easy access to form fields
    get f() { return this.blogsForm.controls; }

  onCreate(form: FormGroup){
    const {value} = form;
    this.blogsStore.dispatch(createBlogs({blogs: value}));
  }

  onUpdate(form: FormGroup){
    const {value} = form;
    this.blogsStore.dispatch(updateBlogs({blog: value}));
  }
  onValidate(){
    this.blogsForm = this.formBuilder.group({
      name: ['', Validators.required],
      des:  ['', Validators.required]
    })
  }

    ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  

}
