import styles from './Signup.module.scss'
import {useForm} from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useNavigate} from "react-router-dom"
import { createUser } from '../../apis/user'

export function Signup() {
    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Ce champ doit être saisi')
            .min(2, "Au moins deux lettres"),
        email: yup.
            string()
            .required('Ce champ doit être saisi')
            .email("Email non valide"),
        password: yup
            .string()
            .required('Ce champ doit être saisi')
            .min(6, "Le mot de passe doit contenur 6 caractères"),
    })

    const initialValues = {
        name: "",
        email: "",
        password: "",
    }

    const {
        handleSubmit, 
        register, 
        formState: {errors, isSubmitting},
        setError,
        clearErrors
    } = useForm({
        initialValues,
        resolver: yupResolver(validationSchema),
    })

    const submit = handleSubmit(async (values) => {
        console.log(values);
        try {
            clearErrors();
            await createUser(values);
            navigate("/signin")
        } catch (message) {
            setError("generic", {type: "generic", message})
        }
    })
    return (
        <div className={`flex-fill d-flex align-items-center justify-content-center`}>
            <form onSubmit={submit} className={`d-flex flex-column card ${styles.form} p20`}>
                <h2 className='mb10'>Inscription</h2>

                <div className='mb10 d-flex flex-column'>
                    <label htmlFor="name">Nom</label>
                    <input type="text" name="name" {...register("name")} />
                    {errors.name && <p className='form-error'>{errors.name.message}</p>}
                </div>
                
                <div className='mb10 d-flex flex-column'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" {...register("email")} />
                    {errors.email && <p className='form-error'>{errors.email.message}</p>}
                </div>
                
                <div className='mb10 d-flex flex-column'>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" {...register("password")} />
                    {errors.password && <p className='form-error'>{errors.password.message}</p>}
                </div>

                {errors.generic && (
                    <p className='form-error'>
                        {errors.generic.message}
                    </p>
                )}

                <div>
                    <button className={`btn btn-primary`} disabled={isSubmitting}>Inscription</button>
                </div>
            </form>
        </div>
    )
}