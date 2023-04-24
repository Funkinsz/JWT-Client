import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useContext } from "react";
import { AuthContext } from "../../context";

export default function Header() {
  const { user, signout } = useContext(AuthContext)

  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className={`flex-fill`}>
        <NavLink to = "/">Json Web Token</NavLink>
      </div>
      {
        user ? (
          <ul className={`${styles.desktopHeader}`}>
          <NavLink to = "profile" className={"mr10"}>
              Profile
            </NavLink>
            
            <NavLink onClick={() => signout()}>
              Déconnexion
            </NavLink>
          </ul>
        ) : (
          <ul className={`${styles.desktopHeader}`}>
          <NavLink to = "signin" className={"mr10"}>
              Connexion
            </NavLink>
            
            <NavLink to = "signup">
              Inscription
            </NavLink>
          </ul>
        )
      }
    </header>
  );
}
