import { useContext } from "react";
import "./Header.css";
import logo from "../../../assets/logo.svg";
import AuthContext from "../../auth/auth/AuthContext";
import { useNavigate } from "react-router-dom";

function isAdminFromToken(token: string): boolean {
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    const json = atob(payloadBase64);
    const payload = JSON.parse(json);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function getUserEmailFromToken(token: string): string | null {
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const json = atob(payloadBase64);
    const payload = JSON.parse(json) as {
      email?: string;
    };

    return payload.email || null;
  } catch {
    return null;
  }
}

export default function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  const token = authContext?.token ?? "";
  const isAdmin = isAdminFromToken(token);
  const userEmail = getUserEmailFromToken(token);

  return (
    <div className="Header">
      <div className="Header-spacer" />

      <div className="Header-center">
        <img
          src={logo}
          alt="logo"
          className="Header-logoImage"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="Header-right">
        {isAdmin && (
          <>
            <button
              className="Header-addButton"
              onClick={() => navigate("/vacations/new")}
            >
              Add
            </button>

            <button
              className="Header-statButton"
              onClick={() => navigate("/statistics")}
            >
              Statistics
            </button>
          </>
        )}

        <div className="Header-userBlock">
          {!isAdmin && userEmail && (
            <span className="Header-email">{userEmail}</span>
          )}

          {!isAdmin && (
            <button
              className="Header-favoriteButton"
              onClick={() => navigate("/favorites")}
            >
              Favorites
            </button>
          )}

          <button
            className="Header-logoutButton"
            onClick={() => {
              authContext?.newToken("");
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
