import { Container, Fab, Grid, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import NavigationIcon from '@material-ui/icons/Navigation';
import { useMutation } from "@apollo/client";
import React, { useEffect } from 'react';
import { M_ADD_USER } from "../constants/gqlQueries";

const Register = (props) => {

    const [add_user] = useMutation(M_ADD_USER);
    const [values, setValues] = React.useState({
        name: '', email: ''
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onAddUser = async (e) => {
        e.preventDefault();
        try {
            console.log(values);
            let result = await add_user({variables: {obj: values}});
            alert("Successfully Added\n" + result.data.userAdd.identifier);
            console.log(result);
        } catch (error) {
            alert("There is something wrong in your server");
        }

    }

    return (
        <Container>
            <div className="d-flex  justify-bt">
                <div className="content-title">Register</div>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={6}>
                    <form onSubmit={onAddUser}>
                        <TextField value={values.name} onChange={handleChange('name')} id="outlined-basic" label="name" variant="outlined" className="login-field" />
                        <TextField value={values.email} onChange={handleChange('email')} id="outlined-basic" label="email" variant="outlined" className="login-field" />
                        <Fab type="submit" variant="extended" color="primary" aria-label="add" className="float-right">
                            <NavigationIcon/>
                            Register
                        </Fab>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default connect()(Register);