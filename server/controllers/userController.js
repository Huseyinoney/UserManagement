const userSchema = require("../models/user")

const getAllUser = async (req, res) => {
    try {
        const users = await userSchema.find()
        return res.status(200).json({
            users: users
        })
    } catch (error) {
        return res.status(400).json({
            msg: "bir hata oluştu"
        })
    }
}
const deleteUser = async (req, res) => {
    if(req.user.role !== "Admin") return res.status(401).json({
        msg:"yetkisiz işlem"
    })
    try {
        const _id = req.params.id
        await userSchema.findByIdAndRemove({ _id })
        res.status(200).json({
            msg: "Kullanıcı başarıyla silindi.",
            id:_id
        })
    } catch (error) {
        res.status(400).json({
            msg: "Kullanıcı silinirken bir hata oluştu",
            error
        })
    }
}
const updateUser = async(req,res) => {
    
    if(req.user.role !=="Admin") return res.status(401).json({
        msg:"Yetkisiz işlem"
    })
    const {email,department,age} = req.body;
    if(!email || !department || !age) return res.status(400).json({
        msg:"Bütün alanlar dolu olmalı"
    })
    try {
        const id = req.params.id
        user= await userSchema.findByIdAndUpdate(id,{email:email,department:department,age:age})

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            
            msg:error
        })
    }
    
}


module.exports = { getAllUser, deleteUser ,updateUser}