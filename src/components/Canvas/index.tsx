import React, { useState, useCallback } from "react"
import Container from "./Container"

type Props = {
  width: number
  height: number
}

const IMAGE_WIDTH = 2048
const IMAGE_HEIGHT = 1536

type Point = {
  x: number
  y: number
}

// <img src="/heic0715a.jpg" />
export default function Canvas({ width, height }: Props) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 })
  const [panDelta, setPanDelta] = useState<Point>({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [mouseStartPos, setMouseStartPos] = useState<Point>({ x: 0, y: 0 })
  const ratio = IMAGE_WIDTH / IMAGE_HEIGHT
  const planeWidth = 2 * width
  const planeHeight = 2 * height
  const objectWidth = 200
  const objectHeight = 200
  const objectPercentageWidth = objectWidth / (planeWidth / 100)
  const objectPercentageHeight = objectHeight / (planeHeight / 100)
  const translatedPlaneWidth = zoom * planeWidth
  const translatedPlaneHeight = zoom * planeHeight
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      setZoom(zoom => Math.min(4, zoom + 0.2))
    } else {
      setZoom(zoom => Math.max(1, zoom - 0.2))
    }
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsPanning(true)
    setMouseStartPos({ x: e.screenX, y: e.screenY })
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setPanDelta({
          x: mouseStartPos.x - e.screenX,
          y: mouseStartPos.y - e.screenY
        })
      }
    },
    [mouseStartPos, isPanning]
  )

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      setIsPanning(false)
      setPan(pan => ({ x: pan.x + panDelta.x, y: pan.y + panDelta.y }))
      setPanDelta({ x: 0, y: 0 })
    },
    [panDelta]
  )

  return (
    <Container
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ width, height }}
    >
      <div
        style={{
          width: translatedPlaneWidth,
          height: translatedPlaneHeight,
          backgroundSize: `${zoom * 40}px ${zoom * 40}px`,
          backgroundImage:
            "radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)",
          border: "1px solid",
          position: "absolute",
          left: width / 2 - translatedPlaneWidth / 2 - pan.x - panDelta.x,
          top: height / 2 - translatedPlaneHeight / 2 - pan.y - panDelta.y
        }}
      >
        <div
          style={{
            width: `${objectPercentageWidth}%`,
            height: `${objectPercentageHeight}%`,
            borderRadius: 999999,
            background: "tomato",
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: `-${objectPercentageWidth / 2}%`,
            marginTop: `-${objectPercentageHeight / 2}%`
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              background: "#000",
              borderRadius: 9999,
              position: "absolute",
              left: "-50%",
              marginLeft: -10,
              marginTop: -10
            }}
          />
        </div>
      </div>
    </Container>
  )
}
