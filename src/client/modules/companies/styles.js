export default (theme) => {
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
    listItem: {
      paddingLeft: 0,
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
