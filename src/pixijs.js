import * as PIXI from 'pixi.js'

const stage = new PIXI.Container()

const renderer = PIXI.autoDetectRenderer(640, 360, {
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

    const elementPenguin = new PIXI.extras.AnimatedSprite(texturePenguins[3])
    elementPenguin.animationSpeed = 0.1
    elementPenguin.play()

    elementPenguin.anchor.set(0.5)
    elementPenguin.position.set(640 / 2, 360 / 2)

    stage.addChild(elementPenguin)

    document.addEventListener('keydown', e => {
      const key = e.key
      switch (key) {
        case 'ArrowLeft':
          elementPenguin.textures = texturePenguins[0]
          elementPenguin.position.x -= 16
          break
        case 'ArrowUp':
          elementPenguin.textures = texturePenguins[1]
          elementPenguin.position.y -= 16
          elementPenguin.scale.x /= 1.25
          elementPenguin.scale.y /= 1.25
          break
        case 'ArrowRight':
          elementPenguin.textures = texturePenguins[2]
          elementPenguin.position.x += 16
          break
        case 'ArrowDown':
          elementPenguin.textures = texturePenguins[3]
          elementPenguin.position.y += 16
          elementPenguin.scale.x *= 1.25
          elementPenguin.scale.y *= 1.25
          break
        default:
      }
      elementPenguin.play()
    })
  })

  loader.load()
