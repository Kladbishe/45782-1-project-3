import axios from "axios";
import type Login from "../models/login";

import type UserRegister from "../models/userRegister";

class AuthService {
  async login(login: Login): Promise<{ token: string }> {
    const { data } = await axios.post<{ token: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`,login);
    return data;
  }



  async register(registerData: UserRegister): Promise<void> {
    await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/auth/register`,registerData);
  }
}

const authService = new AuthService();
export default authService;
