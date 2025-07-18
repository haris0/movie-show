import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../pages/home/Home'));
const Detail = lazy(() => import(/* webpackChunkName: "Detail" */ '../pages/detail/Detail'));
const Search = lazy(() => import(/* webpackChunkName: "Search" */ '../pages/search/Search'));
const Favorite = lazy(() => import(/* webpackChunkName: "Favorite" */ '../pages/favorite/Favorite'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:id" element={<Detail />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/favorite" element={<Favorite />}></Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AppRoutes;
