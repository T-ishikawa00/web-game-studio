var Ws={field:["WIDE FIELD","\u5E83\u57DF\u30D5\u30A3\u30FC\u30EB\u30C9","While holding: gather from 100 farther away","\u62BC\u3057\u3066\u3044\u308B\u9593\u3001\u5438\u5F15\u7BC4\u56F2+100\u3002\u9060\u3044\u7834\u7247\u3078\u5C4A\u304F"],brake:["RECOIL BRAKE","\u53CD\u52D5\u30D6\u30EC\u30FC\u30AD","Stay on your firing line after launch","\u5C04\u51FA\u306E\u53CD\u52D5\u3092\u6291\u3048\u3001\u72D9\u3063\u305F\u4F4D\u7F6E\u3092\u4FDD\u3064"],drive:["SALVAGE DRIVE","\u56DE\u53CE\u30C9\u30E9\u30A4\u30D6","Enemy armor pickup gives 1.8s movement boost","\u6575\u88C5\u7532\u306E\u56DE\u53CE\u5F8C1.8\u79D2\u3001\u79FB\u52D5\u901F\u5EA6\u304C\u4E0A\u304C\u308B"],shock:["SHOCK RING","\u885D\u6483\u30EA\u30F3\u30B0","Launch pushes nearby normal guards away","\u5C04\u51FA\u6642\u3001\u8FD1\u304F\u306E\u901A\u5E38\u6575\u3092\u62BC\u3057\u8FD4\u3059\u3002\u30DC\u30B9\u5BFE\u8C61\u5916"],swarm:["SWARM COIL","\u30B9\u30A6\u30A9\u30FC\u30E0\u30B3\u30A4\u30EB","Wide collection \xB7 spreading volleys","\u5E83\u57DF\u5438\u5F15\u3068\u6247\u72B6\u306E\u4E00\u6589\u5C04\u51FA"],lance:["LANCE RAIL","\u30E9\u30F3\u30B9\u30EC\u30FC\u30EB","Narrow fast shots \xB7 pierce a line of enemies","\u9AD8\u901F\u306E\u7D30\u3044\u5C04\u7DDA\u3002\u4E26\u3093\u3060\u6575\u3092\u8CAB\u304F"],satellite:["SATELLITE GUARD","\u885B\u661F\u30AC\u30FC\u30C9","Launch reserves 4 shields \xB7 hit pieces scatter briefly","\u5C04\u51FA\u66424\u7247\u3092\u76FE\u306B\u6B8B\u3059\u3002\u88AB\u5F3E\u3057\u305F\u7247\u306F\u4E00\u6642\u96E2\u8131"],foundry:["FOUNDRY LANCE","\u53CE\u675F\u30E9\u30F3\u30B9","Bundle up to 3 pieces per heavy shot \xB7 reclaim manually","\u6700\u59273\u7247\u3092\u91CD\u3044\u5F3E\u3078\u675F\u306D\u308B\u3002\u5916\u3057\u305F\u5F3E\u306F\u5438\u5F15\u3067\u56DE\u53CE"],cyclone:["CYCLONE","\u30B5\u30A4\u30AF\u30ED\u30F3","Wide volley \xB7 launch opens nearby shields","\u5E83\u3044\u4E00\u6589\u5C04\u51FA\u3002\u8FD1\u304F\u306E\u76FE\u3092\u5C04\u51FA\u6642\u306B\u958B\u304F"],return:["RETURN","\u30EA\u30BF\u30FC\u30F3","Pierce 4 targets \xB7 shots return automatically","4\u4F53\u8CAB\u901A\u3002\u5C04\u51FA\u5F8C\u306E\u91D1\u5C5E\u3092\u81EA\u52D5\u56DE\u53CE"]};var $c=[["BOOT THE CRANE","\u30AF\u30EC\u30FC\u30F3\u3092\u518D\u8D77\u52D5","Clear guards to auto-power \xB7 shoot relays early to open shields","\u6575\u304C\u3044\u306A\u304F\u306A\u308B\u3068\u81EA\u52D5\u9001\u96FB / \u6226\u95D8\u4E2D\u306E\u9001\u96FB\u3067\u76FE\u3092\u958B\u304F"],["BYPASS THE GUARD","\u88C5\u7532\u3092\u8FC2\u56DE","Flank shields \xB7 power both relays","\u76FE\u306E\u6A2A\u3092\u53D6\u308A\u30012\u3064\u306E\u8A2D\u5099\u3078\u9001\u96FB"],["OPEN THE PRESS","\u30D7\u30EC\u30B9\u3092\u958B\u653E","Bait the charge \xB7 reclaim the firing lane","\u7A81\u9032\u3092\u8A98\u3044\u3001\u5C04\u51FA\u3059\u308B\u5834\u6240\u3092\u3064\u304F\u308B"],["ROUTE THE CURRENT","\u96FB\u6D41\u3092\u3064\u306A\u3050","Leave the marked floor lane \xB7 connect three relays","\u5E8A\u306E\u4E88\u544A\u7DDA\u3092\u907F\u3051\u30013\u3064\u306E\u8A2D\u5099\u3092\u63A5\u7D9A"],["BREAK THE OVERSEER","\u76E3\u7763\u6A5F\u3092\u7A81\u7834","Mixed guards \xB7 crossing current \xB7 final evolution next","\u6DF7\u6210\u6575\u3068\u6A2A\u5207\u308B\u96FB\u6D41\u3002\u6B21\u306F\u6700\u7D42\u9032\u5316"],["RECLAIM THE REACTOR","\u7089\u5FC3\u3092\u53D6\u308A\u623B\u3059","Power a lock \xB7 dodge \xB7 strike the open core","\u9001\u96FB \u2192 \u53CD\u6483\u3092\u56DE\u907F \u2192 \u7089\u5FC3\u3092\u653B\u6483\u30023\u56DE\u3067\u6C7A\u7740"]];var jc=["field","brake","drive","shock"],vi=(n,e,t,i,s,r,a=[],o)=>({id:n,title:[e,t],hint:[i,s],enemies:r,reinforcements:a,relay:n.endsWith("2")||n.endsWith("4")?[.25,.7]:[.74,.7],quota:r.some(c=>c[0]==="carrier"||c[0]==="controller")?0:Math.min(18,(r.length+a.length)*3),lane:o}),Xs={B:[vi("b1","CUT THE FIRING LINE","\u5C04\u7DDA\u3092\u65AD\u3064","Dodge the rail warning \xB7 flank the shield","\u7832\u306E\u4E88\u544A\u7DDA\u3092\u907F\u3051\u3001\u76FE\u306E\u6A2A\u3078\u56DE\u308B",[["shield",.53,.4],["gunner",.76,.32],["basic",.28,.28]],[["gunner",.22,.62],["charger",.75,.25]]),vi("b2","BREAK THE REPAIR LINK","\u4FEE\u7406\u7DB2\u3092\u5D29\u3059","Destroy support to expose its allies","\u652F\u63F4\u6A5F\u3092\u58CA\u3059\u3068\u4EF2\u9593\u306E\u76FE\u304C\u958B\u304F",[["support",.7,.3],["shield",.48,.45],["charger",.25,.32],["gunner",.77,.64]],[["support",.24,.3],["charger",.72,.72]]),vi("b3","CROSS THE RAILS","\u4EA4\u5DEE\u5C04\u7DDA\u3092\u629C\u3051\u308B","Silence one rail \xB7 move into the cleared side","\u7247\u5074\u306E\u7832\u3092\u6B62\u3081\u3001\u7A7A\u3044\u305F\u5074\u3078\u79FB\u308B",[["gunner",.25,.28],["gunner",.76,.64],["shield",.55,.4]],[["basic",.35,.66],["charger",.77,.3]]),vi("b4","OPEN THE TRANSFER","\u642C\u9001\u8DEF\u3092\u958B\u304F","Bait the charge off the marked transfer lane","\u5E8A\u306E\u4E88\u544A\u5E2F\u304B\u3089\u7A81\u9032\u3092\u8A98\u3044\u51FA\u3059",[["charger",.25,.3],["support",.74,.35],["shield",.55,.64]],[["charger",.75,.7]],"x"),vi("b5","SPLIT THE NETWORK","\u652F\u63F4\u7DB2\u3092\u5206\u65AD","Choose a side \xB7 break its support first","\u5DE6\u53F3\u3069\u3061\u3089\u304B\u306E\u652F\u63F4\u3092\u5D29\u3057\u3001\u5C04\u7DDA\u3092\u78BA\u4FDD",[["support",.22,.32],["shield",.34,.47],["support",.77,.6],["gunner",.73,.3]],[["charger",.5,.72]]),vi("b6","STOP THE CARRIER","\u88C5\u7532\u904B\u642C\u6A5F\u3092\u6B62\u3081\u308B","Step off its route \xB7 strike the side vents","\u7A81\u9032\u306E\u9032\u8DEF\u3092\u5916\u308C\u3001\u5074\u9762\u306E\u51B7\u5374\u53E3\u3092\u72D9\u3046",[["carrier",.53,.3],["shield",.66,.44],["gunner",.78,.57]])],C:[vi("c1","READ THE PULSE","\u78C1\u5834\u306E\u9593\u3092\u8AAD\u3080","Gather between pulses \xB7 step off the warning","\u96FB\u6D41\u306E\u5408\u9593\u306B\u56DE\u53CE\u3057\u3001\u4E88\u544A\u5E2F\u304B\u3089\u79FB\u52D5",[["basic",.25,.35],["gunner",.73,.3],["basic",.62,.66]],[],"y"),vi("c2","CARRY THE OPENING","\u9699\u3078\u6301\u3061\u8FBC\u3080","Keep metal while moving around the shields","\u91D1\u5C5E\u3092\u4FDD\u6301\u3057\u3066\u76FE\u306E\u6A2A\u3078\u56DE\u308A\u8FBC\u3080",[["shield",.3,.32],["charger",.76,.32],["shield",.65,.62]],[["basic",.25,.68]]),vi("c3","BREAK THEN COMMIT","\u652F\u63F4\u3092\u65AD\u3061\u3001\u4E00\u6589\u5C04\u51FA","Support falls \xB7 use the brief exposed window","\u652F\u63F4\u6A5F\u3092\u58CA\u3057\u3001\u77ED\u3044\u76FE\u958B\u653E\u4E2D\u306B\u6483\u3064",[["support",.52,.3],["shield",.27,.5],["shield",.76,.5],["gunner",.75,.7]]),vi("c4","CHANGE SAFE SIDES","\u5B89\u5168\u5074\u3092\u6E21\u308B","Watch the next floor line before firing","\u6B21\u306E\u5E8A\u4E88\u544A\u3092\u898B\u3066\u304B\u3089\u5C04\u51FA\u3059\u308B",[["gunner",.24,.3],["charger",.72,.62],["basic",.7,.3]],[["charger",.28,.7]],"alternate"),vi("c5","CHOOSE YOUR WINDOW","\u6700\u5F8C\u306E\u5C04\u51FA\u4F4D\u7F6E","Make a firing line \xB7 save metal for the opening","\u5C04\u7DDA\u3092\u4F5C\u308A\u3001\u958B\u3044\u305F\u77AC\u9593\u3078\u91D1\u5C5E\u3092\u6B8B\u3059",[["support",.76,.3],["shield",.55,.45],["gunner",.24,.33],["charger",.75,.65]],[["basic",.3,.66]],"x"),vi("c6","SHUT DOWN THE MAGNET CORE","\u78C1\u5834\u4E2D\u67A2\u3092\u6B62\u3081\u308B","Leave the pulse ring \xB7 fire into the open coils","\u4E88\u544A\u5186\u304B\u3089\u96E2\u308C\u3001\u958B\u3044\u305F\u30B3\u30A4\u30EB\u3078\u5C04\u51FA",[["controller",.52,.42],["gunner",.23,.28],["shield",.77,.6]])]};var Jn="tinlumo.game004.magnet.full.v1",th="magnet-full-r1",pl=n=>n==="A"||n==="B"||n==="C",qs=(n,e,t)=>typeof n=="number"&&Number.isFinite(n)&&n>=e&&n<=t,oi=(n,e,t)=>qs(n,e,t)&&Number.isInteger(n),Kn=n=>!!n&&typeof n=="object"&&!Array.isArray(n),ih=["","cyclone","satellite","return","foundry"];function dd(n){if(!Kn(n)||!pl(n.mission)||!oi(n.zone,0,5)||!oi(n.seed,0,4294967295)||!qs(n.elapsed,0,86400)||!oi(n.hp,1,7)||!oi(n.maxHp,6,7)||n.hp>n.maxHp||!oi(n.upgrade,0,3)||!["base","swarm","lance"].includes(n.build)||!ih.includes(n.form)||!oi(n.evolution,0,2)||!oi(n.repairKills,0,1e5)||!oi(n.armor,0,1e5)||!oi(n.kills,0,1e5)||!oi(n.shots,0,1e5)||!qs(n.nx,0,1)||!qs(n.ny,0,1)||!Array.isArray(n.modules)||n.modules.length>2||new Set(n.modules).size!==n.modules.length||!n.modules.every(t=>["field","brake","drive","shock"].includes(String(t)))||n.zone<2&&n.build!=="base"||n.zone>=2&&n.build==="base"||n.zone<5&&n.form!==""||n.zone===5&&n.form===""||n.form&&(n.build==="swarm"?!["cyclone","satellite"].includes(n.form):!["return","foundry"].includes(n.form))||n.evolution!==(n.zone<2?0:n.zone<5?1:2)||n.modules.length!==(n.zone===0?0:n.zone<=2?1:2))return!1;let e=n.build==="swarm"?n.evolution===2?30:24:n.build==="lance"?12:n.upgrade?16:11;return Array.isArray(n.scraps)&&n.scraps.filter(t=>t?.orbit===!0).length<=e&&n.scraps.filter(t=>t?.reserved===!0).length<=(n.form==="satellite"?4:0)&&n.scraps.length>0&&n.scraps.length<=70&&n.scraps.every(t=>Kn(t)&&oi(t.kind,0,2)&&typeof t.salvaged=="boolean"&&typeof t.reward=="boolean"&&typeof t.reserved=="boolean"&&typeof t.orbit=="boolean"&&oi(t.earnedStage,-1,5))}function Qc(n){return!Kn(n)||n.schemaVersion!==1||n.contentVersion!==th||!Kn(n.settings)||!["ja","en"].includes(n.settings.locale)||typeof n.settings.muted!="boolean"||typeof n.settings.reducedMotion!="boolean"||!Array.isArray(n.unlocked)||!n.unlocked.length||n.unlocked.length>3||n.unlocked[0]!=="A"||!n.unlocked.every(pl)||new Set(n.unlocked).size!==n.unlocked.length||n.unlocked.includes("C")&&!n.unlocked.includes("B")||!Kn(n.records)||!Object.entries(n.records).every(([e,t])=>pl(e)&&Kn(t)&&oi(t.clears,1,1e5)&&qs(t.best,0,86400)&&ih.includes(t.form))||n.unlocked.includes("B")&&!n.records.A||n.unlocked.includes("C")&&!n.records.B?!1:n.run===null||dd(n.run)&&n.unlocked.includes(n.run.mission)}var eh=()=>({schemaVersion:1,contentVersion:th,settings:{locale:"ja",muted:!1,reducedMotion:!1},unlocked:["A"],records:{},run:null}),ta=class{constructor(e){this.storage=e;try{if(!e)throw Error();if(this.original=e.getItem(Jn),this.original!==null){let t=JSON.parse(this.original);if(!Qc(t)){this.status="corrupt",this.writable=!1;return}this.data=t}this.status="saved"}catch{this.original!==null?(this.status="corrupt",this.writable=!1):this.status="memory"}}storage;data=eh();status="memory";original=null;writable=!0;get hasSave(){return this.original!==null&&this.status!=="corrupt"}change(e){let t=structuredClone(this.data);if(e(t),!Qc(t))return this.status="memory",!1;if(this.data=t,!this.writable||!this.storage)return!1;try{if(this.storage.getItem(Jn)!==this.original)return this.status="conflict",this.writable=!1,!1;let i=JSON.stringify(t);if(this.storage.setItem(Jn,i),this.storage.getItem(Jn)!==i)throw Error("Readback mismatch");return this.original=i,this.status="saved",!0}catch{return this.status="memory",!1}}checkpoint(e){return this.change(t=>{t.run=e})}endRun(){return this.change(e=>{e.run=null})}clear(e,t,i){return this.change(s=>{let r=s.records[e];s.records[e]={clears:(r?.clears??0)+1,best:Math.min(r?.best??1/0,t),form:!r||t<r.best?i:r.form},e==="A"&&!s.unlocked.includes("B")&&s.unlocked.push("B"),e==="B"&&!s.unlocked.includes("C")&&s.unlocked.push("C"),s.run=null})}reset(){if(!this.storage)return!1;try{if(this.storage.removeItem(Jn),this.storage.getItem(Jn)!==null)throw Error();return this.original=null,this.writable=!0,this.data=eh(),this.status="saved",!0}catch{return this.status="memory",!1}}};var fd=["A","B","C"],pd={ja:{eyebrow:"TINLUMO",heading:"PROJECT MAGNET",deck:"\u78C1\u529B\u3067\u88C5\u7532\u3092\u96C6\u3081\u3001\u72D9\u3044\u3092\u5B9A\u3081\u3001\u5D29\u308C\u305F\u8A2D\u5099\u3092\u5FA9\u65E7\u3059\u308B\u30023\u3064\u306E\u4F5C\u6226\u3067\u3001\u5224\u65AD\u306E\u4ED5\u65B9\u304C\u5909\u308F\u308A\u307E\u3059\u3002",normalEnd:"NORMAL END",congratulations:"\u5168\u4F5C\u6226\u5B8C\u4E86\u3002\u6700\u5F8C\u306E\u78C1\u5834\u5236\u5FA1\u6A5F\u3092\u505C\u6B62\u3057\u3001\u56DE\u53CE\u533A\u753B\u3092\u5FA9\u65E7\u3057\u307E\u3057\u305F\u3002",resumeLabel:"\u4F5C\u6226\u3092\u518D\u958B",resumeDetail:(n,e)=>`\u4F5C\u6226 ${n}\u30FB\u533A\u753B ${e} \u306E\u958B\u59CB\u5730\u70B9\u304B\u3089`,startA:"\u4F5C\u6226 A \u3092\u958B\u59CB",retryA:"\u4F5C\u6226 A \u306B\u518D\u6311\u6226",operationSelect:"\u4F5C\u6226\u3092\u9078\u3076",operationIntro:"\u5404\u4F5C\u6226\u306F6\u533A\u753B\u3002\u4F5C\u6226\u5185\u3067\u306F\u3001\u5C11\u6570\u306E\u5F37\u5316\u3092\u9078\u3073\u306A\u304C\u3089\u30DC\u30B9\u3092\u653B\u7565\u3057\u307E\u3059\u3002",mission:"\u4F5C\u6226",unlocked:"\u89E3\u653E\u6E08\u307F",locked:"\u672A\u89E3\u653E",start:"\u958B\u59CB",retry:"\u518D\u6311\u6226",lockA:"",lockB:"\u4F5C\u6226 A \u306E\u30AF\u30EA\u30A2\u3067\u89E3\u653E",lockC:"\u4F5C\u6226 B \u306E\u30AF\u30EA\u30A2\u3067\u89E3\u653E",judgement:"\u5224\u65AD",records:"\u8A18\u9332",noRecord:"\u30AF\u30EA\u30A2\u8A18\u9332\u306A\u3057",clears:"\u30AF\u30EA\u30A2",best:"BEST",form:"FORM",controls:"\u64CD\u4F5C",move:"\u79FB\u52D5",magnet:"\u78C1\u529B",keyboard:"WASD / \u77E2\u5370\u30AD\u30FC",pointer:"\u62BC\u3057\u3066\u5438\u5F15\u30FB\u7167\u6E96 \u2192 \u96E2\u3057\u3066\u5C04\u51FA",touch:"\u5DE6\u6307\u3067\u79FB\u52D5 \xB7 \u53F3\u6307\u3067\u5438\u5F15\u30FB\u7167\u6E96",learning:"\u6700\u521D\u306E\u4F5C\u6226\u3067\u3001\u5E2F\u96FB\u3057\u305F\u88C5\u7532\u30FB\u8A2D\u5099\u3078\u306E\u9001\u96FB\u30FB\u9032\u5316\u3092\u30D7\u30EC\u30A4\u3057\u306A\u304C\u3089\u5B66\u3079\u307E\u3059\u3002",data:"\u30BB\u30FC\u30D6\u30C7\u30FC\u30BF",reset:"\u30BB\u30FC\u30D6\u30C7\u30FC\u30BF\u3092\u30EA\u30BB\u30C3\u30C8",close:"\u73FE\u5728\u306E\u30D7\u30EC\u30A4\u306B\u623B\u308B",back:"\u623B\u308B",replaceTitle:"\u9014\u4E2D\u518D\u958B\u30C7\u30FC\u30BF\u3092\u7F6E\u304D\u63DB\u3048\u307E\u3059\u304B\uFF1F",replaceBody:(n,e,t)=>`\u4F5C\u6226 ${n}\u30FB\u533A\u753B ${e} \u306E\u958B\u59CB\u5730\u70B9\u306F\u3001\u4F5C\u6226 ${t} \u306E\u958B\u59CB\u3092\u78BA\u5B9A\u3059\u308B\u3068\u7F6E\u304D\u63DB\u308F\u308A\u307E\u3059\u3002`,confirmStart:n=>`\u4F5C\u6226 ${n} \u3092\u958B\u59CB`,resetTitle:"PROJECT MAGNET\u306E\u30C7\u30FC\u30BF\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3059\u304B\uFF1F",resetBody:"PROJECT MAGNET\u306E\u89E3\u653E\u72B6\u6CC1\u3001\u30AF\u30EA\u30A2\u8A18\u9332\u3001\u9014\u4E2D\u518D\u958B\u3001\u8A2D\u5B9A\u3060\u3051\u304C\u5BFE\u8C61\u3067\u3059\u3002\u4ED6\u306E\u30B2\u30FC\u30E0\u306E\u30C7\u30FC\u30BF\u306B\u306F\u89E6\u308C\u307E\u305B\u3093\u3002",confirmReset:"\u30EA\u30BB\u30C3\u30C8\u3059\u308B",closeLabel:"\u30DF\u30C3\u30B7\u30E7\u30F3\u30CF\u30D6\u3092\u9589\u3058\u308B"},en:{eyebrow:"TINLUMO",heading:"PROJECT MAGNET",deck:"Gather armor with magnetic force, take aim, and restore the broken circuit. Each operation asks for a different judgement.",normalEnd:"NORMAL END",congratulations:"All operations complete. The magnetic controller is offline and the reclamation zone is restored.",resumeLabel:"RESUME OPERATION",resumeDetail:(n,e)=>`Operation ${n} \xB7 from the beginning of Zone ${e}`,startA:"START OPERATION A",retryA:"RETRY OPERATION A",operationSelect:"SELECT AN OPERATION",operationIntro:"Each operation has six zones. Choose a focused set of upgrades, then break its boss.",mission:"OPERATION",unlocked:"UNLOCKED",locked:"LOCKED",start:"START",retry:"RETRY",lockA:"",lockB:"Clear Operation A to unlock",lockC:"Clear Operation B to unlock",judgement:"JUDGEMENT",records:"RECORD",noRecord:"No clear recorded",clears:"CLEARS",best:"BEST",form:"FORM",controls:"CONTROLS",move:"MOVE",magnet:"MAGNET",keyboard:"WASD / arrow keys",pointer:"Hold to gather and aim \u2192 release to launch",touch:"Left thumb moves \xB7 right thumb gathers and aims",learning:"Operation A teaches charged armor, relay power, and evolution through play.",data:"SAVE DATA",reset:"RESET SAVE DATA",close:"RETURN TO CURRENT RUN",back:"BACK",replaceTitle:"Replace your current checkpoint?",replaceBody:(n,e,t)=>`Your Operation ${n}, Zone ${e} checkpoint remains intact until you confirm the start of Operation ${t}.`,confirmStart:n=>`START OPERATION ${n}`,resetTitle:"Reset PROJECT MAGNET data?",resetBody:"Only PROJECT MAGNET unlocks, clear records, checkpoint, and settings are included. Data from other games is untouched.",confirmReset:"RESET DATA",closeLabel:"Close mission hub"}},md={ja:{A:{name:"\u56DE\u53CE\u7DDA",judgement:"\u4F4D\u7F6E",detail:"\u5C04\u7DDA\u3068\u76FE\u306E\u5411\u304D\u3092\u8AAD\u307F\u3001\u88C5\u7532\u3092\u5F53\u3066\u308B\u4F4D\u7F6E\u3092\u9078\u3076\u3002"},B:{name:"\u7A81\u7834\u7DDA",judgement:"\u512A\u5148\u5EA6",detail:"\u5C04\u7DDA\u7832\u3068\u4FEE\u7406\u652F\u63F4\u306E\u3069\u3061\u3089\u3092\u5148\u306B\u5D29\u3059\u304B\u6C7A\u3081\u308B\u3002"},C:{name:"\u78C1\u5834\u4E2D\u67A2",judgement:"\u30BF\u30A4\u30DF\u30F3\u30B0",detail:"\u88C5\u7532\u3092\u4ECA\u6483\u3064\u304B\u4FDD\u6301\u3059\u308B\u304B\u3001\u5B89\u5168\u5E2F\u3068\u958B\u53E3\u3092\u898B\u3066\u6C7A\u3081\u308B\u3002"}},en:{A:{name:"RECLAMATION LINE",judgement:"POSITION",detail:"Read firing lanes and shield angles, then choose where to land your armor."},B:{name:"BREACH LINE",judgement:"PRIORITY",detail:"Decide whether the rail gun or repair support must fall first."},C:{name:"MAGNETIC CORE",judgement:"TIMING",detail:"Read safe lanes and openings to decide when to hold or launch your armor."}}};function Fe(n,e){let t=document.createElement(n);return e&&(t.className=e),t}function gd(n){if(!Number.isFinite(n)||n<0)return"\u2014";let e=Math.floor(n/60),t=n-e*60;return`${String(e).padStart(2,"0")}:${t.toFixed(2).padStart(5,"0")}`}function nh(n){return Number.isFinite(n)?Math.max(0,Math.trunc(n))+1:1}function sh(n){let e=document.querySelector("#game");if(!e)throw new Error("PROJECT MAGNET hub requires #game");document.getElementById("mission-hub")?.remove();let t=Fe("section","mission-hub");t.id="mission-hub",t.hidden=!0,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","false"),t.setAttribute("aria-labelledby","mission-hub-title"),e.append(t);let i=null,s=null,r=null,a=()=>{t.hidden=!0,s=null,r?.focus({preventScroll:!0}),r=null},o=u=>{t.hidden=!0,s=null,r=null,u()},c=u=>{if(i){if(i.resume){s={kind:"start",mission:u},d(),t.querySelector("[data-confirm-start]")?.focus({preventScroll:!0});return}o(()=>n.start(u))}},l=(u,f,p)=>{let x=Fe("button",f);return x.type="button",x.textContent=u,x.addEventListener("click",p),x},d=()=>{if(!i)return;let u=pd[i.locale],f=md[i.locale];t.lang=i.locale,t.replaceChildren();let p=Fe("div","mission-hub__shell"),x=Fe("header","mission-hub__intro"),h=Fe("div"),g=Fe("small","mission-hub__eyebrow");g.textContent=u.eyebrow;let m=Fe("h1");m.id="mission-hub-title",m.textContent=u.heading;let S=Fe("p","mission-hub__deck");S.textContent=u.deck,h.append(g,m,S);let C=l("\xD7","mission-hub__close",()=>{a(),n.cancel()});if(C.setAttribute("aria-label",u.closeLabel),x.append(h,C),p.append(x),i.completed){let W=Fe("div","mission-hub__ending"),j=Fe("strong");j.textContent=u.normalEnd;let le=Fe("span");le.textContent=u.congratulations,W.append(j,le),p.append(W)}if(i.saveStatus.trim()){let W=Fe("p","mission-hub__save-status");W.setAttribute("role","status"),W.textContent=i.saveStatus,p.append(W)}let b=Fe("div","mission-hub__lead-actions");if(i.resume){let W=l("","mission-hub__resume",()=>o(n.resume));W.id="continue-run";let j=Fe("strong");j.textContent=u.resumeLabel;let le=Fe("span");le.textContent=u.resumeDetail(i.resume.mission,nh(i.resume.zone)),W.append(j,le),b.append(W)}if(i.unlocked.includes("A")){let W=l(i.records.A?u.retryA:u.startA,"mission-hub__start-a",()=>c("A"));W.dataset.mission="A",b.append(W)}p.append(b);let w=Fe("div","mission-hub__section-head"),M=Fe("h2");M.textContent=u.operationSelect;let A=Fe("p");A.textContent=u.operationIntro,w.append(M,A),p.append(w);let _=Fe("div","mission-hub__missions");for(let W of fd){let j=i.unlocked.includes(W),le=i.records[W],me=Fe("article",`mission-card${j?"":" is-locked"}`);me.dataset.missionCard=W,j||me.setAttribute("aria-disabled","true");let qe=Fe("div","mission-card__top"),Le=Fe("span","mission-card__code");Le.textContent=`${u.mission} ${W}`;let ze=Fe("span","mission-card__state");ze.textContent=j?u.unlocked:u.locked,qe.append(Le,ze);let Y=Fe("h3");Y.textContent=f[W].name;let Q=Fe("p","mission-card__judgement"),de=Fe("span");de.textContent=u.judgement;let Ce=Fe("strong");Ce.textContent=f[W].judgement,Q.append(de,Ce);let ye=Fe("p","mission-card__detail");if(ye.textContent=f[W].detail,me.append(qe,Y,Q,ye),le){let Pe=Fe("dl","mission-card__record"),ft=[[u.clears,String(le.clears)],[u.best,gd(le.best)],[u.form,le.form?le.form.toUpperCase():"\u2014"]];for(let[Ve,Ye]of ft){let Qe=Fe("div"),He=Fe("dt");He.textContent=Ve;let st=Fe("dd");st.textContent=Ye,Qe.append(He,st),Pe.append(Qe)}me.append(Pe)}else{let Pe=Fe("p","mission-card__empty");Pe.textContent=u.noRecord,me.append(Pe)}if(j){let Pe=l(le?u.retry:u.start,"mission-card__action",()=>c(W));Pe.dataset.mission=W,Pe.setAttribute("aria-label",`${le?u.retry:u.start} \xB7 ${u.mission} ${W} \xB7 ${f[W].name}`),me.append(Pe)}else{let Pe=Fe("p","mission-card__lock-note");Pe.textContent=W==="B"?u.lockB:u.lockC,me.append(Pe)}_.append(me)}p.append(_);let E=Fe("div","mission-hub__lower"),R=Fe("section","mission-hub__controls"),I=Fe("h2");I.textContent=u.controls;let U=Fe("div","mission-hub__control-list"),B=Fe("p");B.innerHTML=`<strong>${u.move}</strong><span>${u.keyboard}</span>`;let P=Fe("p");P.innerHTML=`<strong>${u.magnet}</strong><span>${u.pointer}</span><small>${u.touch}</small>`,U.append(B,P);let k=Fe("p","mission-hub__learning");k.textContent=u.learning,R.append(I,U,k);let J=Fe("section","mission-hub__data"),K=Fe("h2");K.textContent=u.data;let ie=l(u.reset,"mission-hub__reset",()=>{s={kind:"reset"},d(),t.querySelector("[data-confirm-reset]")?.focus({preventScroll:!0})}),X=l(u.close,"mission-hub__return",()=>{a(),n.cancel()});if(J.append(K,ie,X),E.append(R,J),p.append(E),s){let W=Fe("aside","mission-hub__confirm");W.setAttribute("role","alertdialog"),W.setAttribute("aria-modal","true");let j=Fe("div","mission-hub__confirm-body"),le=Fe("h2"),me=Fe("p"),qe=Fe("div","mission-hub__confirm-actions");if(s.kind==="start"&&i.resume){let Le=s.mission;le.textContent=u.replaceTitle,me.textContent=u.replaceBody(i.resume.mission,nh(i.resume.zone),Le);let ze=l(u.confirmStart(Le),"mission-hub__confirm-primary",()=>o(()=>n.start(Le)));ze.dataset.confirmStart=Le;let Y=l(u.back,"mission-hub__confirm-back",()=>{s=null,d(),t.querySelector(`[data-mission="${Le}"]`)?.focus({preventScroll:!0})});qe.append(ze,Y)}else{le.textContent=u.resetTitle,me.textContent=u.resetBody;let Le=l(u.confirmReset,"mission-hub__confirm-primary is-danger",()=>o(n.reset));Le.dataset.confirmReset="true";let ze=l(u.back,"mission-hub__confirm-back",()=>{s=null,d(),t.querySelector(".mission-hub__reset")?.focus({preventScroll:!0})});qe.append(Le,ze)}j.append(le,me,qe),W.append(j),p.append(W)}t.append(p)};return t.addEventListener("keydown",u=>{if(u.key==="Escape"){if(u.preventDefault(),u.stopPropagation(),s){let g=s;s=null,d();let m=g.kind==="reset"?".mission-hub__reset":`[data-mission="${g.mission}"]`;t.querySelector(m)?.focus({preventScroll:!0})}else a(),n.cancel();return}if(u.key!=="Tab"||!s)return;let f=t.querySelector(".mission-hub__confirm");if(!f)return;let p=[...f.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')].filter(g=>!g.hidden&&g.offsetParent!==null);if(!p.length)return;let x=p[0],h=p[p.length-1];u.shiftKey&&document.activeElement===x?(u.preventDefault(),h.focus()):!u.shiftKey&&document.activeElement===h&&(u.preventDefault(),x.focus())}),{show:u=>{i=u,s=null,t.hidden&&(r=document.activeElement instanceof HTMLElement?document.activeElement:null),d(),t.hidden=!1,(t.querySelector("#continue-run")??t.querySelector(".mission-hub__start-a")??t.querySelector("[data-mission]")??t.querySelector(".mission-hub__close"))?.focus({preventScroll:!0})},hide:a,isOpen:()=>!t.hidden}}var Mt={step:.008333333333333333,pullRadius:320,anticipation:.065,shotSpeed:1260,hitStop:.045,breakStop:.065,returnDelay:.25,upgradeArmor:6,maxParticles:220,maxScraps:70},St=(n,e,t)=>Math.max(e,Math.min(t,n));function ia(n,e,t){let i=t.x-e.x,s=t.y-e.y,r=St(((n.x-e.x)*i+(n.y-e.y)*s)/(i*i+s*s||1),0,1);return Math.hypot(n.x-e.x-r*i,n.y-e.y-r*s)}var na=class{clearElapsed=0;quietSince=-1;links=[];stage=0;encounter="combat";choice=0;build="base";evolution=0;module="";relays=[];activeRelay=0;bossLocked=!1;encounterStart=0;encounterSpawns=0;transition=0;lane=null;laneCycle=-1;laneSuppressedUntil=0;choices=[];stageTimes=[];get pullRadius(){return this.build==="swarm"?460:this.build==="lance"?340:Mt.pullRadius}get capacity(){return(this.build==="swarm"?this.evolution===2?30:24:this.build==="lance"?12:this.player.upgrade?16:11)+(this.module==="rack"?3:0)}get optionIds(){return this.choice===1?["recycler","rack","guard"]:this.choice===2?["swarm","lance"]:this.build==="swarm"?["cyclone","lance"]:["return","swarm"]}width;height;time=0;seed=814;serial=0;player={x:0,y:0,vx:0,vy:0,angle:-.5,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};runTime=0;phase=0;over=!1;hurt=0;runEndedAt=0;nextArrival=0;wave=0;enemySerial=4;eliteSpawned=!1;eliteDefeated=!1;upgrades=[];milestones=[];counters={};peak={scraps:0,particles:0,enemies:0};recycled=0;repairKills=0;resultDelay=0;scraps=[];enemies=[];particles=[];events=[];holding=!1;holdTime=0;releaseIn=0;shotAngle=0;freeze=0;shake=0;camera={x:0,y:0};armor=0;kills=0;shots=0;won=!1;winTime=0;started=!1;reduced=!1;paused=!1;move={x:0,y:0};aim={x:0,y:0};onEvent=null;constructor(e=960,t=640){this.width=e,this.height=t,this.reset()}random(){return this.seed=Math.imul(1664525,this.seed)+1013904223>>>0,this.seed/4294967296}emit(e,t=this.player.x,i=this.player.y,s=1){let r={kind:e,t:this.time,x:t,y:i,value:s};this.events.push(r),this.events.length>180&&this.events.shift(),this.counters[e]=(this.counters[e]??0)+1,this.onEvent?.(r)}reset(){this.clearElapsed=0,this.quietSince=-1,this.links=[],this.time=0,this.seed=814,this.serial=0,this.scraps=[],this.enemies=[],this.particles=[],this.events=[],this.holding=!1,this.holdTime=0,this.releaseIn=0,this.freeze=0,this.shake=0,this.camera={x:0,y:0},this.armor=0,this.kills=0,this.shots=0,this.won=!1,this.winTime=0,this.started=!1,this.move={x:0,y:0},this.runTime=0,this.phase=0,this.over=!1,this.hurt=0,this.runEndedAt=0,this.nextArrival=0,this.wave=0,this.enemySerial=4,this.eliteSpawned=!1,this.eliteDefeated=!1,this.upgrades=[],this.milestones=[],this.counters={},this.peak={scraps:11,particles:0,enemies:4},this.recycled=0,this.repairKills=0,this.resultDelay=0,this.stage=0,this.encounter="combat",this.choice=0,this.build="base",this.evolution=0,this.module="",this.relays=[],this.activeRelay=0,this.bossLocked=!1,this.encounterStart=0,this.encounterSpawns=0,this.transition=0,this.lane=null,this.laneCycle=-1,this.laneSuppressedUntil=0,this.choices=[],this.stageTimes=[],this.setupRelays();let e=this.height>this.width;this.player={x:this.width*(e?.43:.34),y:this.height*(e?.65:.59),vx:0,vy:0,angle:-.55,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};let t=e?[[.53,.42],[.27,.25],[.77,.47],[.73,.2]]:[[.59,.43],[.72,.66],[.43,.25],[.82,.26]];for(let i=0;i<t.length;i++){let[s,r]=t[i],a=i===3;this.enemies.push({id:i,x:s*this.width,y:r*this.height,home:{x:s*this.width,y:r*this.height},vx:0,vy:0,hp:a?14:4,max:a?14:4,heavy:a,r:a?36:25,angle:2.3,flash:0,recoil:0,charge:0,cool:4+i*1.4,dead:!1,deathAt:0,kind:a?"heavy":"basic",shield:0,facing:2.3,windup:0,dash:0,recover:0,spawnIn:0,guardStress:0,locked:0})}this.aim={x:this.enemies[0].x,y:this.enemies[0].y};for(let i=0;i<11;i++){let s=i*2.399,r=72+i%4*20;this.addScrap(this.player.x+Math.cos(s)*r,this.player.y+Math.sin(s)*r,i%3)}}addScrap(e,t,i,s=!1,r=0,a=0){if(this.scraps.length>=Mt.maxScraps){let c=this.scraps.filter(l=>l.mode==="loose"&&!l.reward).sort((l,d)=>d.age-l.age)[0]??this.scraps.find(l=>!l.reward)??this.scraps[0];if(!c)return;c.reward&&(this.armor++,this.emit("overflow-reclaim",c.x,c.y),this.burst(c.x,c.y,3,"#b6ffe4")),this.scraps.splice(this.scraps.indexOf(c),1),this.recycled++}this.scraps.push({id:this.serial++,x:e,y:t,vx:r,vy:a,kind:i,angle:this.random()*6.28,spin:(this.random()-.5)*8,mode:"loose",age:0,reward:s,salvaged:s,...s?{earnedStage:this.stage}:{},returnAt:s?this.time+Mt.returnDelay:1/0,orbit:0,hit:[]})}startHold(){this.paused||this.over||this.won||this.encounter!=="combat"||this.releaseIn>0||(this.started=!0,this.holding=!0,this.holdTime=0,this.emit("pull"))}release(){this.holding&&(this.holding=!1,this.holdTime=0,this.scraps.some(e=>e.mode==="orbit")?(this.releaseIn=Mt.anticipation,this.shotAngle=this.player.angle,this.emit("anticipation")):this.emit("empty"))}cancel(){this.holding=!1,this.holdTime=0,this.releaseIn=0,this.move={x:0,y:0}}launch(){let e=this.player,t=this.scraps.filter(i=>i.mode==="orbit");if(t.length){if(this.shots++,this.emit("launch",e.x,e.y,t.length),e.kick=1,t.forEach((i,s)=>{let r=(s-(t.length-1)/2)*(this.build==="swarm"?.034:this.build==="lance"?.004:.017),a=this.shotAngle+r,o=(s%3-1)*8;i.mode="shot",i.age=0,i.x=e.x+Math.cos(a)*38-Math.sin(a)*o,i.y=e.y+Math.sin(a)*38+Math.cos(a)*o,i.vx=Math.cos(a)*(Mt.shotSpeed*(this.build==="lance"?1.45:1)+s*13),i.vy=Math.sin(a)*(Mt.shotSpeed*(this.build==="lance"?1.45:1)+s*13),i.hit=[],i.reward=!1}),this.build==="swarm"&&this.form==="cyclone"){this.emit("cyclone"),this.burst(e.x,e.y,32,"#b6ffe4");for(let i of this.enemies)if(!i.dead&&Math.hypot(i.x-e.x,i.y-e.y)<165){let s=Math.atan2(i.y-e.y,i.x-e.x);i.vx+=Math.cos(s)*300,i.vy+=Math.sin(s)*300,i.kind!=="elite"&&(i.shield=0,i.recover=1.8)}}e.vx-=Math.cos(this.shotAngle)*95,e.vy-=Math.sin(this.shotAngle)*95,this.burst(e.x+Math.cos(e.angle)*40,e.y+Math.sin(e.angle)*40,14,"#b4ffe4",e.angle)}}burst(e,t,i,s,r){for(let a=0;a<i;a++){let o=r===void 0?this.random()*6.28:r+(this.random()-.5)*2.8,c=70+this.random()*330,l=.16+this.random()*.35;this.particles.push({x:e,y:t,vx:Math.cos(o)*c,vy:Math.sin(o)*c,life:l,max:l,size:1+this.random()*3,color:s,kind:"spark",angle:o,spin:0})}this.particles.length>Mt.maxParticles&&this.particles.splice(0,this.particles.length-Mt.maxParticles)}hit(e,t){if(e.dead||e.spawnIn>0||t.hit.includes(e.id)||this.block(e,t))return;let i={x:t.vx,y:t.vy};t.hit.push(e.id);let s=Math.atan2(t.vy,t.vx),r=(this.player.upgrade?2:1)*(t.power??1)*(t.frontArmor?this.form==="foundry"?.8:.35:1),a=e.hp;if(e.hp-=r,e.kind==="elite"&&(a>16&&e.hp<=16||a>8&&e.hp<=8)&&(e.hp=a>16?16:8,this.counterCharge(e),this.stage===5)){this.bossLocked=!0,this.activeRelay++,this.mark("reactor-lock");for(let o=0;o<10;o++)this.addScrap(e.x+Math.cos(o)*55,e.y+Math.sin(o)*55,o%3,!0)}if(e.flash=.11,e.recoil=1,e.vx+=Math.cos(s)*(e.heavy?75:160),e.vy+=Math.sin(s)*(e.heavy?75:160),this.freeze=Math.max(this.freeze,Mt.hitStop),this.shake=Math.max(this.shake,this.reduced?0:4),this.camera.x=-Math.cos(s)*4,this.camera.y=-Math.sin(s)*4,this.emit("hit",e.x,e.y,r),this.burst(t.x,t.y,8,"#ffc16c",s),t.mode="loose",t.age=0,t.vx=-t.vx*.13,t.vy=-t.vy*.13,t.returnAt=this.module==="recycler"||this.build==="lance"&&this.form==="return"?this.time+.7:1/0,e.hp<=0){e.dead=!0,e.deathAt=this.time,this.kills++,this.freeze=Mt.breakStop,this.shake=this.reduced?0:7,this.emit("break",e.x,e.y,e.heavy?2:1),this.burst(e.x,e.y,e.heavy?42:25,"#ffd9a0",s);let o=e.heavy?10:5;for(let c=0;c<o;c++){let l=c/o*Math.PI*2,d=100+this.random()*90;this.addScrap(e.x+Math.cos(l)*15,e.y+Math.sin(l)*15,c%3,!0,Math.cos(l)*d,Math.sin(l)*d)}e.kind==="elite"&&this.stage===5&&(this.eliteDefeated=!0),this.repairKills++,this.runTime>30&&this.repairKills>=8&&(this.repairKills=0,this.player.hp=Math.min(this.player.maxHp,this.player.hp+1),this.emit("repair")),this.particles.push({x:e.x,y:e.y,vx:0,vy:0,life:.35,max:.35,size:15,color:"#f4d19b",kind:"ring",angle:0,spin:0});for(let c=0;c<5;c++)this.particles.push({x:e.x+(this.random()-.5)*20,y:e.y+(this.random()-.5)*20,vx:(this.random()-.5)*35,vy:-10-this.random()*20,life:.65,max:.65,size:14+this.random()*12,color:"#78817b",kind:"smoke",angle:0,spin:0})}this.build==="lance"&&this.form!=="foundry"&&t.hit.length<(this.evolution===2?4:3)&&(t.mode="shot",t.vx=i.x*.9,t.vy=i.y*.9)}update(e){if(this.paused||this.encounter==="choice")return;if(this.encounter==="settle"||this.encounter==="equip"){this.settle(e);return}if(this.over){this.time+=e;return}this.time+=e;for(let h of this.links)h.life-=e;if(this.links=this.links.filter(h=>h.life>0),this.started&&!this.won&&(this.runTime+=e),this.hurt=Math.max(0,this.hurt-e),this.director(e),this.over||this.encounter!=="combat")return;this.player.transform=Math.max(0,this.player.transform-e),this.player.bump=Math.max(0,this.player.bump-e),this.shake=Math.max(0,this.shake-e*40),this.camera.x*=Math.exp(-e*22),this.camera.y*=Math.exp(-e*22);for(let h of this.particles)h.life-=e,h.x+=h.vx*e,h.y+=h.vy*e,h.vx*=Math.exp(-e*4),h.vy*=Math.exp(-e*4),h.angle+=h.spin*e;if(this.particles=this.particles.filter(h=>h.life>0),this.freeze>0){this.freeze-=e;return}this.holding&&(this.holdTime+=e),this.releaseIn>0&&(this.releaseIn-=e,this.releaseIn<=0&&this.launch());let t=this.player,i=this.aim.x-t.x,s=this.aim.y-t.y;i*i+s*s>25&&(t.angle=Math.atan2(s,i)),t.kick=Math.max(0,t.kick-e*7);let r=Math.hypot(this.move.x,this.move.y),a=this.holding?175:230,o=r>1?this.move.x/r:this.move.x,c=r>1?this.move.y/r:this.move.y;t.vx+=(o*a-t.vx)*Math.min(1,e*16),t.vy+=(c*a-t.vy)*Math.min(1,e*16),t.x=St(t.x+t.vx*e,52,this.width-52),t.y=St(t.y+t.vy*e,85,this.height-70);let l=this.scraps.filter(h=>h.mode==="loose"&&(h.salvaged||h.reward)&&(this.holding||h.returnAt<=this.time)&&Math.hypot(h.x-t.x,h.y-t.y)<this.pullRadius),d=this.scraps.filter(h=>h.mode==="orbit"),u=Math.max(0,this.capacity-d.length),f=d.filter(h=>!h.salvaged);for(let h=0;h<Math.min(f.length,Math.max(0,l.length-u));h++){let g=f[h],m=Math.atan2(g.y-t.y,g.x-t.x);g.mode="loose",g.vx=Math.cos(m)*170,g.vy=Math.sin(m)*170,g.returnAt=1/0,g.pickupAfter=this.time+1.2}let p=this.scraps.filter(h=>h.mode==="orbit"),x=p.length;for(let h of this.scraps){if(h.age+=e,h.angle+=h.spin*e,h.mode==="orbit"){let M=p,A=M.indexOf(h),_=this.time*(this.holding?2.6:1.3)+A/Math.max(1,M.length)*Math.PI*2,E=(t.upgrade?59:51)+A%2*7-(this.holding?Math.min(this.holdTime,1)*7:0);h.orbit=_;let R=t.x+Math.cos(_)*E,I=t.y+Math.sin(_)*E;h.x+=(R-h.x)*Math.min(1,e*20),h.y+=(I-h.y)*Math.min(1,e*20),h.angle=_+.7;continue}let g=h.x,m=h.y;if(h.mode==="shot"){h.x+=h.vx*e,h.y+=h.vy*e;for(let M of this.enemies)if(!M.dead&&!h.hit.includes(M.id)&&ia(M,{x:g,y:m},h)<M.r+5){this.hit(M,h);break}if(h.mode==="shot"){for(let M of this.relays)if(M.id===this.activeRelay&&!M.done&&ia(M,{x:g,y:m},h)<38){this.feedRelay(M,h);break}}(h.age>.8||h.x<42||h.x>this.width-42||h.y<70||h.y>this.height-48)&&(h.mode="loose",h.vx*=-.2,h.vy*=-.2,h.returnAt=this.module==="recycler"||this.build==="lance"&&this.form==="return"?this.time+.7:1/0,h.x=St(h.x,45,this.width-45),h.y=St(h.y,75,this.height-50));continue}let S=Math.hypot(t.x-h.x,t.y-h.y),C=h.returnAt<=this.time,b=(this.holding&&S<this.pullRadius||C)&&(h.pickupAfter??0)<=this.time;if(b&&x<this.capacity){let M=700+2e5/(S+70),A=(t.x-h.x)/(S||1),_=(t.y-h.y)/(S||1);if(h.vx+=A*M*e,h.vy+=_*M*e,h.spin+=e*4,S<65){h.mode="orbit",h.vx=h.vy=0,x++,this.emit("snap",h.x,h.y,h.reward?2:1),h.reward&&(this.armor++,h.reward=!1,this.armor>=Mt.upgradeArmor&&!t.upgrade&&(t.upgrade=1,t.transform=1.2,this.upgrades.push(this.runTime),this.emit("upgrade",t.x,t.y,1),this.burst(t.x,t.y,32,"#b6ffe4")));continue}}let w=b?2.1:4;h.vx*=Math.exp(-e*w),h.vy*=Math.exp(-e*w),h.x+=h.vx*e,h.y+=h.vy*e,(h.x<40||h.x>this.width-40)&&(h.vx*=-.45),(h.y<65||h.y>this.height-45)&&(h.vy*=-.45),h.x=St(h.x,40,this.width-40),h.y=St(h.y,65,this.height-45)}for(let h of this.enemies){if(this.won)continue;if(h.spawnIn>0){h.spawnIn=Math.max(0,h.spawnIn-e);continue}if(h.role||["shield","charger","elite"].includes(h.kind)){this.updateSpecial(h,e);continue}if(h.flash=Math.max(0,h.flash-e),h.recoil=Math.max(0,h.recoil-e*7),h.dead)continue;let g=t.x-h.x,m=t.y-h.y,S=Math.hypot(g,m);h.angle=Math.atan2(m,g),h.cool-=this.started?e:0,h.charge>0?(h.charge-=e,h.charge<=0&&(h.vx+=Math.cos(h.angle)*(h.heavy?280:340),h.vy+=Math.sin(h.angle)*(h.heavy?280:340),h.cool=h.heavy?5.5:4.4)):h.cool<=0&&this.started&&S<460&&(h.charge=.65,this.emit("enemy-windup",h.x,h.y)),h.x=St(h.x+h.vx*e,60,this.width-60),h.y=St(h.y+h.vy*e,100,this.height-65),h.vx*=Math.exp(-e*4),h.vy*=Math.exp(-e*4),S<h.r+24&&t.bump<=0&&(t.bump=.6,t.vx+=Math.cos(h.angle)*320,t.vy+=Math.sin(h.angle)*320,this.damage(),this.emit("bump"),this.burst(t.x,t.y,8,"#e8e6cb"))}this.finishStep()}neutralizeShots(){for(let e of this.scraps)e.mode==="shot"&&(e.mode="loose",e.vx*=.12,e.vy*=.12,e.returnAt=this.time+Mt.returnDelay,e.hit=[]);this.releaseIn=0}autoFeed(){if(!(this.stage===5||this.enemies.some(e=>!e.dead)||this.encounter!=="combat"||this.over||this.won))for(let e of this.scraps){let t=this.relays[this.activeRelay];if(!t||t.done)break;!e.salvaged||e.earnedStage!==this.stage||(e.salvaged=!1,this.links.push({x:e.x,y:e.y,tx:t.x,ty:t.y,life:.45}),this.chargeRelay(t),this.emit("auto-charge",t.x,t.y))}}settle(e){this.time+=e,this.clearElapsed+=e,this.transition-=e,this.freeze=0,this.shake=Math.max(0,this.shake-e*40),this.camera.x*=Math.exp(-e*22),this.camera.y*=Math.exp(-e*22),this.player.transform=Math.max(0,this.player.transform-e);for(let t of this.relays)t.flash=Math.max(0,t.flash-e);for(let t of this.particles)t.life-=e,t.x+=t.vx*e,t.y+=t.vy*e,t.vx*=Math.exp(-e*4),t.vy*=Math.exp(-e*4);this.particles=this.particles.filter(t=>t.life>0);for(let t of this.links)t.life-=e;this.links=this.links.filter(t=>t.life>0);for(let t of this.scraps)if(t.mode==="loose"&&t.returnAt<=this.time){let i=this.player.x-t.x,s=this.player.y-t.y;t.x+=i*Math.min(1,e*8),t.y+=s*Math.min(1,e*8),Math.hypot(i,s)<65&&this.scraps.filter(r=>r.mode==="orbit").length<this.capacity&&(t.mode="orbit",t.vx=t.vy=0,t.reward&&(this.armor++,t.reward=!1,this.armor>=Mt.upgradeArmor&&!this.player.upgrade&&(this.player.upgrade=1,this.player.transform=1.2,this.upgrades.push(this.runTime),this.emit("upgrade",this.player.x,this.player.y,1),this.burst(this.player.x,this.player.y,32,"#b6ffe4"))))}this.encounter==="settle"&&this.clearElapsed-e<.16&&this.clearElapsed>=.16&&this.emit("circuit-secured"),!(this.transition>1e-8)&&(this.encounter==="settle"&&this.choice?(this.encounter="choice",this.mark("choice-open-"+this.choice)):this.enterStage(this.stage+1))}mark(e){this.milestones.push({kind:e,t:this.runTime}),this.emit(e)}director(e){if(!this.started||this.won||this.over||this.encounter!=="combat")return;for(let a of this.relays)a.flash=Math.max(0,a.flash-e);let t=this.enemies.filter(a=>!a.dead).length;t===0&&this.stage<5?(this.quietSince<0&&(this.quietSince=this.time),this.time-this.quietSince>=Mt.returnDelay&&this.autoFeed()):this.quietSince=-1;let i=this.relays.every(a=>a.done);if(this.stage<5&&i&&t===0){this.stageTimes.push(this.runTime),this.cancel(),this.lane=null,this.encounter="settle",this.clearElapsed=0,this.transition=.65,this.choice=[0,1,4].includes(this.stage)?this.stage===0?1:this.stage===1?2:3:0,this.neutralizeShots(),this.mark("stage-clear-"+this.stage);return}if(this.stage>=3){let a=this.runTime-this.encounterStart,o=Math.floor(a/10);if(o>this.laneCycle&&this.runTime>=this.laneSuppressedUntil){this.laneCycle=o;let l=this.stage===4?"y":"x";this.lane={axis:l,position:l==="x"?this.width*(o%2?.7:.3):this.height*(o%2?.65:.38),width:28,telegraph:1.6,active:1},this.emit("enemy-windup")}let c=this.lane;c&&(c.telegraph>0?c.telegraph-=e:c.active>0?(c.active-=e,Math.abs(this.player[c.axis]-c.position)<c.width/2&&this.damage()):this.lane=null)}if(i||this.stage===5||t>=4||(t===0&&(this.nextArrival=Math.min(this.nextArrival,this.runTime+2.2)),this.runTime<this.nextArrival))return;this.encounterSpawns++;let s=this.stage===0?"basic":this.stage===1?this.encounterSpawns%2?"shield":"basic":this.stage===2?this.encounterSpawns%2?"charger":"basic":this.encounterSpawns%3===0?"shield":this.encounterSpawns%2?"charger":"basic",r=this.encounterSpawns*2.4;this.spawn(s,.5+Math.cos(r)*.29,.48+Math.sin(r)*.25),this.nextArrival=this.runTime+9}setupRelays(){let e=[14,18,22,24,26,10],t=[[[.72,.55]],[[.24,.37],[.78,.67]],[[.72,.28],[.29,.69]],[[.27,.3],[.75,.65],[.46,.47]],[[.26,.66],[.73,.29],[.7,.68]],[[.25,.36],[.76,.48],[.46,.72]]];this.relays=t[this.stage].map((i,s)=>({id:s,x:i[0]*this.width,y:i[1]*this.height,charge:0,max:e[this.stage],done:!1,flash:0})),this.activeRelay=0}feedRelay(e,t){if(!(e.id!==this.activeRelay||e.done||this.encounter!=="combat"||this.over||this.won)&&!(this.stage===5&&!this.bossLocked)){if(t.mode="loose",t.age=0,t.vx*=-.16,t.vy*=-.16,t.returnAt=this.time+.45,!t.salvaged){this.emit("relay-empty",e.x,e.y);return}t.salvaged=!1,t.reward=!1,this.chargeRelay(e)}}chargeRelay(e){if(e.charge=Math.min(e.max,e.charge+1),e.flash=.13,this.emit("relay-hit",e.x,e.y),this.burst(e.x,e.y,3,"#a4edcf"),e.charge>=e.max)if(e.done=!0,this.mark("relay-"+this.stage+"-"+e.id),this.burst(e.x,e.y,32,"#b6ffe4"),this.emit("relay-complete",e.x,e.y),this.stage===5){this.bossLocked=!1;let t=this.enemies.find(i=>i.kind==="elite"&&!i.dead);t&&(this.counterCharge(t),this.mark("reactor-counter"))}else{this.activeRelay++,this.lane=null,this.laneSuppressedUntil=this.runTime+7;for(let t of this.enemies)t.dead||(t.windup=0,t.dash=0,t.shellGate=0,t.shield=0,t.recover=3,t.cool=3,t.vx*=.1,t.vy*=.1,this.burst(t.x,t.y,8,"#b6ffe4"));this.mark("power-window")}}choose(e){if(this.encounter!=="choice"||!this.optionIds.includes(e))return!1;this.choices.push({stage:this.stage,id:e,t:this.runTime}),this.mark("choose-"+e),this.choice===1?(this.module=e,e==="guard"&&(this.player.maxHp=7,this.player.hp=7)):(e==="swarm"||e==="cyclone"?this.build="swarm":this.build="lance",this.evolution=this.choice===2?1:2,this.upgrade(this.evolution+1));let t=this.scraps.filter(i=>i.mode==="orbit").sort((i,s)=>Number(s.salvaged)-Number(i.salvaged));for(let i of t.slice(this.capacity))i.mode="loose",i.returnAt=1/0,i.pickupAfter=this.time+1.2;return this.choice=0,this.encounter="equip",this.transition=.18,this.clearElapsed=0,this.player.transform=Math.max(this.player.transform,.35),this.emit("equip"),!0}enterStage(e){if(this.quietSince=-1,this.links=[],this.neutralizeShots(),this.stage=e,this.phase=e,this.encounter="combat",this.encounterStart=this.runTime,this.encounterSpawns=0,this.nextArrival=this.runTime+8,this.laneCycle=-1,this.lane=null,this.enemies=[],this.cancel(),this.player.hp=Math.min(this.player.maxHp,this.player.hp+1),this.setupRelays(),this.mark("stage-start-"+e),[[],["shield","basic","basic"],["charger","charger","basic"],["shield","charger","basic"],["elite","charger","shield"],["elite"]][e].forEach((i,s)=>this.spawn(i,[.26,.75,.65][s],[.25,.32,.67][s])),this.eliteDefeated=!1,this.bossLocked=e===5,this.eliteSpawned=e===5,this.stage===5){this.mark("elite-arrival");for(let i=0;i<12;i++)this.addScrap(this.width*.5+Math.cos(i)*75,this.height*.55+Math.sin(i)*75,i%3,!0)}}spawn(e,t,i){let s=this.width*t,r=this.height*i;Math.hypot(s-this.player.x,r-this.player.y)<160&&(s=this.width-s,r=this.height-r);let a=e==="elite"?24:e==="shield"?10:e==="charger"?8:4,o=Math.atan2(this.player.y-r,this.player.x-s),c=e==="shield"||e==="elite";this.enemies.push({id:this.enemySerial++,x:s,y:r,home:{x:s,y:r},vx:0,vy:0,hp:a,max:a,heavy:e==="elite",r:e==="elite"?43:e==="shield"?29:25,angle:o,flash:0,recoil:0,charge:0,cool:1.6,dead:!1,deathAt:0,kind:e,shield:c?1:0,facing:o,windup:0,dash:0,recover:0,spawnIn:1.1,guardStress:0,locked:o}),this.counters["spawn-"+e]=(this.counters["spawn-"+e]??0)+1}upgrade(e){let t=this.player;t.upgrade=e,t.transform=1.2,t.hp=Math.min(t.maxHp,t.hp+2),this.upgrades.push(this.runTime),this.nextArrival=Math.max(this.nextArrival,this.runTime+4),this.emit("upgrade",t.x,t.y,e),this.burst(t.x,t.y,32,"#b6ffe4")}damage(){this.encounter!=="combat"||this.runTime<30||this.hurt>0||this.over||this.won||(this.hurt=1.8,this.player.hp--,this.emit("damage"),this.player.hp<=0&&(this.over=!0,this.runEndedAt=this.runTime,this.cancel(),this.mark("failed")))}block(e,t){if(this.stage===5&&e.kind==="elite"&&this.bossLocked||(e.shellGate??0)>0)return t.hit.push(e.id),t.mode="loose",t.age=0,t.returnAt=1/0,t.vx*=-.25,t.vy*=-.25,this.burst(t.x,t.y,4,"#ffc16c"),this.emit("block",e.x,e.y),!0;if(e.shield<=0||e.recover>0)return!1;let i=Math.atan2(-t.vy,-t.vx),s=Math.atan2(Math.sin(i-e.facing),Math.cos(i-e.facing));if(Math.abs(s)>1.05)return!1;if(t.hit.push(e.id),e.guardStress++,e.flash=.07,e.recoil=.5,t.mode="loose",t.age=0,t.returnAt=1/0,t.vx*=-.32,t.vy*=-.32,this.emit("block",e.x,e.y),this.burst(t.x,t.y,4,"#92c8c7"),e.guardStress>=8){if(e.kind==="elite")return this.counterCharge(e),!0;e.guardStress=0,e.shield=0,e.recover=1.8,e.windup=0,e.dash=0,this.emit("shield-open",e.x,e.y),this.burst(e.x,e.y,14,"#ffc16c")}return!0}counterCharge(e){e.guardStress=0,e.shield=1,e.recover=0,e.dash=0,e.windup=.95,e.shellGate=1.45,e.locked=Math.atan2(this.player.y-e.y,this.player.x-e.x),e.facing=e.locked,e.angle=e.locked,this.emit("shell-counter",e.x,e.y),this.emit("enemy-windup",e.x,e.y),this.burst(e.x,e.y,14,"#d6b26c")}updateSpecial(e,t){if(e.shellGate=Math.max(0,(e.shellGate??0)-t),e.flash=Math.max(0,e.flash-t),e.recoil=Math.max(0,e.recoil-t*7),e.dead)return;let i=this.player,s=i.x-e.x,r=i.y-e.y,a=Math.hypot(s,r),o=Math.atan2(r,s),c=e.kind==="shield"||e.kind==="elite";if(e.recover>0)e.recover=Math.max(0,e.recover-t),e.shield=0,e.vx*=Math.exp(-t*7),e.vy*=Math.exp(-t*7),e.recover===0&&(e.shield=c?1:0,e.cool=1.3,e.guardStress=0);else if(e.dash>0)e.dash-=t,e.dash<=0&&(e.recover=e.kind==="elite"?1.8:1.3,e.shield=0,this.emit("exposed",e.x,e.y));else if(e.windup>0){if(e.windup-=t,e.vx*=Math.exp(-t*12),e.vy*=Math.exp(-t*12),e.windup<=0){e.dash=c?.48:.55;let l=e.kind==="elite"?460:e.kind==="shield"?260:490;e.vx=Math.cos(e.locked)*l,e.vy=Math.sin(e.locked)*l,this.emit("dash",e.x,e.y)}}else{let l=Math.atan2(Math.sin(o-e.facing),Math.cos(o-e.facing));e.facing+=St(l,-t*(c?1:3),t*(c?1:3)),e.angle=e.facing,e.cool-=t;let d=c?34:65;a>170?(e.vx+=(Math.cos(e.facing)*d-e.vx)*t*4,e.vy+=(Math.sin(e.facing)*d-e.vy)*t*4):(e.vx*=Math.exp(-t*4),e.vy*=Math.exp(-t*4)),e.cool<=0&&(e.locked=e.facing,e.windup=e.kind==="elite"?.95:.8,e.cool=3.5,this.emit("enemy-windup",e.x,e.y))}e.x=St(e.x+e.vx*t,60,this.width-60),e.y=St(e.y+e.vy*t,100,this.height-65),(e.x<=60||e.x>=this.width-60||e.y<=100||e.y>=this.height-65)&&e.dash>0&&(e.dash=0,e.recover=1.3,e.shield=0),a<e.r+24&&i.bump<=0&&(i.bump=.6,i.vx+=Math.cos(o)*320,i.vy+=Math.sin(o)*320,this.damage(),this.emit("bump"),this.burst(i.x,i.y,8,"#e8e6cb"))}finishStep(){this.enemies=this.enemies.filter(e=>!e.dead||this.time-e.deathAt<.8),this.particles.length>Mt.maxParticles&&this.particles.splice(0,this.particles.length-Mt.maxParticles),this.peak.scraps=Math.max(this.peak.scraps,this.scraps.length),this.peak.particles=Math.max(this.peak.particles,this.particles.length),this.peak.enemies=Math.max(this.peak.enemies,this.enemies.filter(e=>!e.dead).length),this.eliteDefeated&&!this.won&&(this.won=!0,this.winTime=this.time,this.runEndedAt=this.runTime,this.cancel(),this.mark("complete")),this.won&&(this.resultDelay=this.time-this.winTime,this.resultDelay>2&&(this.over=!0))}snapshot(){return{clearElapsed:this.clearElapsed,transition:this.transition,links:this.links.map(e=>({...e})),stage:this.stage,encounter:this.encounter,choice:this.choice,optionIds:this.optionIds,build:this.build,evolution:this.evolution,module:this.module,relays:this.relays.map(e=>({...e})),activeRelay:this.activeRelay,bossLocked:this.bossLocked,lane:this.lane?{...this.lane}:null,choices:[...this.choices],stageTimes:[...this.stageTimes],capacity:this.capacity,pullRadius:this.pullRadius,runTime:this.runTime,phase:this.phase,over:this.over,hurt:this.hurt,upgrades:[...this.upgrades],milestones:[...this.milestones],counters:{...this.counters},peak:{...this.peak},recycled:this.recycled,runEndedAt:this.runEndedAt,time:this.time,player:{...this.player},holding:this.holding,paused:this.paused,releaseIn:this.releaseIn,armor:this.armor,kills:this.kills,shots:this.shots,won:this.won,scraps:this.scraps.map(e=>({...e})),enemies:this.enemies.map(e=>({...e})),events:[...this.events],particles:this.particles.length}}};var Xt={step:.008333333333333333,pullRadius:320,anticipation:.065,shotSpeed:1260,hitStop:.045,breakStop:.065,returnDelay:.25,upgradeArmor:6,maxParticles:220,maxScraps:70},bi=(n,e,t)=>Math.max(e,Math.min(t,n));function rh(n,e,t){let i=t.x-e.x,s=t.y-e.y,r=bi(((n.x-e.x)*i+(n.y-e.y)*s)/(i*i+s*s||1),0,1);return Math.hypot(n.x-e.x-r*i,n.y-e.y-r*s)}var $n=class{clearElapsed=0;quietSince=-1;links=[];stage=0;encounter="combat";choice=0;build="base";evolution=0;module="";relays=[];activeRelay=0;bossLocked=!1;encounterStart=0;encounterSpawns=0;transition=0;lane=null;laneCycle=-1;laneSuppressedUntil=0;choices=[];stageTimes=[];get pullRadius(){return this.build==="swarm"?460:this.build==="lance"?340:Xt.pullRadius}get capacity(){return(this.build==="swarm"?this.evolution===2?30:24:this.build==="lance"?12:this.player.upgrade?16:11)+(this.module==="rack"?3:0)}get optionIds(){return this.choice===1?["recycler","rack","guard"]:this.choice===2?["swarm","lance"]:this.build==="swarm"?["cyclone","lance"]:["return","swarm"]}width;height;time=0;seed=814;serial=0;player={x:0,y:0,vx:0,vy:0,angle:-.5,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};runTime=0;phase=0;over=!1;hurt=0;runEndedAt=0;nextArrival=0;wave=0;enemySerial=4;eliteSpawned=!1;eliteDefeated=!1;upgrades=[];milestones=[];counters={};peak={scraps:0,particles:0,enemies:0};recycled=0;repairKills=0;resultDelay=0;scraps=[];enemies=[];particles=[];events=[];holding=!1;holdTime=0;releaseIn=0;shotAngle=0;freeze=0;shake=0;camera={x:0,y:0};armor=0;kills=0;shots=0;won=!1;winTime=0;started=!1;reduced=!1;paused=!1;move={x:0,y:0};aim={x:0,y:0};onEvent=null;constructor(e=960,t=640){this.width=e,this.height=t,this.reset()}random(){return this.seed=Math.imul(1664525,this.seed)+1013904223>>>0,this.seed/4294967296}emit(e,t=this.player.x,i=this.player.y,s=1){let r={kind:e,t:this.time,x:t,y:i,value:s};this.events.push(r),this.events.length>180&&this.events.shift(),this.counters[e]=(this.counters[e]??0)+1,this.onEvent?.(r)}reset(){this.clearElapsed=0,this.quietSince=-1,this.links=[],this.time=0,this.seed=814,this.serial=0,this.scraps=[],this.enemies=[],this.particles=[],this.events=[],this.holding=!1,this.holdTime=0,this.releaseIn=0,this.freeze=0,this.shake=0,this.camera={x:0,y:0},this.armor=0,this.kills=0,this.shots=0,this.won=!1,this.winTime=0,this.started=!1,this.move={x:0,y:0},this.runTime=0,this.phase=0,this.over=!1,this.hurt=0,this.runEndedAt=0,this.nextArrival=0,this.wave=0,this.enemySerial=4,this.eliteSpawned=!1,this.eliteDefeated=!1,this.upgrades=[],this.milestones=[],this.counters={},this.peak={scraps:11,particles:0,enemies:4},this.recycled=0,this.repairKills=0,this.resultDelay=0,this.stage=0,this.encounter="combat",this.choice=0,this.build="base",this.evolution=0,this.module="",this.relays=[],this.activeRelay=0,this.bossLocked=!1,this.encounterStart=0,this.encounterSpawns=0,this.transition=0,this.lane=null,this.laneCycle=-1,this.laneSuppressedUntil=0,this.choices=[],this.stageTimes=[],this.setupRelays();let e=this.height>this.width;this.player={x:this.width*(e?.43:.34),y:this.height*(e?.65:.59),vx:0,vy:0,angle:-.55,kick:0,upgrade:0,transform:0,bump:0,hp:6,maxHp:6};let t=e?[[.53,.42],[.27,.25],[.77,.47],[.73,.2]]:[[.59,.43],[.72,.66],[.43,.25],[.82,.26]];for(let i=0;i<t.length;i++){let[s,r]=t[i],a=i===3;this.enemies.push({id:i,x:s*this.width,y:r*this.height,home:{x:s*this.width,y:r*this.height},vx:0,vy:0,hp:a?14:4,max:a?14:4,heavy:a,r:a?36:25,angle:2.3,flash:0,recoil:0,charge:0,cool:4+i*1.4,dead:!1,deathAt:0,kind:a?"heavy":"basic",shield:0,facing:2.3,windup:0,dash:0,recover:0,spawnIn:0,guardStress:0,locked:0})}this.aim={x:this.enemies[0].x,y:this.enemies[0].y};for(let i=0;i<11;i++){let s=i*2.399,r=72+i%4*20;this.addScrap(this.player.x+Math.cos(s)*r,this.player.y+Math.sin(s)*r,i%3)}}addScrap(e,t,i,s=!1,r=0,a=0){if(this.scraps.length>=Xt.maxScraps){let c=this.scraps.filter(l=>l.mode==="loose"&&!l.reward).sort((l,d)=>d.age-l.age)[0]??this.scraps.find(l=>!l.reward)??this.scraps[0];if(!c)return;c.reward&&(this.armor++,this.emit("overflow-reclaim",c.x,c.y),this.burst(c.x,c.y,3,"#b6ffe4")),this.scraps.splice(this.scraps.indexOf(c),1),this.recycled++}this.scraps.push({id:this.serial++,x:e,y:t,vx:r,vy:a,kind:i,angle:this.random()*6.28,spin:(this.random()-.5)*8,mode:"loose",age:0,reward:s,salvaged:s,...s?{earnedStage:this.stage}:{},returnAt:s?this.time+Xt.returnDelay:1/0,orbit:0,hit:[]})}startHold(){this.paused||this.over||this.won||this.encounter!=="combat"||this.releaseIn>0||(this.started=!0,this.holding=!0,this.holdTime=0,this.emit("pull"))}release(){this.holding&&(this.holding=!1,this.holdTime=0,this.scraps.some(e=>e.mode==="orbit")?(this.releaseIn=Xt.anticipation,this.shotAngle=this.player.angle,this.emit("anticipation")):this.emit("empty"))}cancel(){this.holding=!1,this.holdTime=0,this.releaseIn=0,this.move={x:0,y:0}}launch(){let e=this.player,t=this.scraps.filter(i=>i.mode==="orbit");if(t.length){if(this.shots++,this.emit("launch",e.x,e.y,t.length),e.kick=1,t.forEach((i,s)=>{let r=(s-(t.length-1)/2)*(this.build==="swarm"?.034:this.build==="lance"?.004:.017),a=this.shotAngle+r,o=(s%3-1)*8;i.mode="shot",i.age=0,i.x=e.x+Math.cos(a)*38-Math.sin(a)*o,i.y=e.y+Math.sin(a)*38+Math.cos(a)*o,i.vx=Math.cos(a)*(Xt.shotSpeed*(this.build==="lance"?1.45:1)+s*13),i.vy=Math.sin(a)*(Xt.shotSpeed*(this.build==="lance"?1.45:1)+s*13),i.hit=[],i.reward=!1}),this.build==="swarm"&&this.evolution===2){this.emit("cyclone"),this.burst(e.x,e.y,32,"#b6ffe4");for(let i of this.enemies)if(!i.dead&&Math.hypot(i.x-e.x,i.y-e.y)<165){let s=Math.atan2(i.y-e.y,i.x-e.x);i.vx+=Math.cos(s)*300,i.vy+=Math.sin(s)*300,i.kind!=="elite"&&(i.shield=0,i.recover=1.8)}}e.vx-=Math.cos(this.shotAngle)*95,e.vy-=Math.sin(this.shotAngle)*95,this.burst(e.x+Math.cos(e.angle)*40,e.y+Math.sin(e.angle)*40,14,"#b4ffe4",e.angle)}}burst(e,t,i,s,r){for(let a=0;a<i;a++){let o=r===void 0?this.random()*6.28:r+(this.random()-.5)*2.8,c=70+this.random()*330,l=.16+this.random()*.35;this.particles.push({x:e,y:t,vx:Math.cos(o)*c,vy:Math.sin(o)*c,life:l,max:l,size:1+this.random()*3,color:s,kind:"spark",angle:o,spin:0})}this.particles.length>Xt.maxParticles&&this.particles.splice(0,this.particles.length-Xt.maxParticles)}hit(e,t){if(e.dead||e.spawnIn>0||t.hit.includes(e.id)||this.block(e,t))return;let i={x:t.vx,y:t.vy};t.hit.push(e.id);let s=Math.atan2(t.vy,t.vx),r=this.player.upgrade?2:1,a=e.hp;if(e.hp-=r,e.kind==="elite"&&(a>16&&e.hp<=16||a>8&&e.hp<=8)&&(e.hp=a>16?16:8,this.counterCharge(e),this.stage===5)){this.bossLocked=!0,this.activeRelay++,this.mark("reactor-lock");for(let o=0;o<10;o++)this.addScrap(e.x+Math.cos(o)*55,e.y+Math.sin(o)*55,o%3,!0)}if(e.flash=.11,e.recoil=1,e.vx+=Math.cos(s)*(e.heavy?75:160),e.vy+=Math.sin(s)*(e.heavy?75:160),this.freeze=Math.max(this.freeze,Xt.hitStop),this.shake=Math.max(this.shake,this.reduced?0:4),this.camera.x=-Math.cos(s)*4,this.camera.y=-Math.sin(s)*4,this.emit("hit",e.x,e.y,r),this.burst(t.x,t.y,8,"#ffc16c",s),t.mode="loose",t.age=0,t.vx=-t.vx*.13,t.vy=-t.vy*.13,t.returnAt=this.module==="recycler"||this.build==="lance"&&this.evolution===2?this.time+.7:1/0,e.hp<=0){e.dead=!0,e.deathAt=this.time,this.kills++,this.freeze=Xt.breakStop,this.shake=this.reduced?0:7,this.emit("break",e.x,e.y,e.heavy?2:1),this.burst(e.x,e.y,e.heavy?42:25,"#ffd9a0",s);let o=e.heavy?10:5;for(let c=0;c<o;c++){let l=c/o*Math.PI*2,d=100+this.random()*90;this.addScrap(e.x+Math.cos(l)*15,e.y+Math.sin(l)*15,c%3,!0,Math.cos(l)*d,Math.sin(l)*d)}e.kind==="elite"&&this.stage===5&&(this.eliteDefeated=!0),this.repairKills++,this.runTime>30&&this.repairKills>=8&&(this.repairKills=0,this.player.hp=Math.min(this.player.maxHp,this.player.hp+1),this.emit("repair")),this.particles.push({x:e.x,y:e.y,vx:0,vy:0,life:.35,max:.35,size:15,color:"#f4d19b",kind:"ring",angle:0,spin:0});for(let c=0;c<5;c++)this.particles.push({x:e.x+(this.random()-.5)*20,y:e.y+(this.random()-.5)*20,vx:(this.random()-.5)*35,vy:-10-this.random()*20,life:.65,max:.65,size:14+this.random()*12,color:"#78817b",kind:"smoke",angle:0,spin:0})}this.build==="lance"&&t.hit.length<(this.evolution===2?4:3)&&(t.mode="shot",t.vx=i.x*.9,t.vy=i.y*.9)}update(e){if(this.paused||this.encounter==="choice")return;if(this.encounter==="settle"||this.encounter==="equip"){this.settle(e);return}if(this.over){this.time+=e;return}this.time+=e;for(let h of this.links)h.life-=e;if(this.links=this.links.filter(h=>h.life>0),this.started&&!this.won&&(this.runTime+=e),this.hurt=Math.max(0,this.hurt-e),this.director(e),this.over||this.encounter!=="combat")return;this.player.transform=Math.max(0,this.player.transform-e),this.player.bump=Math.max(0,this.player.bump-e),this.shake=Math.max(0,this.shake-e*40),this.camera.x*=Math.exp(-e*22),this.camera.y*=Math.exp(-e*22);for(let h of this.particles)h.life-=e,h.x+=h.vx*e,h.y+=h.vy*e,h.vx*=Math.exp(-e*4),h.vy*=Math.exp(-e*4),h.angle+=h.spin*e;if(this.particles=this.particles.filter(h=>h.life>0),this.freeze>0){this.freeze-=e;return}this.holding&&(this.holdTime+=e),this.releaseIn>0&&(this.releaseIn-=e,this.releaseIn<=0&&this.launch());let t=this.player,i=this.aim.x-t.x,s=this.aim.y-t.y;i*i+s*s>25&&(t.angle=Math.atan2(s,i)),t.kick=Math.max(0,t.kick-e*7);let r=Math.hypot(this.move.x,this.move.y),a=this.holding?175:230,o=r>1?this.move.x/r:this.move.x,c=r>1?this.move.y/r:this.move.y;t.vx+=(o*a-t.vx)*Math.min(1,e*16),t.vy+=(c*a-t.vy)*Math.min(1,e*16),t.x=bi(t.x+t.vx*e,52,this.width-52),t.y=bi(t.y+t.vy*e,85,this.height-70);let l=this.scraps.filter(h=>h.mode==="loose"&&(h.salvaged||h.reward)&&(this.holding||h.returnAt<=this.time)&&Math.hypot(h.x-t.x,h.y-t.y)<this.pullRadius),d=this.scraps.filter(h=>h.mode==="orbit"),u=Math.max(0,this.capacity-d.length),f=d.filter(h=>!h.salvaged);for(let h=0;h<Math.min(f.length,Math.max(0,l.length-u));h++){let g=f[h],m=Math.atan2(g.y-t.y,g.x-t.x);g.mode="loose",g.vx=Math.cos(m)*170,g.vy=Math.sin(m)*170,g.returnAt=1/0,g.pickupAfter=this.time+1.2}let p=this.scraps.filter(h=>h.mode==="orbit"),x=p.length;for(let h of this.scraps){if(h.age+=e,h.angle+=h.spin*e,h.mode==="orbit"){let M=p,A=M.indexOf(h),_=this.time*(this.holding?2.6:1.3)+A/Math.max(1,M.length)*Math.PI*2,E=(t.upgrade?59:51)+A%2*7-(this.holding?Math.min(this.holdTime,1)*7:0);h.orbit=_;let R=t.x+Math.cos(_)*E,I=t.y+Math.sin(_)*E;h.x+=(R-h.x)*Math.min(1,e*20),h.y+=(I-h.y)*Math.min(1,e*20),h.angle=_+.7;continue}let g=h.x,m=h.y;if(h.mode==="shot"){h.x+=h.vx*e,h.y+=h.vy*e;for(let M of this.enemies)if(!M.dead&&!h.hit.includes(M.id)&&rh(M,{x:g,y:m},h)<M.r+5){this.hit(M,h);break}if(h.mode==="shot"){for(let M of this.relays)if(M.id===this.activeRelay&&!M.done&&rh(M,{x:g,y:m},h)<38){this.feedRelay(M,h);break}}(h.age>.8||h.x<42||h.x>this.width-42||h.y<70||h.y>this.height-48)&&(h.mode="loose",h.vx*=-.2,h.vy*=-.2,h.returnAt=this.module==="recycler"||this.build==="lance"&&this.evolution===2?this.time+.7:1/0,h.x=bi(h.x,45,this.width-45),h.y=bi(h.y,75,this.height-50));continue}let S=Math.hypot(t.x-h.x,t.y-h.y),C=h.returnAt<=this.time,b=(this.holding&&S<this.pullRadius||C)&&(h.pickupAfter??0)<=this.time;if(b&&x<this.capacity){let M=700+2e5/(S+70),A=(t.x-h.x)/(S||1),_=(t.y-h.y)/(S||1);if(h.vx+=A*M*e,h.vy+=_*M*e,h.spin+=e*4,S<65){h.mode="orbit",h.vx=h.vy=0,x++,this.emit("snap",h.x,h.y,h.reward?2:1),h.reward&&(this.armor++,h.reward=!1,this.armor>=Xt.upgradeArmor&&!t.upgrade&&(t.upgrade=1,t.transform=1.2,this.upgrades.push(this.runTime),this.emit("upgrade",t.x,t.y,1),this.burst(t.x,t.y,32,"#b6ffe4")));continue}}let w=b?2.1:4;h.vx*=Math.exp(-e*w),h.vy*=Math.exp(-e*w),h.x+=h.vx*e,h.y+=h.vy*e,(h.x<40||h.x>this.width-40)&&(h.vx*=-.45),(h.y<65||h.y>this.height-45)&&(h.vy*=-.45),h.x=bi(h.x,40,this.width-40),h.y=bi(h.y,65,this.height-45)}for(let h of this.enemies){if(this.won)continue;if(h.spawnIn>0){h.spawnIn=Math.max(0,h.spawnIn-e);continue}if(["shield","charger","elite"].includes(h.kind)){this.updateSpecial(h,e);continue}if(h.flash=Math.max(0,h.flash-e),h.recoil=Math.max(0,h.recoil-e*7),h.dead)continue;let g=t.x-h.x,m=t.y-h.y,S=Math.hypot(g,m);h.angle=Math.atan2(m,g),h.cool-=this.started?e:0,h.charge>0?(h.charge-=e,h.charge<=0&&(h.vx+=Math.cos(h.angle)*(h.heavy?280:340),h.vy+=Math.sin(h.angle)*(h.heavy?280:340),h.cool=h.heavy?5.5:4.4)):h.cool<=0&&this.started&&S<460&&(h.charge=.65,this.emit("enemy-windup",h.x,h.y)),h.x=bi(h.x+h.vx*e,60,this.width-60),h.y=bi(h.y+h.vy*e,100,this.height-65),h.vx*=Math.exp(-e*4),h.vy*=Math.exp(-e*4),S<h.r+24&&t.bump<=0&&(t.bump=.6,t.vx+=Math.cos(h.angle)*320,t.vy+=Math.sin(h.angle)*320,this.damage(),this.emit("bump"),this.burst(t.x,t.y,8,"#e8e6cb"))}this.finishStep()}neutralizeShots(){for(let e of this.scraps)e.mode==="shot"&&(e.mode="loose",e.vx*=.12,e.vy*=.12,e.returnAt=this.time+Xt.returnDelay,e.hit=[]);this.releaseIn=0}autoFeed(){if(!(this.stage===5||this.enemies.some(e=>!e.dead)||this.encounter!=="combat"||this.over||this.won))for(let e of this.scraps){let t=this.relays[this.activeRelay];if(!t||t.done)break;!e.salvaged||e.earnedStage!==this.stage||(e.salvaged=!1,this.links.push({x:e.x,y:e.y,tx:t.x,ty:t.y,life:.45}),this.chargeRelay(t),this.emit("auto-charge",t.x,t.y))}}settle(e){this.time+=e,this.clearElapsed+=e,this.transition-=e,this.freeze=0,this.shake=Math.max(0,this.shake-e*40),this.camera.x*=Math.exp(-e*22),this.camera.y*=Math.exp(-e*22),this.player.transform=Math.max(0,this.player.transform-e);for(let t of this.relays)t.flash=Math.max(0,t.flash-e);for(let t of this.particles)t.life-=e,t.x+=t.vx*e,t.y+=t.vy*e,t.vx*=Math.exp(-e*4),t.vy*=Math.exp(-e*4);this.particles=this.particles.filter(t=>t.life>0);for(let t of this.links)t.life-=e;this.links=this.links.filter(t=>t.life>0);for(let t of this.scraps)if(t.mode==="loose"&&t.returnAt<=this.time){let i=this.player.x-t.x,s=this.player.y-t.y;t.x+=i*Math.min(1,e*8),t.y+=s*Math.min(1,e*8),Math.hypot(i,s)<65&&this.scraps.filter(r=>r.mode==="orbit").length<this.capacity&&(t.mode="orbit",t.vx=t.vy=0,t.reward&&(this.armor++,t.reward=!1,this.armor>=Xt.upgradeArmor&&!this.player.upgrade&&(this.player.upgrade=1,this.player.transform=1.2,this.upgrades.push(this.runTime),this.emit("upgrade",this.player.x,this.player.y,1),this.burst(this.player.x,this.player.y,32,"#b6ffe4"))))}this.encounter==="settle"&&this.clearElapsed-e<.16&&this.clearElapsed>=.16&&this.emit("circuit-secured"),!(this.transition>1e-8)&&(this.encounter==="settle"&&this.choice?(this.encounter="choice",this.mark("choice-open-"+this.choice)):this.enterStage(this.stage+1))}mark(e){this.milestones.push({kind:e,t:this.runTime}),this.emit(e)}director(e){if(!this.started||this.won||this.over||this.encounter!=="combat")return;for(let a of this.relays)a.flash=Math.max(0,a.flash-e);let t=this.enemies.filter(a=>!a.dead).length;t===0&&this.stage<5?(this.quietSince<0&&(this.quietSince=this.time),this.time-this.quietSince>=Xt.returnDelay&&this.autoFeed()):this.quietSince=-1;let i=this.relays.every(a=>a.done);if(this.stage<5&&i&&t===0){this.stageTimes.push(this.runTime),this.cancel(),this.lane=null,this.encounter="settle",this.clearElapsed=0,this.transition=.65,this.choice=[0,1,4].includes(this.stage)?this.stage===0?1:this.stage===1?2:3:0,this.neutralizeShots(),this.mark("stage-clear-"+this.stage);return}if(this.stage>=3){let a=this.runTime-this.encounterStart,o=Math.floor(a/10);if(o>this.laneCycle&&this.runTime>=this.laneSuppressedUntil){this.laneCycle=o;let l=this.stage===4?"y":"x";this.lane={axis:l,position:l==="x"?this.width*(o%2?.7:.3):this.height*(o%2?.65:.38),width:28,telegraph:1.6,active:1},this.emit("enemy-windup")}let c=this.lane;c&&(c.telegraph>0?c.telegraph-=e:c.active>0?(c.active-=e,Math.abs(this.player[c.axis]-c.position)<c.width/2&&this.damage()):this.lane=null)}if(i||this.stage===5||t>=4||(t===0&&(this.nextArrival=Math.min(this.nextArrival,this.runTime+2.2)),this.runTime<this.nextArrival))return;this.encounterSpawns++;let s=this.stage===0?"basic":this.stage===1?this.encounterSpawns%2?"shield":"basic":this.stage===2?this.encounterSpawns%2?"charger":"basic":this.encounterSpawns%3===0?"shield":this.encounterSpawns%2?"charger":"basic",r=this.encounterSpawns*2.4;this.spawn(s,.5+Math.cos(r)*.29,.48+Math.sin(r)*.25),this.nextArrival=this.runTime+9}setupRelays(){let e=[14,18,22,24,26,10],t=[[[.72,.55]],[[.24,.37],[.78,.67]],[[.72,.28],[.29,.69]],[[.27,.3],[.75,.65],[.46,.47]],[[.26,.66],[.73,.29],[.7,.68]],[[.25,.36],[.76,.48],[.46,.72]]];this.relays=t[this.stage].map((i,s)=>({id:s,x:i[0]*this.width,y:i[1]*this.height,charge:0,max:e[this.stage],done:!1,flash:0})),this.activeRelay=0}feedRelay(e,t){if(!(e.id!==this.activeRelay||e.done||this.encounter!=="combat"||this.over||this.won)&&!(this.stage===5&&!this.bossLocked)){if(t.mode="loose",t.age=0,t.vx*=-.16,t.vy*=-.16,t.returnAt=this.time+.45,!t.salvaged){this.emit("relay-empty",e.x,e.y);return}t.salvaged=!1,t.reward=!1,this.chargeRelay(e)}}chargeRelay(e){if(e.charge=Math.min(e.max,e.charge+1),e.flash=.13,this.emit("relay-hit",e.x,e.y),this.burst(e.x,e.y,3,"#a4edcf"),e.charge>=e.max)if(e.done=!0,this.mark("relay-"+this.stage+"-"+e.id),this.burst(e.x,e.y,32,"#b6ffe4"),this.emit("relay-complete",e.x,e.y),this.stage===5){this.bossLocked=!1;let t=this.enemies.find(i=>i.kind==="elite"&&!i.dead);t&&(this.counterCharge(t),this.mark("reactor-counter"))}else{this.activeRelay++,this.lane=null,this.laneSuppressedUntil=this.runTime+7;for(let t of this.enemies)t.dead||(t.windup=0,t.dash=0,t.shellGate=0,t.shield=0,t.recover=3,t.cool=3,t.vx*=.1,t.vy*=.1,this.burst(t.x,t.y,8,"#b6ffe4"));this.mark("power-window")}}choose(e){if(this.encounter!=="choice"||!this.optionIds.includes(e))return!1;this.choices.push({stage:this.stage,id:e,t:this.runTime}),this.mark("choose-"+e),this.choice===1?(this.module=e,e==="guard"&&(this.player.maxHp=7,this.player.hp=7)):(e==="swarm"||e==="cyclone"?this.build="swarm":this.build="lance",this.evolution=this.choice===2?1:2,this.upgrade(this.evolution+1));let t=this.scraps.filter(i=>i.mode==="orbit").sort((i,s)=>Number(s.salvaged)-Number(i.salvaged));for(let i of t.slice(this.capacity))i.mode="loose",i.returnAt=1/0,i.pickupAfter=this.time+1.2;return this.choice=0,this.encounter="equip",this.transition=.18,this.clearElapsed=0,this.player.transform=Math.max(this.player.transform,.35),this.emit("equip"),!0}enterStage(e){if(this.quietSince=-1,this.links=[],this.neutralizeShots(),this.stage=e,this.phase=e,this.encounter="combat",this.encounterStart=this.runTime,this.encounterSpawns=0,this.nextArrival=this.runTime+8,this.laneCycle=-1,this.lane=null,this.enemies=[],this.cancel(),this.player.hp=Math.min(this.player.maxHp,this.player.hp+1),this.setupRelays(),this.mark("stage-start-"+e),[[],["shield","basic","basic"],["charger","charger","basic"],["shield","charger","basic"],["elite","charger","shield"],["elite"]][e].forEach((i,s)=>this.spawn(i,[.26,.75,.65][s],[.25,.32,.67][s])),this.eliteDefeated=!1,this.bossLocked=e===5,this.eliteSpawned=e===5,this.stage===5){this.mark("elite-arrival");for(let i=0;i<12;i++)this.addScrap(this.width*.5+Math.cos(i)*75,this.height*.55+Math.sin(i)*75,i%3,!0)}}spawn(e,t,i){let s=this.width*t,r=this.height*i;Math.hypot(s-this.player.x,r-this.player.y)<160&&(s=this.width-s,r=this.height-r);let a=e==="elite"?24:e==="shield"?10:e==="charger"?8:4,o=Math.atan2(this.player.y-r,this.player.x-s),c=e==="shield"||e==="elite";this.enemies.push({id:this.enemySerial++,x:s,y:r,home:{x:s,y:r},vx:0,vy:0,hp:a,max:a,heavy:e==="elite",r:e==="elite"?43:e==="shield"?29:25,angle:o,flash:0,recoil:0,charge:0,cool:1.6,dead:!1,deathAt:0,kind:e,shield:c?1:0,facing:o,windup:0,dash:0,recover:0,spawnIn:1.1,guardStress:0,locked:o}),this.counters["spawn-"+e]=(this.counters["spawn-"+e]??0)+1}upgrade(e){let t=this.player;t.upgrade=e,t.transform=1.2,t.hp=Math.min(t.maxHp,t.hp+2),this.upgrades.push(this.runTime),this.nextArrival=Math.max(this.nextArrival,this.runTime+4),this.emit("upgrade",t.x,t.y,e),this.burst(t.x,t.y,32,"#b6ffe4")}damage(){this.encounter!=="combat"||this.runTime<30||this.hurt>0||this.over||this.won||(this.hurt=1.8,this.player.hp--,this.emit("damage"),this.player.hp<=0&&(this.over=!0,this.runEndedAt=this.runTime,this.cancel(),this.mark("failed")))}block(e,t){if(this.stage===5&&e.kind==="elite"&&this.bossLocked||(e.shellGate??0)>0)return t.hit.push(e.id),t.mode="loose",t.age=0,t.returnAt=1/0,t.vx*=-.25,t.vy*=-.25,this.burst(t.x,t.y,4,"#ffc16c"),this.emit("block",e.x,e.y),!0;if(e.shield<=0||e.recover>0)return!1;let i=Math.atan2(-t.vy,-t.vx),s=Math.atan2(Math.sin(i-e.facing),Math.cos(i-e.facing));if(Math.abs(s)>1.05)return!1;if(t.hit.push(e.id),e.guardStress++,e.flash=.07,e.recoil=.5,t.mode="loose",t.age=0,t.returnAt=1/0,t.vx*=-.32,t.vy*=-.32,this.emit("block",e.x,e.y),this.burst(t.x,t.y,4,"#92c8c7"),e.guardStress>=8){if(e.kind==="elite")return this.counterCharge(e),!0;e.guardStress=0,e.shield=0,e.recover=1.8,e.windup=0,e.dash=0,this.emit("shield-open",e.x,e.y),this.burst(e.x,e.y,14,"#ffc16c")}return!0}counterCharge(e){e.guardStress=0,e.shield=1,e.recover=0,e.dash=0,e.windup=.95,e.shellGate=1.45,e.locked=Math.atan2(this.player.y-e.y,this.player.x-e.x),e.facing=e.locked,e.angle=e.locked,this.emit("shell-counter",e.x,e.y),this.emit("enemy-windup",e.x,e.y),this.burst(e.x,e.y,14,"#d6b26c")}updateSpecial(e,t){if(e.shellGate=Math.max(0,(e.shellGate??0)-t),e.flash=Math.max(0,e.flash-t),e.recoil=Math.max(0,e.recoil-t*7),e.dead)return;let i=this.player,s=i.x-e.x,r=i.y-e.y,a=Math.hypot(s,r),o=Math.atan2(r,s),c=e.kind==="shield"||e.kind==="elite";if(e.recover>0)e.recover=Math.max(0,e.recover-t),e.shield=0,e.vx*=Math.exp(-t*7),e.vy*=Math.exp(-t*7),e.recover===0&&(e.shield=c?1:0,e.cool=1.3,e.guardStress=0);else if(e.dash>0)e.dash-=t,e.dash<=0&&(e.recover=e.kind==="elite"?1.8:1.3,e.shield=0,this.emit("exposed",e.x,e.y));else if(e.windup>0){if(e.windup-=t,e.vx*=Math.exp(-t*12),e.vy*=Math.exp(-t*12),e.windup<=0){e.dash=c?.48:.55;let l=e.kind==="elite"?460:e.kind==="shield"?260:490;e.vx=Math.cos(e.locked)*l,e.vy=Math.sin(e.locked)*l,this.emit("dash",e.x,e.y)}}else{let l=Math.atan2(Math.sin(o-e.facing),Math.cos(o-e.facing));e.facing+=bi(l,-t*(c?1:3),t*(c?1:3)),e.angle=e.facing,e.cool-=t;let d=c?34:65;a>170?(e.vx+=(Math.cos(e.facing)*d-e.vx)*t*4,e.vy+=(Math.sin(e.facing)*d-e.vy)*t*4):(e.vx*=Math.exp(-t*4),e.vy*=Math.exp(-t*4)),e.cool<=0&&(e.locked=e.facing,e.windup=e.kind==="elite"?.95:.8,e.cool=3.5,this.emit("enemy-windup",e.x,e.y))}e.x=bi(e.x+e.vx*t,60,this.width-60),e.y=bi(e.y+e.vy*t,100,this.height-65),(e.x<=60||e.x>=this.width-60||e.y<=100||e.y>=this.height-65)&&e.dash>0&&(e.dash=0,e.recover=1.3,e.shield=0),a<e.r+24&&i.bump<=0&&(i.bump=.6,i.vx+=Math.cos(o)*320,i.vy+=Math.sin(o)*320,this.damage(),this.emit("bump"),this.burst(i.x,i.y,8,"#e8e6cb"))}finishStep(){this.enemies=this.enemies.filter(e=>!e.dead||this.time-e.deathAt<.8),this.particles.length>Xt.maxParticles&&this.particles.splice(0,this.particles.length-Xt.maxParticles),this.peak.scraps=Math.max(this.peak.scraps,this.scraps.length),this.peak.particles=Math.max(this.peak.particles,this.particles.length),this.peak.enemies=Math.max(this.peak.enemies,this.enemies.filter(e=>!e.dead).length),this.eliteDefeated&&!this.won&&(this.won=!0,this.winTime=this.time,this.runEndedAt=this.runTime,this.cancel(),this.mark("complete")),this.won&&(this.resultDelay=this.time-this.winTime,this.resultDelay>2&&(this.over=!0))}snapshot(){return{clearElapsed:this.clearElapsed,transition:this.transition,links:this.links.map(e=>({...e})),stage:this.stage,encounter:this.encounter,choice:this.choice,optionIds:this.optionIds,build:this.build,evolution:this.evolution,module:this.module,relays:this.relays.map(e=>({...e})),activeRelay:this.activeRelay,bossLocked:this.bossLocked,lane:this.lane?{...this.lane}:null,choices:[...this.choices],stageTimes:[...this.stageTimes],capacity:this.capacity,pullRadius:this.pullRadius,runTime:this.runTime,phase:this.phase,over:this.over,hurt:this.hurt,upgrades:[...this.upgrades],milestones:[...this.milestones],counters:{...this.counters},peak:{...this.peak},recycled:this.recycled,runEndedAt:this.runEndedAt,time:this.time,player:{...this.player},holding:this.holding,paused:this.paused,releaseIn:this.releaseIn,armor:this.armor,kills:this.kills,shots:this.shots,won:this.won,scraps:this.scraps.map(e=>({...e})),enemies:this.enemies.map(e=>({...e})),events:[...this.events],particles:this.particles.length}}};var sa=class extends na{mission="A";modules=[];form="";boost=0;barrierUntil=0;reinforced=!1;checkpointPending=!1;constructor(e=960,t=640){super(e,t),this.reset()}startMission(e){this.mission=e,this.reset()}reset(){let e=this.mission??"A";super.reset(),this.mission=e,this.modules=[],this.form="",this.boost=0,this.barrierUntil=0,this.reinforced=!1,this.checkpointPending=!0,e!=="A"&&this.enterStage(0)}get optionIds(){return this.choice===1?jc.filter(e=>!(this.modules??[]).includes(e)):this.choice===2?["swarm","lance"]:this.build==="swarm"?["satellite","cyclone"]:["foundry","return"]}get pullRadius(){return super.pullRadius+((this.modules??[]).includes("field")&&this.holding?100:0)}choose(e){if(this.encounter!=="choice"||!this.optionIds.includes(e)||this.paused)return!1;this.choices.push({stage:this.stage,id:e,t:this.runTime}),this.choice===1?this.modules.push(e):this.choice===2?(this.build=e,this.evolution=1,this.upgrade(2)):(this.form=e,this.evolution=2,this.upgrade(3));for(let t of this.scraps.filter(i=>i.mode==="orbit").sort((i,s)=>Number(s.salvaged)-Number(i.salvaged)).slice(this.capacity))t.mode="loose",t.returnAt=1/0,t.pickupAfter=this.time+.5;return this.choice=0,this.encounter="equip",this.transition=.18,this.clearElapsed=0,this.emit("equip"),!0}setupRelays(){(this.mission??"A")==="A"?$n.prototype.setupRelays.call(this):(this.relays=[],this.activeRelay=0)}spawnRole([e,t,i]){let s=["gunner","support","carrier","controller"].includes(e)?e:void 0;this.spawn(s?"heavy":e,t,i);let r=this.enemies.at(-1);s&&(r.role=s,r.hp=r.max=s==="carrier"?66:s==="controller"?76:s==="support"?14:10,r.r=s==="carrier"?53:s==="controller"?50:29,r.heavy=s==="carrier"||s==="controller",r.cool=s==="carrier"?1.8:2.2,r.shield=0)}enterStage(e){if(this.mission==="A"){$n.prototype.enterStage.call(this,e),this.checkpointPending=!0;return}let t=Xs[this.mission][e];if(!t)throw Error("Mission boundary");this.stage=e,this.phase=e,this.encounter="combat",this.encounterStart=this.runTime,this.cancel(),this.neutralizeShots(),this.enemies=[],this.lane=null,this.laneCycle=-1,this.laneSuppressedUntil=0,this.quietSince=-1,this.bossLocked=!1,this.reinforced=!1,this.eliteDefeated=!1,this.player.hp=Math.min(this.player.maxHp,this.player.hp+1),this.player.x=this.width*.35,this.player.y=this.height*.68,this.relays=t.quota?[{id:0,x:t.relay[0]*this.width,y:t.relay[1]*this.height,charge:0,max:t.quota,done:!1,flash:0}]:[],this.activeRelay=0;for(let i of t.enemies)this.spawnRole(i);this.mark("stage-start-"+e),this.checkpointPending=!0}director(e){if(this.mission==="A"){$n.prototype.director.call(this,e),this.encounter==="settle"&&(this.choice=this.stage===0||this.stage===2?1:this.stage===1?2:this.stage===4?3:0);return}if(!this.started||this.won||this.over)return;let t=Xs[this.mission][this.stage];for(let s of this.relays)s.flash=Math.max(0,s.flash-e);if(!this.reinforced&&this.enemies.some(s=>s.dead)){this.reinforced=!0;for(let s of t.reinforcements??[])this.spawnRole(s);t.reinforcements?.length&&this.emit("reinforcement"),t.lane==="alternate"&&(this.laneCycle=Math.floor((this.runTime-this.encounterStart)/8),this.lane={axis:"x",position:St(this.player.x,this.width*.25,this.width*.75),width:32,telegraph:1.6,active:1.1},this.emit("enemy-windup"))}if(t.lane){let s=Math.floor((this.runTime-this.encounterStart)/8);if(s>this.laneCycle&&this.runTime>=this.laneSuppressedUntil){this.laneCycle=s;let r=t.lane==="alternate"?s%2?"x":"y":t.lane;this.lane={axis:r,position:r==="x"?this.width*(s%2?.7:.3):this.height*(s%2?.66:.36),width:32,telegraph:1.6,active:1.1},this.emit("enemy-windup")}this.lane&&(this.lane.telegraph>0?this.lane.telegraph-=e:this.lane.active>0?(this.lane.active-=e,Math.abs(this.player[this.lane.axis]-this.lane.position)<this.lane.width/2&&this.damage()):this.lane=null)}if(!this.enemies.filter(s=>!s.dead).length){if(this.stage===5){this.eliteDefeated=!0;return}this.quietSince<0&&(this.quietSince=this.time),this.time-this.quietSince>=Mt.returnDelay&&this.autoFeed(),this.relays.every(s=>s.done)&&(this.stageTimes.push(this.runTime),this.cancel(),this.lane=null,this.encounter="settle",this.clearElapsed=0,this.transition=.65,this.choice=this.stage===0||this.stage===2?1:this.stage===1?2:this.stage===4?3:0,this.neutralizeShots(),this.mark("stage-clear-"+this.stage))}}launch(){for(let i of this.scraps)i.reserved=!1,i.mode==="orbit"&&(i.power=1,i.frontArmor=!1);let e=this.form==="satellite"?this.scraps.filter(i=>i.mode==="orbit").slice(0,4):[];for(let i of e)i.mode="loose";let t=this.shots;super.launch();for(let i of e)i.mode="orbit",i.returnAt=1/0,i.reserved=!0;if(this.shots!==t){if(this.form==="foundry"){let i=this.scraps.filter(s=>s.mode==="shot"&&s.age===0);for(let s=0;s<i.length;s+=3){let r=i.slice(s,s+3),a=r[0];a.power=r.length,a.vx*=.68,a.vy*=.68;for(let o of r.slice(1))o.mode="loose",o.x=this.player.x,o.y=this.player.y,o.vx=-a.vx*.08,o.vy=-a.vy*.08,o.pickupAfter=this.time+.6}this.emit("foundry")}if(this.modules.includes("brake")&&(this.player.vx=0,this.player.vy=0),this.modules.includes("shock")){for(let i of this.enemies)if(!i.dead&&!i.role&&i.kind!=="elite"&&Math.hypot(i.x-this.player.x,i.y-this.player.y)<145){let s=Math.atan2(i.y-this.player.y,i.x-this.player.x);i.vx+=Math.cos(s)*220,i.vy+=Math.sin(s)*220,this.emit("shock",i.x,i.y)}}}}damage(){if(this.mission==="A"&&this.runTime<30||this.encounter!=="combat"||this.hurt>0||this.over||this.won)return;let e=this.form==="satellite"&&this.scraps.find(t=>t.mode==="orbit"&&t.reserved);if(e){e.mode="loose",e.reserved=!1,e.pickupAfter=this.time+2,e.returnAt=1/0,e.vx=160,this.hurt=.8,this.barrierUntil=this.time+.35,this.emit("satellite-block");return}this.hurt=1.8,this.player.hp--,this.emit("damage"),this.player.hp<=0&&(this.over=!0,this.runEndedAt=this.runTime,this.cancel(),this.mark("failed"))}block(e,t){if(t.frontArmor=!1,e.role==="controller")return t.frontArmor=e.recover<=0,!1;if(e.role==="carrier"){let i=Math.atan2(-t.vy,-t.vx),s=Math.abs(Math.atan2(Math.sin(i-e.facing),Math.cos(i-e.facing)));return t.frontArmor=e.recover<=0&&s<.85,t.frontArmor&&this.emit("armor-impact",e.x,e.y),!1}return super.block(e,t)}hit(e,t){if(super.hit(e,t),e.dead&&e.role==="support"&&!e.supportBroken){e.supportBroken=!0;for(let i of this.enemies)i.dead||(i.shield=0,i.recover=2.6);this.emit("support-break",e.x,e.y)}}emit(e,t=this.player.x,i=this.player.y,s=1){super.emit(e,t,i,s),e==="snap"&&s===2&&(this.modules??[]).includes("drive")&&(this.boost=1.8)}update(e){let t=!this.paused&&this.encounter==="combat"&&!this.over;super.update(e),t&&(this.boost=Math.max(0,this.boost-e),this.boost>0&&(this.player.x=St(this.player.x+this.move.x*65*e,52,this.width-52),this.player.y=St(this.player.y+this.move.y*65*e,85,this.height-70)))}updateSpecial(e,t){if(!e.role){super.updateSpecial(e,t);return}if(e.flash=Math.max(0,e.flash-t),e.recoil=Math.max(0,e.recoil-t*7),e.dead||!this.started)return;let i=this.player,s=Math.atan2(i.y-e.y,i.x-e.x);if(e.role==="controller"){if(e.recover>0)e.recover=Math.max(0,e.recover-t),e.angle+=t*.2;else if(e.dash>0){e.dash-=t;let r=e.x-i.x,a=e.y-i.y,o=Math.hypot(r,a)||1;o<205&&(i.vx+=r/o*900*t,i.vy+=a/o*900*t,o<112&&this.damage()),e.dash<=0&&(e.recover=2.8,this.emit("core-open",e.x,e.y))}else e.windup>0?(e.windup-=t,e.windup<=0&&(e.dash=1.2,this.emit("magnet-pulse",e.x,e.y))):(e.angle+=t*.4,e.cool-=t,e.cool<=0&&(e.windup=1.4,e.cool=1.5,this.emit("enemy-windup",e.x,e.y)));return}if(e.role==="support"){if(e.cool-=t,e.angle+=t*.5,e.cool<=0){let r=this.enemies.filter(a=>!a.dead&&a!==e&&a.hp<a.max).sort((a,o)=>a.hp/a.max-o.hp/o.max)[0];r&&(r.hp=Math.min(r.max,r.hp+2),this.links.push({x:e.x,y:e.y,tx:r.x,ty:r.y,life:.5}),this.emit("repair-link",e.x,e.y)),e.cool=2.8}return}if(e.recover>0)e.recover-=t,e.vx*=Math.exp(-t*8),e.vy*=Math.exp(-t*8);else if(e.dash>0){if(e.dash-=t,e.role==="gunner"){let r={x:e.x+Math.cos(e.locked)*1400,y:e.y+Math.sin(e.locked)*1400};ia(i,e,r)<18&&this.damage()}else e.x=St(e.x+e.vx*t,65,this.width-65),e.y=St(e.y+e.vy*t,105,this.height-75),Math.hypot(i.x-e.x,i.y-e.y)<e.r+22&&this.damage();e.dash<=0&&(e.recover=e.role==="carrier"?2.1:1.5,this.emit("exposed",e.x,e.y))}else e.windup>0?(e.windup-=t,e.windup<=0&&(e.dash=e.role==="carrier"?.7:.22,e.vx=Math.cos(e.locked)*400,e.vy=Math.sin(e.locked)*400,this.emit(e.role==="carrier"?"carrier-charge":"rail-fire",e.x,e.y))):(e.facing=s,e.angle=s,e.cool-=t,e.cool<=0&&(e.locked=s,e.windup=e.role==="carrier"?1.15:1,e.cool=e.role==="carrier"?1.8:2.1,this.emit("enemy-windup",e.x,e.y)))}checkpoint(){return{mission:this.mission,zone:this.stage,seed:this.seed,elapsed:this.runTime,hp:this.player.hp,maxHp:this.player.maxHp,upgrade:this.player.upgrade,build:this.build,form:this.form,modules:[...this.modules],evolution:this.evolution,armor:this.armor,repairKills:this.repairKills,kills:this.kills,shots:this.shots,nx:this.player.x/this.width,ny:this.player.y/this.height,scraps:this.scraps.map(e=>({kind:e.kind,salvaged:e.salvaged,reward:e.reward,reserved:e.reserved===!0,orbit:e.mode==="orbit",earnedStage:e.earnedStage??-1}))}}restore(e){let t=this.onEvent;this.onEvent=null,this.startMission(e.mission),e.zone>0&&this.enterStage(e.zone),this.build=e.build,this.evolution=e.evolution,this.form=e.form,this.modules=[...e.modules],this.player.hp=e.hp,this.player.maxHp=e.maxHp,this.player.upgrade=e.upgrade,this.player.x=e.nx*this.width,this.player.y=e.ny*this.height,this.player.transform=0,this.armor=e.armor,this.repairKills=e.repairKills,this.kills=e.kills,this.shots=e.shots,this.runTime=e.elapsed,this.encounterStart=e.elapsed,this.nextArrival=e.elapsed+8,this.scraps=[];for(let[i,s]of e.scraps.entries()){let r=i*2.399,a=75+i%4*16;this.addScrap(St(this.player.x+Math.cos(r)*a,45,this.width-45),St(this.player.y+Math.sin(r)*a,80,this.height-55),s.kind);let o=this.scraps.at(-1);o.salvaged=s.salvaged,o.reward=s.reward,o.reserved=s.reserved,o.mode=s.orbit?"orbit":"loose",s.earnedStage>=0&&(o.earnedStage=s.earnedStage)}this.seed=e.seed,this.freeze=0,this.particles=[],this.events=[],this.links=[],this.checkpointPending=!1,this.onEvent=t,this.started=!1,this.cancel()}snapshot(){return{...super.snapshot(),modules:[...this.modules],form:this.form,boost:this.boost,barrierUntil:this.barrierUntil,mission:this.mission,checkpointPending:this.checkpointPending,encounterId:this.mission.toLowerCase()+(this.stage+1)}}};var Lh=0,Xl=1,Dh=2;var kn=1,Nh=2,Ts=3,wn=0,Gt=1,ni=2,Dt=0,As=1,ql=2,Yl=3,Zl=4,eo=5;var Wi=100,Uh=101,Fh=102,Oh=103,Bh=104,Mr=200,kh=201,zh=202,Vh=203,Jl=204,Kl=205,to=206,Hh=207,io=208,Gh=209,Wh=210,Xh=211,qh=212,Yh=213,Zh=214,Aa=0,Ra=1,Ca=2,ps=3,Ia=4,Pa=5,La=6,Da=7,no=0,Jh=1,Kh=2,Ii=0,Sr=1,wr=2,Er=3,zn=4,Tr=5,Ar=6,Rr=7;var $l=300,En=301,Vn=302,so=303,ro=304,Cr=306,tn=1e3,Oi=1001,Na=1002,Tt=1003,$h=1004;var Ir=1005;var Vt=1006,ao=1007;var Tn=1008;var si=1009,jl=1010,Ql=1011,Rs=1012,oo=1013,Pi=1014,ri=1015,Bt=1016,lo=1017,co=1018,An=1020,ec=35902,tc=35899,ic=1021,nc=1022,ai=1023,Bi=1026,Xi=1027,Cs=1028,ho=1029,Rn=1030,uo=1031;var fo=1033,Pr=33776,Lr=33777,Dr=33778,Nr=33779,po=35840,mo=35841,go=35842,xo=35843,yo=36196,_o=37492,vo=37496,bo=37488,Mo=37489,Ur=37490,So=37491,wo=37808,Eo=37809,To=37810,Ao=37811,Ro=37812,Co=37813,Io=37814,Po=37815,Lo=37816,Do=37817,No=37818,Uo=37819,Fo=37820,Oo=37821,Bo=36492,ko=36494,zo=36495,Vo=36283,Ho=36284,Fr=36285,Go=36286;var tr=2300,Ua=2301,Ea=2302,Fl=2303,Ol=2400,Bl=2401,kl=2402;var jh=3200;var Is=0,Qh=1,an="",$t="srgb",ir="srgb-linear",nr="linear",nt="srgb";var Ta=7680;var eu=519,tu=512,iu=513,nu=514,Wo=515,su=516,ru=517,Xo=518,au=519,ou=35044,sc=35048;var rc="300 es",Ci=2e3,ms=2001;function xd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function yd(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function sr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function lu(){let n=sr("canvas");return n.style.display="block",n}var ah={},gs=null;function ac(...n){let e="THREE."+n.shift();gs?gs("log",e,...n):console.log(e,...n)}function cu(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function De(...n){n=cu(n);let e="THREE."+n.shift();if(gs)gs("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ne(...n){n=cu(n);let e="THREE."+n.shift();if(gs)gs("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Fn(...n){let e=n.join(" ");e in ah||(ah[e]=!0,De(...n))}function hu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var uu={[Aa]:Ra,[Ca]:La,[Ia]:Da,[ps]:Pa,[Ra]:Aa,[La]:Ca,[Da]:Ia,[Pa]:ps},ki=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oh=1234567,Qs=Math.PI/180,xs=180/Math.PI;function Ps(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]).toLowerCase()}function $e(n,e,t){return Math.max(e,Math.min(t,n))}function oc(n,e){return(n%e+e)%e}function _d(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function vd(n,e,t){return n!==e?(t-n)/(e-n):0}function er(n,e,t){return(1-t)*n+t*e}function bd(n,e,t,i){return er(n,e,1-Math.exp(-t*i))}function Md(n,e=1){return e-Math.abs(oc(n,e*2)-e)}function Sd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function wd(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ed(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Td(n,e){return n+Math.random()*(e-n)}function Ad(n){return n*(.5-Math.random())}function Rd(n){n!==void 0&&(oh=n);let e=oh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cd(n){return n*Qs}function Id(n){return n*xs}function Pd(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Ld(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Dd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Nd(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),d=a((e+i)/2),u=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),x=a((i-e)/2);switch(s){case"XYX":n.set(o*d,c*u,c*f,o*l);break;case"YZY":n.set(c*f,o*d,c*u,o*l);break;case"ZXZ":n.set(c*u,c*f,o*d,o*l);break;case"XZX":n.set(o*d,c*x,c*p,o*l);break;case"YXY":n.set(c*p,o*d,c*x,o*l);break;case"ZYZ":n.set(c*x,c*p,o*d,o*l);break;default:De("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ds(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var lc={DEG2RAD:Qs,RAD2DEG:xs,generateUUID:Ps,clamp:$e,euclideanModulo:oc,mapLinear:_d,inverseLerp:vd,lerp:er,damp:bd,pingpong:Md,smoothstep:Sd,smootherstep:wd,randInt:Ed,randFloat:Td,randFloatSpread:Ad,seededRandom:Rd,degToRad:Cd,radToDeg:Id,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Dd,setQuaternionFromProperEuler:Nd,normalize:Kt,denormalize:ds},Be=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},di=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],d=i[s+2],u=i[s+3],f=r[a+0],p=r[a+1],x=r[a+2],h=r[a+3];if(u!==h||c!==f||l!==p||d!==x){let g=c*f+l*p+d*x+u*h;g<0&&(f=-f,p=-p,x=-x,h=-h,g=-g);let m=1-o;if(g<.9995){let S=Math.acos(g),C=Math.sin(S);m=Math.sin(m*S)/C,o=Math.sin(o*S)/C,c=c*m+f*o,l=l*m+p*o,d=d*m+x*o,u=u*m+h*o}else{c=c*m+f*o,l=l*m+p*o,d=d*m+x*o,u=u*m+h*o;let S=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=S,l*=S,d*=S,u*=S}}e[t]=c,e[t+1]=l,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],d=i[s+3],u=r[a],f=r[a+1],p=r[a+2],x=r[a+3];return e[t]=o*x+d*u+c*p-l*f,e[t+1]=c*x+d*f+l*u-o*p,e[t+2]=l*x+d*p+o*f-c*u,e[t+3]=d*x-o*u-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(s/2),u=o(r/2),f=c(i/2),p=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=f*d*u+l*p*x,this._y=l*p*u-f*d*x,this._z=l*d*x+f*p*u,this._w=l*d*u-f*p*x;break;case"YXZ":this._x=f*d*u+l*p*x,this._y=l*p*u-f*d*x,this._z=l*d*x-f*p*u,this._w=l*d*u+f*p*x;break;case"ZXY":this._x=f*d*u-l*p*x,this._y=l*p*u+f*d*x,this._z=l*d*x+f*p*u,this._w=l*d*u-f*p*x;break;case"ZYX":this._x=f*d*u-l*p*x,this._y=l*p*u+f*d*x,this._z=l*d*x-f*p*u,this._w=l*d*u+f*p*x;break;case"YZX":this._x=f*d*u+l*p*x,this._y=l*p*u+f*d*x,this._z=l*d*x-f*p*u,this._w=l*d*u-f*p*x;break;case"XZY":this._x=f*d*u-l*p*x,this._y=l*p*u-f*d*x,this._z=l*d*x+f*p*u,this._w=l*d*u+f*p*x;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],d=t[6],u=t[10],f=i+o+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(d-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+d)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,d=t._w;return this._x=i*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-s*o,this._w=a*d-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,t=Math.sin(t*l)/d,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),d=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+c*l+a*u-o*d,this.y=i+c*d+o*l-r*u,this.z=s+c*u+r*d-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ml.copy(this).projectOnVector(e),this.sub(ml)}reflect(e){return this.sub(ml.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos($e(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ml=new F,lh=new di,ke=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],u=i[7],f=i[2],p=i[5],x=i[8],h=s[0],g=s[3],m=s[6],S=s[1],C=s[4],b=s[7],w=s[2],M=s[5],A=s[8];return r[0]=a*h+o*S+c*w,r[3]=a*g+o*C+c*M,r[6]=a*m+o*b+c*A,r[1]=l*h+d*S+u*w,r[4]=l*g+d*C+u*M,r[7]=l*m+d*b+u*A,r[2]=f*h+p*S+x*w,r[5]=f*g+p*C+x*M,r[8]=f*m+p*b+x*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8];return t*a*d-t*o*l-i*r*d+i*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],u=d*a-o*l,f=o*c-d*r,p=l*r-a*c,x=t*u+i*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let h=1/x;return e[0]=u*h,e[1]=(s*l-d*i)*h,e[2]=(o*i-s*a)*h,e[3]=f*h,e[4]=(d*t-s*c)*h,e[5]=(s*r-o*t)*h,e[6]=p*h,e[7]=(i*c-l*t)*h,e[8]=(a*t-i*r)*h,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Fn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gl.makeScale(e,t)),this}rotate(e){return Fn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gl.makeRotation(-e)),this}translate(e,t){return Fn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},gl=new ke,ch=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ud(){let n={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===nt&&(s.r=en(s.r),s.g=en(s.g),s.b=en(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===nt&&(s.r=fs(s.r),s.g=fs(s.g),s.b=fs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===an?nr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ir]:{primaries:e,whitePoint:i,transfer:nr,toXYZ:ch,fromXYZ:hh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:i,transfer:nt,toXYZ:ch,fromXYZ:hh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),n}var Ze=Ud();function en(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var jn,Fa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{jn===void 0&&(jn=sr("canvas")),jn.width=e.width,jn.height=e.height;let s=jn.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=jn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=en(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(en(t[i]/255)*255):t[i]=en(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Fd=0,ys=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ps(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xl(s[a].image)):r.push(xl(s[a]))}else r=xl(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function xl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fa.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}var Od=0,yl=new F,ti=class n extends ki{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Oi,s=Oi,r=Vt,a=Tn,o=ai,c=si,l=n.DEFAULT_ANISOTROPY,d=an){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=Ps(),this.name="",this.source=new ys(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yl).x}get height(){return this.source.getSize(yl).y}get depth(){return this.source.getSize(yl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){De(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){De(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$l)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tn:e.x=e.x-Math.floor(e.x);break;case Oi:e.x=e.x<0?0:1;break;case Na:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tn:e.y=e.y-Math.floor(e.y);break;case Oi:e.y=e.y<0?0:1;break;case Na:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ti.DEFAULT_IMAGE=null;ti.DEFAULT_MAPPING=$l;ti.DEFAULT_ANISOTROPY=1;var _t=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,c=e.elements,l=c[0],d=c[4],u=c[8],f=c[1],p=c[5],x=c[9],h=c[2],g=c[6],m=c[10];if(Math.abs(d-f)<.01&&Math.abs(u-h)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+h)<.1&&Math.abs(x+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(l+1)/2,b=(p+1)/2,w=(m+1)/2,M=(d+f)/4,A=(u+h)/4,_=(x+g)/4;return C>b&&C>w?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=M/i,r=A/i):b>w?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=M/s,r=_/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=A/r,s=_/r),this.set(i,s,r,t),this}let S=Math.sqrt((g-x)*(g-x)+(u-h)*(u-h)+(f-d)*(f-d));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(u-h)/S,this.z=(f-d)/S,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar($e(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Oa=class extends ki{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new ti(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ys(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},At=class extends Oa{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},rr=class extends ti{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ba=class extends ti{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var it=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,c,l,d,u,f,p,x,h,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,d,u,f,p,x,h,g)}set(e,t,i,s,r,a,o,c,l,d,u,f,p,x,h,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=d,m[10]=u,m[14]=f,m[3]=p,m[7]=x,m[11]=h,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Qn.setFromMatrixColumn(e,0).length(),r=1/Qn.setFromMatrixColumn(e,1).length(),a=1/Qn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*d,p=a*u,x=o*d,h=o*u;t[0]=c*d,t[4]=-c*u,t[8]=l,t[1]=p+x*l,t[5]=f-h*l,t[9]=-o*c,t[2]=h-f*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*d,p=c*u,x=l*d,h=l*u;t[0]=f+h*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*u,t[5]=a*d,t[9]=-o,t[2]=p*o-x,t[6]=h+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*d,p=c*u,x=l*d,h=l*u;t[0]=f-h*o,t[4]=-a*u,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*d,t[9]=h-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*d,p=a*u,x=o*d,h=o*u;t[0]=c*d,t[4]=x*l-p,t[8]=f*l+h,t[1]=c*u,t[5]=h*l+f,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,p=a*l,x=o*c,h=o*l;t[0]=c*d,t[4]=h-f*u,t[8]=x*u+p,t[1]=u,t[5]=a*d,t[9]=-o*d,t[2]=-l*d,t[6]=p*u+x,t[10]=f-h*u}else if(e.order==="XZY"){let f=a*c,p=a*l,x=o*c,h=o*l;t[0]=c*d,t[4]=-u,t[8]=l*d,t[1]=f*u+h,t[5]=a*d,t[9]=p*u-x,t[2]=x*u-p,t[6]=o*d,t[10]=h*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bd,e,kd)}lookAt(e,t,i){let s=this.elements;return li.subVectors(e,t),li.lengthSq()===0&&(li.z=1),li.normalize(),fn.crossVectors(i,li),fn.lengthSq()===0&&(Math.abs(i.z)===1?li.x+=1e-4:li.z+=1e-4,li.normalize(),fn.crossVectors(i,li)),fn.normalize(),ra.crossVectors(li,fn),s[0]=fn.x,s[4]=ra.x,s[8]=li.x,s[1]=fn.y,s[5]=ra.y,s[9]=li.y,s[2]=fn.z,s[6]=ra.z,s[10]=li.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],u=i[5],f=i[9],p=i[13],x=i[2],h=i[6],g=i[10],m=i[14],S=i[3],C=i[7],b=i[11],w=i[15],M=s[0],A=s[4],_=s[8],E=s[12],R=s[1],I=s[5],U=s[9],B=s[13],P=s[2],k=s[6],J=s[10],K=s[14],ie=s[3],X=s[7],W=s[11],j=s[15];return r[0]=a*M+o*R+c*P+l*ie,r[4]=a*A+o*I+c*k+l*X,r[8]=a*_+o*U+c*J+l*W,r[12]=a*E+o*B+c*K+l*j,r[1]=d*M+u*R+f*P+p*ie,r[5]=d*A+u*I+f*k+p*X,r[9]=d*_+u*U+f*J+p*W,r[13]=d*E+u*B+f*K+p*j,r[2]=x*M+h*R+g*P+m*ie,r[6]=x*A+h*I+g*k+m*X,r[10]=x*_+h*U+g*J+m*W,r[14]=x*E+h*B+g*K+m*j,r[3]=S*M+C*R+b*P+w*ie,r[7]=S*A+C*I+b*k+w*X,r[11]=S*_+C*U+b*J+w*W,r[15]=S*E+C*B+b*K+w*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],d=e[2],u=e[6],f=e[10],p=e[14],x=e[3],h=e[7],g=e[11],m=e[15],S=c*p-l*f,C=o*p-l*u,b=o*f-c*u,w=a*p-l*d,M=a*f-c*d,A=a*u-o*d;return t*(h*S-g*C+m*b)-i*(x*S-g*w+m*M)+s*(x*C-h*w+m*A)-r*(x*b-h*M+g*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],d=e[10];return t*(a*d-o*l)-i*(r*d-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],d=e[8],u=e[9],f=e[10],p=e[11],x=e[12],h=e[13],g=e[14],m=e[15],S=t*o-i*a,C=t*c-s*a,b=t*l-r*a,w=i*c-s*o,M=i*l-r*o,A=s*l-r*c,_=d*h-u*x,E=d*g-f*x,R=d*m-p*x,I=u*g-f*h,U=u*m-p*h,B=f*m-p*g,P=S*B-C*U+b*I+w*R-M*E+A*_;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/P;return e[0]=(o*B-c*U+l*I)*k,e[1]=(s*U-i*B-r*I)*k,e[2]=(h*A-g*M+m*w)*k,e[3]=(f*M-u*A-p*w)*k,e[4]=(c*R-a*B-l*E)*k,e[5]=(t*B-s*R+r*E)*k,e[6]=(g*b-x*A-m*C)*k,e[7]=(d*A-f*b+p*C)*k,e[8]=(a*U-o*R+l*_)*k,e[9]=(i*R-t*U-r*_)*k,e[10]=(x*M-h*b+m*S)*k,e[11]=(u*b-d*M-p*S)*k,e[12]=(o*E-a*I-c*_)*k,e[13]=(t*I-i*E+s*_)*k,e[14]=(h*C-x*w-g*S)*k,e[15]=(d*w-u*C+f*S)*k,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+i,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,d=a+a,u=o+o,f=r*l,p=r*d,x=r*u,h=a*d,g=a*u,m=o*u,S=c*l,C=c*d,b=c*u,w=i.x,M=i.y,A=i.z;return s[0]=(1-(h+m))*w,s[1]=(p+b)*w,s[2]=(x-C)*w,s[3]=0,s[4]=(p-b)*M,s[5]=(1-(f+m))*M,s[6]=(g+S)*M,s[7]=0,s[8]=(x+C)*A,s[9]=(g-S)*A,s[10]=(1-(f+h))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Qn.set(s[0],s[1],s[2]).length(),o=Qn.set(s[4],s[5],s[6]).length(),c=Qn.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ti.copy(this);let l=1/a,d=1/o,u=1/c;return Ti.elements[0]*=l,Ti.elements[1]*=l,Ti.elements[2]*=l,Ti.elements[4]*=d,Ti.elements[5]*=d,Ti.elements[6]*=d,Ti.elements[8]*=u,Ti.elements[9]*=u,Ti.elements[10]*=u,t.setFromRotationMatrix(Ti),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=Ci,c=!1){let l=this.elements,d=2*r/(t-e),u=2*r/(i-s),f=(t+e)/(t-e),p=(i+s)/(i-s),x,h;if(c)x=r/(a-r),h=a*r/(a-r);else if(o===Ci)x=-(a+r)/(a-r),h=-2*a*r/(a-r);else if(o===ms)x=-a/(a-r),h=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=h,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ci,c=!1){let l=this.elements,d=2/(t-e),u=2/(i-s),f=-(t+e)/(t-e),p=-(i+s)/(i-s),x,h;if(c)x=1/(a-r),h=a/(a-r);else if(o===Ci)x=-2/(a-r),h=-(a+r)/(a-r);else if(o===ms)x=-1/(a-r),h=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=h,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Qn=new F,Ti=new it,Bd=new F(0,0,0),kd=new F(1,1,1),fn=new F,ra=new F,li=new F,uh=new it,dh=new di,Si=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],u=s[2],f=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($e(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return uh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(uh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dh.setFromEuler(this),this.setFromQuaternion(dh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Si.DEFAULT_ORDER="XYZ";var _s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},zd=0,fh=new F,es=new di,Ji=new it,aa=new F,Ys=new F,Vd=new F,Hd=new di,ph=new F(1,0,0),mh=new F(0,1,0),gh=new F(0,0,1),xh={type:"added"},Gd={type:"removed"},ts={type:"childadded",child:null},_l={type:"childremoved",child:null},Lt=class n extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=Ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new F,t=new Si,i=new di,s=new F(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new ke}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(ph,e)}rotateY(e){return this.rotateOnAxis(mh,e)}rotateZ(e){return this.rotateOnAxis(gh,e)}translateOnAxis(e,t){return fh.copy(e).applyQuaternion(this.quaternion),this.position.add(fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ph,e)}translateY(e){return this.translateOnAxis(mh,e)}translateZ(e){return this.translateOnAxis(gh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?aa.copy(e):aa.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(Ys,aa,this.up):Ji.lookAt(aa,Ys,this.up),this.quaternion.setFromRotationMatrix(Ji),s&&(Ji.extractRotation(s.matrixWorld),es.setFromRotationMatrix(Ji),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ne("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xh),ts.child=e,this.dispatchEvent(ts),ts.child=null):Ne("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gd),_l.child=e,this.dispatchEvent(_l),_l.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ji),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xh),ts.child=e,this.dispatchEvent(ts),ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,e,Vd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ys,Hd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),d=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){let c=[];for(let l in o){let d=o[l];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Lt.DEFAULT_UP=new F(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ui=class extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Wd={type:"move"},vs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let h of e.hand.values()){let g=t.getJointPose(h,i),m=this._getHandJoint(l,h);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=d.position.distanceTo(u.position),p=.02,x=.005;l.inputState.pinching&&f>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ui;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pn={h:0,s:0,l:0},oa={h:0,s:0,l:0};function vl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Oe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ze.workingColorSpace){if(e=oc(e,1),t=$e(t,0,1),i=$e(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=vl(a,r,e+1/3),this.g=vl(a,r,e),this.b=vl(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=$t){function i(r){r!==void 0&&parseFloat(r)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){let i=du[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=en(e.r),this.g=en(e.g),this.b=en(e.b),this}copyLinearToSRGB(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Ze.workingToColorSpace(Yt.copy(this),e),Math.round($e(Yt.r*255,0,255))*65536+Math.round($e(Yt.g*255,0,255))*256+Math.round($e(Yt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(Yt.copy(this),t);let i=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,d=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=d<=.5?u/(a+o):u/(2-a-o),a){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=d,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=$t){Ze.workingToColorSpace(Yt.copy(this),e);let t=Yt.r,i=Yt.g,s=Yt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(pn),this.setHSL(pn.h+e,pn.s+t,pn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(pn),e.getHSL(oa);let i=er(pn.h,oa.h,t),s=er(pn.s,oa.s,t),r=er(pn.l,oa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Yt=new Oe;Oe.NAMES=du;var ar=class n{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},On=class extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Si,this.environmentIntensity=1,this.environmentRotation=new Si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ai=new F,Ki=new F,bl=new F,$i=new F,is=new F,ns=new F,yh=new F,Ml=new F,Sl=new F,wl=new F,El=new _t,Tl=new _t,Al=new _t,yn=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ai.subVectors(e,t),s.cross(Ai);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ai.subVectors(s,t),Ki.subVectors(i,t),bl.subVectors(e,t);let a=Ai.dot(Ai),o=Ai.dot(Ki),c=Ai.dot(bl),l=Ki.dot(Ki),d=Ki.dot(bl),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-o*d)*f,x=(a*d-o*c)*f;return r.set(1-p-x,x,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,$i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,$i.x),c.addScaledVector(a,$i.y),c.addScaledVector(o,$i.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return El.setScalar(0),Tl.setScalar(0),Al.setScalar(0),El.fromBufferAttribute(e,t),Tl.fromBufferAttribute(e,i),Al.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(El,r.x),a.addScaledVector(Tl,r.y),a.addScaledVector(Al,r.z),a}static isFrontFacing(e,t,i,s){return Ai.subVectors(i,t),Ki.subVectors(e,t),Ai.cross(Ki).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ai.subVectors(this.c,this.b),Ki.subVectors(this.a,this.b),Ai.cross(Ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;is.subVectors(s,i),ns.subVectors(r,i),Ml.subVectors(e,i);let c=is.dot(Ml),l=ns.dot(Ml);if(c<=0&&l<=0)return t.copy(i);Sl.subVectors(e,s);let d=is.dot(Sl),u=ns.dot(Sl);if(d>=0&&u<=d)return t.copy(s);let f=c*u-d*l;if(f<=0&&c>=0&&d<=0)return a=c/(c-d),t.copy(i).addScaledVector(is,a);wl.subVectors(e,r);let p=is.dot(wl),x=ns.dot(wl);if(x>=0&&p<=x)return t.copy(r);let h=p*l-c*x;if(h<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(ns,o);let g=d*x-p*u;if(g<=0&&u-d>=0&&p-x>=0)return yh.subVectors(r,s),o=(u-d)/(u-d+(p-x)),t.copy(s).addScaledVector(yh,o);let m=1/(g+h+f);return a=h*m,o=f*m,t.copy(i).addScaledVector(is,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},zi=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ri):Ri.fromBufferAttribute(r,a),Ri.applyMatrix4(e.matrixWorld),this.expandByPoint(Ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),la.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),la.copy(i.boundingBox)),la.applyMatrix4(e.matrixWorld),this.union(la)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ri),Ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zs),ca.subVectors(this.max,Zs),ss.subVectors(e.a,Zs),rs.subVectors(e.b,Zs),as.subVectors(e.c,Zs),mn.subVectors(rs,ss),gn.subVectors(as,rs),Ln.subVectors(ss,as);let t=[0,-mn.z,mn.y,0,-gn.z,gn.y,0,-Ln.z,Ln.y,mn.z,0,-mn.x,gn.z,0,-gn.x,Ln.z,0,-Ln.x,-mn.y,mn.x,0,-gn.y,gn.x,0,-Ln.y,Ln.x,0];return!Rl(t,ss,rs,as,ca)||(t=[1,0,0,0,1,0,0,0,1],!Rl(t,ss,rs,as,ca))?!1:(ha.crossVectors(mn,gn),t=[ha.x,ha.y,ha.z],Rl(t,ss,rs,as,ca))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ji[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ji[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ji[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ji[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ji[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ji[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ji[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ji[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ji),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ji=[new F,new F,new F,new F,new F,new F,new F,new F],Ri=new F,la=new zi,ss=new F,rs=new F,as=new F,mn=new F,gn=new F,Ln=new F,Zs=new F,ca=new F,ha=new F,Dn=new F;function Rl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Dn.fromArray(n,r);let o=s.x*Math.abs(Dn.x)+s.y*Math.abs(Dn.y)+s.z*Math.abs(Dn.z),c=e.dot(Dn),l=t.dot(Dn),d=i.dot(Dn);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}var Pt=new F,ua=new Be,Xd=0,Qt=class extends ki{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ou,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ua.fromBufferAttribute(this,t),ua.applyMatrix3(e),this.setXY(t,ua.x,ua.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ds(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ds(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ds(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ds(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ds(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),s=Kt(s,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var or=class extends Qt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var lr=class extends Qt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var gt=class extends Qt{constructor(e,t,i){super(new Float32Array(e),t,i)}},qd=new zi,Js=new F,Cl=new F,_n=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):qd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Js.subVectors(e,this.center);let t=Js.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Js,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Js.copy(e.center).add(Cl)),this.expandByPoint(Js.copy(e.center).sub(Cl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Yd=0,Mi=new it,Il=new Lt,os=new F,ci=new zi,Ks=new zi,Ot=new F,Ht=class n extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xd(e)?lr:or)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ke().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,t,i){return Mi.makeTranslation(e,t,i),this.applyMatrix4(Mi),this}scale(e,t,i){return Mi.makeScale(e,t,i),this.applyMatrix4(Mi),this}lookAt(e){return Il.lookAt(e),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];ci.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ne('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ne("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(ci.min,Ks.min),ci.expandByPoint(Ot),Ot.addVectors(ci.max,Ks.max),ci.expandByPoint(Ot)):(ci.expandByPoint(Ks.min),ci.expandByPoint(Ks.max))}ci.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ot.fromBufferAttribute(o,l),c&&(os.fromBufferAttribute(e,l),Ot.add(os)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ne('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ne("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Qt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new F,c[_]=new F;let l=new F,d=new F,u=new F,f=new Be,p=new Be,x=new Be,h=new F,g=new F;function m(_,E,R){l.fromBufferAttribute(i,_),d.fromBufferAttribute(i,E),u.fromBufferAttribute(i,R),f.fromBufferAttribute(r,_),p.fromBufferAttribute(r,E),x.fromBufferAttribute(r,R),d.sub(l),u.sub(l),p.sub(f),x.sub(f);let I=1/(p.x*x.y-x.x*p.y);isFinite(I)&&(h.copy(d).multiplyScalar(x.y).addScaledVector(u,-p.y).multiplyScalar(I),g.copy(u).multiplyScalar(p.x).addScaledVector(d,-x.x).multiplyScalar(I),o[_].add(h),o[E].add(h),o[R].add(h),c[_].add(g),c[E].add(g),c[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let _=0,E=S.length;_<E;++_){let R=S[_],I=R.start,U=R.count;for(let B=I,P=I+U;B<P;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let C=new F,b=new F,w=new F,M=new F;function A(_){w.fromBufferAttribute(s,_),M.copy(w);let E=o[_];C.copy(E),C.sub(w.multiplyScalar(w.dot(E))).normalize(),b.crossVectors(M,E);let I=b.dot(c[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,I)}for(let _=0,E=S.length;_<E;++_){let R=S[_],I=R.start,U=R.count;for(let B=I,P=I+U;B<P;B+=3)A(e.getX(B+0)),A(e.getX(B+1)),A(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,d=new F,u=new F;if(e)for(let f=0,p=e.count;f<p;f+=3){let x=e.getX(f+0),h=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,h),a.fromBufferAttribute(t,g),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,h),l.fromBufferAttribute(i,g),o.add(d),c.add(d),l.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(h,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,p=t.count;f<p;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,c){let l=o.array,d=o.itemSize,u=o.normalized,f=new l.constructor(c.length*d),p=0,x=0;for(let h=0,g=c.length;h<g;h++){o.isInterleavedBufferAttribute?p=c[h]*o.data.stride+o.offset:p=c[h]*d;for(let m=0;m<d;m++)f[x++]=l[p++]}return new Qt(f,d,u)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,i);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let d=0,u=l.length;d<u;d++){let f=l[d],p=e(f,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];d.push(p.toJSON(e.data))}d.length>0&&(s[c]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(t))}let r=e.morphAttributes;for(let l in r){let d=[],u=r[l];for(let f=0,p=u.length;f<p;f++)d.push(u[f].clone(t));this.morphAttributes[l]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,d=a.length;l<d;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Pl=new F,Zd=new F,Jd=new ke,hi=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Pl.subVectors(i,t).cross(Zd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Pl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Jd.getNormalMatrix(e),s=this.coplanarPoint(Pl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Kd=0,Vi=class extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Ps(),this.name="",this.type="Material",this.blending=As,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jl,this.blendDst=Kl,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ta,this.stencilZFail=Ta,this.stencilZPass=Ta,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new hi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Be().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Be().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Qi=new F,Ll=new F,da=new F,fa=new F,cr=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qi.copy(this.origin).addScaledVector(this.direction,t),Qi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ll.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),fa.copy(this.origin).sub(Ll);let r=e.distanceTo(t)*.5,a=-this.direction.dot(da),o=fa.dot(this.direction),c=-fa.dot(da),l=fa.lengthSq(),d=Math.abs(1-a*a),u,f,p,x;if(d>0)if(u=a*c-o,f=a*o-c,x=r*d,u>=0)if(f>=-x)if(f<=x){let h=1/d;u*=h,f*=h,p=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;else f<=-x?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=x?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ll).addScaledVector(da,f),p}intersectSphere(e,t){if(e.radius<0)return null;Qi.subVectors(e.center,this.origin);let i=Qi.dot(this.direction),s=Qi.dot(Qi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c,l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),d>=0?(r=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(r=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Qi)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,u=e.x-a.x,f=e.y-a.y,p=e.z-a.z,x=t.x-a.x,h=t.y-a.y,g=t.z-a.z,m=i.x-a.x,S=i.y-a.y,C=i.z-a.z,b=Math.abs(c),w=Math.abs(l),M=Math.abs(d),A,_,E,R,I,U,B,P,k,J,K,ie;if(b>=w&&b>=M?(E=c,U=u,k=x,ie=m,c>=0?(A=l,_=d,R=f,I=p,B=h,P=g,J=S,K=C):(A=d,_=l,R=p,I=f,B=g,P=h,J=C,K=S)):w>=M?(E=l,U=f,k=h,ie=S,l>=0?(A=d,_=c,R=p,I=u,B=g,P=x,J=C,K=m):(A=c,_=d,R=u,I=p,B=x,P=g,J=m,K=C)):(E=d,U=p,k=g,ie=C,d>=0?(A=c,_=l,R=u,I=f,B=x,P=h,J=m,K=S):(A=l,_=c,R=f,I=u,B=h,P=x,J=S,K=m)),E===0)return null;let X=A/E,W=_/E,j=1/E,le=R-X*U,me=I-W*U,qe=B-X*k,Le=P-W*k,ze=J-X*ie,Y=K-W*ie,Q=ze*Le-Y*qe,de=le*Y-me*ze,Ce=qe*me-Le*le;if(s){if(Q<0||de<0||Ce<0)return null}else if((Q<0||de<0||Ce<0)&&(Q>0||de>0||Ce>0))return null;let ye=Q+de+Ce;if(ye===0)return null;let Pe=j*(Q*U+de*k+Ce*ie);return(ye>0?Pe<0:Pe>0)?null:this.at(Pe/ye,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},fi=class extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=no,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},_h=new it,Nn=new cr,pa=new _n,vh=new F,ma=new F,ga=new F,xa=new F,Dl=new F,ya=new F,bh=new F,_a=new F,je=class extends Lt{constructor(e=new Ht,t=new fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ya.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=o[c],u=r[c];d!==0&&(Dl.fromBufferAttribute(u,e),a?ya.addScaledVector(Dl,d):ya.addScaledVector(Dl.sub(t),d))}t.add(ya)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),pa.copy(i.boundingSphere),pa.applyMatrix4(r),Nn.copy(e.ray).recast(e.near),!(pa.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(pa,vh)===null||Nn.origin.distanceToSquared(vh)>(e.far-e.near)**2))&&(_h.copy(r).invert(),Nn.copy(e.ray).applyMatrix4(_h),!(i.boundingBox!==null&&Nn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Nn)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,h=f.length;x<h;x++){let g=f[x],m=a[g.materialIndex],S=Math.max(g.start,p.start),C=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=S,w=C;b<w;b+=3){let M=o.getX(b),A=o.getX(b+1),_=o.getX(b+2);s=va(this,m,e,i,l,d,u,M,A,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),h=Math.min(o.count,p.start+p.count);for(let g=x,m=h;g<m;g+=3){let S=o.getX(g),C=o.getX(g+1),b=o.getX(g+2);s=va(this,a,e,i,l,d,u,S,C,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,h=f.length;x<h;x++){let g=f[x],m=a[g.materialIndex],S=Math.max(g.start,p.start),C=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let b=S,w=C;b<w;b+=3){let M=b,A=b+1,_=b+2;s=va(this,m,e,i,l,d,u,M,A,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let x=Math.max(0,p.start),h=Math.min(c.count,p.start+p.count);for(let g=x,m=h;g<m;g+=3){let S=g,C=g+1,b=g+2;s=va(this,a,e,i,l,d,u,S,C,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};function $d(n,e,t,i,s,r,a,o){let c;if(e.side===Gt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===wn,o),c===null)return null;_a.copy(o),_a.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(_a);return l<t.near||l>t.far?null:{distance:l,point:_a.clone(),object:n}}function va(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,ma),n.getVertexPosition(c,ga),n.getVertexPosition(l,xa);let d=$d(n,e,t,i,ma,ga,xa,bh);if(d){let u=new F;yn.getBarycoord(bh,ma,ga,xa,u),s&&(d.uv=yn.getInterpolatedAttribute(s,o,c,l,u,new Be)),r&&(d.uv1=yn.getInterpolatedAttribute(r,o,c,l,u,new Be)),a&&(d.normal=yn.getInterpolatedAttribute(a,o,c,l,u,new F),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new F,materialIndex:0};yn.getNormal(ma,ga,xa,f.normal),d.face=f,d.barycoord=u}return d}var nn=class extends ti{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Tt,d=Tt,u,f){super(null,a,o,c,l,d,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bs=class extends Qt{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ls=new it,Mh=new it,ba=[],Sh=new zi,jd=new it,$s=new je,js=new _n,sn=class extends je{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,jd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ls),Sh.copy(e.boundingBox).applyMatrix4(ls),this.boundingBox.union(Sh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new _n),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ls),js.copy(e.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(js)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){let i=this.matrixWorld,s=this.count;if($s.geometry=this.geometry,$s.material=this.material,$s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),js.copy(this.boundingSphere),js.applyMatrix4(i),e.ray.intersectsSphere(js)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ls),Mh.multiplyMatrices(i,ls),$s.matrixWorld=Mh,$s.raycast(e,ba);for(let a=0,o=ba.length;a<o;a++){let c=ba[a];c.instanceId=r,c.object=this,t.push(c)}ba.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new nn(new Float32Array(s*this.count),s,this.count,Cs,ri));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Un=new _n,Qd=new Be(.5,.5),Ma=new F,Ms=class{constructor(e=new hi,t=new hi,i=new hi,s=new hi,r=new hi,a=new hi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],u=r[5],f=r[6],p=r[7],x=r[8],h=r[9],g=r[10],m=r[11],S=r[12],C=r[13],b=r[14],w=r[15];if(s[0].setComponents(l-a,p-d,m-x,w-S).normalize(),s[1].setComponents(l+a,p+d,m+x,w+S).normalize(),s[2].setComponents(l+o,p+u,m+h,w+C).normalize(),s[3].setComponents(l-o,p-u,m-h,w-C).normalize(),i)s[4].setComponents(c,f,g,b).normalize(),s[5].setComponents(l-c,p-f,m-g,w-b).normalize();else if(s[4].setComponents(l-c,p-f,m-g,w-b).normalize(),t===Ci)s[5].setComponents(l+c,p+f,m+g,w+b).normalize();else if(t===ms)s[5].setComponents(c,f,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Un.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Un.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Un)}intersectsSprite(e){Un.center.set(0,0,0);let t=Qd.distanceTo(e.center);return Un.radius=.7071067811865476+t,Un.applyMatrix4(e.matrixWorld),this.intersectsSphere(Un)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ma.x=s.normal.x>0?e.max.x:e.min.x,Ma.y=s.normal.y>0?e.max.y:e.min.y,Ma.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ma)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var hr=class extends ti{constructor(e=[],t=En,i,s,r,a,o,c,l,d){super(e,t,i,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Hi=class extends ti{constructor(e,t,i=Pi,s,r,a,o=Tt,c=Tt,l,d=Bi,u=1){if(d!==Bi&&d!==Xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ys(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ka=class extends Hi{constructor(e,t=Pi,i=En,s,r,a=Tt,o=Tt,c,l=Bi){let d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ur=class extends ti{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ii=class n extends Ht{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],d=[],u=[],f=0,p=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(u,2));function x(h,g,m,S,C,b,w,M,A,_,E){let R=b/A,I=w/_,U=b/2,B=w/2,P=M/2,k=A+1,J=_+1,K=0,ie=0,X=new F;for(let W=0;W<J;W++){let j=W*I-B;for(let le=0;le<k;le++){let me=le*R-U;X[h]=me*S,X[g]=j*C,X[m]=P,l.push(X.x,X.y,X.z),X[h]=0,X[g]=0,X[m]=M>0?1:-1,d.push(X.x,X.y,X.z),u.push(le/A),u.push(1-W/_),K+=1}}for(let W=0;W<_;W++)for(let j=0;j<A;j++){let le=f+j+k*W,me=f+j+k*(W+1),qe=f+(j+1)+k*(W+1),Le=f+(j+1)+k*W;c.push(le,me,Le),c.push(me,qe,Le),ie+=6}o.addGroup(p,ie,E),p+=ie,f+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var rn=class n extends Ht{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let d=[],u=[],f=[],p=[],x=0,h=[],g=i/2,m=0;S(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(d),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(f,3)),this.setAttribute("uv",new gt(p,2));function S(){let b=new F,w=new F,M=0,A=(t-e)/i;for(let _=0;_<=r;_++){let E=[],R=_/r,I=R*(t-e)+e;for(let U=0;U<=s;U++){let B=U/s,P=B*c+o,k=Math.sin(P),J=Math.cos(P);w.x=I*k,w.y=-R*i+g,w.z=I*J,u.push(w.x,w.y,w.z),b.set(k,A,J).normalize(),f.push(b.x,b.y,b.z),p.push(B,1-R),E.push(x++)}h.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){let R=h[E][_],I=h[E+1][_],U=h[E+1][_+1],B=h[E][_+1];(e>0||E!==0)&&(d.push(R,I,B),M+=3),(t>0||E!==r-1)&&(d.push(I,U,B),M+=3)}l.addGroup(m,M,0),m+=M}function C(b){let w=x,M=new Be,A=new F,_=0,E=b===!0?e:t,R=b===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,g*R,0),f.push(0,R,0),p.push(.5,.5),x++;let I=x;for(let U=0;U<=s;U++){let P=U/s*c+o,k=Math.cos(P),J=Math.sin(P);A.x=E*J,A.y=g*R,A.z=E*k,u.push(A.x,A.y,A.z),f.push(0,R,0),M.x=k*.5+.5,M.y=J*.5*R+.5,p.push(M.x,M.y),x++}for(let U=0;U<s;U++){let B=w+U,P=I+U;b===!0?d.push(P,P+1,B):d.push(P+1,P,B),_+=3}l.addGroup(m,_,b===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var vn=class n extends Ht{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,d=c+1,u=e/o,f=t/c,p=[],x=[],h=[],g=[];for(let m=0;m<d;m++){let S=m*f-a;for(let C=0;C<l;C++){let b=C*u-r;x.push(b,-S,0),h.push(0,0,1),g.push(C/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<o;S++){let C=S+l*m,b=S+l*(m+1),w=S+1+l*(m+1),M=S+1+l*m;p.push(C,b,M),p.push(b,w,M)}this.setIndex(p),this.setAttribute("position",new gt(x,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},dr=class n extends Ht{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],c=[],l=[],d=[],u=e,f=(t-e)/s,p=new F,x=new Be;for(let h=0;h<=s;h++){for(let g=0;g<=i;g++){let m=r+g/i*a;p.x=u*Math.cos(m),p.y=u*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,d.push(x.x,x.y)}u+=f}for(let h=0;h<s;h++){let g=h*(i+1);for(let m=0;m<i;m++){let S=m+g,C=S,b=S+i+1,w=S+i+2,M=S+1;o.push(C,b,M),o.push(b,w,M)}}this.setIndex(o),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(l,3)),this.setAttribute("uv",new gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Bn=class n extends Ht{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let c=[],l=[],d=[],u=[],f=new F,p=new F,x=new F;for(let h=0;h<=i;h++){let g=a+h/i*o;for(let m=0;m<=s;m++){let S=m/s*r;p.x=(e+t*Math.cos(g))*Math.cos(S),p.y=(e+t*Math.cos(g))*Math.sin(S),p.z=t*Math.sin(g),l.push(p.x,p.y,p.z),f.x=e*Math.cos(S),f.y=e*Math.sin(S),x.subVectors(p,f).normalize(),d.push(x.x,x.y,x.z),u.push(m/s),u.push(h/i)}}for(let h=1;h<=i;h++)for(let g=1;g<=s;g++){let m=(s+1)*h+g-1,S=(s+1)*(h-1)+g-1,C=(s+1)*(h-1)+g,b=(s+1)*h+g;c.push(m,S,b),c.push(S,C,b)}this.setIndex(c),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function Hn(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(wh(s))s.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(wh(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Zt(n){let e={};for(let t=0;t<n.length;t++){let i=Hn(n[t]);for(let s in i)e[s]=i[s]}return e}function wh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ef(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function cc(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Li={clone:Hn,merge:Zt},tf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rt=class extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tf,this.fragmentShader=nf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hn(e.uniforms),this.uniformsGroups=ef(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Oe().setHex(s.value);break;case"v2":this.uniforms[i].value=new Be().fromArray(s.value);break;case"v3":this.uniforms[i].value=new F().fromArray(s.value);break;case"v4":this.uniforms[i].value=new _t().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[i].value=new it().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ss=class extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vt=class extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Is,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var fr=class extends Vi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Is,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},pr=class extends Vi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Is,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=no,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},za=class extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Va=class extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function cs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Nl(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var bn=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ha=class extends bn{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ol,endingEnd:Ol}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Bl:r=e,o=2*t-i;break;case kl:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Bl:a=e,c=2*i-t;break;case kl:a=1,c=i+s[1]-s[0];break;default:a=e-1,c=t}let l=(i-t)*.5,d=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,x=(i-t)/(s-t),h=x*x,g=h*x,m=-f*g+2*f*h-f*x,S=(1+f)*g+(-1.5-2*f)*h+(-.5+f)*x+1,C=(-1-p)*g+(1.5+p)*h+.5*x,b=p*g-p*h;for(let w=0;w!==o;++w)r[w]=m*a[d+w]+S*a[l+w]+C*a[c+w]+b*a[u+w];return r}},Ga=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=(i-t)/(s-t),u=1-d;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*d;return r}},Wa=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Xa=class extends bn{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,d=this.inTangents,u=this.outTangents;if(!d||!u){let x=(i-t)/(s-t),h=1-x;for(let g=0;g!==o;++g)r[g]=a[l+g]*h+a[c+g]*x;return r}let f=o*2,p=e-1;for(let x=0;x!==o;++x){let h=a[l+x],g=a[c+x],m=p*f+x*2,S=u[m],C=u[m+1],b=e*f+x*2,w=d[b],M=d[b+1],A=rf(i,t,S,w,s);r[x]=fu(A,h,C,M,g)}return r}};function fu(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function sf(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function rf(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=fu(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let c=sf(r,e,t,i,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var pi=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cs(t,this.TimeBufferType),this.values=cs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:cs(e.times,Array),values:cs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Nl(e.settings)&&(i.settings={inTangents:cs(e.settings.inTangents,Array),outTangents:cs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Wa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Xa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case tr:t=this.InterpolantFactoryMethodDiscrete;break;case Ua:t=this.InterpolantFactoryMethodLinear;break;case Ea:t=this.InterpolantFactoryMethodSmooth;break;case Fl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return De("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return Ua;case this.InterpolantFactoryMethodSmooth:return Ea;case this.InterpolantFactoryMethodBezier:return Fl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Nl(this.settings)&&(Eh(this.settings.inTangents,e),Eh(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ne("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Ne("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Ne("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ne("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&yd(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ne("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ea,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],d=e[o+1];if(l!==d&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*i,f=u-i,p=u+i;for(let x=0;x!==i;++x){let h=t[u+x];if(h!==t[f+x]||h!==t[p+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*i,f=a*i;for(let p=0;p!==i;++p)t[f+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Nl(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Eh(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}pi.prototype.ValueTypeName="";pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=Ua;var Mn=class extends pi{constructor(e,t,i){super(e,t,i)}};Mn.prototype.ValueTypeName="bool";Mn.prototype.ValueBufferType=Array;Mn.prototype.DefaultInterpolation=tr;Mn.prototype.InterpolantFactoryMethodLinear=void 0;Mn.prototype.InterpolantFactoryMethodSmooth=void 0;var qa=class extends pi{constructor(e,t,i,s){super(e,t,i,s)}};qa.prototype.ValueTypeName="color";var Ya=class extends pi{constructor(e,t,i,s){super(e,t,i,s)}};Ya.prototype.ValueTypeName="number";var Za=class extends bn{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(s-t),l=e*o;for(let d=l+o;l!==d;l+=4)di.slerpFlat(r,0,a,l-o,a,l,c);return r}},mr=class extends pi{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Za(this.times,this.values,this.getValueSize(),e)}};mr.prototype.ValueTypeName="quaternion";mr.prototype.InterpolantFactoryMethodSmooth=void 0;var Sn=class extends pi{constructor(e,t,i){super(e,t,i)}};Sn.prototype.ValueTypeName="string";Sn.prototype.ValueBufferType=Array;Sn.prototype.DefaultInterpolation=tr;Sn.prototype.InterpolantFactoryMethodLinear=void 0;Sn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ja=class extends pi{constructor(e,t,i,s){super(e,t,i,s)}};Ja.prototype.ValueTypeName="vector";var Ka=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,u){return l.push(d,u),this},this.removeHandler=function(d){let u=l.indexOf(d);return u!==-1&&l.splice(u,2),this},this.getHandler=function(d){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],x=l[u+1];if(p.global&&(p.lastIndex=0),p.test(d))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},pu=new Ka,$a=class{constructor(e){this.manager=e!==void 0?e:pu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};$a.DEFAULT_MATERIAL_NAME="__DEFAULT";var ws=class extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},gr=class extends ws{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ul=new it,Th=new F,Ah=new F,xr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ms,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Th.setFromMatrixPosition(e.matrixWorld),t.position.copy(Th),Ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ah),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Ul.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Ul,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===ms||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Ul)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Sa=new F,wa=new di,Fi=new F,yr=class extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=Ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Sa,wa,Fi),Fi.x===1&&Fi.y===1&&Fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,wa,Fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Sa,wa,Fi),Fi.x===1&&Fi.y===1&&Fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sa,wa,Fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},xn=new F,Rh=new Be,Ch=new Be,jt=class extends yr{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=xs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xs*2*Math.atan(Math.tan(Qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xn.x,xn.y).multiplyScalar(-e/xn.z),xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xn.x,xn.y).multiplyScalar(-e/xn.z)}getViewSize(e,t){return this.getViewBounds(e,Rh,Ch),t.subVectors(Ch,Rh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var zl=class extends xr{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}},_r=class extends ws{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new zl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Gi=class extends yr{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vl=class extends xr{constructor(){super(new Gi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new Vl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var hs=-90,us=1,ja=class extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new jt(hs,us,e,t);s.layers=this.layers,this.add(s);let r=new jt(hs,us,e,t);r.layers=this.layers,this.add(r);let a=new jt(hs,us,e,t);a.layers=this.layers,this.add(a);let o=new jt(hs,us,e,t);o.layers=this.layers,this.add(o);let c=new jt(hs,us,e,t);c.layers=this.layers,this.add(c);let l=new jt(hs,us,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,d]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let h=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=h,e.setRenderTarget(i,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,f,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Qa=class extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vr=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=af.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function af(){this._document.hidden===!1&&this.reset()}var hc="\\[\\]\\.:\\/",of=new RegExp("["+hc+"]","g"),uc="[^"+hc+"]",lf="[^"+hc.replace("\\.","")+"]",cf=/((?:WC+[\/:])*)/.source.replace("WC",uc),hf=/(WCOD+)?/.source.replace("WCOD",lf),uf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uc),df=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uc),ff=new RegExp("^"+cf+hf+uf+df+"$"),pf=["material","materials","bones","map"],Hl=class{constructor(e,t,i){let s=i||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},mt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(of,"")}static parseTrackName(e){let t=ff.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);pf.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ne("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ne("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===l){l=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ne("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ne("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ne("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Ne("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ne("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ne("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Hl;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ux=new Float32Array(1);var Ih=new it,br=class{constructor(e,t,i=0,s=1/0){this.ray=new cr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new _s,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ne("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ih.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ih),this}intersectObject(e,t=!0,i=[]){return Gl(e,this,i,t),i.sort(Ph),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Gl(e[s],this,i,t);return i.sort(Ph),i}};function Ph(n,e){return n.distance-e.distance}function Gl(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)Gl(r[a],e,t,!0)}}var Wl=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};function dc(n,e,t,i){let s=mf(i);switch(t){case ic:return n*e;case Cs:return n*e/s.components*s.byteLength;case ho:return n*e/s.components*s.byteLength;case Rn:return n*e*2/s.components*s.byteLength;case uo:return n*e*2/s.components*s.byteLength;case nc:return n*e*3/s.components*s.byteLength;case ai:return n*e*4/s.components*s.byteLength;case fo:return n*e*4/s.components*s.byteLength;case Pr:case Lr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Dr:case Nr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mo:case xo:return Math.max(n,16)*Math.max(e,8)/4;case po:case go:return Math.max(n,8)*Math.max(e,8)/2;case yo:case _o:case bo:case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vo:case Ur:case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case To:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Co:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Io:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case No:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Bo:case ko:case zo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Vo:case Ho:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Fr:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mf(n){switch(n){case si:case jl:return{byteLength:1,components:1};case Rs:case Ql:case Bt:return{byteLength:2,components:1};case lo:case co:return{byteLength:2,components:4};case Pi:case oo:case ri:return{byteLength:4,components:1};case ec:case tc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Fu(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Mf(n){let e=new WeakMap;function t(o,c){let l=o.array,d=o.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,d),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){let d=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,d);else{u.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<u.length;p++){let x=u[f],h=u[p];h.start<=x.start+x.count+1?x.count=Math.max(x.count,h.start+h.count-x.start):(++f,u[f]=h)}u.length=f+1;for(let p=0,x=u.length;p<x;p++){let h=u[p];n.bufferSubData(l,h.start*d.BYTES_PER_ELEMENT,d,h.start,h.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Sf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,If=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ff=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Of=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Jf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qf="gl_FragColor = linearToOutputTexel( gl_FragColor );",ep=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,op=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,mp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ep=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ip=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,qp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,im=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,am=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ym=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Im=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Hm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Km=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Sf,alphahash_pars_fragment:wf,alphamap_fragment:Ef,alphamap_pars_fragment:Tf,alphatest_fragment:Af,alphatest_pars_fragment:Rf,aomap_fragment:Cf,aomap_pars_fragment:If,batching_pars_vertex:Pf,batching_vertex:Lf,begin_vertex:Df,beginnormal_vertex:Nf,bsdfs:Uf,iridescence_fragment:Ff,bumpmap_pars_fragment:Of,clipping_planes_fragment:Bf,clipping_planes_pars_fragment:kf,clipping_planes_pars_vertex:zf,clipping_planes_vertex:Vf,color_fragment:Hf,color_pars_fragment:Gf,color_pars_vertex:Wf,color_vertex:Xf,common:qf,cube_uv_reflection_fragment:Yf,defaultnormal_vertex:Zf,displacementmap_pars_vertex:Jf,displacementmap_vertex:Kf,emissivemap_fragment:$f,emissivemap_pars_fragment:jf,colorspace_fragment:Qf,colorspace_pars_fragment:ep,envmap_fragment:tp,envmap_common_pars_fragment:ip,envmap_pars_fragment:np,envmap_pars_vertex:sp,envmap_physical_pars_fragment:mp,envmap_vertex:rp,fog_vertex:ap,fog_pars_vertex:op,fog_fragment:lp,fog_pars_fragment:cp,gradientmap_pars_fragment:hp,lightmap_pars_fragment:up,lights_lambert_fragment:dp,lights_lambert_pars_fragment:fp,lights_pars_begin:pp,lights_toon_fragment:gp,lights_toon_pars_fragment:xp,lights_phong_fragment:yp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:bp,lights_fragment_begin:Mp,lights_fragment_maps:Sp,lights_fragment_end:wp,lightprobes_pars_fragment:Ep,logdepthbuf_fragment:Tp,logdepthbuf_pars_fragment:Ap,logdepthbuf_pars_vertex:Rp,logdepthbuf_vertex:Cp,map_fragment:Ip,map_pars_fragment:Pp,map_particle_fragment:Lp,map_particle_pars_fragment:Dp,metalnessmap_fragment:Np,metalnessmap_pars_fragment:Up,morphinstance_vertex:Fp,morphcolor_vertex:Op,morphnormal_vertex:Bp,morphtarget_pars_vertex:kp,morphtarget_vertex:zp,normal_fragment_begin:Vp,normal_fragment_maps:Hp,normal_pars_fragment:Gp,normal_pars_vertex:Wp,normal_vertex:Xp,normalmap_pars_fragment:qp,clearcoat_normal_fragment_begin:Yp,clearcoat_normal_fragment_maps:Zp,clearcoat_pars_fragment:Jp,iridescence_pars_fragment:Kp,opaque_fragment:$p,packing:jp,premultiplied_alpha_fragment:Qp,project_vertex:em,dithering_fragment:tm,dithering_pars_fragment:im,roughnessmap_fragment:nm,roughnessmap_pars_fragment:sm,shadowmap_pars_fragment:rm,shadowmap_pars_vertex:am,shadowmap_vertex:om,shadowmask_pars_fragment:lm,skinbase_vertex:cm,skinning_pars_vertex:hm,skinning_vertex:um,skinnormal_vertex:dm,specularmap_fragment:fm,specularmap_pars_fragment:pm,tonemapping_fragment:mm,tonemapping_pars_fragment:gm,transmission_fragment:xm,transmission_pars_fragment:ym,uv_pars_fragment:_m,uv_pars_vertex:vm,uv_vertex:bm,worldpos_vertex:Mm,background_vert:Sm,background_frag:wm,backgroundCube_vert:Em,backgroundCube_frag:Tm,cube_vert:Am,cube_frag:Rm,depth_vert:Cm,depth_frag:Im,distance_vert:Pm,distance_frag:Lm,equirect_vert:Dm,equirect_frag:Nm,linedashed_vert:Um,linedashed_frag:Fm,meshbasic_vert:Om,meshbasic_frag:Bm,meshlambert_vert:km,meshlambert_frag:zm,meshmatcap_vert:Vm,meshmatcap_frag:Hm,meshnormal_vert:Gm,meshnormal_frag:Wm,meshphong_vert:Xm,meshphong_frag:qm,meshphysical_vert:Ym,meshphysical_frag:Zm,meshtoon_vert:Jm,meshtoon_frag:Km,points_vert:$m,points_frag:jm,shadow_vert:Qm,shadow_frag:eg,sprite_vert:tg,sprite_frag:ig},fe={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Yi={basic:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Zt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Zt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Zt([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Zt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Zt([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Zt([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Zt([fe.common,fe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Zt([fe.lights,fe.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Yi.physical={uniforms:Zt([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};var qo={r:0,b:0,g:0},ng=new it,Ou=new ke;Ou.set(-1,0,0,0,1,0,0,0,1);function sg(n,e,t,i,s,r){let a=new Oe(0),o=s===!0?0:1,c,l,d=null,u=0,f=null;function p(S){let C=S.isScene===!0?S.background:null;if(C&&C.isTexture){let b=S.backgroundBlurriness>0;C=e.get(C,b)}return C}function x(S){let C=!1,b=p(S);b===null?g(a,o):b&&b.isColor&&(g(b,1),C=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function h(S,C){let b=p(C);b&&(b.isCubeTexture||b.mapping===Cr)?(l===void 0&&(l=new je(new ii(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Hn(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,M,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ng.makeRotationFromEuler(C.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ou),l.material.toneMapped=Ze.getTransfer(b.colorSpace)!==nt,(d!==b||u!==b.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=b,u=b.version,f=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new je(new vn(2,2),new Rt({name:"BackgroundMaterial",uniforms:Hn(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(b.colorSpace)!==nt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||u!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,u=b.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function g(S,C){S.getRGB(qo,cc(n)),t.buffers.color.setClear(qo.r,qo.g,qo.b,C,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,C=1){a.set(S),o=C,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,g(a,o)},render:x,addToRenderList:h,dispose:m}}function rg(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(I,U,B,P,k){let J=!1,K=u(I,P,B,U);r!==K&&(r=K,l(r.object)),J=p(I,P,B,k),J&&x(I,P,B,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,b(I,U,B,P),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function d(I){return n.deleteVertexArray(I)}function u(I,U,B,P){let k=P.wireframe===!0,J=i[U.id];J===void 0&&(J={},i[U.id]=J);let K=I.isInstancedMesh===!0?I.id:0,ie=J[K];ie===void 0&&(ie={},J[K]=ie);let X=ie[B.id];X===void 0&&(X={},ie[B.id]=X);let W=X[k];return W===void 0&&(W=f(c()),X[k]=W),W}function f(I){let U=[],B=[],P=[];for(let k=0;k<t;k++)U[k]=0,B[k]=0,P[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:P,object:I,attributes:{},index:null}}function p(I,U,B,P){let k=r.attributes,J=U.attributes,K=0,ie=B.getAttributes();for(let X in ie)if(ie[X].location>=0){let j=k[X],le=J[X];if(le===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(le=I.instanceColor)),j===void 0||j.attribute!==le||le&&j.data!==le.data)return!0;K++}return r.attributesNum!==K||r.index!==P}function x(I,U,B,P){let k={},J=U.attributes,K=0,ie=B.getAttributes();for(let X in ie)if(ie[X].location>=0){let j=J[X];j===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(j=I.instanceColor));let le={};le.attribute=j,j&&j.data&&(le.data=j.data),k[X]=le,K++}r.attributes=k,r.attributesNum=K,r.index=P}function h(){let I=r.newAttributes;for(let U=0,B=I.length;U<B;U++)I[U]=0}function g(I){m(I,0)}function m(I,U){let B=r.newAttributes,P=r.enabledAttributes,k=r.attributeDivisors;B[I]=1,P[I]===0&&(n.enableVertexAttribArray(I),P[I]=1),k[I]!==U&&(n.vertexAttribDivisor(I,U),k[I]=U)}function S(){let I=r.newAttributes,U=r.enabledAttributes;for(let B=0,P=U.length;B<P;B++)U[B]!==I[B]&&(n.disableVertexAttribArray(B),U[B]=0)}function C(I,U,B,P,k,J,K){K===!0?n.vertexAttribIPointer(I,U,B,k,J):n.vertexAttribPointer(I,U,B,P,k,J)}function b(I,U,B,P){h();let k=P.attributes,J=B.getAttributes(),K=U.defaultAttributeValues;for(let ie in J){let X=J[ie];if(X.location>=0){let W=k[ie];if(W===void 0&&(ie==="instanceMatrix"&&I.instanceMatrix&&(W=I.instanceMatrix),ie==="instanceColor"&&I.instanceColor&&(W=I.instanceColor)),W!==void 0){let j=W.normalized,le=W.itemSize,me=e.get(W);if(me===void 0)continue;let qe=me.buffer,Le=me.type,ze=me.bytesPerElement,Y=Le===n.INT||Le===n.UNSIGNED_INT||W.gpuType===oo;if(W.isInterleavedBufferAttribute){let Q=W.data,de=Q.stride,Ce=W.offset;if(Q.isInstancedInterleavedBuffer){for(let ye=0;ye<X.locationSize;ye++)m(X.location+ye,Q.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ye=0;ye<X.locationSize;ye++)g(X.location+ye);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let ye=0;ye<X.locationSize;ye++)C(X.location+ye,le/X.locationSize,Le,j,de*ze,(Ce+le/X.locationSize*ye)*ze,Y)}else{if(W.isInstancedBufferAttribute){for(let Q=0;Q<X.locationSize;Q++)m(X.location+Q,W.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Q=0;Q<X.locationSize;Q++)g(X.location+Q);n.bindBuffer(n.ARRAY_BUFFER,qe);for(let Q=0;Q<X.locationSize;Q++)C(X.location+Q,le/X.locationSize,Le,j,le*ze,le/X.locationSize*Q*ze,Y)}}else if(K!==void 0){let j=K[ie];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(X.location,j);break;case 3:n.vertexAttrib3fv(X.location,j);break;case 4:n.vertexAttrib4fv(X.location,j);break;default:n.vertexAttrib1fv(X.location,j)}}}}S()}function w(){E();for(let I in i){let U=i[I];for(let B in U){let P=U[B];for(let k in P){let J=P[k];for(let K in J)d(J[K].object),delete J[K];delete P[k]}}delete i[I]}}function M(I){if(i[I.id]===void 0)return;let U=i[I.id];for(let B in U){let P=U[B];for(let k in P){let J=P[k];for(let K in J)d(J[K].object),delete J[K];delete P[k]}}delete i[I.id]}function A(I){for(let U in i){let B=i[U];for(let P in B){let k=B[P];if(k[I.id]===void 0)continue;let J=k[I.id];for(let K in J)d(J[K].object),delete J[K];delete k[I.id]}}}function _(I){for(let U in i){let B=i[U],P=I.isInstancedMesh===!0?I.id:0,k=B[P];if(k!==void 0){for(let J in k){let K=k[J];for(let ie in K)d(K[ie].object),delete K[ie];delete k[J]}delete B[P],Object.keys(B).length===0&&delete i[U]}}}function E(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:h,enableAttribute:g,disableUnusedAttributes:S}}function ag(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,d){d!==0&&(n.drawArraysInstanced(i,c,l,d),t.update(l,i,d))}function o(c,l,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,d);let f=0;for(let p=0;p<d;p++)f+=l[p];t.update(f,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function og(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==ai&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let _=A===Bt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==si&&A!==ri&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",d=c(l);d!==l&&(De("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:h,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:C,maxFragmentUniforms:b,maxSamples:w,samples:M}}function lg(n){let e=this,t=null,i=0,s=!1,r=!1,a=new hi,o=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=d(u,f,0)},this.setState=function(u,f,p){let x=u.clippingPlanes,h=u.clipIntersection,g=u.clipShadows,m=n.get(u);if(!s||x===null||x.length===0||r&&!g)r?d(null):l();else{let S=r?0:i,C=S*4,b=m.clippingState||null;c.value=b,b=d(x,f,C,p);for(let w=0;w!==C;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=h?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,f,p,x){let h=u!==null?u.length:0,g=null;if(h!==0){if(g=c.value,x!==!0||g===null){let m=p+h*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let C=0,b=p;C!==h;++C,b+=4)a.copy(u[C]).applyMatrix4(S,o),a.normal.toArray(g,b),g[b+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=h,e.numIntersection=0,g}}var Ds=4,cg=6,hg=20,ug=256,Or=new Gi,mu=new Oe,fc=null,pc=0,mc=0,gc=!1,dg=new F,Gn=new F,Us=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=dg}=r;fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fc,pc,mc),this._renderer.xr.enabled=gc,e.scissorTest=!1,Ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===En||e.mapping===Vn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fc=this._renderer.getRenderTarget(),pc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),gc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Bt,format:ai,colorSpace:ir,depthBuffer:!1},s=gu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gu(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fg(r)),this._blurMaterial=mg(r,e,t),this._ggxMaterial=pg(r,e,t)}return s}_compileMaterial(e){let t=new je(new Ht,e);this._renderer.compile(t,Or)}_sceneToCubeUV(e,t,i,s,r){let c=new jt(90,1,t,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(mu),u.toneMapping=Ii,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new je(new ii,new fi({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));let h=this._backgroundBox,g=h.material,m=!1,S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(mu),m=!0);for(let C=0;C<6;C++){let b=C%3;b===0?(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[C],r.y,r.z)):b===1?(c.up.set(0,0,l[C]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[C],r.z)):(c.up.set(0,l[C],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[C]));let w=this._cubeSize;Ls(s,b*w,C>2?w:0,w,w),u.setRenderTarget(s),m&&u.render(h,c),u.render(e,c)}u.toneMapping=p,u.autoClear=f,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===En||e.mapping===Vn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Ls(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,Or)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-d*d),f=l*1.25,p=u*f,{_lodMax:x}=this,h=this._sizeLods[i],g=3*h*(i>x-Ds?i-x+Ds:0),m=4*(this._cubeSize-h);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,Ls(r,g,m,3*h,2*h),s.setRenderTarget(r),s.render(o,Or),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-i,Ls(e,g,m,3*h,2*h),s.setRenderTarget(e),s.render(o,Or)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;let d=this._sizeLods[s],u=3*d*(s>this._lodMax-Ds?s-this._lodMax+Ds:0),f=4*(this._cubeSize-d);Ls(t,u,f,3*d,2*d),a.setRenderTarget(t),a.render(c,Or)}};function fg(n){let e=[],t=[],i=n,s=n-Ds+1+cg;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,d=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,p=3,x=new Float32Array(p*f*u),h=new Float32Array(p*f*u);for(let m=0;m<u;m++){let S=m%3*2/3-1,C=m>2?0:-1,b=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];x.set(b,p*f*m);for(let w=0;w<f;w++){let M=d[w*2]*2-1,A=d[w*2+1]*2-1;m===0?Gn.set(1,A,M):m===1?Gn.set(-M,1,-A):m===2?Gn.set(-M,A,1):m===3?Gn.set(-1,A,-M):m===4?Gn.set(-M,-1,A):Gn.set(M,A,-1),Gn.toArray(h,(m*f+w)*p)}}let g=new Ht;g.setAttribute("position",new Qt(x,p)),g.setAttribute("outputDirection",new Qt(h,p)),t.push(new je(g,null)),i>Ds&&i--}return{lodMeshes:t,sizeLods:e}}function gu(n,e,t){let i=new At(n,e,t);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ls(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function pg(n,e,t){return new Rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ug,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Dt,depthTest:!1,depthWrite:!1})}function mg(n,e,t){return new Rt({name:"SphericalGaussianBlur",defines:{SAMPLES:hg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ko(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Dt,depthTest:!1,depthWrite:!1})}function xu(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dt,depthTest:!1,depthWrite:!1})}function yu(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dt,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Zo=class extends At{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new hr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ii(5,5,5),r=new Rt({name:"CubemapFromEquirect",uniforms:Hn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Dt});r.uniforms.tEquirect.value=t;let a=new je(s,r),o=t.minFilter;return t.minFilter===Tn&&(t.minFilter=Vt),new ja(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function gg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(f,p=!1){return f==null?null:p?a(f):r(f)}function r(f){if(f&&f.isTexture){let p=f.mapping;if(p===so||p===ro)if(e.has(f)){let x=e.get(f).texture;return o(x,f.mapping)}else{let x=f.image;if(x&&x.height>0){let h=new Zo(x.height);return h.fromEquirectangularTexture(n,f),e.set(f,h),f.addEventListener("dispose",l),o(h.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let p=f.mapping,x=p===so||p===ro,h=p===En||p===Vn;if(x||h){let g=t.get(f),m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return i===null&&(i=new Us(n)),g=x?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let S=f.image;return x&&S&&S.height>0||h&&S&&c(S)?(i===null&&(i=new Us(n)),g=x?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",d),g.texture):null}}}return f}function o(f,p){return p===so?f.mapping=En:p===ro&&(f.mapping=Vn),f}function c(f){let p=0,x=6;for(let h=0;h<x;h++)f[h]!==void 0&&p++;return p===x}function l(f){let p=f.target;p.removeEventListener("dispose",l);let x=e.get(p);x!==void 0&&(e.delete(p),x.dispose())}function d(f){let p=f.target;p.removeEventListener("dispose",d);let x=t.get(p);x!==void 0&&(t.delete(p),x.dispose())}function u(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function xg(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Fn("WebGLRenderer: "+i+" extension not supported."),s}}}function yg(n,e,t,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete s[f.id];let p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let p in f)e.update(f[p],n.ARRAY_BUFFER)}function l(u){let f=[],p=u.index,x=u.attributes.position,h=0;if(x===void 0)return;if(p!==null){let S=p.array;h=p.version;for(let C=0,b=S.length;C<b;C+=3){let w=S[C+0],M=S[C+1],A=S[C+2];f.push(w,M,M,A,A,w)}}else{let S=x.array;h=x.version;for(let C=0,b=S.length/3-1;C<b;C+=3){let w=C+0,M=C+1,A=C+2;f.push(w,M,M,A,A,w)}}let g=new(x.count>=65535?lr:or)(f,1);g.version=h;let m=r.get(u);m&&e.remove(m),r.set(u,g)}function d(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:d}}function _g(n,e,t){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){n.drawElements(i,f,r,u*a),t.update(f,i,1)}function l(u,f,p){p!==0&&(n.drawElementsInstanced(i,f,r,u*a,p),t.update(f,i,p))}function d(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,p);let h=0;for(let g=0;g<p;g++)h+=f[g];t.update(h,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function vg(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Ne("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function bg(n,e,t){let i=new WeakMap,s=new _t;function r(a,o,c){let l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0,f=i.get(o);if(f===void 0||f.count!==u){let E=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();let p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,h=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],C=0;p===!0&&(C=1),x===!0&&(C=2),h===!0&&(C=3);let b=o.attributes.position.count*C,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let M=new Float32Array(b*w*4*u),A=new rr(M,b,w,u);A.type=ri,A.needsUpdate=!0;let _=C*4;for(let R=0;R<u;R++){let I=g[R],U=m[R],B=S[R],P=b*w*4*R;for(let k=0;k<I.count;k++){let J=k*_;p===!0&&(s.fromBufferAttribute(I,k),M[P+J+0]=s.x,M[P+J+1]=s.y,M[P+J+2]=s.z,M[P+J+3]=0),x===!0&&(s.fromBufferAttribute(U,k),M[P+J+4]=s.x,M[P+J+5]=s.y,M[P+J+6]=s.z,M[P+J+7]=0),h===!0&&(s.fromBufferAttribute(B,k),M[P+J+8]=s.x,M[P+J+9]=s.y,M[P+J+10]=s.z,M[P+J+11]=B.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Be(b,w)},i.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let h=0;h<l.length;h++)p+=l[h];let x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Mg(n,e,t,i,s){let r=new WeakMap;function a(l){let d=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==d&&(e.update(f),r.set(f,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return f}function o(){r=new WeakMap}function c(l){let d=l.target;d.removeEventListener("dispose",c),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var Sg={[Sr]:"LINEAR_TONE_MAPPING",[wr]:"REINHARD_TONE_MAPPING",[Er]:"CINEON_TONE_MAPPING",[zn]:"ACES_FILMIC_TONE_MAPPING",[Ar]:"AGX_TONE_MAPPING",[Rr]:"NEUTRAL_TONE_MAPPING",[Tr]:"CUSTOM_TONE_MAPPING"};function wg(n,e,t,i,s,r){let a=new At(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Ht;l.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new gt([0,2,0,0,2,0],2));let d=new Ss({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new je(l,d),f=new Gi(-1,1,1,-1,0,1),p=null,x=null,h=!1,g,m=null,S=[],C=!1;this.setSize=function(b,w){a.setSize(b,w),o!==null&&o.setSize(b,w),c!==null&&c.setSize(b,w);for(let M=0;M<S.length;M++){let A=S[M];A.setSize&&A.setSize(b,w)}},this.setEffects=function(b){S=b,C=S.length>0&&S[0].isRenderPass===!0;let w=a.width,M=a.height;S.length>0&&o===null&&(o=new At(w,M,{type:Bt,depthBuffer:!1,stencilBuffer:!1}),c=new At(w,M,{type:Bt,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<S.length;A++){let _=S[A];_.setSize&&_.setSize(w,M)}},this.begin=function(b,w){if(h||b.toneMapping===Ii&&S.length===0)return!1;if(m=w,w!==null){let M=w.width,A=w.height;(a.width!==M||a.height!==A)&&this.setSize(M,A)}return C===!1&&b.setRenderTarget(a),g=b.toneMapping,b.toneMapping=Ii,!0},this.hasRenderPass=function(){return C},this.end=function(b,w){b.toneMapping=g,h=!0;let M=a,A=o;for(let _=0;_<S.length;_++){let E=S[_];E.enabled!==!1&&(E.render(b,A,M,w),E.needsSwap!==!1&&(M=A,A=A===o?c:o))}if(p!==b.outputColorSpace||x!==b.toneMapping){p=b.outputColorSpace,x=b.toneMapping,d.defines={},Ze.getTransfer(p)===nt&&(d.defines.SRGB_TRANSFER="");let _=Sg[x];_&&(d.defines[_]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=M.texture,b.setRenderTarget(m),b.render(u,f),m=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),d.dispose()}}var Bu=new ti,_c=new Hi(1,1),ku=new rr,zu=new Ba,Vu=new hr,_u=[],vu=[],bu=new Float32Array(16),Mu=new Float32Array(9),Su=new Float32Array(4);function Fs(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=_u[s];if(r===void 0&&(r=new Float32Array(s),_u[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $o(n,e){let t=vu[e];t===void 0&&(t=new Int32Array(e),vu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Eg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Tg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function Ag(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function Rg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Cg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;Su.set(i),n.uniformMatrix2fv(this.addr,!1,Su),Ut(t,i)}}function Ig(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;Mu.set(i),n.uniformMatrix3fv(this.addr,!1,Mu),Ut(t,i)}}function Pg(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Nt(t,i))return;bu.set(i),n.uniformMatrix4fv(this.addr,!1,bu),Ut(t,i)}}function Lg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Dg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function Ng(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function Ug(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function Fg(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Og(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function Bg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function kg(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function zg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(_c.compareFunction=t.isReversedDepthBuffer()?Xo:Wo,r=_c):r=Bu,t.setTexture2D(e||r,s)}function Vg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||zu,s)}function Hg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Vu,s)}function Gg(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ku,s)}function Wg(n){switch(n){case 5126:return Eg;case 35664:return Tg;case 35665:return Ag;case 35666:return Rg;case 35674:return Cg;case 35675:return Ig;case 35676:return Pg;case 5124:case 35670:return Lg;case 35667:case 35671:return Dg;case 35668:case 35672:return Ng;case 35669:case 35673:return Ug;case 5125:return Fg;case 36294:return Og;case 36295:return Bg;case 36296:return kg;case 35678:case 36198:case 36298:case 36306:case 35682:return zg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Hg;case 36289:case 36303:case 36311:case 36292:return Gg}}function Xg(n,e){n.uniform1fv(this.addr,e)}function qg(n,e){let t=Fs(e,this.size,2);n.uniform2fv(this.addr,t)}function Yg(n,e){let t=Fs(e,this.size,3);n.uniform3fv(this.addr,t)}function Zg(n,e){let t=Fs(e,this.size,4);n.uniform4fv(this.addr,t)}function Jg(n,e){let t=Fs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Kg(n,e){let t=Fs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function $g(n,e){let t=Fs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function jg(n,e){n.uniform1iv(this.addr,e)}function Qg(n,e){n.uniform2iv(this.addr,e)}function e0(n,e){n.uniform3iv(this.addr,e)}function t0(n,e){n.uniform4iv(this.addr,e)}function i0(n,e){n.uniform1uiv(this.addr,e)}function n0(n,e){n.uniform2uiv(this.addr,e)}function s0(n,e){n.uniform3uiv(this.addr,e)}function r0(n,e){n.uniform4uiv(this.addr,e)}function a0(n,e,t){let i=this.cache,s=e.length,r=$o(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=_c:a=Bu;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function o0(n,e,t){let i=this.cache,s=e.length,r=$o(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||zu,r[a])}function l0(n,e,t){let i=this.cache,s=e.length,r=$o(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Vu,r[a])}function c0(n,e,t){let i=this.cache,s=e.length,r=$o(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||ku,r[a])}function h0(n){switch(n){case 5126:return Xg;case 35664:return qg;case 35665:return Yg;case 35666:return Zg;case 35674:return Jg;case 35675:return Kg;case 35676:return $g;case 5124:case 35670:return jg;case 35667:case 35671:return Qg;case 35668:case 35672:return e0;case 35669:case 35673:return t0;case 5125:return i0;case 36294:return n0;case 36295:return s0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return o0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return c0}}var vc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Wg(t.type)}},bc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=h0(t.type)}},Mc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},xc=/(\w+)(\])?(\[|\.)?/g;function wu(n,e){n.seq.push(e),n.map[e.id]=e}function u0(n,e,t){let i=n.name,s=i.length;for(xc.lastIndex=0;;){let r=xc.exec(i),a=xc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){wu(t,l===void 0?new vc(o,n,e):new bc(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Mc(o),wu(t,u)),t=u}}}var Ns=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);u0(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Eu(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var d0=37297,f0=0;function p0(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Tu=new ke;function m0(n){Ze._getMatrix(Tu,Ze.workingColorSpace,n);let e=`mat3( ${Tu.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(n)){case nr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Au(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+p0(n.getShaderSource(e),o)}else return r}function g0(n,e){let t=m0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var x0={[Sr]:"Linear",[wr]:"Reinhard",[Er]:"Cineon",[zn]:"ACESFilmic",[Ar]:"AgX",[Rr]:"Neutral",[Tr]:"Custom"};function y0(n,e){let t=x0[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Yo=new F;function _0(){Ze.getLuminanceCoefficients(Yo);let n=Yo.x.toFixed(4),e=Yo.y.toFixed(4),t=Yo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function v0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kr).join(`
`)}function b0(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function M0(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function kr(n){return n!==""}function Ru(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var S0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(n){return n.replace(S0,E0)}var w0=new Map;function E0(n,e){let t=We[e];if(t===void 0){let i=w0.get(e);if(i!==void 0)t=We[i],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sc(t)}var T0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Iu(n){return n.replace(T0,A0)}function A0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Pu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var R0={[kn]:"SHADOWMAP_TYPE_PCF",[Ts]:"SHADOWMAP_TYPE_VSM"};function C0(n){return R0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var I0={[En]:"ENVMAP_TYPE_CUBE",[Vn]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function P0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":I0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var L0={[Vn]:"ENVMAP_MODE_REFRACTION"};function D0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":L0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var N0={[no]:"ENVMAP_BLENDING_MULTIPLY",[Jh]:"ENVMAP_BLENDING_MIX",[Kh]:"ENVMAP_BLENDING_ADD"};function U0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":N0[n.combine]||"ENVMAP_BLENDING_NONE"}function F0(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function O0(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=C0(t),l=P0(t),d=D0(t),u=U0(t),f=F0(t),p=v0(t),x=b0(r),h=s.createProgram(),g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(kr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(kr).join(`
`),m.length>0&&(m+=`
`)):(g=[Pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kr).join(`
`),m=[Pu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ii?"#define TONE_MAPPING":"",t.toneMapping!==Ii?We.tonemapping_pars_fragment:"",t.toneMapping!==Ii?y0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,g0("linearToOutputTexel",t.outputColorSpace),_0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(kr).join(`
`)),a=Sc(a),a=Ru(a,t),a=Cu(a,t),o=Sc(o),o=Ru(o,t),o=Cu(o,t),a=Iu(a),o=Iu(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let C=S+g+a,b=S+m+o,w=Eu(s,s.VERTEX_SHADER,C),M=Eu(s,s.FRAGMENT_SHADER,b);s.attachShader(h,w),s.attachShader(h,M),t.index0AttributeName!==void 0?s.bindAttribLocation(h,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(h,0,"position"),s.linkProgram(h);function A(I){if(n.debug.checkShaderErrors){let U=s.getProgramInfoLog(h)||"",B=s.getShaderInfoLog(w)||"",P=s.getShaderInfoLog(M)||"",k=U.trim(),J=B.trim(),K=P.trim(),ie=!0,X=!0;if(s.getProgramParameter(h,s.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,h,w,M);else{let W=Au(s,w,"vertex"),j=Au(s,M,"fragment");Ne("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(h,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+W+`
`+j)}else k!==""?De("WebGLProgram: Program Info Log:",k):(J===""||K==="")&&(X=!1);X&&(I.diagnostics={runnable:ie,programLog:k,vertexShader:{log:J,prefix:g},fragmentShader:{log:K,prefix:m}})}s.deleteShader(w),s.deleteShader(M),_=new Ns(s,h),E=M0(s,h)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(h,d0)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(h),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=f0++,this.cacheKey=e,this.usedTimes=1,this.program=h,this.vertexShader=w,this.fragmentShader=M,this}var B0=0,wc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Ec(e),t.set(e,i)),i}},Ec=class{constructor(e){this.id=B0++,this.code=e,this.usedTimes=0}};function k0(n){return n===Rn||n===Ur||n===Fr}function z0(n,e,t,i,s,r){let a=new _s,o=new wc,c=new Set,l=[],d=new Map,u=i.logarithmicDepthBuffer,f=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return c.add(_),_===0?"uv":`uv${_}`}function h(_,E,R,I,U,B){let P=I.fog,k=U.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ie=e.get(_.envMap||J,K),X=ie&&ie.mapping===Cr?ie.image.height:null,W=p[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&De("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));let j=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,le=j!==void 0?j.length:0,me=0;k.morphAttributes.position!==void 0&&(me=1),k.morphAttributes.normal!==void 0&&(me=2),k.morphAttributes.color!==void 0&&(me=3);let qe,Le,ze,Y;if(W){let ut=Yi[W];qe=ut.vertexShader,Le=ut.fragmentShader}else{qe=_.vertexShader,Le=_.fragmentShader;let ut=o.getVertexShaderStage(_),rt=o.getFragmentShaderStage(_);o.update(_,ut,rt),ze=ut.id,Y=rt.id}let Q=n.getRenderTarget(),de=n.state.buffers.depth.getReversed(),Ce=U.isInstancedMesh===!0,ye=U.isBatchedMesh===!0,Pe=!!_.map,ft=!!_.matcap,Ve=!!ie,Ye=!!_.aoMap,Qe=!!_.lightMap,He=!!_.bumpMap&&_.wireframe===!1,st=!!_.normalMap,bt=!!_.displacementMap,Ft=!!_.emissiveMap,ct=!!_.metalnessMap,yt=!!_.roughnessMap,D=_.anisotropy>0,Ct=_.clearcoat>0,et=_.dispersion>0,T=_.retroreflectivity>0,y=_.iridescence>0,O=_.sheen>0,H=_.transmission>0,Z=D&&!!_.anisotropyMap,se=Ct&&!!_.clearcoatMap,oe=Ct&&!!_.clearcoatNormalMap,$=Ct&&!!_.clearcoatRoughnessMap,te=y&&!!_.iridescenceMap,ce=y&&!!_.iridescenceThicknessMap,Te=O&&!!_.sheenColorMap,ae=O&&!!_.sheenRoughnessMap,re=!!_.specularMap,Me=!!_.specularColorMap,Re=!!_.specularIntensityMap,Ue=H&&!!_.transmissionMap,N=H&&!!_.thicknessMap,he=!!_.gradientMap,ee=!!_.alphaMap,ue=_.alphaTest>0,_e=!!_.alphaHash,ne=!!_.extensions,Ie=Ii;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ie=n.toneMapping);let Ee={shaderID:W,shaderType:_.type,shaderName:_.name,vertexShader:qe,fragmentShader:Le,defines:_.defines,customVertexShaderID:ze,customFragmentShaderID:Y,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:ye,batchingColor:ye&&U._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&U.instanceColor!==null,instancingMorph:Ce&&U.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Pe,matcap:ft,envMap:Ve,envMapMode:Ve&&ie.mapping,envMapCubeUVHeight:X,aoMap:Ye,lightMap:Qe,bumpMap:He,normalMap:st,displacementMap:bt,emissiveMap:Ft,normalMapObjectSpace:st&&_.normalMapType===Qh,normalMapTangentSpace:st&&_.normalMapType===Is,packedNormalMap:st&&_.normalMapType===Is&&k0(_.normalMap.format),metalnessMap:ct,roughnessMap:yt,anisotropy:D,anisotropyMap:Z,clearcoat:Ct,clearcoatMap:se,clearcoatNormalMap:oe,clearcoatRoughnessMap:$,dispersion:et,retroreflection:T,iridescence:y,iridescenceMap:te,iridescenceThicknessMap:ce,sheen:O,sheenColorMap:Te,sheenRoughnessMap:ae,specularMap:re,specularColorMap:Me,specularIntensityMap:Re,transmission:H,transmissionMap:Ue,thicknessMap:N,gradientMap:he,opaque:_.transparent===!1&&_.blending===As&&_.alphaToCoverage===!1,alphaMap:ee,alphaTest:ue,alphaHash:_e,combine:_.combine,mapUv:Pe&&x(_.map.channel),aoMapUv:Ye&&x(_.aoMap.channel),lightMapUv:Qe&&x(_.lightMap.channel),bumpMapUv:He&&x(_.bumpMap.channel),normalMapUv:st&&x(_.normalMap.channel),displacementMapUv:bt&&x(_.displacementMap.channel),emissiveMapUv:Ft&&x(_.emissiveMap.channel),metalnessMapUv:ct&&x(_.metalnessMap.channel),roughnessMapUv:yt&&x(_.roughnessMap.channel),anisotropyMapUv:Z&&x(_.anisotropyMap.channel),clearcoatMapUv:se&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:oe&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:ae&&x(_.sheenRoughnessMap.channel),specularMapUv:re&&x(_.specularMap.channel),specularColorMapUv:Me&&x(_.specularColorMap.channel),specularIntensityMapUv:Re&&x(_.specularIntensityMap.channel),transmissionMapUv:Ue&&x(_.transmissionMap.channel),thicknessMapUv:N&&x(_.thicknessMap.channel),alphaMapUv:ee&&x(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(st||D),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(Pe||ee),fog:!!P,useFog:_.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&st===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:me,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Pe&&_.map.isVideoTexture===!0&&Ze.getTransfer(_.map.colorSpace)===nt,decodeVideoTextureEmissive:Ft&&_.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(_.emissiveMap.colorSpace)===nt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ni,flipSided:_.side===Gt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ne&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ne&&_.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function g(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)E.push(R),E.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(m(E,_),S(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function S(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){let E=p[_.type],R;if(E){let I=Yi[E];R=Li.clone(I.uniforms)}else R=_.uniforms;return R}function b(_,E){let R=d.get(E);return R!==void 0?++R.usedTimes:(R=new O0(n,E,_,s),l.push(R),d.set(E,R)),R}function w(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),d.delete(_.cacheKey),_.destroy()}}function M(_){o.remove(_)}function A(){o.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:C,acquireProgram:b,releaseProgram:w,releaseShaderCache:M,programs:l,dispose:A}}function V0(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function H0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Lu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Du(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,x,h,g,m){let S=n[e];return S===void 0?(S={id:f.id,object:f,geometry:p,material:x,materialVariant:a(f),groupOrder:h,renderOrder:f.renderOrder,z:g,group:m},n[e]=S):(S.id=f.id,S.object=f,S.geometry=p,S.material=x,S.materialVariant=a(f),S.groupOrder=h,S.renderOrder=f.renderOrder,S.z=g,S.group=m),e++,S}function c(f,p,x,h,g,m,S){S.reversedDepth===!0&&(g=-g);let C=o(f,p,x,h,g,m);x.transmission>0?i.push(C):x.transparent===!0?s.push(C):t.push(C)}function l(f,p,x,h,g,m){let S=o(f,p,x,h,g,m);x.transmission>0?i.unshift(S):x.transparent===!0?s.unshift(S):t.unshift(S)}function d(f,p){t.length>1&&t.sort(f||H0),i.length>1&&i.sort(p||Lu),s.length>1&&s.sort(p||Lu)}function u(){for(let f=e,p=n.length;f<p;f++){let x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:u,sort:d}}function G0(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new Du,n.set(i,[a])):s>=r.length?(a=new Du,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function W0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new Oe};break;case"SpotLight":t={position:new F,direction:new F,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function X0(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var q0=0;function Y0(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Z0(n){let e=new W0,t=X0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);let s=new F,r=new it,a=new it;function o(l){let d=0,u=0,f=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let p=0,x=0,h=0,g=0,m=0,S=0,C=0,b=0,w=0,M=0,A=0,_=0,E=0,R=0;l.sort(Y0);for(let U=0,B=l.length;U<B;U++){let P=l[U],k=P.color,J=P.intensity,K=P.distance,ie=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Rn?ie=P.shadow.map.texture:ie=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=k.r*J,u+=k.g*J,f+=k.b*J;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],J);R++}else if(P.isSunLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let W=P.shadow,j=t.get(P);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize.copy(W.mapSize).multiply(W.getFrameExtents()),i.sunShadow[x]=j,i.sunShadowMap[x]=ie;let le=W.getViewportCount();for(let me=0;me<le;me++)i.sunShadowMatrix[h+me]=W.getMatrix(me),i.sunShadowCascade[h+me]=W._cascadeData[me];h+=le,x++}i.sun[p]=X,p++}else if(P.isDirectionalLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let W=P.shadow,j=t.get(P);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=ie,i.directionalShadowMatrix[g]=P.shadow.matrix,w++}i.directional[g]=X,g++}else if(P.isSpotLight){let X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(k).multiplyScalar(J),X.distance=K,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[S]=X;let W=P.shadow;if(P.map&&(i.spotLightMap[_]=P.map,_++,W.updateMatrices(P),P.castShadow&&E++),i.spotLightMatrix[S]=W.matrix,P.castShadow){let j=t.get(P);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,i.spotShadow[S]=j,i.spotShadowMap[S]=ie,A++}S++}else if(P.isRectAreaLight){let X=e.get(P);X.color.copy(k).multiplyScalar(J),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[C]=X,C++}else if(P.isPointLight){let X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){let W=P.shadow,j=t.get(P);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,j.shadowCameraNear=W.camera.near,j.shadowCameraFar=W.camera.far,i.pointShadow[m]=j,i.pointShadowMap[m]=ie,i.pointShadowMatrix[m]=P.shadow.matrix,M++}i.point[m]=X,m++}else if(P.isHemisphereLight){let X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(J),X.groundColor.copy(P.groundColor).multiplyScalar(J),i.hemi[b]=X,b++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;let I=i.hash;(I.sunLength!==p||I.directionalLength!==g||I.pointLength!==m||I.spotLength!==S||I.rectAreaLength!==C||I.hemiLength!==b||I.numSunShadows!==x||I.numDirectionalShadows!==w||I.numPointShadows!==M||I.numSpotShadows!==A||I.numSpotMaps!==_||I.numLightProbes!==R)&&(i.sun.length=p,i.directional.length=g,i.spot.length=S,i.rectArea.length=C,i.point.length=m,i.hemi.length=b,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=h,i.sunShadowCascade.length=h,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-E,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,I.sunLength=p,I.directionalLength=g,I.pointLength=m,I.spotLength=S,I.rectAreaLength=C,I.hemiLength=b,I.numSunShadows=x,I.numDirectionalShadows=w,I.numPointShadows=M,I.numSpotShadows=A,I.numSpotMaps=_,I.numLightProbes=R,i.version=q0++)}function c(l,d){let u=0,f=0,p=0,x=0,h=0,g=0,m=d.matrixWorldInverse;for(let S=0,C=l.length;S<C;S++){let b=l[S];if(b.isSunLight){let w=i.sun[u];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),u++}else if(b.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(b.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),x++}else if(b.isRectAreaLight){let w=i.rectArea[h];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),h++}else if(b.isPointLight){let w=i.point[p];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){let w=i.hemi[g];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:i}}function Nu(n){let e=new Z0(n),t=[],i=[],s=[];function r(f){u.camera=f,t.length=0,i.length=0,s.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function d(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function J0(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Nu(n),e.set(s,[o])):r>=a.length?(o=new Nu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var K0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,j0=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Q0=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Uu=new it,Br=new F,yc=new F;function ex(n,e,t){let i=new Ms,s=new Be,r=new Be,a=new _t,o=new za,c=new Va,l={},d=t.maxTextureSize,u={[wn]:Gt,[Gt]:wn,[ni]:ni},f=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:K0,fragmentShader:$0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let x=new Ht;x.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new je(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kn;let m=this.type;this.render=function(M,A,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Nh&&(De("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=kn);let E=n.getRenderTarget(),R=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Dt),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=m!==this.type;B&&A.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(k=>k.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,k=M.length;P<k;P++){let J=M[P],K=J.shadow;if(K===void 0){De("WebGLShadowMap:",J,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);let ie=K.getFrameExtents();s.multiply(ie),r.copy(K.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ie.x),s.x=r.x*ie.x,K.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ie.y),s.y=r.y*ie.y,K.mapSize.y=r.y));let X=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=X,K.map===null||B===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Ts){if(J.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new At(s.x,s.y,{format:Rn,type:Bt,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),K.map.texture.name=J.name+".shadowMap",K.map.depthTexture=new Hi(s.x,s.y,ri),K.map.depthTexture.name=J.name+".shadowMapDepth",K.map.depthTexture.format=Bi,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Tt,K.map.depthTexture.magFilter=Tt}else J.isPointLight?(K.map=new Zo(s.x),K.map.depthTexture=new ka(s.x,Pi)):(K.map=new At(s.x,s.y),K.map.depthTexture=new Hi(s.x,s.y,Pi)),K.map.depthTexture.name=J.name+".shadowMap",K.map.depthTexture.format=Bi,this.type===kn?(K.map.depthTexture.compareFunction=X?Xo:Wo,K.map.depthTexture.minFilter=Vt,K.map.depthTexture.magFilter=Vt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Tt,K.map.depthTexture.magFilter=Tt);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==s.x||K.map.height!==s.y)&&K.map.setSize(s.x,s.y);let W=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();J.isPointLight!==!0&&K.updateMatrices(J,_);for(let j=0;j<W;j++){let le=K.getCamera(j);if(J.isPointLight){let me=K.camera,qe=K.matrix,Le=J.distance||me.far;Le!==me.far&&(me.far=Le,me.updateProjectionMatrix()),Br.setFromMatrixPosition(J.matrixWorld),me.position.copy(Br),yc.copy(me.position),yc.add(j0[j]),me.up.copy(Q0[j]),me.lookAt(yc),me.updateMatrixWorld(),qe.makeTranslation(-Br.x,-Br.y,-Br.z),Uu.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),K._frustum.setFromProjectionMatrix(Uu,me.coordinateSystem,me.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,j),n.clear();else{j===0&&(n.setRenderTarget(K.map),n.clear());let me=K.getViewport(j);a.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),U.viewport(a)}i=K.getFrustum(j),b(A,_,le,J,this.type)}K.isPointLightShadow!==!0&&this.type===Ts&&S(K,_),K.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(E,R,I)};function S(M,A){let _=e.update(h);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null?M.mapPass=new At(s.x,s.y,{format:Rn,type:Bt}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),f.uniforms.shadow_pass.value=M.map.depthTexture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(A,null,_,f,h,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value.set(M.map.width,M.map.height),p.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(A,null,_,p,h,null)}function C(M,A,_,E){let R=null,I=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(I!==void 0)R=I;else if(R=_.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let U=R.uuid,B=A.uuid,P=l[U];P===void 0&&(P={},l[U]=P);let k=P[B];k===void 0&&(k=R.clone(),P[B]=k,A.addEventListener("dispose",w)),R=k}if(R.visible=A.visible,R.wireframe=A.wireframe,E===Ts?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:u[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let U=n.properties.get(R);U.light=_}return R}function b(M,A,_,E,R){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===Ts)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let B=e.update(M),P=M.material;if(Array.isArray(P)){let k=B.groups;for(let J=0,K=k.length;J<K;J++){let ie=k[J],X=P[ie.materialIndex];if(X&&X.visible){let W=C(M,X,E,R);M.onBeforeShadow(n,M,A,_,B,W,ie),n.renderBufferDirect(_,null,B,W,M,ie),M.onAfterShadow(n,M,A,_,B,W,ie)}}}else if(P.visible){let k=C(M,P,E,R);M.onBeforeShadow(n,M,A,_,B,k,null),n.renderBufferDirect(_,null,B,k,M,null),M.onAfterShadow(n,M,A,_,B,k,null)}}let U=M.children;for(let B=0,P=U.length;B<P;B++)b(U[B],A,_,E,R)}function w(M){M.target.removeEventListener("dispose",w);for(let _ in l){let E=l[_],R=M.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function tx(n,e){function t(){let N=!1,he=new _t,ee=null,ue=new _t(0,0,0,0);return{setMask:function(_e){ee!==_e&&!N&&(n.colorMask(_e,_e,_e,_e),ee=_e)},setLocked:function(_e){N=_e},setClear:function(_e,ne,Ie,Ee,ut){ut===!0&&(_e*=Ee,ne*=Ee,Ie*=Ee),he.set(_e,ne,Ie,Ee),ue.equals(he)===!1&&(n.clearColor(_e,ne,Ie,Ee),ue.copy(he))},reset:function(){N=!1,ee=null,ue.set(-1,0,0,0)}}}function i(){let N=!1,he=!1,ee=null,ue=null,_e=null;return{setReversed:function(ne){if(he!==ne){let Ie=e.get("EXT_clip_control");ne?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),he=ne;let Ee=_e;_e=null,this.setClear(Ee)}},getReversed:function(){return he},setTest:function(ne){ne?Q(n.DEPTH_TEST):de(n.DEPTH_TEST)},setMask:function(ne){ee!==ne&&!N&&(n.depthMask(ne),ee=ne)},setFunc:function(ne){if(he&&(ne=uu[ne]),ue!==ne){switch(ne){case Aa:n.depthFunc(n.NEVER);break;case Ra:n.depthFunc(n.ALWAYS);break;case Ca:n.depthFunc(n.LESS);break;case ps:n.depthFunc(n.LEQUAL);break;case Ia:n.depthFunc(n.EQUAL);break;case Pa:n.depthFunc(n.GEQUAL);break;case La:n.depthFunc(n.GREATER);break;case Da:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=ne}},setLocked:function(ne){N=ne},setClear:function(ne){_e!==ne&&(_e=ne,he&&(ne=1-ne),n.clearDepth(ne))},reset:function(){N=!1,ee=null,ue=null,_e=null,he=!1}}}function s(){let N=!1,he=null,ee=null,ue=null,_e=null,ne=null,Ie=null,Ee=null,ut=null;return{setTest:function(rt){N||(rt?Q(n.STENCIL_TEST):de(n.STENCIL_TEST))},setMask:function(rt){he!==rt&&!N&&(n.stencilMask(rt),he=rt)},setFunc:function(rt,Ei,Ni){(ee!==rt||ue!==Ei||_e!==Ni)&&(n.stencilFunc(rt,Ei,Ni),ee=rt,ue=Ei,_e=Ni)},setOp:function(rt,Ei,Ni){(ne!==rt||Ie!==Ei||Ee!==Ni)&&(n.stencilOp(rt,Ei,Ni),ne=rt,Ie=Ei,Ee=Ni)},setLocked:function(rt){N=rt},setClear:function(rt){ut!==rt&&(n.clearStencil(rt),ut=rt)},reset:function(){N=!1,he=null,ee=null,ue=null,_e=null,ne=null,Ie=null,Ee=null,ut=null}}}let r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap,d={},u={},f={},p=new WeakMap,x=[],h=null,g=!1,m=null,S=null,C=null,b=null,w=null,M=null,A=null,_=new Oe(0,0,0),E=0,R=!1,I=null,U=null,B=null,P=null,k=null,J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,ie=0,X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(X)[1]),K=ie>=1):X.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),K=ie>=2);let W=null,j={},le=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),qe=new _t().fromArray(le),Le=new _t().fromArray(me);function ze(N,he,ee,ue){let _e=new Uint8Array(4),ne=n.createTexture();n.bindTexture(N,ne),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<ee;Ie++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(he,0,n.RGBA,1,1,ue,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(he+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return ne}let Y={};Y[n.TEXTURE_2D]=ze(n.TEXTURE_2D,n.TEXTURE_2D,1),Y[n.TEXTURE_CUBE_MAP]=ze(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[n.TEXTURE_2D_ARRAY]=ze(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Y[n.TEXTURE_3D]=ze(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(n.DEPTH_TEST),a.setFunc(ps),He(!1),st(Xl),Q(n.CULL_FACE),Ye(Dt);function Q(N){d[N]!==!0&&(n.enable(N),d[N]=!0)}function de(N){d[N]!==!1&&(n.disable(N),d[N]=!1)}function Ce(N,he){return f[N]!==he?(n.bindFramebuffer(N,he),f[N]=he,N===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=he),N===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=he),!0):!1}function ye(N,he){let ee=x,ue=!1;if(N){ee=p.get(he),ee===void 0&&(ee=[],p.set(he,ee));let _e=N.textures;if(ee.length!==_e.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let ne=0,Ie=_e.length;ne<Ie;ne++)ee[ne]=n.COLOR_ATTACHMENT0+ne;ee.length=_e.length,ue=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,ue=!0);ue&&n.drawBuffers(ee)}function Pe(N){return h!==N?(n.useProgram(N),h=N,!0):!1}let ft={[Wi]:n.FUNC_ADD,[Uh]:n.FUNC_SUBTRACT,[Fh]:n.FUNC_REVERSE_SUBTRACT};ft[Oh]=n.MIN,ft[Bh]=n.MAX;let Ve={[Mr]:n.ZERO,[kh]:n.ONE,[zh]:n.SRC_COLOR,[Jl]:n.SRC_ALPHA,[Wh]:n.SRC_ALPHA_SATURATE,[io]:n.DST_COLOR,[to]:n.DST_ALPHA,[Vh]:n.ONE_MINUS_SRC_COLOR,[Kl]:n.ONE_MINUS_SRC_ALPHA,[Gh]:n.ONE_MINUS_DST_COLOR,[Hh]:n.ONE_MINUS_DST_ALPHA,[Xh]:n.CONSTANT_COLOR,[qh]:n.ONE_MINUS_CONSTANT_COLOR,[Yh]:n.CONSTANT_ALPHA,[Zh]:n.ONE_MINUS_CONSTANT_ALPHA};function Ye(N,he,ee,ue,_e,ne,Ie,Ee,ut,rt){if(N===Dt){g===!0&&(de(n.BLEND),g=!1);return}if(g===!1&&(Q(n.BLEND),g=!0),N!==eo){if(N!==m||rt!==R){if((S!==Wi||w!==Wi)&&(n.blendEquation(n.FUNC_ADD),S=Wi,w=Wi),rt)switch(N){case As:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ql:n.blendFunc(n.ONE,n.ONE);break;case Yl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ne("WebGLState: Invalid blending: ",N);break}else switch(N){case As:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ql:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Yl:Ne("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zl:Ne("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ne("WebGLState: Invalid blending: ",N);break}C=null,b=null,M=null,A=null,_.set(0,0,0),E=0,m=N,R=rt}return}_e=_e||he,ne=ne||ee,Ie=Ie||ue,(he!==S||_e!==w)&&(n.blendEquationSeparate(ft[he],ft[_e]),S=he,w=_e),(ee!==C||ue!==b||ne!==M||Ie!==A)&&(n.blendFuncSeparate(Ve[ee],Ve[ue],Ve[ne],Ve[Ie]),C=ee,b=ue,M=ne,A=Ie),(Ee.equals(_)===!1||ut!==E)&&(n.blendColor(Ee.r,Ee.g,Ee.b,ut),_.copy(Ee),E=ut),m=N,R=!1}function Qe(N,he){N.side===ni?de(n.CULL_FACE):Q(n.CULL_FACE);let ee=N.side===Gt;he&&(ee=!ee),He(ee),N.blending===As&&N.transparent===!1?Ye(Dt):Ye(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let ue=N.stencilWrite;o.setTest(ue),ue&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ft(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):de(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(N){I!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),I=N)}function st(N){N!==Lh?(Q(n.CULL_FACE),N!==U&&(N===Xl?n.cullFace(n.BACK):N===Dh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):de(n.CULL_FACE),U=N}function bt(N){N!==B&&(K&&n.lineWidth(N),B=N)}function Ft(N,he,ee){N?(Q(n.POLYGON_OFFSET_FILL),(P!==he||k!==ee)&&(P=he,k=ee,a.getReversed()&&(he=-he),n.polygonOffset(he,ee))):de(n.POLYGON_OFFSET_FILL)}function ct(N){N?Q(n.SCISSOR_TEST):de(n.SCISSOR_TEST)}function yt(N){N===void 0&&(N=n.TEXTURE0+J-1),W!==N&&(n.activeTexture(N),W=N)}function D(N,he,ee){ee===void 0&&(W===null?ee=n.TEXTURE0+J-1:ee=W);let ue=j[ee];ue===void 0&&(ue={type:void 0,texture:void 0},j[ee]=ue),(ue.type!==N||ue.texture!==he)&&(W!==ee&&(n.activeTexture(ee),W=ee),n.bindTexture(N,he||Y[N]),ue.type=N,ue.texture=he)}function Ct(){let N=j[W];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function et(){try{n.compressedTexImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function y(){try{n.texSubImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function O(){try{n.texSubImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function se(){try{n.texStorage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function oe(){try{n.texStorage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function $(){try{n.texImage2D(...arguments)}catch(N){Ne("WebGLState:",N)}}function te(){try{n.texImage3D(...arguments)}catch(N){Ne("WebGLState:",N)}}function ce(N){return u[N]!==void 0?u[N]:n.getParameter(N)}function Te(N,he){u[N]!==he&&(n.pixelStorei(N,he),u[N]=he)}function ae(N){qe.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),qe.copy(N))}function re(N){Le.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),Le.copy(N))}function Me(N,he){let ee=l.get(he);ee===void 0&&(ee=new WeakMap,l.set(he,ee));let ue=ee.get(N);ue===void 0&&(ue=n.getUniformBlockIndex(he,N.name),ee.set(N,ue))}function Re(N,he){let ue=l.get(he).get(N);c.get(he)!==ue&&(n.uniformBlockBinding(he,ue,N.__bindingPointIndex),c.set(he,ue))}function Ue(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},u={},W=null,j={},f={},p=new WeakMap,x=[],h=null,g=!1,m=null,S=null,C=null,b=null,w=null,M=null,A=null,_=new Oe(0,0,0),E=0,R=!1,I=null,U=null,B=null,P=null,k=null,qe.set(0,0,n.canvas.width,n.canvas.height),Le.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:de,bindFramebuffer:Ce,drawBuffers:ye,useProgram:Pe,setBlending:Ye,setMaterial:Qe,setFlipSided:He,setCullFace:st,setLineWidth:bt,setPolygonOffset:Ft,setScissorTest:ct,activeTexture:yt,bindTexture:D,unbindTexture:Ct,compressedTexImage2D:et,compressedTexImage3D:T,texImage2D:$,texImage3D:te,pixelStorei:Te,getParameter:ce,updateUBOMapping:Me,uniformBlockBinding:Re,texStorage2D:se,texStorage3D:oe,texSubImage2D:y,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:Z,scissor:ae,viewport:re,reset:Ue}}function ix(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Be,d=new WeakMap,u=new Set,f,p=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(T,y){return x?new OffscreenCanvas(T,y):sr("canvas")}function g(T,y,O){let H=1,Z=et(T);if((Z.width>O||Z.height>O)&&(H=O/Math.max(Z.width,Z.height)),H<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let se=Math.floor(H*Z.width),oe=Math.floor(H*Z.height);f===void 0&&(f=h(se,oe));let $=y?h(se,oe):f;return $.width=se,$.height=oe,$.getContext("2d").drawImage(T,0,0,se,oe),De("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+se+"x"+oe+")."),$}else return"data"in T&&De("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function S(T){n.generateMipmap(T)}function C(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,y,O,H,Z,se=!1){if(T!==null){if(n[T]!==void 0)return n[T];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let oe;H&&(oe=e.get("EXT_texture_norm16"),oe||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=y;if(y===n.RED&&(O===n.FLOAT&&($=n.R32F),O===n.HALF_FLOAT&&($=n.R16F),O===n.UNSIGNED_BYTE&&($=n.R8),O===n.UNSIGNED_SHORT&&oe&&($=oe.R16_EXT),O===n.SHORT&&oe&&($=oe.R16_SNORM_EXT)),y===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.R8UI),O===n.UNSIGNED_SHORT&&($=n.R16UI),O===n.UNSIGNED_INT&&($=n.R32UI),O===n.BYTE&&($=n.R8I),O===n.SHORT&&($=n.R16I),O===n.INT&&($=n.R32I)),y===n.RG&&(O===n.FLOAT&&($=n.RG32F),O===n.HALF_FLOAT&&($=n.RG16F),O===n.UNSIGNED_BYTE&&($=n.RG8),O===n.UNSIGNED_SHORT&&oe&&($=oe.RG16_EXT),O===n.SHORT&&oe&&($=oe.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RG8UI),O===n.UNSIGNED_SHORT&&($=n.RG16UI),O===n.UNSIGNED_INT&&($=n.RG32UI),O===n.BYTE&&($=n.RG8I),O===n.SHORT&&($=n.RG16I),O===n.INT&&($=n.RG32I)),y===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGB8UI),O===n.UNSIGNED_SHORT&&($=n.RGB16UI),O===n.UNSIGNED_INT&&($=n.RGB32UI),O===n.BYTE&&($=n.RGB8I),O===n.SHORT&&($=n.RGB16I),O===n.INT&&($=n.RGB32I)),y===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&($=n.RGBA8UI),O===n.UNSIGNED_SHORT&&($=n.RGBA16UI),O===n.UNSIGNED_INT&&($=n.RGBA32UI),O===n.BYTE&&($=n.RGBA8I),O===n.SHORT&&($=n.RGBA16I),O===n.INT&&($=n.RGBA32I)),y===n.RGB&&(O===n.UNSIGNED_SHORT&&oe&&($=oe.RGB16_EXT),O===n.SHORT&&oe&&($=oe.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&($=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&($=n.R11F_G11F_B10F)),y===n.RGBA){let te=se?nr:Ze.getTransfer(Z);O===n.FLOAT&&($=n.RGBA32F),O===n.HALF_FLOAT&&($=n.RGBA16F),O===n.UNSIGNED_BYTE&&($=te===nt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&oe&&($=oe.RGBA16_EXT),O===n.SHORT&&oe&&($=oe.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function w(T,y){let O;return T?y===null||y===Pi||y===An?O=n.DEPTH24_STENCIL8:y===ri?O=n.DEPTH32F_STENCIL8:y===Rs&&(O=n.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Pi||y===An?O=n.DEPTH_COMPONENT24:y===ri?O=n.DEPTH_COMPONENT32F:y===Rs&&(O=n.DEPTH_COMPONENT16),O}function M(T,y){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Tt&&T.minFilter!==Vt?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function A(T){let y=T.target;y.removeEventListener("dispose",A),E(y),y.isVideoTexture&&d.delete(y),y.isHTMLTexture&&u.delete(y)}function _(T){let y=T.target;y.removeEventListener("dispose",_),I(y)}function E(T){let y=i.get(T);if(y.__webglInit===void 0)return;let O=T.source,H=p.get(O);if(H){let Z=H[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(T),Object.keys(H).length===0&&p.delete(O)}i.remove(T)}function R(T){let y=i.get(T);n.deleteTexture(y.__webglTexture);let O=T.source,H=p.get(O);delete H[y.__cacheKey],a.memory.textures--}function I(T){let y=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(y.__webglFramebuffer[H]))for(let Z=0;Z<y.__webglFramebuffer[H].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[H][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[H]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[H])}else{if(Array.isArray(y.__webglFramebuffer))for(let H=0;H<y.__webglFramebuffer.length;H++)n.deleteFramebuffer(y.__webglFramebuffer[H]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let H=0;H<y.__webglColorRenderbuffer.length;H++)y.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[H]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let O=T.textures;for(let H=0,Z=O.length;H<Z;H++){let se=i.get(O[H]);se.__webglTexture&&(n.deleteTexture(se.__webglTexture),a.memory.textures--),i.remove(O[H])}i.remove(T)}let U=0;function B(){U=0}function P(){return U}function k(T){U=T}function J(){let T=U;return T>=s.maxTextures&&De("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,T}function K(T){let y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function ie(T,y){let O=i.get(T);if(T.isVideoTexture&&D(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){let H=T.image;if(H===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{de(O,T,y);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+y)}function X(T,y){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){de(O,T,y);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+y)}function W(T,y){let O=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){de(O,T,y);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+y)}function j(T,y){let O=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&O.__version!==T.version){Ce(O,T,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+y)}let le={[tn]:n.REPEAT,[Oi]:n.CLAMP_TO_EDGE,[Na]:n.MIRRORED_REPEAT},me={[Tt]:n.NEAREST,[$h]:n.NEAREST_MIPMAP_NEAREST,[Ir]:n.NEAREST_MIPMAP_LINEAR,[Vt]:n.LINEAR,[ao]:n.LINEAR_MIPMAP_NEAREST,[Tn]:n.LINEAR_MIPMAP_LINEAR},qe={[tu]:n.NEVER,[au]:n.ALWAYS,[iu]:n.LESS,[Wo]:n.LEQUAL,[nu]:n.EQUAL,[Xo]:n.GEQUAL,[su]:n.GREATER,[ru]:n.NOTEQUAL};function Le(T,y){if(y.type===ri&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Vt||y.magFilter===ao||y.magFilter===Ir||y.magFilter===Tn||y.minFilter===Vt||y.minFilter===ao||y.minFilter===Ir||y.minFilter===Tn)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,le[y.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,le[y.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,le[y.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,me[y.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,me[y.minFilter]),y.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,qe[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Tt||y.minFilter!==Ir&&y.minFilter!==Tn||y.type===ri&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ze(T,y){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",A));let H=y.source,Z=p.get(H);Z===void 0&&(Z={},p.set(H,Z));let se=K(y);if(se!==T.__cacheKey){Z[se]===void 0&&(Z[se]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[se].usedTimes++;let oe=Z[T.__cacheKey];oe!==void 0&&(Z[T.__cacheKey].usedTimes--,oe.usedTimes===0&&R(y)),T.__cacheKey=se,T.__webglTexture=Z[se].texture}return O}function Y(T,y,O){return Math.floor(Math.floor(T/O)/y)}function Q(T,y,O,H){let se=T.updateRanges;if(se.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,O,H,y.data);else{se.sort((Te,ae)=>Te.start-ae.start);let oe=0;for(let Te=1;Te<se.length;Te++){let ae=se[oe],re=se[Te],Me=ae.start+ae.count,Re=Y(re.start,y.width,4),Ue=Y(ae.start,y.width,4);re.start<=Me+1&&Re===Ue&&Y(re.start+re.count-1,y.width,4)===Re?ae.count=Math.max(ae.count,re.start+re.count-ae.start):(++oe,se[oe]=re)}se.length=oe+1;let $=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),ce=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Te=0,ae=se.length;Te<ae;Te++){let re=se[Te],Me=Math.floor(re.start/4),Re=Math.ceil(re.count/4),Ue=Me%y.width,N=Math.floor(Me/y.width),he=Re,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,N),t.texSubImage2D(n.TEXTURE_2D,0,Ue,N,he,ee,O,H,y.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,$),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,ce)}}function de(T,y,O){let H=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(H=n.TEXTURE_3D);let Z=ze(T,y),se=y.source;t.bindTexture(H,T.__webglTexture,n.TEXTURE0+O);let oe=i.get(se);if(se.version!==oe.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let ee=Ze.getPrimaries(Ze.workingColorSpace),ue=y.colorSpace===an?null:Ze.getPrimaries(y.colorSpace),_e=y.colorSpace===an||ee===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let te=g(y.image,!1,s.maxTextureSize);te=Ct(y,te);let ce=r.convert(y.format,y.colorSpace),Te=r.convert(y.type),ae=b(y.internalFormat,ce,Te,y.normalized,y.colorSpace,y.isVideoTexture);Le(H,y);let re,Me=y.mipmaps,Re=y.isVideoTexture!==!0,Ue=oe.__version===void 0||Z===!0,N=se.dataReady,he=M(y,te);if(y.isDepthTexture)ae=w(y.format===Xi,y.type),Ue&&(Re?t.texStorage2D(n.TEXTURE_2D,1,ae,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ae,te.width,te.height,0,ce,Te,null));else if(y.isDataTexture)if(Me.length>0){Re&&Ue&&t.texStorage2D(n.TEXTURE_2D,he,ae,Me[0].width,Me[0].height);for(let ee=0,ue=Me.length;ee<ue;ee++)re=Me[ee],Re?N&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,re.width,re.height,ce,Te,re.data):t.texImage2D(n.TEXTURE_2D,ee,ae,re.width,re.height,0,ce,Te,re.data);y.generateMipmaps=!1}else Re?(Ue&&t.texStorage2D(n.TEXTURE_2D,he,ae,te.width,te.height),N&&Q(y,te,ce,Te)):t.texImage2D(n.TEXTURE_2D,0,ae,te.width,te.height,0,ce,Te,te.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Re&&Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ae,Me[0].width,Me[0].height,te.depth);for(let ee=0,ue=Me.length;ee<ue;ee++)if(re=Me[ee],y.format!==ai)if(ce!==null)if(Re){if(N)if(y.layerUpdates.size>0){let _e=dc(re.width,re.height,y.format,y.type);for(let ne of y.layerUpdates){let Ie=re.data.subarray(ne*_e/re.data.BYTES_PER_ELEMENT,(ne+1)*_e/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ne,re.width,re.height,1,ce,Ie)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,re.width,re.height,te.depth,ce,re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,ae,re.width,re.height,te.depth,0,re.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?N&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,re.width,re.height,te.depth,ce,Te,re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,ae,re.width,re.height,te.depth,0,ce,Te,re.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Re&&Ue&&t.texStorage2D(n.TEXTURE_2D,he,ae,Me[0].width,Me[0].height);for(let ee=0,ue=Me.length;ee<ue;ee++)re=Me[ee],y.format!==ai?ce!==null?Re?N&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,re.width,re.height,ce,re.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,ae,re.width,re.height,0,re.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?N&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,re.width,re.height,ce,Te,re.data):t.texImage2D(n.TEXTURE_2D,ee,ae,re.width,re.height,0,ce,Te,re.data)}else if(y.isDataArrayTexture)if(Re){if(Ue&&t.texStorage3D(n.TEXTURE_2D_ARRAY,he,ae,te.width,te.height,te.depth),N)if(y.layerUpdates.size>0){let ee=dc(te.width,te.height,y.format,y.type);for(let ue of y.layerUpdates){let _e=te.data.subarray(ue*ee/te.data.BYTES_PER_ELEMENT,(ue+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ue,te.width,te.height,1,ce,Te,_e)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ce,Te,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ae,te.width,te.height,te.depth,0,ce,Te,te.data);else if(y.isData3DTexture)Re?(Ue&&t.texStorage3D(n.TEXTURE_3D,he,ae,te.width,te.height,te.depth),N&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ce,Te,te.data)):t.texImage3D(n.TEXTURE_3D,0,ae,te.width,te.height,te.depth,0,ce,Te,te.data);else if(y.isFramebufferTexture){if(Ue)if(Re)t.texStorage2D(n.TEXTURE_2D,he,ae,te.width,te.height);else{let ee=te.width,ue=te.height;for(let _e=0;_e<he;_e++)t.texImage2D(n.TEXTURE_2D,_e,ae,ee,ue,0,ce,Te,null),ee>>=1,ue>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){let ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),u.add(y),ee.onpaint=ue=>{let _e=ue.changedElements;for(let ne of u)_e.includes(ne.image)&&(ne.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{let _e=n.RGBA,ne=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,_e,ne,Ie,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Me.length>0){if(Re&&Ue){let ee=et(Me[0]);t.texStorage2D(n.TEXTURE_2D,he,ae,ee.width,ee.height)}for(let ee=0,ue=Me.length;ee<ue;ee++)re=Me[ee],Re?N&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce,Te,re):t.texImage2D(n.TEXTURE_2D,ee,ae,ce,Te,re);y.generateMipmaps=!1}else if(Re){if(Ue){let ee=et(te);t.texStorage2D(n.TEXTURE_2D,he,ae,ee.width,ee.height)}N&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ce,Te,te)}else t.texImage2D(n.TEXTURE_2D,0,ae,ce,Te,te);m(y)&&S(H),oe.__version=se.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function Ce(T,y,O){if(y.image.length!==6)return;let H=ze(T,y),Z=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+O);let se=i.get(Z);if(Z.version!==se.__version||H===!0){t.activeTexture(n.TEXTURE0+O);let oe=Ze.getPrimaries(Ze.workingColorSpace),$=y.colorSpace===an?null:Ze.getPrimaries(y.colorSpace),te=y.colorSpace===an||oe===$?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ce=y.isCompressedTexture||y.image[0].isCompressedTexture,Te=y.image[0]&&y.image[0].isDataTexture,ae=[];for(let ne=0;ne<6;ne++)!ce&&!Te?ae[ne]=g(y.image[ne],!0,s.maxCubemapSize):ae[ne]=Te?y.image[ne].image:y.image[ne],ae[ne]=Ct(y,ae[ne]);let re=ae[0],Me=r.convert(y.format,y.colorSpace),Re=r.convert(y.type),Ue=b(y.internalFormat,Me,Re,y.normalized,y.colorSpace),N=y.isVideoTexture!==!0,he=se.__version===void 0||H===!0,ee=Z.dataReady,ue=M(y,re);Le(n.TEXTURE_CUBE_MAP,y);let _e;if(ce){N&&he&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Ue,re.width,re.height);for(let ne=0;ne<6;ne++){_e=ae[ne].mipmaps;for(let Ie=0;Ie<_e.length;Ie++){let Ee=_e[Ie];y.format!==ai?Me!==null?N?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,Ee.width,Ee.height,Me,Ee.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,Ue,Ee.width,Ee.height,0,Ee.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,0,0,Ee.width,Ee.height,Me,Re,Ee.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie,Ue,Ee.width,Ee.height,0,Me,Re,Ee.data)}}}else{if(_e=y.mipmaps,N&&he){_e.length>0&&ue++;let ne=et(ae[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ue,Ue,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Te){N?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ae[ne].width,ae[ne].height,Me,Re,ae[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ue,ae[ne].width,ae[ne].height,0,Me,Re,ae[ne].data);for(let Ie=0;Ie<_e.length;Ie++){let ut=_e[Ie].image[ne].image;N?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,ut.width,ut.height,Me,Re,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,Ue,ut.width,ut.height,0,Me,Re,ut.data)}}else{N?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Me,Re,ae[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ue,Me,Re,ae[ne]);for(let Ie=0;Ie<_e.length;Ie++){let Ee=_e[Ie];N?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,0,0,Me,Re,Ee.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ie+1,Ue,Me,Re,Ee.image[ne])}}}m(y)&&S(n.TEXTURE_CUBE_MAP),se.__version=Z.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function ye(T,y,O,H,Z,se){let oe=r.convert(O.format,O.colorSpace),$=r.convert(O.type),te=b(O.internalFormat,oe,$,O.normalized,O.colorSpace),ce=i.get(y),Te=i.get(O);if(Te.__renderTarget=y,!ce.__hasExternalTextures){let ae=Math.max(1,y.width>>se),re=Math.max(1,y.height>>se);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,se,te,ae,re,y.depth,0,oe,$,null):t.texImage2D(Z,se,te,ae,re,0,oe,$,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Z,Te.__webglTexture,0,ct(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Z,Te.__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(T,y,O){if(n.bindRenderbuffer(n.RENDERBUFFER,T),y.depthBuffer){let H=y.depthTexture,Z=H&&H.isDepthTexture?H.type:null,se=w(y.stencilBuffer,Z),oe=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;yt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(y),se,y.width,y.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(y),se,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,se,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,T)}else{let H=y.textures;for(let Z=0;Z<H.length;Z++){let se=H[Z],oe=r.convert(se.format,se.colorSpace),$=r.convert(se.type),te=b(se.internalFormat,oe,$,se.normalized,se.colorSpace);yt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct(y),te,y.width,y.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct(y),te,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,te,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ft(T,y,O){let H=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=i.get(y.depthTexture);if(Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),H){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,y.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Le(n.TEXTURE_CUBE_MAP,y.depthTexture);let ce=r.convert(y.depthTexture.format),Te=r.convert(y.depthTexture.type),ae;y.depthTexture.format===Bi?ae=n.DEPTH_COMPONENT24:y.depthTexture.format===Xi&&(ae=n.DEPTH24_STENCIL8);for(let re=0;re<6;re++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,ae,y.width,y.height,0,ce,Te,null)}}else ie(y.depthTexture,0);let se=Z.__webglTexture,oe=ct(y),$=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,te=y.depthTexture.format===Xi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Bi)yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,$,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,te,$,se,0);else if(y.depthTexture.format===Xi)yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,$,se,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,te,$,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ve(T){let y=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==T.depthTexture){let H=T.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),H){let Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,H.removeEventListener("dispose",Z)};H.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=H}if(T.depthTexture&&!y.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)ft(y.__webglFramebuffer[H],T,H);else{let H=T.texture.mipmaps;H&&H.length>0?ft(y.__webglFramebuffer[0],T,0):ft(y.__webglFramebuffer,T,0)}else if(O){y.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[H]),y.__webglDepthbuffer[H]===void 0)y.__webglDepthbuffer[H]=n.createRenderbuffer(),Pe(y.__webglDepthbuffer[H],T,!1);else{let Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=y.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,se)}}else{let H=T.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Pe(y.__webglDepthbuffer,T,!1);else{let Z=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,se)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(T,y,O){let H=i.get(T);y!==void 0&&ye(H.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ve(T)}function Qe(T){let y=T.texture,O=i.get(T),H=i.get(y);T.addEventListener("dispose",_);let Z=T.textures,se=T.isWebGLCubeRenderTarget===!0,oe=Z.length>1;if(oe||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=y.version,a.memory.textures++),se){O.__webglFramebuffer=[];for(let $=0;$<6;$++)if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[$]=[];for(let te=0;te<y.mipmaps.length;te++)O.__webglFramebuffer[$][te]=n.createFramebuffer()}else O.__webglFramebuffer[$]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let $=0;$<y.mipmaps.length;$++)O.__webglFramebuffer[$]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(oe)for(let $=0,te=Z.length;$<te;$++){let ce=i.get(Z[$]);ce.__webglTexture===void 0&&(ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&yt(T)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let $=0;$<Z.length;$++){let te=Z[$];O.__webglColorRenderbuffer[$]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[$]);let ce=r.convert(te.format,te.colorSpace),Te=r.convert(te.type),ae=b(te.internalFormat,ce,Te,te.normalized,te.colorSpace,T.isXRRenderTarget===!0),re=ct(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,re,ae,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+$,n.RENDERBUFFER,O.__webglColorRenderbuffer[$])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Pe(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(se){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Le(n.TEXTURE_CUBE_MAP,y);for(let $=0;$<6;$++)if(y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)ye(O.__webglFramebuffer[$][te],T,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,te);else ye(O.__webglFramebuffer[$],T,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);m(y)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let $=0,te=Z.length;$<te;$++){let ce=Z[$],Te=i.get(ce),ae=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,Te.__webglTexture),Le(ae,ce),ye(O.__webglFramebuffer,T,ce,n.COLOR_ATTACHMENT0+$,ae,0),m(ce)&&S(ae)}t.unbindTexture()}else{let $=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture($,H.__webglTexture),Le($,y),y.mipmaps&&y.mipmaps.length>0)for(let te=0;te<y.mipmaps.length;te++)ye(O.__webglFramebuffer[te],T,y,n.COLOR_ATTACHMENT0,$,te);else ye(O.__webglFramebuffer,T,y,n.COLOR_ATTACHMENT0,$,0);m(y)&&S($),t.unbindTexture()}T.depthBuffer&&Ve(T)}function He(T){let y=T.textures;for(let O=0,H=y.length;O<H;O++){let Z=y[O];if(m(Z)){let se=C(T),oe=i.get(Z).__webglTexture;t.bindTexture(se,oe),S(se),t.unbindTexture()}}}let st=[],bt=[];function Ft(T){if(T.samples>0){if(yt(T)===!1){let y=T.textures,O=T.width,H=T.height,Z=n.COLOR_BUFFER_BIT,se=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(T),$=y.length>1;if($)for(let ce=0;ce<y.length;ce++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let te=T.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ce=0;ce<y.length;ce++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),$){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);let Te=i.get(y[ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Te,0)}n.blitFramebuffer(0,0,O,H,0,0,O,H,Z,n.NEAREST),c===!0&&(st.length=0,bt.length=0,st.push(n.COLOR_ATTACHMENT0+ce),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(st.push(se),bt.push(se),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),$)for(let ce=0;ce<y.length;ce++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);let Te=i.get(y[ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,Te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){let y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function ct(T){return Math.min(s.maxSamples,T.samples)}function yt(T){let y=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function D(T){let y=a.render.frame;d.get(T)!==y&&(d.set(T,y),T.update())}function Ct(T,y){let O=T.colorSpace,H=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==ir&&O!==an&&(Ze.getTransfer(O)===nt?(H!==ai||Z!==si)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ne("WebGLTextures: Unsupported texture color space:",O)),y}function et(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=B,this.getTextureUnits=P,this.setTextureUnits=k,this.setTexture2D=ie,this.setTexture2DArray=X,this.setTexture3D=W,this.setTextureCube=j,this.rebindTextures=Ye,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=yt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function nx(n,e){function t(i,s=an){let r,a=Ze.getTransfer(s);if(i===si)return n.UNSIGNED_BYTE;if(i===lo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===co)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ec)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===tc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jl)return n.BYTE;if(i===Ql)return n.SHORT;if(i===Rs)return n.UNSIGNED_SHORT;if(i===oo)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===Bt)return n.HALF_FLOAT;if(i===ic)return n.ALPHA;if(i===nc)return n.RGB;if(i===ai)return n.RGBA;if(i===Bi)return n.DEPTH_COMPONENT;if(i===Xi)return n.DEPTH_STENCIL;if(i===Cs)return n.RED;if(i===ho)return n.RED_INTEGER;if(i===Rn)return n.RG;if(i===uo)return n.RG_INTEGER;if(i===fo)return n.RGBA_INTEGER;if(i===Pr||i===Lr||i===Dr||i===Nr)if(a===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===po||i===mo||i===go||i===xo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===po)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===go)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yo||i===_o||i===vo||i===bo||i===Mo||i===Ur||i===So)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===yo||i===_o)return a===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===vo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===bo)return r.COMPRESSED_R11_EAC;if(i===Mo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ur)return r.COMPRESSED_RG11_EAC;if(i===So)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===wo||i===Eo||i===To||i===Ao||i===Ro||i===Co||i===Io||i===Po||i===Lo||i===Do||i===No||i===Uo||i===Fo||i===Oo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===wo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Eo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===To)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ao)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ro)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Co)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Io)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Po)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Lo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Do)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===No)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Fo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Oo)return a===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bo||i===ko||i===zo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Bo)return a===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Vo||i===Ho||i===Fr||i===Go)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Go)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===An?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var sx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Tc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ur(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Rt({vertexShader:sx,fragmentShader:rx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new je(new vn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ac=class extends ki{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,u=null,f=null,p=null,x=null,h=typeof XRWebGLBinding<"u",g=new Tc,m={},S=t.getContextAttributes(),C=null,b=null,w=[],M=[],A=new Be,_=null,E=null,R=new jt;R.viewport=new _t;let I=new jt;I.viewport=new _t;let U=[R,I],B=new Qa,P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let Q=w[Y];return Q===void 0&&(Q=new vs,w[Y]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Y){let Q=w[Y];return Q===void 0&&(Q=new vs,w[Y]=Q),Q.getGripSpace()},this.getHand=function(Y){let Q=w[Y];return Q===void 0&&(Q=new vs,w[Y]=Q),Q.getHandSpace()};function J(Y){let Q=M.indexOf(Y.inputSource);if(Q===-1)return;let de=w[Q];de!==void 0&&(de.update(Y.inputSource,Y.frame,l||a),de.dispatchEvent({type:Y.type,data:Y.inputSource}))}function K(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<w.length;Y++){let Q=M[Y];Q!==null&&(M[Y]=null,w[Y].disconnect(Q))}P=null,k=null,g.reset();for(let Y in m)delete m[Y];if(e.setRenderTarget(C),p=null,f=null,u=null,s=null,b=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(A.width,A.height,!1),E!==null){let Y=E.camera;Y.fov=E.fov,Y.zoom=E.zoom,Y.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",K),s.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(A),h&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ce=null,ye=null;S.depth&&(ye=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=S.stencil?Xi:Bi,Ce=S.stencil?An:Pi);let Pe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Pe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new At(f.textureWidth,f.textureHeight,{format:ai,type:si,depthTexture:new Hi(f.textureWidth,f.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let de={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new At(p.framebufferWidth,p.framebufferHeight,{format:ai,type:si,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ze.setContext(s),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ie(Y){for(let Q=0;Q<Y.removed.length;Q++){let de=Y.removed[Q],Ce=M.indexOf(de);Ce>=0&&(M[Ce]=null,w[Ce].disconnect(de))}for(let Q=0;Q<Y.added.length;Q++){let de=Y.added[Q],Ce=M.indexOf(de);if(Ce===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=M.length){M.push(de),Ce=Pe;break}else if(M[Pe]===null){M[Pe]=de,Ce=Pe;break}if(Ce===-1)break}let ye=w[Ce];ye&&ye.connect(de)}}let X=new F,W=new F;function j(Y,Q,de){X.setFromMatrixPosition(Q.matrixWorld),W.setFromMatrixPosition(de.matrixWorld);let Ce=X.distanceTo(W),ye=Q.projectionMatrix.elements,Pe=de.projectionMatrix.elements,ft=ye[14]/(ye[10]-1),Ve=ye[14]/(ye[10]+1),Ye=(ye[9]+1)/ye[5],Qe=(ye[9]-1)/ye[5],He=(ye[8]-1)/ye[0],st=(Pe[8]+1)/Pe[0],bt=ft*He,Ft=ft*st,ct=Ce/(-He+st),yt=ct*-He;if(Q.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(yt),Y.translateZ(ct),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ye[10]===-1)Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let D=ft+ct,Ct=Ve+ct,et=bt-yt,T=Ft+(Ce-yt),y=Ye*Ve/Ct*D,O=Qe*Ve/Ct*D;Y.projectionMatrix.makePerspective(et,T,y,O,D,Ct),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function le(Y,Q){Q===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(Q.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let Q=Y.near,de=Y.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(de=g.depthFar)),B.near=I.near=R.near=Q,B.far=I.far=R.far=de,(P!==B.near||k!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),P=B.near,k=B.far),B.layers.mask=Y.layers.mask|6,R.layers.mask=B.layers.mask&-5,I.layers.mask=B.layers.mask&-3;let Ce=Y.parent,ye=B.cameras;le(B,Ce);for(let Pe=0;Pe<ye.length;Pe++)le(ye[Pe],Ce);ye.length===2?j(B,R,I):B.projectionMatrix.copy(R.projectionMatrix),E===null&&Y.isPerspectiveCamera&&(E={camera:Y,fov:Y.fov,zoom:Y.zoom}),me(Y,B,Ce)};function me(Y,Q,de){de===null?Y.matrix.copy(Q.matrixWorld):(Y.matrix.copy(de.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(Q.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(Q.projectionMatrix),Y.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=xs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(B)},this.getCameraTexture=function(Y){return m[Y]};let qe=null;function Le(Y,Q){if(d=Q.getViewerPose(l||a),x=Q,d!==null){let de=d.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Ce=!1;de.length!==B.cameras.length&&(B.cameras.length=0,Ce=!0);for(let Ve=0;Ve<de.length;Ve++){let Ye=de[Ve],Qe=null;if(p!==null)Qe=p.getViewport(Ye);else{let st=u.getViewSubImage(f,Ye);Qe=st.viewport,Ve===0&&(e.setRenderTargetTextures(b,st.colorTexture,st.depthStencilTexture),e.setRenderTarget(b))}let He=U[Ve];He===void 0&&(He=new jt,He.layers.enable(Ve),He.viewport=new _t,U[Ve]=He),He.matrix.fromArray(Ye.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Ye.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Ve===0&&(B.matrix.copy(He.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ce===!0&&B.cameras.push(He)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){u=i.getBinding();let Ve=u.getDepthInformation(de[0]);Ve&&Ve.isValid&&Ve.texture&&g.init(Ve,s.renderState)}if(ye&&ye.includes("camera-access")&&h){e.state.unbindTexture(),u=i.getBinding();for(let Ve=0;Ve<de.length;Ve++){let Ye=de[Ve].camera;if(Ye){let Qe=m[Ye];Qe||(Qe=new ur,m[Ye]=Qe);let He=u.getCameraImage(Ye);Qe.sourceTexture=He}}}}for(let de=0;de<w.length;de++){let Ce=M[de],ye=w[de];Ce!==null&&ye!==void 0&&ye.update(Ce,Q,l||a)}qe&&qe(Y,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),x=null}let ze=new Fu;ze.setAnimationLoop(Le),this.setAnimationLoop=function(Y){qe=Y},this.dispose=function(){}}},ax=new it,Hu=new ke;Hu.set(-1,0,0,0,1,0,0,0,1);function ox(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,cc(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,S,C,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),d(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&p(g,m,b)):m.isMeshMatcapMaterial?(r(g,m),x(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),h(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,S,C):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Gt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Gt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let S=e.get(m),C=S.envMap,b=S.envMapRotation;C&&(g.envMap.value=C,g.envMapRotation.value.setFromMatrix4(ax.makeRotationFromEuler(b)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Hu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,S,C){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=C*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function d(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Gt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,m){m.matcap&&(g.matcap.value=m.matcap)}function h(g,m){let S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function lx(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){let M=w.program;i.uniformBlockBinding(b,M)}function l(b,w){let M=s[b.id];M===void 0&&(g(b),M=d(b),s[b.id]=M,b.addEventListener("dispose",S));let A=w.program;i.updateUBOMapping(b,A);let _=e.render.frame;r[b.id]!==_&&(f(b),r[b.id]=_)}function d(b){let w=u();b.__bindingPointIndex=w;let M=n.createBuffer(),A=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return Ne("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let w=s[b.id],M=b.uniforms,A=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let _=0,E=M.length;_<E;_++){let R=M[_];if(Array.isArray(R))for(let I=0,U=R.length;I<U;I++)p(R[I],_,I,A);else p(R,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,w,M,A){if(h(b,w,M,A)===!0){let _=b.__offset,E=b.value;if(Array.isArray(E)){let R=0;for(let I=0;I<E.length;I++){let U=E[I],B=m(U);x(U,b.__data,R),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(R+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function x(b,w,M){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,M)}function h(b,w,M,A){let _=b.value,E=w+"_"+M;if(A[E]===void 0)return typeof _=="number"||typeof _=="boolean"?A[E]=_:ArrayBuffer.isView(_)?A[E]=_.slice():A[E]=_.clone(),!0;{let R=A[E];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return A[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function g(b){let w=b.uniforms,M=0,A=16;for(let E=0,R=w.length;E<R;E++){let I=Array.isArray(w[E])?w[E]:[w[E]];for(let U=0,B=I.length;U<B;U++){let P=I[U],k=Array.isArray(P.value)?P.value:[P.value];for(let J=0,K=k.length;J<K;J++){let ie=k[J],X=m(ie),W=M%A,j=W%X.boundary,le=W+j;M+=j,le!==0&&A-le<X.storage&&(M+=A-le),P.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=M,M+=X.storage}}}let _=M%A;return _>0&&(M+=A-_),b.__size=M,b.__cache={},this}function m(b){let w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):De("WebGLRenderer: Unsupported uniform value type.",b),w}function S(b){let w=b.target;w.removeEventListener("dispose",S);let M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function C(){for(let b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:C}}var cx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qi=null;function hx(){return qi===null&&(qi=new nn(cx,16,16,Rn,Bt),qi.name="DFG_LUT",qi.minFilter=Vt,qi.magFilter=Vt,qi.wrapS=Oi,qi.wrapT=Oi,qi.generateMipmaps=!1,qi.needsUpdate=!0),qi}var Jo=class{constructor(e={}){let{canvas:t=lu(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:p=si}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let h=p,g=new Set([fo,uo,ho]),m=new Set([si,Pi,Rs,An,lo,co]),S=new Uint32Array(4),C=new Int32Array(4),b=new F,w=null,M=null,A=[],_=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,U=null,B=null,P=null,k=null;this._outputColorSpace=$t;let J=0,K=0,ie=null,X=-1,W=null,j=new _t,le=new _t,me=null,qe=new Oe(0),Le=0,ze=t.width,Y=t.height,Q=1,de=null,Ce=null,ye=new _t(0,0,ze,Y),Pe=new _t(0,0,ze,Y),ft=!1,Ve=new Ms,Ye=!1,Qe=!1,He=new it,st=new F,bt=new _t,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ct=!1;function yt(){return ie===null?Q:1}let D=i;function Ct(v,L){return t.getContext(v,L)}let et,T,y,O,H,Z,se,oe,$,te,ce,Te,ae,re,Me,Re,Ue,N,he,ee,ue,_e,ne;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Ei,!1),D===null){let L="webgl2";if(D=Ct(L,v),D===null)throw Ct(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(v){throw t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Ei,!1),Ne("WebGLRenderer: "+v.message),v}function Ie(){et=new xg(D),et.init(),ue=new nx(D,et),T=new og(D,et,e,ue),y=new tx(D,et),T.reversedDepthBuffer&&f&&y.buffers.depth.setReversed(!0),B=D.createFramebuffer(),P=D.createFramebuffer(),k=D.createFramebuffer(),O=new vg(D),H=new V0,Z=new ix(D,et,y,H,T,ue,O),se=new gg(R),oe=new Mf(D),_e=new rg(D,oe),$=new yg(D,oe,O,_e),te=new Mg(D,$,oe,_e,O),N=new bg(D,T,Z),Me=new lg(H),ce=new z0(R,se,et,T,_e,Me),Te=new ox(R,H),ae=new G0,re=new J0(et),Ue=new sg(R,se,y,te,x,c),Re=new ex(R,te,T),ne=new lx(D,O,T,y),he=new ag(D,et,O),ee=new _g(D,et,O),O.programs=ce.programs,R.capabilities=T,R.extensions=et,R.properties=H,R.renderLists=ae,R.shadowMap=Re,R.state=y,R.info=O}h!==si&&(E=new wg(h,t.width,t.height,o,s,r));let Ee=new Ac(R,D);this.xr=Ee,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let v=et.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=et.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(v){v!==void 0&&(Q=v,this.setSize(ze,Y,!1))},this.getSize=function(v){return v.set(ze,Y)},this.setSize=function(v,L,q=!0){if(Ee.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}ze=v,Y=L,t.width=Math.floor(v*Q),t.height=Math.floor(L*Q),q===!0&&(t.style.width=v+"px",t.style.height=L+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(ze*Q,Y*Q).floor()},this.setDrawingBufferSize=function(v,L,q){ze=v,Y=L,Q=q,t.width=Math.floor(v*q),t.height=Math.floor(L*q),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(h===si){Ne("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){De("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(j)},this.getViewport=function(v){return v.copy(ye)},this.setViewport=function(v,L,q,z){v.isVector4?ye.set(v.x,v.y,v.z,v.w):ye.set(v,L,q,z),y.viewport(j.copy(ye).multiplyScalar(Q).round())},this.getScissor=function(v){return v.copy(Pe)},this.setScissor=function(v,L,q,z){v.isVector4?Pe.set(v.x,v.y,v.z,v.w):Pe.set(v,L,q,z),y.scissor(le.copy(Pe).multiplyScalar(Q).round())},this.getScissorTest=function(){return ft},this.setScissorTest=function(v){y.setScissorTest(ft=v)},this.setOpaqueSort=function(v){de=v},this.setTransparentSort=function(v){Ce=v},this.getClearColor=function(v){return v.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,q=!0){let z=0;if(v){let V=!1;if(ie!==null){let xe=ie.texture.format;V=g.has(xe)}if(V){let xe=ie.texture.type,be=m.has(xe),ge=Ue.getClearColor(),Se=Ue.getClearAlpha(),Ae=ge.r,Ge=ge.g,Ke=ge.b;be?(S[0]=Ae,S[1]=Ge,S[2]=Ke,S[3]=Se,D.clearBufferuiv(D.COLOR,0,S)):(C[0]=Ae,C[1]=Ge,C[2]=Ke,C[3]=Se,D.clearBufferiv(D.COLOR,0,C))}else z|=D.COLOR_BUFFER_BIT}L&&(z|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(z|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&D.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),U=v},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Ei,!1),Ue.dispose(),ae.dispose(),re.dispose(),H.dispose(),se.dispose(),te.dispose(),_e.dispose(),ne.dispose(),ce.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",Hc),Ee.removeEventListener("sessionend",Gc),Pn.stop()};function ut(v){v.preventDefault(),ac("WebGLRenderer: Context Lost."),I=!0}function rt(){ac("WebGLRenderer: Context Restored."),I=!1;let v=O.autoReset,L=Re.enabled,q=Re.autoUpdate,z=Re.needsUpdate,V=Re.type;Ie(),O.autoReset=v,Re.enabled=L,Re.autoUpdate=q,Re.needsUpdate=z,Re.type=V}function Ei(v){Ne("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ni(v){let L=v.target;L.removeEventListener("dispose",Ni),rd(L)}function rd(v){ad(v),H.remove(v)}function ad(v){let L=H.get(v).programs;L!==void 0&&(L.forEach(function(q){ce.releaseProgram(q)}),v.isShaderMaterial&&ce.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,q,z,V,xe){L===null&&(L=Ft);let be=V.isMesh&&V.matrixWorld.determinantAffine()<0,ge=cd(v,L,q,z,V);y.setMaterial(z,be);let Se=q.index,Ae=1;if(z.wireframe===!0){if(Se=$.getWireframeAttribute(q),Se===void 0)return;Ae=2}let Ge=q.drawRange,Ke=q.attributes.position,we=Ge.start*Ae,at=(Ge.start+Ge.count)*Ae;xe!==null&&(we=Math.max(we,xe.start*Ae),at=Math.min(at,(xe.start+xe.count)*Ae)),Se!==null?(we=Math.max(we,0),at=Math.min(at,Se.count)):Ke!=null&&(we=Math.max(we,0),at=Math.min(at,Ke.count));let It=at-we;if(It<0||It===1/0)return;_e.setup(V,z,ge,q,Se);let pt,ht=he;if(Se!==null&&(pt=oe.get(Se),ht=ee,ht.setIndex(pt)),V.isMesh)z.wireframe===!0?(y.setLineWidth(z.wireframeLinewidth*yt()),ht.setMode(D.LINES)):ht.setMode(D.TRIANGLES);else if(V.isLine){let Wt=z.linewidth;Wt===void 0&&(Wt=1),y.setLineWidth(Wt*yt()),V.isLineSegments?ht.setMode(D.LINES):V.isLineLoop?ht.setMode(D.LINE_LOOP):ht.setMode(D.LINE_STRIP)}else V.isPoints?ht.setMode(D.POINTS):V.isSprite&&ht.setMode(D.TRIANGLES);if(V.isBatchedMesh)if(et.get("WEBGL_multi_draw"))ht.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Wt=V._multiDrawStarts,ve=V._multiDrawCounts,Jt=V._multiDrawCount,tt=Se?oe.get(Se).bytesPerElement:1,_i=H.get(z).currentProgram.getUniforms();for(let Ui=0;Ui<Jt;Ui++)_i.setValue(D,"_gl_DrawID",Ui),ht.render(Wt[Ui]/tt,ve[Ui])}else if(V.isInstancedMesh)ht.renderInstances(we,It,V.count);else if(q.isInstancedBufferGeometry){let Wt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ve=Math.min(q.instanceCount,Wt);ht.renderInstances(we,It,ve)}else ht.render(we,It)};function Vc(v,L,q,z){U!==null&&v.isNodeMaterial&&U.setObject(z,v),Ye===!0&&Me.setState(v,q,!1),v.transparent===!0&&v.side===ni&&v.forceSinglePass===!1?(v.side=Gt,v.needsUpdate=!0,ea(v,L,z),v.side=wn,v.needsUpdate=!0,ea(v,L,z),v.side=ni):ea(v,L,z)}this.compile=function(v,L,q=null){q===null&&(q=v),U!==null&&U.renderStart(v,L,q),M=re.get(q),M.init(L),_.push(M),q.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(M.pushLight(V),V.castShadow&&M.pushShadow(V))}),v!==q&&v.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(M.pushLight(V),V.castShadow&&M.pushShadow(V))}),M.setupLights(),U!==null&&U.updateLights(M.state.lightsArray),Qe=this.localClippingEnabled,Ye=Me.init(this.clippingPlanes,Qe),Ye===!0&&Me.setGlobalState(this.clippingPlanes,L),U!==null&&Re.render(M.state.shadowsArray,q,L);let z=new Set;return v.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let xe=V.material;if(xe)if(Array.isArray(xe))for(let be=0;be<xe.length;be++){let ge=xe[be];Vc(ge,q,L,V),z.add(ge)}else Vc(xe,q,L,V),z.add(xe)}),M=_.pop(),U!==null&&U.renderEnd(),z},this.compileAsync=function(v,L,q=null){let z=this.compile(v,L,q);return new Promise(V=>{function xe(){if(z.forEach(function(be){let Se=H.get(be).currentProgram;(Se===void 0||Se.isReady())&&z.delete(be)}),z.size===0){V(v);return}setTimeout(xe,10)}et.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let dl=null;function od(v){dl&&dl(v)}function Hc(){Pn.stop()}function Gc(){Pn.start()}let Pn=new Fu;Pn.setAnimationLoop(od),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(v){dl=v,Ee.setAnimationLoop(v),v===null?Pn.stop():Pn.start()},Ee.addEventListener("sessionstart",Hc),Ee.addEventListener("sessionend",Gc),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Ne("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;U!==null&&U.renderStart(v,L);let q=Ee.enabled===!0&&Ee.isPresenting===!0,z=E!==null&&(ie===null||q)&&E.begin(R,ie);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(L),L=Ee.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,L,ie),M=re.get(v,_.length),M.init(L),M.state.textureUnits=Z.getTextureUnits(),_.push(M),He.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Ve.setFromProjectionMatrix(He,Ci,L.reversedDepth),Qe=this.localClippingEnabled,Ye=Me.init(this.clippingPlanes,Qe),w=ae.get(v,A.length),w.init(),A.push(w),Ee.enabled===!0&&Ee.isPresenting===!0){let be=R.xr.getDepthSensingMesh();be!==null&&fl(be,L,-1/0,R.sortObjects)}fl(v,L,0,R.sortObjects),w.finish(),U!==null&&U.updateLights(M.state.lightsArray),R.sortObjects===!0&&w.sort(de,Ce),ct=Ee.enabled===!1||Ee.isPresenting===!1||Ee.hasDepthSensing()===!1,ct&&Ue.addToRenderList(w,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ye===!0&&Me.beginShadows();let V=M.state.shadowsArray;if(Re.render(V,v,L),Ye===!0&&Me.endShadows(),(z&&E.hasRenderPass())===!1){let be=w.opaque,ge=w.transmissive;if(M.setupLights(),L.isArrayCamera){let Se=L.cameras;if(ge.length>0)for(let Ae=0,Ge=Se.length;Ae<Ge;Ae++){let Ke=Se[Ae];Xc(be,ge,v,Ke)}ct&&Ue.render(v);for(let Ae=0,Ge=Se.length;Ae<Ge;Ae++){let Ke=Se[Ae];Wc(w,v,Ke,Ke.viewport)}}else ge.length>0&&Xc(be,ge,v,L),ct&&Ue.render(v),Wc(w,v,L)}ie!==null&&K===0&&(Z.updateMultisampleRenderTarget(ie),Z.updateRenderTargetMipmap(ie)),z&&E.end(R),v.isScene===!0&&v.onAfterRender(R,v,L),_e.resetDefaultState(),X=-1,W=null,_.pop(),_.length>0?(M=_[_.length-1],Z.setTextureUnits(M.state.textureUnits),Ye===!0&&Me.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,U!==null&&U.renderEnd()};function fl(v,L,q,z){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)q=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLightProbeGrid)M.pushLightProbeGrid(v);else if(v.isLight)M.pushLight(v),v.castShadow&&M.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Ve)){z&&bt.setFromMatrixPosition(v.matrixWorld).applyMatrix4(He);let be=te.update(v),ge=v.material;ge.visible&&w.push(v,be,ge,q,bt.z,null,L)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Ve))){let be=te.update(v),ge=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),bt.copy(v.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),bt.copy(be.boundingSphere.center)),bt.applyMatrix4(v.matrixWorld).applyMatrix4(He)),Array.isArray(ge)){let Se=be.groups;for(let Ae=0,Ge=Se.length;Ae<Ge;Ae++){let Ke=Se[Ae],we=ge[Ke.materialIndex];we&&we.visible&&w.push(v,be,we,q,bt.z,Ke,L)}}else ge.visible&&w.push(v,be,ge,q,bt.z,null,L)}}let xe=v.children;for(let be=0,ge=xe.length;be<ge;be++)fl(xe[be],L,q,z)}function Wc(v,L,q,z){let{opaque:V,transmissive:xe,transparent:be}=v;M.setupLightsView(q),Ye===!0&&Me.setGlobalState(R.clippingPlanes,q),z&&y.viewport(j.copy(z)),V.length>0&&Qr(V,L,q),xe.length>0&&Qr(xe,L,q),be.length>0&&Qr(be,L,q),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Xc(v,L,q,z){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[z.id]===void 0){let we=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[z.id]=new At(1,1,{generateMipmaps:!0,type:we?Bt:si,minFilter:Tn,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}let xe=M.state.transmissionRenderTarget[z.id],be=z.viewport||j;xe.setSize(be.z*R.transmissionResolutionScale,be.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),Se=R.getActiveCubeFace(),Ae=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(qe),Le=R.getClearAlpha(),Le<1&&R.setClearColor(16777215,.5),R.clear(),ct&&Ue.render(q);let Ge=R.toneMapping;R.toneMapping=Ii;let Ke=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),M.setupLightsView(z),Ye===!0&&Me.setGlobalState(R.clippingPlanes,z),Qr(v,q,z),Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe),et.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let at=0,It=L.length;at<It;at++){let pt=L[at],{object:ht,geometry:Wt,material:ve,group:Jt}=pt;if(ve.side===ni&&ht.layers.test(z.layers)){let tt=ve.side;ve.side=Gt,ve.needsUpdate=!0,qc(ht,q,z,Wt,ve,Jt),ve.side=tt,ve.needsUpdate=!0,we=!0}}we===!0&&(Z.updateMultisampleRenderTarget(xe),Z.updateRenderTargetMipmap(xe))}R.setRenderTarget(ge,Se,Ae),R.setClearColor(qe,Le),Ke!==void 0&&(z.viewport=Ke),R.toneMapping=Ge}function Qr(v,L,q){let z=L.isScene===!0?L.overrideMaterial:null;for(let V=0,xe=v.length;V<xe;V++){let be=v[V],{object:ge,geometry:Se,group:Ae}=be,Ge=be.material;Ge.allowOverride===!0&&z!==null&&(Ge=z),ge.layers.test(q.layers)&&qc(ge,L,q,Se,Ge,Ae)}}function qc(v,L,q,z,V,xe){U!==null&&V.isNodeMaterial&&U.setObject(v,V),v.onBeforeRender(R,L,q,z,V,xe),v.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),V.onBeforeRender(R,L,q,z,v,xe),V.transparent===!0&&V.side===ni&&V.forceSinglePass===!1?(V.side=Gt,V.needsUpdate=!0,R.renderBufferDirect(q,L,z,V,v,xe),V.side=wn,V.needsUpdate=!0,R.renderBufferDirect(q,L,z,V,v,xe),V.side=ni):R.renderBufferDirect(q,L,z,V,v,xe),v.onAfterRender(R,L,q,z,V,xe)}function ea(v,L,q){L.isScene!==!0&&(L=Ft);let z=H.get(v),V=M.state.lights,xe=M.state.shadowsArray,be=V.state.version,ge=ce.getParameters(v,V.state,xe,L,q,M.state.lightProbeGridArray),Se=ce.getProgramCacheKey(ge),Ae=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,z.fog=L.fog;let Ge=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=se.get(v.envMap||z.environment,Ge),z.envMapRotation=z.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ae===void 0&&(v.addEventListener("dispose",Ni),Ae=new Map,z.programs=Ae);let Ke=Ae.get(Se);if(Ke!==void 0){if(z.currentProgram===Ke&&z.lightsStateVersion===be)return Zc(v,ge),Ke}else ge.uniforms=ce.getUniforms(v),U!==null&&v.isNodeMaterial&&U.build(v,q,ge),v.onBeforeCompile(ge,R),Ke=ce.acquireProgram(ge,Se),Ae.set(Se,Ke),z.uniforms=ge.uniforms;let we=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(we.clippingPlanes=Me.uniform),Zc(v,ge),z.needsLights=ud(v),z.lightsStateVersion=be,z.needsLights&&(we.ambientLightColor.value=V.state.ambient,we.lightProbe.value=V.state.probe,we.sunLights.value=V.state.sun,we.sunLightShadows.value=V.state.sunShadow,we.directionalLights.value=V.state.directional,we.directionalLightShadows.value=V.state.directionalShadow,we.spotLights.value=V.state.spot,we.spotLightShadows.value=V.state.spotShadow,we.rectAreaLights.value=V.state.rectArea,we.ltc_1.value=V.state.rectAreaLTC1,we.ltc_2.value=V.state.rectAreaLTC2,we.pointLights.value=V.state.point,we.pointLightShadows.value=V.state.pointShadow,we.hemisphereLights.value=V.state.hemi,we.sunShadowMatrix.value=V.state.sunShadowMatrix,we.sunShadowCascade.value=V.state.sunShadowCascade,we.directionalShadowMatrix.value=V.state.directionalShadowMatrix,we.spotLightMatrix.value=V.state.spotLightMatrix,we.spotLightMap.value=V.state.spotLightMap,we.pointShadowMatrix.value=V.state.pointShadowMatrix),z.lightProbeGrid=M.state.lightProbeGridArray.length>0,z.currentProgram=Ke,z.uniformsList=null,Ke}function Yc(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=Ns.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function Zc(v,L){let q=H.get(v);q.outputColorSpace=L.outputColorSpace,q.batching=L.batching,q.batchingColor=L.batchingColor,q.instancing=L.instancing,q.instancingColor=L.instancingColor,q.instancingMorph=L.instancingMorph,q.skinning=L.skinning,q.morphTargets=L.morphTargets,q.morphNormals=L.morphNormals,q.morphColors=L.morphColors,q.morphTargetsCount=L.morphTargetsCount,q.numClippingPlanes=L.numClippingPlanes,q.numIntersection=L.numClipIntersection,q.vertexAlphas=L.vertexAlphas,q.vertexTangents=L.vertexTangents,q.toneMapping=L.toneMapping}function ld(v,L){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;b.setFromMatrixPosition(L.matrixWorld);for(let q=0,z=v.length;q<z;q++){let V=v[q];if(V.texture!==null&&V.boundingBox.containsPoint(b))return V}return null}function cd(v,L,q,z,V){L.isScene!==!0&&(L=Ft),Z.resetTextureUnits();let xe=L.fog,be=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?L.environment:null,ge=ie===null?R.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Ze.workingColorSpace,Se=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ae=se.get(z.envMap||be,Se),Ge=z.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ke=!!q.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),we=!!q.morphAttributes.position,at=!!q.morphAttributes.normal,It=!!q.morphAttributes.color,pt=Ii;z.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(pt=R.toneMapping);let ht=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Wt=ht!==void 0?ht.length:0,ve=H.get(z),Jt=M.state.lights;if(Ye===!0&&(Qe===!0||v!==W)){let dt=v===W&&z.id===X;Me.setState(z,v,dt)}let tt=!1;z.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Jt.state.version||ve.outputColorSpace!==ge||V.isBatchedMesh&&ve.batching===!1||!V.isBatchedMesh&&ve.batching===!0||V.isBatchedMesh&&ve.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&ve.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&ve.instancing===!1||!V.isInstancedMesh&&ve.instancing===!0||V.isSkinnedMesh&&ve.skinning===!1||!V.isSkinnedMesh&&ve.skinning===!0||V.isInstancedMesh&&ve.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ve.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ve.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ve.instancingMorph===!1&&V.morphTexture!==null||ve.envMap!==Ae||z.fog===!0&&ve.fog!==xe||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Me.numPlanes||ve.numIntersection!==Me.numIntersection)||ve.vertexAlphas!==Ge||ve.vertexTangents!==Ke||ve.morphTargets!==we||ve.morphNormals!==at||ve.morphColors!==It||ve.toneMapping!==pt||ve.morphTargetsCount!==Wt||!!ve.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(tt=!0):(tt=!0,ve.__version=z.version);let _i=ve.currentProgram;tt===!0&&(_i=ea(z,L,V),U&&z.isNodeMaterial&&U.onUpdateProgram(z,_i,ve));let Ui=!1,hn=!1,Yn=!1,ot=_i.getUniforms(),Et=ve.uniforms;if(y.useProgram(_i.program)&&(Ui=!0,hn=!0,Yn=!0),z.id!==X&&(X=z.id,hn=!0),ve.needsLights){let dt=ld(M.state.lightProbeGridArray,V);ve.lightProbeGrid!==dt&&(ve.lightProbeGrid=dt,hn=!0)}if(Ui||W!==v){y.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),ot.setValue(D,"projectionMatrix",v.projectionMatrix),ot.setValue(D,"viewMatrix",v.matrixWorldInverse);let dn=ot.map.cameraPosition;dn!==void 0&&dn.setValue(D,st.setFromMatrixPosition(v.matrixWorld)),T.logarithmicDepthBuffer&&ot.setValue(D,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ot.setValue(D,"isOrthographic",v.isOrthographicCamera===!0),W!==v&&(W=v,hn=!0,Yn=!0)}if(ve.needsLights&&(Jt.state.sunShadowMap.length>0&&ot.setValue(D,"sunShadowMap",Jt.state.sunShadowMap,Z),Jt.state.directionalShadowMap.length>0&&ot.setValue(D,"directionalShadowMap",Jt.state.directionalShadowMap,Z),Jt.state.spotShadowMap.length>0&&ot.setValue(D,"spotShadowMap",Jt.state.spotShadowMap,Z),Jt.state.pointShadowMap.length>0&&ot.setValue(D,"pointShadowMap",Jt.state.pointShadowMap,Z)),V.isSkinnedMesh){ot.setOptional(D,V,"bindMatrix"),ot.setOptional(D,V,"bindMatrixInverse");let dt=V.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),ot.setValue(D,"boneTexture",dt.boneTexture,Z))}V.isBatchedMesh&&(ot.setOptional(D,V,"batchingTexture"),ot.setValue(D,"batchingTexture",V._matricesTexture,Z),ot.setOptional(D,V,"batchingIdTexture"),ot.setValue(D,"batchingIdTexture",V._indirectTexture,Z),ot.setOptional(D,V,"batchingColorTexture"),V._colorsTexture!==null&&ot.setValue(D,"batchingColorTexture",V._colorsTexture,Z));let un=q.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&N.update(V,q,_i),(hn||ve.receiveShadow!==V.receiveShadow)&&(ve.receiveShadow=V.receiveShadow,ot.setValue(D,"receiveShadow",V.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&L.environment!==null&&(Et.envMapIntensity.value=L.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=hx()),hn){if(ot.setValue(D,"toneMappingExposure",R.toneMappingExposure),ve.needsLights&&hd(Et,Yn),xe&&z.fog===!0&&Te.refreshFogUniforms(Et,xe),Te.refreshMaterialUniforms(Et,z,Q,Y,M.state.transmissionRenderTarget[v.id]),ve.needsLights&&ve.lightProbeGrid){let dt=ve.lightProbeGrid;Et.probesSH.value=dt.texture,Et.probesMin.value.copy(dt.boundingBox.min),Et.probesMax.value.copy(dt.boundingBox.max),Et.probesResolution.value.copy(dt.resolution)}Ns.upload(D,Yc(ve),Et,Z)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Ns.upload(D,Yc(ve),Et,Z),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ot.setValue(D,"center",V.center),ot.setValue(D,"modelViewMatrix",V.modelViewMatrix),ot.setValue(D,"normalMatrix",V.normalMatrix),ot.setValue(D,"modelMatrix",V.matrixWorld),z.uniformsGroups!==void 0){let dt=z.uniformsGroups;for(let dn=0,Zn=dt.length;dn<Zn;dn++){let Kc=dt[dn];ne.update(Kc,_i),ne.bind(Kc,_i)}}return _i}function hd(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function ud(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(v,L,q){let z=H.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(v.texture).__webglTexture=L,H.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:q,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let q=H.get(v);q.__webglFramebuffer=L,q.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,q=0){ie=v,J=L,K=q;let z=null,V=!1,xe=!1;if(v){let ge=H.get(v);if(ge.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(D.FRAMEBUFFER,ge.__webglFramebuffer),j.copy(v.viewport),le.copy(v.scissor),me=v.scissorTest,y.viewport(j),y.scissor(le),y.setScissorTest(me),X=-1;return}else if(ge.__webglFramebuffer===void 0)Z.setupRenderTarget(v);else if(ge.__hasExternalTextures)Z.rebindTextures(v,H.get(v.texture).__webglTexture,H.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ge=v.depthTexture;if(ge.__boundDepthTexture!==Ge){if(Ge!==null&&H.has(Ge)&&(v.width!==Ge.image.width||v.height!==Ge.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(v)}}let Se=v.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(xe=!0);let Ae=H.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ae[L])?z=Ae[L][q]:z=Ae[L],V=!0):v.samples>0&&Z.useMultisampledRTT(v)===!1?z=H.get(v).__webglMultisampledFramebuffer:Array.isArray(Ae)?z=Ae[q]:z=Ae,j.copy(v.viewport),le.copy(v.scissor),me=v.scissorTest}else j.copy(ye).multiplyScalar(Q).floor(),le.copy(Pe).multiplyScalar(Q).floor(),me=ft;if(q!==0&&(z=B),y.bindFramebuffer(D.FRAMEBUFFER,z)&&y.drawBuffers(v,z),y.viewport(j),y.scissor(le),y.setScissorTest(me),V){let ge=H.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,ge.__webglTexture,q)}else if(xe){let ge=L;for(let Se=0;Se<v.textures.length;Se++){let Ae=H.get(v.textures[Se]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,q,ge)}}else if(v!==null&&q!==0){let ge=H.get(v.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ge.__webglTexture,q)}X=-1};function Jc(v){let L=H.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=T.textureFormatReadable(v.format),L.__typeReadable=T.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,q,z,V,xe,be,ge=0){if(!(v&&v.isWebGLRenderTarget)){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&be!==void 0&&(Se=Se[be]),Se){y.bindFramebuffer(D.FRAMEBUFFER,Se);try{let Ae=v.textures[ge],Ge=Ae.format,Ke=Ae.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge);let we=Jc(Ae);if(we.__formatReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Ne("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-z&&q>=0&&q<=v.height-V&&D.readPixels(L,q,z,V,ue.convert(Ge),ue.convert(Ke),xe)}finally{let Ae=ie!==null?H.get(ie).__webglFramebuffer:null;y.bindFramebuffer(D.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(v,L,q,z,V,xe,be,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=H.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&be!==void 0&&(Se=Se[be]),Se)if(L>=0&&L<=v.width-z&&q>=0&&q<=v.height-V){y.bindFramebuffer(D.FRAMEBUFFER,Se);let Ae=v.textures[ge],Ge=Ae.format,Ke=Ae.type;v.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ge);let we=Jc(Ae);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let at=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.bufferData(D.PIXEL_PACK_BUFFER,xe.byteLength,D.STREAM_READ),D.readPixels(L,q,z,V,ue.convert(Ge),ue.convert(Ke),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let It=ie!==null?H.get(ie).__webglFramebuffer:null;y.bindFramebuffer(D.FRAMEBUFFER,It);let pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await hu(D,pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,at),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xe),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(at),D.deleteSync(pt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,q=0){let z=Math.pow(2,-q),V=Math.floor(v.image.width*z),xe=Math.floor(v.image.height*z),be=L!==null?L.x:0,ge=L!==null?L.y:0;Z.setTexture2D(v,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,be,ge,V,xe),y.unbindTexture()},this.copyTextureToTexture=function(v,L,q=null,z=null,V=0,xe=0){let be,ge,Se,Ae,Ge,Ke,we,at,It,pt=v.isCompressedTexture?v.mipmaps[xe]:v.image;if(q!==null)be=q.max.x-q.min.x,ge=q.max.y-q.min.y,Se=q.isBox3?q.max.z-q.min.z:1,Ae=q.min.x,Ge=q.min.y,Ke=q.isBox3?q.min.z:0;else{let Et=Math.pow(2,-V);be=Math.floor(pt.width*Et),ge=Math.floor(pt.height*Et),v.isDataArrayTexture?Se=pt.depth:v.isData3DTexture?Se=Math.floor(pt.depth*Et):Se=1,Ae=0,Ge=0,Ke=0}z!==null?(we=z.x,at=z.y,It=z.z):(we=0,at=0,It=0);let ht=ue.convert(L.format),Wt=ue.convert(L.type),ve;L.isData3DTexture?(Z.setTexture3D(L,0),ve=D.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Z.setTexture2DArray(L,0),ve=D.TEXTURE_2D_ARRAY):(Z.setTexture2D(L,0),ve=D.TEXTURE_2D),y.activeTexture(D.TEXTURE0),y.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),y.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),y.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);let Jt=y.getParameter(D.UNPACK_ROW_LENGTH),tt=y.getParameter(D.UNPACK_IMAGE_HEIGHT),_i=y.getParameter(D.UNPACK_SKIP_PIXELS),Ui=y.getParameter(D.UNPACK_SKIP_ROWS),hn=y.getParameter(D.UNPACK_SKIP_IMAGES);y.pixelStorei(D.UNPACK_ROW_LENGTH,pt.width),y.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pt.height),y.pixelStorei(D.UNPACK_SKIP_PIXELS,Ae),y.pixelStorei(D.UNPACK_SKIP_ROWS,Ge),y.pixelStorei(D.UNPACK_SKIP_IMAGES,Ke);let Yn=v.isDataArrayTexture||v.isData3DTexture,ot=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let Et=H.get(v),un=H.get(L),dt=H.get(Et.__renderTarget),dn=H.get(un.__renderTarget);y.bindFramebuffer(D.READ_FRAMEBUFFER,dt.__webglFramebuffer),y.bindFramebuffer(D.DRAW_FRAMEBUFFER,dn.__webglFramebuffer);for(let Zn=0;Zn<Se;Zn++)Yn&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,H.get(v).__webglTexture,V,Ke+Zn),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,H.get(L).__webglTexture,xe,It+Zn)),D.blitFramebuffer(Ae,Ge,be,ge,we,at,be,ge,D.DEPTH_BUFFER_BIT,D.NEAREST);y.bindFramebuffer(D.READ_FRAMEBUFFER,null),y.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(V!==0||v.isRenderTargetTexture||H.has(v)){let Et=H.get(v),un=H.get(L);y.bindFramebuffer(D.READ_FRAMEBUFFER,P),y.bindFramebuffer(D.DRAW_FRAMEBUFFER,k);for(let dt=0;dt<Se;dt++)Yn?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Et.__webglTexture,V,Ke+dt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Et.__webglTexture,V),ot?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,un.__webglTexture,xe,It+dt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,un.__webglTexture,xe),V!==0?D.blitFramebuffer(Ae,Ge,be,ge,we,at,be,ge,D.COLOR_BUFFER_BIT,D.NEAREST):ot?D.copyTexSubImage3D(ve,xe,we,at,It+dt,Ae,Ge,be,ge):D.copyTexSubImage2D(ve,xe,we,at,Ae,Ge,be,ge);y.bindFramebuffer(D.READ_FRAMEBUFFER,null),y.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else ot?v.isDataTexture||v.isData3DTexture?D.texSubImage3D(ve,xe,we,at,It,be,ge,Se,ht,Wt,pt.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(ve,xe,we,at,It,be,ge,Se,ht,pt.data):D.texSubImage3D(ve,xe,we,at,It,be,ge,Se,ht,Wt,pt):v.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xe,we,at,be,ge,ht,Wt,pt.data):v.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xe,we,at,pt.width,pt.height,ht,pt.data):D.texSubImage2D(D.TEXTURE_2D,xe,we,at,be,ge,ht,Wt,pt);y.pixelStorei(D.UNPACK_ROW_LENGTH,Jt),y.pixelStorei(D.UNPACK_IMAGE_HEIGHT,tt),y.pixelStorei(D.UNPACK_SKIP_PIXELS,_i),y.pixelStorei(D.UNPACK_SKIP_ROWS,Ui),y.pixelStorei(D.UNPACK_SKIP_IMAGES,hn),xe===0&&L.generateMipmaps&&D.generateMipmap(ve),y.unbindTexture()},this.initRenderTarget=function(v){H.get(v).__webglFramebuffer===void 0&&Z.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Z.setTextureCube(v,0):v.isData3DTexture?Z.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Z.setTexture2DArray(v,0):Z.setTexture2D(v,0),y.unbindTexture()},this.resetState=function(){J=0,K=0,ie=null,y.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};var jo=class extends On{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new ii;e.deleteAttribute("uv");let t=new vt({side:Gt}),i=new vt,s=new _r(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new je(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new sn(e,i,6),o=new Lt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new je(e,Os(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new je(e,Os(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let d=new je(e,Os(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);let u=new je(e,Os(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new je(e,Os(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let p=new je(e,Os(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Os(n){return new pr({color:0,emissive:16777215,emissiveIntensity:n})}var Bs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var mi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},ux=new Gi(-1,1,1,-1,0,1),Rc=class extends Ht{constructor(){super(),this.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new gt([0,2,0,0,2,0],2))}},dx=new Rc,Cn=class{constructor(e){this._mesh=new je(dx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ux)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Qo=class extends mi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Li.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Cn(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var zr=class extends mi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},el=class extends mi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var tl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let i=e.getSize(new Be);this._width=i.width,this._height=i.height,t=new At(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Bt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qo(Bs),this.copyPass.material.blending=Dt,this.timer=new vr}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}zr!==void 0&&(a instanceof zr?i=!0:a instanceof el&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new Be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var il=class extends mi{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Oe}render(e,t,i){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var nl=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,c=Math.floor(e+o),l=Math.floor(t+o),d=(3-Math.sqrt(3))/6,u=(c+l)*d,f=c-u,p=l-u,x=e-f,h=t-p,g,m;x>h?(g=1,m=0):(g=0,m=1);let S=x-g+d,C=h-m+d,b=x-1+2*d,w=h-1+2*d,M=c&255,A=l&255,_=this.perm[M+this.perm[A]]%12,E=this.perm[M+g+this.perm[A+m]]%12,R=this.perm[M+1+this.perm[A+1]]%12,I=.5-x*x-h*h;I<0?i=0:(I*=I,i=I*I*this._dot(this.grad3[_],x,h));let U=.5-S*S-C*C;U<0?s=0:(U*=U,s=U*U*this._dot(this.grad3[E],S,C));let B=.5-b*b-w*w;return B<0?r=0:(B*=B,r=B*B*this._dot(this.grad3[R],b,w)),70*(i+s+r)}noise3d(e,t,i){let s,r,a,o,l=(e+t+i)*.3333333333333333,d=Math.floor(e+l),u=Math.floor(t+l),f=Math.floor(i+l),p=1/6,x=(d+u+f)*p,h=d-x,g=u-x,m=f-x,S=e-h,C=t-g,b=i-m,w,M,A,_,E,R;S>=C?C>=b?(w=1,M=0,A=0,_=1,E=1,R=0):S>=b?(w=1,M=0,A=0,_=1,E=0,R=1):(w=0,M=0,A=1,_=1,E=0,R=1):C<b?(w=0,M=0,A=1,_=0,E=1,R=1):S<b?(w=0,M=1,A=0,_=0,E=1,R=1):(w=0,M=1,A=0,_=1,E=1,R=0);let I=S-w+p,U=C-M+p,B=b-A+p,P=S-_+2*p,k=C-E+2*p,J=b-R+2*p,K=S-1+3*p,ie=C-1+3*p,X=b-1+3*p,W=d&255,j=u&255,le=f&255,me=this.perm[W+this.perm[j+this.perm[le]]]%12,qe=this.perm[W+w+this.perm[j+M+this.perm[le+A]]]%12,Le=this.perm[W+_+this.perm[j+E+this.perm[le+R]]]%12,ze=this.perm[W+1+this.perm[j+1+this.perm[le+1]]]%12,Y=.6-S*S-C*C-b*b;Y<0?s=0:(Y*=Y,s=Y*Y*this._dot3(this.grad3[me],S,C,b));let Q=.6-I*I-U*U-B*B;Q<0?r=0:(Q*=Q,r=Q*Q*this._dot3(this.grad3[qe],I,U,B));let de=.6-P*P-k*k-J*J;de<0?a=0:(de*=de,a=de*de*this._dot3(this.grad3[Le],P,k,J));let Ce=.6-K*K-ie*ie-X*X;return Ce<0?o=0:(Ce*=Ce,o=Ce*Ce*this._dot3(this.grad3[ze],K,ie,X)),32*(s+r+a+o)}noise4d(e,t,i,s){let r=this.grad4,a=this.simplex,o=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20,d,u,f,p,x,h=(e+t+i+s)*c,g=Math.floor(e+h),m=Math.floor(t+h),S=Math.floor(i+h),C=Math.floor(s+h),b=(g+m+S+C)*l,w=g-b,M=m-b,A=S-b,_=C-b,E=e-w,R=t-M,I=i-A,U=s-_,B=E>R?32:0,P=E>I?16:0,k=R>I?8:0,J=E>U?4:0,K=R>U?2:0,ie=I>U?1:0,X=B+P+k+J+K+ie,W=a[X][0]>=3?1:0,j=a[X][1]>=3?1:0,le=a[X][2]>=3?1:0,me=a[X][3]>=3?1:0,qe=a[X][0]>=2?1:0,Le=a[X][1]>=2?1:0,ze=a[X][2]>=2?1:0,Y=a[X][3]>=2?1:0,Q=a[X][0]>=1?1:0,de=a[X][1]>=1?1:0,Ce=a[X][2]>=1?1:0,ye=a[X][3]>=1?1:0,Pe=E-W+l,ft=R-j+l,Ve=I-le+l,Ye=U-me+l,Qe=E-qe+2*l,He=R-Le+2*l,st=I-ze+2*l,bt=U-Y+2*l,Ft=E-Q+3*l,ct=R-de+3*l,yt=I-Ce+3*l,D=U-ye+3*l,Ct=E-1+4*l,et=R-1+4*l,T=I-1+4*l,y=U-1+4*l,O=g&255,H=m&255,Z=S&255,se=C&255,oe=o[O+o[H+o[Z+o[se]]]]%32,$=o[O+W+o[H+j+o[Z+le+o[se+me]]]]%32,te=o[O+qe+o[H+Le+o[Z+ze+o[se+Y]]]]%32,ce=o[O+Q+o[H+de+o[Z+Ce+o[se+ye]]]]%32,Te=o[O+1+o[H+1+o[Z+1+o[se+1]]]]%32,ae=.6-E*E-R*R-I*I-U*U;ae<0?d=0:(ae*=ae,d=ae*ae*this._dot4(r[oe],E,R,I,U));let re=.6-Pe*Pe-ft*ft-Ve*Ve-Ye*Ye;re<0?u=0:(re*=re,u=re*re*this._dot4(r[$],Pe,ft,Ve,Ye));let Me=.6-Qe*Qe-He*He-st*st-bt*bt;Me<0?f=0:(Me*=Me,f=Me*Me*this._dot4(r[te],Qe,He,st,bt));let Re=.6-Ft*Ft-ct*ct-yt*yt-D*D;Re<0?p=0:(Re*=Re,p=Re*Re*this._dot4(r[ce],Ft,ct,yt,D));let Ue=.6-Ct*Ct-et*et-T*T-y*y;return Ue<0?x=0:(Ue*=Ue,x=Ue*Ue*this._dot4(r[Te],Ct,et,T,y)),27*(d+u+f+p+x)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,s){return e[0]*t+e[1]*i+e[2]*s}_dot4(e,t,i,s,r){return e[0]*t+e[1]*i+e[2]*s+e[3]*r}};var Vr={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Be},cameraProjectionMatrix:{value:new it},cameraInverseProjectionMatrix:{value:new it},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		#ifdef USE_REVERSED_DEPTH_BUFFER

			const float depthThreshold = 0.0;

		#else

			const float depthThreshold = 1.0;

		#endif

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == depthThreshold ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},Hr={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Gr={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Be}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};var Wr=class n extends mi{constructor(e,t,i=512,s=512,r=32){super(),this.width=i,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();let a=new Hi;a.format=Xi,a.type=An,this.normalRenderTarget=new At(this.width,this.height,{minFilter:Tt,magFilter:Tt,type:Bt,depthTexture:a}),this.ssaoRenderTarget=new At(this.width,this.height,{type:Bt,depthBuffer:!1}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Rt({defines:Object.assign({},Vr.defines),uniforms:Li.clone(Vr.uniforms),vertexShader:Vr.vertexShader,fragmentShader:Vr.fragmentShader,blending:Dt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new fr,this.normalMaterial.blending=Dt,this.blurMaterial=new Rt({defines:Object.assign({},Gr.defines),uniforms:Li.clone(Gr.uniforms),vertexShader:Gr.vertexShader,fragmentShader:Gr.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Rt({defines:Object.assign({},Hr.defines),uniforms:Li.clone(Hr.uniforms),vertexShader:Hr.vertexShader,fragmentShader:Hr.fragmentShader,blending:Dt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Rt({uniforms:Li.clone(Bs.uniforms),vertexShader:Bs.vertexShader,fragmentShader:Bs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:io,blendDst:Mr,blendEquation:Wi,blendSrcAlpha:to,blendDstAlpha:Mr,blendEquationAlpha:Wi}),this._fsQuad=new Cn(null),this._originalClearColor=new Oe}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case n.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Dt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Dt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Dt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=eo,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){let t=this.kernel;for(let i=0;i<e;i++){let s=new F;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=i/e;r=lc.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){let i=new nl,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){let o=Math.random()*2-1,c=Math.random()*2-1,l=0;r[a]=i.noise3d(o,c,l)}this.noiseTexture=new nn(r,4,4,Cs,ri),this.noiseTexture.wrapS=tn,this.noiseTexture.wrapT=tn,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}};Wr.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};var Xr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var sl=class extends mi{constructor(){super(),this.isOutputPass=!0,this.uniforms=Li.clone(Xr.uniforms),this.material=new Ss({name:Xr.name,uniforms:this.uniforms,vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader}),this._fsQuad=new Cn(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===nt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Sr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===wr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Er?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===zn?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ar?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Rr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Tr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var qr=new F;function wi(n,e,t,i,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;qr.copy(e),qr[i]=0,qr.normalize();let l=.5*a/(a+o),d=1-qr.angleTo(n)/c;return Math.sign(qr[t])===1?d*l:o/(a+o)+l+l*(1-d)}var rl=class n extends ii{constructor(e=1,t=1,i=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,i/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let c=new F,l=new F,d=new F(e,t,i).divideScalar(2).subScalar(r),u=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,x=u.length/6,h=new F,g=.5/a;for(let m=0,S=0;m<u.length;m+=3,S+=2)switch(c.fromArray(u,m),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),u[m+0]=d.x*Math.sign(c.x)+l.x*r,u[m+1]=d.y*Math.sign(c.y)+l.y*r,u[m+2]=d.z*Math.sign(c.z)+l.z*r,f[m+0]=l.x,f[m+1]=l.y,f[m+2]=l.z,Math.floor(m/x)){case 0:h.set(1,0,0),p[S+0]=wi(h,l,"z","y",r,i),p[S+1]=1-wi(h,l,"y","z",r,t);break;case 1:h.set(-1,0,0),p[S+0]=1-wi(h,l,"z","y",r,i),p[S+1]=1-wi(h,l,"y","z",r,t);break;case 2:h.set(0,1,0),p[S+0]=1-wi(h,l,"x","z",r,e),p[S+1]=wi(h,l,"z","x",r,i);break;case 3:h.set(0,-1,0),p[S+0]=1-wi(h,l,"x","z",r,e),p[S+1]=1-wi(h,l,"z","x",r,i);break;case 4:h.set(0,0,1),p[S+0]=1-wi(h,l,"x","y",r,e),p[S+1]=1-wi(h,l,"y","x",r,t);break;case 5:h.set(0,0,-1),p[S+0]=wi(h,l,"x","y",r,e),p[S+1]=1-wi(h,l,"y","x",r,t);break}}static fromJSON(e){return new n(e.width,e.height,e.depth,e.segments,e.radius)}};function Xu(n,e=!1){let t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,c=new Ht,l=0;for(let d=0;d<n.length;++d){let u=n[d],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+d+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,d),l+=p}}if(t){let d=0,u=[];for(let f=0;f<n.length;++f){let p=n[f].index;for(let x=0;x<p.count;++x)u.push(p.getX(x)+d);d+=n[f].attributes.position.count}c.setIndex(u)}for(let d in r){let u=Wu(r[d]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" attribute."),null;c.setAttribute(d,u)}for(let d in a){let u=a[d][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[d]=[];for(let f=0;f<u;++f){let p=[];for(let h=0;h<a[d].length;++h)p.push(a[d][h][f]);let x=Wu(p);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+d+" morphAttribute."),null;c.morphAttributes[d].push(x)}}}return c}function Wu(n){let e,t,i,s=-1,r=0;for(let l=0;l<n.length;++l){let d=n[l];if(e===void 0&&(e=d.array.constructor),e!==d.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=d.itemSize),t!==d.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=d.normalized),i!==d.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=d.gpuType),s!==d.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=d.count*t}let a=new e(r),o=new Qt(a,t,i),c=0;for(let l=0;l<n.length;++l){let d=n[l];if(d.isInterleavedBufferAttribute){let u=c/t;for(let f=0,p=d.count;f<p;f++)for(let x=0;x<t;x++){let h=d.getComponent(f,x);o.setComponent(f+u,x,h)}}else a.set(d.array,c);c+=d.count*t}return s!==void 0&&(o.gpuType=s),o}var Je=.02,on={ivory:new vt({color:15986399,roughness:.43,metalness:.15}),pale:new vt({color:11913162,roughness:.5,metalness:.35}),teal:new vt({color:1206392,roughness:.33,metalness:.42}),dark:new vt({color:2506313,roughness:.48,metalness:.62}),rubber:new vt({color:1649458,roughness:.9,metalness:.04}),steel:new vt({color:11056308,roughness:.31,metalness:.78}),orange:new vt({color:14648861,roughness:.44,metalness:.28}),red:new vt({color:12997949,roughness:.4,metalness:.32}),copper:new vt({color:11038535,roughness:.34,metalness:.68}),floor:new vt({color:12106672,roughness:.83,metalness:.08}),floor2:new vt({color:10267816,roughness:.78,metalness:.12}),cyan:new vt({color:8709358,emissive:4703446,emissiveIntensity:1.5,roughness:.28,metalness:.25}),amber:new vt({color:16765560,emissive:16233287,emissiveIntensity:1.15,roughness:.25,metalness:.22}),eye:new vt({color:16748913,emissive:16730422,emissiveIntensity:1.1,roughness:.28}),mint:new vt({color:11071445,emissive:6806434,emissiveIntensity:.7,roughness:.3}),white:new vt({color:16777215,roughness:.6}),distant:new vt({color:10402501,roughness:1})},Yr=new Uint8Array(16384*4),Cc=74;for(let n=0;n<16384;n++){Cc=Math.imul(Cc,1664525)+1013904223>>>0;let e=157+Cc%36;Yr[n*4]=Yr[n*4+1]=Yr[n*4+2]=e,Yr[n*4+3]=255}var Wn=new nn(Yr,128,128,ai);Wn.wrapS=Wn.wrapT=tn;Wn.repeat.set(6,6);Wn.needsUpdate=!0;on.floor.bumpMap=Wn;on.floor.bumpScale=.026;on.floor2.bumpMap=Wn;on.floor2.bumpScale=.025;on.steel.roughnessMap=Wn;var kt=class{buckets=new Map;add(e,t,i=0,s=0,r=0,a=0,o=0,c=0){let l=typeof t=="string"?on[t]:t,d=e.index?e.toNonIndexed():e;d.applyMatrix4(new it().compose(new F(i,s,r),new di().setFromEuler(new Si(a,o,c)),new F(1,1,1))),d!==e&&e.dispose();let u=this.buckets.get(l)??[];u.push(d),this.buckets.set(l,u)}box(e,t,i,s,r=0,a=0,o=0,c=.04,l=0){this.add(new rl(e,t,i,2,Math.min(c,e*.24,t*.24,i*.24)),s,r,a,o,0,l)}cyl(e,t,i,s=0,r=0,a=0,o=0,c=0,l=16){this.add(new rn(e,e,t,l,1),i,s,r,a,o,0,c)}cone(e,t,i,s=0,r=0,a=0){this.add(new rn(e*.7,e,t,12),i,s,r,a)}torus(e,t,i,s=0,r=0,a=0,o=Math.PI/2,c=0){this.add(new Bn(e,t,6,32),i,s,r,a,o,c)}rod(e,t,i,s){let r=t.clone().sub(e),a=new rn(i,i,r.length(),8);a.applyMatrix4(new it().makeRotationFromQuaternion(new di().setFromUnitVectors(new F(0,1,0),r.normalize())));let o=e.clone().add(t).multiplyScalar(.5);this.add(a,s,o.x,o.y,o.z)}finish(){let e=new ui;for(let[t,i]of this.buckets){let s=Xu(i,!1);for(let a of i)a.dispose();if(!s)throw Error("Geometry merge failed");let r=new je(s,t);r.castShadow=!0,r.receiveShadow=!0,e.add(r)}return this.buckets.clear(),e}};function Ic(n,e,t,i=.24){n.cyl(i,.19,"rubber",e,i,t,Math.PI/2),n.cyl(i*.77,.21,"pale",e,i,t,Math.PI/2),n.cyl(i*.58,.22,"dark",e,i,t,Math.PI/2),n.cyl(i*.3,.24,"teal",e,i,t,Math.PI/2),n.cyl(i*.11,.26,"steel",e,i,t,Math.PI/2);for(let s=0;s<8;s++){let r=s/8*Math.PI*2;n.box(.06,.065,.21,"rubber",e+Math.cos(r)*i,i+Math.sin(r)*i,t,.008)}for(let s=0;s<4;s++){let r=s*Math.PI/2;n.cyl(.022,.24,"steel",e+Math.cos(r)*i*.48,i+Math.sin(r)*i*.48,t,Math.PI/2,0,6)}}function al(n,e,t,i,s=.17,r=!1){n.cyl(s+.08,.1,"dark",e,t,i,0,Math.PI/2),n.cyl(s,.13,r?"eye":"amber",e+.018,t,i,0,Math.PI/2)}function qu(){let n=new kt;for(let u of[-.39,.39])for(let f of[-.51,.51])Ic(n,u,f,.3),n.box(.55,.19,.28,"teal",u,.58,f,.055),n.rod(new F(u-.12,.4,f),new F(u+.08,.7,f*.7),.04,"steel");n.box(1.17,.23,.82,"dark",0,.42,0,.08),n.box(.78,.62,.72,"ivory",-.05,.84,0,.12),n.box(.33,.5,.76,"teal",-.38,.76,0,.08),n.box(.58,.2,.57,"ivory",.03,1.15,0,.08),n.box(.1,.34,.43,"dark",.4,.84,0,.03),al(n,.48,.87,0,.19);for(let u of[-.68,.68])n.cyl(.17,.23,"dark",-.02,.82,u,Math.PI/2),n.cyl(.11,.25,"steel",-.02,.82,u,Math.PI/2),n.cyl(.055,.26,"orange",-.02,.82,u,Math.PI/2),n.box(.64,.18,.18,"dark",.26,.78,u,.055),n.rod(new F(.02,.89,u),new F(.56,.8,u),.035,"steel"),n.box(.18,.46,.36,"teal",.65,.77,u,.04),n.box(.44,.16,.12,"ivory",.82,.93,u-.12,.025),n.box(.44,.16,.12,"ivory",.82,.61,u+.12,.025),n.box(.07,.15,.13,"cyan",1.05,.93,u-.12,.015),n.box(.07,.15,.13,"cyan",1.05,.61,u+.12,.015);for(let u of[-.25,.25])n.box(.18,.08,.08,"cyan",-.38,1.1,u,.02);for(let u=0;u<5;u++)n.box(.08,.36,.045,"steel",-.5,.86,(u-2)*.115,.01);n.box(.5,.07,.6,"dark",-.12,1.23,0,.025),n.box(.28,.09,.43,"ivory",-.03,1.29,0,.04),n.box(.08,.04,.28,"orange",-.02,1.36,0,.01);for(let u of[-.4,.4])n.cyl(.05,.16,"copper",-.19,1.13,u),n.box(.23,.16,.04,"teal",.05,.91,u,.025);let e=n.finish();e.name="player";let t=new kt;for(let u of[-.6,.6])t.box(.6,.15,.22,"ivory",-.2,1.25,u,.05),t.cyl(.13,.14,"cyan",-.2,1.38,u);let i=t.finish();i.name="evolution",i.visible=!1,e.add(i);let s=(u,f)=>{let p=f.finish();p.name="kit-"+u,p.visible=!1,e.add(p)},r=new kt;for(let u of[-.9,.9])r.box(.34,.12,.52,"ivory",-.12,1.02,u,.04),r.torus(.24,.065,"copper",-.12,1.13,u),r.cyl(.14,.09,"cyan",-.12,1.13,u);s("swarm",r);let a=new kt;for(let u of[-.35,.35])a.box(1.12,.17,.17,"dark",.71,1.03,u,.035),a.box(.94,.07,.19,"ivory",.72,1.17,u,.022),a.box(.76,.045,.06,"cyan",.8,1.1,u,.012),a.cyl(.1,.16,"copper",.27,1.08,u,0,Math.PI/2);s("lance",a);let o=new kt;for(let u of[-1.05,1.05])o.rod(new F(-.2,.85,u*.6),new F(-.5,1.1,u),.055,"steel"),o.box(.62,.24,.23,"ivory",-.48,1.13,u,.055),o.box(.37,.1,.25,"cyan",-.48,1.23,u,.022);s("satellite",o);let c=new kt;c.cyl(.22,.2,"dark",-.2,1.48,0),c.torus(.61,.075,"teal",-.2,1.58,0),c.torus(.51,.027,"cyan",-.2,1.6,0);for(let u=0;u<4;u++){let f=u*Math.PI/2;c.box(.25,.11,.13,"ivory",-.2+Math.cos(f)*.6,1.59,Math.sin(f)*.6,.025,f)}s("cyclone",c);let l=new kt;for(let u of[-.57,.57]){l.cyl(.19,.59,"dark",-.5,1.26,u),l.cyl(.14,.43,"amber",-.5,1.31,u);for(let f of[1.08,1.24,1.4])l.torus(.19,.025,"copper",-.5,f,u);l.box(.52,.23,.16,"orange",.56,.78,u,.055)}s("foundry",l);let d=new kt;for(let u of[-.71,.71])d.torus(.3,.07,"ivory",.19,1.16,u,0,Math.PI/2),d.torus(.23,.035,"cyan",.2,1.16,u,0,Math.PI/2),d.box(.62,.08,.08,"copper",.43,1.32,u,.015);return s("return",d),e}function Yu(n){let e=new kt;if(n==="carrier"){for(let i of[-.72,.72]){e.box(2.25,.52,.42,"rubber",0,.36,i,.15);for(let s of[-.8,-.4,0,.4,.8])Ic(e,s,i,.26);e.box(2.2,.18,.56,"red",0,.75,i,.07)}e.box(2.15,.72,1.1,"dark",0,.82,0,.14),e.box(1.24,.58,1.03,"red",.53,1.28,0,.12),e.box(.7,.65,1.05,"orange",-.55,1.27,0,.09),e.box(.14,.66,1.3,"ivory",1.1,1,0,.06),al(e,1.2,1.2,0,.2);for(let i of[-.31,.31])e.box(.62,.77,.25,"dark",-.53,1.86,i,.06),e.box(.35,.6,.12,"cyan",-.54,1.92,i+Math.sign(i)*.16,.04);for(let i of[-.6,-.25,.1])e.cyl(.19,.7,"copper",i,1.7,0,Math.PI/2)}else if(n==="controller"||n==="elite"){e.cyl(n==="elite"?.95:1.16,.3,"dark",0,.25,0),e.cyl(.64,.7,"ivory",0,.72,0),e.cyl(.46,.82,"copper",0,.9,0);for(let i=0;i<6;i++){let s=i/6*Math.PI*2,r=Math.cos(s)*.83,a=Math.sin(s)*.83;e.box(.38,1.35,.36,"ivory",r,1.05,a,.07,s),e.box(.12,.9,.12,"cyan",r*1.08,1.12,a*1.08,.02),e.cyl(.19,.18,"orange",r,1.83,a)}for(let i of[.6,.83,1.06,1.29])e.torus(.48,.04,"copper",0,i,0);e.cyl(.35,.8,"cyan",0,1.21,0),e.torus(.95,.065,"dark",0,1.63,0)}else if(n==="support"){for(let i of[-.38,.38])Ic(e,0,i,.23);e.box(.64,.48,.6,"ivory",0,.54,0,.12),e.cyl(.13,.66,"steel",0,1.06,0),e.box(.75,.25,.32,"teal",0,1.41,0,.06),e.box(.23,.7,.32,"teal",0,1.41,0,.06),e.box(.6,.1,.34,"mint",0,1.42,0,.03),e.box(.11,.57,.34,"mint",0,1.42,0,.03),al(e,.38,.64,0,.12,!0)}else{let i=n==="heavy"||n==="shield",s=i?1.2:1;for(let c of[-.43,.43])e.box(.78,.23,.32,"dark",-.03,.21,c,.08),e.box(.3,.12,.35,"red",.26,.3,c,.05),e.cyl(.18,.35,"steel",-.1,.49,c,Math.PI/2),e.cyl(.08,.37,"dark",-.1,.49,c,Math.PI/2),e.box(.25,.39,.22,"red",-.12,.66,c,.065),e.rod(new F(-.23,.4,c),new F(.16,.82,c*.82),.045,"steel");e.box(.81,.53,.64,"red",.01,.94,0,.1),e.box(.45,.12,.56,"ivory",-.05,1.25,0,.04),e.box(.27,.4,.7,"dark",-.32,.91,0,.04),al(e,.46,.98,0,.19,!0),e.box(.58,.1,.64,"dark",0,.62,0,.035);for(let c=0;c<4;c++)e.box(.06,.27,.07,"copper",-.49,.92,(c-1.5)*.14,.01);for(let c of[-.32,.32])e.cyl(.045,.05,"steel",.11,1.26,c);if(n==="gunner")for(let c of[-.3,.3])e.box(.95,.16,.15,"dark",.58,1.05,c,.03),e.box(.8,.05,.17,"orange",.57,1.16,c,.02),e.cyl(.06,.1,"eye",1.11,1.05,c,0,Math.PI/2);if(n==="charger"){e.box(.93,.18,.53,"orange",.1,1.22,0,.05);for(let c of[-.27,.27])e.box(.45,.26,.13,"dark",.65,.66,c,.03)}let r=e.finish();r.scale.setScalar(s);let a=new kt;a.box(.16,.97,1.13,"red",.67,.77,0,.08),a.box(.08,.73,.8,"orange",.78,.8,0,.04),a.box(.1,.6,.08,"amber",.84,.84,0,.02);let o=a.finish();return o.name="shield",o.visible=n==="shield",r.add(o),r}let t=e.finish();if(n==="controller"||n==="elite"){let i=new kt;for(let r=0;r<6;r++){let a=r/6*Math.PI*2,o=Math.cos(a)*.68,c=Math.sin(a)*.68;i.box(.47,1.15,.18,"ivory",o,1.04,c,.045,-a+Math.PI/2),i.box(.37,.15,.2,"orange",o,.6,c,.025,-a+Math.PI/2)}let s=i.finish();s.name="boss-shutters",t.add(s)}return t}function Zu(){let n=new kt;n.cyl(.56,.18,"dark",0,.13,0),n.cyl(.37,.9,"copper",0,.61,0);for(let e of[.36,.54,.72,.9])n.torus(.4,.025,"steel",0,e,0);for(let e of[-.3,.3])n.box(.42,.95,.13,"ivory",0,.63,e,.04);return n.box(.17,.76,.14,"cyan",0,.65,.4,.03),n.box(.17,.76,.14,"cyan",0,.65,-.4,.03),n.cyl(.38,.16,"teal",0,1.18,0),n.finish()}function Ju(n){let e=new kt;if(n===0){e.box(.35,.08,.27,"steel",0,0,0,.035);for(let t of[-.12,.12])for(let i of[-.08,.08])e.cyl(.022,.04,"steel",t,.06,i,0,0,6)}else if(n===1)e.box(.09,.2,.48,"steel",0,0,0,.012),e.box(.26,.06,.48,"steel",0,.11,0,.012),e.box(.26,.06,.48,"steel",0,-.11,0,.012);else{e.box(.31,.065,.31,"steel",0,-.07,0,.02);for(let t of[-.12,.12])e.box(.07,.22,.31,"steel",t,.025,0,.02);e.cyl(.05,.06,"steel",0,-.01,0,0,0,8)}return e.finish().children[0].geometry}function Ku(n,e,t,i){let s=n*Je,r=e*Je,a=new kt;a.box(s+1.3,1.5,r+1.3,"dark",0,-.82,0,.13),a.box(s+1.12,.21,r+1.1,"pale",0,-.02,0,.06);for(let x of[-r/2-.68,r/2+.68]){a.box(s+1.3,.18,.15,"orange",0,-.72,x,.03),a.box(s+1.3,.18,.18,"steel",0,-1.48,x,.025);for(let h=-s/2;h<s/2;h+=1.25){a.box(.72,.73,.1,"teal",h,-.78,x,.04);for(let g=0;g<4;g++)a.box(.53,.06,.13,"dark",h,-.55-g*.14,x,.01);a.cyl(.035,.08,"steel",h-.36,-.36,x,Math.PI/2)}}for(let x of[-s/2-.63,s/2+.63]){a.box(.14,1.15,r,"teal",x,-.81,0,.03);for(let h=-r/2;h<r/2;h+=1.8)a.box(.18,1.43,.2,"orange",x,-.88,h,.025),a.rod(new F(x,-.2,h),new F(x,-1.5,h+1.55),.085,"steel")}let o=Math.ceil(s/2.4),c=Math.ceil(r/2.4),l=s/o,d=r/c;for(let x=0;x<o;x++)for(let h=0;h<c;h++)a.box(l-.025,.11,d-.025,(x+h+i)%5===0?"floor2":"floor",(x+.5)*l-s/2,.15,(h+.5)*d-r/2,.018);for(let x of[-r/2-.16,r/2+.16])a.box(s,.05,.15,"dark",0,.25,x,.01),a.box(s,.015,.04,"orange",0,.282,x-.13,.005);for(let x of[-s/2-.16,s/2+.16])a.box(.15,.05,r,"dark",x,.25,0,.01),a.box(.04,.015,r,"orange",x-.13,.282,0,.005);for(let x=-s/2+.7;x<s/2;x+=1.7){for(let h of[-r/2-.5,r/2+.5])a.box(.55,.5,.32,"pale",x,-.53,h,.025),a.box(.26,.22,.36,"dark",x,-.5,h,.02);x%2<1&&a.box(.22,.014,.58,"orange",x,.22,r/2-.34,.008,-.5)}for(let x of[-s/2+.3,s/2-.3])for(let h=-r/2+.5;h<r/2;h+=.6)a.box(.16,.02,.04,"steel",x,.235,h,.005);let u=-r/2-1.4;for(let x of[-s/2-.5,s/2+.5]){a.box(.55,1.1,r+1.1,"dark",x,-.55,0,.1);for(let h=-r/2;h<r/2;h+=1.8)a.box(.22,.75,.22,"teal",x,.1,h,.02),a.box(.1,.1,1.82,"orange",x,.45,h+.85,.02)}for(let x of[-s/2+1.2,s/2-1.2])if(a.box(1.3,.38,1.5,"dark",x,.06,u,.06),a.box(.7,3.55,.72,t==="C"?"ivory":"orange",x,1.78,u,.09),a.box(.78,.18,.83,"dark",x,1.2,u,.025),a.box(.78,.18,.83,"dark",x,2.5,u,.025),t==="C"){for(let h=.7;h<3.2;h+=.3)a.torus(.42,.055,"copper",x,h,u);a.box(.1,2.2,.13,"cyan",x,1.8,u+.43,.02)}else a.box(.28,2.3,.06,"dark",x,1.75,u+.38,.02);if(t!=="C"){a.box(s-1.2,.66,.9,"orange",0,3.72,u,.08),a.box(s-1.6,.2,1.01,"dark",0,3.6,u,.04);let x=-s*.12+i*.4;a.box(1.4,.48,1.08,"teal",x,3.1,u,.08),a.cyl(.032,1.2,"dark",x,2.35,u),a.torus(.17,.055,"steel",x,1.68,u,0)}let f=(x,h,g)=>{a.cyl(.83,g,"ivory",x,g/2,h),a.cyl(.88,.25,"orange",x,g*.75,h),a.cyl(.88,.22,"teal",x,g*.2,h),a.cone(.88,.3,"pale",x,g+.1,h);for(let m of[-.45,.45])a.box(.1,g,.1,"dark",x+m,g/2,h+.82,.025)};f(-s/2-1.9,u+.85,3.5),f(s/2+1.7,u+1.8,2.9);for(let x=0;x<4;x++){let h=(x-1.5)*1.6,g=u-.08,m=.65+x%2*.35;a.box(1.25,m,.8,x%2?"teal":"ivory",h,m/2,g,.055);for(let S of[-.5,.5])a.box(.06,m+.06,.88,"dark",h+S,m/2,g,.01)}for(let x of[-s/2-1.2,s/2+1.25])for(let h=0;h<3;h++){let g=(h-1)*2.3;a.box(.65,.7,.9,"teal",x,.35,g,.08);for(let m=0;m<4;m++)a.box(.7,.04,.07,"dark",x,.3+m*.1,g+.47,.01)}for(let x=0;x<8;x++){let h=(x%4-1.5)*(s*.7),g=-r-7-Math.floor(x/4)*6,m=3+x*7%5;a.box(2.5,m,2.7,"distant",h,m/2-4,g,.15),a.cyl(.35,m+1,"distant",h+.9,m/2-3,g+.7)}for(let x of[-s/2,s/2])a.box(.95,6,1.1,"dark",x,-4,r/2-.4,.1),a.box(1.15,.35,1.35,"orange",x,-2.4,r/2-.4,.05),a.rod(new F(x,-1.4,r/2-.4),new F(x>0?x-2.6:x+2.6,-4.4,r/2-.4),.2,"teal");for(let x=0;x<5;x++){let h=(x-2)*3.3,g=-r/2-4.5;a.box(1.6,.16,2.3,"distant",h,-1,g,.02),a.cyl(.32,2.2,"distant",h,-.2,g),a.box(.15,.15,3.8,"distant",h,-.9,g+1.8,.02)}let p=a.finish();return p.name="environment",p}var gi=new Lt,Pc=new F,Zb=new F,$u=new F(0,1,0),fx=(n,e)=>{if(!n.length)return 0;let t=[...n].sort((i,s)=>i-s);return t[Math.floor((t.length-1)*e)]},ol=class{constructor(e,t){this.canvas=e;this.world=t;this.renderer=new Jo({canvas:e,antialias:!0,alpha:!1,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.outputColorSpace=$t,this.renderer.toneMapping=zn,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kn,this.scene.background=new Oe(12244190),this.scene.fog=new ar(12244190,45,95);let i=new Us(this.renderer),s=new jo;this.scene.environment=i.fromScene(s,.08).texture,s.dispose(),i.dispose(),this.scene.environmentIntensity=.28,this.scene.add(new gr(14479359,6708041,1.1));let r=new Es(16768940,3);r.position.set(-10,19,11),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),Object.assign(r.shadow.camera,{left:-20,right:20,top:20,bottom:-20,near:1,far:70}),r.shadow.camera.updateProjectionMatrix(),r.shadow.bias=-3e-4,r.shadow.normalBias=.022,r.shadow.radius=3,this.scene.add(r);let a=new Es(10473451,.7);a.position.set(10,5,-8),this.scene.add(a),this.composer=new tl(this.renderer,new At(1,1,{type:Bt,samples:4})),this.composer.addPass(new il(this.scene,this.camera)),this.ao=new Wr(this.scene,this.camera,512,512,16),this.ao.kernelRadius=.56,this.ao.minDistance=2e-4,this.ao.maxDistance=.048,this.composer.addPass(this.ao),this.composer.addPass(new sl),this.renderer.info.autoReset=!1,this.scene.add(this.player,this.actorRoot,this.relayRoot,this.signals);for(let c=0;c<3;c++){let l=new sn(Ju(c),on.steel,70);l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!1,this.scraps.push(l),this.scene.add(l)}this.accents=new sn(new ii(.18,.035,.13),on.cyan,70),this.accents.frustumCulled=!1,this.scene.add(this.accents),this.sparks=new sn(new ii(1,1,1),new fi({color:16777215,transparent:!0,opacity:.86}),220),this.sparks.frustumCulled=!1,this.sparks.instanceMatrix.setUsage(sc),this.scene.add(this.sparks),this.aim=new je(new ii(1,.018,.045),new fi({color:817038,transparent:!0,opacity:.75,depthWrite:!1})),this.scene.add(this.aim),this.lane=new je(new vn(1,1),new fi({color:16736575,transparent:!0,opacity:.24,side:ni,depthWrite:!1})),this.lane.rotation.x=-Math.PI/2,this.scene.add(this.lane),this.field=new je(new Bn(1,.017,5,72),new fi({color:6810367,transparent:!0,opacity:.52,depthWrite:!1})),this.field.rotation.x=-Math.PI/2,this.scene.add(this.field);let o=new kt;o.box(.08,.015,.4,"cyan",0,0,0,.005),o.box(.4,.015,.08,"cyan",0,0,0,.005),this.arrows=o.finish(),this.scene.add(this.arrows),this.playerLabel=document.createElement("div"),this.playerLabel.className="player-marker",this.playerLabel.textContent="\u25C6",this.labels.append(this.playerLabel),e.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.contextLost=!0;let l=document.createElement("div");l.className="gpu-notice",l.textContent="\u63CF\u753B\u304C\u505C\u6B62\u3057\u307E\u3057\u305F\u3002\u30DA\u30FC\u30B8\u3092\u518D\u8AAD\u307F\u8FBC\u307F\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4FDD\u5B58\u3067\u304D\u3066\u3044\u306A\u3044\u9032\u884C\u306F\u5931\u308F\u308C\u307E\u3059\u3002 / Graphics interrupted. Reload the page to continue. Unsaved progress will be lost.",document.getElementById("game").append(l)}),this.makeFloor(),this.resize()}canvas;world;renderer;scene=new On;camera=new Gi;cssW=0;cssH=0;dpr=1;scale=1;presentation=!1;previousPresentation=!1;previousView="";previousPaused=!1;sizeKey="";env=null;player=qu();actors=new Map;relays=new Map;models=new Map;ray=new br;plane=new hi($u,0);scraps=[];accents;sparks;aim;lane;field;arrows;signals=new ui;actorRoot=new ui;relayRoot=new ui;frameCount=0;cpu=[];lastLabel=0;dirty=!0;skippedFrames=0;relayLabels=new Map;target=new F;offset=new F(-7,17,20);labels=document.getElementById("world-labels");composer;ao;projector=new F;playerLabel;contextLost=!1;makeFloor(){let e=this.world.width+":"+this.world.height+":"+this.world.mission+":"+this.world.stage;e!==this.sizeKey&&(this.sizeKey=e,this.env&&(this.scene.remove(this.env),this.env.traverse(t=>{t instanceof je&&t.geometry.dispose()})),this.env=Ku(this.world.width,this.world.height,this.world.mission,this.world.stage),this.scene.add(this.env),this.resize())}resize(){this.dirty=!0;let e=this.canvas.getBoundingClientRect();this.cssW=e.width,this.cssH=e.height,this.dpr=Math.min(devicePixelRatio,1.6),this.renderer.setPixelRatio(this.dpr),this.renderer.setSize(e.width,e.height,!1),this.composer.setPixelRatio(this.dpr),this.composer.setSize(e.width,e.height),this.ao.setSize(Math.round(e.width*this.dpr*.7),Math.round(e.height*this.dpr*.7));let t=this.world.width*Je,i=this.world.height*Je,s=e.width/Math.max(1,e.height),r=e.width<700;this.offset.set(r?-1.4:-7,r?22:17,r?18:20);let a=Math.atan2(Math.abs(this.offset.x),this.offset.z),o=Math.atan2(this.offset.y,Math.hypot(this.offset.x,this.offset.z)),c=t*Math.cos(a)+i*Math.sin(a)+(r?1.4:2.3),l=(i*Math.cos(a)+t*Math.sin(a))*Math.sin(o)+(r?3.8:4.2),d=Math.max(l,c/s),u=this.world.encounter==="choice"&&!this.presentation&&!r;u&&(d*=.48),this.camera.left=-d*s/2,this.camera.right=d*s/2,this.camera.top=d/2,this.camera.bottom=-d/2,this.camera.near=.1,this.camera.far=160,this.target.set(0,.15,-.35),u&&this.target.set((this.world.player.x-this.world.width/2)*Je+3.2,.5,(this.world.player.y-this.world.height/2)*Je+1.1),this.camera.position.copy(this.target).add(this.offset),this.camera.lookAt(this.target),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld(),this.ao.ssaoMaterial.defines.PERSPECTIVE_CAMERA=0,this.ao.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ao.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ao.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.scale=e.width/(this.camera.right-this.camera.left)*Je}project(e,t,i=.4){return this.projector.set((e-this.world.width/2)*Je,i,(t-this.world.height/2)*Je).project(this.camera),{x:(this.projector.x+1)*this.cssW/2,y:(1-this.projector.y)*this.cssH/2}}point(e,t){let i=this.canvas.getBoundingClientRect();this.ray.setFromCamera(new Be((e-i.left)/i.width*2-1,-(t-i.top)/i.height*2+1),this.camera);let s=this.ray.intersectObjects([...this.actors.values()].map(r=>r.group).concat([...this.relays.values()]),!0);for(let r of s){let a=r.object;for(;a&&!a.userData.enemy&&!a.userData.relay;)a=a.parent;if(a?.userData.enemy){let o=a.userData.enemy;if(!o.dead)return{x:o.x,y:o.y}}if(a?.userData.relay){let o=a.userData.relay;return{x:o.x,y:o.y}}}return this.ray.ray.intersectPlane(this.plane,Pc),{x:Pc.x/Je+this.world.width/2,y:Pc.z/Je+this.world.height/2}}position(e,t,i,s=0){e.position.set((t-this.world.width/2)*Je,s,(i-this.world.height/2)*Je)}role(e){return e.role??e.kind}syncActors(){let e=new Set(this.world.enemies.filter(s=>!s.dead).map(s=>s.id));for(let[s,r]of this.actors)e.has(s)||(this.actorRoot.remove(r.group),r.label.remove(),this.actors.delete(s));for(let s of this.world.enemies){if(s.dead)continue;let r=this.role(s),a=this.actors.get(s.id);if(a&&a.role!==r&&(this.actorRoot.remove(a.group),a.label.remove(),this.actors.delete(s.id),a=void 0),!a){let d=this.models.get(r);d||(d=Yu(r),this.models.set(r,d));let u=d.clone(!0),f=document.createElement("div");f.className="enemy-marker",f.innerHTML="<b></b><i><span></span></i>",f.dataset.enemy=String(s.id),this.labels.append(f),a={group:u,label:f,role:r},this.actors.set(s.id,a),this.actorRoot.add(u)}a.group.userData.enemy=s,this.position(a.group,s.x,s.y),a.group.rotation.y=-s.angle,a.group.position.y=(s.spawnIn>0?Math.min(1,s.spawnIn)*1.5:0)+s.recoil*.09;let o=a.group.getObjectByName("shield");o&&(o.visible=s.shield>0&&s.recover<=0);let c=a.group.getObjectByName("boss-shutters");if(c){let d=r==="controller"?s.recover<=0:this.world.stage===5&&this.world.bossLocked||(s.shellGate??0)>0||s.shield>0;c.scale.set(d?1:1.42,1,d?1:1.42),c.position.y=d?0:-.08}let l=r==="heavy"||r==="shield"?1.2:1;a.group.scale.setScalar(l*(1+s.recoil*.035))}let t=this.world.player;this.position(this.player,t.x,t.y,.02),this.player.rotation.y=-t.angle;let i=this.player.getObjectByName("evolution");i&&(i.visible=this.world.evolution>0);for(let s of["swarm","lance","satellite","cyclone","foundry","return"]){let r=this.player.getObjectByName("kit-"+s);r&&(r.visible=this.world.build===s||this.world.form===s)}this.player.scale.set(1+t.kick*.05,1-t.kick*.07,1+t.kick*.03),this.player.position.x-=Math.cos(t.angle)*t.kick*.12,this.player.position.z-=Math.sin(t.angle)*t.kick*.12;for(let[s,r]of this.relays)this.world.relays.some(a=>a.id===s)||(this.relayRoot.remove(r),this.relays.delete(s),this.relayLabels.get(s)?.remove(),this.relayLabels.delete(s));for(let s of this.world.relays){let r=this.relays.get(s.id);if(!r){let a=this.models.get("relay");a||(a=Zu(),this.models.set("relay",a)),r=a.clone(!0),this.relays.set(s.id,r),this.relayRoot.add(r);let o=document.createElement("div");o.className="relay-marker",o.dataset.relay=String(s.id),this.labels.append(o),this.relayLabels.set(s.id,o)}r.userData.relay=s,this.position(r,s.x,s.y),r.scale.setScalar(s.done?.9:1),r.rotation.y=s.done?Math.PI/4:0}}syncMetal(){let e=[0,0,0],t=0;for(let s of this.world.scraps){let r=s.kind%3,a=this.scraps[r],o=e[r];if(o>=70)break;let c=s.mode==="orbit"?.65:s.mode==="shot"?.55:.33;gi.position.set((s.x-this.world.width/2)*Je,c,(s.y-this.world.height/2)*Je),gi.rotation.set(s.mode==="orbit"?.4:0,s.angle,s.mode==="shot"?.2:0),gi.scale.setScalar(1),gi.updateMatrix(),a.setMatrixAt(o,gi.matrix),a.setColorAt(o,new Oe(s.salvaged?12316658:s.kind===2?12425076:11779520)),(s.salvaged||s.mode==="orbit")&&(gi.position.y+=.12,gi.updateMatrix(),this.accents.setMatrixAt(t++,gi.matrix)),e[r]++}this.scraps.forEach((s,r)=>{s.count=e[r],s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0)}),this.accents.count=t,this.accents.instanceMatrix.needsUpdate=!0;let i=0;for(let s of this.world.particles){if(i>=220||s.kind==="smoke")continue;let r=s.life/s.max;gi.position.set((s.x-this.world.width/2)*Je,.42+(1-r)*.7,(s.y-this.world.height/2)*Je),gi.rotation.set(s.angle,s.angle*1.2,0);let a=Math.max(.025,s.size*Je);gi.scale.set(a*2.4,a*.6,a*.6),gi.updateMatrix(),this.sparks.setMatrixAt(i,gi.matrix),this.sparks.setColorAt(i,new Oe(s.color)),i++}this.sparks.count=i,this.sparks.instanceMatrix.needsUpdate=!0,this.sparks.instanceColor&&(this.sparks.instanceColor.needsUpdate=!0)}signalPool=[];beamPool=[];linkPool=[];addSignal(e,t,i,s,r,a){let o=this.signalPool[e];o||(o=new je(new dr(.96,1,64),new fi({transparent:!0,opacity:a,side:ni,depthWrite:!1})),o.rotation.x=-Math.PI/2,this.signalPool[e]=o,this.signals.add(o)),o.visible=!0,this.position(o,t,i,.28),o.scale.setScalar(s*Je),o.material.color.setHex(r),o.material.opacity=a}syncEffects(){let e=this.world,t=e.player,i=e.aim.x-t.x,s=e.aim.y-t.y,r=Math.hypot(i,s)*Je;if(this.aim.visible=e.holding&&!e.over&&!e.paused,this.aim.position.set(((t.x+e.aim.x)/2-e.width/2)*Je,.29,((t.y+e.aim.y)/2-e.height/2)*Je),this.aim.rotation.y=-Math.atan2(s,i),this.aim.scale.set(r,1,1),this.field.visible=e.holding&&!e.over,this.position(this.field,t.x,t.y,.32),this.field.scale.setScalar(e.pullRadius*Je),this.arrows.visible=e.holding,this.position(this.arrows,e.aim.x,e.aim.y,.3),this.lane.visible=!!e.lane&&!e.paused,e.lane){let l=e.lane;this.lane.position.set(l.axis==="x"?(l.position-e.width/2)*Je:0,.265,l.axis==="y"?(l.position-e.height/2)*Je:0),this.lane.scale.set(l.axis==="x"?l.width*Je:e.width*Je,l.axis==="y"?l.width*Je:e.height*Je,1),this.lane.material.opacity=l.telegraph>0?.16:.65}let a=0,o=0;for(let l of e.enemies)if(!l.dead&&(l.role==="controller"&&(l.windup>0||l.dash>0)&&(this.addSignal(a++,l.x,l.y,205,15364174,.44),this.addSignal(a++,l.x,l.y,112,16730672,l.dash>0?.9:.6)),(l.windup>0||l.dash>0)&&l.role!=="controller")){let d=l.role==="gunner"?1400:l.role==="carrier"?280:l.kind==="elite"?221:l.kind==="shield"?125:270,u=this.beamPool[o];u||(u=new je(new vn(1,1),new fi({color:16740428,transparent:!0,opacity:.5,side:ni,depthWrite:!1})),u.rotation.x=-Math.PI/2,this.beamPool[o]=u,this.signals.add(u));let f=l.locked;this.position(u,l.x+Math.cos(f)*d/2,l.y+Math.sin(f)*d/2,.27),u.rotation.set(-Math.PI/2,0,-f),u.scale.set(d*Je,(l.role==="gunner"?36:(l.r+24)*2)*Je,1),u.material.opacity=l.dash>0?.52:.2,u.visible=!0,o++}for(let l=a;l<this.signalPool.length;l++)this.signalPool[l].visible=!1;for(let l=o;l<this.beamPool.length;l++)this.beamPool[l].visible=!1;let c=0;for(let l of e.links){let d=this.linkPool[c];d||(d=new je(new rn(.025,.025,1,6),new fi({color:7401940,transparent:!0,opacity:.8,depthWrite:!1})),this.linkPool[c]=d,this.signals.add(d));let u=new F((l.x-e.width/2)*Je,.7,(l.y-e.height/2)*Je),f=new F((l.tx-e.width/2)*Je,.7,(l.ty-e.height/2)*Je),p=f.clone().sub(u);d.position.copy(u).add(f).multiplyScalar(.5),d.quaternion.setFromUnitVectors($u,p.clone().normalize()),d.scale.set(1,p.length(),1),d.material.opacity=Math.min(.85,l.life*3),d.visible=!0,c++}for(let l=c;l<this.linkPool.length;l++)this.linkPool[l].visible=!1}syncLabels(e){if(performance.now()-this.lastLabel<80)return;this.lastLabel=performance.now();let t=this.presentation||this.world.encounter==="choice"||this.world.over;if(this.labels.hidden=t,t)return;let i=e?{basic:"\u8B66\u5099\u6A5F",heavy:"\u91CD\u88C5\u6A5F",shield:"\u30B7\u30FC\u30EB\u30C9",charger:"\u7A81\u9032\u6A5F",gunner:"\u5C04\u7DDA\u7832",support:"\u4FEE\u7406\u652F\u63F4",elite:"\u7089\u5FC3",carrier:"\u88C5\u7532\u904B\u642C\u6A5F",controller:"\u78C1\u5834\u4E2D\u67A2"}:{basic:"GUARD",heavy:"HEAVY",shield:"SHIELD",charger:"CHARGER",gunner:"RAIL",support:"SUPPORT",elite:"REACTOR",carrier:"CARRIER",controller:"CORE"};for(let r of this.world.enemies){let a=this.actors.get(r.id);if(!a||r.dead)continue;let o=this.project(r.x,r.y,a.role==="carrier"||a.role==="controller"||a.role==="elite"?2.1:1.45);a.label.style.transform=`translate(${o.x}px,${o.y}px)`,a.label.querySelector("b").textContent=a.role==="elite"&&this.world.stage<5?e?"\u76E3\u7763\u6A5F":"OVERSEER":i[a.role]??a.role;let c=a.label.querySelector("i span");c.style.width=Math.max(0,r.hp/r.max*100)+"%",a.label.classList.toggle("warning",r.windup>0||r.dash>0)}for(let r of this.world.relays){let a=this.relayLabels.get(r.id);if(!a)continue;let o=this.project(r.x,r.y,1.5);a.style.transform=`translate(${o.x}px,${o.y}px)`,a.textContent=(e?"\u8A2D\u5099 ":"RELAY ")+(r.id+1)+" \xB7 "+(r.done?"\u2713":Math.floor(r.charge)+" / "+r.max),a.classList.toggle("is-active",r.id===this.world.activeRelay&&!r.done),a.classList.toggle("is-done",r.done)}let s=this.project(this.world.player.x,this.world.player.y,1.55);this.playerLabel.style.transform=`translate(${s.x}px,${s.y}px)`}render(e=!1){if(this.contextLost)return;let t=performance.now();this.makeFloor(),this.dpr!==Math.min(devicePixelRatio,1.6)&&this.resize();let i=this.presentation?"hub":this.world.over?"result":this.world.encounter==="choice"?"choice":"play";if((this.previousPresentation!==this.presentation||this.previousView!==i)&&(this.previousView=i,this.previousPresentation=this.presentation,this.resize()),this.previousPaused!==this.world.paused&&(this.previousPaused=this.world.paused,this.dirty=!0),!e&&!this.dirty&&(this.world.paused||this.world.encounter==="choice"||this.world.over)){this.skippedFrames++;return}this.syncActors(),this.syncMetal(),this.syncEffects(),!this.world.reduced&&!this.world.paused&&(this.camera.position.copy(this.target).add(this.offset),this.camera.position.x+=this.world.camera.x*Je,this.camera.position.z+=this.world.camera.y*Je,this.camera.lookAt(this.target)),this.renderer.info.reset(),this.composer.render(),this.dirty=!1,this.frameCount++,this.cpu.push(performance.now()-t),this.cpu.length>600&&this.cpu.shift()}metrics(){return{frames:this.frameCount,skippedPausedFrames:this.skippedFrames,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,cpuP95Ms:fx(this.cpu,.95),dpr:this.dpr}}};var px=["snap","launch","hit","break","upgrade","bump","block","warning","damage","complete"];var ll=class{expansionCounts={};expansionAt={};expansionEvent(e){if(!this.ready())return;let t=this.context.currentTime;if(!(t-(this.expansionAt[e]??-1/0)<.12))switch(this.expansionAt[e]=t,this.expansionCounts[e]=(this.expansionCounts[e]??0)+1,e){case"rail-fire":this.metal(820,.13,.027,.42),this.noise(.06,.02,2200);break;case"carrier-charge":this.body(62,.38,.055,1.7),this.rattle(.45);break;case"support-break":this.metal(730,.22,.028,.38),this.body(115,.23,.04,.5);break;case"repair-link":this.metal(470,.14,.015,1.6);break;case"satellite-block":this.metal(940,.17,.028,.7),this.body(150,.1,.03,.5);break;case"foundry":this.body(48,.26,.06,.42),this.metal(220,.18,.02,.5);break;case"armor-impact":this.metal(190,.12,.023,.65);break;case"shock":this.body(115,.17,.025,.35);break;case"magnet-pulse":this.body(52,.5,.045,.6),this.metal(160,.35,.018,.5);break;case"core-open":this.metal(620,.32,.025,1.5);break}}context=null;master=null;compressor=null;capture=null;voices=new Set;pullVoice=null;muted=!1;paused=!1;disposed=!1;failed=!1;extended=!1;lastSnapAt=-1/0;lastHitAt=-1/0;lastWarningAt=-1/0;snapCluster=0;randomState=1296123726;counters={unlockAttempts:0,unlocks:0,failures:0,events:{snap:0,launch:0,hit:0,break:0,upgrade:0,bump:0,block:0,warning:0,damage:0,complete:0},suppressed:{snap:0,hit:0,warning:0},voicesStarted:0,voicesDropped:0,voicesStopped:0,pullStarts:0};async unlock(){if(this.counters.unlockAttempts+=1,this.disposed||this.failed)return;let e=navigator.userActivation;if(!(e&&!e.isActive&&!this.context))try{this.context||this.createGraph();let t=this.context;if(!t||t.state==="closed"||(t.state!=="running"&&await t.resume(),this.disposed))return;t.state==="running"&&(this.counters.unlocks+=1)}catch{this.failClosed()}}setMuted(e){this.disposed||this.muted===e||(this.muted=e,e&&this.stopAll())}setPaused(e){this.disposed||this.paused===e||(this.paused=e,e&&this.stopAll())}setExtended(e){this.extended!==e&&(this.extended=e,this.lastSnapAt=-1/0,this.lastHitAt=-1/0,this.lastWarningAt=-1/0,this.snapCluster=0)}pull(e,t){if(!e||!this.ready()){this.stopPull();return}let i=this.context;if(!i)return;let s=ju(t,0,1);this.pullVoice||this.startPull(s);let r=this.pullVoice;if(!r)return;let a=r.sources[0],o=r.sources[1],c=r.nodes[1],l=i.currentTime;a?.frequency.setTargetAtTime(48+s*23,l,.035),o?.frequency.setTargetAtTime(96+s*31,l,.045),c?.gain.setTargetAtTime(.018+s*.018,l,.025)}event(e,t=1){if(!px.includes(e)||!this.ready())return;let i=this.context?.currentTime??0;if(this.extended&&e==="snap"){let r=i-this.lastSnapAt<.045;if(this.lastSnapAt=i,this.snapCluster=r?this.snapCluster+1:0,r&&this.snapCluster%3!==0||this.voices.size>=12){this.counters.suppressed.snap+=1;return}r&&(t*=.48)}if(this.extended&&e==="warning"){if(i-this.lastWarningAt<.28){this.counters.suppressed.warning+=1;return}this.lastWarningAt=i}this.counters.events[e]+=1;let s=ju(t,.15,1.5);switch(e){case"snap":this.metal(560,.085,.038*s,1.65);break;case"launch":this.body(125,.16,.055*s,.48),this.metal(390,.11,.03*s,.68);break;case"hit":this.extended&&this.voices.size>=12?this.counters.suppressed.hit+=1:this.extended&&i-this.lastHitAt<.075?(this.counters.suppressed.hit+=1,this.body(82,.14,.034*s,.46)):(this.body(82,.19,.075*s,.42),this.noise(.065,.045*s,520)),this.lastHitAt=i;break;case"break":this.body(68,.25,.085*s,.38),this.noise(.17,.055*s,1700),this.rattle(s);break;case"upgrade":this.reward(s);break;case"bump":this.body(105,.1,.035*s,.62);break;case"block":this.body(96,.13,.045*s,.52),this.metal(275,.09,.026*s,.61);break;case"warning":this.metal(315,.12,.022*s,1.16);break;case"damage":this.body(58,.22,.07*s,.48),this.metal(205,.1,.024*s,.72);break;case"complete":this.body(76,.28,.055*s,.72),this.metal(420,.16,.025*s,1.18),this.metal(690,.24,.022*s,.94);break}}captureStream(){return this.disposed?null:this.capture?.stream??null}metrics(){return{expansionEvents:{...this.expansionCounts},...this.counters,events:{...this.counters.events},suppressed:{...this.counters.suppressed},available:!!(this.context&&!this.failed),contextState:this.context?.state??"uninitialized",contextTime:this.context?.currentTime??0,muted:this.muted,paused:this.paused,activeVoices:this.voices.size,pullActive:!!this.pullVoice,extended:this.extended}}dispose(){if(this.disposed)return;this.disposed=!0,this.stopAll(),this.capture?.disconnect(),this.compressor?.disconnect(),this.master?.disconnect();let e=this.context;this.context=null,this.capture=null,this.compressor=null,this.master=null,e&&e.state!=="closed"&&e.close().catch(()=>{})}createGraph(){let e=globalThis.AudioContext;if(!e)throw new Error("Web Audio unavailable");let t=new e({latencyHint:"interactive"}),i=t.createGain(),s=t.createDynamicsCompressor();i.gain.value=.62,s.threshold.value=-18,s.knee.value=14,s.ratio.value=5,s.attack.value=.003,s.release.value=.14,i.connect(s),s.connect(t.destination);try{let r=t.createMediaStreamDestination();s.connect(r),this.capture=r}catch{this.capture=null}this.context=t,this.master=i,this.compressor=s}ready(){return!!(!this.disposed&&!this.failed&&!this.muted&&!this.paused&&this.context?.state==="running"&&this.master)}startPull(e){let t=this.context,i=this.master;if(!t||!i||this.voices.size>=18)return;let s=t.createGain(),r=t.createBiquadFilter(),a=t.createOscillator(),o=t.createOscillator();a.type="sine",o.type="triangle",a.frequency.value=48+e*23,o.frequency.value=96+e*31,o.detune.value=7,r.type="lowpass",r.frequency.value=310,r.Q.value=.7,s.gain.value=0,s.gain.setTargetAtTime(.018+e*.018,t.currentTime,.03),a.connect(r),o.connect(r),r.connect(s),s.connect(i);let c=this.register([a,o],[r,s],s);c&&(this.pullVoice=c,this.counters.pullStarts+=1,a.start(),o.start())}metal(e,t,i,s){let r=this.context,a=this.master;if(!r||!a)return;let o=r.currentTime,c=r.createGain(),l=r.createBiquadFilter(),d=r.createOscillator(),u=r.createOscillator(),f=this.variation(.045);d.type="triangle",u.type="sine",d.frequency.setValueAtTime(e*f,o),u.frequency.setValueAtTime(e*2.43*f,o),d.frequency.exponentialRampToValueAtTime(Math.max(30,e*s),o+t),u.frequency.exponentialRampToValueAtTime(Math.max(60,e*1.72),o+t),l.type="highpass",l.frequency.value=180,c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(i,o+.004),c.gain.exponentialRampToValueAtTime(1e-4,o+t),d.connect(l),u.connect(l),l.connect(c),c.connect(a),this.register([d,u],[l,c],c)&&(d.start(o),u.start(o),d.stop(o+t+.01),u.stop(o+t+.01))}body(e,t,i,s){let r=this.context,a=this.master;if(!r||!a)return;let o=r.currentTime,c=r.createOscillator(),l=r.createGain();c.type="sine",c.frequency.setValueAtTime(e*this.variation(.035),o),c.frequency.exponentialRampToValueAtTime(Math.max(28,e*s),o+t),l.gain.setValueAtTime(i,o),l.gain.exponentialRampToValueAtTime(1e-4,o+t),c.connect(l),l.connect(a),this.register([c],[l],l)&&(c.start(o),c.stop(o+t+.01))}noise(e,t,i){let s=this.context,r=this.master;if(!s||!r)return;let a=Math.max(1,Math.ceil(s.sampleRate*e)),o=s.createBuffer(1,a,s.sampleRate),c=o.getChannelData(0),l=0;for(let h=0;h<c.length;h+=1){let g=this.random()*2-1;l=l*.38+g*.62,c[h]=l*(1-h/c.length)}let d=s.createBufferSource(),u=s.createBiquadFilter(),f=s.createGain(),p=s.currentTime;d.buffer=o,u.type="bandpass",u.frequency.value=i*this.variation(.08),u.Q.value=.8,f.gain.setValueAtTime(t,p),f.gain.exponentialRampToValueAtTime(1e-4,p+e),d.connect(u),u.connect(f),f.connect(r),this.register([d],[u,f],f)&&(d.start(p),d.stop(p+e+.01))}rattle(e){this.metal(720,.055,.022*e,.71),this.metal(930,.07,.018*e,.66)}reward(e){this.metal(440,.11,.025*e,1.12),this.metal(660,.14,.027*e,1.08),this.metal(990,.18,.023*e,.96)}register(e,t,i){if(this.voices.size>=18){this.counters.voicesDropped+=1;for(let a of[...e,...t])a.disconnect();return null}let s={sources:e,nodes:t,output:i,ended:!1,stopping:!1};this.voices.add(s),this.counters.voicesStarted+=1;let r=e.length;for(let a of e)a.addEventListener("ended",()=>{r-=1,r===0&&this.cleanup(s)},{once:!0});return s}cleanup(e){if(!e.ended){e.ended=!0,this.voices.delete(e),this.pullVoice===e&&(this.pullVoice=null);for(let t of[...e.sources,...e.nodes])t.disconnect()}}stopVoice(e){if(e.ended||e.stopping)return;e.stopping=!0,this.pullVoice===e&&(this.pullVoice=null);let t=this.context?.currentTime,i=t===void 0?void 0:t+.008;t!==void 0&&(e.output.gain.cancelAndHoldAtTime(t),e.output.gain.linearRampToValueAtTime(1e-4,i));for(let s of e.sources)try{s.stop(i)}catch{}this.counters.voicesStopped+=1}stopPull(){this.pullVoice&&this.stopVoice(this.pullVoice)}stopAll(){for(let e of[...this.voices])this.stopVoice(e);this.pullVoice=null}failClosed(){this.failed=!0,this.recordFailure(),this.stopAll()}recordFailure(){this.counters.failures+=1}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}variation(e){return 1+(this.random()*2-1)*e}};function ju(n,e,t){return Math.min(t,Math.max(e,Number.isFinite(n)?n:e))}function Qu(n,e,t,i){let s=n?"ja":"en",r=new URL(location.href),a=/^\/(ja|en)\/play\/project-magnet\/$/.test(r.pathname);a&&r.pathname!==`/${s}/play/project-magnet/`&&(r.pathname=`/${s}/play/project-magnet/`),r.searchParams.has("lang")&&r.searchParams.get("lang")!==s&&r.searchParams.set("lang",s),!a&&!r.searchParams.has("lang")&&r.searchParams.set("lang",s),r.href!==location.href&&history.replaceState(null,"",r);let o=(u,f)=>{let p=document.getElementById(u);p&&p.textContent!==f&&(p.textContent=f)},c=(u,f)=>{let p=document.getElementById(u);p&&p.getAttribute("aria-label")!==f&&(p.setAttribute("aria-label",f),p.setAttribute("title",f))},l=document.querySelector(".wordmark");l&&(l.href=`/${s}/games/project-magnet/`,l.setAttribute("aria-label",n?"Tinlumo\u306E\u4F5C\u54C1\u7D39\u4ECB\u306B\u623B\u308B":"Return to Tinlumo game details")),document.getElementById("sound")?.setAttribute("aria-pressed",String(e)),document.getElementById("motion")?.setAttribute("aria-pressed",String(i));for(let[u,f]of[["#move-stick span",n?"\u79FB\u52D5":"MOVE"],["#aim-stick span",n?"\u5438\u5F15 / \u7167\u6E96":"HOLD / AIM"],["#aim-stick small",n?"\u96E2\u3057\u3066\u5C04\u51FA":"RELEASE TO FIRE"],["#run-hud small",n?"\u51683\u4F5C\u6226":"FULL GAME / 3 OPERATIONS"]]){let p=document.querySelector(u);p&&p.textContent!==f&&(p.textContent=f)}o("resume",n?"\u518D\u958B":"RESUME"),o("sound",n?`\u97F3 ${e?"OFF":"ON"}`:`SOUND ${e?"OFF":"ON"}`),o("motion",n?i?"\u52D5\u304D \u63A7\u3048\u3081":"\u52D5\u304D \u901A\u5E38":i?"CALM":"MOTION"),c("sound",n?e?"\u97F3\u3092\u51FA\u3059":"\u6D88\u97F3":e?"Unmute sound":"Mute sound"),c("motion",n?i?"\u901A\u5E38\u306E\u52D5\u304D\u306B\u3059\u308B":"\u52D5\u304D\u3092\u63A7\u3048\u308B":i?"Use full motion":"Reduce motion"),c("pause",n?t?"\u518D\u958B":"\u4E00\u6642\u505C\u6B62":t?"Resume":"Pause"),c("restart",n?"\u4F5C\u6226\u3092\u6700\u521D\u304B\u3089\u3084\u308A\u76F4\u3059 (R)":"Retry this mission (R)"),c("language",n?"Switch to English":"\u65E5\u672C\u8A9E\u306B\u5207\u308A\u66FF\u3048\u308B"),c("arena",n?"WASD\u307E\u305F\u306F\u77E2\u5370\u3067\u79FB\u52D5\u3002\u91D1\u5C5E\u306E\u8FD1\u304F\u3067\u62BC\u3057\u7D9A\u3051\u3001\u72D9\u3063\u3066\u96E2\u3059\u3002\u30BF\u30C3\u30C1\u306F\u5DE6\u6307\u3067\u79FB\u52D5\u3001\u53F3\u6307\u3067\u5438\u5F15\u3068\u7167\u6E96\u3002":"Move with WASD or arrows. Hold near metal, aim, then release. Touch: left thumb moves, right thumb gathers and aims."),document.querySelector("header nav")?.setAttribute("aria-label",n?"\u30B2\u30FC\u30E0\u64CD\u4F5C":"Game controls"),document.getElementById("game")?.setAttribute("aria-label",n?"PROJECT MAGNET \u78C1\u529B\u30A2\u30AF\u30B7\u30E7\u30F3":"PROJECT MAGNET action arena"),document.getElementById("choice")?.setAttribute("aria-label",n?"\u9032\u5316\u3092\u9078\u3076":"Choose an evolution"),document.getElementById("result")?.setAttribute("aria-label",n?"\u4F5C\u6226\u306E\u7D50\u679C":"Mission result");let d=document.querySelector("#choice > small");d&&(d.textContent=n?"\u533A\u753B\u30AF\u30EA\u30A2":"CIRCUIT SECURED")}function ed(){let n=new URLSearchParams(location.search).get("lang"),e=n==="ja"||n==="en"?n:/^\/en\//.test(location.pathname)?"en":/^\/ja\//.test(location.pathname)?"ja":document.documentElement.lang==="en"?"en":"ja",t=document.createElement("main"),i=document.createElement("section"),s=document.createElement("a"),r=document.createElement("h1"),a=document.createElement("p"),o=document.createElement("div"),c=document.createElement("button"),l=document.createElement("a"),d=document.createElement("button");t.id="magnet-boot-error",t.style.cssText="min-height:100svh;display:grid;place-items:center;padding:24px;background:#eaf0ec;color:#233c37",i.setAttribute("role","alert"),i.tabIndex=-1,i.setAttribute("aria-labelledby","magnet-boot-title"),i.style.cssText="width:min(100%,480px);padding:clamp(24px,5vw,40px);border:1px solid #c9d8cd;border-radius:24px;background:#fff9ed;box-shadow:0 16px 50px #263f3212",s.style.cssText="display:inline-flex;align-items:center;min-height:44px;color:#365b50;font-weight:700;text-decoration:none;letter-spacing:.04em",s.textContent="\u2190 TINLUMO",r.id="magnet-boot-title",r.textContent="PROJECT MAGNET",r.style.cssText="font-size:clamp(22px,5vw,28px);line-height:1.25;letter-spacing:-.025em;margin:20px 0 16px;color:#233c37",a.id="magnet-boot-message",a.style.cssText="margin:0 0 24px;font-size:16px;line-height:1.75;color:#39584e",o.style.cssText="display:flex;flex-direction:column;align-items:stretch;gap:12px",c.id="magnet-boot-retry",c.type="button",c.style.cssText="min-height:48px;padding:12px 16px;border:0;border-radius:12px;background:#365f50;color:#fff9ed;font-size:15px;font-weight:700;cursor:pointer",l.id="magnet-boot-details",l.style.cssText="display:flex;align-items:center;justify-content:center;min-height:48px;padding:12px 16px;border:1px solid #b7c9bc;border-radius:12px;color:#294d40;text-decoration:underline;font-size:15px",d.id="magnet-boot-language",d.type="button",d.style.cssText="align-self:center;min-height:44px;padding:8px 16px;border:0;border-radius:8px;background:transparent;color:#365b50;font-size:14px;text-decoration:underline;cursor:pointer";let u=()=>{document.documentElement.lang=e,s.href="/"+e+"/",l.href="/"+e+"/games/project-magnet/",a.textContent=e==="ja"?"3D\u63CF\u753B\u3092\u958B\u59CB\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u3084\u7AEF\u672B\u3067\u306FWebGL 2\u3092\u5229\u7528\u3067\u304D\u306A\u3044\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\u518D\u8A66\u884C\u3059\u308B\u304B\u3001\u5BFE\u5FDC\u30D6\u30E9\u30A6\u30B6\u30FC\u3067\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002":"3D rendering could not start. WebGL 2 may be unavailable in this browser or on this device. Try again, or open a compatible browser.",c.textContent=e==="ja"?"\u3082\u3046\u4E00\u5EA6\u3001\u8AAD\u307F\u8FBC\u3080":"Try loading again",l.textContent=e==="ja"?"\u904A\u3073\u65B9\u30FB\u8A73\u7D30\u3078\u623B\u308B":"Back to game details",d.textContent=e==="ja"?"English":"\u65E5\u672C\u8A9E",d.setAttribute("aria-label",e==="ja"?"Switch to English":"\u65E5\u672C\u8A9E\u306B\u5207\u66FF")};c.addEventListener("click",()=>location.reload()),d.addEventListener("click",()=>{e=e==="ja"?"en":"ja";let f=new URL(location.href);f.searchParams.set("lang",e),history.replaceState(null,"",f),u()}),o.append(c,l,d),i.append(s,r,a,o),t.append(i),document.body.replaceChildren(t),document.body.dataset.ready="false",document.body.dataset.boot="failed",u(),i.focus()}var zt=document.querySelector("#arena"),td=innerHeight>innerWidth,G=new sa(td?540:960,td?820:640),In;try{In=new ol(zt,G)}catch(n){throw ed(),n}var lt=new ll,xt=new ta((()=>{try{return localStorage}catch{return null}})()),yi=!0,Jr=!1,cl=!1,hl,pe=n=>document.getElementById(n),ei=!1,xi=!1,jr=!1,Kr=0,id=-10,ks=0,Zr=0,Lc=[],wt=(new URLSearchParams(location.search).get("lang")??location.pathname.match(/^\/(ja|en)\/play\//)?.[1]??xt.data.settings.locale)!=="en",zs="";ei=xt.data.settings.muted;lt.setMuted(ei);var Xe=(n,e)=>wt?e:n;function Oc(){let n=document.querySelector(".wordmark");n.href="/"+(wt?"ja":"en")+"/games/project-magnet/",n.setAttribute("aria-label",wt?"\u904A\u3073\u65B9\u3078":"How to play"),document.documentElement.lang=wt?"ja":"en",pe("language").textContent=wt?"EN":"\u65E5\u672C\u8A9E",document.querySelector(".hint-desktop").innerHTML=wt?"<kbd>W A S D</kbd> \u79FB\u52D5 \xB7 \u62BC\u3057\u3066\u5438\u5F15 \u2192 \u72D9\u3063\u3066\u96E2\u3059":"<kbd>W A S D</kbd> move \xB7 hold to gather \u2192 release to launch",document.querySelector(".hint-touch").textContent=Xe("Left thumb moves \xB7 Right thumb gathers & aims","\u5DE6\u6307\u3067\u79FB\u52D5 \xB7 \u53F3\u6307\u3067\u5438\u5F15\u30FB\u7167\u6E96 \u2192 \u96E2\u3057\u3066\u5C04\u51FA"),pe("retry").textContent=Xe("RETRY \u2197","\u3082\u3046\u4E00\u5EA6 \u2197"),pe("missions").textContent=Xe("MISSIONS","\u4F5C\u6226"),pe("mission-select").textContent=Xe("MISSION SELECT \u2197","\u4F5C\u6226\u9078\u629E \u2197")}Oc();var Di=new Set,Vs=null,Hs=null,Dc={x:0,y:0},Nc={x:0,y:0},Xn={x:0,y:0};G.reduced=xt.hasSave?xt.data.settings.reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches;function ln(){Di.clear(),Vs=null,Hs=null,Xn={x:0,y:0},G.cancel(),lt.pull(!1,0),pe("aim-stick").classList.remove("active");for(let n of["move-stick","aim-stick"])pe(n).querySelector("i").style.transform=""}function cn(){G.paused=xi||jr||yi,lt.setPaused(G.paused||G.encounter==="choice"),G.paused&&ln(),pe("pause-overlay").hidden=!xi,pe("pause").textContent=xi?"\u25B6":"\u2161",pe("pause").setAttribute("aria-label",xi?"Resume":"Pause")}function ul(){if(G.mission==="A")return G.stage===0&&G.kills===0?["BOOT THE CRANE","\u30AF\u30EC\u30FC\u30F3\u3092\u518D\u8D77\u52D5","Hold near metal \xB7 aim at a guard \xB7 release to launch","\u91D1\u5C5E\u306E\u8FD1\u304F\u3067\u62BC\u3057\u7D9A\u3051\u3001\u6575\u3092\u72D9\u3063\u3066\u96E2\u3059"]:G.stage===0&&G.armor===0?["RECLAIM THE ARMOR","\u88C5\u7532\u3092\u56DE\u53CE","Gather the glowing armor \xB7 charged scrap powers relays","\u6575\u304C\u843D\u3068\u3059\u5149\u308B\u88C5\u7532\u3092\u5438\u5F15\u3002\u88C5\u7532\u306E\u96FB\u529B\u3067\u8A2D\u5099\u3092\u5FA9\u65E7"]:$c[G.stage];let n=Xs[G.mission][G.stage];return[...n.title,...n.hint]}function Gs(){return xt.status==="saved"&&!xt.hasSave?Xe("Progress will save on this device \xB7 resume at sector start","\u9032\u884C\u3092\u3053\u306E\u7AEF\u672B\u306B\u4FDD\u5B58\u3057\u307E\u3059 / \u533A\u753B\u306E\u306F\u3058\u3081\u304B\u3089\u518D\u958B"):xt.status==="saved"?Xe("Saved on this device \xB7 resume from the start of the sector","\u3053\u306E\u7AEF\u672B\u306B\u4FDD\u5B58\u6E08\u307F / \u533A\u753B\u306E\u306F\u3058\u3081\u304B\u3089\u518D\u958B"):xt.status==="corrupt"?Xe("Save is damaged or from another version. Original kept; this session is not saved.","\u4FDD\u5B58\u304C\u7834\u640D\u307E\u305F\u306F\u5225\u30D0\u30FC\u30B8\u30E7\u30F3\u3067\u3059\u3002\u539F\u6587\u3092\u4FDD\u6301\u3057\u3001\u4ECA\u56DE\u306F\u4FDD\u5B58\u3057\u307E\u305B\u3093\u3002"):xt.status==="conflict"?Xe("Another tab changed the save. Original kept; reload before saving again.","\u5225\u30BF\u30D6\u3067\u4FDD\u5B58\u304C\u66F4\u65B0\u3055\u308C\u307E\u3057\u305F\u3002\u4E0A\u66F8\u304D\u3092\u6B62\u3081\u3066\u3044\u307E\u3059\u3002\u518D\u8AAD\u8FBC\u3057\u3066\u304F\u3060\u3055\u3044\u3002"):Xe("Save unavailable. Progress stays in this tab; reloading may restore an older checkpoint.","\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3002\u3053\u306E\u30BF\u30D6\u5185\u306E\u307F\u9032\u884C\u3067\u304D\u307E\u3059\u3002\u518D\u8AAD\u8FBC\u3067\u53E4\u3044\u533A\u753B\u3078\u623B\u308B\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002")}function Bc(){xt.change(n=>{n.settings={locale:wt?"ja":"en",muted:ei,reducedMotion:G.reduced}}),pe("save-note").textContent=Gs(),yi&&qn()}function sd(){!G.checkpointPending||!Jr||G.over||(G.checkpointPending=!1,xt.checkpoint(G.checkpoint()),pe("save-note").textContent=Gs())}function Uc(n,e=!1){ln(),lt.setPaused(!0);let t=xt.data.run;G.startMission(n),e&&t&&G.restore(t),Jr=!0,yi=!1,cl=!1,xi=!1,hl.hide(),cn(),zs="",pe("toast").classList.remove("show"),Kr=0,pe("result").hidden=!0,pe("hint").style.opacity="1",Zr=0,sd(),pe("save-note").textContent=Gs(),zt.focus()}function kc(){if(yi){qn();return}Uc(G.mission)}function qn(){yi=!0,ln(),cn(),pe("choice").hidden=!0,pe("result").hidden=!0,hl.show({locale:wt?"ja":"en",unlocked:xt.data.unlocked,records:xt.data.records,resume:xt.data.run?{mission:xt.data.run.mission,zone:xt.data.run.zone}:null,saveStatus:Gs(),completed:!!xt.data.records.C})}function Zi(n,e=1.5){pe("toast").textContent=n,Kr=G.time+e,pe("toast").classList.add("show")}G.onEvent=n=>{["rail-fire","carrier-charge","support-break","repair-link","satellite-block","foundry","armor-impact","shock","magnet-pulse","core-open"].includes(n.kind)&&lt.expansionEvent(n.kind),lt.setExtended(!0),["snap","launch","hit","break","upgrade","bump"].includes(n.kind)&&lt.event(n.kind,n.value),["block","damage","complete"].includes(n.kind)&&lt.event(n.kind,n.value),n.kind==="enemy-windup"&&lt.event("warning",n.value),n.kind==="upgrade"&&Zi(n.value===1?Xe("RECLAIMED / MAGNET II","\u88C5\u7532\u56DE\u53CE / MAGNET II"):G.build.toUpperCase()+" / EVOLUTION "+G.evolution,2),n.kind==="relay-empty"&&G.time>id+5&&(id=G.time,Zi(Xe("RECOVER ENEMY ARMOR / EMPTY METAL HAS NO CHARGE","\u6575\u306E\u88C5\u7532\u3092\u56DE\u53CE\u3057\u3088\u3046 / \u7A7A\u306E\u91D1\u5C5E\u306F\u9001\u96FB\u3067\u304D\u306A\u3044"),2)),n.kind==="power-window"&&Zi(Xe("POWER SURGE / GUARDS OPEN \xB7 FLOOR SAFE","\u9001\u96FB\u6210\u529F / \u6575\u306E\u76FE\u3092\u958B\u653E\u30FB\u5E8A\u306E\u96FB\u6D41\u505C\u6B62"),2),n.kind==="relay-hit"&&lt.event("snap",1),n.kind==="relay-complete"&&lt.event("upgrade",1),n.kind.startsWith("stage-start")&&Zi(ul()[wt?1:0],2),n.kind.startsWith("stage-clear")&&(ln(),pe("toast").classList.remove("show"),Kr=0),n.kind==="circuit-secured"&&lt.event("complete",.7),n.kind==="equip"&&G.evolution===0&&lt.event("upgrade",.6),n.kind.startsWith("choice-open")&&(ln(),lt.setPaused(!0)),n.kind==="reactor-lock"&&Zi(Xe("NEXT RELAY / BREAK THE LOCK","\u6B21\u306E\u8A2D\u5099\u3078\u9001\u96FB / \u88C5\u7532\u3092\u89E3\u9664"),2),n.kind==="phase-1"&&Zi("FLANK THE SHIELD \xB7 OR CRACK ITS PLATE",3),n.kind==="phase-2"&&Zi("BAIT THE CHARGE \xB7 STRIKE THE OPEN CORE",3),n.kind==="phase-3"&&Zi("FURNACE SHIFT / HOLD YOUR GROUND",2),n.kind==="elite-arrival"&&Zi(Xe("REACTOR / POWER THE RELAY","\u7089\u5FC3 / \u8A2D\u5099\u3078\u9001\u96FB"),2.5),n.kind==="empty"&&Zi(Xe("HOLD NEAR METAL","\u91D1\u5C5E\u306E\u8FD1\u304F\u3067\u62BC\u3057\u3066\u5438\u5F15"),1),n.kind==="launch"&&(pe("hint").style.opacity="0")};var $r=()=>{G.move={x:Xn.x+(Di.has("d")||Di.has("arrowright")?1:0)-(Di.has("a")||Di.has("arrowleft")?1:0),y:Xn.y+(Di.has("s")||Di.has("arrowdown")?1:0)-(Di.has("w")||Di.has("arrowup")?1:0)}};zt.addEventListener("contextmenu",n=>n.preventDefault());zt.addEventListener("pointerdown",n=>{if(n.button!==0||G.paused||G.over||G.won||G.encounter!=="combat")return;n.preventDefault(),lt.unlock(),zt.focus({preventScroll:!0}),zt.setPointerCapture(n.pointerId);let e=n.pointerType!=="mouse",t=zt.getBoundingClientRect();if(e&&n.clientX-t.left<t.width*.43&&Vs===null)Vs=n.pointerId,Dc={x:n.clientX,y:n.clientY};else if(Hs===null){if(Hs=n.pointerId,Nc={x:n.clientX,y:n.clientY},!e)G.aim=In.point(n.clientX,n.clientY);else{let i=G.enemies.filter(s=>!s.dead).sort((s,r)=>Math.hypot(s.x-G.player.x,s.y-G.player.y)-Math.hypot(r.x-G.player.x,r.y-G.player.y))[0];i&&(G.aim={x:i.x,y:i.y})}G.startHold(),pe("aim-stick").classList.add("active")}});zt.addEventListener("pointermove",n=>{if(n.pointerType==="mouse"){G.aim=In.point(n.clientX,n.clientY);return}if(n.pointerId===Vs){let e=n.clientX-Dc.x,t=n.clientY-Dc.y,i=Math.hypot(e,t),s=Math.min(1,i/38)/(i||1);Xn={x:e*s,y:t*s},$r(),pe("move-stick").querySelector("i").style.transform=`translate(${Xn.x*23}px,${Xn.y*23}px)`}if(n.pointerId===Hs){let e=n.clientX-Nc.x,t=n.clientY-Nc.y,i=Math.hypot(e,t);i>7&&(G.aim={x:G.player.x+e/i*260,y:G.player.y+t/i*260},pe("aim-stick").querySelector("i").style.transform=`translate(${e/i*23}px,${t/i*23}px)`)}});function zc(n,e){n.pointerId===Vs&&(Vs=null,Xn={x:0,y:0},$r(),pe("move-stick").querySelector("i").style.transform=""),n.pointerId===Hs&&(Hs=null,e?G.cancel():G.release(),$r(),lt.pull(!1,0),pe("aim-stick").classList.remove("active"),pe("aim-stick").querySelector("i").style.transform=""),zt.hasPointerCapture(n.pointerId)&&zt.releasePointerCapture(n.pointerId)}zt.addEventListener("pointerup",n=>zc(n,!1));zt.addEventListener("pointercancel",n=>zc(n,!0));zt.addEventListener("lostpointercapture",n=>zc(n,!0));window.addEventListener("keydown",n=>{if(n.target instanceof HTMLButtonElement||n.target instanceof HTMLAnchorElement)return;let e=n.key.toLowerCase();if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)){if(n.preventDefault(),G.paused||G.encounter!=="combat")return;lt.unlock(),Di.add(e),$r(),e===" "&&!n.repeat&&G.startHold()}e==="r"&&!n.repeat&&!yi&&kc(),e==="escape"&&!n.repeat&&!yi&&(xi=!xi,cn())});window.addEventListener("keyup",n=>{let e=n.key.toLowerCase();Di.delete(e),$r(),e===" "&&(G.release(),lt.pull(!1,0))});window.addEventListener("blur",()=>{ln(),jr=!0,cn()});window.addEventListener("focus",()=>{jr=document.hidden,cn()});document.addEventListener("visibilitychange",()=>{jr=document.hidden,cn(),ks=0,Zr=0});pe("retry").addEventListener("click",()=>{lt.unlock(),kc(),zt.focus()});pe("sound").addEventListener("click",()=>{lt.unlock(),ei=!ei,lt.setMuted(ei),pe("sound").textContent=ei?"SOUND OFF":"SOUND ON",pe("sound").setAttribute("aria-label",ei?"Enable sound":"Mute sound"),pe("sound").setAttribute("aria-pressed",String(ei)),Bc()});pe("motion").addEventListener("click",()=>{G.reduced=!G.reduced,pe("motion").setAttribute("aria-pressed",String(G.reduced)),pe("motion").textContent=G.reduced?"CALM":"MOTION",Bc()});pe("pause").addEventListener("click",()=>{xi=!xi,cn()});pe("resume").addEventListener("click",()=>{lt.unlock(),xi=!1,cn(),zt.focus()});pe("restart").addEventListener("click",()=>{lt.unlock(),kc(),zt.focus()});addEventListener("resize",()=>{ln();let n=innerHeight>innerWidth,e=n?540:960,t=n?820:640;if(e!==G.width){let i=e/G.width,s=t/G.height;for(let r of[G.player,G.aim,...G.scraps,...G.enemies,...G.particles,...G.relays])r.x*=i,r.y*=s;G.lane&&(G.lane.position*=G.lane.axis==="x"?i:s),G.width=e,G.height=t,In.makeFloor()}In.resize()});pe("language").addEventListener("click",()=>{wt=!wt,zs="",Oc(),Bc()});function mx(n){return G.choice===3&&(n==="swarm"||n==="lance")?Xe("Switch + final: ","\u6A5F\u4F53\u5909\u66F4\uFF0B\u6700\u7D42\u9032\u5316\uFF1A")+(n==="swarm"?Ws.cyclone[wt?3:2]:Ws.return[wt?3:2]):Ws[n][wt?3:2]}function gx(){let n=G.encounter==="choice"&&!yi;if(pe("choice").hidden=!n,!n){zs="";return}let e=G.choice+G.build+G.stage+wt;if(e===zs)return;zs=e,ln(),lt.setPaused(!0),pe("choice-title").textContent=G.choice===1?Xe("SALVAGE MODULE","\u56DE\u53CE\u30E2\u30B8\u30E5\u30FC\u30EB\u3092\u9078\u3076"):G.choice===2?Xe("CHOOSE YOUR EVOLUTION","\u9032\u5316\u306E\u65B9\u5411\u3092\u9078\u3076"):Xe("FINAL EVOLUTION","\u6700\u7D42\u9032\u5316"),pe("choice-summary").textContent=Xe("Choose a different way to fight \xB7 no time limit","\u6226\u3044\u65B9\u3092\u9078\u3076 / \u6642\u9593\u5236\u9650\u306A\u3057");let t=pe("choice-list");t.replaceChildren();for(let i of G.optionIds){let s=Ws[i],r=document.createElement("button");r.dataset.choice=i;let a=document.createElement("strong"),o=document.createElement("span");a.textContent=s[wt?1:0],o.textContent=mx(i),r.append(a,o);let c=!1;r.addEventListener("pointerdown",l=>{c=l.isTrusted&&l.button===0&&!G.paused&&G.encounter==="choice"}),r.addEventListener("pointercancel",()=>{c=!1}),r.addEventListener("keydown",l=>{(l.key==="Enter"||l.key===" ")&&!l.repeat&&(c=l.isTrusted&&!G.paused)}),r.addEventListener("blur",()=>{c=!1}),r.addEventListener("click",l=>{!l.isTrusted||!c||G.paused||(c=!1,ln(),lt.setPaused(xi||jr),lt.unlock(),G.choose(i),zs="",zt.focus())}),t.append(r)}}var nd=0;function xx(){if(In.presentation=yi,In.syncLabels(wt),performance.now()-nd<90)return;nd=performance.now(),Qu(wt,ei,xi,G.reduced);let n=G.relays[G.activeRelay];pe("sector-code").textContent=G.mission+" / "+String(G.stage+1).padStart(2,"0")+" \u2014 06",pe("sector-title").textContent=ul()[wt?1:0],pe("sector-hint").textContent=ul()[wt?3:2];let e=G.encounter!=="combat"?Xe("CIRCUIT RESTORED","\u8A2D\u5099\u5FA9\u65E7"):G.mission==="A"&&G.stage===5&&!G.bossLocked?G.enemies.some(t=>t.kind==="elite"&&!t.dead&&((t.shellGate??0)>0||t.windup>0||t.dash>0))?Xe("COUNTERCHARGE \xB7 DODGE","\u53CD\u6483 / \u4E88\u544A\u7DDA\u304B\u3089\u56DE\u907F"):Xe("CORE EXPOSED \xB7 ATTACK","\u7089\u5FC3\u304C\u9732\u51FA / \u653B\u6483"):n?Xe("RELAY ","\u8A2D\u5099 ")+(G.activeRelay+1)+" / "+G.relays.length+" \xB7 "+Math.floor(n.charge)+" / "+n.max:Xe("CLEAR THE REMAINING GUARDS","\u6B8B\u3063\u305F\u6575\u3092\u6483\u7834");pe("sector-status").textContent=e,pe("build-label").textContent=(G.build==="base"?"MAGNET I":G.build.toUpperCase())+(G.form?" / "+G.form.toUpperCase():""),pe("module-label").textContent=G.modules.map(t=>t.toUpperCase()).join(" + "),pe("armor-label").textContent=Xe("CHARGED ","\u88C5\u7532 ")+G.scraps.filter(t=>t.mode==="orbit"&&t.salvaged).length,pe("sector-pips").children.length||pe("sector-pips").replaceChildren(...Array.from({length:6},()=>document.createElement("i"))),[...pe("sector-pips").children].forEach((t,i)=>t.className=i<G.stage||G.won?"done":i===G.stage?"current":""),pe("transition").hidden=!["settle","equip"].includes(G.encounter)||yi,pe("transition").textContent=G.encounter==="equip"?Xe("MODULE FITTED","\u88C5\u7740\u5B8C\u4E86"):G.clearElapsed>=.16?Xe("CIRCUIT RESTORED","\u8A2D\u5099\u5FA9\u65E7"):Xe("AREA SECURED","\u6575\u3092\u6392\u9664"),document.querySelector("#game").classList.toggle("is-hub",yi),document.querySelector("#game").classList.toggle("is-choice",G.encounter==="choice"),document.querySelector("#game").classList.toggle("is-over",G.over),document.querySelector("#game").classList.toggle("is-reduced",G.reduced),pe("motion").setAttribute("aria-pressed",String(G.reduced)),pe("sound").setAttribute("aria-pressed",String(ei))}function Fc(n){if(ks&&n-ks<16){requestAnimationFrame(Fc);return}let e=ks?(n-ks)/1e3:0,t=Math.min(.05,e);ks=n,e>0&&!G.paused&&G.encounter==="combat"&&!G.over&&G.started&&(Lc.push(e*1e3),Lc.length>6e3&&Lc.shift()),Zr+=t;let i=0;for(;Zr>=Mt.step&&i++<7;)G.update(Mt.step),sd(),Zr-=Mt.step;Jr&&!cl&&(G.won||G.over)&&(cl=!0,G.won?xt.clear(G.mission,G.runEndedAt,G.form):xt.endRun(),pe("save-note").textContent=Gs()),In.render(),xx(),gx();let s=G.scraps.filter(a=>a.mode==="orbit").length,r=G.form==="satellite"?Math.max(0,s-4):s;lt.pull(G.holding&&!G.paused&&!G.over,St(s/11,0,1)),pe("charge-label").textContent=G.won?Xe("\u21BB ANOTHER ROUND","\u21BB \u3082\u3046\u4E00\u5EA6"):G.holding?G.form==="satellite"?r+Xe(" TO FIRE / 4 RESERVED"," \u5C04\u51FA / 4\u7247\u3092\u9632\u5FA1\u3078"):s+Xe(" PIECES / RELEASE TO FIRE"," \u500B / \u96E2\u3057\u3066\u5C04\u51FA"):s?Xe("HOLD / AIM \u2192 RELEASE","\u62BC\u3057\u3066\u7167\u6E96 \u2192 \u96E2\u3059"):Xe("HOLD \u2192 GATHER","\u62BC\u3057\u3066\u5438\u5F15"),pe("progress").textContent="\u25B0".repeat(Math.max(0,G.player.hp))+"\u25B1".repeat(G.player.maxHp-Math.max(0,G.player.hp)),pe("clock").textContent=new Date((G.over?G.runEndedAt:G.runTime)*1e3).toISOString().slice(14,19),pe("phase").textContent=ul()[wt?1:0],G.over&&!yi&&(pe("result").hidden=!1,pe("result").querySelector("small").textContent=G.won?Xe("CIRCUIT RESTORED / SHIFT COMPLETE","\u5168\u8A2D\u5099\u304C\u5FA9\u65E7 / \u4F5C\u696D\u5B8C\u4E86"):Xe("CIRCUIT INCOMPLETE / TRY ANOTHER APPROACH","\u9001\u96FB\u672A\u5B8C\u4E86 / \u5225\u306E\u65B9\u6CD5\u3067\u518D\u6311\u6226"),pe("result-title").textContent=G.won?Xe("MISSION "+G.mission+" CLEAR","\u4F5C\u6226 "+G.mission+" \u5B8C\u4E86"):Xe("ARMOR DEPLETED","\u88C5\u7532\u304C\u5C3D\u304D\u305F"),pe("result-detail").textContent=`${Math.floor(G.runEndedAt/60)}:${String(Math.floor(G.runEndedAt%60)).padStart(2,"0")} / ${G.kills} WRECKS / ${G.build.toUpperCase()} ${G.evolution} / ${G.won?"6":G.stage+1} OF 6`,pe("retry-note").textContent=G.build==="lance"?Xe("Next run: SWARM \xB7 wide collection, crowd control","\u6B21\u306F SWARM\uFF1A\u5E83\u57DF\u56DE\u53CE\u3068\u5468\u56F2\u306E\u76FE\u5D29\u3057"):Xe("Next run: LANCE \xB7 pierce a precise firing line","\u6B21\u306F LANCE\uFF1A\u5C04\u7DDA\u3092\u4F5C\u3063\u3066\u9AD8\u901F\u8CAB\u901A")),Kr&&G.time>Kr&&pe("toast").classList.remove("show"),requestAnimationFrame(Fc)}hl=sh({start:n=>Uc(n),resume:()=>{let n=xt.data.run;n&&Uc(n.mission,!0)},reset:()=>{xt.reset()&&(Jr=!1,cl=!1,xi=!1,G.startMission("A"),wt=xt.data.settings.locale==="ja",ei=xt.data.settings.muted,G.reduced=xt.data.settings.reducedMotion,lt.setMuted(ei),pe("sound").textContent=ei?"SOUND OFF":"SOUND ON",pe("motion").textContent=G.reduced?"CALM":"MOTION",Oc()),qn()},cancel:()=>{Jr?(yi=!1,hl.hide(),cn(),zt.focus({preventScroll:!0})):qn()}});pe("missions").addEventListener("click",qn);pe("mission-select").addEventListener("click",qn);pe("save-note").textContent=Gs();pe("sound").textContent=ei?"SOUND OFF":"SOUND ON";pe("motion").textContent=G.reduced?"CALM":"MOTION";qn();requestAnimationFrame(Fc);
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
