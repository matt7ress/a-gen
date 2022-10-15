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
const prompt = require('readline-sync').question,
      zlib = require('zlib');
console.log('> A-Gen v1.1.0\n> Based on NobDod algorithm\n> Coded by Matrus\n> Type \\ to enter save menu\n> Use ^C (Ctrl/Command+C) to exit\n');
let sm = 0;
while(1) {
    if(sm == 1) {
        console.log('Save menu\n1 > Save\n2 > Load\n');
    };
    var inp = prompt('Input > ', {encoding: 'utf8'});
    if(inp == '\\' && !sm) {
        sm = 1;
        continue;
    } else if(sm) {
        if(inp == '1') {
            console.log(`Save > ${zlib.deflateSync(Buffer.from(JSON.stringify(curdata), 'utf8').toString('utf8')).toString('base64')}\n`);
        } else if(inp == '2') {
            console.log();
            curdata = JSON.parse(zlib.inflateSync(Buffer.from(prompt('Save > '), 'base64')).toString('utf8'));
            console.log();
        } else {
            console.log('Output > Invalid input\n');
        };
        sm = 0;
        continue;
    };
    if(!sm) console.log(`Output > ${[save(inp), gen()][1]}\n`);
};