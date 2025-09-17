import React, { useState } from 'react';
import './index.css';
import Header from '../Header';
import Footer from '../Footer';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async event => {
  event.preventDefault();
  if (feedback.trim() === '') return;

  try {
    const response = await fetch('https://jobby-app-chi-five.vercel.app/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'John Doe', // you can make it dynamic
        email: 'john@example.com', // optional
        message: feedback
      })
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMsg('Thank you for your feedback!');
      setFeedback('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      console.error('Error:', data.error);
    }
  } catch (err) {
    console.error('Network error:', err);
  }
};


  return (
    <>
    <Header />
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
    <Footer />
    </>
  );
};

export default Feedback;
