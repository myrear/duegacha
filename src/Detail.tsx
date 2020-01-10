import React from 'react'
import { Appearance as GachaAppearance } from "./Gacha";
import { Grid, Badge, Typography } from '@material-ui/core'
import styled from 'styled-components'

interface Props {
    appearance?: GachaAppearance
}

export default (props: Props) => {
    const { appearance } = props

    return (
        <Grid container>
            <Grid item xs={12}>
                <Badge color='primary' badgeContent={ appearance?.number }>
                    <StyledTypography variant='h6'>
                        {appearance?.display}
                    </StyledTypography>
                </Badge>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>
                    {appearance?.ability}
                </Typography>
            </Grid>
        </Grid>
    )
}

const StyledTypography = styled(Typography)`
    padding: 0px 10px;
`