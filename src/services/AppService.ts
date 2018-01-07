import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AppService {
    
    http: Http;
    baseUrl: String;

    constructor(http: Http){
        this.http = http;
        this.baseUrl = "http://85.155.236.226:4567";
     }

     doGet(entity, attribute, data){
         var prueba;
        return this.http.get(this.baseUrl + '/' + entity + '?'+ attribute+'='+data+"");       
     }

     doGetAll(entity){
        return this.http.get('http://85.155.236.226:4567'+ '/' + entity);
     }

     doPost(entity,data){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        headers.append("Accept", "application/json");

        return this.http.post('http://85.155.236.226:4567'+'/'+entity, data, options);
    }
        


}