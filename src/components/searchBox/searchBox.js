import React from 'react';

import { connect } from 'react-redux';
import actionCreators from '../../redux/actionCreators';


import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    subBtn: {
        marginLeft: '-70px',
        marginTop: '30px'
    }
});




const mapStateToProps = (state) => (
    {
        ...state
    }
);
class SearchBox extends React.Component {
    constructor() {
        super();
        this.state = {
            searchBoxValue: ""
        };
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        inputValue: null
    }
    handleSubscribe(evt) {
        const { dispatch } = this.props;
        debugger;
        dispatch(actionCreators.subscribeChannel(this.state.searchBoxValue.split(',')[0]));
        this.setState(
            { searchBoxValue: "" }
        );
    }

    handleChange(evt) {
        this.setState(
            { searchBoxValue: evt.target.value }
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {/* <input type="text" ref="subscriptionList"></input> */}
                <TextField
                    id="stock-name"
                    label="Stock Symbol"
                    value={this.state.searchBoxValue}
                    onChange={this.handleChange}
                    className={classes.textField}
                    margin="normal"
                />
                <Button color="primary" className={classes.subBtn} onClick={this.handleSubscribe}>
                    Add
                </Button>
                {/* <button onClick={this.handleSubscribe}>Subscribe</button> */}
            </div>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps)(SearchBox));
