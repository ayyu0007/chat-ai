import { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { addSearch, selectSearch } from './features/history/historySlice';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.history);
  const selected = useSelector((state) => state.history.selected);

  async function generateAnswer() {
    setAnswer(<ImSpinner9 className='animate-spin display-6' />);
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCeHICZ3JdokVWtklEwEH9ocerebpioPls',
        method: "post",
        data: {
          "contents": [
            { "parts": [{ "text": question }] }
          ]
        }
      });
      const generatedAnswer = response.data.candidates[0].content.parts[0].text;
      setAnswer(generatedAnswer);
      dispatch(addSearch({ question, answer: generatedAnswer }));
    } catch (error) {
      setAnswer("An error occurred. Please try again.");
    }
  }

  function handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      generateAnswer();
    }
  }

  function handleSelect(index) {
    dispatch(selectSearch(index));
  }

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar */}
        <div className="col-3 bg-secondary text-white p-3 d-flex flex-column">
          <h3 className="text-center">History</h3>
          <ul className="list-group flex-grow-1 overflow-auto">
            {history.map((item, index) => (
              <li
                key={index}
                className={`list-group-item ${selected === item ? 'active' : ''}`}
                onClick={() => handleSelect(index)}
                style={{ cursor: 'pointer' }}
              >
                {item.question}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="col-9 d-flex flex-column justify-content-between p-3">
          <div className="flex-grow-1 overflow-auto mb-3">
            <div className="card bg-dark text-light p-3 mb-3">
              <p className="mb-0">{selected ? selected.answer : answer}</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="input-group mb-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control bg-secondary text-light border-0"
              rows="1" 
              onKeyDown={handleKeyDown}
            ></textarea>
            <button
              onClick={generateAnswer}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
