import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Appearance, DogiragonGachaAppearances, GachaKind, DokindamGachaAppearances } from './Gacha';
import { REELING_DURATION, A_REEL_HEIGHT, LAST_USED_GACHA_KIND_KEY, STARTUP_GACHA_KIND_KEY } from "./constants";
import './array.extension'
import './number.exntension'
import Main from './Main'
import { Route, Switch } from 'react-router-dom'
import { AppBar, Toolbar, Grid, IconButton, Typography } from '@material-ui/core';
import Preferences from './Preferences';
import { Menu } from "@material-ui/icons";
import SideMenu from './SideMenu'
import { StartupGachaKind } from './preference';

const App = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animation, setAnimation] = useState(Reeling1)
  const [appearance, setAppearance] = useState<Appearance | undefined>(undefined)
  const [appearances, setAppearances] = useState(DogiragonGachaAppearances.concat([]).orderFromIndex(DogiragonGachaAppearances.length.randomInteger()))
  const [kind, setKind] = useState<GachaKind | undefined>(undefined)
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  // 起動時のガチャ設定
  useEffect(() => {
    const savedKind = localStorage.getItem(LAST_USED_GACHA_KIND_KEY)
    const savedStartupGacha = localStorage.getItem(STARTUP_GACHA_KIND_KEY)

    if (savedStartupGacha === StartupGachaKind.Dokindam.toString()) { // ドキンダムガチャの場合
      setKind(GachaKind.Dokindam)
    } else if (savedStartupGacha === StartupGachaKind.Dogiragon.toString()) { // ドギラゴンガチャの場合
      setKind(GachaKind.Dogiragon)
    } else { // それ以外の場合、最後に使用したガチャの場合
      if (savedKind === GachaKind.Dokindam.toString()) { // ドキンダムガチャを最後に使用していた場合
        setKind(GachaKind.Dokindam)
      } else setKind(GachaKind.Dogiragon) // それ以外の場合（デフォルト）
    }
  }, [])

  // ガチャの種類が変更された時、種類に応じたガチャの出目に変更
  useEffect(() => {
    if (kind === GachaKind.Dokindam) {
      setAppearances(DokindamGachaAppearances.concat([]))
    } else setAppearances(DogiragonGachaAppearances.concat([]))
  }, [kind])

  // ガチャを回す時
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
    if (isAnimating) return;
    
    setKind(k)
    localStorage.setItem(LAST_USED_GACHA_KIND_KEY, k.toString())

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
      <Grid container direction='row' alignContent='stretch' alignItems='stretch'>
        <Grid item xs={12}>
          <Route path='/'>
            <AppBar position='static'>
              <Toolbar>
                <IconButton color='default' onClick={() => { setIsMenuOpened(true) }}>
                  <Menu />
                </IconButton>
                <Typography variant='h6'>
                  Menu
                </Typography>
              </Toolbar>
            </AppBar>
            <SideMenu isMenuOpened={isMenuOpened} onMenuClosed={() => setIsMenuOpened(false)} />
          </Route>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route exact path='/'>
              <MainWrapper>
                <Main animation={animation} appearances={appearances} appearance={appearance} onPlayReeling={onPlayReeling} kind={kind} onChangeGachaKind={onChangeGachaKind} />
              </MainWrapper>
            </Route>
            <Route path='/preferences'>
              <Preferences />
            </Route>
          </Switch>
        </Grid>
      </Grid>
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
  overflow: scroll;
`

const MainWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;

  @media screen and (max-height: 568px) {
    height: auto;
  }

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
