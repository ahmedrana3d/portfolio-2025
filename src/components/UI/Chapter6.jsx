import React, { useState, memo, useEffect } from 'react';
import { Mail, Phone, Send, Calendar, Sparkles, X } from 'lucide-react';
import { AnimatedText, Title } from './AnimatedComponents';

const Chapter6 = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f8da8b8e-8532-4436-8801-d288df445290',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          subject: `Contact Form Submission from ${formData.name}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
        // Clear status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 relative overflow-hidden transform-gpu will-change-contents"
      style={{ contain: 'layout style paint' }}
    >
      <AnimatedText className="mb-12 md:mb-16 lg:mb-20">
        <Title>
          So lets make your website stand out!
        </Title>
      </AnimatedText>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 relative z-10">
        {/* Left side - Contact Info */}
        <div className="flex flex-col justify-center space-y-8 animate-fade-in">
          {/* Icon with glow effect */}
          <div className="relative inline-block w-fit">
            <div className="absolute inset-0 bg-gray-500 blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative overflow-hidden  transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          <div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white via-blue-100 to-gray-200 bg-clip-text text-transparent leading-tight">
              Contact us
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md mb-8 md:mb-10">
              We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
            </p>
          </div>

          {/* Contact details with hover effects */}
          <div className="space-y-4 md:space-y-5">
            {[
              { icon: Mail, text: 'contact@yoursaas.ai', href: 'mailto:contact@yoursaas.ai' },
              { icon: Phone, text: '+1 (800) 123 XX21', href: 'tel:+1800123XX21' },
              { icon: Mail, text: 'support@yoursaas.ai', href: 'mailto:support@yoursaas.ai' }
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="group flex items-center gap-3 text-slate-300 hover:text-white transition-all duration-300 w-fit"
              >
                <div className="bg-slate-800/50 p-2 rounded-lg group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">{item.text}</span>
              </a>
            ))}
          </div>

          {/* Book a Call Button - Main CTA */}
          <div className="pt-8">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={openModal}
              className="group cursor-pointer relative px-8 py-5 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 w-full sm:w-auto"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              
              {/* Button content */}
              <div className="relative flex items-center cursor-pointer  justify-center gap-3 text-white font-semibold text-lg">
                <Calendar className={`w-6 h-6 transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
                <span>Book a Call</span>
                <Sparkles className={`w-5 h-5 transition-all duration-500 ${isHovered ? 'rotate-180 scale-125' : ''}`} />
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>
        </div>

        {/* Right side - Contact Form */}
        <div className="relative animate-fade-in-delay">
          {/* Glassmorphism card */}
          <div className="relative [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-3xl p-8 shadow-2xl overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-500/20 to-gray-500/20 rounded-full blur-3xl -z-10"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="group">
                <label className="block text-slate-300 text-sm font-medium mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ahmed Farooq"
                  className="w-full [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)]  rounded-xl px-4 py-3.5 text-white  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-600"
                />
              </div>

              {/* Email Address */}
              <div className="group">
                <label className="block text-slate-300 text-sm font-medium mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="support@aceternity.com"
                  className="w-full [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-xl px-4 py-3.5 text-white  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-600"
                />
              </div>

              {/* Company */}
              <div className="group">
                <label className="block text-slate-300 text-sm font-medium mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Aceternity Labs LLC"
                  className="w-full [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-xl px-4 py-3.5 text-white  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-slate-600"
                />
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-slate-300 text-sm font-medium mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Type your message here"
                  rows="4"
                  className="w-full [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-xl px-4 py-3.5 text-white  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none hover:border-slate-600"
                ></textarea>
                <div className={`h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left transition-transform duration-300 ${focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </div>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-sm animate-fade-in">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-sm animate-fade-in">
                  ✗ Failed to send message. Please try again or contact us directly.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative w-full bg-linear-to-r from-black via-black to-neutral-900 hover:from-slate-700 hover:to-slate-600 text-white font-semibold py-4 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 border border-slate-600/50 hover:border-blue-500/50 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Cal.com Booking Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl h-[90vh] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] [border:1px_solid_rgba(255,255,255,.1)] rounded-3xl overflow-hidden bg-slate-900 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-white transition-all duration-300 hover:scale-110 border border-slate-700/50 hover:border-slate-600"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Cal.com Embed */}
            <iframe
              src="https://cal.com/ahmed-farooq/15min?overlayCalendar=true"
              className="w-full h-full border-0 rounded-3xl"
              title="Book a call with Ahmed Farooq"
              allow="camera; microphone; geolocation"
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
});

Chapter6.displayName = 'Chapter6';

export default Chapter6;