export const navLinks = [
    {
      id: '1',
      name: 'Home',
      exp: false,
      href: '#home',
    },
    {
      id: '2',
      name: 'Start Journey',
      exp: true,
      href: '#exp',
    },
    {
      id: '3',
      name: 'About',
      exp: false,
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
    texture: '/textures/computer/isp_texture.png',
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
    texture: '/textures/computer/reply_texture.jpg',
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
    texture: '/textures/computer/gcpa_texture.png',
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
    texture: '/textures/computer/oma_texture.png',
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
    texture: '/textures/computer/amicook_texture.png',
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
  "I always wanted to work with Machine Learning, persue a PhD and all, but life always brought me back to coding,",
  "doing leetcode every day surely did its part!",
  "I have used: Java, TS, JS, HTML, CSS, Python, Angular, Postgres, Mongo, Spring, Numpy, C, Flask, Redis, Clickhouse, Kakfa...",
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

export const hobbies = [
  [
    "Sport",
    "Sport has always been integral to my life – a true believer in 'mens sana in corpore sano'. ",
    "In my youth, from playing basketball and becoming a certified referee, to later learning to ski, play volleyball, swim, and scuba dive, staying active has been a constant. ",
    "More recently, I've continued this through gym workouts, calisthenics, and rock climbing."
  ],[
    "Distilling",
    "Alongside my passion for cooking, I've developed a growing interest in the intricacies of distilling and infusing alcohol. ",
    "As a complete beginner, I've been exploring the process of making various liquors from scratch, which I find to be an intriguing intersection of engineering/chemistry and culinary arts."
  ],[
    "Cooking",
    "While it might sound cliché, my passion for cooking truly blossomed alongside my grandmother, as I spent countless hours assisting her. ",
    "For me, cooking is a profound act of nurturing, providing both physical sustenance and emotional comfort. ",
    "I love cooking for others almost more than for myself. " ,
    "Latly, speaking of long-term dedication, my sourdough starter has been thriving for over ten years – it's practically a member of the family!"
  ],[
    "Blacksmithing",
    "Inspired by YouTube and fascinated with the fantasy/medieval world, I thought: 'I bet I could forge a sword'. ",
    "What followed was a fun summer spent building a forge, hammering steel, quenching, and grinding. ",
    "The result is a sword I wouldn't stake my life on, but the process was incredibly enjoyable and educational. ",
    "It was definitely a good application of my engineering/physics background."
  ],[
    "Nature",
    "Nature played a central role in my childhood, even before sports came into the picture. ",
    "Weekends revolved around our little family house nestled in the woods, where walking, tending the garden, and the simple joy of cooking and eating outside were cherished moments. ",
    "Even as my family's pace quickened and we grew up, my connection to nature remained strong, leading me to become a Boy Scout instructor and spend years sharing my love for the outdoors with others. "
  ],[
    "Electronics",
    "I opted for computer engineering rather than science because I sought a more diverse education. ",
    "This choice has proven beneficial, since it contributed to a more T-shaped skillset and allowed for better-informed decisions as a professional. ",
    "To support myself through college, I also gained practical experience repairing smartphones and PCs. "
  ]
]
