/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","./ContextMenuActions","TYPO3/CMS/Core/Event/ThrottleEvent"],(function(t,e,s,i,n,o){"use strict";s=__importDefault(s);class a{constructor(){this.mousePos={X:null,Y:null},this.delayContextMenuHide=!1,this.record={uid:null,table:null},this.eventSources=[],this.storeMousePositionEvent=t=>{this.mousePos={X:t.pageX,Y:t.pageY},this.mouseOutFromMenu("#contentMenu0"),this.mouseOutFromMenu("#contentMenu1")},this.initializeEvents()}static drawActionItem(t){const e=t.additionalAttributes||{};let s="";for(const t of Object.entries(e)){const[e,i]=t;s+=" "+e+'="'+i+'"'}return'<li role="menuitem" class="list-group-item" tabindex="-1" data-callback-action="'+t.callbackAction+'"'+s+'><span class="list-group-item-icon">'+t.icon+"</span> "+t.label+"</li>"}static within(t,e,s){const i=t.offset();return s>=i.top&&s<i.top+t.height()&&e>=i.left&&e<i.left+t.width()}static initializeContextMenuContainer(){if(0===s.default("#contentMenu0").length){const t='<div id="contentMenu0" class="context-menu"></div><div id="contentMenu1" class="context-menu" style="display: block;"></div>';s.default("body").append(t)}}initializeEvents(){s.default(document).on("click contextmenu",".t3js-contextmenutrigger",t=>{const e=s.default(t.currentTarget);e.prop("onclick")&&"click"===t.type||(t.preventDefault(),this.show(e.data("table"),e.data("uid"),e.data("context"),e.data("iteminfo"),e.data("parameters"),t.target))}),new o("mousemove",this.storeMousePositionEvent.bind(this),50).bindTo(document)}show(t,e,s,i,n,o=null){this.record={table:t,uid:e};const a=o.matches("a, button, [tabindex]")?o:o.closest("a, button, [tabindex]");this.eventSources.push(a);let l="";void 0!==t&&(l+="table="+encodeURIComponent(t)),void 0!==e&&(l+=(l.length>0?"&":"")+"uid="+e),void 0!==s&&(l+=(l.length>0?"&":"")+"context="+s),void 0!==i&&(l+=(l.length>0?"&":"")+"enDisItems="+i),void 0!==n&&(l+=(l.length>0?"&":"")+"addParams="+n),this.fetch(l)}fetch(t){const e=TYPO3.settings.ajaxUrls.contextmenu;new i(e).withQueryArguments(t).get().then(async t=>{const e=await t.resolve();void 0!==t&&Object.keys(t).length>0&&this.populateData(e,0)})}populateData(e,i){a.initializeContextMenuContainer();const o=s.default("#contentMenu"+i);if(o.length&&(0===i||s.default("#contentMenu"+(i-1)).is(":visible"))){const a=this.drawMenu(e,i);o.html('<ul class="list-group">'+a+"</ul>"),s.default("li.list-group-item",o).on("click",e=>{e.preventDefault();const o=s.default(e.currentTarget);if(o.hasClass("list-group-item-submenu"))return void this.openSubmenu(i,o,!1);const a=o.data("callback-action"),l=o.data("callback-module");o.data("callback-module")?t([l],t=>{t[a].bind(o)(this.record.table,this.record.uid)}):n&&"function"==typeof n[a]?n[a].bind(o)(this.record.table,this.record.uid):console.log("action: "+a+" not found"),this.hideAll()}),s.default("li.list-group-item",o).on("keydown",t=>{const e=s.default(t.currentTarget);switch(t.key){case"Down":case"ArrowDown":this.setFocusToNextItem(e.get(0));break;case"Up":case"ArrowUp":this.setFocusToPreviousItem(e.get(0));break;case"Right":case"ArrowRight":if(!e.hasClass("list-group-item-submenu"))return;this.openSubmenu(i,e,!0);break;case"Home":this.setFocusToFirstItem(e.get(0));break;case"End":this.setFocusToLastItem(e.get(0));break;case"Enter":case"Space":e.click();break;case"Esc":case"Escape":case"Left":case"ArrowLeft":this.hide("#"+e.parents(".context-menu").first().attr("id"));break;case"Tab":this.hideAll();break;default:return}t.preventDefault()}),o.css(this.getPosition(o,!1)).show(),s.default("li.list-group-item[tabindex=-1]",o).first().focus()}}setFocusToPreviousItem(t){let e=this.getItemBackward(t.previousElementSibling);e||(e=this.getLastItem(t)),e.focus()}setFocusToNextItem(t){let e=this.getItemForward(t.nextElementSibling);e||(e=this.getFirstItem(t)),e.focus()}setFocusToFirstItem(t){let e=this.getFirstItem(t);e&&e.focus()}setFocusToLastItem(t){let e=this.getLastItem(t);e&&e.focus()}getItemBackward(t){for(;t&&(!t.classList.contains("list-group-item")||"-1"!==t.getAttribute("tabindex"));)t=t.previousElementSibling;return t}getItemForward(t){for(;t&&(!t.classList.contains("list-group-item")||"-1"!==t.getAttribute("tabindex"));)t=t.nextElementSibling;return t}getFirstItem(t){return this.getItemForward(t.parentElement.firstElementChild)}getLastItem(t){return this.getItemBackward(t.parentElement.lastElementChild)}openSubmenu(t,e,i){this.eventSources.push(e[0]);const n=s.default("#contentMenu"+(t+1)).html("");e.next().find(".list-group").clone(!0).appendTo(n),n.css(this.getPosition(n,i)).show(),s.default(".list-group-item[tabindex=-1]",n).first().focus()}getPosition(t,e){let i=0,n=0;if(this.eventSources.length&&(null===this.mousePos.X||e)){const t=this.eventSources[this.eventSources.length-1].getBoundingClientRect();i=this.eventSources.length>1?t.right:t.x,n=t.y}else i=this.mousePos.X,n=this.mousePos.Y;const o=s.default(window).width()-20,a=s.default(window).height(),l=t.width(),u=t.height(),r=i-s.default(document).scrollLeft(),c=n-s.default(document).scrollTop();return a-u<c&&(c>u?n-=u-10:n+=a-u-c),o-l<r&&(r>l?i-=l-10:o-l-r<s.default(document).scrollLeft()?i=s.default(document).scrollLeft():i+=o-l-r),{left:i+"px",top:n+"px"}}drawMenu(t,e){let s="";for(const i of Object.values(t))if("item"===i.type)s+=a.drawActionItem(i);else if("divider"===i.type)s+='<li role="separator" class="list-group-item list-group-item-divider"></li>';else if("submenu"===i.type||i.childItems){s+='<li role="menuitem" aria-haspopup="true" class="list-group-item list-group-item-submenu" tabindex="-1"><span class="list-group-item-icon">'+i.icon+"</span> "+i.label+'&nbsp;&nbsp;<span class="fa fa-caret-right"></span></li>';s+='<div class="context-menu contentMenu'+(e+1)+'" style="display:none;"><ul role="menu" class="list-group">'+this.drawMenu(i.childItems,1)+"</ul></div>"}return s}mouseOutFromMenu(t){const e=s.default(t);e.length>0&&e.is(":visible")&&!a.within(e,this.mousePos.X,this.mousePos.Y)?this.hide(t):e.length>0&&e.is(":visible")&&(this.delayContextMenuHide=!0)}hide(t){this.delayContextMenuHide=!1,window.setTimeout(()=>{if(!this.delayContextMenuHide){s.default(t).hide();const e=this.eventSources.pop();e&&s.default(e).focus()}},500)}hideAll(){this.hide("#contentMenu0"),this.hide("#contentMenu1")}}return new a}));