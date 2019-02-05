import axios from 'axios';
import serverConfig from '../config/serverConfig';

const convertModelToSchemaBased = (data) => {

};

export {
  convertModelToSchemaBased
}

export default {
  submitRecruiting: (id, accessToken, body) => {
    return axios.post(`${serverConfig.url}:${serverConfig.port}/api/recruits/${id}`, {
      ...body
    }, {
      headers: {"x-access-token": `${accessToken}`}
    })
  },
}
