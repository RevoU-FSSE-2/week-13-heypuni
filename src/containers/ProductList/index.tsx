import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  is_active: boolean;
}

const ProductList = () => {

  const [categories, setCategories] = useState<Product[]>([]);
  const navigate = useNavigate();

const handleLogOut = () => {
  localStorage.removeItem('authToken')
  navigate('/login');
} 

const getCategory = useCallback(
   async () => {
  const token = localStorage.getItem('authToken');
  if(!token){
    navigate('/login')
    return
  }

  console.log("Auth Token:", token);
  try {
    const response = await fetch('https://mock-api.arikmpt.com/api/category', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      },
    });
    const data = await response.json();
    
    if (data && data.data) {
      const datas = data.data.map((category: { id: string; }) => ({
        ...category,
        key: category.id
      }));
      setCategories(datas);
    } else {
      setCategories([]);
    }
  } catch (error) {
    console.error("ERROR:", error);
    alert("Failed to fetch Categories!");
  }
},[navigate]);

useEffect(() => {
  getCategory()
}, [getCategory])

  
  const removeProduct = async (id: string) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    try {
        const response = await fetch(`${apiUrl}${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
  
        if(response) {
          setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
          navigate(0)
          console.log('Successfully Removed category');
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  const columns: ColumnsType<Product> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => text || 'N/A', 
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text || 'N/A',  
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (_, record) => (record.is_active ? 'Active' : 'Deactive')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`/edit/${record.id}`)}>Edit</Button>
          <Button type='primary' onClick={() => removeProduct(record.id)} htmlType="button" danger>Delete</Button>
        </>
      ),
    },
  ];
  

  return (
    <>
    <div >
      <div >
      <span><Button type={'primary'} onClick={() => navigate('/add')}>Create New</Button></span>
        <Input content={"List of Category"} />
        <span ><Button type={'primary'} onClick={handleLogOut} danger>Log Out</Button></span>
      </div>
      <Table 
      columns={columns} 
      dataSource={categories || []}
      />
    </div>
    </>
  )
}

export default ProductList;