import {
  aboutMe,
  education,
  getExperienceYears,
  getSkills,
  hobbies,
  identity,
  jobsAndProjs,
  siteUrl,
  summary
} from '../src/common/profile.ts';

const cvAbsoluteUrl = `${siteUrl}${identity.cvUrl}`;
const experience = jobsAndProjs.filter((item) => item.isWork);
const projects = jobsAndProjs.filter((item) => !item.isWork);
const skills = getSkills();
const years = getExperienceYears();

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function paragraph(text: string): string {
  return text.trim();
}

export function buildResumeJson() {
  return {
    name: identity.name,
    title: identity.title,
    email: identity.email,
    location: identity.location,
    url: siteUrl,
    sameAs: identity.sameAs,
    summary,
    yearsOfExperience: years,
    experience: experience.map((item) => ({
      company: item.title,
      description: paragraph(`${item.desc} ${item.subdesc}`),
      url: item.href,
      skills: item.tags.map((tag) => tag.name)
    })),
    projects: projects.map((item) => ({
      name: item.title,
      description: paragraph(`${item.desc} ${item.subdesc}`),
      url: item.href,
      skills: item.tags.map((tag) => tag.name)
    })),
    education: education.map((item) => ({
      degree: item.degree,
      institution: item.institution,
      endYear: item.endYear,
      finalMark: item.finalMark,
      thesis: item.thesis
    })),
    skills,
    hobbies: hobbies.map(([title, ...paragraphs]) => ({
      title,
      description: paragraphs.join('').trim()
    })),
    cv: cvAbsoluteUrl
  };
}

const profileLabels: { match: string; label: string; description: string }[] = [
  {
    match: 'github.com',
    label: 'GitHub',
    description: 'Source code and open-source projects.'
  },
  {
    match: 'leetcode.com',
    label: 'LeetCode',
    description: 'Algorithm practice profile.'
  }
];

type LlmLink = { label: string; url: string; description: string };

function buildProfileLinks(): LlmLink[] {
  return identity.sameAs
    .filter((url) => url !== siteUrl)
    .map((url) => {
      const known = profileLabels.find((entry) => url.includes(entry.match));
      return {
        label: known?.label ?? new URL(url).hostname,
        url,
        description: known?.description ?? ''
      };
    });
}

export function buildLlmsTxt(): string {
  const profileLinks = buildProfileLinks();
  const lines = [
    `# ${identity.name}`,
    '',
    `> ${summary}`,
    '',
    `This is the personal portfolio of ${identity.name} (${siteUrl}). Use the structured resume for a machine-readable summary of experience, projects, and skills.`,
    '',
    '## Core',
    '',
    `- [Resume (JSON Resume schema)](${siteUrl}/resume.json): Full machine-readable CV — experience, projects, education, skills.`,
    `- [CV (PDF)](${cvAbsoluteUrl}): Printable curriculum vitae.`,
    `- [AI resource catalog](${siteUrl}/ai-catalog.json): ARD manifest of discoverable resources on this site.`,
    '',
    '## Profiles',
    '',
    ...profileLinks.map(
      (link) =>
        `- [${link.label}](${link.url})${link.description ? `: ${link.description}` : ''}`
    ),
    '',
    '## Meta',
    '',
    `- [Sitemap](${siteUrl}/sitemap.xml): All indexable URLs.`,
    `- [Robots](${siteUrl}/robots.txt): Crawl policy.`
  ];
  return `${lines.join('\n')}\n`;
}

export function buildAiCatalogJson() {
  const host = new URL(siteUrl).hostname;
  const publisher = { identifier: host, displayName: identity.name };
  return {
    specVersion: '0.9',
    host: {
      displayName: identity.name,
      identifier: host,
      documentationUrl: `${siteUrl}/llms.txt`,
      logoUrl: `${siteUrl}/icon-512.png`
    },
    entries: [
      {
        identifier: `urn:air:${host}:resume:json`,
        type: 'application/json',
        url: `${siteUrl}/resume.json`,
        displayName: `${identity.name} — Resume`,
        description:
          'Machine-readable CV (JSON Resume schema): experience, projects, education, and skills.',
        tags: ['resume', 'cv', 'profile'],
        publisher
      },
      {
        identifier: `urn:air:${host}:cv:pdf`,
        type: 'application/pdf',
        url: cvAbsoluteUrl,
        displayName: `${identity.name} — CV (PDF)`,
        description: 'Printable curriculum vitae.',
        tags: ['cv', 'pdf'],
        publisher
      },
      {
        identifier: `urn:air:${host}:llms:txt`,
        type: 'text/markdown',
        url: `${siteUrl}/llms.txt`,
        displayName: 'LLM guide',
        description:
          "llms.txt overview of the site's resources for large language models.",
        tags: ['llms', 'guide'],
        publisher
      }
    ]
  };
}

