import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import store from './redux/store';
import { showAgreement } from './redux/actions';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Dialogs from './components/Dialogs';
import DialogPage from './components/DialogPage';
import Agreement from './components/Agreement';
import './App.css';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAgreement());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Agreement />
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
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;