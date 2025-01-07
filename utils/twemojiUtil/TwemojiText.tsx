import React from 'react';
import { parseTwemoji } from './parseTwemoji';
import './twemoji.css'; // CSS 파일 포함

interface TwemojiTextProps {
  text: string;
}

const TwemojiText: React.FC<TwemojiTextProps> = ({ text }) => {
  return (
    <span dangerouslySetInnerHTML={{ __html: parseTwemoji(text) }} />
  );
};

export default TwemojiText;