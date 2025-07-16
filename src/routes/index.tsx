import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Detail from '../pages/detail/Detail';
import Search from '../pages/search/Search';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:id" element={<Detail />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/favorite" element={<Detail />}></Route>
    </Routes>
  );
};

export default AppRoutes;
