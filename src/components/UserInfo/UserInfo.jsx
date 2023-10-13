import React from 'react'
import styles from "./UserInfo.module.css"
 const UserInfo = (props) => {
  return (
    <div className = {styles.MainContainer}>
        <h2>{props.isim}</h2>
        <h2>{props.soyisim}</h2>
        <h2>{props.email}</h2>
    </div>
  )
}
export default UserInfo
