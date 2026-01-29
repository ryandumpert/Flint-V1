/**
 * Article - GENERIC
 * Long-form content with title, paragraphs, and images
 * NO ENGLISH DEFAULTS — All content from JSON
 */

import React from 'react';
import { ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react';
import { notifyTele } from '@/utils/acknowledgmentHelpers';
import { useSound } from '@/hooks/useSound';
import { SmartImage } from '@/components/ui/SmartImage';

interface ArticleMeta {
    author?: string;
    date?: string;
    readTime?: string;
    category?: string;
}

interface ContentBlock {
    type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list';
    content?: string;
    items?: string[];
    imageUrl?: string;
    imagePrompt?: string;
    caption?: string;
}

interface ArticleProps {
    heroImageUrl?: string;
    heroImagePrompt?: string;
    title?: string;
    subtitle?: string;
    meta?: ArticleMeta;
    blocks?: ContentBlock[];
    tags?: string[];
    ctaLabel?: string;
    ctaActionPhrase?: string;
}

export const Article: React.FC<ArticleProps> = ({
    heroImageUrl,
    heroImagePrompt,
    title,
    subtitle,
    meta,
    blocks,
    tags,
    ctaLabel,
    ctaActionPhrase,
}) => {
    const { playClick } = useSound();
    const handleAction = (phrase: string) => { playClick(); notifyTele(phrase); };

    const renderBlock = (block: ContentBlock, index: number) => {
        switch (block.type) {
            case 'heading':
                return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{block.content}</h2>;
            case 'paragraph':
                return <p key={index} className="text-mist/70 leading-relaxed mb-6">{block.content}</p>;
            case 'image':
                return (
                    <figure key={index} className="my-8">
                        <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                            <SmartImage
                                assetId={block.imageUrl || block.imagePrompt || `article-${index}`}
                                alt={block.caption || 'Article image'}
                                className="w-full h-auto"
                            />
                        </div>
                        {block.caption && (
                            <figcaption className="text-center text-sm text-mist/50 mt-3 italic">{block.caption}</figcaption>
                        )}
                    </figure>
                );
            case 'quote':
                return (
                    <blockquote key={index} className="my-8 pl-6 border-l-4 border-sapphire/50">
                        <p className="text-xl text-white italic">{block.content}</p>
                    </blockquote>
                );
            case 'list':
                return (
                    <ul key={index} className="my-6 space-y-2">
                        {block.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-sapphire mt-2 flex-shrink-0" />
                                <span className="text-mist/70">{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className="glass-template-container h-full">
            <article className="max-w-3xl mx-auto">
                {/* Hero Image */}
                {(heroImageUrl || heroImagePrompt) && (
                    <div className="rounded-2xl overflow-hidden border border-white/[0.06] mb-8">
                        <SmartImage
                            assetId={heroImageUrl || heroImagePrompt || 'hero'}
                            alt={title || 'Article'}
                            className="w-full aspect-[21/9] object-cover"
                        />
                    </div>
                )}

                {/* Header */}
                <header className="mb-8">
                    {subtitle && <div className="text-sm text-sapphire font-semibold uppercase tracking-wider mb-3">{subtitle}</div>}
                    {title && <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">{title}</h1>}

                    {meta && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-mist/50">
                            {meta.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{meta.author}</span>
                                </div>
                            )}
                            {meta.date && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{meta.date}</span>
                                </div>
                            )}
                            {meta.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{meta.readTime}</span>
                                </div>
                            )}
                            {meta.category && (
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <span>{meta.category}</span>
                                </div>
                            )}
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    {blocks?.map((block, i) => renderBlock(block, i))}
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/[0.06]">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-mist/60 border border-white/[0.06]"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                {ctaLabel && ctaActionPhrase && (
                    <div className="mt-8 flex justify-center">
                        <button
                            className="inline-flex items-center gap-3 px-8 py-4 bg-flamingo text-white font-semibold rounded-full 
                                hover:bg-flamingo/90 hover:scale-[1.02] active:scale-[0.98]
                                transition-all duration-200 text-lg shadow-lg shadow-flamingo/20"
                            onClick={() => handleAction(ctaActionPhrase)}
                        >
                            {ctaLabel}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </article>
        </div>
    );
};

export default Article;
