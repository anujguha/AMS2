import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [checkInList, setCheckInList] = useState([]);
  const [checkOutList, setCheckOutList] = useState([]);
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
  }, []);

  function handleCheckIn() {
    const currentTime = new Date().toLocaleTimeString();
    setCheckInTime(currentTime);
    setCheckInList([...checkInList, { rollNumber, name, checkInTime }]);
    setRollNumber('');
    setName('');
  }

  function handleCheckOut() {
    const currentTime = new Date().toLocaleTimeString();
    setCheckOutTime(currentTime);

    const checkInIndex = checkInList.findIndex((student) => student.rollNumber === rollNumber);
    if (checkInIndex === -1) {
      alert('Student not present');
      return;
    }

    const newCheckInList = [...checkInList];
    const checkedOutStudent = newCheckInList.splice(checkInIndex, 1)[0];
    checkedOutStudent.checkOutTime = checkOutTime;
    setCheckOutList([...checkOutList, checkedOutStudent]);
    setCheckInList(newCheckInList);
    setRollNumber('');
    setName('');
  }

  return (
    <div className='App'>
      <header > ATTENDANCE MARKING SYSTEM </header>
      <form>
        <label>
          Roll Number:
          <input
            type="text"
            placeholder='Roll Number'
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <div className='btn-div'>
        <button type="button" onClick={handleCheckIn}>
          Check In
        </button>
        <button type="button" onClick={handleCheckOut}>
          Check Out
        </button>
        </div>
      </form>
     <div className='block2'>
      <div className='table-box'>
      <h2>Check In List  </h2>
      <h4> Present : {checkInList.length}</h4>

      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
          </tr>
        </thead>
        <tbody>
          {checkInList.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
<div className='table-box'>
      <h2>Check Out List</h2>

      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Check In Time</th>
            <th>Check Out Time</th>
          </tr>
        </thead>
        <tbody>
          {checkOutList.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.checkInTime}</td>
              <td>{student.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      
    </div>

  );
}

export default App;
