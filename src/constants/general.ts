import { Vector3 } from "three";

export const navLinks = [
    {
      id: '1',
      name: 'Home',
      href: '#home',
    },
    {
      id: '2',
      name: 'About',
      href: '#about',
    }
];

export const jobsAndProjs = [
  {
    title: 'Reply',
    isWork: true,
    desc: 'Reply is an Italian company that specialises in information technology consulting, system integration and digital services.',
    subdesc:
      'I helped develop and maintain different banking webapps of CA Autobank (FKA Stellantis) frontfacing as well as backoffices. During my years there I also mentored newly hired collegues and, by being in close contact with the users, I grew a good sense of client relationship management.',
    href: 'https://www.reply.com',
    texture: '/assets/reply_texture.jpg',
    logo: '/assets/reply_logo.png',
    tags: [
      {
        id: 1,
        name: 'AngularJs',
        path: '/assets/angular.png',
      },
      {
        id: 2,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 3,
        name: 'Java',
        path: 'assets/java.png',
      },
    ],
  },
  {
    title: 'LiveDoc - Real-Time Google Docs Clone',
    isWork: false,
    desc: 'LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.',
    subdesc:
      'With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features.',
    href: 'https://www.youtube.com/watch?v=y5vE8y_f_OM',
    texture: '/assets/project-logo2.png',
    logo: '/assets/project-logo2.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      }
    ],
  },
  {
    title: 'CarePulse - Health Management System',
    isWork: false,
    desc: 'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
    subdesc:
      'With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
    href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
    texture: '/assets/project-logo3.png',
    logo: '/assets/project-logo3.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      }
    ],
  },
  {
    title: 'Horizon - Online Banking Platform',
    isWork: false,
    desc: 'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
    subdesc:
      'Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.',
    href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
    texture: '/assets/project-logo4.png',
    logo: '/assets/project-logo4.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      }
    ],
  },
  {
    title: 'Imaginify - AI Photo Manipulation App',
    isWork: false,
    desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.',
    subdesc:
      'Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.',
    href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
    texture: '/assets/project-logo5.png',
    logo: '/assets/project-logo5.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      }
    ],
  },
];

export const calculateSizes = (isSmall: boolean, isMobile: boolean, isTablet: boolean) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.07,
    deskPosition: numsToVector3(isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0]),
    cubePosition:  numsToVector3(isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0]),
    reactLogoPosition: numsToVector3(isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0]),
    ringsPosition: numsToVector3(isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0]),
    targetPosition: numsToVector3(isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10]),
  };
};

export const numsToVector3 = (nums: number[]) => new Vector3(nums[0], nums[1], nums[2]);

export const aboutMe = [
  "I created this portfolio first and foremost to teach myself React, TreeJS, and GCP hosting,",
  "I really had fun and learned a lot while putting it together!",
  "",
  "I always wanted to work with Machine Learning, persue a PhD and all but life always brought me back to coding,",
  "doing leetcode every day surely did its part!",
  "During my career I worked with: Java, TS, JS, HTML, CSS, Python, C, Angular, Postgres, Mongo, Spring, Numpy, Flask, Redis, Clickhouse, Kakfa...",
  "",
  "The reality of things is that I love to always keep learing and thinkering, that's why programming in general is sooo appealing to me!",
  "",
  "Anyhow if you enjoyed my website and you'd like to contact me, feel free to reach out or just give me a star on Github *wink*"
];

export const isEmpty = (input: string) => input == null || input === '';

export const experiences = ['Education', 'Work and Projects', 'Hobbies'];

const pagesLength = 6;
export const pages = [
  {
    front: "book-cover",
    back: "pages-images-0",
    title: "Cover"
  }
];
for (let i = 1, j = 1; i < pagesLength - 1; i += 2, j +=1) {
  pages.push({
    front: `pages-images-${i}`,
    back: `pages-images-${i + 1}`,
    title: `Page ${j}`
  });
}
pages.push({
  front: `pages-images-${pagesLength-1}`,
  back: "book-back",
  title: `Page ${pages.length}`
});



