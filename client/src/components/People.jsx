import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const People = () => {
  const [people, setPeople] = useState([]);
  const [reload, setReload] = useState(false);
  const [view, setView] = useState(false);
  const [personn,setPerson] = useState('')





  useEffect(() => {
    const fetchPeoples = async () => {
      try {
        const res = await axios.get("http://localhost:8080/people");
        console.log(res.data);
        setPeople(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPeoples();
  }, [reload]);
  const handleView =()=>{
    setView(!view)
  }

  const handleclick= (id,person)=>{
    console.log(person)
    axios.put('http://localhost:8080/people/'+id, person)
      .then(function (response) {
        console.log(response);
        setReload(!reload)
      })
      .catch(function (error) {
        console.log(error);
      });
    
}


  const handleDelete = (id) => {
    axios.delete('http://localhost:8080/people/' + id)
      .then(function (response) {
        setReload(!reload);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className='title'>JobCenter</h1>
      <div className='peoples'>
        {people.map(person => (
          <div className='person' key={person.id}>
            {person.picture && <img className='imageperson' src={person.picture} alt='' />}
            <h2>{person.name}</h2>
            <p>{person.description}</p>
            <span>{person.phonenumber}</span>
            <button className='delete' onClick={() => handleDelete(person.id)}>Delete</button>
            <button className='update'onClick={()=>handleView()}>update</button>
            {  view &&  
            <div>
            <input className='input change' onChange={(e)=>setPerson(e.target.value)}></input> 
            <button className='button confirm' onClick={()=>handleclick(person.id,{
              name: personn
            })}>confirm </button>
            </div>
              
            }
          </div>
        ))}
      </div>
      {/* <button className='add-person-btn'> */}
  <Link to='/add' className='add-person-link'>Add New Person</Link>
{/* </button> */}
    </div>
  );
};

export default People;


    
