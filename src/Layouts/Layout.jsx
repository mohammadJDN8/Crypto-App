import styles from '../Layouts/Layout.module.css'

function Layout({children}) {
  return (
    <>
      <header className={styles.header}>
      <h1>Crypto App</h1>
      <h2>JDN8 || React full Course</h2>
      </header>
      {children}
      <footer className={styles.footer}>
      <p>Developed by MohammadJDN8 With ❤️</p>
      </footer>
    </>
  )
}

export default Layout
