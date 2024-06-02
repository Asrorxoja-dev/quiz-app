import React, { useState, useEffect } from 'react';
import DarkMode from '../components/DarkMode';
import { useParams, Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';

import sun from '/public/assets/icon-sun-dark.svg';
import moon from '/public/assets/icon-moon-dark.svg';

function Quiz() {
  const { title } = useParams(); // Retrieve the title from URL parameters
  const [data, setData] = useState(null); // Change initial state to null to handle non-array data

  useEffect(() => {
    fetch(`https://online-json-server-api.up.railway.app/project/66594f894a1552ef80d138bb/quizzes/${title}`)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData); 
        if (responseData) {
          setData(responseData); // Directly use the returned object
        } else {
          console.error('No data found:', responseData);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [title]); // Add title to dependency array to refetch if title changes

  if (!data) {
    return <div className='loading'> 
    <Puff
  visible={true}
  height="80"
  width="80"
  color="#313E51"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>; 
  }

  return (
    <div>
      <div className="container">
        <div className='dark-mode'>
          <img className='sun' src={sun} alt="" />
          <DarkMode />
          <img className='moon' src={moon} alt="" />
        </div>
        <div className="hero">
          <div className="title">
            <h2>Welcome to the</h2>
            <h1>{data.title} Quiz!</h1>
            <p>Pick a question to get started.</p>
          </div>
          <div className="elements">
            {data.questions && data.questions.length > 0 ? (
              data.questions.map((question, index) => (
                <div className='section' key={index}>
                  <Link className='quizzes' to={`/quiz/${data.title}/${index}`}>
                    <div className='h2'>
                      <div>
                        <img src={data.icon} alt={data.title} />
                      </div>
                      <div>
                        <h2>{question.question}</h2>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No questions available for this quiz.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
