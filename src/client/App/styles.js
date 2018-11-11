export default () => {
  const fullSize = {
    width: '100%',
    height: '100%',
  };

  return  {
    '@global': {
      html: {
        ...fullSize,
      },
      body: {
        ...fullSize,
      },
      '#root': {
        ...fullSize,
      },
    },
  };
};
