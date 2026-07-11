function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,m?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=t=>t,x=A.trustedTypes,S=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,k=`<${P}>`,O=document,U=()=>O.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,V=O.createTreeWalker(O,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===N?"!--"===c[1]?r=R:void 0!==c[1]?r=z:void 0!==c[2]?(L.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=n??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?j:'"'===c[3]?I:D):r===I||r===D?r=j:r===R||r===z?r=N:(r=j,n=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+k:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=x?x.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);V.currentNode=s;let n=V.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=V.nextNode(),o++)}return V.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),H(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Z(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Z(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!H(a)||a!==this._$AH[r],a===W?t=W:t!==W&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===F)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(K,Q),(A.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}rt._$litElement$=!0,rt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:rt});const at=ot.litElementPolyfillSupport;at?.({LitElement:rt}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},lt=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
  :host {
    --card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --text-primary: var(--primary-text-color, #e5e5e7);
    --text-secondary: var(--secondary-text-color, #8e8e93);
    --accent: var(--primary-color, #f9a825);
    --btn-bg: rgba(255, 255, 255, 0.06);
    --btn-hover: rgba(255, 255, 255, 0.12);
    --btn-active-bg: rgba(249, 168, 37, 0.15);
    --btn-active-border: rgba(249, 168, 37, 0.5);
    --section-gap: 16px;
  }

  ha-card {
    padding: 20px;
    border-radius: 16px;
    background: var(--card-bg);
    color: var(--text-primary);
    font-family: inherit;
    overflow: hidden;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--section-gap);
  }
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .title-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #636366;
    flex-shrink: 0;
  }
  .status-dot.online {
    background: #30d158;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .subtitle {
    font-size: 0.8rem;
    color: var(--text-secondary);
    padding-left: 14px;
  }
  .power-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: var(--btn-bg);
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  .power-btn.active {
    background: var(--accent);
    color: #1c1c1e;
  }
  .power-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* ── Temperature ── */
  .temp-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--btn-bg);
    border-radius: 16px;
    padding: 12px 16px;
    margin-bottom: var(--section-gap);
  }
  .temp-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
  }
  .temp-btn:hover:not(:disabled) {
    background: var(--btn-hover);
  }
  .temp-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }
  .temp-info {
    text-align: center;
  }
  .temp-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1;
  }
  .temp-room {
    display: block;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 2px;
  }

  /* ── Sections ── */
  .section {
    margin-bottom: var(--section-gap);
  }
  .section-title {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  /* ── Pill Buttons ── */
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--btn-bg);
    color: var(--text-secondary);
    font-size: 0.82rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .pill:hover:not(:disabled) {
    background: var(--btn-hover);
  }
  .pill.active {
    background: var(--btn-active-bg);
    border-color: var(--btn-active-border);
    color: var(--accent);
  }
  .pill:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .pill ha-icon {
    --mdc-icon-size: 16px;
  }

  /* ── Toggle Grid ── */
  .toggles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .toggle-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: var(--btn-bg);
    cursor: pointer;
    transition: background 0.15s;
  }
  .toggle-card:hover {
    background: var(--btn-hover);
  }
  .toggle-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .toggle-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-secondary);
    --mdc-icon-size: 18px;
  }
  .toggle-icon.active {
    background: var(--btn-active-bg);
    color: var(--accent);
  }
  .toggle-label {
    font-size: 0.82rem;
    color: var(--text-primary);
  }

  /* ── Alert Banner ── */
  .alert-banner {
    grid-column: span 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid rgba(244, 67, 54, 0.35);
    background: rgba(244, 67, 54, 0.06);
  }
  .alert-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .alert-icon {
    color: #f44336;
    --mdc-icon-size: 20px;
  }
  .alert-text {
    font-size: 0.82rem;
    font-weight: 600;
    color: #f44336;
  }
  .alert-hint {
    font-size: 0.75rem;
    color: #f44336;
  }

  /* ── Footer ── */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.72rem;
    color: var(--text-secondary);
  }
  .footer-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .footer-item ha-icon {
    --mdc-icon-size: 14px;
  }
  .footer-group {
    display: flex;
    gap: 12px;
  }

  /* ── Error state ── */
  .error {
    padding: 16px;
    color: #f44336;
    text-align: center;
  }
