import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChart from '@material-ui/icons/ShowChart';
import Home from '@material-ui/icons/Home';
import { Link as RouterLink } from 'react-router-dom';

import SearchBarAutocomplete from 'components/searchbarautocomplete';

const drawerWidth = 240;

const style = theme => ({
    root: {
        display: 'flex',
        marginBottom: '50px',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    hide: {
        display: 'none',
    },
    spacer: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
});

class SideBar extends React.Component {
    state = {
        isOpen: false,
    };
    
    constructor(props) {
        super(props);

        this.open = this.handleDrawerOpen.bind(this);
        this.close = this.handleDrawerClose.bind(this);
    }

    handleDrawerOpen()  {
        this.setState({
            isOpen: true,
        });    
    }

    handleDrawerClose() {
        this.setState({
            isOpen: false,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.isOpen,
                    })}
                >
                <Toolbar>
                    {this.props.searchBar ? 
                        <SearchBarAutocomplete
                            onSearch={this.props.onSearch} 
                            updateOptions={this.props.updateOptions}
                            formatOption={this.props.formatOption}
                        /> 
                    :   <div className={classes.spacer}></div>}
                    <IconButton
                        color="inherit"
                        aria-label="open sidebar"
                        onClick={this.open}
                        edge="end"
                        className={clsx(this.state.isOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>   
                </Toolbar>
                
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={this.state.isOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.close}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['Home', 'Portfolio'].map((text, index) => (
                            <ListItem button key={text} component={RouterLink} to={index === 0 ? '/' : '/portfolio'}>
                                <ListItemIcon>{index === 0 ? <Home /> : <ShowChart />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer> 
                     
            </div>
        );
    }
}

export default withStyles(style)(SideBar);