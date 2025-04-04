'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <MainLayout>
      <div
        className={`mx-auto max-w-6xl px-4 py-12 ${isVisible ? 'fade-in' : 'opacity-0'}`}
      >
        {/* Hero Section */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <h1 className="text-text-primary mb-4 text-4xl font-bold md:text-5xl">
              Welcome to our store!
            </h1>
            <p className="text-text-secondary mb-6 text-lg">
              Your one-stop destination for quality products at competitive
              prices.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text rounded-lg px-6 py-3 font-medium transition-all duration-300">
                Shop Now
              </button>
              <button className="bg-button-secondary-bg hover:bg-button-secondary-hover text-button-secondary-text border-button-secondary-border rounded-lg border px-6 py-3 font-medium transition-all duration-300">
                View Collections
              </button>
            </div>
          </div>
          <div className="bg-bg-secondary w-full overflow-hidden rounded-lg shadow-md md:w-1/2">
            <div className="bg-bg-accent flex h-64 items-center justify-center md:h-full">
              <div className="p-6 text-center">
                <div className="mb-4 inline-block rounded-full bg-white p-4 dark:bg-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-text-on-primary text-xl font-bold">
                  Premium Quality
                </h3>
                <p className="text-text-on-primary">
                  All products curated for excellence
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'Fast Shipping',
              description: 'Free delivery on orders over $50',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              ),
            },
            {
              title: 'Secure Payments',
              description: 'All transactions are encrypted',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
            },
            {
              title: '24/7 Support',
              description: 'Our team is always here to help',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-card-bg border-card-border slide-in rounded-lg border p-6 shadow-md transition-all duration-300 hover:shadow-lg`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-accent mb-4">{feature.icon}</div>
              <h3 className="text-text-primary mb-2 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-bg-secondary slide-in-right rounded-lg p-8 text-center">
          <h2 className="text-text-primary mb-4 text-2xl font-bold md:text-3xl">
            Ready to Experience Our Premium Quality?
          </h2>
          <p className="text-text-secondary mx-auto mb-6 max-w-2xl">
            Join thousands of satisfied customers who trust our products for
            their everyday needs.
          </p>
          <button className="bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text rounded-lg px-6 py-3 font-medium transition-all duration-300">
            Explore Collections
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
