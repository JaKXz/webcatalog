/* global os argv remote */
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Button, Intent, Spinner } from '@blueprintjs/core';

import { DEFAULT, DONE, LOADING, FAILED } from '../constants/actions';
import { toggleCustomDialog, setCustomValue, setCustomStatus, installCustomApp } from '../actions/custom';
import openApp from '../helpers/openApp';

const Settings = ({
  isOpen, name, url, icon, id, status,
  requestToggleCustomDialog, requestSetCustomValue,
  requestInstall, requestSetCustomStatus, handleBrowseIcon,
}) => (
  <Dialog
    iconName="cog"
    isOpen={isOpen}
    onClose={() => requestToggleCustomDialog()}
    title="Install Custom App"
  >
    <div className="pt-dialog-body">
      {(status === DEFAULT) ? (
        <div>
          <label className="pt-label" htmlFor="name">
            Name
            <span className="pt-text-muted">(required)</span>
            <input
              className="pt-input"
              style={{ width: 300 }}
              type="text"
              placeholder="Name"
              value={name}
              dir="auto"
              required
              onChange={e => requestSetCustomValue('name', e.target.value)}
              onInput={e => requestSetCustomValue('name', e.target.value)}
            />
          </label>
          <label className="pt-label" htmlFor="url">
            URL
            <span className="pt-text-muted">(required)</span>
            <input
              className="pt-input"
              style={{ width: 300 }}
              type="url"
              placeholder="URL"
              value={url}
              dir="auto"
              required
              onChange={e => requestSetCustomValue('url', e.target.value)}
              onInput={e => requestSetCustomValue('url', e.target.value)}
            />
          </label>
          <label className="pt-label" htmlFor="url">
            Icon
            <p>
              <img
                src={icon || 'images/custom_app.png'}
                style={{ height: 128, width: 128 }}
                alt="Icon"
                onClick={handleBrowseIcon}
              />
            </p>
            <p><a role="button" className="pt-button" onClick={handleBrowseIcon}>Browse...</a></p>
          </label>
        </div>
      ) : null}
      {(status === LOADING) ? (
        <Spinner className="centering_spinner" />
      ) : null}
      {(status === DONE) ? (
        <div className="text-container">
          <h5>
            {name} is installed successfully.
          </h5>
          <button
            type="button"
            className="pt-button pt-intent-primary"
            onClick={() => openApp(name, id)}
          >
            Open
          </button>
          <button
            type="button"
            className="pt-button"
            onClick={() => {
              // clean
              requestSetCustomValue('name', '');
              requestSetCustomValue('url', '');
              requestSetCustomValue('icon', null);
              requestSetCustomValue('id', null);

              requestSetCustomStatus(DEFAULT);
            }}
            style={{ marginLeft: 6 }}
          >
            Install Other App
          </button>
        </div>
      ) : null}
      {(status === FAILED) ? (
        <div className="text-container">
          <h5>
            Installation failed.
          </h5>
          <button
            type="button"
            className="pt-button pt-intent-primary"
            onClick={() => {
              requestSetCustomStatus(DEFAULT);
            }}
            style={{ marginLeft: 6 }}
          >
            Try Again
          </button>
        </div>
      ) : null}
    </div>
    <div className="pt-dialog-footer">
      <div className="pt-dialog-footer-actions">
        {(status === DEFAULT) ? (
          <Button
            text="Install"
            intent={Intent.PRIMARY}
            iconName="download"
            className={(name.length > 0 && url.length > 0) ? null : 'pt-disabled'}
            onClick={() => requestInstall()}
          />
        ) : null}
        <Button text="Close" onClick={() => requestToggleCustomDialog()} />
      </div>
    </div>
  </Dialog>
);

Settings.propTypes = {
  isOpen: React.PropTypes.bool,
  name: React.PropTypes.string,
  url: React.PropTypes.string,
  icon: React.PropTypes.string,
  id: React.PropTypes.string,
  status: React.PropTypes.string,
  requestToggleCustomDialog: React.PropTypes.func,
  requestSetCustomValue: React.PropTypes.func,
  requestInstall: React.PropTypes.func,
  requestSetCustomStatus: React.PropTypes.func,
  handleBrowseIcon: React.PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.custom.isOpen,
  name: state.custom.name,
  url: state.custom.url,
  icon: state.custom.icon,
  id: state.custom.id,
  status: state.custom.status,
});

const mapDispatchToProps = dispatch => ({
  requestToggleCustomDialog: () => {
    dispatch(toggleCustomDialog());
  },
  requestSetCustomValue: (name, val) => {
    dispatch(setCustomValue(name, val));
  },
  requestInstall: () => {
    dispatch(installCustomApp());
  },
  requestSetCustomStatus: (status) => {
    dispatch(setCustomStatus(status));
  },
  handleBrowseIcon: () => {
    const options = {
      filters: [
        { name: 'Portable Network Graphics', extensions: ['png'] },
      ],
      properties: ['openFile'],
    };

    remote.dialog.showOpenDialog(options, (filePaths) => {
      if (!filePaths || filePaths.length < 1) return;
      dispatch(setCustomValue('icon', filePaths[0]));
    });
  },
});


export default connect(
  mapStateToProps, mapDispatchToProps,
)(Settings);
