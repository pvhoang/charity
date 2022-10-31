
// --- Version ---
export var VERSION = "0.5.3";
export var VERSION_DATE = "20/11/2021";
export var DEVELOPMENT_DATE = "01/10/19";

var PWA = false;
if (PWA) {
	var LOCAL_DATA = false;
	if (LOCAL_DATA) { 	// local mode
		WEB_DICT_FOLDER = 'http://localhost/pali/www/assets/dict';
	} else {			// server mode
		WEB_DICT_FOLDER = 'http://pvhoang.vn/pali/assets/dict';
	}
}

export var DICTIONARIES_TXT = [
	{ url: 'buddhadatta-english.txt' },
	{ url: 'truitner-english-viet.txt' },
	{ url: 'glossary-english.txt' },
	{ url: 'dhammajoti-sanskrit.txt' },
];

export var GUIDE_DICTIONARY_JSON = { url: 'guide.json' };

export const SUTTA = '0';
export const BOOK = '1';
export const DOC_TYPES = ['sutta', 'book', 'article', 'talk', 'course', 'chant'];
export const CAP_DOC_TYPES = ['Sutta', 'Book', 'Article', 'Talk', 'Course', 'Chant'];

export const NORMAL_VIEW = '0';
export const SEARCH_VIEW = '1';
export const VIEW_TYPES = ['Normal', 'Search'];

export const HEADLINE_LINK = 'headline-link';
export const TEXT_SHUGE = 'text-shuge';
export const TEXT_HUGE = 'text-huge';

export const ITEM_INDEX_CONTENT_ENGLISH = 2;
export const ITEM_INDEX_CONTENT_VIET = 3;
export const ITEM_INDEX_FILE_TITLE = 6;
export const ITEM_INDEX_FILE_LABEL = 7;
export const ITEM_INDEX_SEARCH_COUNT = 8;
export const ITEM_INDEX_SEARCH_TITLE = 9;
export const ITEM_INDEX_NOTE_MARKS = 10;

export var SEARCH_BY_CHAR = "char";
export var SEARCH_BY_WORD = "word";

export var SEARCH_CONTENT_ENGLISH = "eng";
export var SEARCH_CONTENT_VIET = "viet";

export const DICTIONARY_LIST = [
	{	label:'Pali-Viet-Eng', url: '../assets/dict/pve.json' },
	{	label:'Viet-Pali-Eng', url: '../assets/dict/vpe.json' },
	{	label:'Eng-Pali-Viet', url: '../assets/dict/epv.json' },
];

export var MAX_DISPLAY_WORDS = 100;
export var WEB_DICT_FOLDER = "../assets/dict";

export var DICTIONARIES_NAMES = { Tru:'Truitner', Bud:'Buddhadatta', Phu: 'Phúc' };
export var DICTIONARY_EXTRA = { label:'Pali-Viet-Eng-Extra', url: '../assets/dict/pve-extra.json' };
export var AUTO_COMPLETE_ITEMS = { label:'Set 1', url: '../assets/dict/auto-complete.json' };

export const GUIDE = 'guide';
export const DICTIONARY = 'dictionary';
export const SETTING = 'setting';

export var STORAGE_ITEMS = {
	setting: {
		fontSize: 'medium',
		maxWords: MAX_DISPLAY_WORDS,
		searchType: SEARCH_BY_WORD,
		searchContent: SEARCH_CONTENT_ENGLISH,
		dictIdx: '0',
		debug: "true",
		restart: "false"
	},
	dictionary: { 
		search: { searchStr: '' },
	},
	guide: {
		docIdx: BOOK,
		viewIdx: NORMAL_VIEW,
		idxSelectedFiles: [],
		showHeading: "true",
		view: { idxFile: 0, scrollY: 0, detail: {idxSelectedElement: 0, yTop: 0, start: 0, end: 0 } },
		search: { idxFile: 0, searchStr: '', count: 0, idxSelectedElement: -1 },
	},
}

