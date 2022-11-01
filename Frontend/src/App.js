
import { useState } from 'react';
import './App.css';
import Axios from 'axios'
function App() {

  const [name,setName] =useState('')
  const [age,setAge] =useState(0)
  const [country,setCountry] =useState('')
  const [position,setPosition] =useState('')
  const [wage,setWage] =useState(0)
  const [newWage,setNewWage] =useState(0)
  const [employeeList,setemployeeList] =useState([])

  
  const addEmployee =()=>{
    Axios.post('https://localhost:3001/create', { 
      name:name, 
      age:age, 
      country:country,
      position:position,
      wage:wage,
    }).then(()=>{
      
      setemployeeList([...employeeList,{
        name:name,
        age:age,
        country:country,
        position:position,
        wage:wage,
      }])
    })
  }
  const getEmployee =()=>{
    Axios.get('https://localhost:3001/employees') .then((response)=>{
      console.log(response)
      setemployeeList(response.data)
    })
  }

  const updateEmployeeWage =(id)=>{
    Axios.put('https://localhost:3001/update',{wage:newWage, id:id}).then((response)=>{
      alert("update")
      setemployeeList(employeeList.map((val)=>{
        return val.id == id ? {id:val.id,name: val.name, country:val.country,age: val.age,position: val.position,wage:newWage}:val
      }))
    })
  }

  const deleteEmployeeWage =(id)=>{
    Axios.delete('https://localhost:3001/delete/${id}').then((response)=>{
      setemployeeList(employeeList.filter((val)=>{
        return val.id ==id
      }))
    })
  }

  return (
    <div className="App">
      <div className='information'>
        <label >Name</label>
        <input type="text" onChange={(event)=>{setName(event.target.value)}}/>
        <label >Age</label>
        <input type="number" onChange={(event)=>{setAge(event.target.value)}}/>
        <label >Country</label>
        <input type="text" onChange={(event)=>{setCountry(event.target.value)}}/>
        <label >Position</label>
        <input type="text" onChange={(event)=>{setPosition(event.target.value)}}/>
        <label >Wage </label>
        <input type="number" onChange={(event)=>{setWage(event.target.value)}}/>
        <button onClick={addEmployee}>Add</button>
      </div>

      <div>
        <button onClick={getEmployee} className='employee'>Show Employee</button>
        {employeeList.map((val,key)=>{
          return <div>
            
            <h3>{val.name}</h3>
            <h3>{val.age}</h3>
            <h3>{val.country}</h3>
            <h3>{val.position}</h3>
            <h3>{val.wage}</h3>
            <div>

              <input type="text" placeholder='2000...'
               onChange={(event)=>{setNewWage(event.target.value)}} />
              <button onClick={()=>{updateEmployeeWage(id)}}>Updte</button>
              <button onClick={()=>{deleteEmployeeWage(val.id)}}>Delete</button>
            </div> 
            
            
            </div>
        })}




      </div>
    </div>
  );
}

export default App;
