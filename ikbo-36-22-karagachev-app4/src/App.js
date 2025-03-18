import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Dialogs from './components/Dialogs';
import DialogPage from './components/DialogPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/dialogs/:id" element={<DialogPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
