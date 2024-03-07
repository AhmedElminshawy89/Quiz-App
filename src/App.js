import './App.css';
import Quiz from './Quiz';
import { jsQuizz } from './Constant'


function App() {
  return (
    <div className="App">
        <Quiz questions={jsQuizz.questions}/>
    </div>
  );
}

export default App;
