import React, { useState } from 'react';
import './index.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (feedback.trim() === '') return;
    // Here you can send feedback to backend if needed
    setSuccessMsg('Thank you for your feedback!');
    setFeedback('');
    setTimeout(() => setSuccessMsg(''), 3000); // hide message after 3s
  };

  return (
    <div className="feedback-container">
      {/* Profile Card */}
      <div className="feedback-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/profile-img.png"
          alt="profile"
          className="feedback-profile-img"
        />
        <h2>John Doe</h2>
        <p>We value your opinion! Share your thoughts with us.</p>
      </div>

      {/* Feedback Form */}
      <div className="feedback-form-container">
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2>Submit Your Feedback</h2>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <label htmlFor="feedback">Your Feedback</label>
          <textarea
            id="feedback"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows="6"
          />
          <button type="submit" className="feedback-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
