const playerAction = process.argv[process.argv.length - 1]

const game = require('./lib')

let count = 0;
process.stdin.on('data', e => {
  const playerAction = e.toString().trim()
  const i = game(playerAction)
  
  if(i === -1 && ++count >= 3){
    process.exit()
  }
})
