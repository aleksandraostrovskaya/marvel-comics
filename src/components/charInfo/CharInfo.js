import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../sceleton/Sceleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';
import { Link } from 'react-router-dom'

const CharInfo = props => {
  const [char, setChar] = useState(null);

  const { error, loading, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = char => {
    setChar(char);
  };

  const sceleton = char || loading || error ? null : <Sceleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className='char__info'>
      {sceleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, thumbnail, description, homepage, wiki, comics } = char;
  console.log(comics)
  let imgStyle = { objectFit: 'cover' };
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'unset' };
  }

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map((item, i) => {
          if (i > 9) return;
          const comicId = item.resourceURI.split('/').pop()
          return (
            <Link to={`/comics/${comicId}`} key={i} className='char__comics-item'>
              {item.name}
            </Link>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
