import { Repository, EntityRepository } from "typeorm";
import { Task } from './task.entity';
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks.model";
import { GetTaskFilterDTO } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(filterDTO: GetTaskFilterDTO): Promise<Task[]> {
        const {
            status,
            search
        } = filterDTO;
        const query = this.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', { status })
        }

        if(search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany();

        return tasks;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        // new ES6 syntax to extract attributes from object.
        const {
            title,
            description
        } = createTaskDTO;

        // use DTO object to add a new record
        const newTask = new Task();
        newTask.title = title;
        newTask.description = description;
        newTask.status = TaskStatus.OPEN;

        // all DTO objects have save method.
        await newTask.save();

        return newTask;
    }
} 