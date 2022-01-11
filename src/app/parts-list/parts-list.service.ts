import { Part } from '../shared/part.model';
import { Subject } from 'rxjs';


export class PartsListService{
  updatedParts= new Subject<Part[]>();
  startedEditing= new Subject<number>();
private  parts:Part[]=[
    new Part('LG001','23ds23', 'compressor', 2, 20,30,'sdf43434rff',true),
    new Part('LG002','23ds23', 'filter', 1,10,20,'sdf43434rff',false)
  ];

  getParts(){
    return this.parts.slice();
  }
  getPart(index:number){
    return this.parts[index];
  }
  addPart(part:Part){
    this.parts.push(part);
    this.updatedParts.next(this.parts);
  }
  addParts(parts:Part[]){
    this.parts.push(...parts);
  }
  updatePart(index:number, newPart:Part){
    this.parts[index] = newPart;
    this.updatedParts.next(this.parts.slice());
  }
  deleteItem(index:number){
    this.parts.splice(index,1);
    this.updatedParts.next(this.parts.slice());
  }
}
