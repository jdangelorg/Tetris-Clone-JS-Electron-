let rightBorderX = 250;
let leftBorderX = 0;
let downBorderY = 500;
let hasRotated = false;

export function handleRightPress(tetronimoSprite, oneBlockWidth, blocksWide) {
  if(!hasRotated){
    rightBorderX = blocksWide - (Math.ceil(tetronimoSprite.width / 5) * 5);
  }
  if(tetronimoSprite.x !== rightBorderX){
    tetronimoSprite.x += oneBlockWidth;
//     console.log(tetronimoSprite.x, blocksWide)
  }
}

export function handleLeftPress(tetronimoSprite, oneBlockWidth) {
  if(tetronimoSprite.x !== leftBorderX) {
    tetronimoSprite.x -= oneBlockWidth;
//     console.log(tetronimoSprite.x)
  }
}

export function handleDownPress(tetronimoSprite, oneBlockWidth, blocksTall) {
  if(!hasRotated){
    downBorderY = blocksTall - (Math.ceil(tetronimoSprite.height / 5) * 5);
  }
  if(tetronimoSprite.y !== downBorderY) {
    tetronimoSprite.y += oneBlockWidth;
//     console.log(tetronimoSprite.x, oneBlockWidth, blocksTall, tetronimoSprite.height)
  }
}

export function handleUpPress(tetronimoSprite, oneBlockWidth, blocksWide, blocksTall) {
  hasRotated = true;

  tetronimoSprite.rotation += Math.PI / 2; // Rotate by 90 degrees (π/2 radians)
  let degrees = (tetronimoSprite.rotation * 180) / Math.PI;

  if(Math.round(degrees % 360 / 90) * 90 === 90){
    console.log('rotation 1')
    tetronimoSprite.x += oneBlockWidth * 3
    console.log('x',tetronimoSprite.x,'y',tetronimoSprite.y)

    leftBorderX = 0 + oneBlockWidth * 2;
    rightBorderX = blocksWide;
    downBorderY = blocksTall - oneBlockWidth * 3;
    console.log('rightBorderX',rightBorderX,'leftBorderX',leftBorderX)
  } else if(Math.round(degrees % 360 / 90) * 90 === 180){
    console.log('rotation 2')
    tetronimoSprite.y += oneBlockWidth * 2
    console.log('x',tetronimoSprite.x,'y',tetronimoSprite.y)

    leftBorderX = 0 + oneBlockWidth * 3;
    rightBorderX = blocksWide;
    downBorderY = blocksTall;
    console.log('rightBorderX',rightBorderX,'leftBorderX',leftBorderX)
  } else if(Math.round(degrees % 360 / 90) * 90 === 270){
    console.log('rotation 3')
    tetronimoSprite.x -= oneBlockWidth * 2
    tetronimoSprite.y += oneBlockWidth * 1
    console.log('x',tetronimoSprite.x,'y',tetronimoSprite.y)

    leftBorderX = 0;
    rightBorderX = blocksWide - oneBlockWidth * 2;
    downBorderY = blocksTall;
    console.log('rightBorderX',rightBorderX,'leftBorderX',leftBorderX)
  } else if(Math.round(degrees % 360 / 90) * 90 === 0){
    console.log('back to start')
    tetronimoSprite.x -= oneBlockWidth * 1
    tetronimoSprite.y -= oneBlockWidth * 3
    console.log('x',tetronimoSprite.x,'y',tetronimoSprite.y)

    leftBorderX = 0;
    rightBorderX = blocksWide - (Math.ceil(tetronimoSprite.width / 5) * 5);
    downBorderY = blocksTall - (Math.ceil(tetronimoSprite.height / 5) * 5);
    console.log('rightBorderX',rightBorderX,'leftBorderX',leftBorderX)
  }
}


export function safetyMoveTetronimoUp(tetronimoSprite, oneBlockWidth){
  tetronimoSprite.y -= oneBlockWidth;
}
