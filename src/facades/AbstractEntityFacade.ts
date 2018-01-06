import { Entity } from "../entities/Entity";
import { Injectable } from "@angular/core";
import { AbstractFacade } from "./AbstractFacade";

@Injectable()
export abstract class AbstractEntityFacade extends AbstractFacade{

    public abstract create(entity:Entity);

    public abstract edit(entity:Entity);

    public abstract remove(entity:Entity);

    public abstract find(id:Number);

    public abstract findAll();
}