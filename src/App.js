import { Route, Routes, HashRouter } from "react-router-dom";
import Account from "./Pages/Account/Account";
import Home from "./Pages/Home/Home";
import MyPosts from "./Pages/Home/MyPosts";
import Publish from "./Pages/Publish/Publish";
import Signin from "./Pages/Signin/Signin";
import SingleArticle from "./Pages/Single article/SingleArticle";
import SingleComment from "./Pages/Single article/SingleComment";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/article/:id" element={<SingleArticle />} />
        <Route path="/myarticles" element={<MyPosts />} />
        <Route path="/comment/:id" element={<SingleComment />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
