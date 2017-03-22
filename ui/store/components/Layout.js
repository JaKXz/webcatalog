/* global os */
import React from 'react';
import { connect } from 'react-redux';
import { fullWhite, blue500, blue700, red500 } from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from './Nav';

import { fetchApps } from '../actions/app';


class Layout extends React.Component {
  getChildContext() {
    const pTheme = lightBaseTheme;

    pTheme.palette.primary1Color = blue500;
    pTheme.palette.primary2Color = blue700;
    pTheme.palette.accent1Color = red500;

    const muiTheme = getMuiTheme(pTheme);

    return {
      muiTheme,
    };
  }

  componentDidMount() {
    const { pathname, requestFetchApps } = this.props;
    const el = this.scrollContainer;

    el.onscroll = () => {
      // Plus 300 to run ahead.
      if (el.scrollTop + 300 >= el.scrollHeight - el.offsetHeight && pathname === '/') {
        requestFetchApps();
      }
    };
  }

  componentWillUnmount() {
    this.scrollContainer.onscroll = null;
  }

  getStyles() {
    return {
      fakeTitleBar: {
        flexBasis: 22,
        height: 22,
        lineHeight: '22px',
        color: fullWhite,
        backgroundColor: blue700,
        textAlign: 'center',
        fontSize: 13,
        WebkitUserSelect: 'none',
        WebkitAppRegion: 'drag',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const { children, pathname } = this.props;

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {os.platform() === 'darwin' ? (
          <div style={styles.fakeTitleBar}>
            WebCatalog
          </div>
        ) : null}
        <Nav pathname={pathname} />
        <div
          style={{ flex: 1, overflow: 'auto', paddingTop: 12, paddingBottom: 12 }}
          ref={(container) => { this.scrollContainer = container; }}
        >
          {children}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.element, // matched child route component
  pathname: React.PropTypes.string,
  requestFetchApps: React.PropTypes.func,
};

Layout.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.location.pathname,
});

const mapDispatchToProps = dispatch => ({
  requestFetchApps: () => {
    dispatch(fetchApps());
  },
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Layout);
