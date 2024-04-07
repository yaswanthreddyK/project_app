import React from 'react'
import "./SearchBar.css"
function SearchBar({placeholder, inputRef}) {
  return (
   <form>
        <div className='search-icon-n-input-div'>
        <img src="../../../img/search-interface-symbol.png" alt="no" />
        <input type="text" placeholder={placeholder} ref={inputRef} />
        </div>
    <button>Search</button>
   </form>
  )
}

export default SearchBar