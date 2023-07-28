import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private apiUrl = 'http://localhost:8080/todos'; 

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createTodo(todo: Todo): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  saveAllTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodoStatus(todoId: number, completed: boolean): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.patch<any>(url, { completed });
  }

  deleteTodo(todoId: number): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<any>(url);
  }
}
