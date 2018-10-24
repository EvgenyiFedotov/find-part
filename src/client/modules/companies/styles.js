export default (theme) => {
  console.log(theme);

  const blockFlexRow = {
    display: 'flex',
    alignItems: 'center',
  };

  return {
    companies: {},
    header: {
      ...blockFlexRow,
      justifyContent: 'space-between',
    },
    button: {
      padding: theme.spacing.unit,
    },
    dialogText: {
      width: '100%',
      marginBottom: theme.spacing.unit * 2,
    },
    dialogFooter: {
      ...blockFlexRow,
      justifyContent: 'flex-end',
    },
  };
};
