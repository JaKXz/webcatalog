/* global shell os */
import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import ActionStars from 'material-ui/svg-icons/action/stars';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionViewList from 'material-ui/svg-icons/action/view-list';
import FileCloudDone from 'material-ui/svg-icons/file/cloud-done';

const Nav = ({
  pathname, handleTabChange,
}) => (
  <Tabs
    onChange={handleTabChange}
    value={pathname}
  >
    <Tab
      icon={<ActionStars />}
      label="Featured"
      value="/"
    />
    <Tab
      icon={<ActionViewList />}
      label="Top Charts"
      value="/top"
    />
    <Tab
      icon={<ActionSearch />}
      label="Search"
      value="/search"
    />
    <Tab
      icon={<FileCloudDone />}
      label="Installed"
      value="/installed"
    />
  </Tabs>
);

Nav.propTypes = {
  pathname: React.PropTypes.string,
  handleTabChange: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.pathname,
});

const mapDispatchToProps = dispatch => ({
  handleTabChange: (pathname) => {
    dispatch(replace(pathname));
  },
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Nav);
