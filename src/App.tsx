import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Influencers from './pages/Influencers';
import InfluencerProfile from './pages/InfluencerProfile';
import ForUMKM from './pages/ForUMKM';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="influencers/:id" element={<InfluencerProfile />} />
          <Route path="umkm" element={<ForUMKM />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
