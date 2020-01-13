import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Grid, Card, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import { StartupGachaKind, isStartupGachaKind } from './preference'
import { STARTUP_GACHA_KIND_KEY } from './constants'

const getDescription = (v: StartupGachaKind) => {
    switch (v) {
        case StartupGachaKind.Dogiragon:
            return 'ドギラゴン・ガチャ'
        case StartupGachaKind.Dokindam:
            return 'ドキンダム・ガチャ'    
        default:
            return '最後に使用したガチャ'
    }
}

export default () => {
    useEffect(() => {
        const savedStartupGacha = localStorage.getItem(STARTUP_GACHA_KIND_KEY)
        if (savedStartupGacha !== null) {
            const parsed = parseInt(savedStartupGacha)
            if (isStartupGachaKind(parsed)) {
                setStartupGacha(parsed)
                return;
            }
        }
        localStorage.setItem(STARTUP_GACHA_KIND_KEY, StartupGachaKind.LastUsed.toString())
    }, [])

    const [startupGacha, setStartupGacha] = useState(StartupGachaKind.LastUsed)

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStartupGacha(event.target.value as StartupGachaKind)
    };

    return (
        <Root>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <InnerCard>
                            <FormControl>
                                <InputLabel>起動時のガチャ</InputLabel>
                                <Select value={startupGacha} onChange={handleChange}>
                                    <MenuItem value={StartupGachaKind.LastUsed}>{getDescription(StartupGachaKind.LastUsed)}</MenuItem>
                                    <MenuItem value={StartupGachaKind.Dogiragon}>{getDescription(StartupGachaKind.Dogiragon)}</MenuItem>
                                    <MenuItem value={StartupGachaKind.Dokindam}>{getDescription(StartupGachaKind.Dokindam)}</MenuItem>
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
    justify-content: center;
`