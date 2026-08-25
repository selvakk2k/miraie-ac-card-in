function t(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,g=u?u.emptyScript:"",_=m.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>!r(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:f};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??f)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,_?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,x=t=>t,A=$.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,T="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,P=`<${S}>`,j=document,E=()=>j.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,z="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,O=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,F=/"/g,R=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,q=j.createTreeWalker(j,129);function G(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=M;for(let e=0;e<i;e++){const i=t[e];let r,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===M?"!--"===c[1]?a=H:void 0!==c[1]?a=L:void 0!==c[2]?(R.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=O):void 0!==c[3]&&(a=O):a===O?">"===c[0]?(a=o??M,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,r=c[1],a=void 0===c[3]?O:'"'===c[3]?F:U):a===F||a===U?a=O:a===H||a===L?a=M:(a=O,o=void 0);const h=a===O&&t[e+1].startsWith("/>")?" ":"";n+=a===M?i+P:l>=0?(s.push(r),i.slice(0,l)+T+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[c,l]=Y(t,e);if(this.el=J.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(T)){const e=l[n++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(R.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],E()),q.nextNode(),r.push({type:2,index:++o});s.append(t[e],E())}}}else if(8===s.nodeType)if(s.data===S)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===B)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=D(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=K(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??j).importNode(e,!0);q.currentNode=s;let o=q.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new Z(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new st(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=q.nextNode(),n++)}return q.currentNode=j,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),D(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.O(E()),this.O(E()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=K(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=K(this,s[i+a],e,a),r===B&&(r=this._$AH[a]),n||=!D(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(J,Z),($.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Z(e.insertBefore(E(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:f},lt=(t=ct,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return dt({...t,state:!0,attribute:!1})}const pt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)})`
  /* ──────────────────────────────────────────────────────────
     Default Token Layer (Standard Home Assistant)
     ────────────────────────────────────────────────────────── */
  :host {
    --miraie-accent:        var(--primary-color, #f39c12);

    /* Surfaces - color-mix ensures deep contrast in both light & dark themes */
    --m-bg:                 var(--ha-card-background, var(--card-background-color, var(--lovelace-background)));
    --m-surface:            color-mix(in srgb, var(--primary-text-color, #000) 10%, var(--ha-card-background, var(--card-background-color, #fff)));
    --m-surface-hover:      color-mix(in srgb, var(--primary-text-color, #000) 18%, var(--m-surface));
    --m-border:             color-mix(in srgb, var(--primary-text-color, #000) 24%, transparent);

    /* Text */
    --m-text:               var(--primary-text-color, #111111);
    --m-text-2:             color-mix(in srgb, var(--primary-text-color, #000) 80%, transparent);
    --m-on-accent:          var(--text-primary-color, var(--m-bg));

    /* Active state */
    --m-active-bg:          color-mix(in srgb, var(--miraie-accent) 22%, var(--m-surface));
    --m-active-border:      color-mix(in srgb, var(--miraie-accent) 75%, transparent);
  }

  /* ──────────────────────────────────────────────────────────
     Material You Token Layer (Activated via Config)
     ────────────────────────────────────────────────────────── */
  :host([theme="material_you"]) {
    --miraie-accent:        var(--md-sys-color-primary, var(--primary-color, #f39c12));

    --m-bg:                 var(--md-sys-color-surface-variant, var(--md-sys-color-surface, var(--ha-card-background, var(--card-background-color, var(--lovelace-background)))));
    --m-surface:            var(--md-sys-color-surface, color-mix(in srgb, var(--primary-text-color, #000) 10%, var(--ha-card-background, var(--card-background-color, #fff))));
    --m-surface-hover:      color-mix(in srgb, var(--md-sys-color-on-surface, var(--m-text)) 18%, var(--m-surface));
    --m-border:             var(--md-sys-color-outline-variant, var(--md-sys-color-outline, color-mix(in srgb, var(--primary-text-color, #000) 24%, transparent)));

    /* Text */
    --m-text:               var(--md-sys-color-on-surface, var(--primary-text-color, #111111));
    --m-text-2:             var(--md-sys-color-on-surface-variant, color-mix(in srgb, var(--primary-text-color, #000) 80%, transparent));
    --m-on-accent:          var(--md-sys-color-on-primary, var(--text-primary-color, var(--m-bg)));

    /* Active state */
    --m-active-bg:          var(--md-sys-color-secondary-container, color-mix(in srgb, var(--miraie-accent) 22%, var(--m-surface)));
    --m-active-border:      var(--md-sys-color-secondary, color-mix(in srgb, var(--miraie-accent) 75%, transparent));
  }

  ha-card {
    background: var(--m-bg);
    border-radius: 18px;
    padding: 20px 18px 18px;
    color: var(--m-text);
    font-family: inherit;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .header-left { display: flex; flex-direction: column; gap: 2px; }
  .title-row   { display: flex; align-items: center; gap: 8px; }

  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--disabled-color, #e74c3c); flex-shrink: 0;
    transition: background 0.3s;
  }
  .status-dot.online { background: #2ecc71; }

  .title   { font-size: 1.15rem; font-weight: 700; color: var(--m-text); line-height: 1.2; }
  .subtitle { font-size: 0.8rem; font-weight: 600; color: var(--m-text-2); }

  .power-btn {
    width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--m-border);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    background: var(--m-surface); color: var(--m-text);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); --mdc-icon-size: 22px;
  }
  .power-btn:hover:not(:disabled):not(.disabled) { background: var(--m-surface-hover); }
  .power-btn.on { 
    background: var(--miraie-accent);
    border-color: var(--miraie-accent);
    color: var(--m-on-accent);
    box-shadow: 0 4px 14px color-mix(in srgb, var(--miraie-accent) 40%, transparent);
  }
  .power-btn:disabled, .power-btn.disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── Temperature block ── */
  .temp-block {
    background: var(--m-surface); border: 1.5px solid var(--m-border);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 22px;
  }
  .temp-btn {
    width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--m-border);
    background: var(--m-bg); color: var(--m-text); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s; --mdc-icon-size: 20px;
  }
  .temp-btn:hover:not(:disabled):not(.disabled) { background: var(--m-surface-hover); }
  .temp-btn:disabled, .temp-btn.disabled { opacity: 0.55; cursor: not-allowed; }
  .temp-center { text-align: center; }
  .temp-value  { font-size: 2rem; font-weight: 800; letter-spacing: -1px; color: var(--m-text); }
  .temp-meta {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; margin-top: 8px;
  }
  .temp-meta-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.95rem; font-weight: 600; color: var(--m-text);
  }
  .temp-meta-item ha-icon { --mdc-icon-size: 16px; color: var(--m-text-2); }

  /* ── Generic section ── */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--m-text); opacity: 0.9; margin-bottom: 8px;
  }

  /* ── Action Buttons / Pills ── */
  .pills {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    gap: 8px;
  }
  .pill {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    padding: 10px 8px; border-radius: 12px;
    border: 1px solid var(--m-border);
    background: var(--m-surface); color: var(--m-text);
    font-size: 0.82rem; font-weight: 700; cursor: pointer; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; min-width: 0;
    transition: all 0.18s ease; --mdc-icon-size: 15px;
  }
  .pill:hover:not(:disabled):not(.disabled) {
    background: var(--m-surface-hover);
    border-color: color-mix(in srgb, var(--miraie-accent) 40%, var(--m-border));
  }
  .pill.active {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: color-mix(in srgb, var(--miraie-accent) 85%, #000);
    font-weight: 800;
  }
  .pill:disabled, .pill.disabled {
    opacity: 0.55;
    cursor: not-allowed;
    color: color-mix(in srgb, var(--m-text) 65%, transparent);
    background: color-mix(in srgb, var(--primary-text-color, #000) 4%, var(--m-surface));
    border-color: color-mix(in srgb, var(--primary-text-color, #000) 14%, transparent);
  }
  .pill.active:disabled, .pill.active.disabled,
  .gh-chip.active[style*="not-allowed"] {
    opacity: 0.8;
    cursor: not-allowed;
    background: color-mix(in srgb, var(--miraie-accent) 18%, var(--m-surface));
    border-color: color-mix(in srgb, var(--miraie-accent) 55%, transparent);
    color: color-mix(in srgb, var(--miraie-accent) 85%, #000);
  }

  @media (max-width: 450px) {
    .pills {
      gap: 6px;
      grid-template-columns: repeat(auto-fit, minmax(65px, 1fr));
    }
    .pill { padding: 8px 4px; font-size: 0.74rem; gap: 4px; border-radius: 10px; }
    .pill ha-icon { --mdc-icon-size: 13px; flex-shrink: 0; }
  }

  /* ── Picker panel (fan / swing) ── */
  .picker-panel {
    margin-top: 8px; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 14px; display: flex; flex-wrap: wrap; gap: 8px;
    animation: slideDown 0.15s ease;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .picker-opt {
    padding: 8px 16px; border-radius: 16px;
    border: 1px solid var(--m-border);
    background: transparent; color: var(--m-text-2);
    font-size: 0.85rem; cursor: pointer; transition: all 0.15s;
  }
  .picker-opt:hover { background: var(--m-surface-hover); }
  .picker-opt.sel {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent); font-weight: 600;
  }

  /* ── Step slider (Convertible mode) ── */
  .step-slider-wrap {
    margin-top: 8px; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 16px 16px 12px;
    animation: slideDown 0.15s ease;
  }
  .step-slider-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 18px;
  }
  .step-slider-title { font-size: 0.82rem; font-weight: 600; }
  .step-slider-val { font-size: 0.9rem; font-weight: 800; color: var(--miraie-accent); }
  .step-track-outer {
    position: relative; height: 4px; margin: 16px 6px 28px;
  }
  .step-track-bg {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: var(--m-border); border-radius: 2px;
  }
  .step-track-fill {
    height: 100%; background: var(--miraie-accent); border-radius: 2px;
    transition: width 0.3s ease;
  }
  .step-notches {
    position: absolute; top: -4px; left: 0; width: 100%; height: 12px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .notch-wrapper {
    position: relative; display: flex; justify-content: center; width: 12px; height: 12px;
  }
  .step-notch {
    width: 12px; height: 12px; border-radius: 50%; padding: 0;
    background: var(--m-surface-hover); border: 2px solid var(--m-border);
    cursor: pointer; transition: all 0.2s;
  }
  .step-notch:hover:not(:disabled) { transform: scale(1.3); }
  .step-notch.filled { background: var(--miraie-accent); border-color: var(--miraie-accent); }
  .step-notch.current {
    transform: scale(1.4); background: var(--miraie-accent);
    border-color: var(--m-surface); box-shadow: 0 0 0 1px var(--miraie-accent);
  }
  .step-notch:disabled { cursor: not-allowed; opacity: 0.4; }
  
  .notch-label {
    position: absolute; top: 16px; font-size: 0.65rem; color: var(--m-text-2); font-weight: 600;
  }
  .notch-label.current { color: var(--miraie-accent); font-weight: 700; }
  .step-label { font-size: 0.65rem; color: var(--m-text-2); }

  /* ── Toggle Cards (controls) ── */
  .toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .toggle-card {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px; border-radius: 14px;
    border: 1px solid var(--m-border); background: var(--m-surface);
    cursor: pointer; transition: background 0.15s;
    overflow: hidden;
  }
  .toggle-card:hover:not(.disabled) { background: var(--m-surface-hover); }
  .toggle-card.disabled { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }
  .toggle-card ha-switch { pointer-events: none; }
  .toggle-left { display: flex; align-items: center; gap: 9px; }
  .toggle-icon {
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    background: var(--m-surface-hover); color: var(--m-text-2);
    --mdc-icon-size: 17px;
  }
  .toggle-icon.active { background: var(--m-active-bg); color: var(--miraie-accent); }
  .toggle-label { font-size: 0.8rem; }
  .toggle-action { --mdc-icon-size: 18px; color: var(--m-text-2); margin-right: 2px; }

  /* ── Filter Alert Banner ── */
  .alert-banner {
    border-radius: 14px; border: 1px solid rgba(244,67,54,0.35);
    background: rgba(244,67,54,0.06); padding: 12px 14px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }
  .alert-left { display: flex; align-items: center; gap: 9px; }
  .alert-icon { color: var(--error-color, #f44336); --mdc-icon-size: 20px; }
  .alert-text { font-size: 0.82rem; font-weight: 700; color: var(--error-color, #f44336); }
  .alert-hint { font-size: 0.72rem; color: var(--error-color, #f44336); }

  /* ── Energy Cards ── */
  .energy-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .energy-card {
    flex: 1; border-radius: 14px;
    background: var(--m-surface); border: 1px solid var(--m-border);
    padding: 12px 14px; cursor: pointer; transition: background 0.15s;
  }
  .energy-card:hover { background: var(--m-surface-hover); }
  .energy-label {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.7rem; font-weight: 600; color: var(--m-text-2);
    text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
  }
  .energy-label ha-icon { --mdc-icon-size: 14px; color: var(--miraie-accent); }
  .energy-value-row { display: flex; align-items: baseline; gap: 4px; }
  .energy-value { font-size: 1.4rem; font-weight: 800; }
  .energy-unit  { font-size: 0.75rem; color: var(--m-text-2); }

  /* ── Footer ── */
  .footer {
    display: flex; align-items: center; justify-content: center;
    gap: 5px; padding-top: 12px; border-top: 1px solid var(--m-border);
    margin-top: 6px; font-size: 0.72rem; color: var(--m-text-2);
  }
  .footer ha-icon { --mdc-icon-size: 13px; }

  /* ── Error ── */
  .error { padding: 20px; color: var(--error-color, #f44336); text-align: center; font-size: 0.85rem; }

  /* ──────────────────────────────────────────────────────────
     Compact View (Google Home Style)
     ────────────────────────────────────────────────────────── */
  .compact-card {
    cursor: pointer;
    transition: background 0.2s;
    background: var(--m-bg);
    border-radius: 28px;
    padding: 4px;
    box-sizing: border-box;
  }
  .compact-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 12px 0 12px;
  }
  .compact-icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--m-border);
    color: var(--m-text-2);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .compact-icon-btn:hover {
    background: rgba(128, 128, 128, 0.15);
  }
  .compact-icon-btn.on {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent);
  }
  .compact-title {
    font-weight: 500;
    font-size: 1rem;
    flex: 1;
    margin-left: 4px;
    color: var(--m-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .compact-chevron {
    color: var(--m-text-2);
    opacity: 0.5;
  }
  .compact-center {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
  .compact-value {
    font-size: 2.5rem;
    font-weight: 400;
    color: var(--m-text);
  }
  .compact-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 12px 12px;
  }
  .compact-action-btn {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: transparent;
    border: 1px solid var(--m-border);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--m-text);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .compact-action-btn:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.15);
  }
  .compact-action-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .compact-subtitle {
    color: var(--m-text-2);
    font-size: 0.9rem;
    font-weight: 500;
  }

  /* ──────────────────────────────────────────────────────────
     Google Home Full View
     ────────────────────────────────────────────────────────── */
  .gh-full-card {
    background: var(--m-bg);
    border-radius: 28px;
    padding: 16px;
    box-sizing: border-box;
  }
  .gh-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24px;
  }
  .gh-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .gh-icon {
    color: var(--m-text-2);
    --mdc-icon-size: 20px;
  }
  .gh-title {
    font-weight: 500;
    font-size: 1.05rem;
    color: var(--m-text);
  }
  .gh-power-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--m-text-2);
    cursor: pointer;
    transition: 0.2s;
    outline: none;
  }
  .gh-power-btn:hover {
    background: rgba(128, 128, 128, 0.15);
  }
  .gh-power-btn.on {
    background: var(--m-active-bg);
    color: var(--miraie-accent);
  }
  .gh-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 0 16px 0;
  }
  .gh-value-large {
    font-size: 5rem;
    font-weight: 400;
    line-height: 1.1;
    color: var(--m-text);
  }
  .gh-subtitle-large {
    font-size: 1rem;
    font-weight: 500;
    color: var(--m-text-2);
    margin-top: 8px;
  }
  .gh-mode-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--m-text);
    letter-spacing: 0.02em;
  }
  .gh-action-row {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }
  .gh-circular-btn {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(128, 128, 128, 0.15);
    border: none;
    color: var(--m-text);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    --mdc-icon-size: 32px;
  }
  .gh-circular-btn:hover {
    background: rgba(128, 128, 128, 0.25);
  }
  .gh-circular-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .gh-select-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 8px;
  }
  .gh-select-wrapper {
    flex: 1 1 calc(33.33% - 8px);
    min-width: 120px;
    position: relative;
  }
  .gh-select-wrapper.active {
    z-index: 100;
  }
  .gh-custom-select {
    width: 100%;
    background: rgba(128, 128, 128, 0.15);
    border-radius: 20px;
    border: none;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 0 16px;
    color: var(--m-text);
    font-size: 0.95rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .gh-custom-select span,
  .gh-custom-select ha-icon {
    pointer-events: none;
  }
  .gh-custom-select ha-icon {
    color: var(--m-text-2);
    --mdc-icon-size: 20px;
  }
  .gh-dropdown-menu {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    width: 100%;
    background: var(--m-surface, var(--card-background-color));
    border: 1px solid rgba(128, 128, 128, 0.2);
    border-radius: 16px;
    overflow: hidden;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
  }
  .gh-dropdown-item {
    width: 100%;
    text-align: left;
    border: none;
    background: transparent;
    font-family: inherit;
    padding: 12px 16px;
    font-size: 0.95rem;
    color: var(--m-text);
    transition: 0.2s;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .gh-dropdown-item:hover {
    background: rgba(128, 128, 128, 0.1);
  }
  .gh-dropdown-item.active {
    color: var(--miraie-accent);
    background: rgba(128, 128, 128, 0.05);
  }
  .gh-extra-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding-top: 16px;
  }
  .gh-footer-text {
    text-align: center;
    font-size: 0.75rem;
    color: var(--m-text-2);
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    opacity: 0.6;
    --mdc-icon-size: 14px;
  }
  .gh-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 16px;
    background: rgba(128, 128, 128, 0.15);
    color: var(--m-text-2);
    font-size: 0.8rem;
    cursor: pointer;
    transition: 0.2s;
    --mdc-icon-size: 16px;
  }
  .gh-chip:hover {
    background: rgba(128, 128, 128, 0.25);
  }
  .gh-chip.active {
    color: var(--miraie-accent);
  }
  .gh-chip.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .gh-chip-text {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 16px;
    background: rgba(128, 128, 128, 0.15);
    color: var(--m-text-2);
    font-size: 0.8rem;
    --mdc-icon-size: 16px;
  }
`,mt={type:"miraie-ac-card-in",name:"MirAIe AC Card",description:"A premium thermostat card for Panasonic MirAIe AC units",preview:!0,domain:"climate",domains:["climate"],documentationURL:"https://github.com/selvakk2k/miraie-ac-card-in"};window.customCards=window.customCards||[];const ut=window.customCards.findIndex(t=>"miraie-ac-card-in"===t.type||"custom:miraie-ac-card-in"===t.type);function gt(t){const e=/^cv[\s_]+(\d+)$/.exec((t??"").trim());return e?parseInt(e[1],10):-1}function _t(t){const e=Number(t);return isNaN(e)?String(t):e.toFixed(2)}ut>=0?window.customCards[ut]=mt:window.customCards.push(mt);let vt=class extends at{constructor(){super(...arguments),this._openPanel=null,this._expanded=!1,this._ghDropdown=null,this._handleWindowClick=t=>{const e=t.composedPath();this._ghDropdown&&!e.includes(this)&&(this._ghDropdown=null)}}static get styles(){return pt}connectedCallback(){super.connectedCallback(),window.addEventListener("click",this._handleWindowClick)}disconnectedCallback(){window.removeEventListener("click",this._handleWindowClick),super.disconnectedCallback()}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate",integration:"miraie_in"}}},{name:"name",selector:{text:{}}},{name:"theme",selector:{select:{options:[{label:"Default HA Theme",value:"default"},{label:"Material You",value:"material_you"}]}}},{name:"layout",selector:{select:{options:[{label:"Default (Full)",value:"default"},{label:"Compact (Expandable)",value:"compact"}]}}},{name:"full_layout",selector:{select:{options:[{label:"Classic",value:"default"},{label:"Google Home",value:"google_home"}]}}},{name:"accent_color",selector:{ui_color:{}}},{name:"main_color",selector:{ui_color:{}}},{name:"",type:"expandable",title:"Display Sensors",icon:"mdi:thermometer",schema:[{name:"room_temp_sensor",selector:{entity:{domain:"sensor",device_class:"temperature"}}},{name:"humidity_sensor",selector:{entity:{domain:"sensor",device_class:"humidity"}}}]},{name:"",type:"expandable",title:"2.0 Hybrid Transport Architecture (Auto-Discovered if blank)",icon:"mdi:swap-horizontal-circle-outline",schema:[{name:"hybrid_submode_switch",selector:{entity:{domain:"switch",integration:"miraie_in"}}},{name:"active_backend_switch",selector:{entity:{domain:"switch",integration:"miraie_in"}}},{name:"ir_blaster_sensor",selector:{entity:{domain:["binary_sensor","infrared","remote"]}}},{name:"cloud_mqtt_sensor",selector:{entity:{domain:"binary_sensor",integration:"miraie_in"}}},{name:"control_source_sensor",selector:{entity:{domain:"sensor",integration:"miraie_in"}}}]},{name:"",type:"expandable",title:"Convertible & Controls",icon:"mdi:toggle-switch-outline",schema:[{name:"nanoe_switch",selector:{entity:{domain:"switch",integration:"miraie_in"}}},{name:"display_switch",selector:{entity:{domain:"switch",integration:"miraie_in"}}},{name:"coil_clean_button",selector:{entity:{domain:"button",integration:"miraie_in"}}},{name:"coil_cleaning_sensor",selector:{entity:{domain:"binary_sensor",integration:"miraie_in"}}},{name:"filter_alert_sensor",selector:{entity:{domain:"binary_sensor",integration:"miraie_in"}}}]},{name:"",type:"expandable",title:"Diagnostics & Energy",icon:"mdi:chart-line",schema:[{name:"rssi_sensor",selector:{entity:{domain:"sensor",integration:"miraie_in"}}},{name:"energy_today_sensor",selector:{entity:{domain:"sensor",integration:"miraie_in"}}},{name:"energy_yesterday_sensor",selector:{entity:{domain:"sensor",integration:"miraie_in"}}}]}]}}static getStubConfig(t,e,i){let s="";return e&&e.length&&(s=e.find(t=>t.startsWith("climate."))||""),!s&&i&&i.length&&(s=i.find(t=>t.startsWith("climate."))||""),!s&&t&&t.states&&(s=Object.keys(t.states).find(t=>t.startsWith("climate."))||""),{type:"custom:miraie-ac-card-in",entity:s}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...t},this._openPanel=null}updated(t){if(super.updated(t),t.has("_config")){const t=this._config?.theme||"default";this.getAttribute("theme")!==t&&this.setAttribute("theme",t)}}shouldUpdate(t){if(t.has("_config")||t.has("_openPanel")||t.has("_expanded")||t.has("_ghDropdown"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");if(!e)return!0;const i=this._config;if(!i.entity)return!0;const s=i.entity.replace(/^climate\./,""),o=Object.keys(this.hass.states);for(const t of o)if((t===i.entity||t.includes(s))&&e.states[t]!==this.hass.states[t])return!0;return!1}return!1}render(){if(!this.hass||!this._config)return null;const t=this._config;if(!t.entity)return I`
        <ha-card class="m-card" style="padding: 24px; text-align: center;">
          <div style="font-size: 16px; font-weight: 700; color: var(--primary-text-color);">MirAIe AC Card</div>
          <div style="font-size: 13px; color: var(--secondary-text-color); margin-top: 8px;">
            Please select a Panasonic MirAIe climate entity in the card editor below.
          </div>
        </ha-card>
      `;const e=this.hass.states[t.entity];if(!e)return I`
        <ha-card class="m-card" style="padding: 24px; text-align: center;">
          <div style="font-size: 16px; font-weight: 700; color: var(--primary-text-color);">MirAIe AC Card</div>
          <div style="font-size: 13px; color: var(--error-color, #e53935); margin-top: 8px;">
            Entity not found: <code>${t.entity}</code>
          </div>
        </ha-card>
      `;const i=e.attributes,s="unavailable"!==e.state&&"unknown"!==e.state,o="off"!==e.state&&s,n=t.name||i.friendly_name||"AC",a=i.temperature,r=i.min_temp??16,c=i.max_temp??30,l=i.preset_mode,d="eco"===l?16:r,h="eco"===l?30:c,p=e.state,m=i.fan_mode,u=i.swing_mode,g=i.swing_horizontal_mode,_=t.room_temp_sensor?this.hass.states[t.room_temp_sensor]:void 0;let v=_?_.state:i.current_temperature;null==v||isNaN(Number(v))||(v=Number(v).toFixed(1));const b=t.humidity_sensor?this.hass.states[t.humidity_sensor]:void 0;let f=b?b.state:void 0;null==f||isNaN(Number(f))||(f=Number(f).toFixed(1));const y=t.nanoe_switch?this.hass.states[t.nanoe_switch]:void 0,w=t.display_switch?this.hass.states[t.display_switch]:void 0,$=t.coil_clean_button?this.hass.states[t.coil_clean_button]:void 0,x=t.coil_cleaning_sensor?this.hass.states[t.coil_cleaning_sensor]:void 0,A=t.filter_alert_sensor?this.hass.states[t.filter_alert_sensor]:void 0,k=t.rssi_sensor?this.hass.states[t.rssi_sensor]:void 0,T=t.energy_today_sensor?this.hass.states[t.energy_today_sensor]:void 0,C=t.energy_yesterday_sensor?this.hass.states[t.energy_yesterday_sensor]:void 0,S="on"===x?.state,P=t.entity.replace(/^climate\./,""),j=(t,e,i)=>{if(t&&this.hass.states[t])return this.hass.states[t];for(const t of i){const i=`${e}.${t}`;if(this.hass.states[i])return this.hass.states[i]}const s=Object.keys(this.hass.states);for(const t of i){const i=s.find(i=>i.startsWith(`${e}.${P}_`)&&i.includes(t));if(i)return this.hass.states[i]}},E=j(t.hybrid_submode_switch,"switch",[`${P}_hybrid_automatic_control`,`${P}_hybrid_submode`,`${P}_hybrid_control`,"hybrid"]),D=j(t.active_backend_switch,"switch",[`${P}_primary_transport_backend_cloud`,`${P}_primary_transport_backend`,`${P}_active_backend`,"backend","transport"]),N=j(t.ir_blaster_sensor,"binary_sensor",[`${P}_ir_blaster_available`,`${P}_ir_transmitter_available`,`${P}_ir_blaster_transmitter_availability`,"ir_blaster"]),z=j(t.cloud_mqtt_sensor,"binary_sensor",[`${P}_cloud_mqtt_connected`,`${P}_cloud_mqtt`,"cloud_mqtt"]),M=j(t.control_source_sensor,"sensor",[`${P}_last_controlled_via`,`${P}_control_source`,"last_controlled_via"]);let H=[],L="cv_";i.preset_modes&&i.preset_modes.some(t=>/^cv[\s_]/.test(t))&&(H=i.preset_modes.filter(t=>/^cv[\s_]/.test(t)),L=H[0].substring(0,3),H.includes(`${L}0`)||H.push(`${L}0`));let O=i.preset_mode&&/^cv[\s_]/.test(i.preset_mode)?i.preset_mode:`${L}0`;const U=H.filter(t=>gt(t)>0).sort((t,e)=>gt(t)-gt(e)),F=[`${L}0`,...U],R=F.indexOf(O),B=(W=H,W?.length?W.some(t=>60===gt(t))&&W.some(t=>50===gt(t))?"Converti8":"Converti7":"Convertible");var W;const V=U.length>0?R/(F.length-1)*100:0;let q="";if(this._config.accent_color)if(Array.isArray(this._config.accent_color))q=`rgb(${this._config.accent_color.join(",")})`;else if("string"==typeof this._config.accent_color){const t=this._config.accent_color.toLowerCase();q="primary"===t?"var(--primary-color)":"accent"===t?"var(--accent-color)":/^[a-z-]+$/.test(t)?`var(--${t}-color, ${t})`:t}let G="";if(this._config.main_color)if(Array.isArray(this._config.main_color))G=`rgb(${this._config.main_color.join(",")})`;else if("string"==typeof this._config.main_color){const t=this._config.main_color.toLowerCase();G="primary"===t?"var(--primary-color)":"accent"===t?"var(--accent-color)":/^[a-z-]+$/.test(t)?`var(--${t}-color, ${t})`:t}const Y=`${q?`--miraie-accent: ${q}; `:""}${G?`--m-bg: ${G}; `:""}`;if("compact"===t.layout&&!this._expanded)return this._renderCompact(e,n,o,a,v,f,p,r,c,Y);if("google_home"===t.full_layout)return this._renderGoogleHomeFull(e,n,o,a,v,f,p,r,c,Y);let J=[];if(o){if(J.push(this._modeLabel(p)),l&&"none"!==l)if(/^cv[\s_]/.test(l)){const t=gt(l);J.push(0===t?"Normal Limit":t+"% Limit")}else J.push(this._presetLabel(l));J.push(`Fan: ${m??"Auto"}`)}return I`
      <ha-card style="${Y}">

        <!-- ── Header ── -->
        <div class="header">
          <div class="header-left">
            <div class="title-row">
              <span class="status-dot ${s?"online":""}"></span>
              <span class="title">${n}</span>
            </div>
            <div class="subtitle">
              ${s?o?J.join(" • "):"Off":"Offline"}
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            ${"compact"===t.layout?I`
              <button class="power-btn" style="background: transparent;" @click=${()=>{this._haptic("light"),this._expanded=!1}}>
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
            `:""}
            <button
              class="power-btn ${o?"on":""} ${!s||S?"disabled":""}"
              title="${S?"Power cannot be toggled while coil cleaning is active":s?"Toggle Power":"Device is offline"}"
              @click=${()=>{S?this._showToast("Power cannot be toggled while coil cleaning is active"):s?this._togglePower(e):this._showToast("Device is offline")}}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-block">
          <button
            class="temp-btn ${!o||"fan_only"===p||null!=a&&Number(a)<=Number(d)||S?"disabled":""}"
            title="${S?"Temperature cannot be adjusted while coil cleaning is active":o?"fan_only"===p?"Temperature cannot be adjusted in Fan Only mode":null!=a&&Number(a)<=Number(d)?`Minimum temperature reached (${d}°)`:"Decrease Temperature":"Turn on the AC to adjust temperature"}"
            @click=${()=>{S?this._showToast("Temperature cannot be adjusted while coil cleaning is active"):o?"fan_only"===p?this._showToast("Temperature cannot be adjusted in Fan Only mode"):null!=a&&Number(a)<=Number(d)?this._showToast(`Minimum temperature reached (${d}°)`):this._adjustTemp(-1,a,d):this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>

          <div class="temp-center">
            <div class="temp-value">
              ${o?"fan_only"===p?"FA":null!=a?`${a}°C`:"--":"--"}
            </div>
            <div class="temp-meta">
              <span class="temp-meta-item">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                ${null!=v?`${v}°C`:"--"}
              </span>
              ${b?I`
                <span class="temp-meta-item">
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  ${f}%
                </span>
              `:""}
            </div>
          </div>

          <button
            class="temp-btn ${!o||"fan_only"===p||null!=a&&Number(a)>=Number(h)||S?"disabled":""}"
            title="${S?"Temperature cannot be adjusted while coil cleaning is active":o?"fan_only"===p?"Temperature cannot be adjusted in Fan Only mode":null!=a&&Number(a)>=Number(h)?`Maximum temperature reached (${h}°)`:"Increase Temperature":"Turn on the AC to adjust temperature"}"
            @click=${()=>{S?this._showToast("Temperature cannot be adjusted while coil cleaning is active"):o?"fan_only"===p?this._showToast("Temperature cannot be adjusted in Fan Only mode"):null!=a&&Number(a)>=Number(h)?this._showToast(`Maximum temperature reached (${h}°)`):this._adjustTemp(1,a,h):this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <!-- ── Filter Alert (always visible if entity configured + active) ── -->
        ${"on"===A?.state?I`
          <div class="alert-banner">
            <div class="alert-left">
              <ha-icon class="alert-icon" icon="mdi:air-filter"></ha-icon>
              <span class="alert-text">Dirty Filter Alert!</span>
            </div>
            <span class="alert-hint">Clean your filter</span>
          </div>
        `:""}

        <!-- ── 2.0 Hybrid Transport Controls ── -->
        ${D||E?I`
          <div class="section">
            <div class="section-title">Hybrid Transport</div>
            <div class="pills">
              ${D?I`
                ${(()=>{const t="cloud"===D.state||"on"===D.state,e=E&&("auto"===E.state||"on"===E.state);return I`
                    <button
                      class="pill ${t?"active":""} ${e||S?"disabled":""}"
                      title="${e?"Backend transport is managed automatically in Auto Failover mode":S?"Backend cannot be switched while coil cleaning is active":"Click to toggle primary transport backend"}"
                      @click=${()=>{e?this._showToast("Backend transport is managed automatically in Auto Failover mode"):S?this._showToast("Backend cannot be switched while coil cleaning is active"):this._toggleSwitch(D.entity_id,D.state)}}
                    >
                      <ha-icon icon="${t?"mdi:cloud-sync":"mdi:remote"}"></ha-icon>
                      Backend: ${t?"Cloud":"IR"}
                    </button>
                  `})()}
              `:""}

              ${E?I`
                <button
                  class="pill ${"auto"===E.state||"on"===E.state?"active":""} ${S?"disabled":""}"
                  title="${S?"Hybrid mode cannot be toggled while coil cleaning is active":"Click to toggle between Auto Failover and Manual backend"}"
                  @click=${()=>{S?this._showToast("Hybrid mode cannot be toggled while coil cleaning is active"):this._toggleSwitch(E.entity_id,E.state)}}
                >
                  <ha-icon icon="${"auto"===E.state||"on"===E.state?"mdi:refresh-auto":"mdi:hand-back-right"}"></ha-icon>
                  ${"auto"===E.state||"on"===E.state?"Auto Failover":"Manual"}
                </button>
              `:""}

              ${M&&M.state&&"unknown"!==M.state&&"unavailable"!==M.state?I`
                <div class="pill" style="cursor: default; opacity: 0.85;" title="Last control origin">
                  <ha-icon icon="${"cloud"===M.state?"mdi:cloud-outline":"ir"===M.state?"mdi:remote":"mdi:information-outline"}"></ha-icon>
                  Via: ${this._sourceLabel(M.state)}
                </div>
              `:""}
            </div>
          </div>
        `:""}

        <!-- ── HVAC Modes ── -->
        <div class="section">
          <div class="section-title">Modes</div>
          <div class="pills">
            ${(i.hvac_modes||[]).filter(t=>"off"!==t).map(t=>I`
              <button
                class="pill ${p===t&&o?"active":""} ${!s||S?"disabled":""}"
                title="${S?"HVAC mode cannot be changed while coil cleaning is active":s?this._modeLabel(t):"Device is offline"}"
                @click=${()=>{S?this._showToast("HVAC mode cannot be changed while coil cleaning is active"):s?this._setHvacMode(t):this._showToast("Device is offline")}}
              >
                <ha-icon icon="${this._modeIcon(t)}"></ha-icon>
                ${this._modeLabel(t)}
              </button>
            `)}
          </div>
        </div>

        <!-- ── Fan & Swing ── -->
        <div class="section">
          <div class="section-title">Fan & Swing</div>
          <div class="pills">
            <button
              class="pill ${"fan"===this._openPanel?"active":""} ${!o||"dry"===p||S?"disabled":""}"
              title="${S?"Fan speed cannot be changed while coil cleaning is active":o?"dry"===p?"Fan speed is automatically managed in Dry mode":"Adjust fan speed":"Turn on the AC to adjust fan speed"}"
              @click=${()=>{S?this._showToast("Fan speed cannot be changed while coil cleaning is active"):o?"dry"===p?this._showToast("Fan speed is automatically managed in Dry mode"):this._togglePanel("fan"):this._showToast("Turn on the AC to adjust fan speed")}}
            >
              <ha-icon icon="mdi:fan"></ha-icon>
              Fan: ${m?m.charAt(0).toUpperCase()+m.slice(1):"Auto"}
            </button>

            ${null!=u?I`
              <button
                class="pill ${"swing_v"===this._openPanel?"active":""} ${!o||S?"disabled":""}"
                title="${S?"Swing vanes cannot be adjusted while coil cleaning is active":o?"Adjust vertical swing":"Turn on the AC to adjust swing vanes"}"
                @click=${()=>{S?this._showToast("Swing vanes cannot be adjusted while coil cleaning is active"):o?this._togglePanel("swing_v"):this._showToast("Turn on the AC to adjust swing vanes")}}
              >
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                V-Swing: ${"Auto Swing"===u?"Auto":u}
              </button>
            `:""}

            ${null!=g?I`
              <button
                class="pill ${"swing_h"===this._openPanel?"active":""} ${!o||S?"disabled":""}"
                title="${S?"Horizontal swing cannot be adjusted while coil cleaning is active":o?"Adjust horizontal swing":"Turn on the AC to adjust horizontal swing"}"
                @click=${()=>{S?this._showToast("Horizontal swing cannot be adjusted while coil cleaning is active"):o?this._togglePanel("swing_h"):this._showToast("Turn on the AC to adjust horizontal swing")}}
              >
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                H-Swing: ${"Auto Swing"===g?"Auto":g}
              </button>
            `:""}
          </div>

          ${"fan"===this._openPanel?I`
            <div class="picker-panel">
              ${(i.fan_modes||[]).map(t=>I`
                <button class="picker-opt ${m===t?"sel":""}"
                        @click=${()=>{this._setFanMode(e,t),this._openPanel=null}}>
                  ${t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              `)}
            </div>
          `:""}

          ${"swing_v"===this._openPanel?I`
            <div class="picker-panel">
              ${(i.swing_modes||[]).map(t=>I`
                <button class="picker-opt ${u===t?"sel":""}"
                        @click=${()=>{this._setSwing(e,t),this._openPanel=null}}>
                  ${t}
                </button>
              `)}
            </div>
          `:""}

          ${"swing_h"===this._openPanel?I`
            <div class="picker-panel">
              ${(i.swing_horizontal_modes||[]).map(t=>I`
                <button class="picker-opt ${g===t?"sel":""}"
                        @click=${()=>{this._setHSwing(e,t),this._openPanel=null}}>
                  ${t}
                </button>
              `)}
            </div>
          `:""}
        </div>

        <!-- ── Comfort Presets ── -->
        <div class="section">
          <div class="section-title">Comfort Presets</div>
          <div class="pills">
            ${["none","eco","boost"].map(t=>{const e=!o||["dry","auto","fan_only"].includes(p)&&"none"!==t||S||R>0&&"none"!==t;return I`
                <button
                  class="pill ${l===t?"active":""} ${e?"disabled":""}"
                  title="${S?"Presets cannot be changed while coil cleaning is active":o?["dry","auto","fan_only"].includes(p)&&"none"!==t?`Presets are not available in ${this._modeLabel(p)} mode`:R>0&&"none"!==t?"Presets cannot be changed while capacity limit is active":"none"===t?"Normal":t.charAt(0).toUpperCase()+t.slice(1):"Turn on the AC to select presets"}"
                  @click=${()=>{S?this._showToast("Presets cannot be changed while coil cleaning is active"):o?["dry","auto","fan_only"].includes(p)&&"none"!==t?this._showToast(`Presets are not available in ${this._modeLabel(p)} mode`):R>0&&"none"!==t?this._showToast("Presets cannot be changed while capacity limit is active"):this._setPreset(t):this._showToast("Turn on the AC to select presets")}}
                >
                  <ha-icon icon="${this._presetIcon(t)}"></ha-icon>
                  ${this._presetLabel(t)}
                </button>
              `})}
          </div>
        </div>

        <!-- ── Convertible Mode — stepped notch slider ── -->
        ${U.length>0?I`
          <div class="section" style="${["dry","auto","fan_only"].includes(p)||S?"opacity: 0.5;":""}">
            <div class="section-title">${B}</div>
            <div class="step-slider-wrap">
              <div class="step-slider-header">
                <span class="step-slider-title">Capacity Limit</span>
                <span class="step-slider-val">
                  ${0===R?"Normal":`${gt(O)}%`}
                </span>
              </div>

              <!-- Track + notch dots -->
              <div class="step-track-outer">
                <div class="step-track-bg">
                  <div class="step-track-fill" style="width: ${V}%"></div>
                </div>
                <div class="step-notches">
                  ${F.map((t,e)=>{const i=["eco","boost","powerful"].includes(l),s=!o||["dry","auto","fan_only"].includes(p)||S||i&&e>0;return I`
                      <div class="notch-wrapper">
                        <button
                          class="step-notch
                            ${e<R?"filled":""}
                            ${e===R?"current":""}
                            ${s?"disabled":""}"
                          title="${S?"Capacity limit cannot be changed while coil cleaning is active":o?["dry","auto","fan_only"].includes(p)?`Capacity limit is not available in ${this._modeLabel(p)} mode`:i&&e>0?`Capacity limit cannot be changed while ${this._presetLabel(l)} mode is active`:0===e?"Normal":`${gt(t)}%`:"Turn on the AC to set capacity limits"}"
                          @click=${()=>{S?this._showToast("Capacity limit cannot be changed while coil cleaning is active"):o?["dry","auto","fan_only"].includes(p)?this._showToast(`Capacity limit is not available in ${this._modeLabel(p)} mode`):i&&e>0?this._showToast(`Capacity limit cannot be changed while ${this._presetLabel(l)} mode is active`):this._setPreset(t):this._showToast("Turn on the AC to set capacity limits")}}
                        ></button>
                        <span class="notch-label ${e===R?"current":""}">${0===e?"N":gt(t)}</span>
                      </div>
                    `})}
                </div>
              </div>
            </div>
          </div>
        `:""}

        <!-- ── Controls (Nanoe, Display, Coil Clean) ── -->
        ${y||w||$?I`
          <div class="section">
            <div class="section-title">Controls</div>
            <div class="toggles">
              ${y?I`
                <div class="toggle-card ${!s||S?"disabled":""}"
                     title="${S?"Nanoe cannot be toggled while coil cleaning is active":s?"Toggle Nanoe™ air purification":"Device is offline"}"
                     @click=${()=>{S?this._showToast("Nanoe cannot be toggled while coil cleaning is active"):s?this._toggleSwitch(t.nanoe_switch,y.state):this._showToast("Device is offline")}}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===y.state?"active":""}">
                      <ha-icon icon="mdi:air-purifier"></ha-icon>
                    </div>
                    <span class="toggle-label">nanoe™</span>
                  </div>
                  <ha-switch .checked=${"on"===y.state} ?disabled=${!s}></ha-switch>
                </div>
              `:""}
              ${w?I`
                <div class="toggle-card ${!s||S?"disabled":""}"
                     title="${S?"Display LED cannot be toggled while coil cleaning is active":s?"Toggle indoor unit LED display":"Device is offline"}"
                     @click=${()=>{S?this._showToast("Display LED cannot be toggled while coil cleaning is active"):s?this._toggleSwitch(t.display_switch,w.state):this._showToast("Device is offline")}}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===w.state?"active":""}">
                      <ha-icon icon="mdi:eye"></ha-icon>
                    </div>
                    <span class="toggle-label">AC LED</span>
                  </div>
                  <ha-switch .checked=${"on"===w.state} ?disabled=${!s}></ha-switch>
                </div>
              `:""}
              ${$?I`
                <div class="toggle-card ${o||S?"disabled":""}"
                     title="${S?"Coil cleaning cycle is currently running":o?"Coil clean cannot be started while AC is running":"Start coil self-cleaning cycle"}"
                     @click=${()=>{S?this._showToast("Coil cleaning cycle is currently running"):o?this._showToast("Coil clean cannot be started while AC is running"):this._pressButton(t.coil_clean_button)}}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===x?.state?"active":""}">
                      <ha-icon icon="mdi:spray-bottle"></ha-icon>
                    </div>
                    <span class="toggle-label">
                      ${"on"===x?.state?"Cleaning…":"Coil Clean"}
                    </span>
                  </div>
                  <ha-icon class="toggle-action" icon="mdi:play-circle-outline"></ha-icon>
                </div>
              `:""}
            </div>
          </div>
        `:""}

        <!-- ── Energy Cards ── -->
        ${T||C?I`
          <div class="section">
            <div class="section-title">Energy Consumption</div>
            <div class="energy-row">
              ${T?I`
                <div class="energy-card" @click=${()=>this._showMoreInfo(t.energy_today_sensor)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash"></ha-icon>
                    ${T.attributes.friendly_name??"Today"}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${_t(T.state)}</span>
                    <span class="energy-unit">${T.attributes.unit_of_measurement??"kWh"}</span>
                  </div>
                </div>
              `:""}
              ${C?I`
                <div class="energy-card" @click=${()=>this._showMoreInfo(t.energy_yesterday_sensor)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash-outline"></ha-icon>
                    ${C.attributes.friendly_name??"Yesterday"}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${_t(C.state)}</span>
                    <span class="energy-unit">${C.attributes.unit_of_measurement??"kWh"}</span>
                  </div>
                </div>
              `:""}
            </div>
          </div>
        `:""}

        <!-- ── Diagnostics Footer ── -->
        ${k||N||z?I`
          <div class="footer" style="gap: 12px;">
            ${N?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="status-dot ${"on"===N.state?"online":""}"></span>
                IR Blaster
              </span>
            `:""}
            ${z?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="status-dot ${"on"===z.state?"online":""}"></span>
                Cloud MQTT
              </span>
            `:""}
            ${k?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <ha-icon icon="mdi:wifi"></ha-icon>
                ${k.state} ${k.attributes.unit_of_measurement??"dBm"}
              </span>
            `:""}
          </div>
        `:""}
      </ha-card>
    `}_togglePanel(t){this._haptic("selection"),this._openPanel=this._openPanel===t?null:t}_haptic(t="light"){this.dispatchEvent(new CustomEvent("haptic",{detail:t,bubbles:!0,composed:!0}))}_showToast(t){this._haptic("warning"),this.dispatchEvent(new CustomEvent("hass-notification",{bubbles:!0,composed:!0,detail:{message:t}}))}_showMoreInfo(t){this._haptic("selection"),this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_togglePower(t){this._haptic("medium"),"off"!==t.state?this.hass.callService("climate","set_hvac_mode",{entity_id:t.entity_id,hvac_mode:"off"}):this.hass.callService("climate","turn_on",{entity_id:t.entity_id})}_adjustTemp(t,e,i){if(this._haptic("light"),null==e)return;const s=Number(e)+t;null!=i&&(t<0&&s<Number(i)||t>0&&s>Number(i))||this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s})}_setHvacMode(t){this._haptic("light"),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setFanMode(t,e){this._haptic("selection"),this.hass.callService("climate","set_fan_mode",{entity_id:t.entity_id,fan_mode:e})}_setSwing(t,e){this._haptic("selection"),this.hass.callService("climate","set_swing_mode",{entity_id:t.entity_id,swing_mode:e})}_setHSwing(t,e){this._haptic("selection"),this.hass.callService("climate","set_swing_horizontal_mode",{entity_id:t.entity_id,swing_horizontal_mode:e})}_setPreset(t){this._haptic("light");const e="cv_0"===t||"cv 0"===t?"none":t;this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:e})}_toggleSwitch(t,e){this._haptic("light"),this.hass.callService("switch","on"===e?"turn_off":"turn_on",{entity_id:t})}_pressButton(t){this._haptic("medium"),this.hass.callService("button","press",{entity_id:t})}_modeLabel(t){return{cool:"Cool",dry:"Dry",fan_only:"Fan",auto:"Auto",heat:"Heat",off:"Off"}[t]??t.charAt(0).toUpperCase()+t.slice(1)}_modeIcon(t){return{cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:cached",heat:"mdi:fire"}[t]??"mdi:air-conditioner"}_modeColor(t){return{cool:"rgba(100, 181, 246, 0.18)",dry:"rgba(129, 199, 132, 0.18)",fan_only:"rgba(179, 157, 219, 0.18)",auto:"rgba(255, 183,  77, 0.18)",heat:"rgba(255, 138, 101, 0.18)"}[t]??"rgba(128, 128, 128, 0.12)"}_presetLabel(t){return"boost"===t?"Powerful":"none"===t?"None":"eco"===t?"Eco":t.charAt(0).toUpperCase()+t.slice(1)}_presetIcon(t){return{eco:"mdi:leaf",boost:"mdi:rocket",powerful:"mdi:rocket",none:"mdi:close-circle-outline"}[t]??"mdi:play-circle-outline"}_sourceLabel(t){const e=(t||"").toLowerCase();return"ir"===e?"IR":"cloud"===e?"Cloud":(t||"").charAt(0).toUpperCase()+(t||"").slice(1).toLowerCase()}_renderGoogleHomeFull(t,e,i,s,o,n,a,r,c,l){const d=this._config,h=t.attributes,p=h.hvac_modes||[],m=h.fan_mode,u=h.fan_modes||[],g=h.swing_mode,_=h.swing_modes||[],v=h.swing_horizontal_mode,b=h.swing_horizontal_modes||[],f="unavailable"!==t.state&&"unknown"!==t.state,y=h.preset_mode,w="eco"===y?16:r,$="eco"===y?30:c,x=i?"fan_only"===a?"FA":null!=s?`${s}°`:"--":"Off";let A=["none"],k=[];if(h.preset_modes&&(A=Array.from(new Set(["none",...h.preset_modes.filter(t=>!/^cv[\s_]/.test(t))])),k=h.preset_modes.filter(t=>/^cv[\s_]/.test(t)),k.length>0)){const t=k[0].substring(0,3);k.includes(`${t}0`)||k.push(`${t}0`)}const T=k.sort((t,e)=>gt(e)-gt(t)),C=d.nanoe_switch?this.hass.states[d.nanoe_switch]:void 0,S=d.display_switch?this.hass.states[d.display_switch]:void 0,P=d.coil_clean_button?this.hass.states[d.coil_clean_button]:void 0,j=d.coil_cleaning_sensor?this.hass.states[d.coil_cleaning_sensor]:void 0,E=d.energy_today_sensor?this.hass.states[d.energy_today_sensor]:void 0,D=d.energy_yesterday_sensor?this.hass.states[d.energy_yesterday_sensor]:void 0,N=d.rssi_sensor?this.hass.states[d.rssi_sensor]:void 0,z="on"===j?.state,M=d.entity.replace(/^climate\./,""),H=(t,e,i)=>{if(t&&this.hass.states[t])return this.hass.states[t];for(const t of i){const i=`${e}.${t}`;if(this.hass.states[i])return this.hass.states[i]}const s=Object.keys(this.hass.states);for(const t of i){const i=s.find(i=>i.startsWith(`${e}.${M}_`)&&i.includes(t));if(i)return this.hass.states[i]}},L=H(d.hybrid_submode_switch,"switch",[`${M}_hybrid_automatic_control`,`${M}_hybrid_submode`,`${M}_hybrid_control`,"hybrid"]),O=H(d.active_backend_switch,"switch",[`${M}_primary_transport_backend_cloud`,`${M}_primary_transport_backend`,`${M}_active_backend`,"backend","transport"]),U=H(d.control_source_sensor,"sensor",[`${M}_last_controlled_via`,`${M}_control_source`,"last_controlled_via"]),F=H(d.ir_blaster_sensor,"binary_sensor",[`${M}_ir_blaster_available`,`${M}_ir_transmitter_available`,`${M}_ir_blaster_transmitter_availability`,"ir_blaster"]),R=H(d.cloud_mqtt_sensor,"binary_sensor",[`${M}_cloud_mqtt_connected`,`${M}_cloud_mqtt`,"cloud_mqtt"]);let B=[];return i&&(B.push(this._modeLabel(a)),y&&"none"!==y&&!/^cv[\s_]/.test(y)&&B.push(this._presetLabel(y))),I`
      <ha-card style="${l}" class="gh-full-card">
        <div class="gh-header">
          <div class="gh-header-left">
            <ha-icon class="gh-icon" icon="mdi:air-conditioner"></ha-icon>
            <div class="gh-title">${e}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            ${"compact"===this._config.layout?I`
              <button class="gh-power-btn" style="background: transparent; color: var(--m-text-2);" @click=${()=>{this._haptic("light"),this._expanded=!1}}>
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
            `:""}
            <button
              class="gh-power-btn ${i?"on":""} ${!f||z?"disabled":""}"
              title="${z?"Power cannot be toggled while coil cleaning is active":f?"Toggle Power":"Device is offline"}"
              @click=${e=>{z?this._showToast("Power cannot be toggled while coil cleaning is active"):f?this._togglePower(t):this._showToast("Device is offline")}}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
        </div>

        <div class="gh-center">
          <div class="gh-value-large">${x}</div>
          <div class="gh-subtitle-large">
            <div style="display: flex; align-items: center; gap: 16px; justify-content: center;">
              ${null!=o?I`
                <span style="display: flex; align-items: center; gap: 5px;">
                  <ha-icon icon="mdi:thermometer" style="--mdc-icon-size: 16px;"></ha-icon>${o}°
                </span>`:""}
              ${null!=n?I`
                <span style="display: flex; align-items: center; gap: 5px;">
                  <ha-icon icon="mdi:water-percent" style="--mdc-icon-size: 16px;"></ha-icon>${n}%
                </span>`:""}
            </div>
            ${i?I`
              <div style="display: flex; justify-content: center; margin-top: 10px;">
                <span class="gh-mode-pill" style="background: ${this._modeColor(a)};">
                  <ha-icon icon="${this._modeIcon(a)}" style="--mdc-icon-size: 14px;"></ha-icon>
                  ${this._modeLabel(a)}
                </span>
              </div>`:""}
          </div>
        </div>

        <div class="gh-action-row">
          <button
            class="gh-circular-btn ${!i||"fan_only"===a||null!=s&&Number(s)<=Number(w)||z?"disabled":""}"
            title="${z?"Temperature cannot be adjusted while coil cleaning is active":i?"fan_only"===a?"Temperature cannot be adjusted in Fan Only mode":null!=s&&Number(s)<=Number(w)?`Minimum temperature reached (${w}°)`:"Decrease Temperature":"Turn on the AC to adjust temperature"}"
            @click=${t=>{if(t.stopPropagation(),z)this._showToast("Temperature cannot be adjusted while coil cleaning is active");else if(i)if("fan_only"===a)this._showToast("Temperature cannot be adjusted in Fan Only mode");else if(null!=s&&Number(s)<=Number(w))this._showToast(`Minimum temperature reached (${w}°)`);else{const t=Number(h.target_temp_step??1);this._adjustTemp(-t,s,w)}else this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div style="width: 48px;"></div>
          <button
            class="gh-circular-btn ${!i||"fan_only"===a||null!=s&&Number(s)>=Number($)||z?"disabled":""}"
            title="${z?"Temperature cannot be adjusted while coil cleaning is active":i?"fan_only"===a?"Temperature cannot be adjusted in Fan Only mode":null!=s&&Number(s)>=Number($)?`Maximum temperature reached (${$}°)`:"Increase Temperature":"Turn on the AC to adjust temperature"}"
            @click=${t=>{if(t.stopPropagation(),z)this._showToast("Temperature cannot be adjusted while coil cleaning is active");else if(i)if("fan_only"===a)this._showToast("Temperature cannot be adjusted in Fan Only mode");else if(null!=s&&Number(s)>=Number($))this._showToast(`Maximum temperature reached (${$}°)`);else{const t=Number(h.target_temp_step??1);this._adjustTemp(t,s,$)}else this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <div class="gh-select-container">
          <!-- Mode Dropdown -->
          <div class="gh-select-wrapper ${"mode"===this._ghDropdown?"active":""}">
            <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("HVAC mode cannot be changed while coil cleaning is active"):(this._haptic("selection"),this._ghDropdown="mode"===this._ghDropdown?null:"mode")}}>
              <span>Mode: ${this._modeLabel(a)}</span>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            ${"mode"===this._ghDropdown?I`
              <div class="gh-dropdown-menu">
                ${p.map(t=>I`
                  <button class="gh-dropdown-item ${a===t?"active":""}" 
                       @click=${e=>{e.stopPropagation(),this._ghDropdown=null,this._setHvacMode(t)}}>
                    ${this._modeLabel(t)}
                  </button>
                `)}
              </div>
            `:""}
          </div>

          <!-- Preset Dropdown -->
          <div class="gh-select-wrapper ${"preset"===this._ghDropdown?"active":""}" style="${!i||["dry","auto","fan_only"].includes(a)||z?"opacity: 0.5;":""}">
            <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("Presets cannot be changed while coil cleaning is active"):i?["dry","auto","fan_only"].includes(a)?this._showToast(`Presets are not available in ${this._modeLabel(a)} mode`):(this._haptic("selection"),this._ghDropdown="preset"===this._ghDropdown?null:"preset"):this._showToast("Turn on the AC to select presets")}}>
              <span>Preset: ${y&&"none"!==y&&!/^cv[\s_]/.test(y)?this._presetLabel(y):"None"}</span>
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            ${"preset"===this._ghDropdown?I`
              <div class="gh-dropdown-menu">
                ${A.map(t=>{const e=!y||"none"===y||/^cv[\s_]/.test(y)?"none"===t:y===t;return I`
                    <button class="gh-dropdown-item ${e?"active":""}" 
                         @click=${e=>{e.stopPropagation(),this._ghDropdown=null,this._setPreset(t)}}>
                      ${this._presetLabel(t)}
                    </button>
                  `})}
              </div>
            `:""}
          </div>

          <!-- Convertible Dropdown -->
          ${T.length>0?I`
            <div class="gh-select-wrapper ${"cv"===this._ghDropdown?"active":""}" style="${!i||["dry","auto","fan_only"].includes(a)||z?"opacity: 0.5;":""}">
              <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("Capacity limit cannot be changed while coil cleaning is active"):i?["dry","auto","fan_only"].includes(a)?this._showToast(`Capacity limit is not available in ${this._modeLabel(a)} mode`):(this._haptic("selection"),this._ghDropdown="cv"===this._ghDropdown?null:"cv"):this._showToast("Turn on the AC to set capacity limits")}}>
                <span>Limit: ${t.attributes.preset_mode&&/^cv[\s_]/.test(t.attributes.preset_mode)?0===gt(t.attributes.preset_mode)?"Normal":gt(t.attributes.preset_mode)+"%":"Normal"}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${"cv"===this._ghDropdown?I`
                <div class="gh-dropdown-menu">
                  ${T.map(e=>{const i=gt(e),s=t.attributes.preset_mode===e||0===i&&(!t.attributes.preset_mode||!/^cv[\s_]/.test(t.attributes.preset_mode));return I`
                      <button class="gh-dropdown-item ${s?"active":""}" 
                           @click=${t=>{t.stopPropagation(),this._ghDropdown=null,this._setPreset(e)}}>
                        ${0===i?"Normal":i+"%"}
                      </button>
                    `})}
                </div>
              `:""}
            </div>
          `:""}

          <!-- Fan Speed Dropdown -->
          ${u.length>0?I`
            <div class="gh-select-wrapper ${"fan"===this._ghDropdown?"active":""}" style="${!i||"dry"===a||z?"opacity: 0.5;":""}">
              <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("Fan speed cannot be changed while coil cleaning is active"):i?"dry"===a?this._showToast("Fan speed is automatically managed in Dry mode"):(this._haptic("selection"),this._ghDropdown="fan"===this._ghDropdown?null:"fan"):this._showToast("Turn on the AC to adjust fan speed")}}>
                <span>Fan: ${m?m.charAt(0).toUpperCase()+m.slice(1):"Auto"}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${"fan"===this._ghDropdown?I`
                <div class="gh-dropdown-menu">
                  ${u.map(e=>I`
                    <button class="gh-dropdown-item ${m===e?"active":""}" 
                         @click=${i=>{i.stopPropagation(),this._ghDropdown=null,this._setFanMode(t,e)}}>
                      ${e.charAt(0).toUpperCase()+e.slice(1)}
                    </button>
                  `)}
                </div>
              `:""}
            </div>
          `:""}

          <!-- Vertical Swing (Vanes V) Dropdown -->
          ${_.length>0||null!=g?I`
            <div class="gh-select-wrapper ${"swing_v"===this._ghDropdown?"active":""}" style="${!i||z?"opacity: 0.5;":""}">
              <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("Swing vanes cannot be adjusted while coil cleaning is active"):i?(this._haptic("selection"),this._ghDropdown="swing_v"===this._ghDropdown?null:"swing_v"):this._showToast("Turn on the AC to adjust swing vanes")}}>
                <span>V-Swing: ${g?g.charAt(0).toUpperCase()+g.slice(1):"Auto"}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${"swing_v"===this._ghDropdown?I`
                <div class="gh-dropdown-menu">
                  ${_.map(e=>I`
                    <button class="gh-dropdown-item ${g===e?"active":""}" 
                         @click=${i=>{i.stopPropagation(),this._ghDropdown=null,this._setSwing(t,e)}}>
                      ${e.charAt(0).toUpperCase()+e.slice(1)}
                    </button>
                  `)}
                </div>
              `:""}
            </div>
          `:""}

          <!-- Horizontal Swing (Vanes H) Dropdown -->
          ${b.length>0||null!=v?I`
            <div class="gh-select-wrapper ${"swing_h"===this._ghDropdown?"active":""}" style="${!i||z?"opacity: 0.5;":""}">
              <button class="gh-custom-select" @click=${t=>{t.stopPropagation(),z?this._showToast("Horizontal swing cannot be adjusted while coil cleaning is active"):i?(this._haptic("selection"),this._ghDropdown="swing_h"===this._ghDropdown?null:"swing_h"):this._showToast("Turn on the AC to adjust horizontal swing")}}>
                <span>H-Swing: ${v?v.charAt(0).toUpperCase()+v.slice(1):"Auto"}</span>
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              ${"swing_h"===this._ghDropdown?I`
                <div class="gh-dropdown-menu">
                  ${b.map(e=>I`
                    <button class="gh-dropdown-item ${v===e?"active":""}" 
                         @click=${i=>{i.stopPropagation(),this._ghDropdown=null,this._setHSwing(t,e)}}>
                      ${e.charAt(0).toUpperCase()+e.slice(1)}
                    </button>
                  `)}
                </div>
              `:""}
            </div>
          `:""}
        </div>

        ${C||S||P||E||D?I`
          <div class="gh-extra-chips">
            ${C?I`<div class="gh-chip ${"on"===C.state?"active":""} ${!f||z?"disabled":""}" title="${z?"Nanoe cannot be toggled while coil cleaning is active":f?"Toggle Nanoe™ air purification":"Device is offline"}" @click=${()=>z?this._showToast("Nanoe cannot be toggled while coil cleaning is active"):f?this._toggleSwitch(d.nanoe_switch,C.state):this._showToast("Device is offline")}><ha-icon icon="mdi:virus-outline"></ha-icon>Nanoe</div>`:""}
            ${S?I`<div class="gh-chip ${"on"===S.state?"active":""} ${!f||z?"disabled":""}" title="${z?"Display LED cannot be toggled while coil cleaning is active":f?"Toggle indoor unit LED display":"Device is offline"}" @click=${()=>z?this._showToast("Display LED cannot be toggled while coil cleaning is active"):f?this._toggleSwitch(d.display_switch,S.state):this._showToast("Device is offline")}><ha-icon icon="mdi:lightbulb-outline"></ha-icon>Display</div>`:""}
            ${P||j?I`
              <div
                class="gh-chip ${"on"===j?.state?"active":""} ${i||z?"disabled":""}"
                style="${i?"opacity: 0.4; cursor: not-allowed;":""}"
                title="${z?"Coil cleaning cycle is currently running":i?"Coil clean cannot be started while AC is running":"Start coil self-cleaning cycle"}"
                @click=${()=>{z?this._showToast("Coil cleaning cycle is currently running"):i?this._showToast("Coil clean cannot be started while AC is running"):P&&this._pressButton(d.coil_clean_button)}}
              >
                <ha-icon icon="mdi:spray"></ha-icon>
                ${"on"===j?.state?"Cleaning…":"Clean Coil"}
              </div>
            `:""}
            ${E&&D?I`
              <div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Today: ${_t(E.state)} kWh • Yesterday: ${_t(D.state)} kWh</div>
            `:I`
              ${E?I`<div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Today: ${_t(E.state)} kWh</div>`:""}
              ${D?I`<div class="gh-chip-text"><ha-icon icon="mdi:lightning-bolt"></ha-icon>Yesterday: ${_t(D.state)} kWh</div>`:""}
            `}
          </div>
        `:""}

        <!-- ── 2.0 Hybrid Transport Controls (Google Home Layout) ── -->
        ${O||L?I`
          <div class="gh-extra-chips" style="margin-top: 10px;">
            ${O?I`
              ${(()=>{const t="cloud"===O.state||"on"===O.state,e=L&&("auto"===L.state||"on"===L.state);return I`
                  <div
                    class="gh-chip ${t?"active":""} ${e||z?"disabled":""}"
                    style="${e?"opacity: 0.4; cursor: not-allowed;":""}"
                    title="${e?"Backend transport is managed automatically in Auto Failover mode":z?"Backend cannot be switched while coil cleaning is active":"Click to toggle primary transport backend"}"
                    @click=${()=>{e?this._showToast("Backend transport is managed automatically in Auto Failover mode"):z?this._showToast("Backend cannot be switched while coil cleaning is active"):this._toggleSwitch(O.entity_id,O.state)}}
                  >
                    <ha-icon icon="${t?"mdi:cloud-sync":"mdi:remote"}"></ha-icon>
                    Backend: ${t?"Cloud":"IR"}
                  </div>
                `})()}
            `:""}

            ${L?I`
              <div
                class="gh-chip ${"auto"===L.state||"on"===L.state?"active":""} ${z?"disabled":""}"
                title="${z?"Hybrid mode cannot be toggled while coil cleaning is active":"Click to toggle between Auto Failover and Manual backend"}"
                @click=${()=>{z?this._showToast("Hybrid mode cannot be toggled while coil cleaning is active"):this._toggleSwitch(L.entity_id,L.state)}}
              >
                <ha-icon icon="${"auto"===L.state||"on"===L.state?"mdi:refresh-auto":"mdi:hand-back-right"}"></ha-icon>
                ${"auto"===L.state||"on"===L.state?"Auto Failover":"Manual"}
              </div>
            `:""}

            ${U&&U.state&&"unknown"!==U.state&&"unavailable"!==U.state?I`
              <div class="gh-chip" style="cursor: default; opacity: 0.85;" title="Last control origin">
                <ha-icon icon="${U.state.toLowerCase().includes("ir")?"mdi:remote":"mdi:cloud-check"}"></ha-icon>
                <span>Via: ${this._sourceLabel(U.state)}</span>
              </div>
            `:""}
          </div>
        `:""}
        
        ${N||F||R?I`
          <div class="gh-footer-text" style="display: flex; justify-content: center; align-items: center; gap: 14px; flex-wrap: wrap;">
            ${F?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="status-dot ${"on"===F.state?"online":""}"></span>
                IR Blaster
              </span>
            `:""}
            ${R?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <span class="status-dot ${"on"===R.state?"online":""}"></span>
                Cloud MQTT
              </span>
            `:""}
            ${N?I`
              <span style="display: inline-flex; align-items: center; gap: 4px;">
                <ha-icon icon="mdi:wifi" style="--mdc-icon-size: 14px;"></ha-icon>
                ${N.state} ${N.attributes.unit_of_measurement??"dBm"}
              </span>
            `:""}
          </div>
        `:""}
      </ha-card>
    `}_renderCompact(t,e,i,s,o,n,a,r,c,l){const d="unavailable"!==t.state&&"unknown"!==t.state,h=i?"fan_only"===a?"FA":null!=s?`${s}°`:"--":"Off",p=this._config.coil_cleaning_sensor?this.hass.states[this._config.coil_cleaning_sensor]:void 0,m="on"===p?.state,u=[];if(i){u.push(this._modeLabel(a));const e=t.attributes.preset_mode;if(e&&"none"!==e)if(/^cv[\s_]/.test(e)){const t=gt(e);u.push(0===t?"Normal":t+"%")}else u.push(this._presetLabel(e))}const g=u.length?u.join(" • "):"";return I`
      <ha-card style="${l}" class="compact-card" @click=${()=>{this._haptic("selection"),this._expanded=!0}}>
        <div class="compact-header">
          <button
            class="compact-icon-btn ${i?"on":""} ${!d||m?"disabled":""}"
            title="${m?"Power cannot be toggled while coil cleaning is active":d?"Toggle Power":"Device is offline"}"
            @click=${e=>{e.stopPropagation(),m?this._showToast("Power cannot be toggled while coil cleaning is active"):d?this._togglePower(t):this._showToast("Device is offline")}}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
          <div class="compact-title">${e}</div>
          <ha-icon class="compact-chevron" icon="mdi:chevron-right"></ha-icon>
        </div>
        
        <div class="compact-center">
          <div class="compact-value">${h}</div>
        </div>

        <div class="compact-footer">
          <button
            class="compact-action-btn ${!i||"fan_only"===a||null!=s&&Number(s)<=Number(r)||m?"disabled":""}"
            title="${m?"Temperature cannot be adjusted while coil cleaning is active":i?"fan_only"===a?"Temperature cannot be adjusted in Fan Only mode":null!=s&&Number(s)<=Number(r)?`Minimum temperature reached (${r}°)`:"Decrease Temperature":"Turn on the AC to adjust temperature"}"
            @click=${t=>{t.stopPropagation(),m?this._showToast("Temperature cannot be adjusted while coil cleaning is active"):i?"fan_only"===a?this._showToast("Temperature cannot be adjusted in Fan Only mode"):null!=s&&Number(s)<=Number(r)?this._showToast(`Minimum temperature reached (${r}°)`):this._adjustTemp(-1,s,r):this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="compact-subtitle" style="display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1.2;">
            <div style="display: flex; align-items: center; gap: 12px;">
              ${null!=o?I`
                <span style="display: flex; align-items: center; gap: 4px;">
                  <ha-icon icon="mdi:thermometer" style="--mdc-icon-size: 14px;"></ha-icon>${o}°
                </span>`:""}
              ${null!=n?I`
                <span style="display: flex; align-items: center; gap: 4px;">
                  <ha-icon icon="mdi:water-percent" style="--mdc-icon-size: 14px;"></ha-icon>${n}%
                </span>`:""}
            </div>
            ${g?I`<div style="font-size: 0.75rem; opacity: 0.7;">${g}</div>`:""}
          </div>
          <button
            class="compact-action-btn ${!i||"fan_only"===a||null!=s&&Number(s)>=Number(c)||m?"disabled":""}"
            title="${m?"Temperature cannot be adjusted while coil cleaning is active":i?"fan_only"===a?"Temperature cannot be adjusted in Fan Only mode":null!=s&&Number(s)>=Number(c)?`Maximum temperature reached (${c}°)`:"Increase Temperature":"Turn on the AC to adjust temperature"}"
            @click=${t=>{t.stopPropagation(),m?this._showToast("Temperature cannot be adjusted while coil cleaning is active"):i?"fan_only"===a?this._showToast("Temperature cannot be adjusted in Fan Only mode"):null!=s&&Number(s)>=Number(c)?this._showToast(`Maximum temperature reached (${c}°)`):this._adjustTemp(1,s,c):this._showToast("Turn on the AC to adjust temperature")}}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </ha-card>
    `}getCardSize(){return"compact"!==this._config?.layout||this._expanded?5:2}};t([dt({attribute:!1})],vt.prototype,"hass",void 0),t([ht()],vt.prototype,"_config",void 0),t([ht()],vt.prototype,"_openPanel",void 0),t([ht()],vt.prototype,"_expanded",void 0),t([ht()],vt.prototype,"_ghDropdown",void 0),vt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("miraie-ac-card-in")],vt);export{vt as MirAIeACCard};
