import { AfterInsert, Entity, Column, PrimaryGeneratedColumn, AfterUpdate, AfterRemove } from "typeorm";
import { Exclude } from "class-transformer";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted user with id ${this.id}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`Updated user with id ${this.id}`);

    }
    @AfterRemove()
    logRemove() {
        console.log(`Deleted user with id ${this.id}`);
    }
}