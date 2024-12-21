import { lazy, Suspense } from 'react';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const PageNotFound = lazy(() => import('../../pages/NotFound'));
const MainPage = lazy(() => import('../../pages/MainPage'))
const SingleComic = lazy(() => import('../../pages/SingleComicPage'))
const ComicsPage = lazy(() => import('../../pages/ComicsPage'))

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:comicId' element={<SingleComic />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
