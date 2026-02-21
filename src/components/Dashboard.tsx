import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SeoData } from '../utils/seoParser';
import {
    FileText,
    Image as ImageIcon,
    Link as LinkIcon,
    Type,
    Share2,
    CheckCircle2,
    XCircle,
    AlertTriangle
} from 'lucide-react';
import TagVisualizer from './TagVisualizer';

interface DashboardProps {
    data: SeoData;
    url: string;
}

const Dashboard: React.FC<DashboardProps> = ({ data, url }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'headings' | 'links' | 'images'>('overview');

    const tabs = [
        { id: 'overview', label: 'Overview & Social', icon: <Share2 className="w-4 h-4" /> },
        { id: 'headings', label: 'Headings', icon: <Type className="w-4 h-4" /> },
        { id: 'links', label: 'Links', icon: <LinkIcon className="w-4 h-4" /> },
        { id: 'images', label: 'Images', icon: <ImageIcon className="w-4 h-4" /> },
    ] as const;

    const titleLength = data.title?.length || 0;
    const descLength = data.description?.length || 0;

    const titleOk = titleLength > 30 && titleLength < 60;
    const descOk = descLength > 120 && descLength < 160;

    const MetricCard = ({ title, value, subtext, icon, status }: any) => (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-50 rounded-xl text-blue-600">
                    {icon}
                </div>
                {status === 'good' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                {status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {status === 'bad' && <XCircle className="w-5 h-5 text-red-500" />}
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
            <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
            <p className="text-xs text-slate-500">{subtext}</p>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Title Length"
                    value={`${titleLength} chars`}
                    subtext={titleOk ? 'Optimal (30-60 chars)' : 'Too short or long'}
                    icon={<Type className="w-6 h-6" />}
                    status={titleLength === 0 ? 'bad' : titleOk ? 'good' : 'warning'}
                />
                <MetricCard
                    title="Description Length"
                    value={`${descLength} chars`}
                    subtext={descOk ? 'Optimal (120-160 chars)' : 'Needs improvement'}
                    icon={<FileText className="w-6 h-6" />}
                    status={descLength === 0 ? 'bad' : descOk ? 'good' : 'warning'}
                />
                <MetricCard
                    title="Total Words"
                    value={data.wordCount.toLocaleString()}
                    subtext="Estimated visible text"
                    icon={<FileText className="w-6 h-6" />}
                    status="good"
                />
                <MetricCard
                    title="Total Links"
                    value={data.links.length}
                    subtext={`${data.links.filter(l => l.isExternal).length} External`}
                    icon={<LinkIcon className="w-6 h-6" />}
                    status="good"
                />
            </div>

            {/* Main Working Area */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/50">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 bg-white'
                                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && <TagVisualizer data={data} url={url} />}

                        {activeTab === 'headings' && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900 mb-6">Heading Hierarchy ({data.headings.length} found)</h3>
                                {data.headings.length === 0 ? (
                                    <p className="text-slate-500 italic">No headings found on this page.</p>
                                ) : (
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                        <div className="space-y-3">
                                            {data.headings.map((h, i) => (
                                                <div key={i} className={`flex items-start gap-4 ${h.level === 'h1' ? 'ml-0' :
                                                    h.level === 'h2' ? 'ml-6' :
                                                        h.level === 'h3' ? 'ml-12' : 'ml-16'
                                                    }`}>
                                                    <span className="shrink-0 inline-flex items-center justify-center bg-blue-100 text-blue-700 text-xs font-bold w-8 h-8 rounded-lg uppercase">
                                                        {h.level}
                                                    </span>
                                                    <p className={`text-slate-800 pt-1 ${h.level === 'h1' ? 'font-bold text-lg' : 'font-medium'}`}>
                                                        {h.text}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'links' && (
                            <div className="space-y-6">
                                <div className="flex gap-4 mb-6">
                                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                                        Total: {data.links.length}
                                    </div>
                                    <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold">
                                        Internal: {data.links.filter(l => !l.isExternal).length}
                                    </div>
                                    <div className="bg-purple-50 text-purple-800 px-4 py-2 rounded-lg text-sm font-semibold">
                                        External: {data.links.filter(l => l.isExternal).length}
                                    </div>
                                </div>

                                <div className="max-h-[600px] overflow-y-auto pr-4 space-y-3">
                                    {data.links.map((v, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-200 break-all gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-slate-800 mb-1 truncate">{v.text || 'No Text'}</p>
                                                <a href={v.href} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1">
                                                    {v.href}
                                                    <Share2 className="w-3 h-3" />
                                                </a>
                                            </div>
                                            <div className="shrink-0 flex gap-2">
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${v.isExternal ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {v.isExternal ? 'External' : 'Internal'}
                                                </span>
                                                {v.nofollow && (
                                                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-100 text-amber-700">
                                                        nofollow
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'images' && (
                            <div className="space-y-6">
                                <div className="flex gap-4 mb-6">
                                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold">
                                        Total Images: {data.images.length}
                                    </div>
                                    <div className="bg-red-50 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold">
                                        Missing Alt: {data.images.filter(img => !img.alt).length}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {data.images.map((img, i) => (
                                        <div key={i} className="bg-white border text-center border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-4">
                                            <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                                                <img src={img.src} alt={img.alt || 'No alt'} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-xs text-slate-500 truncate mb-2" title={img.src}>{img.src.split('/').pop() || img.src}</p>
                                                {img.alt ? (
                                                    <p className="text-sm font-medium text-slate-800 break-words line-clamp-2">"{img.alt}"</p>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                                                        <AlertTriangle className="w-3 h-3" /> Missing Alt Text
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
