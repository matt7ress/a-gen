let curdata = {start:[],words:[]};
/**
 * 
 * @param {Number} from 
 * @param {Number} to 
 * @param {Boolean} float 
 * @returns {Number}
 */
function rand(from, to, float) {
    return (!float) | (float == undefined) ? Math.round(Math.random() * (to - from) + from) : Math.random() * (to - from) + from;
};
/**
 * 
 * @param {any[]} arr 
 * @returns {any}
 */
function randSel(arr) {
    return arr[rand(0, arr.length-1)];
};
/**
 * 
 * @param {String} str
 * @returns {undefined} 
 */
function save(str) {
    if(str == undefined | str.replace(' ', '') == '') return;
    let words = str.split(' ');
    if(!curdata.start.includes(words[0])) curdata.start.push(words[0]);
    for(let i = 0; i < words.length; i++) {
        let incld = 0, curword = words[i], prevword;
        for(let a = 0; a < curdata.words.length; a++) {
            if(a == i - 1) prevword = words[a];
            if(curdata.words[a].val == curword) {
                incld = 1;
                break;
            };
        };
        if(!incld) {
            curdata.words.push({val: curword, next: []});
            if(prevword) for(let a = 0; a < curdata.words.length; a++) {
                if(curdata.words[a].val == prevword) {
                    curdata.words[a].next.push(curword);
                    break;
                };
            };
        } else {
            if(prevword) for(let a = 0; a < curdata.words.length; a++) {
                if(curdata.words[a].val == prevword) {
                    curdata.words[a].next.push(curword);
                    break;
                };
            };
        };
    };
};
/**
 * @returns {String}
 */
function gen() {
    let len = rand(1, 7),
        str = [randSel(curdata.start)];
    for(let i = 0; i < len; i++) {
        let cw;
        for(let a = 0; a < curdata.words.length; a++) {
            if(curdata.words[a].val == str[str.length-1]) {
                cw = curdata.words[a].next;
                break;
            };
        };
        if(cw == [] || cw == undefined) {
            break;
        } else {
            str.push(randSel(cw));
        };
    };
    return str.join(' ');
};
const prompt = require('prompt-sync')({sigint: 1});
console.log('> A-Gen v1.0.0\n> Based on NobDod algorithm\n> Coded by Matrus\n> Use ^C (Ctrl/Command+C) to exit\n');
while(1) {
    console.log(`Output > ${[save(prompt('Input > ')), gen()][1]}\n`);
};