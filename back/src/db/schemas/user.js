import { Schema, model } from "mongoose";
import dayjs from 'dayjs' 

const date = dayjs()
// console.log(date.format("YYYY-MM-DD HH:mm:ss"))

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    // 하루 공부할 목표 시간 / 분단위로 들어오게
    timeGoalADay: {
      type: Number,
      default: 0,
      required: false,
    },
    createdAt: {
      type: String,
      required: true,
      default: date.format("YYYY-MM-DD HH:mm:ss")
    },
    updatedAt: {
      type: String,
      required: true,
      default: date.format("YYYY-MM-DD HH:mm:ss")
    }
  },
  // {
  //   timestamps: true,
  // }
);

const UserModel = model("User", UserSchema);

export { UserModel };
