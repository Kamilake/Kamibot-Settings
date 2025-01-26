import React from 'react';
import { parseTwemoji } from './parseTwemoji';
import './twemoji.css'; // CSS 파일 포함
import ReactDOMServer from 'react-dom/server';

interface TwemojiTextProps {
  children: React.ReactNode;
}

const TwemojiText: React.FC<TwemojiTextProps> = ({ children }) => {
  let element : string | HTMLElement;
  if (typeof children === 'string') {
    element = children;
  } else {
    element = ReactDOMServer.renderToString(children);
  }
  return (
    <span dangerouslySetInnerHTML={{ __html: parseTwemoji(element) }} />
  );
};

export default TwemojiText;