import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = (theme) => {
  console.log(theme);

  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 100
    },
    drawer: {
      width: `${drawerWidth}px`,
    },
    drawerToolbar: {
      width: `${drawerWidth}px`,
    },
    title: {
      marginLeft: '16px',
      flexGrow: 1,
    },
  };
};

export default withStyles(styles);
