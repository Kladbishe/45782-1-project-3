import { AllowNull, Column, DataType, Default, HasMany, Index, Model, PrimaryKey, Table } from "sequelize-typescript";
import Like from "./Likes"; 

@Table({
    tableName: "users",
    underscored: true
})
export default class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING(30))
    lastName: string

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING)
    email: string


    @AllowNull(false)
    @Column(DataType.STRING)
    passwordHash: string

    @AllowNull(false)
    @Column(DataType.ENUM("user", "admin"))
    role: "user" | "admin"


     @HasMany(() => Like, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    likes: Like[]
  
}