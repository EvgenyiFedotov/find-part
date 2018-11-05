export default theme => ({
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    width: theme.spacing.unit * 30,
    display: 'flex',
    flexDirection: 'column',
  },

  text: {
    marginBottom: theme.spacing.unit * 2,
  },

  submitButton: {
    width: '100%',
  },
});
