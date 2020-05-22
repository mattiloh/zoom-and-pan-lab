import * as React from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import Container from "./components/Container"
import Canvas from "./components/Canvas"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <AutoSizer>
          {({ width, height }) => <Canvas width={width} height={height} />}
        </AutoSizer>
      </Container>
    </>
  )
}
