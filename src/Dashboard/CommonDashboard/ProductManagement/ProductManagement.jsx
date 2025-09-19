import React, { useState, useEffect } from 'react';
import { MdOutlineInventory } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ store categories
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image1: '',
    image2: '',
    image3: '',
  });
const { user } = useAuth();
const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  if (user) {
    fetchProducts();
  }
  fetchCategories(); // ✅ category fetch will always run
}, [user]); // user dependency 

const fetchProducts = () => {
  fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.error('Failed to fetch products:', err));
};

const fetchCategories = () => {
  fetch(`${API_URL}/categories`)
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) => console.error('Failed to fetch categories:', err));
};


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleAddOrUpdateProduct = async () => {
  try {
    const method = editingProduct ? "PATCH" : "POST";
    const url = editingProduct
      ? `${API_URL}/products/${editingProduct._id}`
      : `${API_URL}/products`;

    // ✅ Merge user email inside payload
    const payload = { 
      ...formData,
      sellerEmail: user?.email || null
    };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
      setFormData({
      
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image1: '',
        image2: '',
        image3: '',
      });
    } else {
      console.error("❌ Failed to save product:", await res.text());
    }
  } catch (error) {
    console.error("❌ Error saving product:", error);
  }
};

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category || '',
      image1: product.image1 || '',
      image2: product.image2 || '',
      image3: product.image3 || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'All' || product.category === categoryFilter)
  );

  // ✅ Summary Cards
  const totalProducts = products.length;
  const outOfStock = products.filter(p => parseInt(p.stock) === 0).length;
  const lowStock = products.filter(p => parseInt(p.stock) > 0 && parseInt(p.stock) < 10).length;
  const newArrivals = products.filter(p => p.createdAt || false).length;

  return (
    <div className="p-6 container mx-auto bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MdOutlineInventory className="text-4xl text-green-700" />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">Products Management</h1>
            <p className="text-base text-gray-600">Visualize and monitor your entire product stock in real-time.</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md transition-all duration-200"
        >
          + Add Product
        </button>
      </div>

      {/* ✅ Inventory Table */}
      <div className="overflow-x-auto bg-white shadow-2xl rounded-2xl">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gradient-to-r from-indigo-100 to-purple-100 border-b">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b hover:bg-purple-50">
                <td className="py-3 px-4">
                  <img src={product.image1} alt={product.name} className="w-12 h-12 rounded" />
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                <td className="py-3 px-4 text-gray-700">{product.category}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="border p-2 rounded" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="border p-2 rounded"></textarea>
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="border p-2 rounded" />
              <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleInputChange} className="border p-2 rounded" />

              {/* ✅ Category Dropdown (Dynamic from API) */}
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">-- Select Category --</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* Image Inputs */}
              <input type="text" name="image1" placeholder="Image URL 1" value={formData.image1} onChange={handleInputChange} className="border p-2 rounded" />
              <input type="text" name="image2" placeholder="Image URL 2" value={formData.image2} onChange={handleInputChange} className="border p-2 rounded" />
              <input type="text" name="image3" placeholder="Image URL 3" value={formData.image3} onChange={handleInputChange} className="border p-2 rounded" />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddOrUpdateProduct} className="px-4 py-2 bg-green-600 text-white rounded">
                {editingProduct ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
