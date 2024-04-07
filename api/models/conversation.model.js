import mongoose from "mongoose";
const { Schema, model } = mongoose;

const conversationSchema = new Schema(
  {
    companyId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    talentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = model("conversation", conversationSchema);
export default Conversation
