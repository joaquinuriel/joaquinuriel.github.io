type Handle = <t>(promise: Promise<t>) => Promise<[t, null] | [null, any]>;
export const handle: Handle = async (promise) => {
  try {
    return [await promise, null];
  } catch (error) {
    return [null, error];
  }
};
