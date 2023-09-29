import {useEffect, useState} from "react";
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "src/firebase";
import {useAppStore} from "@/store/slice";
import {shallow} from "zustand/shallow";
import {FcGoogle} from "react-icons/fc";

const Login = () => {
    const initUsername = useAppStore(
        (state) => state.initUsername, shallow
    );

    const [name, setName] = useState('');
    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider).then(
            (data) => {
                console.log(data.user.email);
                setName(data.user.email);
            }
        )
    }

    useEffect(() => {
        initUsername(name);
    }, [name]);

    return (
        <div className="login">
            {
                name && <>
                    <span className="user-name"> {name} </span>
                    <button> Logout </button>
                </>
            }
            {
                !name && <button className="login-btn" onClick={() => handleGoogleLogin()}>
                    Login with Google <FcGoogle size="1.6em" style={{margin: "-3px 0 0 5px"}}/>
                </button>
            }

        </div>
    );
}

export default Login;