const User = require("../models/user");
const Book = require("../models/books");

exports.createUser = async (req, res) => {
  try {
    const { name, address } = req.body;
    const newUser = await User.create({ name, address });
    res.status(201).json({ 
        success: true,
         data: newUser });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err});
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({
             success: false, 
             message: "User not found"
             });

    const book = await Book.findById(bookId);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });

    if (!user.borrowedBooks.includes(bookId)) {
      user.borrowedBooks.push(bookId);
      await user.save();
    }

    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ 
        success: false, 
        error: err });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("borrowedBooks");
    if (!user)
      return res
        .status(404)
        .json({ 
            success: false,
             message: "User not found" });
    res.json({ 
        success: true,
         data: user });
  } catch (err) {
    res.status(500).json({ 
        success: false,
         error: err });
  }
};
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().populate("borrowedBooks");
    if (users.length === 0)
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
exports.delBorrowedBook = async (req, res) => {
  try{
    const { userId, bookId } = req.body;
    const borrowedUser=await User.findById(userId);
    if(!borrowedUser){
      return res.status(404).json({
        success:false,
        message:"user not found"
      })
    }
    const bookIndex=borrowedUser.borrowedBooks.indexOf(bookId);
    if(bookIndex===-1){
      return res.status(404).json({
        success:false,
        message:"book not found in user's borrowed books"
      })

    }
    borrowedUser.borrowedBooks = borrowedUser.borrowedBooks.filter(book => book.toString() !== bookId);
    await borrowedUser.save();
    res.json({
      success:true,
      message:"book removed from user's borrowed books",
      data:borrowedUser
    })
  }catch(err){
    res.status(500).json({
      success:false,
      error:err.message
    })
  }
}