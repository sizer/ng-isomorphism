import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoList: ToDoItem[] = [];
  todoFormInput = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/todo')
      .subscribe((aTodoList) => (this.todoList = aTodoList as ToDoItem[]));
  }

  get todoCompleted(): ToDoItem[] {
    return this.todoList.filter((t) => t.completed);
  }

  get todoNotCompleted(): ToDoItem[] {
    return this.todoList.filter((t) => !t.completed);
  }

  onClickTodo({ id, title }: ToDoItem): void {
    this.http
      .put(`http://localhost:3000/todo/${id}`, { title, completed: true })
      .subscribe(
        (finished) =>
          (this.todoList = this.todoList.map((aTodo) =>
            aTodo.id === (finished as ToDoItem).id
              ? (finished as ToDoItem)
              : aTodo
          ))
      );
  }

  onSubmit(): void {
    this.http
      .post(`http://localhost:3000/todo`, { title: this.todoFormInput })
      .subscribe((created) => {
        this.todoList = [
          ...this.todoList,
          ...(created as ToDoItem[]).map(({ id, title }) => ({
            id,
            title,
            completed: false,
          })),
        ];
        this.todoFormInput = '';
      });
  }
}
