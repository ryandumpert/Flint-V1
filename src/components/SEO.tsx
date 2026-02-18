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
  title = 'Flint | AI Contract Risk Review',
  description = 'AI-powered contract review. Upload contracts, identify red flags, get actionable suggestions, and chat with your AI contract advisor.',
  image = '/og-image.png',
  url = '/',
  type = 'website',
  keywords = ['Flint', 'Contract Review', 'Risk Analysis', 'Red Flags', 'Legal Review', 'Contract AI', 'Due Diligence'],
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
    updateMetaTag('og:site_name', 'Flint', true);

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

// Pre-configured SEO for sections - Flint Contract Risk Review
export const sectionSEO = {
  welcome: {
    title: 'Flint | AI Contract Risk Review',
    description: 'AI-powered contract review. Upload contracts, identify red flags, get actionable suggestions.',
    keywords: ['Flint', 'Contract Review', 'Risk Analysis', 'Red Flags', 'Legal Review', 'Due Diligence'],
  },

  upload: {
    title: 'Upload Contract | Flint',
    description: 'Upload your contract for AI-powered risk analysis. Supports PDF, DOCX, and plain text.',
    keywords: ['Contract Upload', 'Document Review', 'Risk Analysis', 'Flint'],
  },

  analysis: {
    title: 'Contract Analysis | Flint',
    description: 'AI-identified red flags, risky clauses, and suggested edits for your contract.',
    keywords: ['Contract Analysis', 'Red Flags', 'Risk Review', 'Clause Analysis'],
  },

  review: {
    title: 'Contract Review | Flint',
    description: 'Review contract issues, suggested edits, and navigate highlighted clauses.',
    keywords: ['Contract Review', 'Issue Navigation', 'Suggested Edits', 'Flint'],
  },

  home: {
    title: 'Flint | AI Contract Risk Review',
    description: 'AI-powered contract risk review platform. Fast identification of contractual risk and ambiguity.',
    keywords: ['Flint', 'Contract Review', 'Risk Analysis', 'AI Legal Review'],
  },
};
