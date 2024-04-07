import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res) => {
  try {
    const {conversationId,description} = req.body
    if(!conversationId || !description){
      return res.status(400).send("All mandatory fields are required")
    }
    const conversation = await Conversation.findOne({_id: conversationId})
    if(!conversation) return res.status(400).send('Conversation does not exist')
    const message = await Message.create({
      conversationId,
      userId: req.user._id,
      description,
      time:  Date.now()
    })
     conversation.lastMessage = description
     await conversation.save()
    if(!message){
      return res.status(500).send('Failed to create message')
    }
    return res.status(200).send(`Message created successfully.${message}`)
  } catch (error) {
    console.log('message.controller :: createMessage :', error)
    return res.status(500).send('Something went wrong! Please try again.')
  }
};



export const getMessages = async (req, res) => {
  try {
    const {conversationId} = req.body
    if(!conversationId) return res.status(400).send("All mandatory fields are required.")
    const conversation = await Conversation.findOne({_id: conversationId})
    if(!conversation) return res.status(400).send('Conversation does not exist')
    const currentUserMessages = await Message.find({userId: req.user._id, conversationId}).exec()
    const otherUserMessages = await Message.find({conversationId, userId: {$ne: req.user._id}})
    const messages = {currentUserMessages: currentUserMessages, otherUserMessages: otherUserMessages}
    return res.status(200).send(messages)
  } catch (error) {
    console.log('message.controller :: getMessages :', error)
    return res.status(500).send('Something went wrong! Please try again.')
  }
};


