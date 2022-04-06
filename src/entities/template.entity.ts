import { IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class TemplateDto {
    @IsString()
    public body: string;

    @IsString()
    public name: string;
}

@Entity()
export class Template extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column({type: "int", default: 1})
    public version: number;

    @Column({type: "longtext"})
    public body: string;
}