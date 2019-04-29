const styles = theme => ({
  container: {
    gridArea: 'main',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  paper: {
    ...theme.mixins.gutters(),
    width: '310px',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: '#F5F5F5'
  },
  card: {
    maxWidth: 345,
    marginTop: theme.spacing.unit * 3,
  },
});

export default styles;