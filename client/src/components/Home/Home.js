import Button from "@material-ui/core/Button"
import { TextField,Grid,Container } from "@material-ui/core";
import { useState } from "react";
import { useStyles } from "./styles";
import axios from "axios";
import {v1 as uuid} from "uuid";
const Home = (props) => {
    const classes = useStyles();
    const [id, setId] = useState(""); 
    const [name, setName] = useState(""); 
    function create() {
        let idd = uuid();
        idd = name + idd;
        props.history.push(`/meeting/${idd}`);
    }
    const join = () => {
        const values = {roomID:id};
        axios
            .post("http://localhost:5000/find_id", values)
            .then(function (response) {
                if(response["data"] == "ID not found"){
                    window.alert(response["data"]);
                }
                else{
                    props.history.push(`/meeting/${id}`);
                }
            })
            .catch(function (error) {
                console.log(error);
                window.alert("Invalid Credenital!!");
            });
    }
    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Grid container>
                    <Grid item xs = {12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            className={classes.outfield}
                            InputProps={{
                                className: classes.txtfield
                            }}
                            InputLabelProps={{
                                className: classes.txtfield
                            }}
                            required
                            id="meetName"
                            label="Meeting Name"
                            name="meetName"
                            autoComplete="meetName"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br/>
                        <Button 
                            className={classes.formBtn} 
                            variant="contained" 
                            color="primary" 
                            onClick={create}>
                                <h3 style ={{marginBottom:"0px", marginTop:"0px"}}>Create New Meeting</h3>
                        </Button>
                    </Grid>
                    <h1 style={{color:"#fff", marginTop:"30px", marginBottom:"30px"}}>OR</h1>
                    <Grid item xs = {12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        className={classes.outfield}
                        InputProps={{
                            className: classes.txtfield
                        }}
                        InputLabelProps={{
                            className: classes.txtfield
                        }}
                        required
                        id="meetID"
                        label="Meeting ID"
                        name="meetID"
                        autoComplete="meetID"
                        onChange={(e) => setId(e.target.value)}
                    />
                    </Grid>
                    <Button 
                        className={classes.formBtn} 
                        variant="contained" 
                        style ={{width:"20%"}}
                        onClick={join}>
                            <h3 style ={{marginBottom:"0px", marginTop:"0px"}}>Join</h3>
                    </Button>
                </Grid>
            </Container>
        </div>
    )
}

export default Home
