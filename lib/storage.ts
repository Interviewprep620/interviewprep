export type InterviewSettings={jobTitle:string;stack:string;level:"Foundation"|"Intermediate"|"Advanced";questionCount:number};
export type SessionResult={id:string;date:string;score:number;answered:number;jobTitle:string;stack:string};
export const DEFAULT_SETTINGS:InterviewSettings={jobTitle:"Data Engineer",stack:"Snowflake",level:"Intermediate",questionCount:20};
export function getStored<T>(key:string,fallback:T):T{if(typeof window==="undefined")return fallback;try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback)) as T}catch{return fallback}}
export function setStored<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value));}
