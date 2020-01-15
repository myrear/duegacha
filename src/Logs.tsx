import React from 'react'
import { Appearance } from './Gacha'
import { Grid, Card } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
    logs: Array<Appearance & {timestamp: number}>
}

export default (props: Props) => {
    const { logs } = props

    return (
        <Card>
            <ContainerGrid container>
                {logs.map(v => {
                    const { display, timestamp } = v
                    const date = new Date()
                    date.setTime(timestamp)

                    return (
                        <Grid item xs={12} key={timestamp}>
                            {display}
                        </Grid>
                    )
                })}
            </ContainerGrid>
        </Card>
    )
}

const ContainerGrid = styled(Grid)`
    padding: 24px;
`