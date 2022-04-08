import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ApiKey extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @Column()
    public name: string;

    @Column()
    public key: string;

    @Column({type: "bool", default: true})
    public active: boolean;
}