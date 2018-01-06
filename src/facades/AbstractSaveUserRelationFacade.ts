import { Injectable } from "@angular/core";
import { AbstractFacade } from "./AbstractFacade";
import { SaveUserRelation } from "../entities/SaveUserRelation";

@Injectable()
export abstract class AbstractSaveUserRelationFacade extends AbstractFacade{
    
    public abstract create(saveUserRelation:SaveUserRelation);

    public abstract remove(saveUserRelation:SaveUserRelation);

    public abstract find(saveUserRelation:SaveUserRelation);

}