`;window.customCards=window.customCards||[],window.customCards.push({type:"miraie-ac-card-in",name:"MirAIe AC Card",description:"A premium thermostat card for Panasonic MirAIe AC units",preview:!0});let pt=class extends rt{static get styles(){return ht}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"",type:"expandable",title:"Convertible & Controls",icon:"mdi:toggle-switch-outline",schema:[{name:"convertible_mode_entity",selector:{entity:{domain:"select"}}},{name:"nanoe_switch",selector:{entity:{domain:"switch"}}},{name:"display_switch",selector:{entity:{domain:"switch"}}},{name:"coil_clean_button",selector:{entity:{domain:"button"}}},{name:"coil_cleaning_sensor",selector:{entity:{domain:"binary_sensor"}}},{name:"filter_alert_sensor",selector:{entity:{domain:"binary_sensor"}}}]},{name:"",type:"expandable",title:"Diagnostics & Energy",icon:"mdi:chart-line",schema:[{name:"rssi_sensor",selector:{entity:{domain:"sensor"}}},{name:"energy_today_sensor",selector:{entity:{domain:"sensor"}}},{name:"energy_yesterday_sensor",selector:{entity:{domain:"sensor"}}}]}]}}static getStubConfig(){return{type:"custom:miraie-ac-card-in",entity:""}}setConfig(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Please define a valid climate entity.");this._config={...t}}shouldUpdate(t){if(t.has("_config"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");if(!e)return!0;return[this._config.entity,this._config.convertible_mode_entity,this._config.nanoe_switch,this._config.display_switch,this._config.coil_clean_button,this._config.coil_cleaning_sensor,this._config.filter_alert_sensor,this._config.rssi_sensor,this._config.energy_today_sensor,this._config.energy_yesterday_sensor].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}render(){if(!this.hass||!this._config)return null;const t=this.hass.states[this._config.entity];if(!t)return B`<ha-card><div class="error">Entity not found: ${this._config.entity}</div></ha-card>`;const e="unavailable"!==t.state&&"unknown"!==t.state,i="off"!==t.state&&e,s=t.attributes,n=this._config.name||s.friendly_name||"AC",o=s.temperature,r=s.current_temperature,a=s.min_temp??16,c=s.max_temp??30,l=t.state,d=s.fan_mode,h=s.swing_mode,p=s.swing_horizontal_mode,u=s.preset_mode,_=this._config,g=_.convertible_mode_entity?this.hass.states[_.convertible_mode_entity]:void 0,m=_.nanoe_switch?this.hass.states[_.nanoe_switch]:void 0,f=_.display_switch?this.hass.states[_.display_switch]:void 0,v=_.coil_clean_button?this.hass.states[_.coil_clean_button]:void 0,y=_.coil_cleaning_sensor?this.hass.states[_.coil_cleaning_sensor]:void 0,$=_.filter_alert_sensor?this.hass.states[_.filter_alert_sensor]:void 0,b=_.rssi_sensor?this.hass.states[_.rssi_sensor]:void 0,A=_.energy_today_sensor?this.hass.states[_.energy_today_sensor]:void 0,w=_.energy_yesterday_sensor?this.hass.states[_.energy_yesterday_sensor]:void 0;return B`
      <ha-card>
        <!-- ── Header ── -->
        <div class="header">
          <div class="header-left">
            <div class="title-row">
              <span class="status-dot ${e?"online":""}"></span>
              <span class="title">${n}</span>
            </div>
            <div class="subtitle">
              ${e?`${this._modeLabel(l)} • Fan: ${d??"Auto"}`:"Offline"}
            </div>
          </div>
          <button
            class="power-btn ${i?"active":""}"
            ?disabled=${!e}
            @click=${()=>this._togglePower(t)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-bar">
          <button
            class="temp-btn"
            ?disabled=${!i||null!=o&&Number(o)<=Number(a)}
            @click=${()=>this._adjustTemp(-1,o,a)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <div class="temp-info">
            <span class="temp-value">${i&&null!=o?`${o}°C`:"--"}</span>
            <span class="temp-room">${null!=r?`Room: ${r}°C`:"Room: --"}</span>
          </div>
          <button
            class="temp-btn"
            ?disabled=${!i||null!=o&&Number(o)>=Number(c)}
            @click=${()=>this._adjustTemp(1,o,c)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <!-- ── HVAC Modes ── -->
        <div class="section">
          <div class="section-title">Modes</div>
          <div class="pills">
            ${(s.hvac_modes||[]).filter(t=>"off"!==t).map(t=>B`
                  <button
                    class="pill ${l===t&&i?"active":""}"
                    ?disabled=${!e}
                    @click=${()=>this._setHvacMode(t)}
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
            <button class="pill" ?disabled=${!i} @click=${()=>this._cycleFan(t)}>
              <ha-icon icon="mdi:fan"></ha-icon>
              Fan: ${d??"Auto"}
            </button>
            ${null!=h?B`
                  <button class="pill" ?disabled=${!i} @click=${()=>this._cycleSwing(t)}>
                    <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                    Swing V: ${h}
                  </button>
                `:""}
            ${null!=p?B`
                  <button class="pill" ?disabled=${!i} @click=${()=>this._cycleHSwing(t)}>
                    <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                    Swing H: ${p}
                  </button>
                `:""}
          </div>
        </div>

        <!-- ── Comfort Presets ── -->
        <div class="section">
          <div class="section-title">Comfort Presets</div>
          <div class="pills">
            ${["none","eco","boost"].map(t=>B`
                <button
                  class="pill ${u===t?"active":""}"
                  ?disabled=${!i}
                  @click=${()=>this._setPreset(t)}
                >
                  <ha-icon icon="${this._presetIcon(t)}"></ha-icon>
                  ${t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              `)}
          </div>
        </div>

        <!-- ── Convertible Mode ── -->
        ${g?B`
              <div class="section">
                <div class="section-title">Capacity Limit (Convertible)</div>
                <div class="pills">
                  ${(g.attributes.options||[]).map(t=>B`
                      <button
                        class="pill ${g.state===t?"active":""}"
                        ?disabled=${!i}
                        @click=${()=>this._selectOption(_.convertible_mode_entity,t)}
                      >
                        ${"cv 0"===t?"Normal":t.replace("cv ","")+"%"}
                      </button>
                    `)}
                </div>
              </div>
            `:""}

        <!-- ── Controls ── -->
        ${m||f||v?B`
              <div class="section">
                <div class="section-title">Controls</div>
                <div class="toggles">
                  ${m?B`
                        <div class="toggle-card" @click=${()=>this._toggleSwitch(_.nanoe_switch,m.state)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${"on"===m.state?"active":""}">
                              <ha-icon icon="mdi:air-purifier"></ha-icon>
                            </div>
                            <span class="toggle-label">Nanoe-G</span>
                          </div>
                          <ha-switch .checked=${"on"===m.state} ?disabled=${!e}></ha-switch>
                        </div>
                      `:""}
                  ${f?B`
                        <div class="toggle-card" @click=${()=>this._toggleSwitch(_.display_switch,f.state)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${"on"===f.state?"active":""}">
                              <ha-icon icon="mdi:eye"></ha-icon>
                            </div>
                            <span class="toggle-label">AC LED</span>
                          </div>
                          <ha-switch .checked=${"on"===f.state} ?disabled=${!e}></ha-switch>
                        </div>
                      `:""}
                  ${v?B`
                        <div class="toggle-card" @click=${()=>this._pressButton(_.coil_clean_button)}>
                          <div class="toggle-left">
                            <div class="toggle-icon ${"on"===y?.state?"active":""}">
                              <ha-icon icon="mdi:spray-bottle"></ha-icon>
                            </div>
                            <span class="toggle-label">
                              ${"on"===y?.state?"Cleaning…":"Coil Clean"}
                            </span>
                          </div>
                          <ha-icon icon="mdi:play-circle-outline" style="color:var(--text-secondary);margin-right:4px"></ha-icon>
                        </div>
                      `:""}
                  ${"on"===$?.state?B`
                        <div class="alert-banner">
                          <div class="alert-left">
                            <ha-icon class="alert-icon" icon="mdi:air-filter"></ha-icon>
                            <span class="alert-text">Dirty Filter Alert!</span>
                          </div>
                          <span class="alert-hint">Clean Filter</span>
                        </div>
                      `:""}
                </div>
              </div>
            `:""}

        <!-- ── Footer Diagnostics ── -->
        ${b||A||w?B`
              <div class="footer">
                <div class="footer-item">
                  ${b?B`<ha-icon icon="mdi:wifi"></ha-icon><span>RSSI: ${b.state} ${b.attributes.unit_of_measurement??"dBm"}</span>`:""}
                </div>
                <div class="footer-group">
                  ${A?B`
                        <div class="footer-item">
                          <ha-icon icon="mdi:flash"></ha-icon>
                          <span>Today: ${A.state} ${A.attributes.unit_of_measurement??"kWh"}</span>
                        </div>
                      `:""}
                  ${w?B`
                        <div class="footer-item">
                          <ha-icon icon="mdi:flash-outline"></ha-icon>
                          <span>Yesterday: ${w.state} ${w.attributes.unit_of_measurement??"kWh"}</span>
                        </div>
                      `:""}
                </div>
              </div>
            `:""}
      </ha-card>
    `}_togglePower(t){"off"!==t.state?this.hass.callService("climate","set_hvac_mode",{entity_id:t.entity_id,hvac_mode:"off"}):this.hass.callService("climate","turn_on",{entity_id:t.entity_id})}_adjustTemp(t,e,i){if(null==e)return;const s=Number(e)+t;null!=i&&(t<0&&s<Number(i)||t>0&&s>Number(i))||this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s})}_setHvacMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_cycleFan(t){const e=t.attributes.fan_modes||[];if(!e.length)return;const i=(e.indexOf(t.attributes.fan_mode)+1)%e.length;this.hass.callService("climate","set_fan_mode",{entity_id:t.entity_id,fan_mode:e[i]})}_cycleSwing(t){const e=t.attributes.swing_modes||[];if(!e.length)return;const i=(e.indexOf(t.attributes.swing_mode)+1)%e.length;this.hass.callService("climate","set_swing_mode",{entity_id:t.entity_id,swing_mode:e[i]})}_cycleHSwing(t){const e=t.attributes.swing_horizontal_modes||[];if(!e.length)return;const i=(e.indexOf(t.attributes.swing_horizontal_mode)+1)%e.length;this.hass.callService("climate","set_swing_horizontal_mode",{entity_id:t.entity_id,swing_horizontal_mode:e[i]})}_setPreset(t){this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:t})}_selectOption(t,e){this.hass.callService("select","select_option",{entity_id:t,option:e})}_toggleSwitch(t,e){this.hass.callService("switch","on"===e?"turn_off":"turn_on",{entity_id:t})}_pressButton(t){this.hass.callService("button","press",{entity_id:t})}_modeLabel(t){return{cool:"Cool",dry:"Dry",fan_only:"Fan",auto:"Auto",heat:"Heat",off:"Off"}[t]??t.charAt(0).toUpperCase()+t.slice(1)}_modeIcon(t){return{cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:cached",heat:"mdi:fire"}[t]??"mdi:air-conditioner"}_presetIcon(t){return{eco:"mdi:leaf",boost:"mdi:rocket",none:"mdi:close-circle-outline"}[t]??"mdi:play-circle-outline"}getCardSize(){return 4}};t([dt({attribute:!1})],pt.prototype,"hass",void 0),t([function(t){return dt({...t,state:!0,attribute:!1})}()],pt.prototype,"_config",void 0),pt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("miraie-ac-card-in")],pt);export{pt as MirAIeACCard};
