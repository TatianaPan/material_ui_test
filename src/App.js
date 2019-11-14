import React, { Component } from 'react';
import './App.css';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {  Paper,  Typography,  TextField,  Button, List, ListItem, ListItemText, ListItemSecondaryAction,  IconButton } from '@material-ui/core'

// const styles = theme => console.log(theme) - to inspect default theme object

const styles = ({spacing }) => ({
    root: {
      marginTop: spacing(10),
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: spacing(3),
      maxWidth: 400, 
    },
    form: {    
      display: 'flex', 
      alignItems: 'baseline',    
      justifyContent: 'space-evenly'  
    }
})

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#37516F'
      },
      secondary: {
          main: '#BEB009'
      }
  }
});

const theme1 = createMuiTheme({
  palette: {
      primary: {
          main: '#ED7D02'
      },
      type: 'dark'
    
  }
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [{title: 'Squats', id: '1'}, {title: 'Jumps', id: '2'}],
      title: '',
      isToggled: false
    }
    console.log(this.props)
  }
  
  handleToggle = () => {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  handleChange = ({ target: { name, value } }) =>    
    this.setState({[name]: value});

  handleCreate = e => {
    e.preventDefault();
    if (this.state.title) {
      this.setState(({exercises, title}) => ({
        exercises: [...exercises, {title, id: Date.now()}], 
        title: ''
    }))
    }
  }

  handleDelete = id => {
    this.setState(({exercises}) => (
      {exercises: exercises.filter(ex => ex.id !== id)}
    ))
  }
 
  render() {
    const { exercises, title } = this.state;
    const { classes } = this.props;

    return (
      <ThemeProvider theme={this.state.isToggled? theme1 : theme}>
      <Paper className={classes.root}>
        <Typography variant='h4' align='center' color='secondary' gutterBottom>
          Exercises
      </Typography>
      <Button onClick={this.handleToggle}>Change theme</Button>

        <form className={classes.form} onSubmit={this.handleCreate}>
          <TextField
            name='title'
            label='Exercise'
            value={title}
            onChange={this.handleChange}
            margin='normal' />
          <Button 
          type='submit' 
          color='primary' 
          variant='contained'>Create</Button>
        </form>
        <List> 
          {exercises.map(({ id, title }) => 
            <ListItem key={id}>            
              <ListItemText primary={title} />  
              <ListItemSecondaryAction>
                <IconButton onClick={() => this.handleDelete(id)} color='primary'>
                  <Delete />
                </IconButton>
                </ListItemSecondaryAction>        
            </ListItem>        
            )}      
        </List>   
      </Paper>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(App);
