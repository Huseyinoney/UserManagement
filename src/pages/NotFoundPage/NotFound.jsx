import React from 'react'
import styles from "./NotFound.module.css"
import { NavLink } from 'react-router-dom'
function NotFound() {
    return (
        <div className={styles.MainContainer}>

            <div className= {styles.TextContainer}>
                aradığınız sayfa bulunamadı!!
            </div>
            <div className={styles.NavTextContainer}>
                <NavLink className={styles.GoBack} to={"/"}>Giriş Sayfasına Geri Dönmek İçin Tıklayınız</NavLink>
            </div>
            </div>
            )
}

export default NotFound