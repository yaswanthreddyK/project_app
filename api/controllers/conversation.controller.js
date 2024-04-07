import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createConversation = async (req, res) => {
  try {
    const {individualId} = req.body
    if(!individualId){
      return res.status(400).send('All mandatory fields are required.')
    }
    const individualUser = await User.findOne({_id: individualId})
    if(!individualUser) return res.status(400).send('Invalid userId')
    const talentId =  individualUser.isCompany === true ? req.user._id : individualId
    const companyId = individualUser.isCompany === true ? individualId : req.user._id
    console.log(talentId, companyId)
    const conversation = await Conversation.create({
      talentId,
      companyId,
      lastMessage: req.body.lastMessage || ""
    })
    if(!conversation){
      throw new Error('Failed to create conversation')
    }
    return res.status(200).send('Conversation created successfully.')
  } catch (error) {
    console.log('conversation.controller :: create Conversation :', error)
    return res.status(500).send('Something went wrong! Please try again.')
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const {conversationId} = req.body
    if(!conversationId) return res.status(400).send("All mandatory fields are required.")
    const conversation = await Conversation.findOne({ _id: conversationId });
    if (!conversation) return res.status(400).send('Conversation does not exist')
     return res.status(200).send(conversation);
  } catch (error) {
    console.log('conversation.controller :: getSingleConversation :', error)
    return res.status(500).send('Something went wrong! Please try again.')
  }
};

export const getAllConversations = async (req, res, next) => {
  try{
    const {isCompany} = req.user
    let conversations = [];
    if(isCompany){
       conversations  = await Conversation.find({companyId: req.user._id}).exec()
    }else{
      conversations = await Conversation.find({talentId: req.user._id}).exec()
    }

    return res.status(200).send(conversations)
  }catch(error){
    console.log('conversation.controller :: getAllConversations :', error)
    return res.status(500).send('Something went wrong! Please try again.')
  }
};
