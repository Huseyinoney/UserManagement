import React from 'react'
import styles from "./table.module.css"
import { deleteUser } from '../../redux/auth/userSlice'
import { useDispatch, useSelector } from "react-redux"


const Table = ({ openUpdateModal, setUpdateUser,users,user}) => {
    const dispatch = useDispatch()
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <div className={styles.MainContainer}>
            <table className={styles.Table}>
                <thead className={styles.Header}>
                    <tr>
                        <th>isim</th>
                        <th>E-Posta</th>
                        <th>Bölüm</th>
                        <th>Yaş</th>
                        {user && user.role === "Admin" &&
                            <th>İşlemler</th>}
                    </tr>
                </thead>
                <tbody className={styles.Body}>
                    {users && users?.map((userItem) => (
                        <tr key={userItem._id} className={styles.Item}>
                            <td>{userItem.username}</td>
                            <td>{userItem.email}</td>
                            <td>{userItem.department}</td>
                            <td>{userItem.age}</td>
                            {user && user.role === "Admin" &&
                                <td>
                                    <button id={styles.UpdateButton} className={styles.Button} onClick={() => {
                                        openUpdateModal(); setUpdateUser({
                                            id:userItem._id,
                                            email: userItem.email,
                                            department: userItem.department,
                                            age: userItem.age
                                        })
                                    }}>Düzenle</button>
                                    <button id={styles.DeleteButton} className={styles.Button} onClick={() => { handleDeleteUser(userItem._id) }}>Sil</button>
                                </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Table;
