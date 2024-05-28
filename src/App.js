import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { name: "walk dog", completed: false },
    { name: "code", completed: false },
    { name: "exercise", completed: false },
    { name: "go to work", completed: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim() === "") return;

    setItems([...items, { name: newItem, completed: false }]);
    setNewItem("");
  };

  const toggleItemCompletion = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleClearCompleted = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
  };

  return (
    <div className="App">
      <h1>My To Do List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItemCompletion(index)}
              />
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.name}
              </span>
            </label>
            <button onClick={() => handleRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <button type="submit">Add Item</button>
      </form>
      <button onClick={handleClearCompleted}>Clear Completed</button>
    </div>
  );
}

export default App;
