/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { setLibs } from './utils.js';

// Add project-wide styles here.
const STYLES = '/hub/styles/styles.css';

const LIBS = '/libs';

// Add any config options.
const CONFIG = {
  codeRoot: '/hub',
  contentRoot: '/hub',
  imsClientId: 'DocumentCloud1', // This will need to change per hub.
  locales: {
    '': { ietf: 'en-US', tk: 'hah7vzn.css' },
    de: { ietf: 'de-DE', tk: 'hah7vzn.css' },
    kr: { ietf: 'ko-KR', tk: 'zfo3ouc' },
    TH_th: { ietf: 'TH–th', tk: 'zfo3ouc' },
  },
  geoRouting: 'on',
};

// Default to loading the first image as eager.
(async function loadLCPImage() {
  const lcpImg = document.querySelector('img');
  lcpImg?.setAttribute('loading', 'eager');
}());

function decoratePromotion() {
  if (document.querySelector('main .promotion') instanceof HTMLElement) {
    return;
  }

  const promotionElement = document.querySelector('head meta[name="promotion"]');
  if (!promotionElement) {
    return;
  }

  const promo = document.createElement('div');
  promo.classList.add('promotion');
  promo.setAttribute('data-promotion', promotionElement.getAttribute('content').toLowerCase());
  document.querySelector('main > div').appendChild(promo);
}

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

const miloLibs = setLibs(LIBS);

(function loadStyles() {
  const paths = [`${miloLibs}/styles/styles.css`];
  if (STYLES) { paths.push(STYLES); }
  paths.forEach((path) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', path);
    document.head.appendChild(link);
  });
}());

const { loadArea, loadDelayed, setConfig } = await import(`${miloLibs}/utils/utils.js`);

(async function loadPage() {
  decoratePromotion();
  setConfig({ ...CONFIG, miloLibs });
  await loadArea();
  loadDelayed();
}());
