import axios from 'axios';
import serverConfig from '../config/serverConfig';
import message from '../common/message';

export default {
  login: ({name, email, password}) => {
    return axios.post(`${serverConfig[process.env.NODE_ENV].url}/api/auth/login`, {
      user_name: name,
      email,
      password
    }).then(res => {
      if (res.data.results) {
        window.localStorage.setItem('accessToken', res.data.results[0]);
      }
      return res.data;
    })
  },
  getStoreDataByUser: (id, accessToken) => {
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/recruits/${id}/clientStoreData`, {
      headers: {'x-access-token': `${accessToken}`}
    }).then(res => res.data.result)
      .catch(err => {
        console.log('getStoreDataByUser api error', err);
        return null;
      })
  },
  saveStoreDataByUser: (id, accessToken, body) => {
    return axios.put(`${serverConfig[process.env.NODE_ENV].url}/api/recruits/${id}/clientStoreData`, {
      clientStoreData: {
        ...body
      }
    }, {
      headers: {'x-access-token': `${accessToken}`}
    }).catch(err => {
      console.log('saveStoreDataByUser api call error', err);
      window.alert(message.serverError);
    })
  },

  getBatch: () => {
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/recruit/batch`)
      .then(res => res.data.batch);
  },
  getDepartmentData: () => {
    return axios.get(`${serverConfig[process.env.NODE_ENV].url}/api/recruit/department`)
      .then(res => res.data);
  }
}
