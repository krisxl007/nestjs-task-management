import { TaskStatus } from "../tasks.model";
import { IsIn } from "class-validator";

export class UpdateTaskDTO {
    
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
}