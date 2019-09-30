import React, {componentDidCatch, Component} from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error) {
    this.setState({hasError: true});
  }

  render() {
    if(this.state.hasError) {
      return <h1>Something Went Wrong!</h1>;
    }

    return this.props.children;
  }
}