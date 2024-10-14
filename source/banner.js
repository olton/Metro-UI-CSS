import {version} from "../package.json";

export const banner = `
/*!
 ███╗   ███╗███████╗████████╗██████╗  ██████╗     ██╗   ██╗██╗
 ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██║   ██║██║
 ██╔████╔██║█████╗     ██║   ██████╔╝██║   ██║    ██║   ██║██║
 ██║╚██╔╝██║██╔══╝     ██║   ██╔══██╗██║   ██║    ██║   ██║██║
 ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝    ╚██████╔╝██║
 ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚═╝                                                             

 * Metro UI v${version} Components Library  (https://metroui.org.ua)
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

globalThis.__version__ = version;
globalThis.__build_time__ = '__BUILD_TIME__';