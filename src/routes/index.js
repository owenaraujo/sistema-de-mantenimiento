const express =require('express')
const router = express.Router();


// Index

router.get('/', (req,res)=>{
    res.send("Hello Word");
})
module.exports = router