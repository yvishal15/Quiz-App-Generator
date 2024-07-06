"use client"

import classes from "./page.module.css";
import React, { useState } from 'react'



const Question = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answer, setAnswer] = useState()

  const data = props.data

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
      setAnswer(data.correctAnswer)
      if (selectedOption == data.correctAnswer) {
        props.increment_score()
      }
      props.increment()
    }
  };


  return (
    <div className={classes.single_question_wrapper}>
      <h2>{data.question}</h2>
      <div className={classes.options_wrapper}>
        {data.options.map((option, index) => (
          <div key={index} className={`${classes.option} 
          ${isAnswered && option == answer ? `${classes.correct}` : ""} 
          ${isAnswered && option === selectedOption && option !== answer ? `${classes.incorrect}` : ''}`}>
            <div onClick={() => {
              if (isAnswered) {

              }
              else {
                handleOptionChange(option)
              }
            }
            } className={`${classes.radio} ${selectedOption == option ? `${classes.radio_selected}` : ""}`}></div>
            <div className={classes.option_text}>{option}</div>
          </div>
        ))}
      </div>
      {!isAnswered && <button onClick={handleSubmit} disabled={isAnswered || selectedOption === null}>Submit</button>}
    </div>
  );
};



export default function Home() {
  const [totalAnswered, setTotalAnswered] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [finished, setFinished] = React.useState(false)
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean"
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correctAnswer: "Harper Lee"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Pb", "Fe"],
      correctAnswer: "Au"
    }
  ];
  return (
    <main className={classes.main}>
      <div className={classes.content}>

        {finished ?
          <div className={classes.score_wrapper}>
            <h1>Your score</h1>
            <h2>{score} / 5</h2>
          </div>
          :
          <>
            <div className={classes.instructions_wrapper}>
              <h2>Instructions</h2>
              <ul>
                <li>This quis contains 5 questions</li>
                <li>You can select only one option</li>
                <li>You can view next question only after submitting the currect question</li>
                <li>The quiz will automatically closed once 5 questions are answered and the score will be displayed</li>
              </ul>

            </div>
            <div className={classes.questions_wrapper}>
              {questions.map((q, i) => {
                if (totalAnswered >= i) {
                  return <Question key={i} data={q} increment={() => {
                    if (totalAnswered == 4) {
                      setFinished(true)
                    }
                    else {
                      setTotalAnswered(totalAnswered + 1)
                    }
                  }}
                    increment_score={() => setScore(score + 1)} />
                }
              })}
            </div>
          </>

        }



      </div>
    </main>
  );
}
