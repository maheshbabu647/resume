import { Button } from '@/components/ui/button'
import React from 'react'
import { NavLink } from 'react-router-dom'
import  heroImg  from '../assets/images/hero-img.jpg'
import FeatureCard from '@/components/Common/Card/FeatureCard'
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <>
    {/*  hero section */}
    <section 
    className='flex min-w-screen flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-10 px-6 md:px-20 py-16'
        style={{
            minHeight: "calc(100vh - 64px)",
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg width='15' height='15' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' y='4' width='3' height='12' rx='1' fill='%23e0e7ff' opacity='0.5'/><rect x='4' y='9' width='12' height='2' rx='1' fill='%23e0e7ff' opacity='0.7'/></svg>\")",
            backgroundRepeat: "repeat",
            backgroundColor: "#f6f6fb"
        }}>

        {/* hersection left */}
        <div className='md:min-w-6/12 text-white flex-1 max-w-xl space-y-6 text-center md:text-left md:pl-5'>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Build Your Career with <br /> AI-Powered Resumes
            </h1>
            <p className='text-gray-600 text-lg max-w-xl leading-relaxed text-center md:text-left'>
                Create professional resumes with our advanced AI tools.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                <Button class="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition">
                    Get Started →
                </Button>
                <Button class="bg-white text-gray-700 px-6 py-2 rounded-md border border-gray-300 hover:shadow-md transition">
                    View Templates
                </Button>
            </div>
        </div>
        <div className=' flex justify-center flex-shrink-0 w-auto'>
            <img 
                src={heroImg}
                // className='w-[300px] md:w-[450px] rounder-xl shadow2xl shadow-black transform hover:-translate-y-2 transition duration-500'
                alt="Resume AI Screenshot"
                className="rounded-xl shadow-[0_15px_40px_rgba(93,134,255,0.45)] transition-shadow duration-300 hover:shadow-[0_25px_80px_rgba(93,134,255,0.6)] md:rotate-[-2.5deg] sm:w-[400px] md:w-[600px]"
            />
        </div> 
    </section>

    {/* Features */}
    <section className='min-w-screen py-20 bg-white text-center px-4 md:px-16 flex flex-col justify-center'>
        <div className='max-w-4xl mx-auto space-y-4 mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
                Powerful AI Integrated Features
            </h2>
            <p className='text-gray-600 text-lg'>
                Our suite of AI-powered tools helps you create impressive job application materials<br className="hidden sm:block" />
                and prepare for interviews.
            </p>
        </div>

        <div className='flex flex-wrap justify-center gap-6'>
            <FeatureCard 
            title="AI Resume Builder"
            description="Create professional resumes with AI assistance. Our tool helps you craft the perfect resume tailored to your industry."
            icon="resume"
            status="available"
            /> 
            <FeatureCard
                title="AI Cover Letter Generator"
                description="Generate personalized cover letters that complement your resume and increase your chances of landing interviews."
                icon="cover"
            />
            <FeatureCard
                title="AI Mock Interview"
                description="Practice for your interviews with our AI interviewer. Get feedback and improve your interview skills."
                icon="mock"
            />
        </div>
    </section>

    {/* CTA */}
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-center py-20 px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Build Your Professional Resume?
      </h2>
      <p className="text-lg max-w-xl mx-auto mb-8">
        Get started with our AI-powered resume builder today and increase your chances of
        landing your dream job.
      </p>
      <Button className="bg-white text-indigo-700 font-semibold px-6 py-3 hover:bg-gray-100 transition">
        Create Your Resume →
      </Button>
    </motion.section>
    </>
    )
}

export default HomePage