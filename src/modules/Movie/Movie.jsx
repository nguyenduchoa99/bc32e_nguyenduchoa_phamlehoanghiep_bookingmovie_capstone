import React from 'react'
import { useParams } from 'react-router-dom'
import ShowMovie from './ShowMovie/ShowMovie';
import ViewMovie from './ViewMovie/ViewMovie';


const Movie = () => {
    const {movieId} = useParams();

  return (
    <div>
        <ViewMovie movieId={movieId}/>
        <ShowMovie movieId={movieId}/>
    </div>
  )
}

export default Movie