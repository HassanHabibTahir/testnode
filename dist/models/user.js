"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    is_verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "createdat",
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: "updatedat",
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});
User.beforeCreate(async (user) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    user.password = await bcryptjs_1.default.hash(user.password, salt);
});
User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
        const salt = await bcryptjs_1.default.genSalt(10);
        user.password = await bcryptjs_1.default.hash(user.password, salt);
    }
});
