import { IsIn, IsOptional, IsString, IsUrl } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Domain } from "./domain.entity";
import { Sender } from "./sender.entity";

export enum WebHookType {
    EmailSent = 'email_sent',
    EmailOpened = 'email_opened',
}

export class WebHookDto {
    @IsString()
    @IsIn([WebHookType.EmailSent, WebHookType.EmailOpened])
    public type: WebHookType;

    @IsUrl({ require_tld: false })
    public endpoint: string;

    @IsString()
    @IsOptional()
    public domainId?: string;

    @IsString()
    @IsOptional()
    public senderId: string;
}

@Entity()
export class WebHook extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public lastUpdate: Date;

    @Column()
    public type: WebHookType;

    @Column()
    public endpoint: string;

    @ManyToOne(type => Domain, {nullable: true})
    public domain?: Domain;

    @ManyToOne(type => Sender, {nullable: true})
    public sender?: Sender;

    @Column({type: "bool", default: true})
    public active: boolean;
}