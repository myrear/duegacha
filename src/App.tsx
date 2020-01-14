import React, { useState } from 'react';
import styled from 'styled-components';
import Main from './Main'
import { Route, Switch } from 'react-router-dom'
import { AppBar, Toolbar, Grid, IconButton, Typography } from '@material-ui/core';
import Preferences from './Preferences';
import { Menu } from "@material-ui/icons";
import SideMenu from './SideMenu'
import { ChangingGachaBehaviorContext, ChangingGachaBehavior } from "./preference";

const App = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [changingGachaBehavior, setChangingGachaBehavior] = useState(ChangingGachaBehavior.DoNotChange)

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
              <ChangingGachaBehaviorContext.Provider value={[changingGachaBehavior, setChangingGachaBehavior]}>
                <MainWrapper>
                  <Main />
                </MainWrapper>
              </ChangingGachaBehaviorContext.Provider>
            </Route>
            <Route path='/preferences'>
              <ChangingGachaBehaviorContext.Provider value={[changingGachaBehavior, setChangingGachaBehavior]}>
                <Preferences />
              </ChangingGachaBehaviorContext.Provider>
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

export default App;
