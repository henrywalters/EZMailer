import { Domain } from "./domain.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class SenderDto {
    @IsString()
    @IsOptional()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public email: string;

    @IsUUID()
    public domainId: string;
}

@Entity()
export class Sender extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @ManyToOne(type => Domain)
    public domain: Domain;
}