import { FiUser } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SlideUpAnimation from "@/wrappers/AnimationWrappers/SlideUpAnimation";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation'; // Import useRouter
import {jwtDecode} from 'jwt-decode'; // Corrected import
// import './LoginRegister.css';
import style from './welcomePage.module.css';
import styles from './LoginRegister.module.css'; 

export default function RegisterContainer({ handleShowLogin }) {
  const [showPassword, setShowPassword] = useState("password");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleShowPassword = () => {
    setShowPassword(showPassword === "password" ? "text" : "password");
    setIsChecked(!isChecked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const password = watch("password", "");
  const onSubmit = (data) => {
    alert("Form submitted with email: " + data.email + data.password);
    reset(); // Reset the form after submission
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log('Google User:', decodedToken);
    // Handle Google registration logic
    
    router.push('./Home/'); // Redirect to Home page after successful registration
  };

  const handleGoogleError = () => {
    console.error('Google Registration Failed');
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
                Login to your account{" "}
                <IoIosArrowRoundBack className={style['next-navigation']} />
              </button>
            </div>
          </SlideUpAnimation>
        </div>
        <div className={style['login-heading']}>
          <SlideUpAnimation delay={0.1}>
            <h1>Create your account</h1>
          </SlideUpAnimation>
          <SlideUpAnimation delay={0.1}>
            <p className={style['sub-heading']}>
              Welcome to Hiregloo. Provide your details
            </p>
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
            <div className={style['error-message-container']}>
              {errors.password.message}
            </div>
          )}
          {errors.confirmPassword && (
            <div className={style['error-message-container']}>
              {errors.confirmPassword.message}
            </div>
          )}
        </div>
        <div className={style['input-fields']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SlideUpAnimation delay={0.1}>
              <div className={style['input-field']}>
                <FiUser className={style['input-icon']} />
                <input
                  type="text"
                  {...register("email", {
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
              <div className={style['input-field']}>
                <MdLockOutline className={style['input-icon']} />
                <input
                  type={showPassword}
                  className={style['user-text-input']}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
              </div>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.1}>
              <div className={style['show-password']}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isChecked}
                  onChange={handleShowPassword}
                />
                <p onClick={handleShowPassword}>Show password</p>
              </div>
            </SlideUpAnimation>
            <SlideUpAnimation delay={0.2}>
              <button
                className={style['button']}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Loading..." : "Register Now"}
              </button>
            </SlideUpAnimation>
          </form>
        </div>
        <SlideUpAnimation delay={0.1}>
          <div className={style['input-seperation']}>Register with others</div>
        </SlideUpAnimation>
        <div className={styles['login-options-auth-options']}>
          <GoogleOAuthProvider clientId="324196355188-glishm51qcpu5fjes6unnhiassr793fk.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}
