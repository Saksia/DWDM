import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AppService {
    
    http: Http;
    baseUrl: String;

    constructor(http: Http){
        this.http = http;
        this.baseUrl = "http://85.155.236.226:4567/";
     }

    doGet(endpoint){
         var prueba;
        return this.http.get(this.baseUrl+endpoint);       
    }

    doPost(entity,data){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        headers.append("Accept", "application/json");

        return this.http.post(this.baseUrl+entity, data, options);
    }

    doPut(endpoint,data){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        return this.http.put(this.baseUrl+endpoint,data, options);
    }

    doDelete(endpoint, data){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        return this.http.delete(this.baseUrl+endpoint, options);
    }
        


}