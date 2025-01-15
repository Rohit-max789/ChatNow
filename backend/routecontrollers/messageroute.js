import Conversation from "../Models/conversation.js";
import Message from "../Models/MessageSchema.js";
import { getReciverSocketId, io } from "../Socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let chats = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!chats) {
      chats = await Conversation.create({
        participants: [senderId, reciverId],
        messages: [],
      });
    }
    console.log(chats);

    const newMessages = new Message({
      senderId,
      reciverId,
      message: messages,
      conversationId: chats._id,
    });

    if (newMessages) {
      chats.messages.push(newMessages._id);
    }

    //socketio function

    const reciverSocketId = getReciverSocketId(reciverId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessages);
    }

    await Promise.all([chats.save(), newMessages.save()]);

    res.status(201).send(newMessages);
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    const chats = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");

    if (!chats) {
      return res.status(200).send([]);
    }
    const message = chats.messages;
    res.status(200).send(message);
  } catch (error) {
    console.log(error);
  }
};
