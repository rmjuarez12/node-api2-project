// Import Modules
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import Assets
import "./App.css";

// Import Components
import Header from "./components/Header";
import PostForm from "./routes/forms/PostForm";
import Post from "./routes/post-list/Post";
import PostList from "./routes/post-list/PostList";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />

        <main>
          <Route path='/' exact component={PostList} />
          <Route path='/post/:id' component={Post} />
          <Route path='/add-post' component={PostForm} />
          <Route path='/edit-post/:id' component={PostForm} />
        </main>
      </Router>
    </div>
  );
}

export default App;
