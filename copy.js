const arg = require('arg');
 
const args = arg({
    // Types
    '--help':    Boolean,
    '--version': String,
    '--verbose': arg.COUNT,   // Counts the number of times --verbose is passed
    '--port':    Number,      // --port <number> or --port=<number>
    '--name':    String,      // --name <string> or --name=<string>
    '--tag':     [String],    // --tag <string> or --tag=<string>
 
    // Aliases
    '-v':        '--verbose',
    '-n':        '--name',    // -n <string>; result is stored in --name
    '--label':   '--name'     // --label <string> or --label=<string>;
                              //     result is stored in --name
});
 
console.log(Object.keys(args));