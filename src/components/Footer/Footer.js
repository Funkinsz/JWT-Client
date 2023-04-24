import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex justify-content-center align-items-center p10`}
    >
      <p>Copyright © 2023 JWT Inc.</p>
    </footer>
  );
}
