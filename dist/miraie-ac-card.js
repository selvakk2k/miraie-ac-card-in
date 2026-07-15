function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,m=globalThis,u=m.trustedTypes,g=u?u.emptyScript:"",_=m.reactiveElementPolyfillSupport,v=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,_?.({ReactiveElement:$}),(m.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,z=document,U=()=>z.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,j=/>/g,R=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,I=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,V=z.createTreeWalker(z,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(o.lastIndex=d,c=o.exec(i),null!==c);)d=o.lastIndex,o===N?"!--"===c[1]?o=T:void 0!==c[1]?o=j:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=R):void 0!==c[3]&&(o=R):o===R?">"===c[0]?(o=r??N,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?R:'"'===c[3]?I:D):o===I||o===D?o=R:o===T||o===j?o=N:(o=R,r=void 0);const h=o===R&&t[e+1].startsWith("/>")?" ":"";n+=o===N?i+P:l>=0?(s.push(a),i.slice(0,l)+k+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[Y(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=l[n++],i=s.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:X}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),V.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=M(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);V.currentNode=s;let r=V.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=V.nextNode(),n++)}return V.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,s[i+o],e,o),a===F&&(a=this._$AH[o]),n||=!M(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===F)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.3");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:y},lt=(t=ct,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
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
     Token layer — everything resolves from HA theme variables.
     --miraie-accent is overridden via inline style when
     the user sets accent_color in the card config.
     ────────────────────────────────────────────────────────── */
  :host {
    --miraie-accent:        var(--primary-color, #f39c12);

    /* Surfaces — HA supplies these; they flip between light/dark */
    --m-bg:                 var(--ha-card-background, var(--card-background-color, var(--lovelace-background)));
    --m-surface:            var(--secondary-background-color, rgba(128,128,128,0.08));
    --m-surface-hover:      rgba(128,128,128,0.15);
    --m-border:             var(--divider-color, rgba(128,128,128,0.14));

    /* Text */
    --m-text:               var(--primary-text-color);
    --m-text-2:             var(--secondary-text-color);

    /* Active state derived from accent */
    --m-active-bg:          color-mix(in srgb, var(--miraie-accent) 15%, transparent);
    --m-active-border:      color-mix(in srgb, var(--miraie-accent) 50%, transparent);
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
  .header-left { display: flex; flex-direction: column; gap: 3px; }
  .title-row   { display: flex; align-items: center; gap: 7px; }

  .status-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--m-text-2); flex-shrink: 0;
  }
  .status-dot.online { background: var(--success-color, #2ecc71); }

  .title   { font-size: 1.05rem; font-weight: 700; }
  .subtitle { font-size: 0.78rem; color: var(--m-text-2); padding-left: 15px; }

  .power-btn {
    width: 46px; height: 46px; border-radius: 50%; border: none;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    background: var(--m-surface); color: var(--m-text-2);
    transition: all 0.2s; --mdc-icon-size: 22px;
  }
  .power-btn.on { background: var(--miraie-accent); color: var(--m-bg); }
  .power-btn:disabled { opacity: 0.3; cursor: not-allowed; }

  /* ── Temperature block ── */
  .temp-block {
    background: var(--m-surface); border-radius: 16px;
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }
  .temp-btn {
    width: 38px; height: 38px; border-radius: 50%; border: none;
    background: transparent; color: var(--m-text-2); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; --mdc-icon-size: 20px;
  }
  .temp-btn:hover:not(:disabled) { background: var(--m-surface-hover); }
  .temp-btn:disabled { opacity: 0.25; cursor: not-allowed; }
  .temp-center { text-align: center; flex: 1; }
  .temp-value  { font-size: 2rem; font-weight: 800; letter-spacing: -1px; }
  .temp-meta {
    display: flex; align-items: center; justify-content: center;
    gap: 16px; margin-top: 8px;
  }
  .temp-meta-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.95rem; font-weight: 500; color: var(--m-text);
  }
  .temp-meta-item ha-icon { --mdc-icon-size: 16px; color: var(--m-text-2); }

  /* ── Generic section ── */
  .section { margin-bottom: 22px; }
  .section-title {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.08em; color: var(--m-text-2); margin-bottom: 8px;
  }

  /* ── Pills ── */
  .pills { display: flex; flex-wrap: wrap; gap: 10px; }
  .pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 24px;
    border: 1px solid var(--m-border);
    background: var(--m-surface); color: var(--m-text-2);
    font-size: 0.85rem; cursor: pointer; white-space: nowrap;
    transition: all 0.18s; --mdc-icon-size: 15px;
  }
  .pill:hover:not(:disabled) { background: var(--m-surface-hover); }
  .pill.active {
    background: var(--m-active-bg);
    border-color: var(--m-active-border);
    color: var(--miraie-accent);
  }
  .pill:disabled { opacity: 0.28; cursor: not-allowed; }

  @media (max-width: 450px) {
    .pills { gap: 6px; }
    .pill { padding: 7px 11px; font-size: 0.78rem; gap: 4px; }
    .pill ha-icon { --mdc-icon-size: 14px; }
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
  }
  .toggle-card:hover:not(.disabled) { background: var(--m-surface-hover); }
  .toggle-card.disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }
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
`;function mt(t){const e=/^cv[\s_]+(\d+)$/.exec((t??"").trim());return e?parseInt(e[1],10):-1}function ut(t){const e=Number(t);return isNaN(e)?String(t):e.toFixed(2)}window.customCards=window.customCards||[],window.customCards.push({type:"miraie-ac-card-in",name:"MirAIe AC Card",description:"A premium thermostat card for Panasonic MirAIe AC units",preview:!0});let gt=class extends ot{constructor(){super(...arguments),this._openPanel=null}static get styles(){return pt}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"accent_color",selector:{ui_color:{}}},{name:"",type:"expandable",title:"Display Sensors",icon:"mdi:thermometer",schema:[{name:"room_temp_sensor",selector:{entity:{domain:"sensor"}}},{name:"humidity_sensor",selector:{entity:{domain:"sensor"}}}]},{name:"",type:"expandable",title:"Convertible & Controls",icon:"mdi:toggle-switch-outline",schema:[{name:"nanoe_switch",selector:{entity:{domain:"switch"}}},{name:"display_switch",selector:{entity:{domain:"switch"}}},{name:"coil_clean_button",selector:{entity:{domain:"button"}}},{name:"coil_cleaning_sensor",selector:{entity:{domain:"binary_sensor"}}},{name:"filter_alert_sensor",selector:{entity:{domain:"binary_sensor"}}}]},{name:"",type:"expandable",title:"Diagnostics & Energy",icon:"mdi:chart-line",schema:[{name:"rssi_sensor",selector:{entity:{domain:"sensor"}}},{name:"energy_today_sensor",selector:{entity:{domain:"sensor"}}},{name:"energy_yesterday_sensor",selector:{entity:{domain:"sensor"}}}]}]}}static getStubConfig(){return{type:"custom:miraie-ac-card-in",entity:""}}setConfig(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Please define a valid climate entity.");this._config={...t},this._openPanel=null}shouldUpdate(t){if(t.has("_config")||t.has("_openPanel"))return!0;if(t.has("hass")&&this._config){const e=t.get("hass");if(!e)return!0;const i=this._config;return[i.entity,i.room_temp_sensor,i.humidity_sensor,i.nanoe_switch,i.display_switch,i.coil_clean_button,i.coil_cleaning_sensor,i.filter_alert_sensor,i.rssi_sensor,i.energy_today_sensor,i.energy_yesterday_sensor].filter(Boolean).some(t=>e.states[t]!==this.hass.states[t])}return!1}render(){if(!this.hass||!this._config)return null;const t=this._config,e=this.hass.states[t.entity];if(!e)return B`<ha-card><div class="error">Entity not found: ${t.entity}</div></ha-card>`;const i=e.attributes,s="unavailable"!==e.state&&"unknown"!==e.state,r="off"!==e.state&&s,n=t.name||i.friendly_name||"AC",o=i.temperature,a=i.min_temp??16,c=i.max_temp??30,l=e.state,d=i.fan_mode,h=i.swing_mode,p=i.swing_horizontal_mode,m=i.preset_mode,u=t.room_temp_sensor?this.hass.states[t.room_temp_sensor]:void 0,g=u?u.state:i.current_temperature,_=t.humidity_sensor?this.hass.states[t.humidity_sensor]:void 0,v=t.nanoe_switch?this.hass.states[t.nanoe_switch]:void 0,f=t.display_switch?this.hass.states[t.display_switch]:void 0,y=t.coil_clean_button?this.hass.states[t.coil_clean_button]:void 0,b=t.coil_cleaning_sensor?this.hass.states[t.coil_cleaning_sensor]:void 0,$=t.filter_alert_sensor?this.hass.states[t.filter_alert_sensor]:void 0,x=t.rssi_sensor?this.hass.states[t.rssi_sensor]:void 0,w=t.energy_today_sensor?this.hass.states[t.energy_today_sensor]:void 0,A=t.energy_yesterday_sensor?this.hass.states[t.energy_yesterday_sensor]:void 0;let S=[],k="cv_";i.preset_modes&&i.preset_modes.some(t=>/^cv[\s_]/.test(t))&&(S=i.preset_modes.filter(t=>/^cv[\s_]/.test(t)),k=S[0].substring(0,3),S.includes(`${k}0`)||S.push(`${k}0`));let E=i.preset_mode&&/^cv[\s_]/.test(i.preset_mode)?i.preset_mode:`${k}0`;const C=S.filter(t=>mt(t)>0).sort((t,e)=>mt(t)-mt(e)),P=[`${k}0`,...C],z=P.indexOf(E),U=(M=S,M?.length?M.some(t=>60===mt(t))&&M.some(t=>50===mt(t))?"Converti8":"Converti7":"Convertible");var M;const O=C.length>0?z/(P.length-1)*100:0;let H="";if(t.accent_color)if(Array.isArray(t.accent_color))H=`rgb(${t.accent_color.join(",")})`;else if("string"==typeof t.accent_color){const e=t.accent_color.toLowerCase();H="primary"===e?"var(--primary-color)":"accent"===e?"var(--accent-color)":/^[a-z-]+$/.test(e)?`var(--${e}-color, ${e})`:e}return B`
      <ha-card style="${H?`--miraie-accent: ${H};`:""}">

        <!-- ── Header ── -->
        <div class="header">
          <div class="header-left">
            <div class="title-row">
              <span class="status-dot ${s?"online":""}"></span>
              <span class="title">${n}</span>
            </div>
            <div class="subtitle">
              ${s?`${this._modeLabel(l)} • Fan: ${d??"Auto"}`:"Offline"}
            </div>
          </div>
          <button
            class="power-btn ${r?"on":""}"
            ?disabled=${!s}
            @click=${()=>this._togglePower(e)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <!-- ── Temperature ── -->
        <div class="temp-block">
          <button
            class="temp-btn"
            ?disabled=${!r||"fan_only"===l||null!=o&&Number(o)<=Number(a)}
            @click=${()=>this._adjustTemp(-1,o,a)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>

          <div class="temp-center">
            <div class="temp-value">
              ${r?"fan_only"===l?"FA":null!=o?`${o}°C`:"--":"--"}
            </div>
            <div class="temp-meta">
              <span class="temp-meta-item">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                ${null!=g?`${g}°C`:"--"}
              </span>
              ${_?B`
                <span class="temp-meta-item">
                  <ha-icon icon="mdi:water-percent"></ha-icon>
                  ${_.state}%
                </span>
              `:""}
            </div>
          </div>

          <button
            class="temp-btn"
            ?disabled=${!r||"fan_only"===l||null!=o&&Number(o)>=Number(c)}
            @click=${()=>this._adjustTemp(1,o,c)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        <!-- ── Filter Alert (always visible if entity configured + active) ── -->
        ${"on"===$?.state?B`
          <div class="alert-banner">
            <div class="alert-left">
              <ha-icon class="alert-icon" icon="mdi:air-filter"></ha-icon>
              <span class="alert-text">Dirty Filter Alert!</span>
            </div>
            <span class="alert-hint">Clean your filter</span>
          </div>
        `:""}

        <!-- ── HVAC Modes ── -->
        <div class="section">
          <div class="section-title">Modes</div>
          <div class="pills">
            ${(i.hvac_modes||[]).filter(t=>"off"!==t).map(t=>B`
              <button
                class="pill ${l===t&&r?"active":""}"
                ?disabled=${!s}
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
            <button
              class="pill ${"fan"===this._openPanel?"active":""}"
              ?disabled=${!r||"dry"===l}
              @click=${()=>this._togglePanel("fan")}
            >
              <ha-icon icon="mdi:fan"></ha-icon>
              Fan: ${d??"Auto"}
            </button>

            ${null!=h?B`
              <button
                class="pill ${"swing_v"===this._openPanel?"active":""}"
                ?disabled=${!r}
                @click=${()=>this._togglePanel("swing_v")}
              >
                <ha-icon icon="mdi:arrow-up-down"></ha-icon>
                Swing V: ${h}
              </button>
            `:""}

            ${null!=p?B`
              <button
                class="pill ${"swing_h"===this._openPanel?"active":""}"
                ?disabled=${!r}
                @click=${()=>this._togglePanel("swing_h")}
              >
                <ha-icon icon="mdi:arrow-left-right"></ha-icon>
                Swing H: ${p}
              </button>
            `:""}
          </div>

          ${"fan"===this._openPanel?B`
            <div class="picker-panel">
              ${(i.fan_modes||[]).map(t=>B`
                <button class="picker-opt ${d===t?"sel":""}"
                        @click=${()=>{this._setFanMode(e,t),this._openPanel=null}}>
                  ${t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              `)}
            </div>
          `:""}

          ${"swing_v"===this._openPanel?B`
            <div class="picker-panel">
              ${(i.swing_modes||[]).map(t=>B`
                <button class="picker-opt ${h===t?"sel":""}"
                        @click=${()=>{this._setSwing(e,t),this._openPanel=null}}>
                  ${t}
                </button>
              `)}
            </div>
          `:""}

          ${"swing_h"===this._openPanel?B`
            <div class="picker-panel">
              ${(i.swing_horizontal_modes||[]).map(t=>B`
                <button class="picker-opt ${p===t?"sel":""}"
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
            ${["none","eco","boost"].map(t=>B`
              <button
                class="pill ${m===t?"active":""}"
                ?disabled=${!r||["dry","auto","fan_only"].includes(l)&&"none"!==t}
                @click=${()=>this._setPreset(t)}
              >
                <ha-icon icon="${this._presetIcon(t)}"></ha-icon>
                ${t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            `)}
          </div>
        </div>

        <!-- ── Convertible Mode — stepped notch slider ── -->
        ${C.length>0?B`
          <div class="section" style="${["dry","auto","fan_only"].includes(l)?"opacity: 0.5; pointer-events: none;":""}">
            <div class="section-title">${U}</div>
            <div class="step-slider-wrap">
              <div class="step-slider-header">
                <span class="step-slider-title">Capacity Limit</span>
                <span class="step-slider-val">
                  ${0===z?"Normal":`${mt(E)}%`}
                </span>
              </div>

              <!-- Track + notch dots -->
              <div class="step-track-outer">
                <div class="step-track-bg">
                  <div class="step-track-fill" style="width: ${O}%"></div>
                </div>
                <div class="step-notches">
                  ${P.map((t,e)=>B`
                    <div class="notch-wrapper">
                      <button
                        class="step-notch
                          ${e<z?"filled":""}
                          ${e===z?"current":""}"
                        title="${0===e?"Normal":`${mt(t)}%`}"
                        ?disabled=${!r||["dry","auto","fan_only"].includes(l)}
                        @click=${()=>this._setPreset(t)}
                      ></button>
                      <span class="notch-label ${e===z?"current":""}">${0===e?"N":mt(t)}</span>
                    </div>
                  `)}
                </div>
              </div>
            </div>
          </div>
        `:""}

        <!-- ── Controls (Nanoe, Display, Coil Clean) ── -->
        ${v||f||y?B`
          <div class="section">
            <div class="section-title">Controls</div>
            <div class="toggles">
              ${v?B`
                <div class="toggle-card"
                     @click=${()=>this._toggleSwitch(t.nanoe_switch,v.state)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===v.state?"active":""}">
                      <ha-icon icon="mdi:air-purifier"></ha-icon>
                    </div>
                    <span class="toggle-label">nanoe™</span>
                  </div>
                  <ha-switch .checked=${"on"===v.state} ?disabled=${!s}></ha-switch>
                </div>
              `:""}
              ${f?B`
                <div class="toggle-card"
                     @click=${()=>this._toggleSwitch(t.display_switch,f.state)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===f.state?"active":""}">
                      <ha-icon icon="mdi:eye"></ha-icon>
                    </div>
                    <span class="toggle-label">AC LED</span>
                  </div>
                  <ha-switch .checked=${"on"===f.state} ?disabled=${!s}></ha-switch>
                </div>
              `:""}
              ${y?B`
                <div class="toggle-card ${r?"disabled":""}"
                     @click=${()=>this._pressButton(t.coil_clean_button)}>
                  <div class="toggle-left">
                    <div class="toggle-icon ${"on"===b?.state?"active":""}">
                      <ha-icon icon="mdi:spray-bottle"></ha-icon>
                    </div>
                    <span class="toggle-label">
                      ${"on"===b?.state?"Cleaning…":"Coil Clean"}
                    </span>
                  </div>
                  <ha-icon class="toggle-action" icon="mdi:play-circle-outline"></ha-icon>
                </div>
              `:""}
            </div>
          </div>
        `:""}

        <!-- ── Energy Cards ── -->
        ${w||A?B`
          <div class="section">
            <div class="section-title">Energy Consumption</div>
            <div class="energy-row">
              ${w?B`
                <div class="energy-card" @click=${()=>this._showMoreInfo(t.energy_today_sensor)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash"></ha-icon>
                    ${w.attributes.friendly_name??"Today"}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${ut(w.state)}</span>
                    <span class="energy-unit">${w.attributes.unit_of_measurement??"kWh"}</span>
                  </div>
                </div>
              `:""}
              ${A?B`
                <div class="energy-card" @click=${()=>this._showMoreInfo(t.energy_yesterday_sensor)}>
                  <div class="energy-label">
                    <ha-icon icon="mdi:flash-outline"></ha-icon>
                    ${A.attributes.friendly_name??"Yesterday"}
                  </div>
                  <div class="energy-value-row">
                    <span class="energy-value">${ut(A.state)}</span>
                    <span class="energy-unit">${A.attributes.unit_of_measurement??"kWh"}</span>
                  </div>
                </div>
              `:""}
            </div>
          </div>
        `:""}

        <!-- ── Wi-Fi Footer ── -->
        ${x?B`
          <div class="footer">
            <ha-icon icon="mdi:wifi"></ha-icon>
            <span>RSSI: ${x.state} ${x.attributes.unit_of_measurement??"dBm"}</span>
          </div>
        `:""}
      </ha-card>
    `}_togglePanel(t){this._haptic("selection"),this._openPanel=this._openPanel===t?null:t}_haptic(t="light"){this.dispatchEvent(new CustomEvent("haptic",{detail:t,bubbles:!0,composed:!0}))}_showMoreInfo(t){this._haptic("selection"),this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_togglePower(t){this._haptic("medium"),"off"!==t.state?this.hass.callService("climate","set_hvac_mode",{entity_id:t.entity_id,hvac_mode:"off"}):this.hass.callService("climate","turn_on",{entity_id:t.entity_id})}_adjustTemp(t,e,i){if(this._haptic("light"),null==e)return;const s=Number(e)+t;null!=i&&(t<0&&s<Number(i)||t>0&&s>Number(i))||this.hass.callService("climate","set_temperature",{entity_id:this._config.entity,temperature:s})}_setHvacMode(t){this._haptic("light"),this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}_setFanMode(t,e){this._haptic("selection"),this.hass.callService("climate","set_fan_mode",{entity_id:t.entity_id,fan_mode:e})}_setSwing(t,e){this._haptic("selection"),this.hass.callService("climate","set_swing_mode",{entity_id:t.entity_id,swing_mode:e})}_setHSwing(t,e){this._haptic("selection"),this.hass.callService("climate","set_swing_horizontal_mode",{entity_id:t.entity_id,swing_horizontal_mode:e})}_setPreset(t){this._haptic("light"),this.hass.callService("climate","set_preset_mode",{entity_id:this._config.entity,preset_mode:t})}_toggleSwitch(t,e){this._haptic("light"),this.hass.callService("switch","on"===e?"turn_off":"turn_on",{entity_id:t})}_pressButton(t){this._haptic("medium"),this.hass.callService("button","press",{entity_id:t})}_modeLabel(t){return{cool:"Cool",dry:"Dry",fan_only:"Fan",auto:"Auto",heat:"Heat",off:"Off"}[t]??t.charAt(0).toUpperCase()+t.slice(1)}_modeIcon(t){return{cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",auto:"mdi:cached",heat:"mdi:fire"}[t]??"mdi:air-conditioner"}_presetIcon(t){return{eco:"mdi:leaf",boost:"mdi:rocket",none:"mdi:close-circle-outline"}[t]??"mdi:play-circle-outline"}getCardSize(){return 5}};t([dt({attribute:!1})],gt.prototype,"hass",void 0),t([ht()],gt.prototype,"_config",void 0),t([ht()],gt.prototype,"_openPanel",void 0),gt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("miraie-ac-card-in")],gt);export{gt as MirAIeACCard};
