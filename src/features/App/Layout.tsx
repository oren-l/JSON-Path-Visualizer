import styled, { css } from 'styled-components/macro'

export const absoluteFill = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const Layout = styled.div`
  ${absoluteFill}

  display: grid;
  grid-template-rows: 64px auto;
  grid-template-areas:
    "toolbar"
    "main"
  ;
  overflow: hidden;
`

export const Toolbar = styled.div`
  grid-area: toolbar;
  background-color: ${props => props.theme.palette.background.default};
  align-items: center;
  display: flex;
`

export const Main = styled.main`
  ${absoluteFill}

  grid-area: main;
  background-color: ${props => props.theme.palette.background.paper};
  overflow: auto;
  display: flex;
`
