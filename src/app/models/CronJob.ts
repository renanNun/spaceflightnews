import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cron_job')
export class CronJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @CreateDateColumn()
    runAt: Date;
}