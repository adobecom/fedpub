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

const LIBS = '/libs';
const miloLibs = setLibs(LIBS);
const { loadArea, loadDelayed, setConfig, getLocale } = await import(`${miloLibs}/utils/utils.js`);

// Add project-wide styles here.
const STYLES = '/hub/styles/styles.css';
const localesList = {
  '': { ietf: 'en-US', tk: 'hah7vzn.css' },
  de: { ietf: 'de-DE', tk: 'hah7vzn.css' },
  kr: { ietf: 'ko-KR', tk: 'zfo3ouc' },
};

const locale = getLocale(localesList).prefix.replace('/', '');
let category = null;
let categoryImsClientId = null;

// Set content root based on locale
if (locale === '') {
  category = window.location.pathname.split('/')[1].toString();
} else {
  category = window.location.pathname.split('/')[2].toString();
}

// Set IMS client ID based on category.
switch (category) {
  case 'creativecloud':
    categoryImsClientId = 'adobedotcom-cc';
    break;
  case 'documentcloud':
    categoryImsClientId = 'DocumentCloud1';
    break;
  default:
    categoryImsClientId = 'DocumentCloud1';
    break;
}

const CONFIG = {
  codeRoot: '/hub',
  contentRoot: ['acrobat', 'documentcloud', 'creativecloud'],
  imsClientId: categoryImsClientId,
  locales: localesList,
};

// Default to loading the first image as eager.
(async function loadLCPImage() {
  const lcpImg = document.querySelector('img');
  lcpImg?.setAttribute('loading', 'eager');
}());

/*
 * ------------------------------------------------------------
 * Edit below at your own risk
 * ------------------------------------------------------------
 */

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

(async function loadPage() {
  setConfig({ ...CONFIG, miloLibs });
  await loadArea();
  loadDelayed();
}());
