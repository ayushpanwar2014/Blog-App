'use client'

import { useProgress } from '@/app/Context/ProgressProvider';
import Footer from '@/Components/Footer';
import { assets } from '@/public/Assets/assets'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, use } from 'react';

const page = ({ params }) => {

    const { id } = use(params);
    const [data, setData] = useState(null);
  const { startProgress, completeProgress } = useProgress();

    const fetchBlogData = async () => {
        startProgress()
        const response = await axios.get('/api/blog', {
            params: {
                id: id
            }
        })

        setData(response.data.blog);
        completeProgress();
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
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: data.description }}></div>
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
