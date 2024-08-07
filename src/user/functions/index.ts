// export { default as WelcomeMessageFunc } from './WelcomeMessage';
// export { default as Func1 } from './Func1';
// export { default as Func2 } from './Func2';
// export { default as Func3 } from './Func3';

// GuildSettingsGrid.tsx 에서 사용됨

import WelcomeMessageFunc from './WelcomeMessage';
import TTS from './TTS';
import Func2 from './Func2';
import VVC from './VVC';
import MinecraftRemote from './MinecraftRemote';
import KeywordNotify from './KeywordNotify';

const functions = [WelcomeMessageFunc, TTS, VVC, MinecraftRemote, KeywordNotify];
export default functions;