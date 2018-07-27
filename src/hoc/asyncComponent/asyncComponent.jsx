import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    }

    componentDidMount() {
      importComponent()
        .then((initComponent) => {
          this.setState({ component: initComponent.default });
        });
    }

    render() {
      const RenderComponent = this.state.component;

      return RenderComponent ? <RenderComponent {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
