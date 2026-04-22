const Footer = () => {
  return (
    <section
      className="c-space flex flex-wrap items-center justify-between gap-3 border-t border-black-300 pb-1 pt-7"
      id="footer"
    >
      <div className="flex gap-3">
        <a
          className="social-icon cursor-pointer"
          href="https://github.com/Sebat95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/assets/github.svg" alt="github" className="h-1/2 w-1/2" />
        </a>
        <a
          className="social-icon cursor-pointer"
          href="https://leetcode.com/u/Sebat/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/leetcode.svg"
            alt="github"
            className="h-1/2 w-1/2 rounded-full bg-white"
          />
        </a>
      </div>
      <p className="text-white-600">
        © {new Date().getFullYear()} Samuele Battaglino. All Rights Reserved
      </p>
    </section>
  );
};

export default Footer;
