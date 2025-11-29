import { Route, Routes } from "react-router-dom";
import Vacations from "../../Vacations/Vacations";

import VacationForm from "../../VacationForm/VacationForm";
import NotFound from "../not-found/NotFound";
import FavoriteVacation from "../../FavoriteVacation/FavoriteVacation";
import Statistics from "../../statistics/Statistics";


export default function Main() {
    return (
        <Routes>
            <Route path="/" element={<Vacations />} />
             <Route path="/favorites" element={<FavoriteVacation />} />
            <Route path="/vacations/new" element={<VacationForm />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/vacations/:id/edit" element={<VacationForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
