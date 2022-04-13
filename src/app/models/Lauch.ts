import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity('launch')
export class Lauch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    provider: string;

    @ManyToOne(() => Article, article => article.lauch)
    article: Article;
}