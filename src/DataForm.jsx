import React, { useState } from 'react';

function DataForm() {
  const [formData, setFormData] = useState({
    Rollno: '',
    Firstname: '',
    Lastname: '',
    kaksha: '',
    Section: '',
    Percentage: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="Rollno" placeholder="Rollno" value={formData.Rollno} onChange={handleChange}/>
      <input type="text" name="Firstname" placeholder="firstname" value={formData.Firstname} onChange={handleChange}/>
      <input type="text" name="Lastname" placeholder="lastname" value={formData.Lastname} onChange={handleChange}/>
      <input type="number" name="kaksha" placeholder="kaksha" value={formData.kaksha} onChange={handleChange}/>
      <input type="text" name="Section" placeholder="section" value={formData.Section} onChange={handleChange}/>
      <input type="number" name="Percentage" placeholder="percentage" value={formData.Percentage} onChange={handleChange}/>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default DataForm;
