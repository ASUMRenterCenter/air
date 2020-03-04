/*Required for the homepage to render a certain button result after click. Needs to be external the the file it is used in or it won't work.*/

import { createBrowserHistory } from 'history';

export default createBrowserHistory({forceRefresh:true});