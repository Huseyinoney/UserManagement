import React, { useEffect, useState } from 'react'
import styles from "./Register.module.css"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { register,clearMessage } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordComfirm, setPasswordComfirm] = useState("");
    const [age, setAge] = useState("");
    const [department, setDepartment] = useState("");
    const { message,isAuth } = useSelector(state => state.auth.auth)
    const dispatch = useDispatch();
   
    useEffect(() => {
        if(message) {
            toast.warning(message, {
                position: 'top-center',
                autoClose: 1000
            })
            dispatch(clearMessage())
        }
        if (isAuth) navigate("/Home")

    }, [message,isAuth])

    const handleRegister = () => {
        
        dispatch(register({ email, password,passwordComfirm, name, age, department }))

    }

return (
    <div className={styles.MainContainer}>
        <div className={styles.InnerContainer}>
            <div className={styles.FormContainer}>
                <form className={styles.Form}>
                    <div className={styles.PageTextContainer}>
                        <h2>Kayıt Ol</h2>
                    </div>
                    <div className={styles.NameContainer}>
                        <label id='nameLabel' htmlFor='nameInput'>İsim</label>
                        <input className={styles.Input} id='nameInput' value={name} type='text' onChange={(e) => { setName(e.target.value) }} placeholder='İsminizi Giriniz' />
                    </div>
                    <div className={styles.EmailContainer}>
                        <label id='emailLabel' htmlFor='emailInput'>Email</label>
                        <input className={styles.Input} id='emailInput' value={email} type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='E-mail Giriniz' />
                    </div>
                    <div className={styles.PasswordContainer}>
                        <label id='passwordLabel' htmlFor='passwordInput'>Şifre</label>
                        <input className={styles.Input} id='passwordInput' value={password} type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Şifrenizi Giriniz' />
                    </div>
                    <div className={styles.PasswordContainer}>
                        <label id='passwordComfirmLabel' htmlFor='passwordComfirmInput'>Şifre Doğrulama</label>
                        <input className={styles.Input} id='passwordComfirmInput' value={passwordComfirm} type='password' onChange={(e) => { setPasswordComfirm(e.target.value) }} placeholder='Şifrenizi Tekrar Giriniz' />
                    </div>

                    <div className={styles.DepartmentContainer}>
                        <label id='departmentLabel' htmlFor='departmentInput'>Bölüm</label>
                        <input className={styles.Input} id='departmentInput' value={department} type='text' onChange={(e) => { setDepartment(e.target.value) }} placeholder="Bölümünüzü giriniz" />
                    </div>
                    <div className={styles.AgeContainer}>
                        <label id='ageLabel' htmlFor='ageInput'>Yaş</label>
                        <input className={styles.Input} id='ageInput' value={age} type='number' onChange={(e) => { setAge(e.target.value) }} placeholder='Yaşınızı Giriniz' />
                    </div>

                    <div className={styles.BtnContainer}>
                        <button type='button' id={styles.EnterBtn} className={styles.Btn} onClick={() => handleRegister()}>Kaydol</button>
                    </div>
                    <div className={styles.BottomTextContainer}>
                        {/* Buraya zaten bir hesabın mı var yazısı link olarak eklenecek ve tıklandığında giriş yap sayfasına yönlendirme yapacak*/}
                        <h2>Zaten Bir Hesabın mı Var ? <NavLink className={styles.EntryPageReturn} to={"/"}>Giriş Yap</NavLink></h2>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}
export default Register 