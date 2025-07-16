"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMessages = void 0;
let users = [];
// Add or update user
const addUser = (userId, socketId) => {
    if (userId) {
        const user = users.find((user) => user.userId === userId);
        // If user exists, update their socketId
        if (user) {
            user.socketId = socketId;
        }
        else {
            // Add new user if not present
            users.push({ userId, socketId });
        }
    }
};
// Remove user by socketId
const removeUser = (socketId) => {
    users = users?.filter((user) => user?.socketId !== socketId);
};
// Remove user by userId (on logout)
const userLogout = (userId) => {
    users = users.filter((u) => u.userId !== userId);
};
// Find a friend by userId
const findFriend = (id) => {
    return users.find((u) => u.userId === id);
};
const appMessages = (socket, socketIo) => {
    console.log("New client connected");
    // Add user when they connect
    socket.on("addUser", (userId) => {
        addUser(userId.id, socket.id);
        // Emit the updated list of active users to all clients
        socketIo.emit("getUsers", users);
        socketIo.emit("activeUsers", users);
    });
    // setnd Message
    socket.on("sendMessage", (message) => {
        const user = findFriend(message.receiverId);
        console.log(message, "message");
        if (user) {
            console.log(user, "user-->");
            socketIo.to(user.socketId).emit("newMessage", message);
        }
    });
    socket.on("typingMessage", (data) => {
        const user = findFriend(data.receiverId);
        if (user !== undefined) {
            socket.to(user.socketId).emit("typingMessageGet", data);
        }
    });
    socket.on("logout", (userId) => {
        userLogout(userId);
        socket.broadcast.emit("activeUsers", users);
    });
    // Handle disconnection, but with a delay to allow for reconnection
    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
        // Delay before removing the user to handle refresh scenarios
        setTimeout(() => {
            if (!socket.connected) {
                removeUser(socket.id);
                socketIo.emit("getUsers", users);
                socket.broadcast.emit("activeUsers", users);
            }
        }, 5000); // Wait for 5 seconds to see if they reconnect
    });
};
exports.appMessages = appMessages;
// let users = [];
// const addUser = (userId, socketId) => {
//   if (userId) {
//     !users.some((user) => user.userId == userId) &&
//       users.push({ userId, socketId });
//   }
// };
// const removeUser = (socketId) => {
//   users = users?.filter((user) => user?.socketId != socketId);
// };
// const userLogout = (userId) => {
//   users = users.filter((u) => u.userId !== userId);
// };
// const findFriend = (id) => {
//   return users.find((u) => u.userId === id);
// };
// export const appMessages = (socket, socketIo) => {
//     console.log("New client connected");
//    socket.on("addUser", (userId) => {
//     addUser(userId.id, socket.id);
//     socket.emit("getUsers", users);
//     socket.emit("activeUsers", users);
//   });
// //   socket.on("sendMessage", async (data) => {
// //     if (data) {
// //       const user = findFriend(data.receiverId);
// //       if (user !== undefined) {
// //         socket.to(user?.socketId).emit("getMessage", data);
// //         await updateOnlineMessages(data);
// //       }
// //     }
// //   });
//   socket.on("typingMessage", (data) => {
//     const user = findFriend(data.receiverId);
//     if (user !== undefined) {
//       socket.to(user.socketId).emit("typingMessageGet", {
//         senderId: data.senderId,
//         receiverId: data.receiverId,
//         message: data.message,
//       });
//     }
//   });
// //   socket.on("messageSeen", (msg) => {
// //     const user = findFriend(msg.senderId);
// //     if (user !== undefined) {
// //       socket.to(user.socketId).emit("msgSeenResponse", msg);
// //     }
// //   });
// //   socket.on("delivaredMessage", (msg) => {
// //     const user = findFriend(msg.senderId);
// //     if (user !== undefined) {
// //       socket.to(user.socketId).emit("msgDelivaredResponse", msg);
// //     }
// //   });
// //   socket.on("seen", (data) => {
// //     const user = findFriend(data.senderId);
// //     if (user !== undefined) {
// //       socket.to(user.socketId).emit("seenSuccess", data);
// //     }
// //   });
// //   socket.on("callUser", (data) => {
// //     if (data) {
// //       const user = findFriend(data.receiverId);
// //       if (user !== undefined) {
// //         socket.to(user?.socketId).emit("callUser", data);
// //       }
// //     }
// //   });
// //   socket.on("startCall", (data) => {
// //     if (data) {
// //       const user = findFriend(data.receiverId);
// //       if (user !== undefined) {
// //         socket
// //           .to(user?.socketId)
// //           .emit("callAccepted", { accept: true, id: data });
// //       }
// //     }
// //   });
// //   //send Socket Id
// //   socket.on("endCall", (data) => {
// //     if (data) {
// //       const user = findFriend(data?.user_Id);
// //       if (user !== undefined) {
// //         socket.to(user?.socketId).emit("endCall", { acceptCall: false });
// //       }
// //     }
// //   });
// //   socket.on("addComment", (data) => {
// //     socket.broadcast.emit("arrivedComment", data);
// //   });
// //   socket.on("addLike", (data) => {
// //     socket.broadcast.emit("arrivedLike", data);
// //   });
// //   socket.on("innerCommentLike", (data) => {
// //     socket.broadcast.emit("arrivedInnerCommentLike", data);
// //   });
//   socket.on("logout", (userId) => {
//     userLogout(userId);
//     socket.broadcast.emit("activeUsers", users);
//   });
//   socket.on("disconnect", () => {
//     console.log("disconnect")
//     removeUser(socket.id);
//     socketIo.emit("getUser", users);
//     socket.broadcast.emit("activeUsers", users);
//   });
// };
