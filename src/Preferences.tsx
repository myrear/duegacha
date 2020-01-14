import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grid, Card, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { StartupGachaKind, isStartupGachaKind, ChangingGachaBehavior } from './preference'
import { STARTUP_GACHA_KIND_KEY, CHANGING_GACHA_BEHAVIOR_KEY } from './constants'

const getGachaKindDescription = (v: StartupGachaKind) => {
    switch (v) {
        case StartupGachaKind.Dogiragon:
            return 'ドギラゴン・ガチャ'
        case StartupGachaKind.Dokindam:
            return 'ドキンダム・ガチャ'    
        default:
            return '最後に使用したガチャ'
    }
}

const getChangingGachaBehaviorDescription = (v: ChangingGachaBehavior) => {
    switch (v) {
        case ChangingGachaBehavior.DoNotChange:
            return '切り替えない'
        case ChangingGachaBehavior.StopReelingAndForceChanging:
            return 'ガチャを止め、切り替える'
    }
}

export default () => {
    const [startupGacha, setStartupGacha] = useState(StartupGachaKind.LastUsed)
    const [changingGachaBehavior, setChangingGachaBehavior] = useState(ChangingGachaBehavior.DoNotChange)

    useEffect(() => {
        const savedStartupGacha = localStorage.getItem(STARTUP_GACHA_KIND_KEY)
        if (savedStartupGacha !== null) {
            const parsed = parseInt(savedStartupGacha)
            if (isStartupGachaKind(parsed)) {
                setStartupGacha(parsed)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STARTUP_GACHA_KIND_KEY, startupGacha.toString())
    }, [startupGacha])

    useEffect(() => {
        localStorage.setItem(CHANGING_GACHA_BEHAVIOR_KEY, changingGachaBehavior.toString())
    }, [changingGachaBehavior])

    const handleChange = function <T>(setState: React.Dispatch<React.SetStateAction<T>>) {
        return (e: React.ChangeEvent<{ value: unknown }>) => {
            setState(e.target.value as T)
        }
    }

    return (
        <Root>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <InnerCard>
                            <FormControl fullWidth>
                                <InputLabel>起動時のガチャ</InputLabel>
                                <Select value={startupGacha} onChange={handleChange<StartupGachaKind>(setStartupGacha)}>
                                    {[StartupGachaKind.LastUsed, StartupGachaKind.Dogiragon, StartupGachaKind.Dokindam].map((v, i) => {
                                        return (
                                            <MenuItem value={v} key={i}>{getGachaKindDescription(v)}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </InnerCard>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <InnerCard>
                            <FormControl fullWidth>
                                <InputLabel>ガチャ中の、ガチャ切替の挙動</InputLabel>
                                <Select value={changingGachaBehavior} onChange={handleChange<ChangingGachaBehavior>(setChangingGachaBehavior)}>
                                    {[ChangingGachaBehavior.DoNotChange, ChangingGachaBehavior.StopReelingAndForceChanging].map((v, i) => {
                                        return (
                                            <MenuItem value={v} key={i}>{getChangingGachaBehaviorDescription(v)}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </InnerCard>
                    </Card>
                </Grid>
            </Grid>
        </Root>
    )
}

const Root = styled.div`
    margin: 24px;
`

const InnerCard = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    margin: 16px 0;
    padding: 0 16px;
    justify-content: center;
`