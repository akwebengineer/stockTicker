import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
// import CommentIcon from '@material-ui/icons/Comment';


import actionCreators from '../redux/actionCreators';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft: '45px'
  },
});

const mapStateToProps = (state) => ({
  ...state
});

class StockList extends React.Component {
  state = {
    checked: true,
  };

  handleToggle = channel => () => {
    // debugger;
    // console.log(value);
    const { dispatch } = this.props;
    dispatch(actionCreators.unsubscribeChannel(channel, dispatch));

    // const { checked } = this.state;
    // const currentIndex = checked.indexOf(value);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(value);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // this.setState({
    //   checked: newChecked,
    // });
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div className={classes.root}>
        <List>
          {data.map((value, index) => (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              className={classes.listItem}
              onClick={this.handleToggle(value.symbol)}

            >
              <Checkbox
                checked= {this.state.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={value.symbol} />
              <ListItemText primary={value.lastSalePrice} />
              {/* <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction> */}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

StockList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(StockList));