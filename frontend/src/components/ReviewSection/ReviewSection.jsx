import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './ReviewSection.css';

const ReviewSection = ({ foodId }) => {
    const { url, token } = useContext(StoreContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const fetchReviews = async () => {
        try {
            const res = await axios.post(`${url}/api/review/food-reviews`, { foodId });
            if (res.data.success) {
                setReviews(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [foodId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Vui lòng đăng nhập để gửi đánh giá!");
            return;
        }
        try {

            await axios.post(`${url}/api/review/add`, { foodId, rating, comment }, { headers: { token } });
            setComment("");
            setRating(5);
            fetchReviews();
        } catch (err) {
            alert("Lỗi khi thêm đánh giá");
        }
    }

    return (
        <div className="review-section">
            <div className="review-list">
                {reviews.length === 0 ? <p className="no-reviews">Chưa có đánh giá nào. Hãy là người đầu tiên!</p> : null}
                {reviews.map((rev, index) => (
                    <div key={index} className="review-item">
                        <div className="stars">{"⭐".repeat(rev.rating)}</div>
                        <p className="comment">{rev.comment}</p>
                        <small className="date">{new Date(rev.date).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>

            {token && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <div className="rating-select">
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            <option value="5">5 Sao - Rất ngon</option>
                            <option value="4">4 Sao - Ngon</option>
                            <option value="3">3 Sao - Tạm ổn</option>
                            <option value="2">2 Sao - Dở</option>
                            <option value="1">1 Sao - Tệ</option>
                        </select>
                    </div>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Bình luận của bạn..."
                        rows="2"
                    />
                    <button type="submit">Gửi</button>
                </form>
            )}
        </div>
    )
}

export default ReviewSection;
