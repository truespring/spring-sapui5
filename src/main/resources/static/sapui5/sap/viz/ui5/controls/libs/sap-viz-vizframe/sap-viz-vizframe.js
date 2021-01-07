/* SAP CVOM 4.0 © <2012-2014> SAP SE. All rights reserved. Build Version 1.9.0, Build context N/A */
sap.viz.moduleloader.originalDefine=define;sap.viz.moduleloader.originalRequire=require;sap.viz.moduleloader.originalRequirejs=requirejs;var define=sap.viz.moduleloader.define;var require=sap.viz.moduleloader.require.config({context:"lw-vizframe",exportMap:{'sap/viz/vizframe/frame/VizFrame':'sap.viz.vizframe.VizFrame','sap/viz/vizframe/common/Version':'sap.viz.vizframe.VERSION'}});var requirejs=require;define('sap/viz/vizframe/common/Version',['exports'],function(){return'1.9.0';});define('sap/viz/vizframe/api/Version',['sap/viz/vizframe/common/Version','require'],function(V){sap.viz.vizframe.VERSION=V;return V;});define('sap/viz/vizframe/api/APIUtil',[],function(){var w={};function b(p,i,m){m.split(/\s+/).forEach(function(k){p[k]=function(){return c(this[i][k].apply(this[i],arguments));};});}function a(p,i,d){d.split(/\s+/).forEach(function(k){Object.defineProperty(p,k,{enumerable:true,configurable:true,get:function(){return this[i][k];},set:function(v){return(this[i][k]=v);}});});}function s(f,t){w[f]=t;}function c(o){if(o==null){return o;}if(o.__wrapper__){return o.__wrapper__;}if(o.__className&&w[o.__className]){return new w[o.__className](o);}return o;}return{buildProxyMethods:b,buildProxyProperty:a,wrap:c,setWrapping:s};});define("jquery",[],function(){return jQuery;});define("sap/viz/vizframe/common/LanguageLoader",[],function(){sap.viz.extapi.env.Language.register({id:'language',value:{VIZ_FRAME_CONTROL_LOAD_ERROR:"Failed to load the control object {0}.",VIZ_FRAME_INVALID:"Invalid VizFrame instance.",VIZ_FRAME_DESTORYED:"VizFrame instance was destroyed.",}});});define('sap/viz/vizframe/common/utils/OOUtil',[],function(){var O={};O.extend=function(s,a){var b=s.prototype;s.superclass=a.prototype;var F=function(){};F.prototype=a.prototype;s.prototype=new F();for(var p in b){if(b.hasOwnProperty(p)){s.prototype[p]=b[p];}}s.prototype.constructor=s;if(a.prototype.constructor==Object.prototype.constructor){a.prototype.constructor=a;}return s;};return O;});define('sap/viz/vizframe/common/utils/utils',[],function(){var u={};var h=Object.prototype.hasOwnProperty;var c={'[object Boolean]':'boolean','[object Number]':'number','[object String]':'string','[object Function]':'function','[object Array]':'array','[object Date]':'date','[object RegExp]':'regexp','[object Object]':'object'};u.type=function(o){return o==null?String(o):c[Object.prototype.toString.call(o)]||"object";};u.isObject=function(o){var t=typeof o;return t==='function'||t==='object'&&!!o;};u.isFunction=function(o){return u.type(o)==="function";};u.isBoolean=function(o){return u.type(o)==="boolean";};u.isString=function(o){return u.type(o)==="string";};u.isArray=function(o){return u.type(o)==="array";};u.isNumber=function(o){return u.type(o)==="number";};u.isObject=function(o){return u.type(o)==="object";};u.isPlainObject=function(o){if(!o||u.type(o)!=="object"||o.nodeType||(o&&typeof o==="object"&&"setInterval"in o)){return false;}if(o.constructor&&!h.call(o,"constructor")&&!h.call(o.constructor.prototype,"isPrototypeOf")){return false;}var k;for(k in o){}return k===undefined||h.call(o,k);},u.isEmptyObject=function(o){for(var n in o){if(o.hasOwnProperty(n)){return false;}}return u.isPlainObject(o);},u.isRegExp=function(o){return u.type(o)==="regexp";};u.noop=function(){};u.substitute=function(s,r){if(!s){return'';}for(var i=1;i<arguments.length;i++){s=s.replace(new RegExp("\\{"+(i-1)+"\\}","g"),arguments[i]);}return s;};u.deepEqual=function(s,t){if(typeof s==='object'&&typeof t==='object'&&u.isExist(s)&&u.isExist(t)){var k=null;for(k in s){if(s.hasOwnProperty(k)){if(!t.hasOwnProperty(k)){return false;}else if(!u.deepEqual(s[k],t[k])){return false;}}}for(k in t){if(t.hasOwnProperty(k)){if(!s.hasOwnProperty(k)){return false;}}}return true;}else{return s===t;}};u.isExist=function(o){if((typeof(o)==='undefined')||(o===null)){return false;}return true;};return u;});define('sap/viz/vizframe/common/events/Event',[],function(){var E=function(t,a,d){this.__className="sap.viz.vizframe.common.events.Event";this._type=t;this._target=a;this.data=d;};E.prototype.type=function(){return this._type;};E.prototype.target=function(){return this._target;};return E;});define('sap/viz/vizframe/common/events/EventDispatcher',['sap/viz/vizframe/common/utils/utils'],function(u){var E=function(){this.__className="sap.viz.vizframe.common.events.EventDispatcher";this._enableDispatchEvent=true;};E.prototype.addEventListener=function(t,l,s,p){if(!p){p=0;}var e=this._findEventListener(t,l,s);if(e){return;}e={type:t,scope:s,listener:l,priority:p};var a=this.listeners()[t];if(!a){this.listeners()[t]=a=[e];}else{var i=false;for(var n=0;n<a.length;++n){var b=a[n];if(p>b.priority){a.splice(n,0,e);i=true;break;}}if(i===false){a.push(e);}}};E.prototype.removeEventListener=function(t,l,s){var e=this._findEventListener(t,l,s);if(e){var a=this.listeners()[t];a.splice(a.indexOf(e),1);}};E.prototype.removeEventListeners=function(t){this.listeners()[t]=[];};E.prototype.removeAllEventListeners=function(){this._listeners={};};E.prototype.hasEventListener=function(t,l,s){var e=this._findEventListener(t,l,s);return e!==null;};E.prototype.hasEventListeners=function(t){var l=this.listeners()[t];if(l){return l.length>0;}return false;};E.prototype._dispatchEvent=function(e){if(this._enableDispatchEvent===undefined){this._enableDispatchEvent=true;}if(this._enableDispatchEvent){var t=e.type();var l=this.listeners()[t];if(l){var c=l.slice(0);for(var n=0;n<c.length;++n){var a=c[n];a.listener.call(a.scope,e);}}}};E.prototype.enableDispatchEvent=function(v){if(this._enableDispatchEvent===undefined){this._enableDispatchEvent=true;}if(arguments.length>=1){if(u.isBoolean(v)){this._enableDispatchEvent=v;}return this;}else{return this._enableDispatchEvent;}};E.prototype._findEventListener=function(t,l,s){var a=this.listeners()[t];if(!a){return null;}for(var n=0;n<a.length;++n){var e=a[n];if(e.listener===l&&e.scope===s){return e;}}return null;};E.prototype.listeners=function(){if(this._listeners===undefined){this._listeners={};}return this._listeners;};return E;});define('sap/viz/vizframe/common/UIControl',['jquery','sap/viz/vizframe/common/utils/OOUtil','sap/viz/vizframe/common/events/EventDispatcher'],function($,O,E){var U=function U(d){U.superclass.constructor.apply(this,arguments);this.__className="sap.viz.vizframe.common.UIControl";this._dom=d;this._dom$=$(d);};O.extend(U,E);U.prototype.dom$=function(){return this._dom$;};U.prototype.destroy=function(){this.removeAllEventListeners();if(this._dom$){this._dom$.empty().removeData().off();}this._dom=null;this._dom$=null;};return U;});define('sap/viz/vizframe/frame/viz/VizUtil',['jquery'],function($){var V={};var P=["data","bindings","customizations","template","size","sharedRuntimeScales"];V.mergeOptions=function(d,s){for(var i=0;i<P.length;++i){if(s[P[i]]){d[P[i]]=s[P[i]];}}if(s.properties){d.properties=sap.viz.vizservices.__internal__.PropertyService.mergeProperties(d.type,d.properties,s.properties);}if(s.scales){if(s.scalesOption){d.scalesOption=$.extend({},s.scalesOption);}d.scales=sap.viz.vizservices.__internal__.ScaleService.mergeScales(d.type,d.scales,s.scales);}return d;};return V;});define('sap/viz/vizframe/frame/viz/VizCache',['sap/viz/vizframe/frame/viz/VizUtil'],function(V){var a=function(o){this.__className='sap.viz.vizframe.frame.viz.VizCache';this._options=o;};a.generateFromVizInstance=function(v,p){var r=p.scalesOption&&p.scalesOption.level==='user'&&p.scalesOption.replace;var o={'data':v.data(),'bindings':v.bindings(),'scales':v.scales([],{'level':'user','isRender':false,'replace':r}),'properties':v.properties({},{'level':'user','isRender':false}),'customizations':v.customizations(),'template':v.template()};var s=v.size();if(!s.auto){o.size=s;}return new a(o);};a.generateFromOptions=function(o){return new a(o);};a.prototype.options=function(v){if(arguments.length){this._options=v;}else{return this._options;}};a.prototype.update=function(o){V.mergeOptions(this._options,o);};return a;});define('sap/viz/vizframe/frame/viz/Viz',['sap/viz/vizframe/common/utils/OOUtil','sap/viz/vizframe/common/UIControl','sap/viz/vizframe/frame/viz/VizCache','sap/viz/vizframe/frame/viz/VizUtil'],function(O,U,V,a){var b=function(d,c,e){b.superclass.constructor.apply(this,arguments);this.__className='sap.viz.vizframe.frame.viz.Viz';this._onCaches=[];this._type=null;this._vizInstance=null;this._vizCache=null;this._beforeRenderCallback=c;this._afterRenderCallback=e;};O.extend(b,U);b.prototype._getDataRange=function(s,e){return this._vizInstance&&this._vizInstance._getDataRange(s,e);};b.prototype.update=function(o){this._beforeRenderCallback();try{if(!this._vizInstance){this._createVizInstance(o);}else{if(o.type!==undefined&&o.type!==this._type){this._vizCache=V.generateFromVizInstance(this._vizInstance,o);this._clearVizInstance();this._createVizInstance(o);}else{this._updateVizInstance(o);}}}catch(e){this._afterRenderCallback();throw e;}};b.prototype.type=function(){return this._type;};b.prototype.save=function(){if(this._vizInstance){return sap.viz.api.core.exportViz(this._vizInstance);}else{return{'type':'vizCache','options':this._vizCache.options()};}};b.prototype.load=function(j){this._clearVizInstance();if(j.type==='vizCache'){this._vizCache=V.generateFromOptions(j.options);}else{this._vizCache=null;this._beforeRenderCallback();try{this._vizInstance=sap.viz.api.core.loadViz(j,this._dom);this._initVizInstance();this._type=j.type;}finally{this._afterRenderCallback();}}};b.prototype.destroy=function(){this._clearVizInstance();this._vizCache=null;this._onCaches=null;};['data','bindings','properties','scales','sharedRuntimeScales','customizations','template'].forEach(function(n){(function(n){b.prototype[n]=function(){var o={};var r;if(arguments.length>=2){o[n]=arguments[0];o[n+'Option']=arguments[1];if(this._vizInstance){this._beforeRenderCallback();r=this._vizInstance[n](o[n],o[n+'Option']);this._afterRenderCallback();}else{this._vizCache.update(o);return this._vizCache.options()[n];}}else if(arguments.length===1){o[n]=arguments[0];this.update(o);return this;}else{if(this._vizInstance){return this._vizInstance[n]();}else{return this._vizCache.options()[n];}}return r===this._vizInstance?this:r;};})(n);});['selection','propertyZone','feedingZone','runtimeScales','size'].forEach(function(n){(function(n){b.prototype[n]=function(){if(this._vizInstance){return this._vizInstance[n].apply(this._vizInstance,arguments);}else{return[];}};})(n);});['states','exportToSVGString'].forEach(function(n){(function(n){b.prototype[n]=function(){var r;if(this._vizInstance){r=this._vizInstance[n].apply(this._vizInstance,arguments);}return r===this._vizInstance?this:r;}})(n);});b.prototype.on=function(t,c){if(this._vizInstance){this._vizInstance.on(t,c);}this._onCaches.push({'type':t,'callback':c});};b.prototype.off=function(t){if(this._vizInstance){this._vizInstance.off(t);}this._onCaches=this._onCaches.filter(function(c){return t!==c.type;});};b.prototype.zoom=function(o){if(this._vizInstance){this._vizInstance.states({zoomInOut:o});}};b.prototype._createVizInstance=function(o){try{if(o.type){this._type=o.type;}var m=null;if(this._vizCache){m={'type':this._type};a.mergeOptions(m,this._vizCache.options());a.mergeOptions(m,o);}else{m=o;}m.container=this._dom;this._vizInstance=sap.viz.api.core.createViz(m);this._initVizInstance();this._vizCache=null;}catch(e){if(this._vizCache){this._vizCache.options(m);}else{this._vizCache=V.generateFromOptions(o);}this._clearVizInstance();throw e;}};b.prototype._updateVizInstance=function(o){try{if(o.type){this._type=o.type;}this._vizInstance.update(o);}catch(e){this._vizCache=V.generateFromVizInstance(this._vizInstance,o);this._vizCache.update(o);this._clearVizInstance();throw e;}};b.prototype._initVizInstance=function(){this._vizInstance.on('renderComplete',(function(){this._afterRenderCallback();}.bind(this)));this._onCaches.forEach(function(c){this._vizInstance.on(c.type,c.callback);}.bind(this));};b.prototype._clearVizInstance=function(){if(this._vizInstance){this._vizInstance.destroy();}this._vizInstance=null;};return b;});define('sap/viz/vizframe/frame/VizFrameEvent',['sap/viz/vizframe/common/utils/OOUtil','sap/viz/vizframe/common/events/Event'],function(O,E){var V=function(t,a,d){V.superclass.constructor.apply(this,arguments);this.__className="sap.viz.vizframe.common.events.VizFrameEvent";};O.extend(V,E);V.BEFORE_RENDER="beforeRender";V.AFTER_RENDER='afterRender';return V;});define('sap/viz/vizframe/frame/VizFrameConfig',[],function(){var V={};V.instance=function(){return JSON.parse(JSON.stringify({'controls':{'morpher':{'enabled':true}}}));};return V;});define('sap/viz/vizframe/frame/VizFrameProxy',['jquery','sap/viz/vizframe/common/utils/OOUtil','sap/viz/vizframe/common/events/EventDispatcher'],function($,O,E){var V=function V(v){this._vizframe=v;};V.prototype.dataset=function(){try{return this._vizframe.data.apply(this._vizframe,arguments);}catch(e){return null;}};V.prototype.vizType=function(){try{return this._vizframe.type.apply(this._vizframe,arguments);}catch(e){return null;}};V.prototype.feedingZone=function(){try{return this._vizframe.feedingZone.apply(this._vizframe,arguments);}catch(e){return null;}};V.prototype.addEventListener=function(){this._vizframe.addEventListener.apply(this._vizframe,arguments);};V.prototype.removeEventListener=function(){this._vizframe.removeEventListener.apply(this._vizframe,arguments);};return V;});define('sap/viz/vizframe/frame/ControlFactory',['require'],function(r){var C=function(){this.__className="sap.viz.vizframe.frame.ControlFactory";};var c={'morpher':'sap/viz/vizframe/controls/morpher/Morpher'};C.createControl=function(i,d,a,p){var b=null;try{if(c[i]){var f=r(c[i]);b=new f(d,a,p);}}catch(e){}return b;};return C;});define('sap/viz/vizframe/frame/VizFrame',['jquery','sap/viz/vizframe/common/LanguageLoader','sap/viz/vizframe/common/utils/OOUtil','sap/viz/vizframe/common/utils/utils','sap/viz/vizframe/common/events/Event','sap/viz/vizframe/common/events/EventDispatcher','sap/viz/vizframe/frame/viz/Viz','sap/viz/vizframe/frame/VizFrameEvent','sap/viz/vizframe/frame/VizFrameConfig','sap/viz/vizframe/frame/VizFrameProxy','sap/viz/vizframe/frame/ControlFactory','exports'],function($,L,O,u,E,a,V,b,c,d,C){var f=function(o,g){f.superclass.constructor.call(this);this.__className='sap.viz.vizframe.frame.VizFrame';this._dom=o.container,this._dom$=$(this._dom);this._config=$.extend(true,c.instance(),g);this._destroyed=false;this._vizInstanceContainer=document.createElement('div');$(this._vizInstanceContainer).appendTo(this._dom$).css({'width':'100%','height':'100%'});this._viz=new V(this._vizInstanceContainer,function(){this._dispatchEvent(new b(b.BEFORE_RENDER,this));}.bind(this),function(){this._dispatchEvent(new b(b.AFTER_RENDER,this));}.bind(this));this._controlsContainer=document.createElement('div');$(this._controlsContainer).appendTo(this._dom$);this._controls={};var i=null;for(i in this._config.controls){if(this._config.controls[i].enabled!==false){try{this._enableControl(i,this._config.controls[i].config);}catch(e){if(g&&g.controls&&g.controls[i]&&g.controls[i].hasOwnProperty("enabled")&&g.controls[i].enabled!==false){throw e;}}}}try{this._viz.update(o);}catch(h){if(this._config.throwError===true){throw h;}}};O.extend(f,a);['data','bindings','properties','scales','sharedRuntimeScales','runtimeScales','customizations','template','exportToSVGString',"states",'size','update','selection','propertyZone','feedingZone','on','off'].forEach(function(n){(function(n){f.prototype[n]=function(){this._validateLifecycle();var r=this._viz[n].apply(this._viz,arguments);return r===this._viz?this:r;};})(n);});f.prototype._getDataRange=function(s,e){return this._viz._getDataRange(s,e);};f.prototype.getControl=function(i){return this._controls[i];};f.prototype.enableControl=function(i,e){this._validateLifecycle();return this._enableControl.apply(this,arguments);};f.prototype.disableControl=function(i){this._validateLifecycle();return this._disableControl.apply(this,arguments);};f.prototype.destroy=function(){this._validateLifecycle();for(var i in this._controls){this._disableControl(i);}if(this._viz){this._viz.destroy();}this.removeAllEventListeners();if(this._dom$){this._dom$.empty().removeData().off();}this._dom=null;this._dom$=null;this._destroyed=true;};f.prototype.type=function(t){this._validateLifecycle();if(arguments.length>0){this.update({'type':t});return this;}else{return this._viz.type();}};f.prototype.save=function(){this._validateLifecycle();return this._viz.save();};f.prototype.load=function(j){this._validateLifecycle();this._viz.load(j);};f.prototype.zoom=function(o){this._viz.zoom(o);};f.prototype._validateLifecycle=function(o){if(this._destroyed){throw u.substitute(sap.viz.extapi.env.Language.getResourceString('VIZ_FRAME_DESTORYED'));}};f.prototype._enableControl=function(i,e){if(this.getControl(i)){return;}var g=this._attachControl(i);var h=C.createControl(i,g,e,new d(this));if(h){if(i==='morpher'){h.bindVizInstanceContainer(this._vizInstanceContainer);}this._controls[i]=h;}else{throw u.substitute(sap.viz.extapi.env.Language.getResourceString('VIZ_FRAME_CONTROL_LOAD_ERROR'),i);}};f.prototype._disableControl=function(i){var e=this._controls[i];if(!e){return;}if(e.dom$()){e.dom$().detach();}e.destroy();delete this._controls[i];};f.prototype._attachControl=function(i){var e=null;if(i==='morpher'){e=$(document.createElement('div')).appendTo(this._controlsContainer);e.css({'position':'absolute','left':'0px','top':'0px'});}return e?e.get(0):null;};return f;});define('sap/viz/vizframe/api/VizFrame',["sap/viz/vizframe/api/APIUtil","sap/viz/vizframe/frame/VizFrame","require",],function(A,V){var a=sap.viz.vizframe.VizFrame=function(d,u){this.__internal_reference_VizFrame__=new V(d,u);this.__internal_reference_VizFrame__.__wrapper__=this;};A.setWrapping("sap.viz.vizframe.VizFrame",a);A.buildProxyMethods(a.prototype,"__internal_reference_VizFrame__",["enableControl","disableControl","destroy","on","off","type","update","data","bindings","properties","scales","customizations","template","selection","propertyZone","feedingZone","size","save","load","exportToSVGString","sharedRuntimeScales","runtimeScales","states","zoom","_getDataRange"].join(" "));return a;});(function(){var l=define&&define.__autoLoad;if(l&&l.length){define.__autoLoad=[];require(l);}})();define=sap.viz.moduleloader.originalDefine;require=sap.viz.moduleloader.originalRequire;requirejs=sap.viz.moduleloader.originalRequirejs;