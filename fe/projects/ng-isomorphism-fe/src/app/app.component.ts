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

  ngOnInit(): void {
    of([
      { id: 1, title: 'todo1', completed: true },
      { id: 2, title: 'todo2', completed: false },
    ]).subscribe((aTodoList) => (this.todoList = aTodoList));
  }

  get todoCompleted(): ToDoItem[] {
    return this.todoList.filter((t) => t.completed);
  }

  get todoNotCompleted(): ToDoItem[] {
    return this.todoList.filter((t) => !t.completed);
  }

  onClickTodo(todo: ToDoItem): void {
    of({
      ...todo,
      completed: true,
    }).subscribe(
      (finished) =>
        (this.todoList = this.todoList.map((aTodo) =>
          aTodo.id === finished.id ? finished : aTodo
        ))
    );
  }

  onSubmit(): void {
    of(this.todoFormInput).subscribe((input) => {
      this.todoList = [
        ...this.todoList,
        {
          id: this.todoList.slice(-1)[0].id + 1,
          title: input,
          completed: false,
        },
      ];
      this.todoFormInput = '';
    });
  }
}
