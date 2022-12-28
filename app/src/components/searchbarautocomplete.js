import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchBar from 'components/searchbar';

class SearchBarAutocomplete extends React.Component {
    state = {
        value: null,
        inputValue: '',
        options: [],
    };
    
    constructor(props) {
        super(props);
    }

    setValue(value) {
        this.setState({
            ...this.state,
            value: value,
        });
    }

    setInputValue(inputValue) {
        this.setState({
            ...this.state,
            inputValue: inputValue,
        }, () => {
        if (this.props.updateOptions) {
            this.props.updateOptions(this.state).then(newOptions => {
                this.setOptions(newOptions);
            }).catch(error => {
                console.log(error);
                this.setOptions(this.state.value ? [this.state.value] : []);
            });
        }
        });
    }

    setOptions(options) {
        this.setState({
            ...this.state,
            options: options,
        });
    }

    render() {

        return (
            <Autocomplete
                style={{ flexGrow: 1 }}
                filterOptions={(x) => x}
                options={this.state.options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setOptions(newValue ? [newValue, ...this.state.options] : this.state.options);
                    this.setValue(newValue ? newValue.symbol : this.state.value);
                }}
                onInputChange={(event, newInputValue) => {
                    this.setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <SearchBar params={params} onSearch={this.props.onSearch} />  
                )}
                renderOption={(option) => {

                    if (this.props.formatOption) {
                        option = this.props.formatOption(option);
                    }

                    return (
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <span style={{ fontWeight: 400 }} >
                                    {option.primary ? option.primary : JSON.stringify(option)}
                                </span>

                                {option.secondary ? 
                                <Typography variant="body2" color="textSecondary">
                                    {option.secondary}
                                </Typography> 
                                : null }
                            </Grid>
                        </Grid>
                    );
                }}
            />
        );
    }
}

export default SearchBarAutocomplete;