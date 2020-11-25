const glob = require('glob');

let result = null;
console.time('glob')
result = glob.sync(__dirname + '/**/*')

glob(__dirname + '/**/*',(err, res)=>{
  console.log(res)
})

console.timeEnd('glob')