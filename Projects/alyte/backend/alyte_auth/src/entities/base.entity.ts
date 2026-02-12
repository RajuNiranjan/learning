import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { STATUS_TYPE } from "../lib/enums/status.enum";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: STATUS_TYPE, default: STATUS_TYPE.PENDING })
  status!: STATUS_TYPE;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Column({ type: "int", name: "created_by", nullable: false })
  createdBy!: number;

  @Column({ type: "boolean", name: "is_deleted", default: false })
  isDeleted!: boolean;

  @Column({ type: "timestamp", name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @Column({ type: "int", name: "updated_by", nullable: true })
  updatedBy?: number;
}
