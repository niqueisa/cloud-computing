import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Create a new Book
router.post('/', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;
    if (!title || !author || !publishYear) {
      return response.status(400).send({ message: 'Send all required fields: title, author, publishYear' });
    }
    const book = await Book.create({ title, author, publishYear });
    return response.status(201).send(book);
  } catch (error) {
    console.error('CREATE_BOOK_ERROR:', error.message); // Added for AWS Log visibility
    response.status(500).send({ message: error.message });
  }
});

// Get All Books
router.get('/', async (request, response) => {
  try {
    const books = await Book.findAll();
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('GET_BOOKS_ERROR:', error.message); // Added for AWS Log visibility
    response.status(500).send({ message: error.message });
  }
});

// Get One Book by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findByPk(id); 
    if (!book) return response.status(404).json({ message: 'Book not found' });
    return response.status(200).json(book);
  } catch (error) {
    console.error('GET_SINGLE_BOOK_ERROR:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a Book
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    // Sequelize update returns an array: [number of affected rows]
    const [updatedRows] = await Book.update(request.body, { where: { id } });
    if (updatedRows === 0) return response.status(404).json({ message: 'Book not found' });
    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('UPDATE_BOOK_ERROR:', error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedCount = await Book.destroy({ where: { id } });
    if (deletedCount === 0) return response.status(404).json({ message: 'Book not found' });
    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('DELETE_BOOK_ERROR:', error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;