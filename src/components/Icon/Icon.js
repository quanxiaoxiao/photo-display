/* eslint react/no-array-index-key: 0 */
/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import useColor from 'hooks/useColor';
import useSize from 'hooks/useSize';
import icons from './icons.json';

const paths = [
  {
    d: 'M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m0 808.96a67.697778 67.697778 0 0 1-66.939259-66.56A65.422222 65.422222 0 0 1 512 675.84a66.56 66.56 0 0 1 66.939259 66.56A65.611852 65.611852 0 0 1 512 808.96zM688.355556 436.148148a446.198519 446.198519 0 0 1-84.954075 84.574815 171.994074 171.994074 0 0 0-41.718518 45.131852 154.168889 154.168889 0 0 0-7.205926 59.922963h-95.952593v-25.6a180.148148 180.148148 0 0 1 16.308149-75.851852 246.518519 246.518519 0 0 1 61.629629-66.56 392.912593 392.912593 0 0 0 55.940741-48.545185A66.37037 66.37037 0 0 0 606.814815 369.777778a67.697778 67.697778 0 0 0-23.514074-52.148148 103.158519 103.158519 0 0 0-66.93926-21.617778 94.814815 94.814815 0 0 0-66.939259 23.514074 134.826667 134.826667 0 0 0-37.925926 68.266667c-3.602963 18.014815-97.659259 27.117037-95.762963-12.515556a153.220741 153.220741 0 0 1 56.888889-113.777778A207.265185 207.265185 0 0 1 512 215.04a215.22963 215.22963 0 0 1 144.687407 46.838519 135.395556 135.395556 0 0 1 52.527408 107.899259 119.656296 119.656296 0 0 1-20.859259 66.37037z',
  },
];

const Icon = React.memo(({
  code,
  color,
  link,
  ...other
}) => {
  const icon = icons[code];
  const viewBox = icon ? icon.viewBox : '0 0 1024 1024';
  const getSize = useSize();
  const getColor = useColor();
  const pathList = (icon ? icon.paths : paths)
    .map((item, i) => (
      <path
        key={i}
        d={item.d}
        fill={color || getColor('fill.icon')}
      />
    ));
  if (link) {
    return (
      <a
        {...other}
        css={css`
          display: inline-block;
          width: ${getSize('width.icon')};
          height: ${getSize('height.icon')};
          cursor: pointer;
          font-size: 0;
          vertical-align: middle;

          path {
            transition: fill 0.4s;
          }

          &:hover {
            path {
              ${!color ? `fill: ${getColor('fill.icon.active')};` : ''}
            }
          }
        `}
      >
        <svg
          viewBox={viewBox}
          css={css`
            width: 100%;
            height: 100%;
            font-size: 0;
            vertical-align: middle;
          `}
        >
          {pathList}
        </svg>
      </a>
    );
  }
  return (
    <svg
      viewBox={viewBox}
      {...other}
      css={css`
        width: ${getSize('width.icon')};
        height: ${getSize('height.icon')};
        vertical-align: middle;
      `}
    >
      {pathList}
    </svg>
  );
});

Icon.propTypes = {
  viewBox: PropTypes.string,
  code: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.bool,
};

export default Icon;
