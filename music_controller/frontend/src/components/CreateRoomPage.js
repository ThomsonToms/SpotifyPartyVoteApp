import React, {Component} from 'react';
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, FormControlLabel, RadioGroup, Radio} from "@mui/material";
import { Link } from "react-router-dom";

export default class CreateRoomPage extends Component{
    defaultVotes = 2;

    constructor(props){
         super(props);
         this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
         };
         this.handleVotesChanged = this.handleVotesChanged.bind(this);
         this.handleGuestsCanPauseChange = this.handleGuestsCanPauseChange.bind(this);
         this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    }
    handleVotesChanged(e){
        this.setState({
            votesToSkip: e.target.value
        });
    }

    handleGuestsCanPauseChange(e){
        this.setState({
             guestCanPause: e.target.value === 'true' ? true : false,
        })
    }
    
    handleRoomButtonPressed(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            }),
        };
        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    render(){
        return( //first grid is container spacing for evertything on this page
        <Grid container spacing = {1}> 
            <Grid item xs = {12} align = {"center"}>
            <Typography component= 'h4' variant='h4'>
                Create A Room
            </Typography>
            </Grid>

            <Grid item xs = {12} align = {"center"}>
            <FormControl component="fieldset">
            <FormHelperText>
                <span style={{ textAlign: 'center' }}>Guest Control of Playback State</span>
            </FormHelperText>

                <RadioGroup row defaultValue='True' onChange = {this.handleGuestsCanPauseChange}>
                    <FormControlLabel value = "True" 
                     control = {<Radio color = "primary" />}
                     label = "Play/Pause"
                     labelPlacement = "bottom"/>

                    <FormControlLabel value = "False" 
                     control = {<Radio color = "secondary" />}
                     label = "No Control"
                     labelPlacement = "bottom"/>
                </RadioGroup>
            </FormControl>
            </Grid>

            <Grid item xs = {12} align = {"center"}>
                <FormControl>
                    <TextField 
                     required = {true}
                     type = "number"
                     defaultValue={this.defaultVotes}
                     inputProps={{min: 1, style: {textAlign:"center"}}}
                     onChange={this.handleVotesChanged}/>
                        <FormHelperText style={{ textAlign: "center" }}>
                            Votes Required to Skip Song
                        </FormHelperText>

                </FormControl>
            </Grid>
            <Grid item xs = {12} align = {"center"}>
                <Button color = "primary" variant = "contained" onClick={this.handleRoomButtonPressed}>
                    Create a Room
                    </Button>
            </Grid>
            <Grid item xs = {12} align = {"center"}>
                <Button color = "secondary" variant = "contained" to = "/" component = {Link}>
                    Back
                 </Button>
            </Grid>
        </Grid>
        );
    }
}