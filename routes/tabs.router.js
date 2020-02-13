const router = require("express").Router();
const Tab = require("../models/Tab");


router.post('/add', async (req, res)=>{
    
    try {

        const {id_name, title, order, path} = req.body;

        const newTab = new Tab({
            id_name,
            title,
            order,
            path,
        });

        await newTab.save();

        res.status(201).json({ message: "Added tab!" });
        res.status(201).json({ newTab });



    } catch (e) {
        res.status(500).json({message: 'error on post/add'})
    }
    
    
});


router.get("/", async (req, res) => {
    try {
        const tabs = await Tab.find();
        res.json(tabs);
    } catch (e) {
        res.status(500).json({ message: "get/ tabs error" });
    }
});


module.exports = router;