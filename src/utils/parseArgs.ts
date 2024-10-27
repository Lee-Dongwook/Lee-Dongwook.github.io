export const parseArgs = (raw: string): Record<string, string> => {
  const re = /(?<key>\w+)="(?<value>[^"]*)"/g;
  const args: Record<string, string> = {};

  for (const matched of raw.matchAll(re)) {
    const { key, value } = matched.groups!;
    args[key] = value;
  }

  const [lang] = raw.split(' ', 1);
  if (lang) args.lang = lang;

  return args;
};
