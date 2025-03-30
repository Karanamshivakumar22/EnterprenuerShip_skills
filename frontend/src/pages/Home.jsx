import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, DollarSign, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
            alt="Women Entrepreneurs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Women Entrepreneurs
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Build your skills, grow your business, and transform your future with our comprehensive learning platform.
            </p>
            <div className="space-x-4">
              <Link to="/auth" className="btn-primary">
                Get Started
              </Link>
              <Link to="/courses" className="btn-secondary">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-purple-500" />}
              title="Business Planning"
              description="Learn how to create effective business plans and strategies for success."
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8 text-green-500" />}
              title="Financial Management"
              description="Master the basics of financial planning and management for your business."
            />
            <FeatureCard
              icon={<ShoppingBag className="h-8 w-8 text-blue-500" />}
              title="Digital Marketing"
              description="Discover how to promote your business online and reach more customers."
            />
          </div>
        </div>
      </section>

      {/* success Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="card"
  >
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, image, quote }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="card"
  >
    <div className="flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover mb-4"
      />
      <p className="text-gray-600 dark:text-gray-300 italic mb-4">{quote}</p>
      <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
    </div>
  </motion.div>
);

const testimonials = [
  {
    name: "Sara",
    role: "Small Business Owner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    quote: "This platform helped me transform my small business idea into a thriving reality."
  },
  {
    name: "Maria",
    role: "Artisan Entrepreneur",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    quote: "The financial management courses gave me the confidence to expand my business."
  },
  {
    name: "Priya Patel",
    role: "Digital Marketing Consultant",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    quote: "Thanks to the digital marketing modules, I now help other women entrepreneurs grow online."
  }
];

export default Home;