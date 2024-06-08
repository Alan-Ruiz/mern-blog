// import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Article from './pages/Article.jsx';
import ArticlesList from './pages/ArticlesList.jsx';
// Components
import Navbar from './components/Navbar.jsx';

function App() {

  return (
    <Router>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:name" element={<Article />} />
          <Route path="/articles" element={<ArticlesList />} />
        </Routes>
      </div>
    </Router> 
  )
}

export default App
