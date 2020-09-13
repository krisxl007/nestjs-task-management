import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";

/**
 * This is custom pipe example:
 * 1. implement PipeTrasnform interface
 * 2. override transform method
 * 3. apply it to parameter level validation, for example: @Body('status', TaskStatusValidationPipe) status: TaskStatus
 */
export class TaskStatusValidationPipe implements PipeTransform {
    // readonly property can not be modified in run time.
    readonly allowedStatues = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        const valueToUpperCase = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status.`)
        }

        // return value to call controller.
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatues.indexOf(status);
        return index !== -1;
    }
}