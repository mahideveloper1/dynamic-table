import React, { useEffect, useState } from 'react'
import DataForm from './DataForm';
import ChartComponent from './ChartComponent';
import './table.css'

function App() {
  const [data , setData] = useState([])
  const [filterLetters, setFilterLetters] = useState('');
  const [filterMarks, setFilterMarks] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterRollno, setFilterRollno] = useState('');
   const [chartData, setChartData] = useState({})

  const handleFilter = () => {
    //  GET request to the server with filter criteria
    fetch( `http://localhost:3000/users?filterLetters=${filterLetters}&filterMarks=${filterMarks}&filterSection=${filterSection}&filterRollno=${filterRollno}`
)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };
   
    useEffect(()=> {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => setData(data))
    .then(err => console.log(err));
  }, [])

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        //  chart data
       if (Array.isArray(data) && data.length > 0) {
          const chartLabels = data.map((d) => d.Firstname);
          const chartValues = data.map((d) => d.Percentage);

          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: 'Percentage',
                data: chartValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      })
      .catch((error) => console.error(error));
  }, []);
 
 
  return (
    <>
    <h2>Student Table</h2>
    <div  className="table-container" style = {{padding : "50px"}}>
       <div>
          <label>
            Filter by Letters:
            <input
              type="text"
              value={filterLetters}
              onChange={(e) => setFilterLetters(e.target.value)}
            />
          </label>
          <label>
            Filter by Marks:
            <input
              type="number"
              value={filterMarks}
              onChange={(e) => setFilterMarks(e.target.value)}
            />
          </label>
           <label>
            Filter by Section:
            <input
              type="text"
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            />
          </label>
          <label>
            Filter by Rollno:
            <input
              type="number"
              value={filterRollno}
              onChange={(e) => setFilterRollno(e.target.value)}
            />
          </label>
          <button onClick={handleFilter}>Apply Filter</button>
        </div>
      <table>
        <thead>
          <tr>
          <th>rollno</th>
          <th>firstname</th>
          <th>lastname</th>
          <th>kaksha</th>
          <th>section</th>
          <th>percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d,i)=>( 
          <tr key = {i}>
            <td>{d.Rollno}</td>
            <td>{d.Firstname}</td>
            <td>{d.Lastname}</td>
            <td>{d.kaksha}</td>
            <td>{d.Section}</td>
            <td>{d.Percentage}</td>
          </tr>
          ))} 
        </tbody>
      </table>
    </div>
    <h3>Add another row</h3>
   <DataForm />
   <div backgroundColor="black">
      {Object.keys(chartData).length > 0 && <ChartComponent chartData={chartData} />}
</div>
  </>
  )}

export default App
