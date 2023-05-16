import React, { useEffect, useState } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { actionFullChatList } from "../../actions";
import { backURL } from "../../constants";
import { Link } from "react-router-dom";
import { AvatarStub } from "../../components/avatars/AvatarStub";
import newChat from "./images/newChat.png";

const ChatsAside = ({ chats = [], auth, ownerChats }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userId = auth.payload?.sub?.id;
    if (userId) {
      ownerChats(userId);
    }
    return function cleanUp() {};
  }, []);

  const filteredChats = chats.filter((chat) => {
    const chatTitle = chat.title !== null ? chat.title.toLowerCase() : "";
    return chatTitle.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="chatsContainer" key={Math.random}>
        <div className="chatSearch">
          <input
            placeholder="Chats search..."
            className="inputChatsSearch"
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
          ></input>
          <Link className="newChatButton" to="/newchat" key={Math.random}>
            <img src={newChat} alt="new chat button"></img>
          </Link>
        </div>
        <div className="overflow-block">
          {filteredChats.map((chat) => (
            <Link className="chatsList" to={`/main/${chat._id}`} key={chat._id}>
              <div className="chatsCard" key={chat._id}>
                {chat.avatar?.url ? (
                  <img
                    key={chat._id}
                    className="smallForChat"
                    src={backURL + chat.avatar?.url}
                  />
                ) : (
                  <AvatarStub
                    login={chat.title !== null ? chat.title : "chat without title"}
                    key={chat._id}
                  />
                )}
                <div className="chatLi" key={chat._id}>
                  <h5 className="chatTitle" key={chat._id}>
                    {chat.title !== null ? chat.title : "chat without title"}
                  </h5>
                  <p key={chat._id}>
                    {chat.lastMessage?.text.length > parseInt("30")
                      ? chat.lastMessage?.text.substr(0, 30) + "..."
                      : chat.lastMessage?.text.substr(0, 30)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const CChatsAside = connect(
  (state) => ({
    auth: state.auth,
    chats: Object.values(state.chats).filter((el) => el._id),
  }),
  { ownerChats: actionFullChatList }
)(ChatsAside);
