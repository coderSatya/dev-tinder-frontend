const lucide = require('./node_modules/lucide-react/dist/cjs/lucide-react.js');
console.log("All keys containing 'git':", Object.keys(lucide).filter(k => k.toLowerCase().includes('git')));
console.log("All keys containing 'link':", Object.keys(lucide).filter(k => k.toLowerCase().includes('link')));
console.log("All keys containing 'twit':", Object.keys(lucide).filter(k => k.toLowerCase().includes('twit')));
console.log("All keys containing 'social':", Object.keys(lucide).filter(k => k.toLowerCase().includes('social')));
