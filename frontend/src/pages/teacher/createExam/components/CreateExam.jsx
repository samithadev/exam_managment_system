import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function CreateExam() {
  const [examName, setExamName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const location = useLocation();
  const { exam } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (exam) {
      setExamName(exam.exam_name);
      setDuration(exam.duration);
      setDate(exam.examDate);
      setQuestions(exam.questions || []);
    }
  }, [exam]);

  const handleAddQuestion = () => {
    const newQuestion = { questionText, answers };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setAnswers([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  const handleAddAnswer = (index, answerText) => {
    const newAnswers = [...answers];
    newAnswers[index].text = answerText;
    setAnswers(newAnswers);
  };

  const handleSelectCorrectAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = !newAnswers[index].isCorrect;
    setAnswers(newAnswers);
  };
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handlePublishExam = async () => {
    try {
      const token = localStorage.getItem("token");

      // Map questions and answers to the format expected by the backend
      const formattedQuestions = questions.map((q) => ({
        questionText: q.questionText,
        answers: q.answers.map((a) => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      }));

      // Insert the exam into the exam_table
      const res = await fetch("http://localhost:8000/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exam_name: examName,
          duration: duration,
          examDate: date,
          status: "published",
          questions: formattedQuestions,
        }),
      });

      // Display success message or redirect to exams page
      alert("Exam Published successfully");
      navigate("/teacher/dashboard");
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  const handleSaveExam = async () => {
    try {
      const token = localStorage.getItem("token");

      // Map questions and answers to the format expected by the backend
      const formattedQuestions = questions.map((q) => ({
        questionText: q.questionText,
        answers: q.answers.map((a) => ({
          text: a.text,
          isCorrect: a.isCorrect,
        })),
      }));

      // Insert the exam into the exam_table
      const res = await fetch("http://localhost:8000/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          exam_name: examName,
          duration: duration,
          examDate: date,
          status: "draft",
          questions: formattedQuestions,
        }),
      });

      // Display success message or redirect to exams page
      alert("Exam Saved successfully");
      navigate("/teacher/dashboard");
      console.log(res);
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-10 p-8 ">
      <div>
        <div className=" flex items-center  gap-4">
          <Link
            className=" bg-slate-400 p-2 rounded-lg"
            to={"/teacher/dashboard"}
          >
            Back
          </Link>
          <h1 className="text-2xl font-bold mt-8">Create Exam</h1>
        </div>
        <div className="mt-4">
          <label htmlFor="examName" className="block">
            Exam Name
          </label>
          <input
            type="text"
            id="examName"
            className="w-full border-gray-300 border rounded-md p-2"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="duration" className="block">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            className="w-full border-gray-300 border rounded-md p-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="date" className="block">
            Exam Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full border-gray-300 border rounded-md p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-10"
          onClick={handlePublishExam}
        >
          Publish Exam
        </button>
        <button
          className="mt-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSaveExam}
        >
          Save Exam
        </button>
      </div>

      <div>
        <div className="mt-8">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2">Question</th>
                <th className="p-2">Answers</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{q.questionText}</td>
                  <td className="p-2">
                    <ul>
                      {q.answers.map((a, index) => (
                        <li
                          key={index}
                          className={
                            a.isCorrect ? "text-green-500 font-bold" : ""
                          }
                        >
                          {a.text}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 rounded"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="">
        <div className="mt-4">
          <label htmlFor="question" className="block">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="w-full border-gray-300 border rounded-md p-2"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block">Answers</label>
          {answers.map((answer, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                className="border-gray-300 border rounded-md p-2 mr-2"
                value={answer.text}
                onChange={(e) => handleAddAnswer(index, e.target.value)}
                // onClick={() => handleSelectCorrectAnswer(index)}
              />
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={answer.isCorrect}
                onChange={() => handleSelectCorrectAnswer(index)}
              />
              {/* <span className="ml-2">
                {answer.isCorrect ? "Correct Answer" : ""}
              </span> */}
            </div>
          ))}

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateExam;
