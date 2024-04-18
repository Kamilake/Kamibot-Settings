// export { default as WelcomeMessageFunc } from './WelcomeMessage';
// export { default as Func1 } from './Func1';
// export { default as Func2 } from './Func2';
// export { default as Func3 } from './Func3';

// GuildSettingsGrid.tsx 에서 사용됨

import WelcomeMessageFunc from './WelcomeMessage';
import TTS from './TTS';
import Func2 from './Func2';
import VVC from './VVC'; 

const functions = [WelcomeMessageFunc, TTS, Func2, VVC];
export default functions;