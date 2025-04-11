import { useState } from 'react'
import './App.css'

function App() {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#000000');

  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  }

  const handleOnChangeForTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleAddNote = () => {

    if (title.trim() === "" || description.trim() === "") {
      alert("Заголовок и описание не могут быть пустыми!");
      return;
    }

    setNotes([...notes, {description, title, color}]);
    setDescription('');
    setTitle('');
    setColor('#000000')
  }

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  }

  const handleEditNote = () => {
      
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  }

  return (
    <div>

      <div className='spaceName'>
        <h1>Atrofos List</h1>
      </div>

      <div className='input-container'>
      <input 
          type="text" 
          placeholder="Заголок..." 
          className='input-1'
          value={title}
          onChange={handleOnChangeForTitle}
          onKeyDown={handleKeyDown}
        />
        <input 
          type="text" 
          placeholder="Напиши заметку здесь..." 
          className='input'
          value={description}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        
        <input type="color" value={color} onChange={handleColorChange} className="color-picker"/>


        <button className='addBtn' onClick={handleAddNote}>Добавить</button>
      </div>
        
      <hr className='hr'/>

      <div className='card-container'>
        {notes.map((note, index) => (
        <div className='card' key={index} style={{ backgroundColor: note.color }}>
          <div class="card-content">
          <h2 className="card-title"> {note.title}</h2>     
            <p className="card-text">{note.description}</p>
            <button className='deleteBtn' onClick={() => handleDeleteNote(index)}>Удалить</button>
          </div>
        </div>
        ))}
      </div>

    </div>
  )
}

export default App