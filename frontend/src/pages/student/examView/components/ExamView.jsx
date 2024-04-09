import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams, useNavigate } from "react-router-dom";

function ExamView() {
  const { id: examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // Decode the token to get userId
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);

    const fetchQuestionsAndAnswers = async () => {
      try {
        const questionsResponse = await axios.get(
          `http://localhost:8000/question/${examId}`
        );
        const fetchedQuestions = questionsResponse.data;
        setQuestions(fetchedQuestions);

        const fetchedAnswers = [];
        for (const question of fetchedQuestions) {
          const answersResponse = await axios.get(
            `http://localhost:8000/answers/${question.question_Id}`
          );
          fetchedAnswers.push(answersResponse.data);
        }
        setAnswers(fetchedAnswers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestionsAndAnswers();
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleAnswerSelection = (questionId, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answerId,
    }));
  };

  const handleSave = async () => {
    try {
      // Update the status in the exam_enrollment table to 'pending'
      await axios.post(`http://localhost:8000/examenroll/${userId}/${examId}`, {
        status: "pending",
      });

      alert("Answers Saved!");
      navigate(`/student/dashboard`);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleComplete = (req, res) => {};

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <h1>Exam View</h1>
      {questions.length > 0 && (
        <div>
          <h2 className=" text-xl">Question {currentQuestionIndex + 1}:</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <h3>Answers:</h3>
          <ul>
            {answers.length > 0 &&
              answers[currentQuestionIndex].map((answer, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      value={answer.answerId}
                      checked={
                        selectedAnswers[
                          questions[currentQuestionIndex].question_Id
                        ] === answer.answerId
                      }
                      onChange={() =>
                        handleAnswerSelection(
                          questions[currentQuestionIndex].question_Id,
                          answer.answerId
                        )
                      }
                    />
                    {answer.answer}
                  </label>
                </li>
              ))}
          </ul>
          <div className="flex w-full gap-5 text-white mt-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className=" px-5 py-2 bg-slate-400 "
            >
              Back
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className=" px-5 py-2 bg-slate-400 "
            >
              Next
            </button>
            <button onClick={handleSave} className=" px-5 py-2 bg-slate-800 ">
              Save
            </button>
            <button
              onClick={handleComplete}
              className=" px-5 py-2 bg-green-500 "
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamView;
