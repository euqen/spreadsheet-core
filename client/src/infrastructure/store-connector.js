import React from 'react';

export default function bind(store, getState) {
    return function (DecoratedComponent) {
        return class StoreConnector extends React.Component {
            constructor(props) {
                super(props);

                this.handleStoreChanged = this.handleStoreChanged.bind(this);
                this.store = new store();
                this.state = getState(this.store);
            }

            componentWillMount() {
                this.store.subscribe(this.handleStoreChanged)
            }

            componentWillReceiveProps(nextProps) {
                this.setState(getState(this.store));
            }

            componentWillUnmount() {
                this.store.unsubscribe(this.handleStoreChanged)
            }

            handleStoreChanged() {
                this.setState(getState(this.store));
            }

            render() {
                return <DecoratedComponent {...this.props} {...this.state} />;
            }
        };
    };
}