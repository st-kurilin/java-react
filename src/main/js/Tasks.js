import React, {useState, useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/DoneOutline";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 480,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    createForm: {
        display: 'flex',
        width: '100%',
    },
    createInput: {
        flexGrow: 2
    }
}));

export default props => {
    const {todo, done, onMarkTaskAsDone, onTaskDelete, onTaskCreate, taskInCreation} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List subheader={<li/>}>
                <ListSubheader>TODO</ListSubheader>
                {todo.map(t => {
                    return <ListItem key={t.id} role={undefined}>
                        <ListItemText id={t.id} primary={t.title}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={() => onMarkTaskAsDone(t.id)}>
                                <DoneIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
                <ListItem key="create" role={undefined}>
                    <CreateTask onTaskCreate={onTaskCreate} taskInCreation={taskInCreation}/>
                </ListItem>
                <ListSubheader>DONE</ListSubheader>
                {done.map(t => {
                    return <ListItem key={t.id} role={undefined} button>
                        <ListItemText id={t.id} primary={<s>{t.title}</s>}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={() => onTaskDelete(t.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
        </div>
    );
};

const CreateTask = props => {
    const {onTaskCreate, taskInCreation} = props;
    const classes = useStyles();
    const inputRef = useRef();
    const [title, setTitle] = useState("");
    const onSubmit = e => {
        if (e && e.preventDefault) e.preventDefault();
        if (taskInCreation) return;
        onTaskCreate(title).then(() => {
            inputRef.current.focus()
        });
        setTitle("");
    };
    return <form className={classes.createForm} onSubmit={onSubmit}>
        <TextField id="filled-basic" label="Filled" variant="filled" className={classes.createInput}
                   disabled={taskInCreation}
                   autoFocus={true} inputRef={inputRef}
                   value={title || ""} onChange={e => setTitle(e.target.value)}/>
        <Button color="primary" onClick={onSubmit} disabled={taskInCreation}>Create</Button>
    </form>
};

