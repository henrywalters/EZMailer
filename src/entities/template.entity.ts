import { IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class TemplateDto {
    @IsString()
    public body: string;
}

@Entity()
export class Template extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({type: "longtext"})
    public body: string;
}