import styles from './Register.module.scss'
import {useNavigate} from "react-router-dom";
import React, {Dispatch, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TOKEN} from "../../config/Config";
import {RootState} from "../../redux/Store";
import {AuthReducerState, SignUpRequestDTO} from "../../redux/auth/AuthModel";
import {currentUser, register} from "../../redux/auth/AuthAction";
import {Button, TextField} from "@mui/material";



const SignUp = () =>
{
    const [createAccountData, setCreateAccountData] = useState<SignUpRequestDTO>({
        fullName: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const token: string | null = localStorage.getItem(TOKEN);
    const state: AuthReducerState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token && !state.reqUser) {
            dispatch(currentUser(token));
        }
    }, [token, state.reqUser, dispatch]);

    useEffect(() => {
        if (state.reqUser) {
            navigate("/");
        }
    }, [state, navigate]);

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sign up form submitted");
        dispatch(register(createAccountData));
    };

    const onChangeFullName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCreateAccountData({...createAccountData, fullName: e.target.value});
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCreateAccountData({...createAccountData, email: e.target.value});
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setCreateAccountData({...createAccountData, password: e.target.value});
    };

    const onNavigateToSignIn = () => {
        navigate("/signin");
    }

    return (
        <div>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <p className={styles.text}>نام کامل</p>
                            <TextField
                                className={styles.textInput}
                                id="fullName"
                                type="text"
                                placeholder="نام خود را وارد کنید"
                                variant="outlined"
                                onChange={onChangeFullName}
                                value={createAccountData.fullName}/>
                        </div>
                        <div>
                            <p className={styles.text}>ایمیل</p>
                            <TextField
                                className={styles.textInput}
                                id="email"
                                type="email"
                                placeholder="ایمیل خود را وارد کنید"
                                variant="outlined"
                                onChange={onChangeEmail}
                                value={createAccountData.email}/>
                        </div>
                        <div>
                            <p className={styles.text}>رمز عبور</p>
                            <TextField
                                className={styles.textInput}
                                id="password"
                                type="password"
                                placeholder="رمز عبور خود را وارد کنید"
                                variant="outlined"
                                onChange={onChangePassword}
                                value={createAccountData.password}/>
                        </div>
                        <div className={styles.button}>
                            <Button
                                style={{backgroundColor:"#3e4dce"}}
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit">
                                ثبت نام
                            </Button>
                        </div>
                    </form>
                    <div className={styles.bottomContainer}>
                        <p>قبلا ثبت نام کرده اید؟</p>
                        <Button variant='text' size='large' onClick={onNavigateToSignIn}>ورود به حساب کاربری</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;