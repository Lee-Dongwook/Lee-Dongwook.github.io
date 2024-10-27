import React from 'react';
import { Link, To } from 'react-router-dom';
import tw from 'twin.macro';

import { LabelModel } from '../models/labelModel';

export interface LabelItemProps {
  label: LabelModel;
  getLink: (label: string) => To;
}

export default function LabelItem(props: LabelItemProps) {
  const { label, getLink } = props;

  return (
    <Link className="mr-4 flex items-center" to={getLink(label.name)}>
      <span className="w-2 h-2 rounded-full" style={{ background: label.color }}></span>
      <span className="ml-2 dark:text-slate-600">{label.name}</span>
    </Link>
  );
}
