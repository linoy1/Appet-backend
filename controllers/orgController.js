const Org = require('../models/org');
const Dog = require('../models/dog');
const fetch = require('node-fetch');
exports.orgController = {
    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        Org.findOne({ email: req.body.email, password: req.body.password })
            .then((docs) => {
                if (docs) res.json(docs);
                else res.json({ msg: 'user authentication failed' });
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getOrgs(req, res) {
        Org.find({})
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    addOrg(req, res) {
        Org.findOne()
            .sort('-id')
            .exec((err, item) => {
                const newOrg = new Org({
                    id: item.id + 1,
                    //id: 1,
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    city: req.body.city,
                });

                const result = newOrg.save();
                if (result) {
                    res.json(newOrg);
                } else {
                    res.status(404).send('Error');
                }
            });
    },
    getOrgById(req, res) {
        Org.findOne({ id: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    updateOrg(req, res) {
        const oldOrg = Org.findOne({ id: req.params.id });
        Org.updateOne({ id: req.params.id }, {
                id: req.params.id,
                email: req.body.email || oldOrg.email,
                password: req.body.password || oldOrg.password,
                name: req.body.name || oldOrg.name,
                city: req.body.city || oldOrg.city,
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    deleteOrg(req, res) {
        Org.deleteOne({ id: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    getDogs(req, res) {
        Dog.find({ organizationId: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
    addDog(req, res) {
        Dog.findOne()
            .sort('-id')
            .exec((err, item) => {
                orgId = req.params.id;

                fetch(`https://api.thedogapi.com/v1/breeds/search?q=${req.body.breed}`)
                    .then((response) => response.json())
                    .then((data) => {
                        //console.log(data);
                        const newDog = new Dog({
                            id: item.id + 1,
                            // id: 1,
                            name: req.body.name,
                            breed: req.body.breed,
                            age: req.body.age,
                            organizationId: orgId,
                            status: 'free',
                            userId: 0,
                            temperament: data[0].temperament,
                            lifespan: data[0].life_span
                        });

                        const result = newDog.save();
                        if (result) {
                            res.json(newDog);
                        } else {
                            res.status(404).send('Error');
                        }
                    })
                    .catch((err) => console.log(err));
            });
    },
    deleteDog(req, res) {
        Dog.deleteOne({ id: req.params.dogId, organizationId: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error updating resturant from db:${err}`));
    },

    getDogById(req, res) {
        Dog.findOne({ id: req.params.dogId, organizationId: req.params.id })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error updating resturant from db:${err}`));
    },

    updateDog(req, res) {
        const oldDog = Dog.findOne({
            id: req.params.dogId,
            organizationId: req.params.id,
        });
        Dog.updateOne({ id: req.params.dogId }, {
                id: req.params.dogId,
                name: req.body.name || oldDog.name,
                breed: req.body.breed || oldDog.breed,
                age: req.body.age || oldDog.age,
                organizationId: req.params.id,
                status: req.body.status || oldDog.status,
                userId: oldDog.userId,
                temperament: oldDog.temperament,
                lifespan: oldDog.lifespan
            })
            .then((docs) => {
                res.json(docs);
            })
            .catch((err) => console.log(`Error getting the data from db:${err}`));
    },
};