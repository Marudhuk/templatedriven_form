import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }
  url="http://localhost:5000"
  getTemplateData(){
    return this.http.get(this.url+"/getAllTemplateData")
  }
  getTemplateDataById(id:number){
    return this.http.get(this.url+`/getTemplateDataById/${id}`);
  }
  postData(data:any){
    return this.http.post(this.url+"/postTemplateData",data)
  }
  updateTemplateData(id:number,data:any){
    return this.http.put(this.url+`/updateTemplateDataById/${id}`,data)
  }
  deleteData(id:number,data:any){
    return this.http.put(this.url+`/deleteTemplateDataById/${id}`,data)
  }
}
