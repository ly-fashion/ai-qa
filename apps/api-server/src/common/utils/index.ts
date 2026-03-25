export const dateTransformer = {
  to: (value: Date): Date => {
    return value;
  },
  from: (value: string | Date): Date => {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  },
};
