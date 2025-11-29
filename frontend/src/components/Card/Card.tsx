import "./Card.css"
import type Vacation from "../../models/vacation"

interface CardProps {
  vacation: Vacation
  isLiked: boolean
  onToggleLike?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function Card({ vacation, isLiked, onToggleLike, onEdit, onDelete }: CardProps) {
  const start = new Date(vacation.startDate).toLocaleDateString()
  const end = new Date(vacation.endDate).toLocaleDateString()
  const heartSymbol = isLiked ? "♥" : "♡"

  return (
    <article className="Card">
      <div className="Card-imageWrapper">
        <img
          className="Card-image"
          src={vacation.imageUrl}
          alt={vacation.destination}
        />

        {onToggleLike && (
          <button
            className="Card-likeButton"
            onClick={onToggleLike}
          >
            <span className={isLiked ? "Card-heart Card-heart--active" : "Card-heart"}>
              {heartSymbol}
            </span>
            <span className="Card-likesCount">
              {vacation.likesCount}
            </span>
          </button>
        )}
      </div>

      <div className="Card-body">
        <h3 className="Card-title">{vacation.destination}</h3>

        <p className="Card-dates">
          {start} – {end}
        </p>

        <p className="Card-description">
          {vacation.description}
        </p>

        <div className="Card-footer">
          <span className="Card-price">
            Price: {vacation.price} ₪
          </span>
        </div>

        {(onEdit || onDelete) && (
          <div className="Card-actions">
            {onEdit && (
              <button onClick={onEdit}>
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
