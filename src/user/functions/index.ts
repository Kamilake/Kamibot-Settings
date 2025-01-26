// export { default as WelcomeMessageFunc } from './WelcomeMessage';
// export { default as Func1 } from './Func1';
// export { default as Func2 } from './Func2';
// export { default as Func3 } from './Func3';

// GuildSettingsGrid.tsx 에서 사용됨

import WelcomeMessageFunc from './WelcomeMessage';
import TTS from './TTS';
import Func2 from './Func2';
import AiChat from './AiChat';
import VVC from './VVC';
import MinecraftRemote from './MinecraftRemote';
import KeywordNotify from './KeywordNotify';
import General from './General';
import InviteRole from './InviteRole_del';
// import InviteRole from './InviteRole';

const functions = [General, WelcomeMessageFunc, TTS, Func2, AiChat, VVC, MinecraftRemote, KeywordNotify, InviteRole];
export default functions;