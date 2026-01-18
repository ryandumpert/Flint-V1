import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  structuredData?: object;
}

export const SEO = ({
  title = 'Mobeus University | Learn to Build Conversational AI',
  description = 'Learn to build conversational AI applications with Catherine. Master the 3-hour hackathon curriculum: voice coding, vibe coding, templates, knowledge, rules, and design.',
  image = '/og-image.png',
  url = '/',
  type = 'website',
  keywords = ['Mobeus', 'Tele', 'Conversational AI', 'Teleglass', 'Voice Coding', 'Vibe Coding', 'AI Development', 'Catherine'],
  structuredData,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Mobeus University', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');

      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }

      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, image, url, type, keywords, structuredData]);

  return null;
};

// Pre-configured SEO for sections - Mobeus University
export const sectionSEO = {
  welcome: {
    title: 'Mobeus University | Learn to Build Conversational AI',
    description: 'Learn to build teles—conversational AI with visual interfaces. Master the 3-hour hackathon curriculum with Catherine.',
    keywords: ['Mobeus', 'Tele', 'Conversational AI', 'hackathon', 'voice coding'],
  },

  concepts: {
    title: 'Key Concepts | Mobeus University',
    description: 'Understand the core concepts: what a tele is, two-agent architecture, navigateToSection, and the slash commands.',
    keywords: ['tele', 'two-agent architecture', 'navigateToSection', 'slash commands'],
  },

  phases: {
    title: 'Hackathon Phases | Mobeus University',
    description: 'The 6-phase hackathon: voice coding, vibe coding, templates, knowledge, rules, and design. 3 hours to build your tele.',
    keywords: ['hackathon', 'phases', 'voice coding', 'vibe coding', 'templates'],
  },

  templates: {
    title: 'Template Library | Mobeus University',
    description: 'Explore the 14 templates available for your tele: CardGrid, HackathonTimeline, ConceptCard, ProcessSteps, and more.',
    keywords: ['templates', 'glass', 'components', 'UI', 'React'],
  },

  ready: {
    title: 'Readiness Check | Mobeus University',
    description: 'Test your hackathon readiness. Speak about what you know and prove you understand the key concepts.',
    keywords: ['readiness', 'assessment', 'hackathon prep', 'knowledge check'],
  },

  home: {
    title: 'Mobeus University | Learn to Build Conversational AI',
    description: 'Welcome to Mobeus University. Let Catherine prepare you for the hackathon where you will build your own tele.',
    keywords: ['Mobeus', 'Catherine', 'hackathon', 'tele', 'conversational AI'],
  },
};

