import { IsIn, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Sender } from "./sender.entity";
import { Template } from "./template.entity";

export enum EmailStatus {
    Pending = 'pending',
    Sent = 'sent',
    Rejected = 'rejected',
};

export enum EmailPriority {
    Low = 'low',
    Normal = 'normal',
    High = 'high',
}
export class EmailRequestDto {
    @IsUUID()
    public senderId: string;

    @IsString()
    public subject: string;

    @IsUUID()
    public templateId: string;

    @IsObject()
    @IsOptional()
    public context?: string;

    @IsString()
    @IsIn([EmailPriority.Low, EmailPriority.Normal, EmailPriority.High])
    public priority: EmailPriority = EmailPriority.Low;

    @IsString()
    public to: string;

    @IsString()
    @IsOptional()
    public cc?: string;

    @IsString()
    @IsOptional()
    public bcc?: string;

}

@Entity()
export class EmailRequest extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @ManyToOne(type => Sender)
    public sender: Sender;

    @Column()
    public subject: string;

    @Column({type: "longtext"})
    public body: string;

    @Column()
    public to: string;

    @Column({nullable: true})
    public cc: string;

    @Column({nullable: true})
    public bcc: string;

    @Column({type: "enum", enum: EmailStatus})
    public status: EmailStatus;

    @Column({type: "enum", enum: EmailPriority})
    public priority: EmailPriority;

    @Column({type: "int", default: 0})
    public attempts: number;

    @Column({type: "datetime", nullable: true})
    public firstOpenedAt?: Date;

    @Column({type: "datetime", nullable: true})
    public lastOpenedAt?: Date;
}