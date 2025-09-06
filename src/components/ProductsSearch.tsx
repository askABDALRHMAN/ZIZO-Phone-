import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductsSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const ProductsSearch: React.FC<ProductsSearchProps> = ({ onSearch }) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const text = {
    ar: {
      placeholder: 'ابحث عن منتج...'
    },
    en: {
      placeholder: 'Search for a product...'
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder={text[language].placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
};