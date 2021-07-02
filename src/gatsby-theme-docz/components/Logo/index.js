import React from 'react'
import { Link, useConfig } from 'docz'
import * as styles from './styles'
export const Logo = (props) => {
    const config = useConfig()
    return <div>
        <Link to="/" sx={styles.link}>
            {config.title}
        </Link>
    </div>
}
