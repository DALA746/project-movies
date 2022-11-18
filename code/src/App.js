import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { MovieDetails } from './components/MovieDetails';
import { TopRatedList } from './components/TopRatedList';
import { Loading } from './components/Loading';

import { FETCH_URL } from './utils/urls';

export const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(FETCH_URL)
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => setLoading(false), 1000);
        setMovieList(json.results);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          {loading && <Loading />}
          <Route path='/' exact>
            <MovieList movieList={movieList} />
          </Route>
          <Route path='/movies/:movieId'>
            <MovieDetails />
          </Route>
          <Route path='/top_rated' exact>
            <TopRatedList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
