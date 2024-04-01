import React, { useState } from "react";

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
          createDate: date,
          status: "published",
          questions: formattedQuestions,
        }),
      });

      // Display success message or redirect to exams page
      console.log("Exam published successfully");
      console.log(res);
    } catch (error) {
      console.error("Error publishing exam:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-8">Create Exam</h1>
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
          Date
        </label>
        <input
          type="date"
          id="date"
          className="w-full border-gray-300 border rounded-md p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
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
              onClick={() => handleSelectCorrectAnswer(index)}
            />
            {/* <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-500"
              checked={answer.isCorrect}
              onChange={() => handleSelectCorrectAnswer(index)}
            /> */}
            <span className="ml-2">
              {answer.isCorrect ? "Correct Answer" : ""}
            </span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePublishExam}
      >
        Publish Exam
      </button>
      <div className="mt-8">
        {/* Logic to display added questions */}
        {questions.map((q, index) => (
          <div key={index} className="border p-4 my-2">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded float-right"
              onClick={() => handleDeleteQuestion(index)}
            >
              Delete
            </button>
            <h3 className="text-lg font-bold">{q.questionText}</h3>
            <ul>
              {q.answers.map((a, index) => (
                <li
                  key={index}
                  className={a.isCorrect ? "text-green-500 font-bold" : ""}
                >
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateExam;
