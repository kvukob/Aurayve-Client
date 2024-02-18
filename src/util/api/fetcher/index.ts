//import {useAccountStore} from 'src/core/accounts/accountStore';

import { useAccountStore } from 'src/core/accounts/accountStore';

const SERVERURL = `https://localhost:7034/api/`;
//const SERVERURL = `/api/`;

const getData = async function(apiCall: string) {
  const headers = buildHeaders();
  try {
    const response = await fetch(`${SERVERURL}${apiCall}`, {
      method: 'GET',
      headers: headers
    });
    return await response.json();
  } catch (err) {
    return err;
  }
};

const postData = async function(apiCall: string, data: object) {
  let headers = {};
  if (apiCall === 'register' || apiCall === 'login') {
    headers = { 'Content-Type': 'application/json; charset=utf-8' };
  } else {
    headers = buildHeaders();
  }
  try {
    const response = await fetch(`${SERVERURL}${apiCall}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

const buildHeaders = function() {
  const accountStore = useAccountStore();
  const myHeaders = new Headers();
  const token = accountStore.getToken;
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + token);
  return myHeaders;
};

export default {
  getData,
  postData
};
