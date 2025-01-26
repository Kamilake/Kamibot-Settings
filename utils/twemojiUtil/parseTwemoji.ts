import twemoji from 'twemoji';

export const parseTwemoji = (text: string | HTMLElement) => {
  return twemoji.parse(text, {
    folder: 'svg',
    ext: '.svg',
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    className: 'twemoji'
  });
};