import { useContext, useEffect, useState } from "react";
import "./FavoriteVacation.css";
import AuthContext from "../auth/auth/AuthContext";
import vacationsService from "../../services/vacations";

import type Vacation from "../../models/vacation";
import likesService from "../../services/like";
import { Card } from "../Card/Card";

function getUserIdFromToken(token: string): string | null {
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const json = atob(payloadBase64);
    const payload = JSON.parse(json) as { sub?: string };
    return payload.sub || null;
  } catch {
    return null;
  }
}

export default function FavoriteVacation() {
  const auth = useContext(AuthContext);
  const token = auth?.token ?? "";
  const userId = getUserIdFromToken(token);

  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const allVacations = await vacationsService.getAll();
        const likes = await likesService.allLikesUser(userId);
        setVacations(allVacations);
        setLikedIds(likes.likedVacations);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userId]);

  const favoriteVacations = vacations.filter(v =>
    likedIds.includes(v.id)
  );

  async function handleToggleLike(vacationId: string) {
    if (!userId) return;

    await likesService.unlike(userId, vacationId);

    setLikedIds(prev => prev.filter(id => id !== vacationId));
    setVacations(prev =>
      prev.map(v =>
        v.id === vacationId
          ? { ...v, likesCount: v.likesCount - 1 }
          : v
      )
    );
  }

  return (
    <div className="FavoriteVacation">
      <h2 className="FavoriteVacation-title">Favorite vacations</h2>

      <div className="Vacations-grid">
        {favoriteVacations.map(vacation => (
          <Card
            key={vacation.id}
            vacation={vacation}
            isLiked={true}
            onToggleLike={() => handleToggleLike(vacation.id)}
          />
        ))}

        {favoriteVacations.length === 0 && (
          <div className="FavoriteVacation-empty">
            You have no favorite vacations yet.
          </div>
        )}
      </div>
    </div>
  );
}
