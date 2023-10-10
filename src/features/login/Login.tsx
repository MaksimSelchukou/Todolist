import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {setIsLoggedInTC} from "./auth-reducer";
import {Navigate} from 'react-router-dom';

export type ValuesType = {
    email: string
    password: string,
    rememberMe: boolean
}

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector(state => state.app.isInitialized)  //залогинен
    const dispatch = useAppDispatch()

    const validate = (values: ValuesType) => {
        const errors: any = {};
        if (!values.email) {
            errors.email = 'Email is Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Password is Required'
        } else if (values.password.length < 5) {
            errors.password = 'Length password should be more five characters '
        }

        if (values.rememberMe !== true) {
            errors.rememberMe = 'remember Me should be active'
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(setIsLoggedInTC(values))
            formik.resetForm()
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>

                        <TextField
                            type="email"
                            label="Email"
                            margin="normal"
                            id="email"
                            // name="email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            id="password"
                            // name="password"
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox/>}
                            id="rememberMe"
                            // name="rememberMe"
                            // onChange={formik.handleChange}
                            // value={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                        />
                        {formik.errors.rememberMe ? <div>{formik.errors.rememberMe}</div> : null}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}