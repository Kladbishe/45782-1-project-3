
import axios from "axios";
import type UserLikes from "../models/UserLIke";

class LikesService {
  
    async like(userId: string, vacationId: string): Promise<void> {await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/likes`,{ userId, vacationId })}

    async unlike(userId: string, vacationId: string): Promise<void> {await axios.delete(`${import.meta.env.VITE_REST_SERVER_URL}/likes`,
        {
        data: { userId, vacationId },
        }
    );
  }


    async allLikesUser(userId: string): Promise<UserLikes> {
    const { data } = await axios.get<UserLikes>(`${import.meta.env.VITE_REST_SERVER_URL}/likes/${userId}`)
    return data;
  }

}

const likesService = new LikesService();
export default likesService;
