const book=require('../models/books');

exports.createBook=async(req,res)=>{
    try {
        const { name, author, description, price } = req.body;
        if (!name || !author || !price ) {
            return res.status(400).json({
                success: false,
                message: "name, author, and price are required"
            });
        }
        const newBook = await book.create({ name, author, description, price });
        res.status(201).json({
            success: true,
            data: newBook
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getAllBooks=async(req,res)=>{
    try{
        const books=await book.find();
        res.json({
            success:true,
            data:books
        });
    }catch(err){
        res.json({
            success:false,
            error:err.message
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await book.findByIdAndDelete(req.params.id);
        if (!deletedBook)
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        res.json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};