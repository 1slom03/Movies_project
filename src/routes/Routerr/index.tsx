import { Route, Routes } from "react-router-dom"
import { PATH } from "../../components"
import { Header } from "../../modules"
import { Favorites, HomePage, NotFound } from "../../pages"
import Movies from "../../pages/Movies/Movies"
import SelectMovies from "../../pages/Movies/SelectMovies"
import MoviesMore from "../../pages/Movies/MoviesMore"

const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={PATH.home} element={<HomePage/>} />
        <Route path={PATH.movies} element={<Movies/>} />
        <Route path={`${PATH.movies}/:name`} element={<SelectMovies />} />
        <Route path={PATH.notFound} element={<NotFound />} />
        <Route path={`${PATH.movies}/:name`} element={<MoviesMore />} />
        <Route path={PATH.favorites} element={<Favorites />} />
      </Routes>
    </>
  )
}

export default UserRoute
