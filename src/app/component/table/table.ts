import { AfterViewInit, Component, computed, input, output, signal } from '@angular/core';
import { ITask, IWorkDays } from '../../interfaces/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements AfterViewInit {


  currentDate = new Date();

  deleteTaskEvent = output<number>();

  tasksList = input.required<ITask[]>();

  selectedMonth = input.required<IWorkDays>();

  currentMonth = signal(new Date().toLocaleString('default', { month: 'long' }));


  getWeakDay(day: number) {
    let dayfor = this.tasksList()[0].workDays[this.selectedMonth().monthName];
    let date = new Date(dayfor.year, dayfor.monthIndex, day).toLocaleString('default', { weekday: 'long' });
    return date;

  }

  array(days: number) {
    let data = new Array(days);
    return data;
  }
  checkBoxChecked(value: any) {
    localStorage.setItem('dashboardData', JSON.stringify(this.tasksList()));

  }
  deleteTask(task: ITask, indexToDelete: number) {
    let cnf = confirm("are you sure you want to delete : " + task.name);
    if (cnf) {
      this.deleteTaskEvent.emit(indexToDelete);
    }
  }

  ngAfterViewInit(): void {
    const activeColumn = document.querySelector('.table .active');

    // 2. Check if the active column exists
    if (activeColumn) {
      // 3. Scroll it into view
      activeColumn.scrollIntoView({
        behavior: 'smooth', // Use 'auto' for an instant jump
        inline: 'center',    // Aligns to the left edge of the container
        block: 'nearest'
      });
    }
  }
}
