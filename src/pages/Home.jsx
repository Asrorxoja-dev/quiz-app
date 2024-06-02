import React, { useState, useEffect } from 'react';
import DarkMode from '../components/DarkMode';

import sun from '/public/assets/icon-sun-dark.svg'
import moon from '/public/assets/icon-moon-dark.svg'
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';


function Home() {
  const [data, setData] = useState([]); 

  useEffect(() => {
    fetch('https://online-json-server-api.up.railway.app/project/66594f894a1552ef80d138bb/quizzes')
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData); 
        if (responseData.data && Array.isArray(responseData.data)) {
          setData(responseData.data);
        } else {
          console.error('Data is not an array:', responseData);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []); 

  if (data.length === 0) {
    return <div className='loading'>
      <Puff
    visible={true}
    height="60"
    width="60"
    color="#313E51"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass="1"
    /></div>; 
  }

  return (
    <div>
      <div className="container">
        <div className='dark-mode'>
        <img className='sun' src={sun} alt="" />
          <DarkMode/>
          <img className='moon' src={moon} alt="" />
        </div>
        <div className="hero">
        <div className="title">
          <h2>Welcome to the</h2>
          <h1>Frontend Quiz!</h1>
          <p>Pick a subject to get started.</p>
        </div>
         <div className="elements">
         {data.map(item => (
        <div className='section' key={item.id}>
    
         <Link className='quizzes' to={`/quiz/${item.title}`}>
         <div className='h2'> 
        <div>
          <img src={item.icon}  /> 
        </div>
        <div>
           <h2> {item.title}</h2>
        </div>
          
          </div>
         </Link>
        </div>
      ))}
         </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
