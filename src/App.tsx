import './App.css'
import About from './sections/About';
import Footer from './sections/Footer';
import Intro from './sections/Intro';
import Navbar from './sections/Navbar';

const App = () => (
    <main className='mx-auto'>
      <Navbar />
      <Intro />
      <About />
      <Footer />
    </main>
)

export default App;
