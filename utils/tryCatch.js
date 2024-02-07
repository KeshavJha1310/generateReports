export const tryCatch = (controllerFunction) => async () => {
  await controllerFunction().catch((err) => {
    console.error(err)
  });
};
