import { UseFormSetError, UseFormClearErrors, UseFormGetValues } from 'react-hook-form';


export const validateLoginField = (
    field: 'email' | 'password',
    value: string,
    setError: UseFormSetError<any>,
    clearErrors: UseFormClearErrors<any>
) => {
    if (field === 'email') {
        if (!value.trim()) {
            setError('email', { type: 'manual', message: '*Email jest wymagany.' });
        } else if (!/^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
            setError('email', { type: 'manual', message: '*Email jest niepoprawny.' });
        } else {
            clearErrors('email');
        }
    } else if (field === 'password') {
        if (!value.trim()) {
            setError('password', { type: 'manual', message: '*Hasło jest wymagane.' });
        } else {
            clearErrors('password');
        }
    }
};


export const validateRegistrationField = (
    field: string,
    value: string,
    setError: UseFormSetError<any>,
    clearErrors: UseFormClearErrors<any>,
    getValues: UseFormGetValues<any>
) => {
    if (field === 'firstName') {
        if (!value.trim()) {
            setError('firstName', { type: 'manual', message: '*Imię jest wymagane.' });
        } else {
            clearErrors('firstName');
        }
    } else if (field === 'lastName') {
        if (!value.trim()) {
            setError('lastName', { type: 'manual', message: '*Nazwisko jest wymagane.' });
        } else {
            clearErrors('lastName');
        }
    } else if (field === 'email') {
        if (!value.trim()) {
            setError('email', { type: 'manual', message: '*Email jest wymagany.' });
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setError('email', { type: 'manual', message: '*Email jest niepoprawny.' });
        } else {
            clearErrors('email');
        }
    } else if (field === 'phoneNumber') {
        if (!value.trim()) {
            setError('phoneNumber', { type: 'manual', message: '*Numer telefonu jest wymagany.' });
        } else if (!/[- +()0-9]{9,12}/.test(value)) {
            setError('phoneNumber', { type: 'manual', message: '*Numer telefonu jest niepoprawny.' });
        } else {
            clearErrors('phoneNumber');
        }
    } else if (field === 'password') {
        if (!value.trim()) {
            setError('password', { type: 'manual', message: '*Hasło jest wymagane.' });
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()+=<>?])[A-Za-z\d~!@#$%^&*()+=<>?]{8,}$/.test(value)) {
            setError('password', { type: 'manual', message: '*Hasło musi zawierać co najmniej 8 znaków, w tym małą i dużą literę, cyfrę oraz znak specjalny.' });
        } else {
            clearErrors('password');
        }
        if (getValues('confirmPassword') && value !== getValues('confirmPassword')) {
            setError('confirmPassword', { type: 'manual', message: '*Hasła nie pasują do siebie.' });
        } else {
            clearErrors('confirmPassword');
        }
    } else if (field === 'confirmPassword') {
        if (value !== getValues('password')) {
            setError('confirmPassword', { type: 'manual', message: '*Hasła nie pasują do siebie.' });
        } else {
            clearErrors('confirmPassword');
        }
    }
};
