import { rocketLaunch } from '@rocket/launch';
import { rocketBlog } from '@rocket/blog';
import { rocketSearch } from '@rocket/search';
import { adjustPluginOptions } from 'plugins-manager';

/** @type {Partial<import("@rocket/cli").RocketCliOptions>} */
const config = {
    setupEleventyComputedConfig: [
        adjustPluginOptions('socialMediaImage', {
            createSocialImageSvg: async ({ title = '', subTitle = '', subTitle2 = '', footer = '', logo = '' }) => {
                let svgStr = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" style="fill: #ecedef;">
           <defs/>
           <rect width="100%" height="100%" fill="#38393e"/>
          <circle cx="1100" cy="100" r="300" stroke-width="3" fill="#fbebb3" />
           <g transform="matrix(0.65, 0, 0, 0.65, 910, 50)">${logo}</g>
           <g style="
              font-size: 66px;
              text-anchor: left;
              font-family: 'Bitstream Vera Sans','Helvetica',sans-serif;
              font-weight: 700;
              fill: #fbebb3;
              "
              transform="matrix(1, 0, 0, 1, -200, -200)"
              >
              <text x="20%" y="550">${title || 'Stoxy'}</text>
              ${
                  title
                      ? `
             <text x="20%" y="650" style="font-size: 50px;">
                in Stoxy docs
            </text>
                 `
                      : `
             <text x="20%" y="650" style="font-size: 40px;">
                The reactive state management system
            </text>
             <text x="20%" y="700" style="font-size: 40px;">
                equipped with Web Components
            </text>
             `
              }
           </g>
        </svg>
        `;
                return svgStr;
            },
        }),
    ],
};

config.presets = [rocketLaunch(), rocketBlog(), rocketSearch()];
config.absoluteBaseUrl = "https://stoxy.dev/";

export default config;
