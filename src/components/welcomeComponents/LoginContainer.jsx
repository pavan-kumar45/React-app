import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SlideUpAnimation from "@/wrappers/AnimationWrappers/SlideUpAnimation";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import LinkedInLogin from './LinkedInLogin';  // Import the LinkedInLogin component
import styles from './LoginRegister.module.css'; 
import style from './welcomePage.module.css';

export default function LoginContainer({ handleShowLogin }) {
  const [showPassword, setShowPassword] = useState("password");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword === "password" ? "text" : "password");
    setIsChecked(!isChecked);
  };

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = (data) => {
    console.log('User name :' + data.email);
    console.log('Password :' + data.password);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": data.email,
      "password": data.password
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:8080/api/v1/auth/authenticate", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        if (result) {
          router.push("./Home/");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log('Google User:', decodedToken);
    router.push('./Home/');
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
  };

  return (
    <>
      <div className={style['login-main-container']}>
        <div className={style['navigation']}>
          <SlideUpAnimation delay={0.1}>
            <a className={style['home-navigation']} href="/">
              <IoIosArrowRoundBack className={style['back-navigation']} />
              <p>Go Home</p>
            </a>
          </SlideUpAnimation>
          <SlideUpAnimation delay={0.2}>
            <div className={style['set-change']}>
              <button className={style['register-button']} onClick={handleShowLogin}>
                Create an account
                <IoIosArrowRoundBack className={style['next-navigation']} />
              </button>
            </div>
          </SlideUpAnimation>
        </div>
        <div className={style['login-heading']}>
          <SlideUpAnimation delay={0.1}>
            <h1>Welcome Back</h1>
          </SlideUpAnimation>
          <SlideUpAnimation delay={0.1}>
            <p className={style['sub-heading']}>Login with your username and password</p>
          </SlideUpAnimation>
        </div>
        <div>
          {errors.root && (
            <div className={style['error-message-container']}>{errors.root.message}</div>
          )}
          {errors.email && (
            <p className={style['error-message-container']}>{errors.email.message}</p>
          )}
          {errors.password && (
            <div className={style['error-message-container']}>{errors.password.message}</div>
          )}
        </div>
        <div className={style['input-fields']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SlideUpAnimation delay={0.1}>
              <div className={style['input-field']}>
                <FiUser className={style['input-icon']} />
                <input
                  type="text"
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className={style['user-text-input']}
                  placeholder="Email / Phone Number"
                />
              </div>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.1}>
              <div className={style['input-field']}>
                <MdLockOutline className={style['input-icon']} />
                <input
                  type={showPassword}
                  className={style['user-text-input']}
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password length should be atleast 8 characters",
                    },
                  })}
                />
              </div>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.1}>
              <div className={style['show-password']}>
                <input
                  type="checkbox"
                  name="show-password"
                  id="show-password"
                  checked={isChecked}
                  onChange={handleShowPassword}
                />
                <p className={style['show-password']} onClick={handleShowPassword}>
                  Show password
                </p>
              </div>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.1}>
              <button
                className={style['button']}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Loading..." : "Login Now"}
              </button>
            </SlideUpAnimation>
          </form>
        </div>
        <SlideUpAnimation delay={0.1}>
          <div className={style['input-seperation']}>Login with others</div>
        </SlideUpAnimation>
        <div className={styles['login-options-auth-options']}>
          <GoogleOAuthProvider clientId="324196355188-glishm51qcpu5fjes6unnhiassr793fk.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </GoogleOAuthProvider>
          <LinkedInLogin /> {/* Add LinkedIn Login below Google Login */}
        </div>
      </div>
    </>
  );
}
