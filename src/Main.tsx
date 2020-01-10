import React from 'react'
import styled, { Keyframes } from 'styled-components'
import { Appearance, GachaKind } from './Gacha'
import { Paper, IconButton, Grid, Typography, Tab, Tabs } from '@material-ui/core'
import { Replay } from '@material-ui/icons'
import Detail from './Detail'
import { A_REEL_HEIGHT, REELING_DURATION } from "./constants";

interface Props {
    animation: Keyframes
    appearances: Appearance[]
    appearance?: Appearance
    onPlayReeling: () => void
    kind: GachaKind
    onChangeGachaKind: (e: React.ChangeEvent<{}>, newValue: GachaKind) => void
}

export default (props: Props) => {
    const { animation, appearance, appearances, onPlayReeling: onClick, kind, onChangeGachaKind } = props

    return (
        <Grid container spacing={3} alignItems={'stretch'} justify={'center'}>
            <Grid item xs={12}>
                <PaddingPaper>
                    <Tabs value={kind} onChange={onChangeGachaKind} indicatorColor='primary' centered variant='fullWidth'>
                        <Tab value={GachaKind.Dogiragon} label='ドギラゴン・ガチャ' />
                        <Tab value={GachaKind.Dokindam} label='ドキンダム・ガチャ' />
                    </Tabs>
                </PaddingPaper>
            </Grid>
            <Grid item xs={12} sm={'auto'}>
                <PaddingPaper>
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
                        <IconButton onClick={onClick}>
                            <Replay fontSize='large' />
                        </IconButton>
                    </ReelBox>
                </PaddingPaper>
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
    width: 200px;
    height: ${A_REEL_HEIGHT * 3}px;
    mask-image: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 33.3%, rgba(0, 0, 0, 1) 66.6%, rgba(0, 0, 0, 0) 100%);
    overflow: hidden;
`

const VerticalFilledPaper = styled(Paper)`
    height: 100%;
    min-height: 150px;
`

const PaddingPaper = styled(Paper)`
    padding: 16px;
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