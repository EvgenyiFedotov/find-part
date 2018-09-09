export default (theme) => {
  const card = {
    minWidth: `calc(240px - ${theme.spacing.unit}px)`,
    maxWidth: `calc(30% - ${theme.spacing.unit}px)`,
    minHeight: `calc(300px - ${theme.spacing.unit}px)`,
    maxHeight: `calc(300px - ${theme.spacing.unit}px)`,
    margin: theme.spacing.unit * 2,
    flexGrow: 1,
  };

  return {
    root: {
      boxSizing: 'border-box',
      height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      [theme.breakpoints.up('sm')]: {
        height: `calc(100% - ${theme.mixins.toolbar[[theme.breakpoints.up('sm')]].minHeight}px)`,
      },
    },
    container: {
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      overflowY: 'scroll',
      justifyContent: 'center',
    },
    buttonAdd: {
      color: theme.palette.grey.A200,
      backgroundColor: theme.palette.grey[100],
      border: '1px dashed',
      '&:hover': {
        backgroundColor: theme.palette.grey[100],
      },
      ...card,
    },
    card,
    cardMedia: {
      height: '150px',
      backgroundColor: theme.palette.grey[100],
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardName: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    cardNote: {
      maxHeight: '50px',
      overflow: 'hidden',
    },
    buttonMenu: {
      marginRight: theme.spacing.unit * -2,
    },
    dialogEditToolbar: {
      justifyContent: 'space-between',
    },
    dialogEditContent: {
      padding: theme.spacing.unit * 2,
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
  };
};
