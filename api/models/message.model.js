import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true
  }
},{
  timestamps:true
});

const Message = model("message", messageSchema)
export default Message