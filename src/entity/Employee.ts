import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Employee{
    @PrimaryColumn("int")
    id: number;

    @Column("varchar")
    name: string;

    @Column({
        type:"int",
        nullable: true
    })
    managerId: number|null
}