import '@assets/scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import styled, { ThemeProvider } from 'styled-components';

const theme = {};

function createContainer(): HTMLElement {
    return document.createElement('main');
}

function createRoot(): ReactDOM.Root {
    const container = createContainer();
    document.body.appendChild(container);

    return ReactDOM.createRoot(container);
}

const root = createRoot();

const Span = styled.span`
    font-size: xx-large;
`;

root.render(
    <ThemeProvider theme={theme}>
        <Span>👋, 🌍!</Span>
    </ThemeProvider>
);
