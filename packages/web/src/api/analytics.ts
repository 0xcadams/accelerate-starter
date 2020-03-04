import reactGa from 'react-ga';

export const initGA = () => {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.GOOGLE_ANALYTICS_ID
  ) {
    reactGa.initialize(process.env.GOOGLE_ANALYTICS_ID);
  } else {
    console.log('Mocking out Google Analytics for development.');
  }
};

export const logPageView = () => {
  if (window && window.location.pathname) {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.set({ page: window.location.pathname });
      reactGa.pageview(window.location.pathname);
    } else {
      console.log(`Logging pageview for ${window.location.pathname}`);
    }
  }
};

export const logEvent = ({
  category,
  action
}: {
  category: 'User';
  action: string;
}) => {
  if (category && action) {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.event({ category, action });
    } else {
      console.log(`Logging event for category: ${category}, action: ${action}`);
    }
  }
};

export const logException = (description, fatal = false) => {
  if (description) {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.exception({ description, fatal });
    } else {
      console.log(`Logging exception for ${description}, fatal: ${fatal}`);
    }
  }
};

export const logUserId = (userId?: string) => {
  if (userId) {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.set({ userId });
    } else {
      console.log(`Logging userId for ${userId}`);
    }
  }
};

const timings = {};

export const logTimingStart = ({
  service,
  method
}: {
  service: string;
  method: string;
}) => {
  if (service && method && window.performance) {
    timings[`${service}-${method}`] = performance.now();
  }
};

export const logTimingEnd = ({
  service,
  method
}: {
  service: string;
  method: string;
}) => {
  if (
    service &&
    method &&
    timings[`${service}-${method}`] &&
    window.performance
  ) {
    const timeTook = Math.round(
      performance.now() - (timings[`${service}-${method}`] || 0)
    );

    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.GOOGLE_ANALYTICS_ID
    ) {
      reactGa.timing({
        value: timeTook,
        label: method,
        category: service,
        variable: 'load'
      });
    } else {
      console.log(`Logging timing for ${service}-${method} as ${timeTook}`);
    }
  }
};
