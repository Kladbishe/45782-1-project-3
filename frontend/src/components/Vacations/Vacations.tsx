import { useContext, useEffect, useState } from "react"
import "./Vacations.css"
import AuthContext from "../auth/auth/AuthContext"
import type Vacation from "../../models/vacation"
import VacationsService from "./../../services/vacations"
import { useNavigate } from "react-router-dom"
import { Card } from "../Card/Card"
import likesService from "../../services/like"

function getRoleFromToken(token: string): "admin" | "user" | null {
  try {
    const payloadBase64 = token.split(".")[1]
    const json = atob(payloadBase64)
    const payload = JSON.parse(json)
    return payload.role ?? null
  } catch {
    return null
  }
}

function getUserIdFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1]
    const json = atob(payloadBase64)
    const payload = JSON.parse(json)
    return payload.sub ?? null
  } catch {
    return null
  }
}

export default function Vacations() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [vacations, setVacations] = useState<Vacation[]>([])
  const [error, setError] = useState<string | null>(null)

  const token = authContext?.token || ""
  const role = token ? getRoleFromToken(token) : null
  const isAdmin = role === "admin"
  const userId = token ? getUserIdFromToken(token) : null

  useEffect(() => {
    ;(async () => {
      try {
        setError(null)

        const data = await VacationsService.getAll()

        if (!userId) {
          setVacations(data.map(v => ({ ...v, isLiked: false })))
          return
        }

        const likes = await likesService.allLikesUser(userId)
        const likedSet = new Set(likes.likedVacations)

        setVacations(
          data.map(v => ({
            ...v,
            isLiked: likedSet.has(v.id),
          }))
        )
      } catch (e) {
        console.log(e)
        setError("Failed to load vacations")
      }
    })()
  }, [userId])

  async function handleDelete(vacationId: string) {
    const ok = window.confirm("Are you sure you want to delete this vacation?")
    if (!ok) return

    try {
      await VacationsService.remove(vacationId)
      setVacations(prev => prev.filter(v => v.id !== vacationId))
    } catch (e) {
      console.log(e)
      setError("Failed to delete vacation")
    }
  }

  async function handleToggleLike(vacationId: string) {
    if (!userId) return

    const current = vacations.find(v => v.id === vacationId)
    const isLikedNow = current?.isLiked ?? false

    setVacations(prev =>
      prev.map(v => {
        if (v.id !== vacationId) return v
        const newIsLiked = !isLikedNow
        const newLikes = v.likesCount + (newIsLiked ? 1 : -1)
        return { ...v, isLiked: newIsLiked, likesCount: newLikes }
      })
    )

    try {
      if (isLikedNow) {
        await likesService.unlike(userId, vacationId)
      } else {
        await likesService.like(userId, vacationId)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="Vacations">
      {error && <div className="Vacations-error">{error}</div>}

      <div className="Vacations-grid">
        {vacations.map(vacation => (
          <Card
            key={vacation.id}
            vacation={vacation}
            isLiked={!!vacation.isLiked}
            onToggleLike={!isAdmin ? () => handleToggleLike(vacation.id) : undefined}
            onEdit={
              isAdmin ? () => navigate(`/vacations/${vacation.id}/edit`) : undefined
            }
            onDelete={isAdmin ? () => handleDelete(vacation.id) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
