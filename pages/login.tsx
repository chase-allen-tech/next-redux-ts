import { Container, Fab, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import NavigationIcon from '@material-ui/icons/Navigation';
import { useMutation } from "@apollo/client";
import { M_ADD_USER, M_SET_ME } from "../constants/gqlQueries";
import React, { useEffect } from 'react';

const Login = (props) => {

    const [set_user] = useMutation(M_SET_ME);
    const [values, setValues] = React.useState({
        identifier: ''
    })

    const onAddUser = async (e) => {
        e.preventDefault();
        try {
            let result = await set_user({variables: {obj: values.identifier}});
            alert("Successfully Logged In\n Your name is " + result.data.setMe.me.name);
            console.log(result);
        } catch (error) {
            alert("There is something error in server");
        }

    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Login</div>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={6}>
                    <form onSubmit={onAddUser}>
                        <TextField value={values.identifier} onChange={handleChange('identifier')} id="outlined-basic" label="name" variant="outlined" className="login-field" />
                        <Fab type="submit" variant="extended" color="primary" aria-label="add" className="float-right">
                            <NavigationIcon/>
                            Login
                        </Fab>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default connect()(Login);