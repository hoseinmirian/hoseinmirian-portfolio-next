'use client';
import { useAppData } from '@/providers/AppDataProvider'

export function ResumeListWrapper() {
  type Profile = { name: string };
  const { allProfile = [] } = useAppData();

  const profiles = allProfile as Profile[];

  if (!profiles.length) return null;

  return (
    <div>
      {profiles.map(p => (
        <div key={p.name}>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
  );
}
// should accept a prop to render all or some of the resume items (can be used in home page as well)

/* ==============>>>>>> without Zod

import React from 'react';
import { ResumeList } from './ResumeList'; // adjust path as needed

// Adjust this type to match your actual resume item shape
type ResumeItem = {
  id: string;
  title: string;
  // ...other fields
};

// Replace with real data source (DB/API/etc.)
async function getAllResumes(): Promise<ResumeItem[]> {
  return [];
}

interface ResumeListWrapperProps {
  visibleCount?: number; // if omitted, render all
}

export async function ResumeListWrapper({ visibleCount }: ResumeListWrapperProps) {
  const allResumes = await getAllResumes();
  const items = typeof visibleCount === 'number' ? allResumes.slice(0, visibleCount) : allResumes;

  return (
    <ResumeList
      title="Resume"
      items={items}
      allItems={allResumes} // still expose full set if needed downstream
    />
  );
}

==============>>>>>> with Zod

import { z } from 'zod';

const resumeListWrapperSchema = z.object({
  visibleCount: z.number().int().min(1).max(50).optional()
});

type ResumeListWrapperProps = z.infer<typeof resumeListWrapperSchema>;

async function getAllResumes() {
  return [];
}

export async function ResumeListWrapper(rawProps: unknown) {
  const { visibleCount }: ResumeListWrapperProps = resumeListWrapperSchema.parse(rawProps);
  const parsed = resumeListWrapperSchema.safeParse(rawProps);
  if (!parsed.success) {
    // handle error (log, fallback, etc.)
    return null;
  }

  const allResumes = await getAllResumes();
  const items = visibleCount != null ? allResumes.slice(0, visibleCount) : allResumes;

  return (
    // JSX using items...
    null
  );
}
* */