import { Table, Column, DataType, ForeignKey, Model, BelongsTo, Index } from "sequelize-typescript";
import User from "./Users";
import Vacation from "./Vacations";

@Table({
  tableName: "likes",
  underscored: true,
  indexes: [
    { name: "unique_user_vacation", unique: true, fields: ["user_id", "vacation_id"] }
  ],
})
export default class Like extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, field: "user_id" })
  userId!: string;

  @ForeignKey(() => Vacation)
  @Column({ type: DataType.UUID, field: "vacation_id" })
  vacationId!: string;

  @BelongsTo(() => User) user!: User;
  @BelongsTo(() => Vacation) vacation!: Vacation;
}
