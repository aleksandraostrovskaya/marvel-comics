import ComicsPage from '../../pages/ComicsPage';
import MainPage from '../../pages/MainPage';
import NotFound from '../../pages/NotFound'
import AppHeader from '../appHeader/AppHeader';
import SingleComic from '../../pages/SingleComicPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <AppHeader />
        <main>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/comics' element={<ComicsPage/>} />
            <Route path='/comics/:comicId' element={<SingleComic/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
