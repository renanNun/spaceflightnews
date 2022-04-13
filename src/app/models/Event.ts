import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @ManyToOne(() => Article, article => article.event)
    article: Article;
}