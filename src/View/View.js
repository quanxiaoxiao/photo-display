import React, { useState, useLayoutEffect } from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line
import ResizeObserver from 'resize-observer-polyfill';

import colorData from 'styles/colors.json';
import sizeData from 'styles/sizes.json';

import ColorContext from 'contexts/Color';
import FontSizeContext from 'contexts/FontSize';
import SizeContext from 'contexts/Size';


import Container from './Container';

const View = React.memo(() => {
  const [colors, setColors] = useState(colorData);
  const [sizes, setSizes] = useState(sizeData);
  const [fontSize, setFontSize] = useState(parseFloat(getComputedStyle(document.body).fontSize)); // eslint-disable-line

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(() => {
      const newFontSize = parseFloat(getComputedStyle(document.body).fontSize);
      if (newFontSize !== fontSize) {
        animationFrameID = window.requestAnimationFrame(() => {
          setFontSize(newFontSize);
        });
      }
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  return (
    <FontSizeContext.Provider
      value={fontSize}
    >
      <ColorContext.Provider
        value={{
          colors,
          onChange: (v) => setColors(v),
        }}
      >
        <SizeContext.Provider
          value={{
            sizes,
            onChange: (v) => setSizes(v),
          }}
        >
          <Container />
        </SizeContext.Provider>
      </ColorContext.Provider>
    </FontSizeContext.Provider>
  );
});

export default process.env.NODE_ENV === 'development' ? hot(module)(View) : View;
