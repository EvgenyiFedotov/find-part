export default (theme) => {
  const blockFlexRow = {
    display: 'flex',
    alignItems: 'center',
  };
  const { unit } = theme.spacing;

  return {
    companies: {},
    header: {
      ...blockFlexRow,
      justifyContent: 'space-between',
    },
    button: {
      padding: unit,
    },
    listItem: {
      paddingLeft: 0,
    },
    dialogFooter: {
      justifyContent: 'flex-end',
    },
  };
};
