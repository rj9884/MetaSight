import React from 'react';
import type { SeoData } from '../utils/seoParser';
import { Globe, Twitter, LayoutTemplate } from 'lucide-react';

interface TagVisualizerProps {
    data: SeoData;
    url: string;
}

const TagVisualizer: React.FC<TagVisualizerProps> = ({ data, url }) => {
    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    };

    const domain = getDomain(url);
    const title = data.title || 'No Title Found';
    const description = data.description || 'No meta description provided. Search engines will show a snippet from the page content.';

    // OG data
    const ogTitle = data.ogTags['title'] || title;
    const ogImage = data.ogTags['image'] || '';

    // Twitter
    const twTitle = data.twitterTags['title'] || ogTitle;
    const twDesc = data.twitterTags['description'] || description;
    const twImage = data.twitterTags['image'] || ogImage;

    return (
        <div className="space-y-8">
            {/* Google Preview */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                    <Globe className="w-4 h-4 text-blue-500" /> Google Search Preview
                </h3>
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm max-w-2xl">
                    <div className="flex items-center gap-3 mb-1.5">
                        <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                            <Globe className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                            <div className="text-sm text-[#202124] leading-tight">{domain}</div>
                            <div className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">
                                {url} <span className="inline-block border-4 border-transparent border-t-[#70757a] mt-1 ml-1" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-[20px] text-[#1a0dab] cursor-pointer hover:underline mb-1 font-medium leading-[1.3] truncate">
                        {title}
                    </h2>
                    <p className="text-[#4d5156] text-sm leading-[1.58] line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Facebook / Open Graph Preview */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                        <LayoutTemplate className="w-4 h-4 text-blue-600" /> Facebook/LinkedIn
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[500px]">
                        {ogImage ? (
                            <img src={ogImage} alt="Open Graph" className="w-full h-[260px] object-cover bg-slate-100" />
                        ) : (
                            <div className="w-full h-[260px] bg-slate-100 flex items-center justify-center text-slate-400">
                                No og:image specified
                            </div>
                        )}
                        <div className="p-4 bg-slate-50 border-t border-slate-200">
                            <div className="text-[12px] text-slate-500 uppercase tracking-wider mb-1">{domain.toUpperCase()}</div>
                            <div className="text-base font-bold text-slate-900 leading-tight mb-1 line-clamp-1">{ogTitle}</div>
                            <div className="text-sm text-slate-500 line-clamp-1">{data.ogTags['description'] || description}</div>
                        </div>
                    </div>
                </div>

                {/* Twitter Preview */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide">
                        <Twitter className="w-4 h-4 text-sky-500" /> Twitter Card
                    </h3>
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm max-w-[500px]">
                        {twImage ? (
                            <img src={twImage} alt="Twitter Card" className="w-full h-[260px] object-cover bg-slate-100 border-b border-slate-200" />
                        ) : (
                            <div className="w-full h-[260px] bg-slate-100 flex items-center justify-center text-slate-400 border-b border-slate-200">
                                No twitter:image specified
                            </div>
                        )}
                        <div className="p-4 bg-white">
                            <div className="text-base font-medium text-slate-900 leading-tight mb-1 line-clamp-1">{twTitle}</div>
                            <div className="text-sm text-slate-600 line-clamp-2 mb-1">{twDesc}</div>
                            <div className="text-[13px] text-slate-500 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> {domain}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Raw Missing/Present Tags */}
            <div className="mt-8 pt-8 border-t border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-4">Raw Tag Extraction Status</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className={`p-3 rounded-xl border text-sm font-medium ${data.title ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                        Title Tag: {data.title ? 'Found' : 'Missing'}
                    </div>
                    <div className={`p-3 rounded-xl border text-sm font-medium ${data.description ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                        Meta Desc: {data.description ? 'Found' : 'Missing'}
                    </div>
                    <div className={`p-3 rounded-xl border text-sm font-medium ${data.ogTags['title'] ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                        og:title: {data.ogTags['title'] ? 'Found' : 'Missing'}
                    </div>
                    <div className={`p-3 rounded-xl border text-sm font-medium ${data.twitterTags['title'] ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                        twitter:title: {data.twitterTags['title'] ? 'Found' : 'Missing'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagVisualizer;
