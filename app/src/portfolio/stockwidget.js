import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Plot from 'react-plotly.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
    },
});

class StockWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton aria-label="More Options">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <div>
                        <Typography style={{display: 'inline', paddingRight: 50}}>
                            {this.props.stock}          
                        </Typography>
                        <Typography style={{display: 'inline'}}>
                            ${this.props.price}
                        </Typography>
                        </div>
                    }
                    subheader={this.props.name}
                />
                <CardContent style={{flexGrow: 1, height: '85%'}}>
                    <Plot
                        data={this.props.data}
                        config={{
                            displayModeBar: false,
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            flexGrow: 1,
                        }}
                        layout={{
                            autosize: true,
                            margin: {
                                l: 50,
                                r: 70,
                                b: 70,
                                t: 20,
                                pad: 4,
                            },
                            xaxis: {
                                showgrid: false,
                                tickangle: 30,
                                tick0: this.props.data[0].x[0],
                                tickmode: 'linear',
                                dtick: this.props.data[0].x.length / 10,
                            }
                        }}
                        useResizeHandler
                    />
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(StockWidget);