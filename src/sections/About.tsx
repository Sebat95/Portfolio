
import { useState } from 'react';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const email = 'samubattaglino@gmail.com';
    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false)
        }, 2000);
    }

  return (
    <section className="c-space my-20" id='about'>
        <div className="grid xl:grid-cols-3 xl:grid-rows-4
            md:grid-cols-2 md:grid-rows-1 gap-5 h-full">
                <div className="xl:col-span-3 xl:row-span-2">
                    <div className="grid-container">
                        <div>
                            <p className="grid-headtext">Hi again</p>
                            <p className="grid-subtext">I'm a full stack software engineer with 5 years of experience.
                                During my career I had the pleasure to work with many tech stack.
                                As languages I've used primaly: Java, TS, JS, HTML, CSS, Python and C;
                                 and with them various framworks: Angular, Jax-RS, Spring, React, Numpy, Flask
                                As Databases: Oracle, Postgres, Mongo, Redis and Clickhouse
                                As Cloud Provider mainly GCP and other tecnologies like Kakfa, Redis
                            </p>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/cv.png" alt="grid-3" className="w-full sm:h-[276px] h-fit object-cover sm:objet-top"/>
                        <div>
                            <p className="grid-headtext">Get my CV</p>
                            <div className='copy-container' onClick={handleCopy}>
                                <img className='w-9 h-9 text-red fill-current' src={hasCopied ? '/assets/tick.svg' : '/assets/download.svg'} alt="copy"/>
                                <p className="grid-subtext">If you want a more professional look at my career</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/typescript.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">Technologies</p>
                            <p className="grid-subtext">Just a tl;dr if you did not want to read above</p>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/email.png" alt="grid-4" className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div className='space-y-2'>
                            <p className="grid-headtext">Let's talk!</p>
                            <p className="grid-subtext text-center">The best way to get in touch is to shot me an email</p>
                            <div className='copy-container' onClick={handleCopy}>
                                <img src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'} alt="copy"/>
                                <p className='lg:text-xl md:text-l text-gray_gradient text-white'>{email}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>
  )
}

export default About