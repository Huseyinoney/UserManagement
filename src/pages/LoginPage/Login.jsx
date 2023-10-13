import React, { useState, useEffect } from 'react'
import styles from "./Login.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { clearMessage, login,setEmailPassword } from '../../redux/auth/authSlice';
import { toast } from 'react-toastify';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {message,isAuth,token} = useSelector(state => state.auth.auth)
    
    useEffect(() => {
        if(message) {
            toast.warning(message, {
                position: 'top-center',
                autoClose: 1000
            })
            dispatch(clearMessage())
        }
        if(isAuth && token) {
            navigate("/Home")
        }
        

    }, [token,isAuth,message])

    const handleSubmit = (e) => {
        e.preventDefault();
    dispatch(login({ email, password }))
   
    }
 
    const handleCreateAccount = () => {
        navigate("/Register")
    }

    return (
        <div className={styles.MainContainer}>

            <div className={styles.InnerContainer}>
                <div className={styles.FormContainer}>
                    <form className={styles.Form} onSubmit={handleSubmit}>
                        <div className={styles.EmailContainer}>
                            <label id='emailLabel' htmlFor='emailInput'>Email</label>
                            <input className={styles.Input} id='emailInput' value={email} type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='E-mail Giriniz' />
                        </div>
                        <div className={styles.PasswordContainer}>
                            <label id='passwordLabel' htmlFor='passwordInput'>Şifre</label>
                            <input className={styles.Input} id='passwordInput' value={password} type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Şifrenizi Giriniz' />
                        </div>
                        <div className={styles.BtnContainer}>
                            <button type='submit' className={styles.Btn} onClick={handleSubmit}>Giriş Yap</button>
                            <button type="button" className={styles.Btn} onClick={handleCreateAccount}>Hesap Oluştur</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;