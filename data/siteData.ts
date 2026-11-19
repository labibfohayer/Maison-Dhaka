export interface Property {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  videoSrc?: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}

export const siteData = {
  meta: {
    title: "Maison Dhaka — Luxury Real Estate | Mohakhali, Dhaka",
    description: "Exclusive luxury villas and modern residences in Dhaka. Your architectural dream, delivered turnkey.",
    keywords: "luxury real estate, maison dhaka, mohakhali villas, dhaka property, luxury apartments",
  },
  navigation: {
    logo: "Maison Dhaka",
    navItems: [
      { name: "Properties", href: "#properties" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ] as NavItem[],
    ctaButton: {
      text: "Book a Tour",
      href: "#contact",
    },
  },
  hero: {
    tag: "Maison Dhaka Premium Real Estate",
    title: "Live Where the Sun Meets the Sea",
    description: "Exclusive beachfront villas and luxury apartments on the Costa del Sol. Your Mediterranean dream, delivered turnkey.",
    videoSrc: "/assets/hero.mp4",
    primaryButton: {
      text: "View Properties",
      href: "#properties",
    },
    secondaryButton: {
      text: "Book a Tour",
      href: "#contact",
    },
  },
  about: {
    tag: "",
    title: "For those who travel like it's an art form.",
    description: "",
    imageSrc: "/assets/statement-1600.webp",
  },
  properties: {
    tag: "Properties",
    title: "Our Villas",
    description: "Handpicked residences in Marbella's most coveted locations, each designed for effortless Mediterranean living.",
    items: [
      {
        id: "villa-serena",
        title: "Villa Serena",
        description: "A sunlit 5-bedroom retreat with infinity pool, panoramic sea views, and private garden terraces.",
        imageSrc: "/assets/villa-serena-1600.webp",
      },
      {
        id: "casa-del-sol",
        title: "Casa del Sol",
        description: "Contemporary beachfront living with floor-to-ceiling glass, rooftop lounge, and direct beach access.",
        imageSrc: "/assets/casa-del-sol-1600.webp",
      },
      {
        id: "villa-andalucia",
        title: "Villa Andalucía",
        description: "Traditional charm meets modern luxury — courtyard, olive grove, and a heated outdoor pool.",
        imageSrc: "/assets/villa-andalucia-1600.webp",
      },
      {
        id: "the-meridian",
        title: "The Meridian",
        description: "Sleek 4-bedroom penthouse villa with smart home technology and sweeping coastal views.",
        imageSrc: "/assets/the-meridian-1600.webp",
      },
      {
        id: "villa-blanca",
        title: "Villa Blanca",
        description: "Minimalist white-washed estate with private cinema, spa suite, and landscaped Mediterranean gardens.",
        imageSrc: "/assets/villa-blanca-1600.webp",
      },
      {
        id: "casa-dorada",
        title: "Casa Dorada",
        description: "Golden-hour perfection — west-facing terraces, wine cellar, and an open-plan chef's kitchen.",
        imageSrc: "/assets/casa-dorada-1600.webp",
      },
    ] as Property[],
  },
  contact: {
    title: "Get In Touch",
    imageSrc: "/assets/cta-bg-1600.webp",
    inputs: [
      { name: "name", type: "text", placeholder: "Your name", required: true },
      { name: "email", type: "email", placeholder: "Your email", required: true },
    ],
    textarea: {
      name: "message",
      placeholder: "Tell us about your dream property...",
      rows: 4,
      required: true,
    },
    buttonText: "Send Message",
    footerText: "Prefer to talk? Book a private tour.",
    footerLink: {
      text: "Email Us",
      href: "mailto:hello@maisondhaka.com",
      imageSrc: "/assets/avatar-1600.webp",
    },
  },
  footer: {
    columns: [
      {
        title: "Properties",
        items: [
          { label: "Villas", href: "#properties" },
          { label: "Apartments", href: "#" },
          { label: "Penthouses", href: "#" },
          { label: "New Developments", href: "#" },
        ],
      },
      {
        title: "Services",
        items: [
          { label: "Property Search", href: "#" },
          { label: "Legal Assistance", href: "#" },
          { label: "Interior Design", href: "#" },
          { label: "Property Management", href: "#" },
        ],
      },
      {
        title: "Locations",
        items: [
          { label: "Mohakhali DOHS", href: "#" },
          { label: "Gulshan 2", href: "#" },
          { label: "Banani", href: "#" },
          { label: "Baridhara", href: "#" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "About Us", href: "#" },
          { label: "Contact", href: "#contact" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
    ] as FooterColumn[],
    leftText: "© 2026 Maison Dhaka. All rights reserved.",
    rightText: "Plot 18, Road 4, Mohakhali DOHS, Dhaka",
  },
};
