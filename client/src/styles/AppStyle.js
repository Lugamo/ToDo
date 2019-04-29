const style = theme => ({
  myWrapper: {
    display: 'grid',
    overflow: 'hidden',
    value: theme.mixins.toolbar.minHeight,

    '@media screen and (min-width: 600px)': {
      gridTemplateColumns: '100%',
      gridTemplateRows: `64px auto`,
      gridTemplateAreas: '"header""main"',
    },
    '@media screen and (max-width: 600px)': {
      gridTemplateRows: `${theme.mixins.toolbar.minHeight}px auto`,
      gridTemplateColumns: '100%',
      gridTemplateAreas: '"header""main"',
    },
  },
});

export default style;