const express = require('express');
const router = express.Router();
const {
  createUser,
  borrowBook,
  getUserById,
  getAll,
  delBorrowedBook,
} = require("../controller/userController");


router.get('/all', getAll);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/borrow', borrowBook);
router.delete("/delBorrow", delBorrowedBook);


module.exports = router;