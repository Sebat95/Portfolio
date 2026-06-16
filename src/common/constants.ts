export { aboutMe, hobbies, jobsAndProjs } from './profile';

export const navLinks = [
  {
    id: '1',
    name: 'Home',
    altName: 'Home',
    exp: false,
    href: '#home',
    altHref: '#home'
  },
  {
    id: '2',
    name: 'Start Journey',
    altName: 'Exit Journey',
    exp: true,
    href: '#exp',
    altHref: '#home'
  },
  {
    id: '3',
    name: 'About',
    altName: 'About',
    exp: false,
    href: '#about',
    altHref: '#about'
  }
];

export const experiences = ['Education', 'Work and Projects', 'Hobbies'];

const pagesLength = 6;
export const pages = [
  {
    front: 'book-cover',
    back: 'pages-images-0',
    title: 'Cover'
  }
];
for (let i = 1, j = 1; i < pagesLength - 1; i += 2, j += 1) {
  pages.push({
    front: `pages-images-${i}`,
    back: `pages-images-${i + 1}`,
    title: `Page ${j}`
  });
}
pages.push({
  front: `pages-images-${pagesLength - 1}`,
  back: 'book-back',
  title: `Page ${pages.length}`
});
