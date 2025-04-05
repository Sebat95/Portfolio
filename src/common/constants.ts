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
    title: 'Intesa Sanpaolo',
    isWork: true,
    ind: -1, // set afterwards
    desc: 'Intesa Sanpaolo S.p.A. is an Italian international banking group. It is the largest Italian bank by total assets and the world 27th.',
    subdesc:
      'I have been employed here as a full stack engineer since 2023. ' +
      'I worked mainly on the creation of a new webapp for managing Structured Finance Credit for the whole bank. ' +
      'I personally helped design the overall architecture: different databases (PostgreSQL and MongoDB), microservices (Java with Spring), micro frontends (AngularJS with module federation), comunication flow (Kafka) etc. '+
      'Then I developed most of the front end and some data ingestion process. ' +
      'Lastly, I have designed and developed a Visual Studio Code extension which integrates the company proprietary GenAI for generating commit comments, refactoring/explaining code and so on.',
    href: 'https://www.intesasanpaolo.com/',
    texture: '/assets/isp_texture.png',
    logo: '/assets/isp_logo.png',
    tags: [
      {
        name: 'AngularJs',
        path: '/assets/angular.png',
      },
      {
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        name: 'Java',
        path: 'assets/java.png',
      },
      {
        name: 'PostgreSQL',
        path: 'assets/postgre.png',
      },
      {
        name: 'MongoDB',
        path: 'assets/mongo.svg',
      }
    ],
  },
  {
    title: 'Reply',
    isWork: true,
    ind: -1,
    desc: 'Reply is an Italian company that specialises in information technology consulting, system integration and digital services.',
    subdesc:
      'I have worked here for 3 and half years as a full stack engineer, I helped develop and maintain different banking webapps of CA Autobank (FKA Stellantis) frontfacing as well as backoffices. ' +
      'During my years there I also mentored newly hired collegues and, by being in close contact with the users, I grew a good sense of client relationship management. ' +
      'Since the team was small, I had the opportunity to familiarize with the whole architecture from the Oracle SQL DB, MyBatis, Jenkins, Ansible, Openshift and so on.',
    href: 'https://www.reply.com',
    texture: '/assets/reply_texture.jpg',
    logo: '/assets/reply_logo.png',
    tags: [
      {
        name: 'AngularJs',
        path: '/assets/angular.png',
      },
      {
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        name: 'Java',
        path: 'assets/java.png',
      },
      {
        name: 'OracleDB',
        path: 'assets/oracle.png',
      }
    ],
  },
  {
    title: 'Generalized Principal Component Analysis',
    isWork: false,
    ind: -1,
    desc: 'Conventional principal component analysis (PCA) finds a principal vector that maximizes the sum of second powers of principal components. We consider a generalized PCA that aims at maximizing the sum of an arbitrary convex function of principal components.' + 
    'We present a gradient ascent algorithm to solve the problem. For the kernel version of generalized PCA, we show that the solutions can be obtained as fixed points of a simple single-layer recurrent neural network. We also evaluate our algorithms on different datasets.',
    subdesc:
      'This was my MS thesis, that got published by IEEE and got me a flying colors degree. I really enjoyed the research and discovery process, the heavy math and machine learning side. ' +
      'I have recently rewrote the whole thing from the intial Matlab scripts to Python.',
    href: 'https://github.com/Sebat95/GPCA',
    texture: '/assets/gcpa_texture.png',
    logo: '/assets/gcpa_logo.png',
    tags: [
      {
        name: 'Python',
        path: '/assets/python.png',
      },
      {
        name: 'Matlab',
        path: 'assets/matlab.png',
      }
    ],
  },
  {
    title: 'Exam Scheduling Solver',
    isWork: false,
    ind: -1,
    desc: 'During my college optimization course, my team and I were tasked to tackle an NP scheduling problem and we ranked first in our course',
    subdesc:
      'The problem was organizing different students in different courses with set priorities and capacities. ' +
      'We used a combination of 3 approaches/heuristics Greedy Randomized Adaptive Search Procedure (GRASP), Adaptive Large Neighborhood Search (ALNS) and Tabu Search (TS). ' +
      'The objective was to maximize the score while computing the result as fast as possible, so in the mix we also made the app multithreaded.',
    href: 'https://github.com/Sebat95/OMA',
    texture: '/assets/oma_texture.png',
    logo: '/assets/oma_logo.png',
    tags: [
      {
        name: 'C',
        path: '/assets/c.png',
      }
    ],
  },
  {
    title: 'AmICook',
    isWork: false,
    ind: -1,
    desc: 'AmiCook is an autonomous and remotly manageable pasta cooking system for dorms. Its prototype was presented at the "Startuppato 2017" startup convention.',
    subdesc:
      'In the college course of Automation, my team and I, designed and protoyped the overall architecture of this whole system in a startup fashion. ' +
      'I personally mainly developed the Flask server managing the interactions between all the parts (Android apps, website and Arduino system) and the presentational website. ',
    href: 'https://ami-2017.github.io/AmIcook',
    texture: '/assets/amicook_texture.png',
    logo: '/assets/amicook_logo.png',
    tags: [
      {
        name: 'Python',
        path: '/assets/python.png',
      },
      {
        name: 'Flask',
        path: 'assets/flask.png',
      },
      {
        name: 'Android',
        path: '/assets/android.png',
      },
      {
        name: 'Arduino',
        path: '/assets/arduino.png',
      },
      {
        name: 'Bootstrap',
        path: '/assets/bootstrap.png',
      }
    ],
  }
];
jobsAndProjs.forEach((v,i) => v.ind = i);

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
