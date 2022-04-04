import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class DomainDto {
    @IsString()
    @IsNotEmpty()
    public domain: string;
}

@Entity()
export class Domain extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public domain: string;
}