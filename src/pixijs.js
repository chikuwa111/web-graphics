import * as PIXI from 'pixi.js'

const stage = new PIXI.Container()

const renderer = PIXI.autoDetectRenderer(640, 360, {
  antialias: true,
  backgroundColor: 0x00ffd4,
})

document.getElementById('stage').appendChild(renderer.view)

const animation = () => {
  requestAnimationFrame(animation)
  renderer.render(stage)
}

animation()

const loader = new PIXI.loaders.Loader()

loader
  .add('sprite', 'assets/penguin/penguin.json')
  .once('complete', () => {
    const frames = [0, 1, 0, 2]
    const texturePenguins = Array.from({length: 4}).map((_v, i) => (
      frames.map(frame => (
        PIXI.Texture.fromFrame(`penguin-${i}-${frame}`)
      ))
    ))

    const movePenguins = Array.from({length: 4}).map((_v, i) => {
      const penguin = new PIXI.extras.AnimatedSprite(texturePenguins[i])
      penguin.animationSpeed = 0.1
      penguin.play()
      return penguin
    })
    movePenguins[0].position.set(130, 130)
    movePenguins[1].position.set(230, 130)
    movePenguins[2].position.set(330, 130)
    movePenguins[3].position.set(430, 130)

    stage.addChild(movePenguins[0], movePenguins[1], movePenguins[2], movePenguins[3])
  })

  loader.load()
