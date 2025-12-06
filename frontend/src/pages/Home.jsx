import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        fetchProducts();
    }, [currentPage, search, category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/products', {
                params: { search, category, page: currentPage, limit: 6 }
            });
            setProducts(response.data.products);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <h1>Product Showcase</h1>
            <div className="filters">
                <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                </select>
            </div>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.image_url} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p className="category">{product.category}</p>
                                <p className="price">${product.price}</p>
                                <p className="description">{product.short_desc}</p>
                                <Link to={`/product/${product.id}`} className="btn">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                    {pagination.totalPages > 1 && (
                        <div className="pagination">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                Previous
                            </button>
                            <span>Page {currentPage} of {pagination.totalPages}</span>
                            <button disabled={currentPage === pagination.totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Home;