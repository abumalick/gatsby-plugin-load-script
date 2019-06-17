import React from 'react';

export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  const {
    plugins, // internal to gatsby
    disable, // should we disable the plugin ?
    src, // source of the script
    onerror,
    onError,
    onload,
    onLoad,
    async = true,
    charset = 'utf8',
    type = 'text/javascript',
    ...options
  } = pluginOptions;

  if (!src) {
    throw new Error(
      'gatsby-plugin-load-script needs a "src" option in order to work correctly',
    );
  }

  const finalOptions = {
    src,
    onerror: onError || onerror,
    onload: onLoad || onload,
    type,
    charset,
    async,
    ...options,
  };
  let optionsAsString = '';
  Object.entries(finalOptions).forEach(([property, value]) => {
    if (value !== undefined) {
      if (property === 'onerror' || property === 'onload') {
        optionsAsString += `script.${property}=${value};`;
      } else {
        optionsAsString += `script.${property}="${value}";`;
      }
    }
  });
  if (!disable)
    setPostBodyComponents([
      <script
        key={src}
        dangerouslySetInnerHTML={{
          __html: `
                        var head = document.head || document.getElementsByTagName('head')[0];
                        var script = document.createElement('script');
                        ${optionsAsString}
                        head.appendChild(script);
                    `,
        }}
      />,
    ]);
};
