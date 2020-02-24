import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProdListComponent } from './category-prod-list.component';

describe('CategoryProdListComponent', () => {
  let component: CategoryProdListComponent;
  let fixture: ComponentFixture<CategoryProdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryProdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryProdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
