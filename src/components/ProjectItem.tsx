import React from 'react';
import tw, { styled } from 'twin.macro';

import IconIssue from '~icons/octicon/issue-opened-16';
import IconForked from '~icons/octicon/repo-forked-16';
import IconStar from '~icons/octicon/star-16';
import IconDefault from '~icons/ri/code-s-slash-line';
import IconCss from '~icons/ri/css3-line';
import IconHtml from '~icons/ri/html5-line';
import IconJs from '~icons/teenyicons/javascript-outline';
import IconTs from '~icons/teenyicons/typescript-outline';

import { ProjectModel } from '../models/projectModel';

interface IconDetail {
  component: React.FunctionComponent;
  color: string;
}

export interface ProjectItemProps {
  project: ProjectModel;
}

const iconMap: Record<string, IconDetail> = {
  default: { component: IconDefault, color: '' },
  TypeScript: { component: IconTs, color: '#3178C6' },
  JavaScript: { component: IconJs, color: '#FCD002' },
  HTML: { component: IconHtml, color: '#FF3C41' },
  CSS: { component: IconCss, color: '#10BDFF' },
};

export default function ProjectItem(props: ProjectItemProps) {
  const { project } = props;
  const icon = iconMap[props.project.language] ?? iconMap.default;

  return (
    <div className="relative p-3 pl-14 bg-white dark:bg-gray-900 rounded-md ring-1 ring-slate-600/5 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="absolute top-3 left-3 w-9 h-9 rounded-md flex items-center justify-center overflow-hidden font-bold">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-current" />
        <icon.component />
      </div>
      <a className="block text-blue-500 truncate" href={project.htmlUrl}>
        {project.fullName}
      </a>
      <div className="mt-2 text-slate-400 text-sm overflow-hidden display:-webkit-box -webkit-line-clamp:2 -webkit-box-orient:vertical">
        {project.description}
      </div>
      <ul className="mt-2 space-x-3 flex min-w-0 text-sm text-slate-400 leading-5">
        <li className="flex items-center">
          <IconStar />
          <span className="ml-2">{project.stargazersCount}</span>
        </li>
        <li className="flex items-center">
          <IconForked />
          <span className="ml-2">{project.forksCount}</span>
        </li>
        <li className="flex items-center">
          <IconIssue />
          <span className="ml-2">{project.openIssuesCount}</span>
        </li>
      </ul>
    </div>
  );
}
