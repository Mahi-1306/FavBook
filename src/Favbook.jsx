import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Favbook() {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: '',
    status: 'Unread',
  });

  // Fetch books on load
  useEffect(() => {
    axios
      .get('http://localhost:3001/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again.');
      });
  }, []);

  // Handle input changes for form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    ['name', 'author', 'genre', 'status'].some((field) =>
      book[field]?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (isEdit && editId) {
        await axios.put(`http://localhost:3001/books/${editId}`, formData);
      } else {
        await axios.post('http://localhost:3001/books', formData);
      }
      const res = await axios.get('http://localhost:3001/books');
      setBooks(res.data);
      setFormData({ name: '', author: '', genre: '', status: 'Unread' });
      setIsEdit(false);
      setEditId(null);
      setOpen(false);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to save book. Please try again.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/books/${id}`);
      const res = await axios.get('http://localhost:3001/books');
      setBooks(res.data);
      setError(null);
    } catch (err) {
      console.error('Delete Error:', err);
      setError('Failed to delete book. Please try again.');
    }
  };

  return (
    <div>
      <div className="header">
        <h1>My Favourite Book</h1>
        <i className="bi bi-book-fill book fs-3"></i>
      </div>

      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</div>}

      <div className="content">
        <div style={{ margin: '20px 40px' }}>
          <input
            type="text"
            placeholder="Search by name, author, genre, or status"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '7px',
              margin: '8px 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              width: '250px',
              marginRight: '10px',
            }}
          />
          <button
            className="add"
            onClick={() => {
              setFormData({ name: '', author: '', genre: '', status: 'Unread' });
              setIsEdit(false);
              setEditId(null);
              setOpen(true);
            }}
          >
            Add
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>SNo</th>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.status}</td>
                  <td>
                    <Popup trigger={<button className="dots-button">⋮</button>} position="right center">
                      <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '4px', padding: '5px' }}>
                        <button
                          className="edit"
                          onClick={() => {
                            setFormData({
                              name: book.name,
                              author: book.author,
                              genre: book.genre,
                              status: book.status,
                            });
                            setEditId(book.id);
                            setIsEdit(true);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="edit"
                          style={{ color: '#dc3545' }}
                          onClick={() => handleDelete(book.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </Popup>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No books found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="popup"
          onClick={(e) => {
            if (e.target.classList.contains('popup')) setOpen(false);
          }}
        >
          <div className="pop-item">
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>
                    <input name="name" value={formData.name} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>
                    <input name="author" value={formData.author} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>
                    <input name="genre" value={formData.genre} onChange={handleChange} />
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <select name="status" value={formData.status} onChange={handleChange}>
                      <option value="Unread">Unread</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ paddingTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '50px' }}>
                      <button className="su" onClick={handleSubmit}>
                        {isEdit ? 'Update' : 'Submit'}
                      </button>
                      <button className="cl" onClick={() => setOpen(false)}>
                        Close
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favbook;