import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const sendResetPasswordEmail = async (email) => {
    try {
        const response = await api.post('/send-reset-password-email', { mail: email });
        return response.data;
    } catch (error) {
        console.error("Error sending reset password email", error);
        throw error;
    }
};

const verifyResetTokenAndUpdatePassword = async (token, password) => {
    try {
        const response = await api.post('/verify-reset-password-token', { token, passw: password });
        return response.data;
    } catch (error) {
        console.error("Error resetting password", error);
        throw error;
    }
};

const Register = async (name, middlename, mail, username, passw) => {
  try {
    const response = await axios.post('http://localhost:3000/api/userregister', {
      name: name,
      middlename: middlename,
      username: username,
      passw: passw,
      mail: mail
    });
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response.data;  
  } catch (error) {
    console.error("has problem ocurred in the endpoint api register");
    throw error;
  }
};

const login = async (username, passw) => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: username,
      passw: passw,
    });
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response.data;  
  } catch (error) {
    console.error('Error in the frontend login point', error);
    throw error;
  }
};

const update = async (id, passw) => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.put(`http://localhost:3000/api/loginpassw/${id}`, {
      passw: passw,
    }, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in the frontend update point', error);
    throw error;
  }
};

const getUser = async (name, middlename, mail, username, passw) => {
  try {
    const token = localStorage.getItem('jwtToken');
    console.log("get users is success");
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: {
        'Authorization': token
      },
      params: {
        name: name,
        middlename: middlename,
        mail: mail,
        username: username,
        passw: passw,
      },
    });
    return response.data;
  } catch (error) {
    console.error("A problem occurred in the server", error);
    throw error;
  }
};

export { login, Register, update, getUser, sendResetPasswordEmail, verifyResetTokenAndUpdatePassword };
