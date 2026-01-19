import React from 'react';
import { ArrowRight } from 'lucide-react'; // Assurez-vous d'importer l'icône ArrowRight

interface StringListProps {
  items: string[];
}

export const StringList: React.FC<StringListProps> = ({ items }) => {
  return (
    <ul className="space-y-3 mb-8">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 text-foreground-secondary">
          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-primary" />
          </div>
          {item}
        </li>
      ))}
    </ul>
  );
};