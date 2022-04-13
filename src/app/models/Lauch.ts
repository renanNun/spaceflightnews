import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('launch')
export class Lauch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    provider: string;
}