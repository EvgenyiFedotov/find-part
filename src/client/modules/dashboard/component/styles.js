export default theme => ({
  content: {
    display: 'flex',
    padding: theme.spacing.unit * 1.5,
    '& > div': {
      margin: theme.spacing.unit * 1.5,
      padding: theme.spacing.unit * 2,
    },
  },
  companies: {
    width: '40%',
  },
  partners: {
    width: '30%',
  },
  requsest: {
    width: '30%',
  },
});
