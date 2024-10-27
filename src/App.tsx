import React from 'react';
import { HashRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import Main from './views/Main';
import Home from './views/Home';

const milestones = {
  posts: Number(import.meta.env.VITE_GITHUB_MILESTONE_POSTS),
  snippets: Number(import.meta.env.VITE_GITHUB_MILESTONE_SNIPPETS),
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="posts" element={<Outlet />}></Route>
          <Route path="snippets" element={<Outlet />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
