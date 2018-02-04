import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';


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

    getCurrentDateTime( callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.get( BASE_URL + 'now').subscribe(data=>{
            callback(data['datetime']);
        });
    }

    getLogsYMD( user_id:string,year:number,month:number,date:number,callback:(msg:string)=>void):void {
        let y0 = ('0000' + year).slice(-4);
        let m0 = ('00' + month).slice(-2);
        let d0 = ('00' + date).slice(-2);
        // Parameters obj-
        let params: HttpParams = new HttpParams().set('user_id', user_id ).set('year', y0 ).set('month', m0 ).set('date', d0 );

        console.log(params.toString());

        this.http.get( BASE_URL + 'logs',{ params:params }).subscribe(data=>{
            callback(data['logs']);
        });
    }

    getLogsYM( user_id:string,year:number,month:number,callback:(msg:string)=>void):void {
    }

    getLogsY( user_id:string,year:number,callback:(msg:string)=>void):void {
    }

    postMessage( body, callback:(msg:string)=>void ):void {
        // API GatewayとHTTP通信して、取得成功時にコールバックを行う
        this.http.post( BASE_URL + 'log',body).subscribe(data=>{
            callback(data['message']['message']);
        });
    }
}