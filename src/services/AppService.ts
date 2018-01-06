import { Injectable } from "@angular/core";
import { Http } from "@angular/http";


@Injectable()
export class AppService {
    
    http: Http;
    baseUrl: String;

    constructor(http: Http){
        this.http = http;
        this.baseUrl = "http://dwdm-spark-heroku-example.herokuapp.com";
     }

     doGet(entity, attribute, data){
        return this.http.get(this.baseUrl + '/' + entity + '?'+ attribute+'='+data);       
     }

     doGetAll(entity){
        return this.http.get(this.baseUrl + '/' + entity);
     }

     doPost(entity,data){
        this.http.post(this.baseUrl+'/'+entity,data).subscribe((res:any)=>{
            console.log(res);
        });
    }
        


}