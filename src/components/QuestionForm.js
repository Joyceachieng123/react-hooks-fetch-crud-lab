import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });
  function handleChange(event, index) {
    const { name, value } = event.target;
    if (name === "answers") {
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({
        ...formData,
        answers: newAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { prompt, answers, correctIndex } = formData;
    onAddQuestion({ prompt, answers, correctIndex });
  }
  
  
 
  return (
    <div>
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
        <strong> Test Prompt:</strong>
          <input
            type="text"
            id="prompts"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
            <label key={index}>
              Answer {index + 1}:
              <input
                type="text"
                name="answers"
                value={answer}
                onChange={(event) => handleChange(event, index)}
              />
            </label>
          ))}
          <label>
            Correct Answer:
            <select
              name="correctIndex"
              value={formData.correctIndex}
              onChange={handleChange}
            >
              {formData.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add Question</button>
        </form>
      </section>
    </div>
  );
  
}

export default QuestionForm;
