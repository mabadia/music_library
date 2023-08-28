import { useContext } from 'react'
import { SearchContext } from '../context/SearchContext'

function SearchBar() {
    const { term, handleSearch } = useContext(SearchContext)
    return (
        <form>
            <input type="text" placeholder="Enter a search term here" ref={term} />
            <input type="submit" onClick={e => handleSearch(e, term.current.value)} />
        </form>
    )
}

export default SearchBar
