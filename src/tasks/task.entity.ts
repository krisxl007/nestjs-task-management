import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { TaskStatus } from "./tasks.model";

/**
 * This is an entity for TypeORM.
 */
@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}