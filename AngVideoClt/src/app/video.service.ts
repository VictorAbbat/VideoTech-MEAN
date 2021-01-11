import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Video } from './video';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  private baseUrl = 'http://localhost:8089/api/video';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur client ou reseau
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      // Erreur backend
      console.error(
        `Code erreur ${error.status}, ` +
        `Erreur : ${error.error}`);
    }
    // Autres erreurs
    return throwError(
      'Veuillez réessayer');
  };

  createVideo(video: Video): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}` + `/create`, video)
      .pipe(retry(3), catchError(this.handleError));
  }

  retrieveAllVideos(): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}` + `/retrieveinfos`)
      .pipe(retry(3), catchError(this.handleError));
  }

  updateVideo(video: Video): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}` + `/updatebyid/` + video._id, video)
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteVideo(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}` + `/deletebyid/` + id)
      .pipe(retry(3), catchError(this.handleError));
  }
}
