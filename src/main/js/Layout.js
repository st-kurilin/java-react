import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    content: {
        height: '100%',
        overflowY: 'scroll',
        margin: theme.spacing(4),
    }
}));

export default props => {
    const classes = useStyles();
    return <div className={classes.root}>
        <AppBar position='sticky'>
            <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Global Todo App
                </Typography>
            </Toolbar>
        </AppBar>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
}