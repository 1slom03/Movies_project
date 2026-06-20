import { Route, Routes } from "react-router-dom"
import { PATH } from "../../components"
import { Header } from "../../modules"
import { HomePage, NotFound } from "../../pages"
import Movies from "../../pages/Movies/Movies"
import SelectMovies from "../../pages/Movies/SelectMovies"

const UserRoute = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={PATH.home} element={<HomePage/>} />
        <Route path={PATH.movies} element={<Movies/>} />
        <Route path={`${PATH.movies}/:name`} element={<SelectMovies />} />
        <Route path={PATH.notFound} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default UserRoute
