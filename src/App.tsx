import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeUrl, type SeoData } from './utils/seoParser';
import Dashboard from './components/Dashboard';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SeoData | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeUrl(url);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Header & Search */}
      <div className="sticky top-4 z-50 px-4 flex justify-center w-full pointer-events-none">
        <header className="pointer-events-auto bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 rounded-full px-3 py-2.5 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 transition-all">
          <div className="flex items-center gap-3 pl-2 sm:pl-3 shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md shadow-blue-500/20">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 hidden sm:block">MetaSight</h1>
          </div>

          <form onSubmit={handleAnalyze} className="w-full sm:flex-1 max-w-2xl shrink">
            <div className="relative group flex items-center w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="url"
                required
                placeholder="Paste URL to analyze..."
                className="block w-full pl-10 pr-24 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 hover:bg-slate-100/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-300 shadow-inner"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
              <div className="absolute inset-y-1 right-1 flex items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Analyze'}
                </button>
              </div>
            </div>
          </form>
        </header>
      </div>

      {/* Main Content Areas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 shadow-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">Analysis Error</h3>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          {!data && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100 mb-6 group hover:shadow-md transition-shadow">
                <Search className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Inspect Any Website</h2>
              <p className="text-slate-500 max-w-md mx-auto text-lg">
                Enter a URL above to extract Title, Descriptions, Social Cards, Headings, and Link metrics instantly.
              </p>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Fetching and analyzing URL...</p>
            </motion.div>
          )}

          {data && !loading && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Dashboard data={data} url={url} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
