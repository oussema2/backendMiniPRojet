const router = require('express').Router();
let User = require('../models/user.model');
const uploadsUser = require('../multers/multerUser');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error :' + err));
});

router.route('/add').post(uploadsUser.single("avatar"), (req, res) => {
    console.log(req.file)
    const userName = req.body.userName;
    const IGN = req.body.IGN;
    const userPrenom = req.body.userPrenom;
    const userDate = req.body.userDate;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const age = req.body.age;
    const avatar = req.file.filename;
    const newUser = new User({
        IGN,
        userName,
        userPrenom,
        userDate,
        userEmail,
        userPassword,
        age,
        avatar
    })

    newUser.save()
        .then(() => res.json('user added'))
        .catch(err => {
            res.status(400).json('Error :' + err);
        });


});

router.route('/update/:id').post((req, res) => {

    const userName = req.body.userName;
    const IGN = req.body.IGN;
    const userPrenom = req.body.userPrenom;
    const userDate = req.body.userDate;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const age = req.body.age;
    const avatar = req.body.avatar;
    const dataForUpdate = {
        IGN,
        userName,
        userPrenom,
        userDate,
        userEmail,
        userPassword,
        age,
        avatar
    }

    User.findOneAndUpdate({ userId: req.params.id }, dataForUpdate, { new: false })
        .then(() => res.json('user Updated'))
        .catch((err => {
            res.status(400).json('Error :' + err)
        }))
})


router.route('/delete/:userId').delete((req, res) => {
    const id = req.params.userId;
    User.findOneAndDelete({ userId: id })
        .then(() => res.json('deleted'))
        .catch((err) => res.json("Error :" + err))

})

router.route('/login/:userName&:userPassword').get((req, res) => {
    const userName = req.params.userName;
    const userPassword = req.params.userPassword;

    User.findOne({ userName: userName, userPassword: userPassword })
        .then((data) => res.json(data))
        .catch((err) => res.json("Error :" + err))

})

router.route("/:id").get((req, res) => {
    const id = req.params.id;
    User.findOne({ userId: id })
        .then(user => res.json(user))
        .catch(err => res.json("Error :" + err))
})



module.exports = router;