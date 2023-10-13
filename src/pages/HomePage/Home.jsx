import React, { useEffect, useState } from 'react'
import Table from '../../components/Table/Table'
import styles from "./Home.module.css"
import UpdateTable from '../../components/UpdateTable/UpdateTable'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logOut } from '../../redux/auth/authSlice';
import { getAllUser } from '../../redux/auth/userSlice';
export const Home = () => {
  const {token,user} = useSelector(state => state.auth.auth)
  const { users } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false)
  const [updateUser, setUpdateUser] = useState({
    email: "",
    department: "",
    age: ""
  })
  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(getAllUser())
      
    }
  },[])
  useEffect(() => {
    if(localStorage.getItem("token")) {
      dispatch(getAllUser())
      
    }
  },[users])
  useEffect( () => {
    if(!localStorage.getItem("token")) {
      navigate("/")
    }
  },[token])

  const closeUpdateModal = () => {
    setOpenModal(false)
  }
  const openUpdateModal = () => {
    setOpenModal(true)
  }
  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={styles.MainContainer}>
      <Table openUpdateModal={openUpdateModal} setUpdateUser={setUpdateUser}  users = {users} user = {user}/>
      {
        openModal && <UpdateTable closeUpdateModal={closeUpdateModal} updateUserInfo={updateUser}  />
      }
      <button id={styles.LogOutBtn} className={styles.LogOutBtn} onClick={() => { handleLogOut() }}>Çıkış Yap</button>
    </div>
  )
}
