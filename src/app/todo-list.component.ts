import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    newTodo: Todo = {
      number: 0,
      title: '',
      completed: false,
      editMode : true,
      createdAt: new Date()
    };
  
    toggleEditMode(todo: Todo): void {
      todo.editMode = !todo.editMode;
    }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {

    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      response => {
        this.todos = response;
      },
      error => {
        console.log('Error fetching todos:', error);
      }
    );
  }

  addTodo(): void {
    const newTodo: Todo = {
      number: Date.now(),
      title: '',
      completed: false,
      editMode: true,
      createdAt: new Date()
    };

    this.todos.push(newTodo);
    
  }

  saveTodoStatus(todo: Todo):void {

    console.log("Save : "+todo)

    this.todoService.createTodo(todo).subscribe(
        (response) => {
          console.log("Response : "+response)
          console.log("Response Body : "+response.body)
          this.todos.push(response);
          this.newTodo = {
            number: Date.now(),
            title: '',
            completed: false,
            editMode: true,
            createdAt: new Date()
            
          };
        },
        (error) => {
          console.log('Error adding todo:', error);
        }
      );

  }

  saveAllTodoStatus():void {

    this.todoService.saveAllTodo(this.todos).subscribe(
        (response) => {
          this.todos.push(response);
          this.newTodo = {
            number: Date.now(),
            title: '',
            completed: false,
            editMode: true,
            createdAt: new Date()
          };
        },
        (error) => {
          console.log('Error adding todo:', error);
        }
      );

  }

  updateTodoStatus(todo: Todo): void {
    const completed = !todo.completed;
    this.todoService.updateTodoStatus(todo.number, completed).subscribe(
      response => {
        todo.completed = completed;
      },
      error => {
        console.log('Error updating todo status:', error);
      }
    );
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.number).subscribe(
      response => {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      },
      error => {
        console.log('Error deleting todo:', error);
      }
    );
  }
}
