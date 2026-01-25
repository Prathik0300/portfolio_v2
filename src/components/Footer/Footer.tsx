import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span>Available for full-stack, cloud, and infrastructure roles.</span>
          <a className={styles.emailLink} href="mailto:prathik0300@gmail.com">
            prathik0300@gmail.com
          </a>
          <span>Based in Chicago, IL, USA.</span>
          <span>© {year} Prathik Pugazhenthi. All rights reserved.</span>
        </div>
        <div className={styles.right} aria-label="Social links">
          <a
            className={styles.socialLink}
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.socialLink}
            href="https://linkedin.com/in/prathik-pugazhenthi-487855177"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className={styles.socialLink}
            href="https://x.com/your-username"
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

