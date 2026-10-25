import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { getIO, getOnlineUsers } from "../socket/socket.js";

// export const getMessageHistory = async (req, res, next) => {
//     try {
//         const currentUserId = req.user.id;
//         const peerUserId = req.params.userId;

//         const messages = await Chat.find({
//             $or: [
//                 {sender: currentUserId, receiver: peerUserId },
//                 {sender: peerUserId, receiver: currentUserId }
//             ]
//         }).sort({ createdAt: 1 });

//         res.status(200).json({ success: true, data: messages });
//     } catch (error) {
//         next(error)
//     }
// };

// get message history between two users
export const getMessageHistory = async (req, res, next) => {
  try {
    const messages = await Chat.find({
      $or: [
        {
          sender: req.user.id,
          receiver: req.params.userId,
        },
        {
          sender: req.params.userId,
          receiver: req.user.id,
        },
      ],
    })
      .populate("sender", "name role")
      .populate("receiver", "name role")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// export const sendMessage = async (req, res, next) => {
//     try {
//         const newMessage = await Chat.create({
//             sender: req.user.id,
//             receiver: req.params.userId,
//             message: req.body.message
//         });
//         res.status(201).json({ success: true, data: newMessage });
//     } catch (error) {
//         next(error)
//     }
// };

// send messages here
export const sendMessage = async (req, res, next) => {
  try {
    const sender = req.user;
    const receiver = await User.findById(req.params.userId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver not found",
      });
    }

    // Employee cannot use chat
    if (sender.role === "employee" || receiver.role === "employee") {
      return res.status(403).json({
        success: false,
        message: "Employees cannot access chat.",
      });
    }

    // Customer -> only Admin
    if (sender.role === "customer" && receiver.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Customer can only chat with Admin.",
      });
    }

    // Admin -> only Customer
    if (sender.role === "admin" && receiver.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Admin can only chat with Customers.",
      });
    }

    const message = await Chat.create({
      sender: sender._id,
      receiver: receiver._id,
      message: req.body.message,
    });

    const populated = await Chat.findById(message._id)
      .populate("sender", "name role")
      .populate("receiver", "name role");

    const io = getIO();

    const receiverSocketId = getOnlineUsers().get(receiver._id.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", populated);
    }

    res.status(201).json({
      success: true,
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// export const getRecentChats = async (req, res, next) => {
//     try {
//         const currentUserId = req.user.id;

//         const chats = await Chat.find({
//             $or: [{sender: currentUserId }, {receiver: currentUserId }]
//         }).sort({ createdAt: -1 });

//         const standardChatPartners = new Set();
//         chats.forEach(chat => {
//             if(chat.sender.toString() !== currentUserId) standardChatPartners.add(chat.sender.toString());
//             if(chat.receiver.toString() !== currentUserId) standardChatPartners.add(chat.receiver.toString());
//         });

//         res.status(200).json({ success: true, data: Array.from(standardChatPartners) });
//     } catch (error) {
//         next(error)
//     }
// };

//recent chats here

export const getRecentChats = async (req, res, next) => {
  try {
    let users = [];

    // Admin -> show all customers
    if (req.user.role === "admin") {
      users = await User.find({ role: "customer" }).select(
        "name email role status",
      );
    }

    // Customer -> show all admins
    else if (req.user.role === "customer") {
      users = await User.find({ role: "admin" }).select(
        "name email role status",
      );
    }

    // Employees cannot chat
    else {
      return res.status(403).json({
        success: false,
        message: "Employees cannot access chat.",
      });
    }

    // Add last message for every user
    const conversations = await Promise.all(
      users.map(async (u) => {
        const lastMessage = await Chat.findOne({
          $or: [
            { sender: req.user.id, receiver: u._id },
            { sender: u._id, receiver: req.user.id },
          ],
        })
          .sort({ createdAt: -1 })
          .select("message createdAt isRead");

        return {
          ...u.toObject(),
          lastMessage: lastMessage?.message || "",
          lastMessageTime: lastMessage?.createdAt || null,
          unread: 0, // isko baad me unread logic se replace karenge
        };
      }),
    );

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};
