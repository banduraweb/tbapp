const router = require("express").Router();
const Content = require("../models/Content");


router.post('/add:id_name', async (req, res)=>{

    try {
        console.log(req.params.id_name);
        const {content} = req.body;
        console.log(req.params.id_name);
        const newContent = new Content({
            content: content,
            tab_owner: req.params.id_name
        });

        await newContent.save();

        res.status(201).json({ message: "Added content!" });
        res.status(201).json({ newContent });


    } catch (e) {
        res.status(500).json({message: 'error on post/add'})
    }


});


router.get("/tbcontent/:id_name",  async (req, res) => {
    try {
        const content = await Content.find({ tab_owner: req.params.id_name });
        res.json(content);
    } catch (e) {
        res.status(500).json({ message: "error on get/tbcontent:id_name" });
    }
});


module.exports = router;