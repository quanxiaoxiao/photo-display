/** @jsx jsx */
import React, {
  useState,
  Fragment,
  useEffect,
} from 'react';
import Gallery from 'react-photo-gallery';
import { jsx, css, Global } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

import useColor from 'hooks/useColor';

import { init as initStyle } from 'styles';

import Preview from './Preview';


const Container = React.memo(() => {
  const getColor = useColor();
  const [list, setList] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(-1);

  useEffect(() => {
    const data = JSON.parse(document.getElementById('js-initialData').textContent);
    setList(data.list);
  }, []);

  const handleClickOnPhoto = (ev, { index }) => {
    setCurrentPhoto(index);
  };

  return (
    <Fragment>
      <Global
        styles={css`
        ${emotionNormalize}
        ${initStyle}
        body {
          color: ${getColor('text')};
        }
        `}
      />
      <Gallery
        photos={list}
        onClick={handleClickOnPhoto}
      />
      {
        currentPhoto !== -1 && (
          <Preview
            src={list[currentPhoto].src}
            onClose={() => setCurrentPhoto(-1)}
            total={list.length}
            index={currentPhoto}
            onChange={(v) => setCurrentPhoto(v)}
          />
        )
      }
    </Fragment>
  );
});

export default Container;
