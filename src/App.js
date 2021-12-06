import './App.css';
import HomePage from './pages/Homepage';
import NavBar from './components/Navbar';
import ProjectListPage from './pages/ProjectListPage';
import { Routes, Route } from 'react-router';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import EditProjectPage from './pages/EditProjectPage';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/projects" element={<ProjectListPage />}/>
      <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      <Route path="/projects/edit/:projectId" element={<EditProjectPage />} />
    </Routes>

    </div>
  );
}
export default App;

