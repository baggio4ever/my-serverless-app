import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'https://o0rm1lfsej.execute-api.us-west-2.amazonaws.com/dev/';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {}

    getMessage( callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.get( BASE_URL + 'hello').subscribe(data=>{
            callback(data['message']);
        });
    }

    getMessage2( callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.get( BASE_URL + 'byebye').subscribe(data=>{
            callback(data['message']);
        });
    }

    getMessage3( callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.get( BASE_URL + 'now').subscribe(data=>{
            callback(data['datetime']);
        });
    }

    postMessage( body, callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.post( BASE_URL + 'log',body).subscribe(data=>{
            callback(data['message']['message']);
        });
    }
}