import React from 'react';
import Sidebar from 'components/sidebar';
import Plot from 'react-plotly.js';
import Grid from '@material-ui/core/Grid';
import StockWidget from 'portfolio/stockwidget';

import APIClient from 'main/client';

class Portfolio extends React.Component {

    state = {
        ticker_data: [{
            x: [],
            y: [],
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'blue'},
        }],
        ticker_info: [{}],
    }

    constructor(props) {
        super(props);

        this.apiClient = new APIClient();

        this.apiCall = this.apiCall.bind(this);
    }

    componentDidMount() {
        
    }

    onSearch = (target) => {
        this.apiClient.getTickerHistoryYahoo(target).then(data => {
            if (data.history.Close !== undefined) {
                let obj = data.history.Close;
                let x = data.history.Date;
                this.setPlotData(Object.values(x), Object.values(obj));
                this.setTickerInfo(data.info);
            }
        });
    }

    setPlotData(x, y) {

        this.setState({
            ...this.state,
            ticker_data: [{
                ...this.state.ticker_data[0],
                x: x,
                y: y,
            }],
        });
    }

    setTickerInfo(info) {

        this.setState({
            ...this.state,
            ticker_info: info,
        });
    }

    dataCallback(data, state) {
        let newOptions = [];

        if (state.value) {
            newOptions = [state.value];
        }

        if (data.tickers.length > 0) {
            newOptions = [...newOptions, ...data.tickers];
        }

        return newOptions;
    }

    apiCall(state) {

        return new Promise((resolve, reject) => {
            if (state.inputValue === '') {
                resolve(state.value ? [state.value] : []);
            }

            /*this.apiClient.getTickers(state.inputValue).then(data => {
                if (data.error === 0) {
                    resolve(this.dataCallback(data, state));
                } else {
                    console.log(data.message);
                    this.apiClient.getTickersYahoo(state.inputValue).then(data => {
                        if (data.error === 0) {
                            resolve(this.dataCallback(data, state));
                        }
                    });
                }
            }).catch(error => {
                reject(error);
            });*/

            this.apiClient.getTickersYahoo(state.inputValue).then(data => {
                if (data.error === 0) {
                    resolve(this.dataCallback(data, state));
                }
            }).catch(error => {
                reject(error);
            });

        });
    }

    formatOption(option) {
        let newOption = {};

        newOption['primary'] = option.symbol;
        newOption['secondary'] = option.name;

        return newOption;
    }

    render() {

        return (
            <div style={{height: '100%', overflow: 'hidden'}}>
                <Sidebar 
                    searchBar
                    onSearch={this.onSearch}
                    updateOptions={this.apiCall}
                    formatOption={this.formatOption}
                />
                <Grid container spacing={10} style={{padding: '30px 10px', height: '100%'}}>
                <Grid item style={{flexGrow: 1, maxWidth: '100%', height: '100%'}}>
                <StockWidget
                    stock={this.state.ticker_info.symbol}
                    name={this.state.ticker_info.longName}
                    data={this.state.ticker_data}
                    price={this.state.ticker_info.ask}
                />
                </Grid>
                </Grid>
            </div>
        );
    }
}

export default Portfolio;