import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URL = 'https://ride-app-node.vercel.app/api/v1';

export const sendChat = async (token, groupId, chat) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/createChat',
      {
        groupId: groupId,
        chat: chat,
        isImage: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getChat = async (token, groupId) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/getChatDetails',
      {
        groupId: groupId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const uploadChatImage = async (payload, token) => {
  let res = await fetch(`${BASE_URL}/chat/uploadChatImage`, {
    method: 'post',
    body: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

export const clearChat = async (groupId, token) => {
  try {
    const response = await axios.post(
      BASE_URL + '/chat/clearChat',
      {
        groupId: groupId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    console.log('error in clear chat');
  }
};
