'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Save,
  Image as ImageIcon,
  List,
  ListOrdered,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  Eye,
  Edit3,
  Plus,
  Trash2,
  Terminal,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function AddNewProjectPage() {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [features, setFeatures] = useState<string[]>(['']);
  const [techStack, setTechStack] = useState<string[]>(['']);
  const [content, setContent] = useState('');

  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [num, setNum] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileDocInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate upload by generating a local object URL
    const fileUrl = URL.createObjectURL(file);
    const altText = file.name || 'uploaded image';

    insertText(`\n![${altText}](${fileUrl})\n`);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const fileName = file.name;

    // Create a Brutalist styled block for the file
    const htmlBlock = `
<a href="${fileUrl}" target="_blank" class="flex items-center gap-4 p-4 border-2 border-brand-ink bg-brand-card hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--shadow)] transition-all not-prose my-6 w-full max-w-md no-underline group cursor-pointer">
  <div class="p-3 bg-brand-red text-white flex-shrink-0 group-hover:bg-brand-ink transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  </div>
  <div class="flex flex-col min-w-0 flex-1">
    <span class="text-[10px] font-mono font-bold text-brand-ink-soft uppercase tracking-widest mb-1">Attached Document</span>
    <span class="truncate font-display font-bold text-brand-ink text-sm block w-full">${fileName}</span>
  </div>
</a>
`;

    insertText(htmlBlock);

    if (fileDocInputRef.current) {
      fileDocInputRef.current.value = '';
    }
  };

  // To handle theme from local storage similar to other pages
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleAddFeature = () => setFeatures([...features, '']);
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };
  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddTech = () => setTechStack([...techStack, '']);
  const handleTechChange = (index: number, value: string) => {
    const newTech = [...techStack];
    newTech[index] = value;
    setTechStack(newTech);
  };
  const handleRemoveTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    setError('');

    // Check required fields
    if (!title.trim() || !slug.trim() || !num.trim() || !description.trim() || !content.trim() || !githubUrl.trim() || !liveUrl.trim() || !icon.trim()) {
      setError('Please fill in all required fields (General Info, Links & Metadata, and Write Content).');
      return;
    }

    // Features & Tech Stack are not required, just filter out empty strings
    const cleanFeatures = features.filter(f => f.trim() !== '');
    const cleanTechStack = techStack.filter(t => t.trim() !== '');

    setIsPublishing(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: slug,
          num,
          title,
          description,
          long_desc: content,
          icon,
          features: cleanFeatures,
          tech: cleanTechStack,
          github: githubUrl
          // live_url is not saved yet as it's not in the DB schema
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to publish project');
      }

      // Success, redirect to main page
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred while publishing.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans pb-24 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1c] px-6 lg:px-12 h-16 flex items-center justify-between border-b-4 border-[#1c1c1c]">
        <Link href="/" className="flex items-center gap-3 text-white font-display font-bold tracking-wider hover:text-brand-red transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          BACK_TO_DASHBOARD
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-brand-red text-white px-6 py-2 text-xs font-mono font-bold hover:bg-white hover:text-[#1c1c1c] transition-all shadow-[4px_4px_0_0_#000] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isPublishing ? 'PUBLISHING...' : 'PUBLISH_PROJECT'}
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="pt-32 pb-12 px-6 lg:px-12 bg-brand-card border-b-4 border-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="max-w-6xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono font-bold text-brand-ink-soft tracking-[0.3em] mb-4 uppercase"
          >
            ADMIN_WORKSPACE // NEW_ENTRY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black leading-tight mb-6"
          >
            CREATE PROJECT
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-brand-red"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-[1fr_320px] gap-12">
        <div className="space-y-8">

          {error && (
            <div className="bg-brand-red/10 border-2 border-brand-red p-4 text-brand-red text-sm font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              ERROR: {error}
            </div>
          )}

          {/* Basic Info */}
          <section className="bg-brand-card border-2 border-brand-ink p-8 shadow-[8px_8px_0_0_var(--shadow)] space-y-6">
            <h2 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] border-b-2 border-brand-ink pb-4 uppercase flex items-center gap-3">
              <Terminal className="w-4 h-4 text-brand-red" />
              General Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-brand-ink mb-2 uppercase">Project Title <span className="text-brand-red">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. MOVIE TICKET BOOKING SYSTEM"
                  className="w-full bg-brand-bg border-2 border-brand-ink p-4 font-display font-bold text-xl outline-none focus:border-brand-red transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-2 uppercase">Project Slug (ID) <span className="text-brand-red">*</span></label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. movie-ticket-booking"
                    className="w-full bg-brand-bg border-2 border-brand-ink p-3 text-sm font-mono outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-ink mb-2 uppercase">Project Number <span className="text-brand-red">*</span></label>
                  <input
                    type="text"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                    placeholder="e.g. PROJECT_01"
                    className="w-full bg-brand-bg border-2 border-brand-ink p-3 text-sm font-mono outline-none focus:border-brand-red transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-brand-ink mb-2 uppercase">Short Description <span className="text-brand-red">*</span></label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary for the project card..."
                  className="w-full bg-brand-bg border-2 border-brand-ink p-4 text-sm font-medium outline-none focus:border-brand-red transition-colors resize-none"
                />
              </div>
            </div>
          </section>

          {/* Medium-style Editor */}
          <section className="bg-brand-card border-2 border-brand-ink shadow-[8px_8px_0_0_var(--shadow)] flex flex-col h-[600px]">
            <div className="flex items-center justify-between border-b-2 border-brand-ink px-4 bg-brand-bg">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('write')}
                  className={`px-4 py-4 text-xs font-mono font-bold uppercase flex items-center gap-2 border-b-2 -mb-[2px] ${activeTab === 'write' ? 'border-brand-red text-brand-red' : 'border-transparent text-brand-ink-mid hover:text-brand-ink'}`}
                >
                  <Edit3 className="w-4 h-4" /> Write
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-4 text-xs font-mono font-bold uppercase flex items-center gap-2 border-b-2 -mb-[2px] ${activeTab === 'preview' ? 'border-brand-red text-brand-red' : 'border-transparent text-brand-ink-mid hover:text-brand-ink'}`}
                >
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>

              {activeTab === 'write' && (
                <div className="flex items-center gap-1">
                  <ToolbarButton onClick={() => insertText('**', '**')} icon={<Bold className="w-4 h-4" />} title="Bold" />
                  <ToolbarButton onClick={() => insertText('*', '*')} icon={<Italic className="w-4 h-4" />} title="Italic" />
                  <div className="w-px h-4 bg-brand-ink mx-1" />
                  <ToolbarButton onClick={() => insertText('\n- ')} icon={<List className="w-4 h-4" />} title="Bullet List" />
                  <ToolbarButton onClick={() => insertText('\n1. ')} icon={<ListOrdered className="w-4 h-4" />} title="Numbered List" />
                  <div className="w-px h-4 bg-brand-ink mx-1" />
                  <ToolbarButton onClick={() => insertText('[', '](url)')} icon={<LinkIcon className="w-4 h-4" />} title="Link" />
                  <ToolbarButton onClick={() => fileInputRef.current?.click()} icon={<ImageIcon className="w-4 h-4" />} title="Upload Image" />
                  <ToolbarButton onClick={() => fileDocInputRef.current?.click()} icon={<FileText className="w-4 h-4" />} title="Upload PDF/Doc" />
                  <ToolbarButton onClick={() => insertText('\n```\n', '\n```\n')} icon={<Code className="w-4 h-4" />} title="Code Block" />
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />
            <input
              type="file"
              ref={fileDocInputRef}
              onChange={handleDocUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
            />

            <div className="flex-1 overflow-hidden flex flex-col bg-brand-bg">
              {activeTab === 'write' ? (
                <textarea
                  id="editor"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the full project story here. You can use Markdown formatting..."
                  className="flex-1 w-full p-8 bg-transparent border-none outline-none resize-none font-sans text-brand-ink leading-relaxed text-lg placeholder:text-brand-ink-soft/50"
                />
              ) : (
                <div className="flex-1 w-full p-8 overflow-y-auto prose prose-brand max-w-none text-brand-ink">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
                  ) : (
                    <p className="text-brand-ink-soft italic">Nothing to preview yet.</p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Metadata */}
          <section className="bg-brand-card border-2 border-brand-ink p-6 shadow-[6px_6px_0_0_var(--shadow)]">
            <h3 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] border-b-2 border-brand-ink pb-3 mb-4 uppercase">
              Links & Metadata
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-ink-soft mb-1">GITHUB URL <span className="text-brand-red">*</span></label>
                <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-brand-bg border border-brand-ink p-2 text-xs font-mono outline-none focus:border-brand-red" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-ink-soft mb-1">LIVE URL <span className="text-brand-red">*</span></label>
                <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full bg-brand-bg border border-brand-ink p-2 text-xs font-mono outline-none focus:border-brand-red" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-bold text-brand-ink-soft mb-1">ICON NAME (Lucide) <span className="text-brand-red">*</span></label>
                <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full bg-brand-bg border border-brand-ink p-2 text-xs font-mono outline-none focus:border-brand-red" placeholder="e.g. layout, layers, box" />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-brand-card border-2 border-brand-ink p-6 shadow-[6px_6px_0_0_var(--shadow)]">
            <div className="flex items-center justify-between border-b-2 border-brand-ink pb-3 mb-4">
              <h3 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] uppercase">Features</h3>
              <button onClick={handleAddFeature} className="text-brand-red hover:bg-brand-red/10 p-1 rounded transition-colors" title="Add Feature">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-mono text-brand-ink-soft mt-2.5">{i + 1}.</span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    className="flex-1 bg-brand-bg border border-brand-ink p-2 text-xs outline-none focus:border-brand-red"
                    placeholder="Feature description..."
                  />
                  <button onClick={() => handleRemoveFeature(i)} className="text-brand-ink-soft hover:text-brand-red p-2 transition-colors" title="Remove">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-brand-card border-2 border-brand-ink p-6 shadow-[6px_6px_0_0_var(--shadow)]">
            <div className="flex items-center justify-between border-b-2 border-brand-ink pb-3 mb-4">
              <h3 className="text-[10px] font-mono font-bold text-brand-ink tracking-[0.2em] uppercase">Tech Stack</h3>
              <button onClick={handleAddTech} className="text-brand-red hover:bg-brand-red/10 p-1 rounded transition-colors" title="Add Tech">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(i, e.target.value)}
                    className="flex-1 bg-brand-bg border border-brand-ink p-2 text-xs font-mono outline-none focus:border-brand-red"
                    placeholder="e.g. Next.js"
                  />
                  <button onClick={() => handleRemoveTech(i)} className="text-brand-ink-soft hover:text-brand-red p-2 transition-colors" title="Remove">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </aside>
      </main>
    </div>
  );
}

function ToolbarButton({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-2 text-brand-ink hover:text-brand-red hover:bg-brand-ink/10 rounded transition-colors"
    >
      {icon}
    </button>
  );
}
