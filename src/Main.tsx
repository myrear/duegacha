import React, { useState, useEffect } from 'react'
import styled, { Keyframes, keyframes } from 'styled-components'
import { Appearance, GachaKind, DogiragonGachaAppearances, DokindamGachaAppearances } from './Gacha'
import { Paper, IconButton, Grid, Typography, Tab, Tabs } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
import Detail from './Detail'
import { A_REEL_HEIGHT, REELING_DURATION, LAST_USED_GACHA_KIND_KEY, STARTUP_GACHA_KIND_KEY } from "./constants";
import { StartupGachaKind } from "./preference";
import './array.extension'
import './number.exntension'

export default () => {
    const [isReeling, setIsReeling] = useState(false)
    const [animation, setAnimation] = useState(Reeling1)
    const [appearance, setAppearance] = useState<Appearance | undefined>(undefined)
    const [appearances, setAppearances] = useState(DogiragonGachaAppearances.concat([]).orderFromIndex(DogiragonGachaAppearances.length.randomInteger()))
    const [kind, setKind] = useState<GachaKind | undefined>(undefined)

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
        if (kind === undefined) return;

        // 最後に使用したガチャとして保存
        localStorage.setItem(LAST_USED_GACHA_KIND_KEY, kind.toString())

        if (kind === GachaKind.Dokindam) {
            setAppearances(DokindamGachaAppearances.concat([]).orderFromIndex(DokindamGachaAppearances.length.randomInteger()))
        } else setAppearances(DogiragonGachaAppearances.concat([]).orderFromIndex(DogiragonGachaAppearances.length.randomInteger()))

        setAppearance(undefined)
    }, [kind])

    // ガチャを回す時
    const onPlayReeling = (): void => {
        if (isReeling) return;

        setIsReeling(true)

        const index = appearances.length.randomInteger()
        const newAppearances = appearances.orderFromIndex(index)
        setAppearances(newAppearances)
        const newAppearance = newAppearances[appearances.length - 3]

        window.setTimeout(() => {
            setIsReeling(false)
            setAppearance(newAppearance)
        }, REELING_DURATION)

        if (animation === Reeling1) {
            setAnimation(Reeling2)
        } else {
            setAnimation(Reeling1)
        }
    }

    const onChangeGachaKind = (e: React.ChangeEvent<{}>, k: GachaKind) => {
        if (isReeling) return;
        setKind(k)
    }

    return (
        <Grid container spacing={2} alignItems={'stretch'} justify={'center'}>
            <Grid item xs={12}>
                <Paper>
                    <Tabs value={kind} onChange={onChangeGachaKind} indicatorColor='primary' centered variant='fullWidth'>
                        <Tab value={GachaKind.Dogiragon} label='ドギラゴン・ガチャ' />
                        <Tab value={GachaKind.Dokindam} label='ドキンダム・ガチャ' />
                    </Tabs>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={'auto'}>
                <Paper>
                    <ReelBox>
                        <ViewBox>
                            <Items animation={animation}>
                                {
                                    appearances.concat(appearances).concat(appearances).map((v, i) => {
                                        return (
                                            <Item key={i}>
                                                <Typography variant='h5'>
                                                    {v.display}
                                                </Typography>
                                            </Item>
                                        )
                                    })
                                }
                            </Items>
                        </ViewBox>
                        <IconButton onClick={onPlayReeling}>
                            <Replay fontSize='large' />
                        </IconButton>
                    </ReelBox>
                </Paper>
            </Grid>
            <Grid item xs={12} sm>
                <VerticalFilledPaper>
                    <DetailWrapper>
                        <Detail appearance={appearance} />
                    </DetailWrapper>
                </VerticalFilledPaper>
            </Grid>
        </Grid>
    )
}

const ViewBox = styled.div`
    box-sizing: border-box;
    min-width: 250px;
    width: 100%;
    height: ${A_REEL_HEIGHT * 3}px;
    mask-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 33.3%, rgba(0, 0, 0, 1) 66.6%, rgba(0, 0, 0, 0) 100%);
    overflow: hidden;
`

const VerticalFilledPaper = styled(Paper)`
    height: 100%;
    min-height: 150px;
`

const DetailWrapper = styled.div`
    padding: 16px;
`

const ReelBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Items = styled.div<{ animation: Keyframes }>`
    animation-name: ${props => props.animation};
    animation-duration: ${REELING_DURATION}ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(.16,.78,.6,1.1);
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: ${A_REEL_HEIGHT}px;
    border-bottom: 1px solid #757575;
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