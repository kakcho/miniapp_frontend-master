export const hash = window.location.hash.slice(1);
console.log(hash); 

const params = new URLSearchParams(hash);
console.log(params.get('tgWebAppVersion')); // "6.2"