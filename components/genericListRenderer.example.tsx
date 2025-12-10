'use client';
/**
 * ✅ Generic ListRenderer (React 19 / Next 15)
 * --------------------------------------------
 * - Layout: grid or list (Tailwind-ready)
 * - Sorting + Pagination built in
 * - Uses only children-as-render-function (more idiomatic)
 * - Extremely reusable for dashboards, cards, etc.
 */

import React from 'react';
import clsx from 'clsx';

export interface ListRendererProps<T extends Record<string, unknown>> {
  items: T[];
  layout?: 'grid' | 'list';
  gap?: string;
  columns?: number;
  className?: string;
  /** Function-as-children — used to render each item */
  children: (item: T, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  options?: {
    pagination?: { page: number; perPage: number };
    sort?: { field: keyof T; direction?: 'asc' | 'desc' };
  };
}

export function ListRenderer<T extends Record<string, unknown>>({
                                                              items,
                                                              layout = 'list',
                                                              gap = 'gap-4',
                                                              columns = 3,
                                                              className,
                                                              children,
                                                              emptyState = <p className="text-gray-500">No items found.</p>,
                                                              options = {},
                                                            }: ListRendererProps<T>) {
  // ========================
  // 🧠 1. SORTING
  // ========================
  const sortedItems = [...items];
  if (options.sort?.field) {
    const { field, direction = 'asc' } = options.sort;
    sortedItems.sort((a, b) => {
      const av = a[field];
      const bv = b[field];
      if (av === bv) return 0;
      if (av > bv) return direction === 'asc' ? 1 : -1;
      return direction === 'asc' ? -1 : 1;
    });
  }

  // ========================
  // 🔢 2. PAGINATION
  // ========================
  const page = options.pagination?.page ?? 1;
  const perPage = options.pagination?.perPage ?? sortedItems.length;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = sortedItems.slice(start, end);

  // ========================
  // 🧩 3. RENDERING
  // ========================
  if (!paginatedItems.length) {
    return <div className="py-8 text-center">{emptyState}</div>;
  }

  const baseClass =
    layout === 'grid'
      ? clsx(
        'grid',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
          'grid-cols-5': columns === 5,
          'grid-cols-6': columns === 6,
        },
        gap,
        className
      )
      : clsx('flex', 'flex-col', gap, className);

  return (
    <div>
      <div className={baseClass}>
        {paginatedItems.map((item, idx) => (
          <React.Fragment key={idx}>{children(item, idx)}</React.Fragment>
        ))}
      </div>

      {options.pagination && (
        <div className="flex justify-center mt-4 text-sm text-gray-500">
          Page {page} of {Math.ceil(sortedItems.length / perPage)}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------
   🧪 USAGE EXAMPLES
------------------------------------------------------------------- */

type User = { id: number; name: string; age: number };

export function ExampleList() {
  const users: User[] = [
    { id: 1, name: 'Charlie', age: 25 },
    { id: 2, name: 'Alice', age: 30 },
    { id: 3, name: 'Bob', age: 22 },
    { id: 4, name: 'Eve', age: 28 },
    { id: 5, name: 'Mallory', age: 35 },
  ];

  return (
    <ListRenderer<User>
      items={users}
      layout="grid"
      columns={2}
      gap="gap-6"
      options={{
        sort: { field: 'name', direction: 'asc' },
        pagination: { page: 1, perPage: 4 },
      }}
    >
      {(user) => (
        <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-gray-600 text-sm">Age: {user.age}</p>
        </div>
      )}
    </ListRenderer>
  );
}

/*
✅ Features:
- Sorts users by name (ascending)
- Shows first 4 users per page
- Grid with 2 columns (Tailwind)
- Uses children-as-render-function (idiomatic)
- Easy to extend with custom Tailwind layouts or server components
*/