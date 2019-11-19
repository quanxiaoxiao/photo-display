/** @jsx jsx */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { jsx, css } from '@emotion/core';
import useColor from 'hooks/useColor';
import Backdrop from 'components/Backdrop';
import Layout from 'components/Layout';
import Icon from 'components/Icon';

const Preview = React.memo(({
  onClose,
  src,
  onChange,
  index,
  total,
  name,
}) => {
  const bodyStyleSaved = useRef();
  const getColor = useColor();

  const changeSaved = useRef(_.debounce((state, nextIndex) => {
    if (nextIndex >= 0 && nextIndex < state.total) {
      onChange(nextIndex);
    }
  }, 100));

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyleSaved.current = {
      overflow: bodyStyle.overflow,
      overflowY: bodyStyle.overflowY,
      height: bodyStyle.height,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = bodyStyleSaved.current.overflow;
      document.body.style.height = bodyStyleSaved.current.height;
    };
  }, []);

  useEffect(() => {
    document.title = name;
    return () => {
      document.title = '';
    };
  }, [name]);

  const handleWheel = (ev) => {
    changeSaved.current({
      total,
    }, ev.deltaY > 0 ? index + 1 : index - 1);
  };

  const navStyle = css`
    position: absolute;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    outline: 0;
    border-width: 0;
    transform: translateY(-50%);
    background: ${getColor('fill.nav')};
    transition: background 0.3s;
    user-select: none;
    &:hover {
      background: ${getColor('fill.nav.active')};
    }
  `;

  return (
    <Backdrop
      onClick={() => onClose()}
      onWheel={handleWheel}
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        <img
          css={css`
            max-width: calc(100vw - 10rem);
            max-height: calc(100vh - 5rem);
          `}
          alt=""
          src={src}
        />
      </div>
      <Layout
        gap="1rem"
        css={css`
          position: absolute;
          top: 1rem;
          right: 1rem;
        `}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Layout.Item>
          <Icon
            code="e600"
            link
            onClick={() => window.open(src, '__blank')}
          />
        </Layout.Item>
        <Layout.Item>
          <Icon
            code="e602"
            link
            onClick={() => onClose()}
          />
        </Layout.Item>
      </Layout>
      {
        index !== 0 && (
          <button
            type="button"
            css={css`
              ${navStyle}
              left: 1rem;
            `}
            onClick={(ev) => {
              ev.stopPropagation();
              onChange(index - 1);
            }}
          >
            <Icon
              css={css`
                width: 1.7rem;
                height: 1.7rem;
              `}
              code="e734"
            />
          </button>
        )
      }
      {
        index !== total - 1 && (
          <button
            type="button"
            css={css`
              ${navStyle}
              right: 1rem;
            `}
            onClick={(ev) => {
              ev.stopPropagation();
              onChange(index + 1);
            }}
          >
            <Icon
              css={css`
                width: 1.7rem;
                height: 1.7rem;
              `}
              code="e732"
            />
          </button>
        )
      }
      <div
        css={css`
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          color: ${getColor('fill')};
        `}
      >
        <span>
          {`${index + 1} of ${total}`}
        </span>
      </div>
    </Backdrop>
  );
});

Preview.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Preview;
