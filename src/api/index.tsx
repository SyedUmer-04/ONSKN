import axios from 'axios';
import { store } from '../redux/store';
import endpoints from './endpoints';

export const base_url = 'https://192.168.100.234:5000/api/';

import { EventRegister } from 'react-native-event-listeners';

const instance = axios.create({
  baseURL: base_url,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for error handling
instance.interceptors.request.use(
  config => {
    // You can add request headers or do other modifications here
    const state = store.getState();
    if (state.auth.token) {
      config.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    return config;
  },
  error => {
    // Handle request error (e.g., network issues)
    console.log(error.response.data);

    return Promise.reject(error);
  },
);

// Response interceptor for error handling and response transformation
instance.interceptors.response.use(
  response => {
    // Check for successful response status codes (e.g., 2xx)
    if (response.data.status >= 200 && response.data.status < 300) {
      // You can perform response transformations here
      // For example, you can extract the data you need
      return response.data;
    } else {
      // Handle other non-successful status codes (e.g., 4xx, 5xx)
      console.log('Response:', response);

      return Promise.reject(response);
    }
  },
  error => {
    // Handle response error (e.g., 4xx, 5xx)
    if (error.response) {
      console.log("Error ===========>",error.response);
      
      // You can access the response status code, data, headers, etc.
      const { status, data } = error.response;
      // console.log("inside respons ===>",data);
      // console.log("status ===>", status);

      // Handle specific error codes as needed
      if (status === 401) {
        // Unauthorized: Redirect or handle accordingly
      } else if (status === 404) {
        // Resource not found: Handle accordingly
      } else if (status === 403) {
        EventRegister.emit('logout');
      } else {
        return Promise.reject(JSON.stringify(data));

        // Handle other error codes
        // You can log the error or display a user-friendly message
      }
      if (data.reason) {
        return Promise.reject(JSON.stringify(data));
      }
      if (data.message) {
        return Promise.reject(data.message);
      }

      return Promise.reject(error);
    } else {
      // Handle network errors or other issues
      return Promise.reject(error);
    }
  },
);

export const login = data => {
  console.log("Data --->",data);
  
  return instance.post(endpoints.auth.login, data);
};

export const switchRole = () => {
  return instance.get(endpoints.user.switchRole);
};

export const signup = data => {

  return instance.post(endpoints.auth.signup, data);
};

export const forgotPassword = data => {
  return instance.post(endpoints.auth.forgotPassword, data);
};

export const verifyOtp = data => {
  return instance.post(endpoints.auth.verifyOtp, data);
};

export const resetPassword = data => {
  return instance.post(endpoints.auth.resetPassword, data);
};

export const getProfile = data => {
  return instance.get(endpoints.user.profile);
};

export const uploadImage = data => {
  return instance.post(`${endpoints.upload.user}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadDocument = data => {
  return instance.post(`${endpoints.upload.document}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editProfile = data => {
  return instance.put(endpoints.user.edit, data);
};

export const changePassword = data => {
  return instance.put(endpoints.user.changePassword, data);
};

export const updateUserProfilePicture = data => {
  return instance.post(endpoints.user.updatePicture, data);
};

export const getSavedPlaces = () => {
  return instance.get(endpoints.savedPlaces.get);
};

export const savePlace = data => {
  return instance.post(endpoints.savedPlaces.create, data);
};

export const getSettings = () => {
  return instance.get(`${endpoints.general.settings}`);
};

export const getReviews = data => {
  return instance.get(`${endpoints.review.writeReview}`, {
    params: data,
  });
};

export const submitContactUs = data => {
  return instance.post(`${endpoints.general.contactUs}`, data);
};

export const submitReport = data => {
  return instance.post(`${endpoints.ride.report}`, data);
};

export const logout = data => {
  return instance.post(`${endpoints.auth.logout}`, data);
};

export const deleteUser = id => {
  return instance.delete(`${endpoints.auth.delete}` + id);
};

export const generalData = () => {
  return instance.get(`${endpoints.general.settings}`);
};

export const getCategories = params => {
  return instance.get(`${endpoints.items.category}`, {
    params,
  });
};

export const writeReview = data => {
  return instance.post(`${endpoints.review.writeReview}`, data);
};

export const helpfullReview = data => {
  return instance.post(`${endpoints.review.helpFull}`, data);
};

export const reviewReply = data => {
  return instance.post(`${endpoints.review.replyReview}`, data);
};

export const profileEditRequst = data => {
  return instance.post(`${endpoints.user.editRequest}`, data);
};

export const getNotification = params => {
  return instance.get(`${endpoints.user.notifications}`, { params });
};
export const getConversations = data => {
  return instance.get(`${endpoints.messages.get}` + data?.id, data?.params);
};
export const sendMessage = ({ body, groupId }) => {
  return instance.post(`${endpoints.messages.send}` + groupId, body);
};

export const getMessages = ({ id, params }) => {
  return instance.get(`${endpoints.messages.get}` + id, { params });
};

export const getContent = params => {
  return instance.get(endpoints.content.get, params);
};

export const getContentById = id => {
  return instance.get(`${endpoints.content.get}/${id}`);
};

export const createContent = data => {
  return instance.post(endpoints.content.add, data);
};

export const updateContent = (data) => {
  return instance.put(endpoints.content.edit + data?.id, data?.data);
};

export const deleteContent = (data) => {
  return instance.delete(endpoints.content.edit + data?.id);
};

export const saveContent = id => {
  return instance.post(endpoints.content.save + id);
};

export const getSavedContent = params => {
  return instance.get(endpoints.content.saved, params);
};
export const createGroup = data => {
  return instance.post(endpoints.groups.add, data);
};

export const getGroups = params => {
  return instance.get(endpoints.groups.get, params);
};

export const joinGroup = id => {
  return instance.post(endpoints.groups.join + id + '/join');
};
export const leaveGroup = id => {
  return instance.post(endpoints.groups.join + id + '/leave');
};

export const commentThread = data => {
  console.log(data);

  return instance.post(endpoints.comments.comment + data?.id + '/comments', data?.data);
};

export const getComment = (data) => {
  return instance.get(endpoints.comments.comment + data?.id + '/comments');
};

export const replyComment = data => {
  return instance.post(endpoints.comments.comment + data?.id + '/reply', data?.data);
};

export const reportContent = data => {
  return instance.post(endpoints.reports.create, data);
};





export default instance;