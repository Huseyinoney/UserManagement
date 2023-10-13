const userSchema = require("../models/user")
const bcrypt = require("bcryptjs")
const {createToken} = require("../middleware/authMiddleware")
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  

const register = async (req, res) => {
    try {
        const { username, password,passwordConfirm, email, department, age } = req.body;
        if(!username || !password || !passwordConfirm || !email || !department || !age) return res.status(400).json({
            msg:"tüm alanlar dolu olmalı"
        })
         if(!validateEmail(email)) return res.status(400).json({
            msg:"Email geçerli değil"
        })
        if(password !== passwordConfirm ) return res.status(400).json({
            msg:"Şifreler uyuşmuyor"
        })
       
        if (password.length < 6) {
            return res.status(400).json({ msg: "Şifre 6 karakterden küçük olmamalı" })
        }
        const user = await userSchema.findOne({email})
        if (user) {
            return res.status(400).json({ msg: "böyle bir kullanıcı zaten var" })
        }
        const passwordhashed = await bcrypt.hash(password, 12)
        const newUser = await userSchema.create({
            username:username, email:email, password: passwordhashed, department:department, age:age
        })
         const token = createToken(newUser)
        res.status(201).json({
            token,
            newUser
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
           msg:err
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) return res.status(400).json({
            msg:"Kullanıcı adı ve şifre alanları dolu olmalı"
        })

        if(!validateEmail(email)) return res.status(400).json({
            msg:"Email geçerli değil"
        })
        const user = await userSchema.findOne({email})

        if (!user) {
            return res.status(404).json({
                msg: "Kullanıcı adı veya şifre hatalı"
            })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({
                msg: "Kullanıcı adı veya şifre hatalı"
            })
        }
        const token = createToken(user)
        res.status(200).json({
            token,
            user
        })
    } catch (error) {
        return res.status(400).json({
            msg:
                "Giriş işlemi başarısız"
        })
    }
}

const logOut = (req,res) => {
    req.user = null
    res.status(200).json({
        msg:"Başarıyla çıkış yapıldı"
    })
}

module.exports = { register, login,logOut }