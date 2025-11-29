import axios from "axios";
import type Vacation from "../models/vacation";
import type VacationDraft from "../models/vacation-draft";


class VacationsService{
    async getAll(): Promise<Vacation[]>{
        const {data} = await axios.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/all`);
        return data
    }
    async create(draft: VacationDraft): Promise<Vacation> {
        const formData = new FormData()

        formData.append("destination", draft.destination)
        formData.append("description", draft.description)
        formData.append("startDate", draft.startDate)
        formData.append("endDate", draft.endDate)
        formData.append("price", String(draft.price))

        if (draft.image) {
            formData.append("image", draft.image)
        }

        const { data } = await axios.post<Vacation>(
            `${import.meta.env.VITE_REST_SERVER_URL}/vacations`,
            formData,
            {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            }
        )

        return data
    }



    
    async remove(id: string): Promise<void> {
    await axios.delete(
        `${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
}


    async update(id: string, draft: VacationDraft): Promise<Vacation> {
        const formData = new FormData();

            formData.append("destination", draft.destination);
            formData.append("description", draft.description);
            formData.append("startDate", draft.startDate);
            formData.append("endDate", draft.endDate);
            formData.append("price", String(draft.price));


        if (draft.image) {
            formData.append("image", draft.image);
        }

        const { data } = await axios.put<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`,formData,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
  return data;
}


}

export default new VacationsService();