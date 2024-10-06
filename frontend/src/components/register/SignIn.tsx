import {TOKEN} from "../../config/Config";
import {useDispatch, useSelector} from "react-redux";
import {AuthReducerState, LoginRequestDTO} from "../../redux/auth/AuthModel";
import {useNavigate} from "react-router-dom";
import React, {Dispatch, useEffect, useState} from "react";
import {currentUser, loginUser} from "../../redux/auth/AuthAction";
import {RootState} from "../../redux/Store";
import {Button, TextField} from "@mui/material";
import styles from "./Register.module.scss";


const SignIn = () => {

    const [signInData, setSignInData] = useState<LoginRequestDTO>({email: "", password: ""});
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const token: string | null = localStorage.getItem(TOKEN);
    const state: AuthReducerState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token) {
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
        console.log("Sign in form submitted");
        dispatch(loginUser(signInData));
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSignInData({...signInData, email: e.target.value});
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSignInData({...signInData, password: e.target.value});
    };

    const onClickCreateNewAccount = (e: any) => {
        navigate("/signup");
    };

    return (
        <div>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <form onSubmit={onSubmit}>
                        <div>
                            <p className={styles.text}>ایمیل</p>
                            <TextField
                                className={styles.textInput}
                                id="email"
                                type="email"
                                placeholder="ایمیل خود را وارد کنید"
                                variant="outlined"
                                onChange={onChangeEmail}
                                value={signInData.email}/>
                        </div>
                        <div>
                            <p className={styles.text}>رمز عبور</p>
                            <TextField
                                className={styles.textInput}
                                id="password"
                                type="password"
                                placeholder="پسورد خود را وارد کنید"
                                variant="outlined"
                                onChange={onChangePassword}
                                value={signInData.password}/>
                        </div>
                        <div className={styles.button}>
                            <Button
                                style={{backgroundColor:"#3e4dce"}}
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit">
                                ورود
                            </Button>
                        </div>
                    </form>
                    <div className={styles.bottomContainer}>
                        <p>حساب کاربری ندارید؟</p>
                        <Button variant='text' size='large' onClick={onClickCreateNewAccount}>ثبت نام</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
