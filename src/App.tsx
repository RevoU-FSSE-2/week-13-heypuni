import './App.css'
import { Login, Register, ProductEdit, ProductNew, Product } from './pages' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/' element={<Product />} />
        <Route path='/add' element={<ProductNew />} />
        <Route path='/edit/:id' element={<ProductEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App