import React from 'react';
import { parseTwemoji } from './parseTwemoji';
import './twemoji.css';

interface TwemojiTextProps {
  children: React.ReactNode;
}

const processChildren = (children: React.ReactNode): React.ReactNode => {
  if (typeof children === 'string') {
    return (
      <span dangerouslySetInnerHTML={{ __html: parseTwemoji(children) }} />
    );
  }

  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <React.Fragment key={index}>{processChildren(child)}</React.Fragment>
    ));
  }

  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<any>;
    const processedChild = processChildren(element.props.children);
    return React.cloneElement(element, { ...element.props, children: processedChild });
  }
  return children;
};

const TwemojiText: React.FC<TwemojiTextProps> = ({ children }) => {
  return <>{processChildren(children)}</>;
};

export default TwemojiText;