import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksByFilter(filterDTO: GetTaskFilterDTO): Task[] {
        const {
            status,
            search
        } = filterDTO;

        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search)
                || task.description.includes(search));
        }

        return tasks;
    }

    public getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            // if not catch exception, message will be returned to client.
            throw new NotFoundException(`Task with id=${id} not found.`)
        }
        return found; 
    }

    public createTask(createTaskDTO: CreateTaskDTO): Task {
        // new ES6 syntax to extract attributes from object.
        const {
            title,
            description
        } = createTaskDTO;

        const newTask: Task = {
            id: uuidv4(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask);
        return newTask;
    }

    public deleteTask(id: string): void {
        const taskToDeleteIndex = this.tasks.findIndex(task => task.id === id);
        if (taskToDeleteIndex != -1) {
            this.tasks.splice(taskToDeleteIndex, 1);
        }else {
            throw new NotFoundException(`Task with id=${id} not found.`)
        }
    }

    public updateTaskStatus(id: string, updateTaskStatus: UpdateTaskDTO): void {
        const {
            status
        } = updateTaskStatus;
        let taskToUpdate = this.getTaskById(id);
        if (taskToUpdate) {
            taskToUpdate.status = status;
        }
    }
}
