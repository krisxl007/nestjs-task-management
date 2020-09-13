import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { };

    /**
     * Use ValidationPipe in parameter level to validate GetTaskFilterDTO
     * @param filterDTO 
     */
    @Get()
    public getTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO): Task[] {
        if (Object.keys(filterDTO).length) {
            return this.tasksService.getTasksByFilter(filterDTO);
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    /**
     * Use ValidationPipe in controller level to validate CreateTaskDTO
     * @param createTaskDTO 
     */
    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id')
    public updateTaskStatus(@Param('id') id: string,
        @Body() updateTaskStatus: UpdateTaskDTO): void {
        if (Object.keys(updateTaskStatus).length) {
            this.tasksService.updateTaskStatus(id, updateTaskStatus);
        }
    }
}
