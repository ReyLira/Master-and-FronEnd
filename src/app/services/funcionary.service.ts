import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionaryService {
  
  private baseUrl = 'http://localhost:8080';
  private apiUrl = 'http://localhost:8080/getData';

  constructor(private _http: HttpClient) { }

   addFuncionary(data: any): Observable<any> {
    return this._http.post('http://localhost:8081/api/funcionaryData', data);
  }

  updateFuncionary(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8081/api/funcionaryData/${id}`, data);
  }

  getFuncionaryList(): Observable<any> {
    return this._http.get('http://localhost:8081/api/funcionaryData/listData');
  }

  getFuncionaryListActive(): Observable<any> {
    return this._http.get('http://localhost:8081/api/funcionaryData/listData/active');
  }

  getFuncionaryListInactive(): Observable<any> {
    return this._http.get('http://localhost:8081/api/funcionaryData/listData/inactive');
  }

  deleteFuncionary(id: number): Observable<any> {
    // Enviando datos para eliminación lógica en el cuerpo de la solicitud
    const data = { deleted: true }; // Puedes personalizar esto según tus necesidades
    return this._http.patch(`http://localhost:8081/api/funcionaryData/deleteLogical/${id}`, data);
  }

  reactiveFuncionary(id: number): Observable<any> {
    // Enviando datos para eliminación lógica en el cuerpo de la solicitud
    const data = { deleted: true }; // Puedes personalizar esto según tus necesidades
    return this._http.patch(`http://localhost:8081/api/funcionaryData/reactiveLogical/${id}`, data);
  }

  mergePdf(pdfUrls: string[]): Observable<Blob> {
    return this._http.post<Blob>(`${this.baseUrl}/merge-pdf`, pdfUrls, {
      responseType: 'blob' as 'json'
    });
  }

  getData(): Observable<any> {
    return this._http.get(this.apiUrl);
  }
}
