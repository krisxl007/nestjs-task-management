import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }

    public getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDTO);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            // if not catch exception, message will be returned to client.
            throw new NotFoundException(`Task with id=${id} not found.`)
        }

        return found;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    public async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id=${id} not found.`)
        }
    }

    public async updateTaskStatus(id: number, updateTaskStatus: UpdateTaskDTO): Promise<Task> {
        const {
            status
        } = updateTaskStatus;

        let taskToUpdate = await this.getTaskById(id);
        taskToUpdate.status = status;
        await taskToUpdate.save();

        return taskToUpdate;
    }
}
