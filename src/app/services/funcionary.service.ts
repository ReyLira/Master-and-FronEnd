import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionaryService {

  constructor(private _http: HttpClient) { }

   addFuncionary(data: any): Observable<any> {
    return this._http.post('http://localhost:8081/api/create', data);
  }

  updateFuncionary(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8081/api/${id}`, data);
  }

  getFuncionaryList(): Observable<any> {
    return this._http.get('http://localhost:8081/api/list');
  }

  deleteFuncionary(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8081/api/${id}`);
  }

  

}
