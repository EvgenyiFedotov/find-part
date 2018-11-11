export default theme => ({
  content: {
    width: theme.spacing.unit * 75,
  },
  filterInputs: {
    marginBottom: theme.spacing.unit * 3,
    '& > div': {
      width: '100%',
    },
  },
  chip: {
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});
