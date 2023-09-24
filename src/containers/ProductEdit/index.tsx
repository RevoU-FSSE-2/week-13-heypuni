import { useNavigate, useParams } from "react-router-dom"
import { Product, ProductForm as UpdateInfo } from "../../types";
import { ProductForm } from "../../components";
import { useCallback, useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ProductEdit = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Product>()
    const { id } = useParams()

    const getProduct = useCallback(
        async () => {
            try {
                const fetchUpdate = await fetch(`${apiUrl}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    },

                });
                if (fetchUpdate.ok) {

                    const response: Product = await fetchUpdate.json()
                    setCategories(response)
                    
                } else {

                    console.log("Error getting data..")
                }
            } catch (error) {
                console.error(error)
            }
        },[]
    )

    useEffect(
        () => {
            getProduct()
        },[getProduct]
    )

    const handleUpdate = async (values: UpdateInfo) => {
        console.log(values)
        try {
            const response = await fetch (`${apiUrl}update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ ...values, id:id })
            })
            if (response.ok) {
                console.log(response)
                console.log("successs")
                navigate('/');  
            } else {
                console.log("Failed to edit category")
                return
            }
   
        } catch (error) {
            console.error(error)
            alert("Failed to Edit Category...!")
        }  
      }

    if(categories) {
        return <ProductForm onSubmit={handleUpdate} content={"Edit Category"} />
  
}
    return null 
}

export default ProductEdit