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
    badge: {
      top: '-16px',
      left: '26px',
      border: `2px solid ${
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
    },
    icon: {
      marginLeft: unit,
    },
    badgeIcon: {
      marginTop: unit * -2,
      marginLeft: unit,
    },
    actions: {
      paddingRight: unit * 2,
    },
  };
};
