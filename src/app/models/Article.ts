import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column({ default: false })
    featured: boolean;

    @Column()
    url: string;

    @Column()
    imageUrl: string;

    @Column()
    newsSite: string;

    @Column()
    summary: string;

    @Column()
    publishedAt: Date;
}