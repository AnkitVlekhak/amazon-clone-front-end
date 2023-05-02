import React from 'react'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
const Footer = () => {
    return (
        <div className='footer'>
            <div className="flex flex-col icon text-[19px] font-medium">
                <span className='pb-[10px]'>Connect with us on </span>
                <div className='flex gap-[10px]'>
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                </div>
            </div>
            <div className="contact flex flex-col">
                <span className='text-[17px] font-medium'>Contact us</span>
                <span><span className='text-[17px] font-normal'>Phone no</span> : 73XXXXXX91</span>
                <span><span className='text-[17px] font-normal'>Contact us</span>: amazon-clone@gmail.com</span>
            </div>
        </div>
    )
}

export default Footer