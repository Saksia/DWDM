import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {
    categoryId: Number = -1;

    getCategoryId(){
        return this.categoryId;
    }

    setCategoryId(categoryId: Number){
        this.categoryId = categoryId;
    }
}