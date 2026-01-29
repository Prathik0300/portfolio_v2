import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span>Available for full-stack, cloud, and infrastructure roles.</span>
          <div className={styles.contactIcons}>
            <a 
              className={styles.iconButton} 
              href="mailto:prathik0300@gmail.com"
              aria-label="Email prathik0300@gmail.com"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a 
              className={styles.iconButton} 
              href="tel:+13128893640"
              aria-label="Call +1 3128893640"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
          <span>Based in Chicago, IL, USA.</span>
          <nav className={styles.footerNav} aria-label="Footer navigation">
            <a href="#about" className={styles.footerLink}>
              About
            </a>
            <a href="#skills" className={styles.footerLink}>
              Skills
            </a>
            <a href="#projects" className={styles.footerLink}>
              Projects
            </a>
          </nav>
          <span>© {year} Prathik Pugazhenthi. All rights reserved.</span>
        </div>
        <div className={styles.right} aria-label="Social links">
          <a
            className={styles.resumeButton}
            href="/Prathik_Pugazhenthi_Resume.pdf"
            download="Prathik_Pugazhenthi_Resume.pdf"
          >
            Download resume
          </a>
          <a
            className={styles.socialLink}
            href="https://github.com/Prathik0300"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.socialLink}
            href="https://www.linkedin.com/in/prathik-pugazhenthi-487855177/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

