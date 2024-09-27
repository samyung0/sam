import { type Graph } from "schema-dts";

const indexSchemaMarkup: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sam.partialty.com/#sam",
      name: "Sam Yung",
      url: "https://sam.partialty.com/",
      additionalName: "Yung Chin Pang",
      birthDate: "2002-08-19",
      email: "yungchinpang9@gmail.com",
      sameAs: ["https://www.linkedin.com/in/yung-chin-pang-14ba7b1a4/"],
      familyName: "Yung",
      givenName: "Sam",
      gender: "Male",
      alumniOf: { "@id": "https://sam.partialty.com/#alumni" },
      affiliation: { "@id": "https://sam.partialty.com/#organization" },
      image: { "@id": "https://sam.partialty.com/#logo" },
      hasOccupation: { "@id": "https://sam.partialty.com/#occupation" },
      subjectOf: { "@id": "https://sam.partialty.com/#website" },
      mainEntityOfPage: { "@id": "https://sam.partialty.com/" },
      nationality: "Hong Kong",
    },
    {
      "@type": "Organization",
      "@id": "https://sam.partialty.com/#organization",
      email: "customer@partialty.com",
      founder: { "@id": "https://sam.partialty.com/#sam" },
      foundingDate: "2023-01-12",
      keywords:
        "Partialty, E-learning, Education, Technology, Web Dev, React JS, Next JS, TypeScript, Javascript, HTML, CSS, JS, Software Development, Front-end, Fullstack, VS Code",
      logo: "https://sam.partialty.com/_image?href=%2F_astro%2Fpartialty.DtNZG1tt.svg&f=svg",
      name: "Partialty",
      url: "https://partialty.com/",
    },
    {
      "@type": "AboutPage",
      "@id": "https://sam.partialty.com/#website",
      url: "https://sam.partialty.com/",
      name: "Sam's Website",
      publisher: { "@id": "https://sam.partialty.com/#sam" },
      mainEntity: { "@id": "https://sam.partialty.com/#sam" },
      description: "Sam Yung's personal website",
    },
  ],
};

export { indexSchemaMarkup };
