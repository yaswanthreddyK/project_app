import React, { Suspense } from 'react'
import {Await, defer, useLoaderData} from 'react-router-dom'
import { getListOfProjects } from '../../utils'
import Spinner from "../../components/Spinner/Spinner"
import Error from "../../components/Error/Error"
import "./Projects.css"

export function loader(){
  return defer({projectsList: getListOfProjects()})
}

function Projects() {
  const loaderPromise = useLoaderData()

  function renderProjectsList(projectsList){

    return (
      
        projectsList.map((project, index) => {
          return (
            <div className='project-card'>
            <div className='title'>
              {project.title}
            </div>
            <p>{project.description}</p>
              <a href={project.projectURL} target="_blank" >Link</a>
          </div>
          )
        })
      
     
    )
  }
  return (
    <div className='projects-container'>
      <Suspense fallback={<Spinner />}>
        <Await resolve={loaderPromise.projectsList} errorElement={<Error />}>
        {renderProjectsList}
        </Await>
      </Suspense>
    </div>
  )
}

export default Projects