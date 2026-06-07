'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, ChevronRight, Calendar } from 'lucide-react';
import {
  Project,
  ProjectFeature,
  ProjectFeatureBlock,
  getIcon,
  getFeatureBlocks,
  getProjectLink,
  getProjectFeatures,
} from '@/lib/projects';

interface ProjectDetailDrawerProps {
  project: Project | null;
  onClose: () => void;
  drawerBg: string;
  drawerBorder: string;
}

export default function ProjectDetailDrawer({
  project,
  onClose,
  drawerBg,
  drawerBorder,
}: ProjectDetailDrawerProps) {
  const features = project ? getProjectFeatures(project) : [];
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    const list = getProjectFeatures(project);
    setActiveFeatureId(list[0]?.id ?? null);

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const activeFeature: ProjectFeature | undefined = features.find(f => f.id === activeFeatureId);
  const hasRichFeatures = features.some(f => f.blocks?.length || f.detail || f.image);

  const renderFeatureBlock = (block: ProjectFeatureBlock, featureTitle: string, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <p key={`text-${index}`} className="text-sm sm:text-base text-brand-ink-mid leading-relaxed whitespace-pre-line">
            {block.text}
          </p>
        );
      case 'image':
        return (
          <figure key={`image-${index}`} className="space-y-2 min-w-0 max-w-full">
            <div className="relative w-full max-w-full aspect-video border border-brand-rule/60 overflow-hidden bg-brand-bg shrink-0">
              <Image
                src={block.src}
                alt={block.alt || featureTitle}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            {block.caption ? (
              <figcaption className="text-[11px] font-mono uppercase tracking-[0.18em] text-brand-ink-soft">
                {block.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      case 'spacer':
        return <div key={`spacer-${index}`} className="h-2" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 h-full z-[80] w-full lg:w-[min(92vw,1100px)] border-l shadow-[-20px_0_50px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden"
            style={{ backgroundColor: drawerBg, borderColor: drawerBorder }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
          >
            {/* Header */}
            <div
              className="shrink-0 p-5 sm:p-6 border-b border-brand-rule/50 flex items-start justify-between gap-4"
              style={{ backgroundColor: drawerBg }}
            >
              <div className="flex items-start gap-4 min-w-0">
                <ProjectIcon project={project} size="lg" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-brand-red mb-1">
                    {project.num}
                  </p>
                  <h3 className="font-display font-black text-xl sm:text-2xl leading-tight text-brand-ink">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brand-ink-mid mt-2 line-clamp-2">{project.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border border-brand-rule hover:border-brand-red hover:text-brand-red inline-flex items-center justify-center transition-colors shrink-0"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body: features list (left) + detail (right) */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
              {/* Feature list */}
              <div className="lg:w-[38%] shrink-0 border-b lg:border-b-0 lg:border-r border-brand-rule/50 overflow-y-auto">
                <div className="p-4 sm:p-5">
                  <h4 className="font-mono text-[10px] font-bold tracking-[0.2em] text-brand-red uppercase mb-3">
                    Features
                  </h4>
                  {features.length > 0 ? (
                    <ul className="space-y-2">
                      {features.map((feature, index) => {
                        const isActive = feature.id === activeFeatureId;
                        return (
                          <li key={feature.id}>
                            <button
                              type="button"
                              onClick={() => {
                                if (!isActive) {
                                  setActiveFeatureId(feature.id);
                                }
                              }}
                              aria-expanded={isActive}
                              className={`w-full text-left px-3 py-3 border transition-all ${
                                isActive
                                  ? 'border-brand-red bg-brand-red/10 text-brand-ink'
                                  : 'border-brand-rule/60 bg-brand-card/30 text-brand-ink-mid hover:border-brand-red/40 hover:bg-brand-card/60'
                              }`}
                            >
                              <span className="flex items-start gap-3">
                                <span className={`mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-1.5 font-mono text-[10px] font-black tracking-widest transition-colors ${isActive ? 'border-brand-red bg-brand-red text-brand-bg' : 'border-brand-rule/60 bg-brand-bg text-brand-ink-soft'}`}>
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="font-display font-bold text-sm leading-snug block">
                                    {feature.title}
                                  </span>
                                  {feature.summary && (
                                    <span className="text-xs text-brand-ink-soft mt-1 line-clamp-2 block">
                                      {feature.summary}
                                    </span>
                                  )}
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-ink-soft">No features listed.</p>
                  )}
                </div>
              </div>

              {/* Feature detail panel */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-brand-card/20">
                <AnimatePresence mode="wait">
                  {activeFeature ? (
                    <motion.div
                      key={activeFeature.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 sm:p-6 h-full flex flex-col min-w-0 overflow-x-hidden"
                    >
                      <h5 className="font-display font-black text-lg sm:text-xl text-brand-ink mb-4">
                        {activeFeature.title}
                      </h5>

                      {(() => {
                        const blocks = getFeatureBlocks(activeFeature);
                        return blocks.length > 0 ? (
                          <div className="space-y-5 min-w-0">
                            {blocks.map((block, index) => renderFeatureBlock(block, activeFeature.title, index))}
                          </div>
                        ) : (
                          <p className="text-sm sm:text-base text-brand-ink-mid leading-relaxed whitespace-pre-line">
                            {activeFeature.detail || activeFeature.summary || 'No additional details for this feature.'}
                          </p>
                        );
                      })()}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 text-sm text-brand-ink-soft"
                    >
                      Click a feature bullet to view details.
                    </motion.div>
                  )}
                </AnimatePresence>

                {!hasRichFeatures && project.longDesc && (
                  <div className="px-5 sm:px-6 pb-6 border-t border-brand-rule/40 pt-5 mt-auto">
                    <p className="text-sm text-brand-ink-mid leading-relaxed">{project.longDesc}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer meta */}
            <div
              className="shrink-0 p-4 sm:p-5 border-t border-brand-rule/50 space-y-4"
              style={{ backgroundColor: drawerBg }}
            >
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] font-bold border border-brand-rule bg-brand-bg px-2.5 py-1 text-brand-ink-soft uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.createdAt && (
                <div className="flex items-center gap-2 text-xs text-brand-ink-soft">
                  <Calendar className="w-3.5 h-3.5 text-brand-red" />
                  Created:{' '}
                  {new Date(project.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] font-bold border border-brand-rule hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
                {project.liveUrl?.trim() ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] font-bold border border-brand-rule hover:border-brand-red hover:text-brand-red transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                  </a>
                ) : null}
                <a
                  href={getProjectLink(project)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] font-bold bg-brand-red text-brand-bg hover:opacity-90 transition-opacity"
                >
                  Open Project <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function ProjectIcon({
  project,
  size = 'md',
}: {
  project: Project;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dims = size === 'lg' ? 'w-14 h-14' : size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const imgSize = size === 'lg' ? 56 : size === 'sm' ? 40 : 48;

  if (project.iconUrl) {
    return (
      <div
        className={`${dims} border border-brand-rule/60 bg-brand-bg flex items-center justify-center overflow-hidden shrink-0`}
      >
        <Image
          src={project.iconUrl}
          alt={`${project.title} icon`}
          width={imgSize}
          height={imgSize}
          className="object-contain p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dims} border border-brand-rule/60 bg-brand-bg/90 flex items-center justify-center shrink-0`}
    >
      {getIcon(project.icon)}
    </div>
  );
}
