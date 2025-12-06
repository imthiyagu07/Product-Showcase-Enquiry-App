import { useState, useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>
    if (!product) return <p>Product not found</p>

    return (
        <div className="products-details">
            <Link to="/" className="back-link">&larr; Back to Products</Link>
            <div className="product-content">
                <img src={product.image_url} alt={product.name} />
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.long_desc}</p>
                    <button className="btn btn-primary" onClick={() => setShowEnquiryForm(true)}>Enquire Now</button>
                </div>
            </div>
            {showEnquiryForm && <EnquiryForm productId={product.id} productName={product.name} onClose={() => setShowEnquiryForm(false)} />}
        </div>
    )
}

export default ProductDetails;