import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const Loader = () => {
  const containerStyle = {
    backgroundColor: '#1a1a1a',
    minHeight: '100vh',
    width: '100vw',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  const contentStyle = {
    maxWidth: '80rem',
    width: '100%',
  };

  const headerStyle = {
    marginBottom: '1.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '1rem',
  };

  const cardStyle = {
    backgroundColor: '#2a2a2a',
    padding: '1rem',
    borderRadius: '0.25rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  };

  const skeletonStyle = {
    backgroundColor: '#3a3a3a',
    borderRadius: '0.25rem',
    animation: 'pulse 1.5s infinite',
  };

  const titleStyle = {
    ...skeletonStyle,
    height: '2rem',
    width: '25%',
    marginBottom: '1rem',
  };

  const subtitleStyle = {
    ...skeletonStyle,
    height: '1rem',
    width: '50%',
  };

  const imageStyle = {
    ...skeletonStyle,
    height: '10rem',
    marginBottom: '1rem',
  };

  const textStyle = {
    ...skeletonStyle,
    height: '1rem',
    width: '75%',
    marginBottom: '0.5rem',
  };

  const shortTextStyle = {
    ...textStyle,
    width: '50%',
  };

  const footerStyle = {
    marginTop: '1.5rem',
  };

  const footerTextStyle = {
    ...skeletonStyle,
    height: '1rem',
    width: '25%',
  };

  return (
    <ErrorBoundary>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={headerStyle}>
            <div style={titleStyle}></div>
            <div style={subtitleStyle}></div>
          </div>
          <div style={gridStyle}>
            {[...Array(9)].map((_, index) => (
              <div key={index} style={cardStyle}>
                <div style={imageStyle}></div>
                <div style={textStyle}></div>
                <div style={shortTextStyle}></div>
              </div>
            ))}
          </div>
          <div style={footerStyle}>
            <div style={footerTextStyle}></div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Loader;
