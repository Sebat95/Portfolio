import { Dispatch, SetStateAction, useState } from 'react';
import { aboutMe } from '../common/constants';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [hasDowloaded, sethasDowloaded] = useState(false);
  const email = 'samubattaglino@gmail.com';
  const handleAction = (
    setState: Dispatch<SetStateAction<boolean>>,
    action: CallableFunction
  ) => {
    action();
    // avoid multiple download
    setTimeout(() => {
      setState(true);
      setTimeout(() => setState(false), 2000);
    }, 200);
  };

  // maybe refactor and host the cv too
  const doDownload = () => {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '/assets/cv.pdf';
    link.download = 'cv.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid h-full gap-5 md:grid-cols-2 md:grid-rows-1 xl:grid-cols-3 xl:grid-rows-4">
        <div className="xl:col-span-3 xl:row-span-2">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">Hi all!</p>
              <p className="grid-headtext">Thanks for visiting my site</p>
              <br />
              <p className="grid-subtext">
                I'm Samuele Battaglino, a full stack software engineer with{' '}
                {new Date().getFullYear() - 2020} years of experience.
              </p>
              {aboutMe.map((me, ind) =>
                me === '' ? (
                  <br key={ind} />
                ) : (
                  <p key={ind} className="grid-subtext">
                    {me}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className="flex h-full w-full justify-center">
              <img
                src="/assets/cv.webp"
                alt="cv"
                className="sm:objet-top h-96 w-96 object-contain"
              />
            </div>
            <div>
              <p className="grid-headtext">Get my CV</p>
              <div
                className="copy-container"
                onClick={() => handleAction(sethasDowloaded, doDownload)}
              >
                <img
                  className="text-red h-9 w-9 fill-current"
                  src={
                    hasDowloaded ? '/assets/tick.svg' : '/assets/download.svg'
                  }
                  alt="copy"
                />
                <p className="grid-subtext">
                  If you want a more professional look at my career
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className="flex h-full w-full justify-center">
              <img
                src="/assets/stackLogos.webp"
                alt="stack"
                className="sm:objet-top h-96 w-96 object-contain"
              />
            </div>
            <div>
              <p className="grid-headtext">Technologies</p>
              <p className="grid-subtext">
                Just a tl;dr if you did not read above
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <div className="flex h-full w-full justify-center">
              <img
                src="/assets/email.webp"
                alt="email"
                className="sm:objet-top h-96 w-96 object-contain"
              />
            </div>
            <div className="space-y-2">
              <p className="grid-headtext">Let's talk!</p>
              <p className="grid-subtext text-center">
                The best way to get in touch is to shot me an email
              </p>
              <div
                className="copy-container"
                onClick={() =>
                  handleAction(setHasCopied, () =>
                    navigator.clipboard.writeText(email)
                  )
                }
              >
                <img
                  src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'}
                  alt="copy"
                  className="h-8 w-8"
                />
                <p className="md:text-l text-gray_gradient text-white lg:text-xl">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
