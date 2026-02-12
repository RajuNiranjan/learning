import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("auth_signup")
export class Auth extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "varchar", nullable: false })
  email!: string;

  @Column({ type: "varchar", nullable: false })
  phone!: string;

  @Column({ type: "int", name: "fleet_id" })
  fleetId!: number;
}
