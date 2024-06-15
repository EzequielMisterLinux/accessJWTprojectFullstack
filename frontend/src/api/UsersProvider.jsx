import axios from "axios"

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
    const response = await axios.put(`http://localhost:3000/api/loginpassw/${id}`, {
      passw: passw,
    });
    return response.data;
  } catch (error) {
    console.error('Error in the frontend update point', error);
    throw error;
  }
};

export { login, update };
