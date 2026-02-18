import './index.css';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Contact />
      </main>
    </>
  );
}
