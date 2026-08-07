'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate API network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.formHeader}>
        <h2>Send Us a Message</h2>
        <p>Fill out the form below and our concierge team will respond within 24 hours.</p>
      </div>

      {isSubmitted && (
        <div className={styles.successBox}>
          <CheckCircle size={20} />
          <span>Thank you for contacting Noir Scents! Your message has been received and our team will be in touch shortly.</span>
        </div>
      )}

      {errorMessage && (
        <div className="error-text" style={{ marginBottom: '1rem' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alexander Sterling"
              className={styles.inputField}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className={styles.label}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. alexander@example.com"
              className={styles.inputField}
              required
            />
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="subject" className={styles.label}>
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.inputField}
            >
              <option value="">Select a topic...</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Product Assistance">Product & Fragrance Consultation</option>
              <option value="Order Status">Order Status & Delivery</option>
              <option value="Boutique Appointment">Boutique Fitting Appointment</option>
              <option value="Wholesale / Partnership">Wholesale & Partnership</option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="message" className={styles.label}>
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can Noir Scents assist you today?"
              className={`${styles.inputField} ${styles.textareaField}`}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
              Sending Message...
            </>
          ) : (
            <>
              Send Message <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
