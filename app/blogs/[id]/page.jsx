'use client'

import Footer from '@/Components/Footer';
import { assets } from '@/public/Assets/assets'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

const page = ({ params }) => {

    const { id } = use(params);
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        const response = await axios.get('http://localhost:3000/api/blog', {
            params: {
                id: id
            }
        })

        setData(response.data.blog);
    }

    useEffect(() => {
        fetchBlogData();
    }, [])

    return (data != undefined ?
        <>
            <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>

                <div className="flex justify-between items-center">
                    <Link href='/'>
                        <Image className="cursor-pointer w-[130px]" src={assets.logo} alt='logo' width={180} />
                    </Link>
                    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                        Get Started <Image src={assets.arrow} alt='arrow' />
                    </button>
                </div>
                <div className="text-center my-24">
                    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto' >{data.title}</h1>
                    <Image className='mx-auto mt-6 border-3 border-white rounded-full' src={data.authorImg} alt='blog' width={80} height={80} />
                    <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
                </div>
            </div>

            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                <Image className='border-4 border-white rounded-2xl' src={data.image} alt='blog' width={1280} height={720} />
                <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1>
                <p>{data.description}</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Reflection and Goal Setting</h3>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection and Goal Setting</h3>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Reflection and Goal Setting</h3>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <p className='my-3'>Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve. Start by reflecting on your values, aspirations, and long-term goals.</p>
                <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
                <p className='my-3'>Managing your lifestyle is a journey that requires commitment and self-awareness. By following this step-by-step guide, you can take control of your life and make meaningful changes that lead to a more balanced and fulfilling lifestyle. Remember that it's okay to seek support and guidance from professionals or mentors along the way. Your well-being and happiness are worth the effort.</p>
                <div className="my-24">
                    <p className='text-black font font-semibold my-4'>Share this article on social media</p>
                    <div className="flex">
                        <Image src={assets.facebook_icon} alt='facebook' width={50} />
                        <Image src={assets.twitter_icon} alt='facebook' width={50} />
                        <Image src={assets.googleplus_icon} alt='facebook' width={50} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
        :
        <>
        </>
    )
}

export default page
