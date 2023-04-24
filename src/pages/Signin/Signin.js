import React, { useContext } from "react";
import styles from "./Signin.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

export function Signin () {
  const { signin, user } = useContext(AuthContext)

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Ce champ doit être saisi")
      .email("Email non valide"),
    password: yup
      .string()
      .required("Ce champ doit être saisi")
      .min(6, "Le mot de passe doit contenir 6 caractères min."),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (values) => {
    // console.log(values);
    try {
        clearErrors();
        await signin(values);
          // console.log(user);
    } catch (message) {
        setError("generic", {type: "generic", message})
    }
  });
  
  return (
    <>
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <div
        className={`flex-fill d-flex align-items-center justify-content-center`}
      >
        <form
          onSubmit={submit}
          className={`d-flex flex-column card p20 ${styles.form}`}
        >
          <h2 className="mb10">Connexion</h2>
         
          <div className="mb10 d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" {...register("email")} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
  
          <div className="mb10 d-flex flex-column">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" {...register("password")} />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          {errors.generic && (
              <p className="form-error">{errors.generic.message}</p>
          )}
          <div>
            <button disabled={isSubmitting} className="btn btn-primary">Connexion</button>
          </div>
        </form>
      </div>
      )
      }
    </>

  );
}

export default Signin;