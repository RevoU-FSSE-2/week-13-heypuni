import { SmileOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Input, Form as AntForm } from 'antd';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as yup from 'yup'
import { RegisterResponse } from '../../types';

interface Props {
    onSubmit: (values: RegisterResponse) => void
}

const passwordValidationError = (str: string) => {
    return `Your Password must have at least 1 ${str} character`;
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Please Enter Your Name'),
    email: yup.string().email("Invalid Email!").required('Please Enter Your Email'),
    password: yup.string().min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, passwordValidationError("digit"))
    .matches(/[a-z]/, passwordValidationError("lowercase"))
    .matches(/[A-Z]/, passwordValidationError("uppercase"))
    .required('Please Enter Your Password')
})

  const Register = ({ onSubmit }: Props) => {

      const handleRegister = async (values: RegisterResponse) => {
        console.log(`Successfully Registered`, values)
        onSubmit(values)
      }
      
      return (
        <Row >
            <Col span={8}></Col>
            <Col span={8} >
                <Card>
                    <Formik 
                    initialValues = {{name: "", email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}>
                        <Form name="basic" autoComplete="off">
                            <Input content={"Register"}/>
                    
                            <AntForm.Item label="Name">
                            <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                            name="name" as={Input} placeholder="Enter Your Name" />
                            
                            <div >
                                <ErrorMessage name="name" />
                            </div>
                            </AntForm.Item>
                    
                            <AntForm.Item label="Email" name="email">
                            <Field prefix={<UserOutlined className="site-form-item-icon" />} 
                            name="email" as={Input} placeholder="Enter Your Email" />
                            
                            <div >
                                <ErrorMessage name="email" />
                            </div>
                            </AntForm.Item>
                        
                            <AntForm.Item label="Password" name="password">
                            <Field prefix={<LockOutlined className="site-form-item-icon" />} 
                            name="password" as={Input} placeholder="Enter Your Password" />

                            <div >
                                <ErrorMessage name="password" />
                            </div>
                            </AntForm.Item>
                        
                            <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            </AntForm.Item>
                        </Form>
                    </Formik>
                </Card>
            </Col>
        </Row>
      )
 
    };

  export default Register