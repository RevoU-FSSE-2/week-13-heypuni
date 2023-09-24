import * as yup from 'yup';

export const initialValues = {
    name: '',
    is_active: false
}

export const validationSchema = yup.object().shape({
    name: yup.string().required('Please Enter the Name'),
    is_active: yup.boolean().oneOf([true, false], 'Please Select the Status').required('Please Select the Status!')
})