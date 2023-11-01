import React from "react";

function QuestionItem({ question, onDelete,onCorrectIndexChange }) {
  if (!question || !question.answers) {
    return null;
  }
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectIndexChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    onCorrectIndexChange(id, newCorrectIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectIndexChange}>{options}</select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
