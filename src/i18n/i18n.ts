import messagesKo from './messages.ko.json';

const language = (navigator.languages && navigator.languages[0]) || navigator.language;

// Split locales with a region code
const languageWithoutRegionCode: string = language.toLowerCase().split(/[_-]+/)[0];
const messageSources = new Map([['ko', messagesKo]]);

// Try locale without region code, fallback to 'ko'
const messages = messageSources.get(languageWithoutRegionCode) || messagesKo;

export { messages, language };
