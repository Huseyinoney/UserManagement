const mongoose = require("mongoose")
const database = () => {
        mongoose.connect(process.env.MONGO_URL, {

            useNewURLParser: true,
            useUnifiedTopology: true
        }).then(()=> {
            console.log("veritabanına bağlanıldı.")
        }).catch((err)=> {
            console.log("Bir hata oluştu bağlantı kurulamadı",err)
        })
    }

    module.exports = database