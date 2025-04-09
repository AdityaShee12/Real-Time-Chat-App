import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { debounce } from "lodash";
import axios from "axios";
import socket from "../socket.js";
import { AiOutlineSearch } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

const Search = ({ userId, userName }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const secretKey = "0123456789abcdef0123456789abcdef";
  const iv = "abcdef9876543210abcdef9876543210";
  const [unselectedUsers, setUnselectedUsers] = useState([]);

  function decryptMessage(encryptedText) {
    const bytes = CryptoJS.AES.decrypt(
      encryptedText,
      CryptoJS.enc.Hex.parse(secretKey),
      {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    console.log("SD", bytes.toString(CryptoJS.enc.Utf8));

    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const fetchRecentChats = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.get(
          `/api/v1/users/userList?userId=${userId}`
        );
        if (response.data) {
          const updatedData = response.data.map((data) => ({
            ...data,
            lastMessage: {
              ...data.lastMessage,
              text: decryptMessage(data.lastMessage.text),
            },
          }));
          setRecentUsers(updatedData);
          console.log("Data", updatedData);
        }
      } catch (error) {
        console.error("Error fetching recent chats:", error);
      }
    }, 100);
  };

  const fetchUsers = debounce(async (searchText) => {
    if (!searchText.trim()) {
      setUsers([]);
      return;
    }

    try {
      const response = await axios.get(
        `/api/v1/users/searchUser?query=${searchText}&userId=${userId}`
      );
      const usersWithUUID = response.data.map((user) => ({
        ...user,
      }));
      console.log("Data", usersWithUUID);
      setUsers(usersWithUUID);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, 300);

  const searchRecentChat = () => {
    setRecentUsers((prevUsers) => {
      let updatedUsers = [...prevUsers];
      users.forEach((newUser) => {
        const index = updatedUsers.findIndex(
          (user) => user._id === newUser._id
        );
        if (index !== -1) {
          const [matchedUser] = updatedUsers.splice(index, 1);
          updatedUsers.unshift(matchedUser);
        } else {
          updatedUsers.unshift(newUser);
        }
      });
      return updatedUsers;
    });
  };

  const handleSelectUser = (user) => {
    const recieverName = user.fullName.replace(/\s+/g, "");
    navigate(`/layout/chat/${recieverName}`, {
      state: { userId, userName, user },
    });

    setQuery("");

    setRecentUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter(
        (recentUser) => recentUser._id === user._id || recentUser.lastMessage
      );

      // Ensure user is at the top
      const userIndex = updatedUsers.findIndex((u) => u._id === user._id);
      if (userIndex !== -1) {
        const [matchedUser] = updatedUsers.splice(userIndex, 1);
        updatedUsers.unshift(matchedUser);
      }

      return updatedUsers;
    });
  };

  const handleLastMessage = (data) => {
    const { userId, sms } = data;
    const t = decryptMessage(sms);
    console.log("!@", userId, t);
    // Use the functional update form to ensure we work with the latest state
    setTimeout(() => {
      setRecentUsers((prevUsers) => {
        console.log("AWD", prevUsers);
        return prevUsers.map((user) => {
          return user._id === userId
            ? {
                ...user,
                lastMessage: {
                  ...user.lastMessage,
                  text: decryptMessage(sms),
                },
              }
            : user;
        });
      });
    }, 100);
  };

  useEffect(() => {
    socket.emit("new-user-joined", userId);
  }, []);

  useEffect(() => {
    fetchRecentChats();
    socket.on("last message", handleLastMessage);
  }, []);

  useEffect(() => {
    fetchUsers(query);
  }, [query]);

  useEffect(() => {
    searchRecentChat();
  }, [users]);

  return (
    <div className="flex flex-col items-center mt-10 relative w-full flex-grow">
      <div className="relative w-full">
        <AiOutlineSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          size={20}
          style={{ pointerEvents: "none" }}
        />
        <input
          type="text"
          placeholder="Type a name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-12 py-2 rounded w-full"
        />
      </div>
      <ul className="absolute left-0 w-full bg-white border mt-12 rounded shadow-md max-h-48 overflow-auto z-50">
        {recentUsers.map((user) => (
          <li
            key={user._id}
            className="flex items-center gap-3 p-2 transition duration-300 font-mono hover:shadow-lg hover:shadow-sky-400 cursor-pointer"
            onClick={() => handleSelectUser(user)}>
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-gray-600 truncate w-full">
                {user.lastMessage?.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;