/**
 * Google Analytics Configuration
 *
 * Analytics tracking setup.
 * Initialize GA in production environment.
 */

/**
 * Initialize Google Analytics
 * Call this in _app.tsx or layout.tsx
 */
export const initAnalytics = (): void => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_GA_ID &&
    typeof window !== 'undefined'
  ) {
    // TODO: Install gtag and initialize
    // Add gtag script to _document.tsx or layout.tsx
    //
    // <!-- Google tag (gtag.js) -->
    // <script
    //   async
    //   src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
    // />
    // <script
    //   dangerouslySetInnerHTML={{
    //     __html: `
    //       window.dataLayer = window.dataLayer || [];
    //       function gtag(){dataLayer.push(arguments);}
    //       gtag('js', new Date());
    //       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    //     `,
    //   }}
    // />
  }
};

/**
 * Track page view
 */
export const trackPageView = (_url: string): void => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_GA_ID &&
    typeof window !== 'undefined'
  ) {
    // TODO: Track page view when GA is integrated
    // if (window.gtag) {
    //   window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    //     page_path: url,
    //   });
    // }
  }
};

/**
 * Track event
 */
export const trackEvent = (
  _action: string,
  _category: string,
  _label?: string,
  _value?: number
): void => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PUBLIC_GA_ID &&
    typeof window !== 'undefined'
  ) {
    // TODO: Track event when GA is integrated
    // if (window.gtag) {
    //   window.gtag('event', action, {
    //     event_category: category,
    //     event_label: label,
    //     value: value,
    //   });
    // }
  }
};

