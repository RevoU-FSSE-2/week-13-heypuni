import { Button, Card, Col, Row, Input, Form as AntForm } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import { LoginResponse } from '../../types';


interface Props {
    onSubmit: (values: LoginResponse) => void
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required('Please Enter Your Email'),
    password: Yup.string().required('Please Enter Your Password')
})

const Login = ({ onSubmit }: Props) => {

  const handleLogin = async (values: LoginResponse) => {
    console.log(`Successfully logged in`, values)
    onSubmit(values)
  }
  
  return (
    <Row >
    <Col span={8}></Col>
    <Col span={8} >
        <Card >
            <Formik 
            initialValues = {{ email: "example@gmail.com", password: "example"}}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
                <Form name="basic" autoComplete="off">
                    <> 
                     
                    <AntForm.Item label="Email" name="email">
                    <Field prefix={<UserOutlined className="site-form-item-icon" />} 
                    name="email" as={Input} placeholder="Enter Your Email" />
                    
                    <div >
                        <ErrorMessage name="email" />
                    </div>
                    </AntForm.Item>
                
                    <AntForm.Item label="Password" name="password">
                    <Field prefix={<LockOutlined className="site-form-item-icon" />} 
                    name="password" as={Input} placeholder="Enter Your Password" 
                    />

                    <div >
                        <ErrorMessage name="password" />
                    </div>
                    </AntForm.Item>
                
                    <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <div>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                            Or <Link to={'/register'}>Register Here</Link>
                        </div>
                    </AntForm.Item>
                    </>
                </Form>
            </Formik>
        </Card>
    </Col>
    </Row>

    )
};

export default Login