import styles from './footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <span>© 2024 Wszelkie prawa zastrzeżone.</span>
      </div>
    </footer>
  );
};

export default Footer;
