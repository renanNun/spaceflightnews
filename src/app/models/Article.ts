import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lauch } from "./Lauch";
import { Event } from "./Event";

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
    publishedAt: Date;

    @OneToMany(() => Lauch, lauch => lauch.article)
    lauchs: Lauch;

    @OneToMany(() => Event, event => event.article)
    events: Event;
}