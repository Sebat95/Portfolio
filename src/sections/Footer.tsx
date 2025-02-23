const Footer = () => {
  return (
    <section className='c-space pt-7 pb-1 border-t border-black-300 flex justify-between items-center flex-wrap gap-3'
        id='footer'>
          <div className='flex gap-3'>
              <a className='social-icon cursor-pointer'
                  href='https://github.com/Sebat95' target='_blank' rel='noreferrer'>
                      <img src='/assets/github.svg' alt='github' className='w-1/2 h-1/2' />
              </a>
              <a className='social-icon cursor-pointer'
                  href='https://leetcode.com/u/Sebat/' target='_blank' rel='noreferrer'>
                      <img src='/assets/leetcode.svg' alt='github' className='w-1/2 h-1/2 rounded-full bg-white' />
              </a>
          </div>
          <p className="text-white-500">© {new Date().getFullYear()} Samuele Battaglino. All Rights Reserved</p>
    </section>
  )
};
  
export default Footer;