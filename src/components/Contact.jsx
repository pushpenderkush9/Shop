"use client";

import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    let result;
    try {
      result = await res.json(); // Try parsing JSON
    } catch (jsonErr) {
      console.error('JSON parse error:', jsonErr);
      const text = await res.text(); // Fallback to raw text
      console.error('Raw response:', text);
      throw new Error('Invalid JSON response from server');
    }

    if (res.ok) {
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert(result.message || 'Failed to send message.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('An error occurred. Try again later.');
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row max-w-5xl w-full shadow-2xl">
        {/* Left side image */}
        <div className="w-full md:w-1/2">
          <img
            src="contact.jpg" 
            alt="Contact"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6 text-black">Contact Us</h1>

          <form onSubmit={handleSubmit} className="space-y-6 mb-8">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black focus:outline-none py-2"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black focus:outline-none py-2 h-24 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
            >
              Contact Us
            </button>
          </form>

          {/* Contact details */}
          <div className="flex-col justify-center items-center space-y-4">
            <div>
              <h2 className="font-semibold text-lg">Contact</h2>
              <p className="text-gray-600">code.x.campus.student@gmail.com</p>
              <p className="text-gray-600">Mobile Number : +91-7988636701</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Based in</h2>
              <p className="text-gray-600">Haryana, India</p>
            </div>
            {/* Social icons */}
            <div className="flex gap-4 mt-4 text-black">
              <FaFacebookF className="cursor-pointer hover:text-gray-700" size={20} />
              <FaInstagram className="cursor-pointer hover:text-gray-700" size={20} />
              <FaTwitter className="cursor-pointer hover:text-gray-700" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
