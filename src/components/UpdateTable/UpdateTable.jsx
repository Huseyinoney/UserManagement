import React from 'react'
import styles from "./UpdateTable.module.css"
import { useState } from 'react';
import { useDispatch } from "react-redux"
import { updateUser } from '../../redux/auth/userSlice';

const UpdateTable = ({closeUpdateModal,updateUserInfo}) => {
    const [email, setEmail] = useState(updateUserInfo.email);
    const [age, setAge] = useState(updateUserInfo.age);
    const [department, setDepartment] = useState(updateUserInfo.department);
  
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
    dispatch(updateUser({
        id:updateUserInfo.id,
        email:email,
        department:department,
        age:age
    }
    
    ))
    closeUpdateModal()
   
    }
  return (
    <div className={styles.MainContainer}
    onClick={(e) => {
        if(e.target.className === styles.MainContainer)
        closeUpdateModal();
    }}>
    <div className={styles.InnerContainer}>
        <div className={styles.FormContainer}>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <div className={styles.EmailContainer}>
                    <label id='emailLabel' htmlFor='emailInput'>Email</label>
                    <input className={styles.Input} id='emailInput' value={email} type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='E-mail Giriniz' />
                </div>
                <div className={styles.DepartmentContainer}>
                    <label id='departmentLabel' htmlFor='departmentInput'>Bölüm</label>
                    <input className={styles.Input} id='departmentInput' value={department} type='text' onChange={(e) => { setDepartment(e.target.value) }} placeholder = "Bölümünüzü giriniz" />
                </div>
                <div className={styles.AgeContainer}>
                    <label id='ageLabel' htmlFor='ageInput'>Yaş</label>
                    <input className={styles.Input} id='ageInput' value={age} type='number' onChange={(e) => { setAge(e.target.value) }} placeholder='Yaşınızı Giriniz' />
                </div>

                <div className={styles.BtnContainer}>
                    <button type='submit' id={styles.EnterBtn} className={styles.Btn} >Kaydet</button>
                </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default UpdateTable