export function buildAiContentHtml(): string {
  const aboutParagraphs = aboutMe
    .filter(Boolean)
    .map((line) => `      <p>${escapeHtml(line)}</p>`)
    .join('\n');

  const experienceHtml = experience
    .map(
      (item) => `    <article>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(paragraph(item.desc))}</p>
      <p>${escapeHtml(paragraph(item.subdesc))}</p>
      <p><a href="${escapeHtml(item.href)}">${escapeHtml(item.href)}</a></p>
    </article>`
    )
    .join('\n');

  const projectsHtml = projects
    .map(
      (item) => `    <article>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(paragraph(item.desc))}</p>
      <p>${escapeHtml(paragraph(item.subdesc))}</p>
      <p><a href="${escapeHtml(item.href)}">${escapeHtml(item.href)}</a></p>
    </article>`
    )
    .join('\n');

  const educationHtml = education
    .map(
      (item) => `    <article>
      <h3>${escapeHtml(item.degree)}</h3>
      <p>${escapeHtml(item.institution)} (${item.endYear})</p>
      <p>${escapeHtml(item.finalMark)}</p>
      <p>${escapeHtml(item.thesis)}</p>
    </article>`
    )
    .join('\n');

  const hobbiesHtml = hobbies
    .map(
      ([title, ...paragraphs]) => `    <article>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(paragraphs.join(''))}</p>
    </article>`
    )
    .join('\n');

  return `<main id="ai-content" hidden aria-label="Samuele Battaglino portfolio summary">
  <h1>${escapeHtml(identity.name)}</h1>
  <p>${escapeHtml(identity.title)} — ${escapeHtml(identity.location)}</p>
  <p>${escapeHtml(summary)}</p>

  <section id="ai-about">
    <h2>About</h2>
    <p>${escapeHtml(identity.name)} is a ${escapeHtml(identity.title)} with ${years} years of experience.</p>
${aboutParagraphs}
  </section>

  <section id="ai-experience">
    <h2>Experience</h2>
${experienceHtml}
  </section>

  <section id="ai-projects">
    <h2>Projects</h2>
${projectsHtml}
  </section>

  <section id="ai-education">
    <h2>Education</h2>
${educationHtml}
  </section>

  <section id="ai-skills">
    <h2>Skills</h2>
    <ul>
${skills.map((skill) => `      <li>${escapeHtml(skill)}</li>`).join('\n')}
    </ul>
  </section>

  <section id="ai-hobbies">
    <h2>Hobbies</h2>
${hobbiesHtml}
  </section>

  <section id="ai-contact">
    <h2>Contact</h2>
    <p>Email: <a href="mailto:${escapeHtml(identity.email)}">${escapeHtml(identity.email)}</a></p>
    <p>CV: <a href="${escapeHtml(cvAbsoluteUrl)}">${escapeHtml(cvAbsoluteUrl)}</a></p>
    <p>GitHub: <a href="https://github.com/Sebat95">https://github.com/Sebat95</a></p>
    <p>LeetCode: <a href="https://leetcode.com/u/Sebat/">https://leetcode.com/u/Sebat/</a></p>
  </section>
</main>`;
}

export function buildJsonLd() {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const profilePageId = `${siteUrl}/#profilepage`;

  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: 'Sbatta',
      inLanguage: 'en',
      publisher: { '@id': personId }
    },
    {
      '@type': 'ProfilePage',
      '@id': profilePageId,
      url: `${siteUrl}/`,
      name: `${identity.name} — Portfolio`,
      inLanguage: 'en',
      isPartOf: { '@id': websiteId },
      about: { '@id': personId },
      mainEntity: { '@id': personId }
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: identity.name,
      url: `${siteUrl}/`,
      image: `${siteUrl}/og-1200x630.png`,
      jobTitle: identity.title,
      email: identity.email,
      address: {
        '@type': 'PostalAddress',
        addressCountry: identity.location
      },
      knowsAbout: skills,
      sameAs: identity.sameAs,
      alumniOf: education.map((item) => ({
        '@type': 'EducationalOrganization',
        name: item.institution
      })),
      worksFor: experience.map((item) => ({
        '@type': 'Organization',
        name: item.title,
        url: item.href
      }))
    },
    ...projects.map((item) => ({
      '@type': 'SoftwareSourceCode',
      name: item.title,
      description: paragraph(`${item.desc} ${item.subdesc}`),
      url: item.href,
      author: { '@id': personId },
      programmingLanguage: item.tags.map((tag) => tag.name)
    }))
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

function replaceBetween(
  source: string,
  startMarker: string,
  endMarker: string,
  replacement: string
): string {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);

  if (start === -1 || end === -1 || end < start) {
    throw new Error(`Missing markers: ${startMarker} / ${endMarker}`);
  }

  return (
    source.slice(0, start + startMarker.length) +
    '\n' +
    replacement +
    '\n    ' +
    source.slice(end)
  );
}

export function transformIndexHtml(html: string): string {
  const aiContentHtml = buildAiContentHtml();
  const jsonLd = buildJsonLd();

  let result = replaceBetween(
    html,
    '<!-- AI_META_START -->',
    '<!-- AI_META_END -->',
    [
      `    <meta name="description" content="${escapeHtml(summary)}" />`,
      `    <meta property="og:description" content="${escapeHtml(summary)}" />`,
      `    <meta name="twitter:description" content="${escapeHtml(summary)}" />`,
      `    <link rel="alternate" type="application/json" href="/resume.json" title="Resume (JSON)" />`
    ].join('\n')
  );

  result = replaceBetween(
    result,
    '<!-- AI_JSONLD_START -->',
    '<!-- AI_JSONLD_END -->',
    `    <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
  );

  result = replaceBetween(
    result,
    '<!-- AI_CONTENT_START -->',
    '<!-- AI_CONTENT_END -->',
    `    ${aiContentHtml.split('\n').join('\n    ')}`
  );

  return result;
}
