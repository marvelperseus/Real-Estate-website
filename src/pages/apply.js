import React from 'react';
import { observer } from 'mobx-react';
import isBrowser from 'is-browser';
import Layout from '../frontEndComponents/FrontEndLayout';
import { initStore } from '../models';
import withData from '../lib/withData';
import ApplicationContainer from '../frontEndContainers/Application';

@observer
class Apply extends React.Component {
  static getInitialProps({ req, query }) {
    const isServer = !!req;
    return {
      cookieJWTData: req && req.cookies ? req.cookies.jwtData : null,
      isServer,
      listingID: query.listingID,
    };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.cookieJWTData);

    // for debugging only!!!
    if (isBrowser && !window._appStore) window._appStore = this.store;
  }

  render() {
    const { listingID } = this.props;

    return (
      <Layout UserStore={this.store.UserStore}>
        <ApplicationContainer listingID={listingID} />
      </Layout>
    );
  }
}

export default withData(Apply);
