import React from 'react'
import tw from 'twin.macro'
import colors from 'tailwindcss/colors'
import Layout from '../components/Layout'
import SceneComponent from '../components/simulator/SceneComponent'
import { Color3, FreeCamera, HemisphericLight, MeshBuilder, Vector3 } from '@babylonjs/core'

let box
let darkMode = false

const onSceneReady = (scene) => {
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
  camera.setTarget(Vector3.Zero())

  const canvas = scene.getEngine().getRenderingCanvas()
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  light.intensity = 0.7

  box = MeshBuilder.CreateBox('box', { size: 2 }, scene)
  box.position.y = 1

  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
}

const onRender = (scene) => {
  scene.clearColor = Color3.FromHexString(darkMode ? colors.gray[800] : '#ffffff')

  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime()

    const rpm = 4
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
  }
}

const Container = tw.div`w-full`

export default function SimulatorPage() {
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      darkMode = document.documentElement.classList.contains('dark')
    })
  
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  return (
    <Layout>
      <Container>
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id="simulator-canvas" />
      </Container>
    </Layout>
  )
}
