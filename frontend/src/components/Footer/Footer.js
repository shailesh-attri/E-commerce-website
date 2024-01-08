import React from 'react'
import logoTitle from '../../assets/logoimg.png'
import './Footer.scss'
const Footer = () => {
  return (
    <div className=" pt-16 mx-auto sm:max-w-xl tablets:max-w-full px-4 ">
    <div className="grid gap-10 row-gap-6 mb-8 mini-tablet:grid-cols-2 laptops:grid-cols-4">
      <div className="mini-tablet:col-span-2">
        
        <button className="logoDiv " >
              <img src={logoTitle} alt="" className="logoImg" />
         
            </button>
          
        
        <div className="mt-6 laptops:max-w-sm">
          <p className="text-sm text-gray-800">
          ElectroCart is a cutting-edge e-commerce platform specializing in a wide range of electronic devices, bringing the latest in technology to your fingertips. 
          </p>
          <p className="mt-4 text-sm text-gray-800">
          ElectroCart offers a diverse selection of electronic items, ensuring that customers can find the latest and most sought-after devices in the market. From state-of-the-art smartphones to powerful laptops and innovative smartwatches, we've got it all.
          </p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-base font-bold tracking-wide text-gray-900">
          Contacts
        </p>
        <div className="flex">
          <p className="mr-1 text-gray-800">Phone:</p>
          <a
            href="tel:850-123-5021"
            aria-label="Our phone"
            title="Our phone"
            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            9045074895
          </a>
        </div>
        <div className="flex">
          <p className="mr-1 text-gray-800">Email:</p>
          <a
            href="mailto:info@lorem.mail"
            aria-label="Our email"
            title="Our email"
            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
           shaileshattri83@gmail.com
          </a>
        </div>
        <div className="flex">
          <p className="mr-1 text-gray-800">Address:</p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Our address"
            title="Our address"
            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
           Noida, Uttar Pradesh, IN
          </a>
        </div>
      </div>
      <div>
        <span className="text-base font-bold tracking-wide text-gray-900">
          Social
        </span>
        <div className="flex items-center mt-1 space-x-3">
          <a
            href="https://github.com/shailesh-attri"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a
            href="mailto:shaileshattri83@gmail.com"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
           <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/></svg>
          </a>
          <a
            href="https://shailesh-attri.netlify.app/"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
           <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15.246 17c-.927 3.701-2.547 6-3.246 7-.699-1-2.32-3.298-3.246-7h6.492zm7.664 0c-1.558 3.391-4.65 5.933-8.386 6.733 1.315-2.068 2.242-4.362 2.777-6.733h5.609zm-21.82 0h5.609c.539 2.386 1.47 4.678 2.777 6.733-3.736-.8-6.828-3.342-8.386-6.733zm14.55-2h-7.28c-.29-1.985-.29-4.014 0-6h7.281c.288 1.986.288 4.015-.001 6zm-9.299 0h-5.962c-.248-.958-.379-1.964-.379-3s.131-2.041.379-3h5.962c-.263 1.988-.263 4.012 0 6zm17.28 0h-5.963c.265-1.988.265-4.012.001-6h5.962c.247.959.379 1.964.379 3s-.132 2.042-.379 3zm-8.375-8h-6.492c.925-3.702 2.546-6 3.246-7 1.194 1.708 2.444 3.799 3.246 7zm-8.548-.001h-5.609c1.559-3.39 4.651-5.932 8.387-6.733-1.237 1.94-2.214 4.237-2.778 6.733zm16.212 0h-5.609c-.557-2.462-1.513-4.75-2.778-6.733 3.736.801 6.829 3.343 8.387 6.733z"/></svg>
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
        ElectroCart leverages the power of social media platforms such as Github, Gmail, and more.
        </p>
      </div>
    </div>
    <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t laptops:flex-row">
      <p className="text-sm text-gray-600">
        © Copyright 2024 ShaileshAttri Inc. All rights reserved.
      </p>
      <ul className="flex flex-col mb-3 space-y-2 laptops:mb-0 mini-tablet:space-y-0 mini-tablet:space-x-5 mini-tablet:flex-row">
        <li>
          <a
            href="/"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            F.A.Q
          </a>
        </li>
        <li>
          <a
            href="/"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="/"
            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            Terms &amp; Conditions
          </a>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Footer
