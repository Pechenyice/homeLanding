export const combineClasses = (...classes: string[]) =>
  classes.filter((c) => c).join(' ');
