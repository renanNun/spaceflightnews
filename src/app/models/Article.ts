import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('article')
export class Article {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true})
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
    publishedAt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}