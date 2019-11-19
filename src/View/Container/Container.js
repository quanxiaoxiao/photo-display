/** @jsx jsx */
import React, {
  useState,
  Fragment,
  useEffect,
} from 'react';
import Gallery from 'react-photo-gallery';
import { jsx, css, Global } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

import { isValueMatchStr } from 'utils';
import useColor from 'hooks/useColor';
import Input from 'components/Input';
import Icon from 'components/Icon';

import { init as initStyle } from 'styles';

import Preview from './Preview';


const Container = React.memo(() => {
  const getColor = useColor();
  const [list, setList] = useState([]);
  const [keywords, setKeywords] = useState('');
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
      <div
        css={css`
          padding: 0 1rem;
          height: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: ${getColor('fill')};
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        `}
      >
        <Input
          css={css`
            border: 1px solid ${getColor('stroke')};
            border-radius: 3px;
            padding: 0 0.6rem;
          `}
          value={keywords}
          onChange={(ev) => setKeywords(ev.target.value)}
          left={(
            <Icon
              color={getColor('other.1')}
              code="e601"
            />
          )}
        />
      </div>
      <div
        style={{
          height: 'calc(100vh - 4rem)',
          position: 'relative',
        }}
        css={css`
          overflow: hidden;
          overflow-y auto;
          ::-webkit-scrollbar {
            width: 0;
            height: 0;
          }
        `}
      >
        <Gallery
          photos={list.filter((item) => {
            if (keywords.trim() === '') {
              return true;
            }
            return isValueMatchStr(keywords, item.name);
          })}
          onClick={handleClickOnPhoto}
        />
      </div>
      {
        currentPhoto !== -1 && (
          <Preview
            src={list[currentPhoto].src}
            name={list[currentPhoto].name}
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
