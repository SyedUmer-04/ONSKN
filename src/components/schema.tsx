import * as yup from 'yup';

export const Schema = {
    LoginSchema : yup.object({
        email: yup.string().email('Invalid Email').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be more than 6 characters'),
    }),

    SignUpSchema : yup.object({
        email: yup.string().email('Invalid Email').required('Email is required'),
        password: yup.string().required('Password is required').min(6, 'Password must be more than 6 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must be same').required('Password is required')
    }),

    forgotPasswordStep1Schema : yup.object({
        email: yup.string().email('Invalid Email').required('Email is required'),
    }),

    forgotPasswordStep2Schema : yup.object({
        otp: yup.string().required('Password is required').min(6, 'Password must be more than 6 characters'),
    }),

    forgotPasswordStep3Schema : yup.object({
        password: yup.string().required('Password is required').min(6, 'Password must be more than 6 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password must be same').required('Password is required')
    }),

}