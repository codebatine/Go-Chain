import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './Router';
import './assets/scss/styles.scss';

const App = () => (
  <Router>
    <Header />
    <main className="main-content">
      <AppRouter />
    </main>
    <Footer />
  </Router>
);

export default App;
