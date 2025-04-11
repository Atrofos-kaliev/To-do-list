import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const openAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setTitle(notes[index].title);
    setDescription(notes[index].description);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleAddNote = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Заголовок и описание не могут быть пустыми!");
      return;
    }
    
    setNotes([...notes, { title, description }]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditNote = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Заголовок и описание не могут быть пустыми!");
      return;
    }
    
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = { title, description };
    setNotes(updatedNotes);
    resetForm();
    setIsEditModalOpen(false);
  };

  const handleDeleteNote = () => {
    setNotes(notes.filter((_, i) => i !== deleteIndex));
    setIsDeleteModalOpen(false);
  };

  return (
  <div>
    <div className='spaceName'>
      <h1>Atrofos List</h1>
      </div>
      
      <div className="button-container">
        <button className="addBtn" onClick={openAddModal}>Добавить задачу</button>
      </div>
      
      <hr className='hr'/>
      
      <div className='card-container'>
        {notes.map((note, index) => (
          <div className='card' key={index}>
            <div className="card-content">
              <h2 className="card-title">{note.title}</h2>    
              <p className="card-text">{note.description}</p>
              <div className="card-buttons">
                <button className='editBtn' onClick={() => openEditModal(index)}>Редактировать</button>
                <button className='deleteBtn' onClick={() => openDeleteModal(index)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Добавить задачу">
        <div className="modal-form">
          <div className="form-group">
            <label>Заголовок:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              placeholder="Введите заголовок"
            />
            
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
              placeholder="Введите описание"
              rows="4"
            ></textarea>
          </div>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Отмена</button>
            <button className="submit-btn" onClick={handleAddNote}>Добавить</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Редактировать задачу">
        <div className="modal-form">
          <div className="form-group">
            <label>Заголовок:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
          </div>
          <div className="form-group">
            <label>Описание:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание"
              rows="4"
            ></textarea>
          </div>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>Отмена</button>
            <button className="submit-btn" onClick={handleEditNote}>Сохранить</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Удалить задачу">
        <div className="confirm-delete">
          <p>Вы уверены, что хотите удалить эту задачу?</p>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>Отмена</button>
            <button className="delete-btn" onClick={handleDeleteNote}>Удалить</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;