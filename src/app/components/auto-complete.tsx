'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { autoComplete } from '../database/bytes';
import type { AutoComplete } from '../types';
import { useDebounce } from '../utils/useDebounce';

export default function AutoComplete() {
  const [searchString, setSearchString] = useState<string>('');
  const [results, setResults] = useState<AutoComplete[]>([]);

  useEffect(() => {
    if (searchString) {
      autoComplete(searchString).then((results) => {
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [searchString]);

  const debouncedSearch = useDebounce((value: string) => {
    setSearchString(value);
  }, 50);

  const handleKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    debouncedSearch(event.currentTarget.value);
  };

  const boldenMatch = (title: string, length: number) => {
    const bolden = title.slice(0, length);
    const truncatedStr = title.slice(length);
    return (
      <>
        <b>{bolden}</b>{truncatedStr}
      </>
    )
  }

  return (
    <div className="mb-16 relative z-10">
      <input
        type="text"
        placeholder="Find byte..."
        className="border w-[500px] rounded-xl border-2 border-white p-4 bg-[#181818] outline-none relative z-20"
        onKeyUp={handleKeyup}
      />
      {!!results.length && (
        <ul className="absolute top-14 w-[450px] bg-[#181818] rounded-xl border-2 border-white pt-3 pb-2 z-10 left-1/2 transform -translate-x-1/2">
          {results.map((result) => (
            <li key={result.link}>
              <Link href={`/view/${result.link}`} className="w-full inline-block hover:bg-[#303030] pl-4 pr-4 pt-1 pb-1">{boldenMatch(result.title, result.length)}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};
