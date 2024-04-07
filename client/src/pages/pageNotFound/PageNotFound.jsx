import React from 'react'
import "./PageNotFound.css"
import { Link } from 'react-router-dom';
function PageNotFound() {
  return (
    <div className='not-found-container'>
      <div>
            <div className='not-found-img'>
              <img src="../../../img/404img.svg" alt="" />
            </div>
            <h1>Page is not found!</h1>
            <div>
              <p>
              Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base.
              </p>
            </div>
            <div>
              <Link to="/">
              <button>Back to Home</button>
              </Link>
            </div>
      </div>
    </div>
  )
}

export default PageNotFound;