import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  createNewTask = output<any>();

  prevMonth = output();
  nextMonth = output();

  taskName = signal("");

  addTask() {
    this.createNewTask.emit(this.taskName());
    this.taskName.set("")
  }
}
