import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
// import { DataContext } from './context/DataContext'
// import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'
import Spinner from './Spinner'



function App() {
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)
  let searchInput = useRef('')
  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${term}Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length) {
          return setData(resData.results)
        } else {
          return setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [search])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  const renderGallery = () => {
    if (data) {
      return (
            <Suspense fallback={<Spinner/>} >
                <Gallery data={data} />
            </Suspense >
            )
}
}


return (
  <div>
    <SearchBar handleSearch={handleSearch} />
    {message}
    {renderGallery()}
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <SearchBar handleSearch={handleSearch} />
            <Gallery data={data} />
          </>
        } />
        <Route path="/album/:id" element={<AlbumView />} />
        <Route path="/artist/:id" element={<ArtistView />} />
      </Routes>
    </Router>
  </div>
)

}

export default App

