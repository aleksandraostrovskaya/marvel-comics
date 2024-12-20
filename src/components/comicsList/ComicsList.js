import './comicsList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(16);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { error, loading, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = newComicsList => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList(comicsList => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const refs = useRef([]);

  const renderItems = arr => {
    const items = arr.map((item, index) => {
      if (!refs.current[index]) {
        refs.current[index] = React.createRef();
      }
      return (
        <CSSTransition key={item.id} timeout={1000} classNames='comics__item' nodeRef={refs.current[index]}>
          <Link to={`/comics/${item.id}`} className='comics__item' ref={refs.current[index]}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}$</div>
          </Link>
        </CSSTransition>
      );
    });

    return (
      <ul className='comics__grid'>
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {items}
      <button
        className='button button__main button__long'
        style={{ display: comicsEnded ? 'none' : 'block' }}
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
