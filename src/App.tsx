import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Home from './views/Home';

const milestones = {
  posts: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS),
  snippets: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS),
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
