import { Button, Card, Col, Form, Input, Row, Select } from "antd"
import { ErrorMessage, Field, Formik  } from "formik"
import { Product, ProductForm as ProductFormProps } from "../../types"
import { initialValues, validationSchema } from "./productFormSchema"
import { Link } from "react-router-dom"

interface Props {
    onSubmit: (values: ProductFormProps) => void
    product?: Product;
    content: string;
}

const ProductForm = ({ onSubmit, product, content } : Props) => {

    const handleSubmit = (values: ProductFormProps) => {
        onSubmit(values)
    }

    return (
            <Row>
            <Col span={8}></Col>
            <Col span={8}>
                <Card>
                    <Formik 
                    initialValues={product ?? initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                        {(formikProps) => (
                        <Form name="basic" autoComplete="off" >
                            <div>
                                <Input content={content} />
                                <Link to={'/'} >Back</Link>
                            </div>
    
    
                            <Form.Item label="Name" name="name">
                                <div>
                                    <Field name="name" as={Input} placeholder="Enter Name" />
                            
                                    <span>
                                        <ErrorMessage name="name" />
                                    </span>
                                </div>
    
                            </Form.Item>
    
                            <Form.Item label="Status" name="is_active">
                                <div>
                                    <Select placeholder="Select Status"   onChange={(value) => {
                                    formikProps.setFieldValue("is_active", value);
                                    }} 
                                    value={formikProps.values.is_active}
                                    >
                                    <Select.Option value="true">Active</Select.Option>
                                    <Select.Option value="false">Deactive</Select.Option>
                                    </Select>
                                    
                                    <div>
                                        <ErrorMessage name="is_active" />
                                    </div>
                                </div>
                            </Form.Item>
    
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <div>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Create
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                        )}
                    </Formik>
                </Card>
            </Col>
            </Row>
        )
}

export default ProductForm