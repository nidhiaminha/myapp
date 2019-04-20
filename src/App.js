import React, { Component } from "react";
import "./App.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Display from "./components/Display";
import { AppBar, withStyles } from "@material-ui/core";
 import Avatar from '@material-ui/core/Avatar';
 import Typography from '@material-ui/core/Typography';
 import IconButton from '@material-ui/core/IconButton';
 import logo from './static/mj.jpg'; 
 

const styles = theme => ({
  appBar: {
    position: 'relative',
    
  },
  iconButtonAvatar: {
    padding: 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError:false,
      avgOrderNumber: null,
      avgOrderAmount: null,
      percentageToGO: null,
      amountHasError:false,
      percentError:false,
      floatError:false,
      orderError:false,
      calculated:null,
      percentHelper:'',
      floatHelper:''
    };
    this.calculate.bind(this);
  }

  // Validating all three fields
  handleInputChange = e => {
    const regex = /^(\d*\.)?\d+$/;
    // const regex = /^(\d{1,7}\.)?\d+$/;
    if(e.target.value==='' || regex.test(e.target.value))
    { this.setState({
      [e.target.name]: e.target.value
    });}
    else {
      this.setState({
        floatHelper:'enter 0-100 only',
        floatError:true
      })
    };    
  };

  //Allow values between 0-100 in the perecentage field
  handleInputChange1 = e => {
    const re=/^([0-9](\.\d*){0,1}|[0-9][0-9](\.\d*){0,1}|[1][0][0])$/;
    if(e.target.value==='' || re.test(e.target.value))
    { this.setState({
      [e.target.name]: e.target.value,
      percentError:false,
      percentHelper:''
    });}
    else {
      this.setState({
        percentHelper:'enter 0-100 only',
        percentError:true
      })
    };  
  };

  calculate = () => {
    if (
      this.state.avgOrderAmount &&
      this.state.avgOrderNumber &&
      this.state.percentageToGO
    ) {
      let result, totalToGo;
     const roundTo=require('round-to');
      totalToGo = ((this.state.avgOrderNumber * (this.state.percentageToGO / 100) * 0.2
      )); 
      //percentage that mojo takes and set the precision to 2 digits
      result = roundTo((totalToGo * this.state.avgOrderAmount * 0.08)); 
      this.setState({
        calculated: result
      });
    }
    else {
      this.setState({
        amountHasError:(!this.state.avgOrderAmount),
        percentError:!this.state.percentageToGO,
        orderError:!this.state.avgOrderNumber
      })
      if(!this.state.percentageToGO) {
        this.setState({
          percentHelper:'Do not leave blank'
        })
      }
    }; 
  };

  render() {
    const {classes} = this.props;
    return (
       <main className={classes.layout}>
      <div className="App">
        <AppBar position="static"  color="primary" className={classes.appBar}>
        <IconButton color="inherit" className={classes.iconButtonAvatar}>
        <Avatar className={classes.Avatar} src={logo} alt="mojo" />
        </IconButton>
        
        <Typography variant="title" color="inherit">
        Welcome Mojo User!
        </Typography>
      </AppBar>
      <AppBar/>
        <div id="input-form">
          <div id="percent-togo-div">
            <TextField
              error={this.state.orderError}
              helperText={!this.state.orderError ? " " : "Do not leave blank!"}
              id="orders-per-day"
              label="Avg # Of Orders / Month"
              name="avgOrderNumber"
              type="number"
              value={this.state.avgOrderNumber}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              maxLength="7"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">#</InputAdornment>
                ) 
              }}
            />
          </div>
          <div id="percent-togo-div">
            <TextField
              error={this.state.percentError }
              helperText={this.state.percentHelper}
              id="percent-togo"
              label="% of To-Go Orders / Month"
              name="percentageToGO"
              type="number"
              margin="normal"                                          
              value={this.state.percentageToGO}
              onChange={this.handleInputChange1}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                )
              }}
            />
          </div>
          <div id="order-amount-div" >
            <TextField
            //conditionally render this error message and maybe add some validation logic
              error={this.state.amountHasError}
              id="order-amount"
              label="Avg Order amount / Month"
              helperText={!this.state.amountHasError ? "" : " Do not leave blank!"}
              name="avgOrderAmount"
              type="number"
              value={this.state.avgOrderAmount}
              onChange={this.handleInputChange}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                )
              }}
            />
          </div>
          
          <Button onClick={this.calculate} variant="contained" color="primary">
            Calculate
          </Button>
        </div>

        {/* display component */}
        <Display result={this.state.calculated} />
        
      </div>
      </main>
      
    );
  }
}

 export default withStyles(styles) (App);
//export default App;
