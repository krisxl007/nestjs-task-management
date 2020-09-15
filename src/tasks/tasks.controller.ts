import { Controller, Get, Post, Body, Param, Delete, Query, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { };

    /**
     * Use ValidationPipe in parameter level to validate GetTaskFilterDTO
     * @param filterDTO 
     */
    @Get()
    public getTasks(@Query(ValidationPipe) filterDTO: GetTaskFilterDTO) {
        return this.tasksService.getTasks(filterDTO);
    }

    @Get('/:id')
    public getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    /**
     * Use ValidationPipe in controller level to validate CreateTaskDTO
     * @param createTaskDTO 
     */
    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTaskDTO);
    }

    /**
     * Use ParseIntPipe in parameter level to validate input parameter
     * @param id 
     */
    @Delete('/:id')
    public deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    public updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskStatus: UpdateTaskDTO
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, updateTaskStatus);
    }
}
