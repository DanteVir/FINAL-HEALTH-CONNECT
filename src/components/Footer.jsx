import React from 'react'
import  modle  from '../assets/img/logo.png'
export const Footer = () => {
  return (
    <div className='bg-red-400 '>
        <footer className="text-white body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                <img src={modle} alt="" className="w-16 h-16 text-white p-2 rounded-full" viewBox="0 0 50 50 "/>
      <span className="ml-3 text-xl text-white">Health Conect</span>
    </a>
    <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-white sm:py-2 sm:mt-0 mt-4">© 2024 —
      <a href="https://www.unac.edu.co/" className="text-white ml-1" rel="noopener noreferrer" target="_blank">@Corporacion universitaria Adventista</a>
      <h6>derechos de proyecto solo para estudio</h6>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

      <a href="https://www.instagram.com/cen.trovih?igsh=ZGtreTc5ZWNmdjVm" className="ml-3 text-white">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
        </svg>
      </a>

    </span>
  </div>
</footer>
      
    </div>
  )
}

