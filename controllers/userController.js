const User = require('../models/user');
const Dog = require('../models/dog');
exports.userController = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email: req.body.email, password: req.body.password })
            .then((docs) => {
                if (docs) res.json(docs);
                else res.json({ msg: 'user authentication failed' });
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getUsers(req, res) {
        User.find({})
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    addUser(req, res) {
        User.findOne()
            .sort('-id')
            .exec((err, item) => {
                const newUser = new User({
                    id: item.id + 1,
                    //id: 1,
                    email: req.body.email,
                    password: req.body.password,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    city: req.body.city,
                });

                const result = newUser.save();
                if (result) {
                    res.json(newUser);
                } else {
                    res.status(404).send('Error');
                }
            });
    },
    getUserById(req, res) {
        User.findOne({ id: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    updateUser(req, res) {
        const oldUser = User.findOne({ id: req.params.id });
        User.updateOne({ id: req.params.id }, {
                id: req.params.id,
                email: req.body.email || oldUser.email,
                password: req.body.password || oldUser.password,
                firstname: req.body.firstname || oldUser.firstname,
                lastname: req.body.lastname || oldUser.lastname,
                city: req.body.city || oldUser.city,
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    deleteUser(req, res) {
        User.deleteOne({ id: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getAllDogs(req, res) {
        Dog.find({ status: 'free' })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getDogById(req, res) {
        Dog.find({ id: req.params.dogId })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getAllDogs(req, res) {
        Dog.find({ status: 'free' })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    myInterests(req, res) {
        Dog.find({ userId: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    startAdoption(req, res) {
        const oldDog = Dog.findOne({
            id: req.params.dogId,
        });
        Dog.updateOne({ id: req.params.dogId }, {
                id: req.params.dogId,
                name: oldDog.name,
                breed: oldDog.breed,
                age: oldDog.age,
                organizationId: oldDog.organizationId,
                status: 'in progress',
                userId: req.params.id,
                temperament: oldDog.temperament,
                lifespan: oldDog.lifespan
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    completeAdoption(req, res) {
        const oldDog = Dog.findOne({
            id: req.params.dogId,
        });
        Dog.updateOne({ id: req.params.dogId }, {
                id: req.params.dogId,
                name: oldDog.name,
                breed: oldDog.breed,
                age: oldDog.age,
                organizationId: oldDog.organizationId,
                status: 'completed',
                userId: req.params.id,
                temperament: oldDog.temperament,
                lifespan: oldDog.lifespan
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    cancelAdoption(req, res) {
        const oldDog = Dog.findOne({
            id: req.params.dogId,
        });
        Dog.updateOne({ id: req.params.dogId }, {
                id: req.params.dogId,
                name: oldDog.name,
                breed: oldDog.breed,
                age: oldDog.age,
                organizationId: oldDog.organizationId,
                status: 'free',
                userId: 0,
                temperament: oldDog.temperament,
                lifespan: oldDog.lifespan
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
};