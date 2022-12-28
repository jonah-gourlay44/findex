import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        flexGrow: 1,
    },
    searchIcon: {
        width: theme.spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(),
        paddingRight: theme.spacing(),
        paddingBottom: theme.spacing(),
        paddingLeft: theme.spacing(10),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
    },
    toolbar: {
        alignItems: 'center',
    }
});

class SearchBar extends React.Component {
    state = {
        inputValue: '',
    };
    
    constructor(props) {
        super(props);
    }

    setInputValue(inputValue) {
        this.setState({
            inputValue: inputValue,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Toolbar>
                    <div style={{flexGrow: 1}}>
                        <TextField 
                            {...this.props.params} 
                            size='small'
                            variant='outlined'
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            className={classes.search}
                            placeholder='Search for a ticker symbol'
                            onKeyDown={(event) => {
                                if (event.key == 'Enter') {
                                    this.props.onSearch(event.target.value);
                                }
                            }}
                        />
                    </div>
                    <div className={classes.grow} />
                </Toolbar>
            </div>
        )
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);