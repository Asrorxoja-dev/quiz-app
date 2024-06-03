
import { useParams } from "react-router-dom";
import { Puff } from "react-loader-spinner";

import Test from "../components/Test";


import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

function Quiz() {
  const { title } = useParams();
  const {
    data: quizzes,
    pending,
    error,
  } = useFetch(
    `https://online-json-server-api.up.railway.app/project/66594f894a1552ef80d138bb/quizzes?title=${title}`
  );

  useEffect(() => {
    document.title = "Quiz" + " " + title;
  }, [title]);



  return (
    <div className="quiz-container container">
      {pending && <p> <div className='loading'>
      <Puff
    visible={true}
    height="60"
    width="60"
    color="#313E51"
    ariaLabel="puff-loading"
    wrapperStyle={{}}
    wrapperClass="1"
    /></div>; </p>}
      {error && <p>Something went wrong</p>}
      {quizzes && <Test questions={quizzes.data[0]} />}
    </div>
  );
}

export default Quiz;
