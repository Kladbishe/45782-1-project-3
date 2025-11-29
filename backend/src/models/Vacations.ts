import {AllowNull,Column,DataType,Default,HasMany,  Model,PrimaryKey,Table,} from "sequelize-typescript";
import Like from "./Likes"; 

@Table({
  tableName: "vacations",
  underscored: true,
})
export default class Vacation extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  destination: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string; 

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: "start_date",
  })
  startDate: Date; 

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    field: "end_date",
  })
  endDate: Date; 

  @AllowNull(false)
  @Column(DataType.DECIMAL(8, 2))
  price: number; 

  @AllowNull(false)
  @Column({
    type: DataType.STRING(200),
    field: "image_name",
  })
  imageName!: string;

  @HasMany(() => Like, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  likes!: Like[];
}
