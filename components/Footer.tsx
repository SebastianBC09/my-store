import { FC } from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: FC<FooterProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`transition-colors duration-300 ease-in-out py-12 mt-auto 
      ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4 group">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300
                ${isDarkMode ? 'bg-indigo-600 group-hover:bg-indigo-500' : 'bg-indigo-500 group-hover:bg-indigo-600'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold">MyStore</h2>
            </div>
            <p
              className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Your one-stop destination for quality products at competitive
              prices.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {[
                {
                  name: 'Facebook',
                  path: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z',
                },
                {
                  name: 'Twitter',
                  path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
                },
                {
                  name: 'Instagram',
                  path: 'M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z M12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z M16.5 7.5C16.5 8.05228 16.0523 8.5 15.5 8.5C14.9477 8.5 14.5 8.05228 14.5 7.5C14.5 6.94772 14.9477 6.5 15.5 6.5C16.0523 6.5 16.5 6.94772 16.5 7.5Z',
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.name.toLowerCase()}`}
                  className={`transform transition-all duration-300 hover:scale-110 
                    ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3
              className={`text-sm font-bold uppercase mb-4 tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              Shop
            </h3>
            <ul className="space-y-2">
              {['New Arrivals', 'Best Sellers', 'Sale', 'All Collections'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`text-sm transition-colors duration-300 hover:underline
                      ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3
              className={`text-sm font-bold uppercase mb-4 tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              Information
            </h3>
            <ul className="space-y-2">
              {[
                'About Us',
                'Contact Us',
                'Shipping Policy',
                'Returns & Refunds',
                'FAQ',
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`text-sm transition-colors duration-300 hover:underline
                      ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3
              className={`text-sm font-bold uppercase mb-4 tracking-wider ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
            >
              Newsletter
            </h3>
            <p
              className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className={`px-4 py-2 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none
                  ${
                    isDarkMode
                      ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-500'
                  }`}
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div
          className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              &copy; {currentYear} MyStore. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`text-sm transition-colors duration-300 hover:underline
                      ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
