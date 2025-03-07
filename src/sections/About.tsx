
import { Dispatch, SetStateAction, useState } from 'react';
import { aboutMe } from '../constants/general';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);
    const [hasDowloaded, sethasDowloaded] = useState(false);
    const email = 'samubattaglino@gmail.com';
    const handleAction = (setState: Dispatch<SetStateAction<boolean>>, action: CallableFunction) => {
        action();
        
        setTimeout(() => {
            setState(true);
            setTimeout(() => setState(false), 2000);
        }, 200);
    }

    // TODO: refactor to get call once cv is hosted too
    const doDownload = () => {
        const link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = '/assets/cv_anonimized.pdf';
        link.download = 'cv.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    return (
        <section className="c-space my-20" id='about'>
            <div className="grid xl:grid-cols-3 xl:grid-rows-4
                md:grid-cols-2 md:grid-rows-1 gap-5 h-full">
                    <div className="xl:col-span-3 xl:row-span-2">
                        <div className="grid-container">
                            <div>
                                <p className="grid-headtext">Hi all!</p>
                                <p className="grid-headtext">Thanks for visiting my site</p>
                                <br/>
                                <p className="grid-subtext">
                                    I'm a full stack software engineer with {new Date().getFullYear() - 2020} years of experience.
                                </p>
                                {aboutMe.map((me, ind) => (
                                    me === '' ?
                                    <br key={ind} /> :
                                    <p key={ind} className='grid-subtext'>
                                        {me}
                                    </p>     
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-1 xl:row-span-2">
                        <div className="grid-container">
                            <img src="/assets/cv.png" alt="cv" className="w-full sm:h-[276px] h-fit object-cover sm:objet-top"/>
                            <div>
                                <p className="grid-headtext">Get my CV</p>
                                <div className='copy-container' onClick={() => handleAction(sethasDowloaded, doDownload)}>
                                    <img className='w-9 h-9 text-red fill-current' src={hasDowloaded ? '/assets/tick.svg' : '/assets/download.svg'} alt="copy"/>
                                    <p className="grid-subtext">If you want a more professional look at my career</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-1 xl:row-span-2">
                        <div className="grid-container">
                            <img src="/assets/stackLogos.png" alt="stack" className="w-full sm:h-[276px] h-fit object-contain"/>
                            <div>
                                <p className="grid-headtext">Technologies</p>
                                <p className="grid-subtext">Just a tl;dr if you did not read above</p>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-1 xl:row-span-2">
                        <div className="grid-container">
                            <img src="/assets/email.png" alt="email" className="w-full sm:h-[276px] h-fit object-contain"/>
                            <div className='space-y-2'>
                                <p className="grid-headtext">Let's talk!</p>
                                <p className="grid-subtext text-center">The best way to get in touch is to shot me an email</p>
                                <div className='copy-container' onClick={() => handleAction(setHasCopied, () => navigator.clipboard.writeText(email))}>
                                    <img src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'} alt="copy"/>
                                    <p className='lg:text-xl md:text-l text-gray_gradient text-white'>{email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </section>
    )
};

export default About;