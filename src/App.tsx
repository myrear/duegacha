import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Appearance, DogiragonGachaAppearances, GachaKind, DokindamGachaAppearances } from './Gacha';
import { REELING_DURATION, A_REEL_HEIGHT } from "./constants";
import './array.extension'
import './number.exntension'
import Main from './Main'

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animation, setAnimation] = useState(Reeling1)
  const [appearance, setAppearance] = useState<Appearance | undefined>(undefined)
  const [appearances, setAppearances] = useState(DogiragonGachaAppearances.concat([]).orderFromIndex(DogiragonGachaAppearances.length.randomInteger()))
  const [kind, setKind] = useState(GachaKind.Dogiragon)

  const onPlayReeling = (): void => {
    if (isAnimating) return;

    setIsAnimating(true)

    const index = appearances.length.randomInteger()
    const newAppearances = appearances.orderFromIndex(index)
    setAppearances(newAppearances)
    const newAppearance = newAppearances[appearances.length - 3]
    
    window.setTimeout(() => {
      setIsAnimating(false)
      setAppearance(newAppearance)
    }, REELING_DURATION)

    if (animation === Reeling1) {
      setAnimation(Reeling2)
    } else {
      setAnimation(Reeling1)
    }
  }

  const onChangeGachaKind = (e: React.ChangeEvent<{}>, k: GachaKind) => {
    setKind(k)

    switch (k) {
      case GachaKind.Dokindam:
        setAppearances(DokindamGachaAppearances.concat([]).orderFromIndex(DokindamGachaAppearances.length))
        break
      default:
        setAppearances(DogiragonGachaAppearances.concat([]).orderFromIndex(DogiragonGachaAppearances.length))
    }
    setAppearance(undefined)
  }

  return (
    <Root>
      <MainWrapper>
        <Main animation={animation} appearances={appearances} appearance={appearance} onPlayReeling={onPlayReeling} kind={kind} onChangeGachaKind={onChangeGachaKind} />
      </MainWrapper>
    </Root>
  );
}

const Root = styled.div`
  margin: auto;
  width: 100vw;
  max-width: 768px;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.1);
  user-select: none;
  overflow: hidden;
`

const MainWrapper = styled.div`
  height: 100%;
  margin: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const Reeling1 = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, calc(-100% + ${A_REEL_HEIGHT * 4}px), 0)
  }
`

const Reeling2 = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, calc(-100% + ${A_REEL_HEIGHT * 4}px), 0)
  }
`

export default App;
