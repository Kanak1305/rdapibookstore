const express = require('express');
const UserController = require('../controllers/UserController')
const router = express.Router();
const bodyParser = require("body-parser");


router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
router.post('/admin/login', (req, res) => {
    UserController.doAdminLogin(req, res)
})
router.get('/users',(req,res)=>{
    UserController.getUsers(req,res)
})
module.exports = router