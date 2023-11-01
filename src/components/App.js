import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const addQuestion = (newQuestion) => {
    // Send POST request to the server
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => setQuestions([...questions, data]))
      .catch(error => console.error('Error adding question:', error));
  };

  const deleteQuestion = (id) => {
    // Send DELETE request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => setQuestions(questions.filter(q => q.id !== id)))
      .catch(error => console.error('Error deleting question:', error));
  };

  const updateCorrectIndex = (id, newCorrectIndex) => {
    // Send PATCH request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(questions.map(q => (q.id === id ? data : q)));
      })
      .catch(error => console.error('Error updating question:', error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
      <QuestionForm onAddQuestion={addQuestion}/> ) :  (
      <QuestionList questions={questions}
        onDelete={deleteQuestion}
        onCorrectIndexChange={updateCorrectIndex}/>
      )}

    </main>
  );
}

export default App;
