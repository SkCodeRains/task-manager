import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { Header } from "../header/header";
import { Table } from "../table/table";
import { ITask, IWorkDays } from '../../interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  imports: [Header, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  selectedMonth = signal(this.getThisMonthDataModel());

  tasksList = signal<ITask[]>([]);
  constructor() {
    let data: any = localStorage.getItem("dashboardData");
    if (data != null) {
      this.tasksList.set((JSON.parse(data) as any));
    }
  }




  getThisMonthDataModel(customMonth: any = undefined): IWorkDays {

    const today = new Date(); // Use 'const' if the variable won't be reassigned
    if (customMonth) {
      today.setMonth(customMonth);

    }
    const totalDaysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    return {
      totalDays: totalDaysInCurrentMonth,
      monthName: today.toLocaleString('default', { month: 'long' }),
      monthIndex: today.getMonth(),
      year: today.getFullYear(),
      workedFor: {}

    }

  }


  nextMonth() {
    let selectedMonth = this.getThisMonthDataModel(this.selectedMonth().monthIndex + 1);
    this.tasksList().forEach(task => task.workDays[selectedMonth.monthName] = selectedMonth);

    this.selectedMonth.set(selectedMonth);

  }

  prevMonth() {

    let selectedMonth = this.getThisMonthDataModel(this.selectedMonth().monthIndex - 1);
    this.tasksList().forEach(task => task.workDays[selectedMonth.monthName] = selectedMonth)
    this.selectedMonth.set(selectedMonth)
  }

  createNewTask(taskName: string) {
    if (taskName.length > 0) {

      let thisMonthData = this.getThisMonthDataModel();
      let newTask: ITask = {
        name: taskName,
        workDays: {
        }
      }
      newTask.workDays[thisMonthData.monthName] = thisMonthData;
      this.tasksList().push(newTask);
      localStorage.setItem('dashboardData', JSON.stringify(this.tasksList()));
    } else {
      alert("Please Enter Task name")
    }
  }

  deleteTaskEvent(indexToDelete: number) {
    const currentTasks = this.tasksList();
    if (indexToDelete >= 0 && indexToDelete < currentTasks.length) {
      const updatedTasks = [
        ...currentTasks.slice(0, indexToDelete),
        ...currentTasks.slice(indexToDelete + 1)
      ];
      this.tasksList.set(updatedTasks);
      localStorage.setItem('dashboardData', JSON.stringify(this.tasksList()));
      console.log('Task deleted (by index):', indexToDelete);
    }
  }
}

