module.exports = function(playerAction) {
  const random = Math.random() * 3
  let computerAction = ''
  if (random < 1) {
    computerAction = 'stone'
  } else if (random > 2) {
    computerAction = 'scissors'
  } else {
    computerAction = 'cloth'
  }
  if (playerAction === computerAction) {
    console.log('平局')
    return 0;
  } else if (
    (playerAction === 'cloth' && computerAction === 'scissors') ||
    (playerAction === 'scissors' && computerAction === 'stone') ||
    (playerAction === 'stone' && computerAction === 'cloth')
  ) {
    console.log('电脑赢了')
    return 1
  } else {
    console.log('我赢了')
    return -1
  }
  
}
