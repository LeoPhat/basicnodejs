var express = require ("express")
var app = express()
app.set ("views", "./views")
app.set ("view engine", "ejs")

app.listen(3000)

//bodyParser
var bodyParser = require ("body-parser")
app.use (bodyParser.urlencoded({extended: false}))

//Mongoose
var mongoose = require ("mongoose")
mongoose.connect ('mongodb+srv://Dinh:V@nTu0ng@phatcluster-k1j44.mongodb.net/APIServer_1?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true}, function(err){
    if (err) {
        console.log("Lỗi kết nối DB")
    } else {
        console.log("Kết nối MongoDB thành công")
    }
})
mongoose.set('useFindAndModify', true)

//Models
const User = require ("./models/User")

//Bcrypt
const bcrypt = require ("bcrypt")
const saltRounds = 10

//Gmail-Send
// const send = require('gmail-send')({
//     user: 'rawlskant9@gmail.com',
//     pass: '@D@ngThiH0@ngPhu0ng'
// });

//User - Register
app.post("/user/register", (req, res)=>{
    //Check username or email exist
    User.find({
        "$or": [{
            "Username": req.body.Username
        }, {
            "Email": req.body.Email
        }]
    }, function(err, data){
        if (data.length == 0) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.Password, salt, function(errBam, hash) {
                    if (!err) {
                        var khachhang = new User ({
                            Username: req.body.Username,
                            Password: hash,
                            Active: false,
                            CodeActive: RandomString(30),
                            Group: 0,
                            RegisterDate: Date.now(),
                    
                            HoTen: req.body.HoTen,
                            Email: req.body.Email,
                            SoDT: req.body.SoDT,
                            DiaChi: req.body.DiaChi
                        })
                        khachhang.save(function(errSave){
                            if (errSave) {
                                // Gởi mail active
                                //http://localhost:3000/active/:CodeActive

                                res.json({"kq":0, "errMsg":errSave})
                            } else {
                                res.json({"kq":1})
                            }
                        })
                    } else {
                        res.json ({"kq": 0, "errMsg":errBam})
                    }
                });
            });
        } else {
            res.json({"kq":0, "errMsg":"Email or Username is not available"})
        }
    })        
})

//User - Active
app.get("/active/:CodeActive", (req, res)=>{
    User.findOne({CodeActive: req.params.CodeActive}, (err, data)=>{
        if (err) {
            res.json({"kq":0, "errMsg":err})
        } else {
            if (data.length==0){
                res.json({"kq":0, "errMsg":"Code Active không tồn tại"})
            } else {
                if (data.Active == false) {
                    //Update Active to True
                    User.findOneAndUpdate({_id:data._id},{Active:true},(error)=>{
                        if (error) {
                            res.json({"kq":0, "errMsg":error})
                        } else {
                            res.json({"kq": "Kích hoạt thành công" })
                        }
                    })
                } else {
                    res.json({"kq":0, "errMsg":"Code này đã được active!!!"})
                }
            }            
        }
    })
})


//User - Login

app.get("/",(req, res)=>{
    res.render("welcome.ejs")
})
app.get("/phat",(req, res)=>{
    res.send ("Dinh Van Vinh Phat deployed successfully")    
})
//Functions
function RandomString(n){
    var result = "";
    var arr = ["1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","A","B","C","D","E","F"];
    for(var i=1; i<=n; i=i+1 ){
        var r = Math.floor(Math.random() * arr.length); 
        result = result + arr[r];
    }
    return result;
}
