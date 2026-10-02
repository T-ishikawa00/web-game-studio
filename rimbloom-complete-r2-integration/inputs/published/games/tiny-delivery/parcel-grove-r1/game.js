var Ln=(i,e)=>({ja:i,en:e});function qs(i,e){return Array.from({length:i*i},(t,n)=>n).filter(t=>!e.includes(t))}var af=[{kind:"delivery",id:"D01",version:1,answerKey:"D01@1",size:5,title:Ln("\u306F\u3058\u3081\u3066\u306E\u304A\u5C4A\u3051","First delivery"),lesson:Ln("\u77E2\u5370\u3092\u30BF\u30C3\u30D7\u3057\u3066\u9053\u3092\u6E96\u5099\u3002\u51FA\u767A\u3059\u308B\u3068\u8D70\u308A\u51FA\u3059\u3002","Tap arrows to prepare a route, then press Go."),robots:[{id:"A",start:10,direction:1,goal:4}],sockets:[12,2],initial:[1,0],walls:qs(5,[10,11,12,7,2,3,4])},{kind:"delivery",id:"D02",version:1,answerKey:"D02@1",size:5,title:Ln("\u753A\u89D2\u3092\u3064\u306A\u3044\u3067","Around the block"),lesson:Ln("\u66F2\u304C\u308A\u89D2\u3092\u3064\u306A\u3044\u3067\u3001\u8377\u7269\u3092\u53D7\u53D6\u53E3\u3078\u5C4A\u3051\u3088\u3046\u3002","Connect the turns to bring the parcel to its matching depot."),robots:[{id:"A",start:20,direction:1,goal:24}],sockets:[22,7,9],initial:[1,0,1],walls:qs(5,[20,21,22,17,12,7,8,9,14,19,24])},{kind:"delivery",id:"D03",version:1,answerKey:"D03@1",size:5,title:Ln("\u4EA4\u5DEE\u70B9\u3067\u3069\u3046\u305E","After you"),lesson:Ln("\u5168\u54E1\u3092\u5C4A\u3051\u3088\u3046\u3002\u6642\u8A08\u306E\u5834\u6240\u3067\u5C11\u3057\u5F85\u3064\u3068\u3001\u4EA4\u5DEE\u70B9\u3092\u8B72\u308C\u308B\u3002","Deliver every parcel. A short wait at the clock can clear the crossing."),robots:[{id:"A",start:10,direction:1,goal:14},{id:"B",start:2,direction:2,goal:22}],sockets:[11,7],initial:[1,2],waitCell:11,walls:qs(5,[10,11,12,13,14,2,7,17,22])},{kind:"delivery",id:"D04",version:1,answerKey:"D04@1",size:6,title:Ln("\u3075\u305F\u3064\u306E\u4EA4\u5DEE\u70B9","Two crossings"),lesson:Ln("\u5F85\u3061\u3059\u304E\u3066\u3082\u3001\u6B21\u306E\u4EA4\u5DEE\u70B9\u3067\u3076\u3064\u304B\u308B\u30021\u30B3\u30DE\u305A\u3064\u898B\u3066\u307F\u3088\u3046\u3002","Waiting too long can block the next crossing. Watch one beat at a time."),robots:[{id:"A",start:18,direction:1,goal:23},{id:"B",start:8,direction:2,goal:15}],sockets:[26,27],initial:[2,1],waitCell:19,walls:qs(6,[18,19,20,21,22,23,8,14,26,27,15])},{kind:"delivery",id:"D05",version:1,answerKey:"D05@1",size:6,title:Ln("\u9053\u3068\u6642\u9593\u306E\u30D1\u30BA\u30EB","A route and a rhythm"),lesson:Ln("\u66F2\u304C\u308B\u5834\u6240\u3068\u5F85\u3064\u5834\u6240\u3002\u3075\u305F\u308A\u3068\u3082\u5C4A\u3051\u308B\u8A08\u753B\u3092\u4F5C\u308D\u3046\u3002","Plan the turns and the wait to deliver both parcels."),robots:[{id:"A",start:12,direction:1,goal:5},{id:"B",start:2,direction:2,goal:32}],sockets:[15,3],initial:[1,0],waitCell:13,walls:qs(6,[12,13,14,15,9,3,4,5,2,8,20,26,32])}],of=[[{ja:"\u77E2\u5370\u306F\u3001\u305D\u306E\u30DE\u30B9\u3092\u51FA\u308B\u65B9\u5411\u3092\u6C7A\u3081\u308B\u3002",en:"An arrow controls the direction when leaving its cell."},{ja:"\u4E2D\u592E\u306F\u5317\u3001\u4E0A\u306F\u6771\u3078\u5411\u3051\u3088\u3046\u3002",en:"Point the middle arrow north and the top arrow east."}],[{ja:"\u8377\u7269\u304B\u3089\u53D7\u53D6\u53E3\u307E\u3067\u3001\u66F2\u304C\u308A\u89D2\u3092\u76EE\u3067\u8FFD\u304A\u3046\u3002",en:"Trace the turns from the parcel to its depot."},{ja:"\u4E0B\u304B\u3089\u3001\u5317\u30FB\u6771\u30FB\u5357\u306E\u9806\u306B\u66F2\u304C\u308B\u3002",en:"From the bottom, turn north, east, then south."}],[{ja:"\u5F85\u305F\u306A\u3044\u3068\u4E2D\u592E\u3067\u540C\u6642\u306B\u4F1A\u3046\u3002",en:"Without a wait, both arrive at the center together."},{ja:"A\u306E\u6642\u8A08\u30921\u62CD\u306B\u3057\u3066\u3001B\u3092\u5148\u306B\u901A\u305D\u3046\u3002",en:"Set A to one beat so B passes first."}],[{ja:"B\u306F\u4E0B\u3092\u56DE\u308A\u3001\u4E8C\u3064\u76EE\u306E\u4EA4\u5DEE\u3078\u623B\u308B\u3002",en:"B loops below and returns to the second crossing."},{ja:"\u4E0B\u306E\u77E2\u5370\u306F\u6771\u3001\u53F3\u306F\u5317\u3002A\u306E\u5F85\u6A5F\u306F1\u62CD\u3002",en:"Point the lower arrows east then north. Wait A one beat."}],[{ja:"A\u3092\u5317\u304B\u3089\u53D7\u53D6\u53E3\u3078\u3002B\u306F\u305D\u306E\u307E\u307E\u5357\u3078\u3002",en:"Route A north toward its depot; B continues south."},{ja:"A\u306E\u4E8C\u3064\u306E\u77E2\u5370\u3092\u5317\u3001\u6771\u306B\u3057\u3066\u30011\u62CD\u5F85\u3068\u3046\u3002",en:"Turn A north then east and wait one beat."}]],Dn=[...af.map((i,e)=>({...i,hints:of[e]})),{kind:"delivery",id:"D06",version:1,answerKey:"D06@1",size:6,title:{ja:"\u5C0F\u3055\u306A\u5F15\u304D\u7D99\u304E",en:"Your own plan"},lesson:{ja:"\u9053\u3092\u6574\u3048\u3001\u4EA4\u5DEE\u70B9\u304C\u7A7A\u3044\u3066\u304B\u3089\u9032\u3082\u3046\u3002",en:"Set the turns and enter after the crossing clears."},robots:[{id:"A",start:12,direction:1,goal:4},{id:"B",start:2,direction:2,goal:32}],sockets:[16,10,13],initial:[1,1,0],allowedDirections:[[0,1],[0,1],[1,0]],waitCells:[13],maxWait:2,fixedArrows:{},walls:[0,1,3,5,6,7,9,11,17,18,19,21,22,23,24,25,27,28,29,30,31,33,34,35],hints:[{ja:"\u4E8C\u53F0\u304C\u7E26\u306E\u9053\u3078\u5165\u308B\u6642\u523B\u3092\u6BD4\u3079\u3088\u3046\u3002",en:"Compare when each robot enters the vertical road."},{ja:"A\u3092\u6642\u8A08\u30671\u62CD\u5F85\u305F\u305B\u3001\u53F3\u306E\u66F2\u304C\u308A\u89D2\u304B\u3089\u5317\u3078\u3002",en:"Wait A for one beat, then turn north at the right corner."}]},{kind:"delivery",id:"D07",version:1,answerKey:"D07@1",size:6,title:{ja:"\u8FD1\u9053\u306E\u5411\u3053\u3046",en:"The useful detour"},lesson:{ja:"\u8FD1\u9053\u304C\u3075\u3055\u304C\u308B\u306A\u3089\u3001\u5916\u5074\u306E\u9053\u3092\u4F7F\u304A\u3046\u3002",en:"When the shortcut is busy, try the outer road."},robots:[{id:"A",start:12,direction:1,goal:16},{id:"B",start:33,direction:0,goal:9}],sockets:[14,8,10],initial:[1,1,1],allowedDirections:[[0,1],[0,1],[2,1]],waitCells:[],maxWait:2,fixedArrows:{2:1,4:2},walls:[0,1,5,6,7,11,17,18,19,20,22,23,24,25,26,28,29,30,31,32,34,35],hints:[{ja:"\u53F3\u3078\u76F4\u9032\u3059\u308B\u3068\u3001\u5411\u3053\u3046\u304B\u3089B\u304C\u6765\u308B\u3002",en:"Going straight meets B coming toward the crossing."},{ja:"A\u3092\u5317\u306E\u5916\u5468\u3078\u3002\u4E0A\u306E\u56FA\u5B9A\u77E2\u5370\u304C\u6771\u3001\u5357\u3078\u5C0E\u304F\u3002",en:"Send A around the north edge. Painted arrows lead east, then south."}]},{kind:"delivery",id:"D08",version:1,answerKey:"D08@1",size:7,title:{ja:"\u3072\u3068\u3064\u306E\u901A\u308A\u9053",en:"One shared crossing"},lesson:{ja:"\u5171\u6709\u3059\u308B\u30DE\u30B9\u3078\u5165\u308B\u9806\u756A\u3092\u6C7A\u3081\u3088\u3046\u3002",en:"Choose who enters the shared cell first."},robots:[{id:"A",start:21,direction:1,goal:27},{id:"B",start:3,direction:2,goal:45}],sockets:[22,10,26],initial:[0,1,0],allowedDirections:[[1,0],[2,1],[1,0]],waitCells:[22],maxWait:2,fixedArrows:{},walls:[0,1,2,4,5,6,7,8,9,11,12,13,14,15,16,18,19,20,28,29,30,32,33,34,35,36,37,39,40,41,42,43,44,46,47,48],hints:[{ja:"\u4E2D\u592E\u3078\u7740\u304F\u306E\u306F\u3001\u4E8C\u53F0\u3068\u30823\u62CD\u76EE\u3002",en:"Both reach the center on beat three."},{ja:"A\u30921\u62CD\u5F85\u305F\u305B\u308B\u3068\u3001B\u304C\u5148\u306B\u4E2D\u592E\u3092\u629C\u3051\u308B\u3002",en:"A one-beat wait lets B cross first."}]},{kind:"delivery",id:"D09",version:1,answerKey:"D09@1",size:6,title:{ja:"\u5F85\u3064\u5834\u6240\u3092\u9078\u307C\u3046",en:"Choose the waiting place"},lesson:{ja:"\u540C\u3058\u9577\u3055\u306E\u5F85\u6A5F\u3067\u3082\u3001\u7F6E\u304F\u5074\u3067\u9806\u756A\u304C\u5909\u308F\u308B\u3002",en:"The same wait changes the order when assigned to the other robot."},robots:[{id:"A",start:12,direction:1,goal:17},{id:"B",start:2,direction:2,goal:32}],sockets:[13,8],initial:[0,1],allowedDirections:[[1,0],[2,1]],waitCells:[13,8],maxWait:2,fixedArrows:{},walls:[0,1,3,4,5,6,7,9,10,11,18,19,21,22,23,24,25,27,28,29,30,31,33,34,35],hints:[{ja:"\u4E21\u65B9\u306B\u540C\u3058\u62CD\u6570\u3092\u8DB3\u3059\u3068\u3001\u5DEE\u306F\u5909\u308F\u3089\u306A\u3044\u3002",en:"Equal waits keep their arrival times equal."},{ja:"\u307E\u305AA\u3060\u3051\u30921\u62CD\u5F85\u305F\u305B\u3066\u307F\u3088\u3046\u3002",en:"Start by giving only A a one-beat wait."}]},{kind:"delivery",id:"D10",version:1,answerKey:"D10@1",size:7,title:{ja:"\u7A7A\u3044\u305F\u30DE\u30B9\u3078",en:"Into the space left behind"},lesson:{ja:"\u76F8\u624B\u304C\u51FA\u308B\u30DE\u30B9\u306B\u306F\u3001\u540C\u3058\u62CD\u3067\u5165\u308C\u308B\u3002",en:"You may enter a cell on the beat its occupant leaves."},robots:[{id:"A",start:17,direction:0,goal:3},{id:"B",start:16,direction:1,goal:20}],sockets:[10,18],initial:[1,2],allowedDirections:[[0,1],[1,2]],waitCells:[],maxWait:2,fixedArrows:{},walls:[0,1,2,4,5,6,7,8,9,11,12,13,14,15,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],hints:[{ja:"A\u306F\u5317\u3078\u3001B\u306F\u305D\u306E\u5F8C\u306E\u7A7A\u3044\u305F\u30DE\u30B9\u3078\u9032\u3080\u3002",en:"A moves north; B enters the cell A leaves."},{ja:"\u4E0A\u306E\u77E2\u5370\u306F\u5317\u3001\u53F3\u306E\u77E2\u5370\u306F\u6771\u3078\u3002\u5F85\u6A5F\u306F\u4E0D\u8981\u3002",en:"Point the upper plate north and the right plate east. No wait is needed."}]},{kind:"delivery",id:"D11",version:1,answerKey:"D11@1",size:6,title:{ja:"\u5411\u304B\u3044\u5408\u3046\u524D\u306B",en:"Before the head-on meeting"},lesson:{ja:"\u6B63\u9762\u304B\u3089\u5165\u308C\u66FF\u308F\u308B\u9053\u3092\u907F\u3051\u3088\u3046\u3002",en:"Avoid exchanging cells head-on."},robots:[{id:"A",start:12,direction:1,goal:23},{id:"B",start:5,direction:2,goal:27}],sockets:[14,20,17,15],initial:[1,0,2,1],allowedDirections:[[2,1],[1,0],[3,2],[2,1]],waitCells:[],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,6,7,8,9,10,18,19,24,25,26,28,29,30,31,32,33,34,35],hints:[{ja:"\u4E2D\u592E\u306E\u77E2\u5370\u3092\u6771\u3078\u305D\u308D\u3048\u308B\u3068\u30014\u62CD\u76EE\u306B\u6B63\u9762\u304B\u3089\u3059\u308C\u9055\u304A\u3046\u3068\u3059\u308B\u3002",en:"With the center arrows pointing east, the robots try to swap head-on on beat four."},{ja:"A\u306F\u5357\u3078\u56DE\u308A\u3001B\u306F\u897F\u304B\u3089\u5357\u3078\u3002A\u304C\u4E0B\u306E\u4EA4\u5DEE\u70B9\u3092\u5148\u306B\u901A\u308B\u3002",en:"Route A south. Turn B west then south; A clears the lower crossing first."}]},{kind:"delivery",id:"D12",version:1,answerKey:"D12@1",size:6,title:{ja:"\u66F2\u304C\u308A\u89D2\u306E\u7D04\u675F",en:"Turns and timing"},lesson:{ja:"\u7D4C\u8DEF\u3092\u6574\u3048\u305F\u3089\u3001\u4E8C\u53F0\u306E\u4EA4\u5DEE\u3092\u8ABF\u6574\u3057\u3088\u3046\u3002",en:"After setting the route, tune the crossing."},robots:[{id:"A",start:12,direction:1,goal:23},{id:"B",start:11,direction:2,goal:27}],sockets:[14,20,17,15],initial:[1,0,2,1],allowedDirections:[[2,1],[1,0],[3,2],[2,1]],waitCells:[13,17],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,5,6,7,8,9,10,18,19,24,25,26,28,29,30,31,32,33,34,35],hints:[{ja:"\u4E0B\u306E\u4EA4\u5DEE\u70B9\u3078\u3001\u4E8C\u53F0\u304C\u540C\u6642\u306B\u6765\u308B\u8A2D\u5B9A\u3092\u898B\u3064\u3051\u3088\u3046\u3002",en:"Watch for the setting that brings both to the lower crossing together."},{ja:"A\u30921\u62CD\u5F85\u305F\u305B\u3001B\u306F\u5F85\u305F\u305B\u306A\u3044\u3068\u5148\u306B\u629C\u3051\u3089\u308C\u308B\u3002",en:"Wait A one beat and leave B at zero so B clears first."}]},{kind:"delivery",id:"D13",version:1,answerKey:"D13@1",size:7,title:{ja:"\u3082\u3046\u4E00\u5EA6\u51FA\u4F1A\u3046",en:"They meet again"},lesson:{ja:"\u6700\u521D\u306E\u4EA4\u5DEE\u3060\u3051\u3067\u5B89\u5FC3\u305B\u305A\u3001\u6B21\u3082\u78BA\u304B\u3081\u3088\u3046\u3002",en:"Check the second crossing after clearing the first."},robots:[{id:"A",start:21,direction:1,goal:27},{id:"B",start:9,direction:2,goal:18}],sockets:[30,32,24],initial:[2,1,0],allowedDirections:[[1,2],[0,1],[1,0]],waitCells:[22],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,17,19,20,28,29,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],hints:[{ja:"B\u306F\u4E0B\u3092\u56DE\u3063\u3066\u3001\u53F3\u306E\u4EA4\u5DEE\u70B9\u3078\u623B\u3063\u3066\u304F\u308B\u3002",en:"B loops below and returns to the crossing on the right."},{ja:"A\u30921\u62CD\u5F85\u305F\u305B\u308B\u3068\u3001\u6700\u521D\u306FB\u3001\u6B21\u306FA\u304C\u5148\u306B\u306A\u308B\u3002",en:"Wait A one beat: B goes first at the first crossing, then A at the next."}]},{kind:"delivery",id:"D14",version:1,answerKey:"D14@1",size:7,title:{ja:"\u4ECA\u5EA6\u306F\u3069\u3046\u305E",en:"Taking turns"},lesson:{ja:"\u6700\u521D\u3068\u6B21\u306E\u4EA4\u5DEE\u3067\u3001\u5148\u3092\u8B72\u308B\u5074\u304C\u5909\u308F\u308B\u3002",en:"The robot that goes first changes at the next crossing."},robots:[{id:"A",start:2,direction:2,goal:10},{id:"B",start:14,direction:2,goal:27}],sockets:[30,17,25],initial:[2,1,2],allowedDirections:[[1,2],[0,1],[1,2]],waitCells:[22],maxWait:2,fixedArrows:{31:0,21:1},walls:[0,1,3,4,5,6,7,8,11,12,13,15,18,19,20,28,29,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],hints:[{ja:"\u6700\u521D\u306E\u5171\u6709\u30DE\u30B9\u306B\u306F\u3001\u4E8C\u53F0\u3068\u30823\u62CD\u3067\u7740\u304F\u3002",en:"Both reach the first shared cell in three beats."},{ja:"B\u30921\u62CD\u5F85\u305F\u305B\u3088\u3046\u3002\u6700\u521D\u306FA\u3001\u6B21\u306FB\u304C\u5148\u306B\u901A\u308C\u308B\u3002",en:"Wait B one beat. A passes first at the first crossing, then B at the next."}]},{kind:"delivery",id:"D15",version:1,answerKey:"D15@1",size:6,title:{ja:"\u5F85\u3061\u3059\u304E\u6CE8\u610F",en:"More is not always safer"},lesson:{ja:"\u5F85\u6A5F\u3092\u5897\u3084\u3057\u305F\u3068\u304D\u3001\u4E8C\u5EA6\u76EE\u306E\u4EA4\u5DEE\u3082\u898B\u3088\u3046\u3002",en:"When adding a wait, check the second crossing too."},robots:[{id:"A",start:8,direction:2,goal:15},{id:"B",start:18,direction:1,goal:23}],sockets:[26,27,22],initial:[2,1,0],allowedDirections:[[1,2],[0,1],[1,0]],waitCells:[19,26],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,5,6,7,9,10,11,12,13,16,17,24,25,28,29,30,31,32,33,34,35],hints:[{ja:"A\u306F\u4E0B\u3092\u56DE\u308B\u3002B\u3092\u9045\u3089\u305B\u308B\u3068\u3001\u4E8C\u5EA6\u76EE\u306FA\u306B\u8FD1\u3065\u304F\u3002",en:"A loops below. Delaying B brings it closer to A at the second crossing."},{ja:"B\u30921\u62CD\u3001A\u30920\u62CD\u3067\u901A\u305B\u308B\u3002B\u3060\u30512\u62CD\u306B\u3059\u308B\u3068\u885D\u7A81\u3059\u308B\u3002",en:"B at one beat and A at zero works. Two beats for B alone causes a collision."}]},{kind:"delivery",id:"D16",version:1,answerKey:"D16@1",size:7,title:{ja:"\u9053\u3067\u6642\u9593\u3092\u4F5C\u308B",en:"Make time with a route"},lesson:{ja:"\u9060\u56DE\u308A\u3068\u5F85\u6A5F\u3092\u7D44\u307F\u5408\u308F\u305B\u3066\u901A\u305D\u3046\u3002",en:"Combine a detour and a wait to clear the crossing."},robots:[{id:"A",start:21,direction:1,goal:34},{id:"B",start:13,direction:2,goal:39}],sockets:[23,30,27,25],initial:[1,0,2,1],allowedDirections:[[2,1],[1,0],[3,2],[2,1]],waitCells:[22],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,28,29,35,36,37,38,40,41,42,43,44,45,46,47,48],hints:[{ja:"B\u306F\u4E0A\u304B\u3089\u6765\u3066\u897F\u3078\u3002A\u304C\u76F4\u9032\u3059\u308B\u3068\u914D\u9054\u5148\u3078\u5C4A\u304B\u306A\u3044\u3002",en:"B comes from above, then turns west. A cannot reach its depot by going straight."},{ja:"A\u306F\u5357\u304B\u3089\u6771\u3078\u56DE\u308A\u30011\u62CD\u5F85\u3064\u3068\u4E0B\u306E\u4EA4\u5DEE\u3092B\u304C\u5148\u306B\u629C\u3051\u308B\u3002",en:"Send A south then east and wait one beat so B clears the lower crossing first."}]},{kind:"delivery",id:"D17",version:1,answerKey:"D17@1",size:7,title:{ja:"\u6700\u5F8C\u306E\u7DF4\u7FD2\u4FBF",en:"The rehearsal delivery"},lesson:{ja:"\u4E8C\u3064\u306E\u4EA4\u5DEE\u3068\u3001\u5F85\u3064\u4F4D\u7F6E\u3092\u307E\u3068\u3081\u3066\u8003\u3048\u3088\u3046\u3002",en:"Plan both crossings and the location of the wait."},robots:[{id:"A",start:9,direction:2,goal:20},{id:"B",start:21,direction:1,goal:27}],sockets:[30,31,17,25],initial:[2,1,0,2],allowedDirections:[[1,2],[0,1],[1,0],[1,2]],waitCells:[22,30],maxWait:2,fixedArrows:{},walls:[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,28,29,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],hints:[{ja:"\u6700\u521D\u306E\u4EA4\u5DEE\u3067\u306FA\u3092\u5148\u306B\u3002A\u306F\u4E0B\u304B\u3089\u6B21\u3078\u623B\u3063\u3066\u304F\u308B\u3002",en:"Let A pass the first crossing first. It loops back from below."},{ja:"B\u30921\u62CD\u3001A\u30920\u62CD\u3002\u4E8C\u5EA6\u76EE\u306FB\u304C\u5148\u306B\u901A\u308A\u3001A\u306F\u4E0A\u306E\u53D7\u53D6\u53E3\u3078\u3002",en:"Wait B one beat and A zero. B crosses next; A continues to the upper depot."}]},{kind:"delivery",id:"D18",version:1,answerKey:"D18@1",size:7,title:{ja:"\u6700\u5F8C\u306E\u914D\u9054",en:"The final delivery"},lesson:{ja:"\u6700\u521D\u306FA\u3001\u6B21\u306FB\u3002\u9053\u306E\u9577\u3055\u3068\u5F85\u3064\u5834\u6240\u3092\u4F7F\u3044\u5206\u3051\u3088\u3046\u3002",en:"A first, then B. Use the route length and the right waiting place."},robots:[{id:"A",start:9,direction:2,goal:18},{id:"B",start:21,direction:1,goal:27}],sockets:[16,30,32,26],initial:[1,2,1,0],allowedDirections:[[2,1],[1,2],[0,1],[1,0]],waitCells:[22,30],maxWait:2,fixedArrows:{37:1,39:0},walls:[0,1,2,3,4,5,6,7,8,10,11,12,13,14,15,17,19,20,28,29,33,34,35,36,40,41,42,43,44,45,46,47,48],hints:[{ja:"B\u306E\u6642\u8A08\u3067\u6700\u521D\u3092\u8B72\u308B\u3002A\u306F\u4E0B\u306E\u9053\u3067\u6B21\u306E\u4EA4\u5DEE\u3092\u9045\u3089\u305B\u3089\u308C\u308B\u3002",en:"B can yield at its clock. A can use the lower road to reach the next crossing later."},{ja:"B\u30922\u62CD\u3001A\u30920\u62CD\u3002A\u306F\u4E0B\u306E\u9577\u3044\u9053\u304B\u3089\u5317\u3078\u623B\u308B\u3002\u77ED\u3044\u9053\u306A\u3089B\u306F1\u62CD\u3002",en:"Wait B two beats and A zero. Send A along the long lower road, then north. With the short road, B needs one beat."}]}];function Hl(i,e,t){let n=i%t+[0,1,0,-1][e],s=Math.floor(i/t)+[-1,0,1,0][e];return n<0||s<0||n>=t||s>=t?-1:s*t+n}function Ih(i){return JSON.stringify([...i].sort((e,t)=>e.id.localeCompare(t.id)).map(e=>[e.id,e.p,e.d,e.remaining,e.delivered]))}function Ma(i){let e=i.robots.map(t=>({id:t.id,p:t.start,d:t.direction,remaining:0,delivered:!1}));return{bots:e,tick:0,seen:[Ih(e)],status:"running"}}function Ys(i){return i.waitCells??(i.waitCell===void 0?[]:[i.waitCell])}function Wl(i,e,t){if(t.status!=="running")return t;let n=Ys(i),s=t.bots.map(u=>{if(u.delivered)return{...u};if(u.remaining>0)return{...u,remaining:u.remaining-1};let f=i.sockets.indexOf(u.p),g=f>=0?e.arrows[f]:i.fixedArrows?.[u.p]??u.d,v=Hl(u.p,g,i.size),m=n.indexOf(v),p=m<0?0:i.waitCells?e.waits?.[m]??0:e.wait;return{...u,p:v,d:g,remaining:p}}),r=new Map,a=(u,...f)=>{let g=r.get(u)??new Set;f.filter(v=>v>=0).forEach(v=>g.add(v)),r.set(u,g)};s.forEach((u,f)=>{u.delivered||(u.p<0&&a("boundary",t.bots[f].p),i.walls.includes(u.p)&&a("wall",u.p),i.robots.some(g=>g.id!==u.id&&g.goal===u.p)&&a("wrong-goal",u.p),s.forEach((g,v)=>{f>=v||g.delivered||(u.p===g.p&&a("collision",u.p),u.p!==t.bots[f].p&&u.p===t.bots[v].p&&g.p===t.bots[f].p&&a("swap",u.p,g.p))}))});let o=["boundary","wall","wrong-goal","collision","swap"].find(u=>r.has(u));if(o)return{...t,tick:t.tick+1,status:"failed",reason:o,failureCells:[...r.get(o)].sort((u,f)=>u-f)};let l=s.map(u=>({...u,delivered:u.delivered||i.robots.some(f=>f.id===u.id&&f.goal===u.p)}));if(l.every(u=>u.delivered))return{bots:l,tick:t.tick+1,seen:t.seen,status:"won"};let c=Ih(l),h=t.seen.includes(c),d=t.tick+1>=100;return{bots:l,tick:t.tick+1,seen:[...t.seen,c],status:h||d?"failed":"running",...h||d?{reason:h?"loop":"limit",failureCells:l.filter(u=>!u.delivered).map(u=>u.p)}:{}}}var Se=(i,e)=>({ja:i,en:e}),Lh=[{kind:"light",id:"L01",version:1,answerKey:"L01@1",size:5,title:Se("\u306F\u3058\u3081\u306E\u3072\u3068\u3059\u3058","A first ray"),lesson:Se("\u93E1\u3092\u56DE\u3057\u3066\u3001\u5149\u3092\u82B1\u3078\u5C4A\u3051\u3088\u3046\u3002","Turn the mirror to send light to the flower."),source:15,direction:1,mirrors:[17],initial:[!1],flowers:[2],walls:[6,8,21,23],hints:[Se("\u82B1\u304B\u3089\u5149\u6E90\u3078\u3001\u9053\u3092\u9006\u306B\u305F\u3069\u308D\u3046\u3002","Trace a route back from the flower."),Se("\u4E0B\u3078\u5411\u304B\u3046\u5149\u3092\u3001\u93E1\u3067\u4E0A\u3078\u66F2\u3052\u3088\u3046\u3002","Turn the downward ray upward at the mirror.")]},{kind:"light",id:"L02",version:1,answerKey:"L02@1",size:5,title:Se("\u3075\u305F\u3064\u306E\u66F2\u304C\u308A\u89D2","Two little turns"),lesson:Se("\u93E1\u304B\u3089\u93E1\u3078\u3002\u5149\u306E\u884C\u304D\u5148\u3092\u76EE\u3067\u8FFD\u304A\u3046\u3002","Follow the light from one mirror to the next."),source:20,direction:1,mirrors:[22,7],initial:[!1,!1],flowers:[9],walls:[11,13,16,18],hints:[Se("\u307E\u305A\u3001\u5149\u3092\u4E0A\u306E\u93E1\u307E\u3067\u5C4A\u3051\u3088\u3046\u3002","First send light to the upper mirror."),Se("\u4E0A\u306E\u93E1\u304B\u3089\u82B1\u3078\u306F\u3001\u53F3\u5411\u304D\u306E\u5149\u304C\u5FC5\u8981\u3002","The upper mirror must send light right toward the flower.")]},{kind:"light",id:"L03",version:1,answerKey:"L03@1",size:6,title:Se("\u77F3\u57A3\u306E\u5411\u3053\u3046","Beyond the stones"),lesson:Se("\u77F3\u57A3\u3092\u56DE\u308A\u8FBC\u3093\u3067\u3001\u3075\u305F\u3064\u306E\u82B1\u3092\u540C\u6642\u306B\u7167\u3089\u305D\u3046\u3002","Go around the stones and light both flowers together."),source:30,direction:1,mirrors:[32,14,16,28],initial:[!1,!1,!0,!1],flowers:[22,27],walls:[33,21,8],hints:[Se("\u77F3\u57A3\u306E\u4E0A\u5074\u3092\u901A\u3063\u3066\u3001\u53F3\u306E\u82B1\u3078\u3002","Go above the stones to reach the right flower."),Se("\u53F3\u306E\u82B1\u3092\u901A\u3063\u305F\u5149\u3092\u3001\u4E0B\u306E\u93E1\u3067\u5DE6\u3078\u623B\u305D\u3046\u3002","After the right flower, turn light left at the lower mirror.")]},{kind:"light",id:"L04",version:1,answerKey:"L04@1",size:5,title:Se("\u7720\u3063\u3066\u3044\u305F\u9580","The sleeping gate"),lesson:Se("\u25C7\u3092\u7167\u3089\u3059\u3068\u9580\u304C\u958B\u304F\u3002\u9580\u306F\u958B\u3044\u305F\u307E\u307E\u3002","Light the \u25C7 switch. Its gate stays open."),source:15,direction:1,mirrors:[17],initial:[!1],flowers:[2],switch:12,gate:7,walls:[6,8,21,23],hints:[Se("\u9580\u3068\u540C\u3058\u5370\u306E\u30B9\u30A4\u30C3\u30C1\u3092\u63A2\u305D\u3046\u3002","Find the switch with the gate\u2019s symbol."),Se("\u93E1\u304B\u3089\u4E0A\u3078\u9001\u308B\u3068\u3001\u30B9\u30A4\u30C3\u30C1\u3068\u9580\u3092\u9806\u306B\u901A\u308B\u3002","Light sent upward visits the switch, then the gate.")]},{kind:"light",id:"L05",version:1,answerKey:"L05@1",size:5,title:Se("\u5149\u306E\u5BC4\u308A\u9053","Light takes a detour"),lesson:Se("\u5148\u306B\u25C7\u3078\u3002\u305D\u306E\u3042\u3068\u3001\u958B\u3044\u305F\u9580\u306E\u5148\u306E\u82B1\u3078\u3002","Visit \u25C7 first, then send the light through its open gate."),source:10,direction:1,mirrors:[12],initial:[!0],flowers:[2],switch:22,gate:7,walls:[6,8,16,18],hints:[Se("\u82B1\u3088\u308A\u5148\u306B\u3001\u4E0B\u306E\u30B9\u30A4\u30C3\u30C1\u3092\u7167\u3089\u305D\u3046\u3002","Light the lower switch before the flower."),Se("\u4E00\u5EA6\u4E0B\u3078\u3001\u6B21\u306B\u4E0A\u3078\u3002\u9580\u306F\u958B\u3044\u305F\u307E\u307E\u3002","Send light down, then up. The gate stays open.")]},{kind:"light",id:"L06",version:1,answerKey:"L06@1",size:6,title:Se("\u3072\u3068\u308A\u3067\u5EAD\u4ED5\u4E8B","Your own garden"),lesson:Se("\u3075\u305F\u3064\u306E\u93E1\u3067\u3001\u6E96\u5099\u3068\u4ED5\u4E0A\u3052\u306E\u9053\u3092\u4F5C\u308D\u3046\u3002","Use two mirrors to prepare, then finish the route."),source:0,direction:1,mirrors:[3,21],initial:[!0,!1],flowers:[23],switch:18,gate:22,walls:[7,8,13,14,25,26],hints:[Se("\u5DE6\u306E\u30B9\u30A4\u30C3\u30C1\u3067\u3001\u53F3\u306E\u9580\u304C\u958B\u304F\u3002","The left switch opens the right gate."),Se("\u4E0B\u306E\u93E1\u3092\u5DE6\u3078\u5411\u3051\u3066\u6E96\u5099\u3057\u3001\u53F3\u3078\u5411\u3051\u3066\u4ED5\u4E0A\u3052\u3088\u3046\u3002","Use the lower mirror to visit left, then finish to the right.")]},{kind:"light",id:"L07",version:1,answerKey:"L07@1",size:6,title:Se("\u3075\u305F\u3064\u306E\u5FBD\u7AE0","Two matching crests"),lesson:Se("A\u3068B\u3002\u305D\u308C\u305E\u308C\u306E\u30B9\u30A4\u30C3\u30C1\u304C\u3001\u540C\u3058\u5370\u306E\u9580\u3092\u958B\u304F\u3002","Each switch opens the gate with its matching A or B crest."),source:18,direction:1,mirrors:[20,26,8,11],initial:[!1,!1,!1,!0],flowers:[35],gates:[{id:"A",gate:17,switch:14},{id:"B",gate:23,switch:24}],walls:[0,1,3,4,15,16,27,28,30,31],hints:[Se("\u53F3\u7AEF\u306E\u82B1\u3078\u5C4A\u304F\u306B\u306F\u3001\u4E8C\u3064\u3068\u3082\u958B\u3051\u308B\u5FC5\u8981\u304C\u3042\u308B\u3002","Both gates must open to reach the far-right flower."),Se("\u4E0B\u306E\u93E1\u304B\u3089B\u3001\u4E0A\u3078\u5411\u304B\u3046\u9053\u3067A\u3002\u6700\u5F8C\u306F\u53F3\u7AEF\u3092\u4E0B\u308D\u3046\u3002","Visit B via the lower mirror and A on the way up. Finish down the right edge.")]},{kind:"light",id:"L08",version:1,answerKey:"L08@1",size:6,title:Se("\u5965\u3078\u7D9A\u304F\u9375","A key beyond a key"),lesson:Se("A\u306E\u9580\u306E\u5148\u306B\u3001B\u306E\u30B9\u30A4\u30C3\u30C1\u3002\u9806\u756A\u3092\u898B\u3064\u3051\u3088\u3046\u3002","The B switch is beyond gate A. Find the opening order."),source:30,direction:1,mirrors:[32,14,16],initial:[!1,!1,!1],flowers:[28,34],gates:[{id:"A",gate:10,switch:12},{id:"B",gate:22,switch:4}],walls:[0,1,6,7,18,19,21,25,27,33],hints:[Se("\u307E\u305A\u5DE6\u306EA\u3078\u3002B\u3078\u306E\u5149\u8DEF\u3092\u958B\u3053\u3046\u3002","Visit A on the left to open the route to B."),Se("\u53F3\u306E\u93E1\u3092\u4E00\u5EA6\u4E0A\u3078\u5411\u3051\u3001B\u304C\u958B\u3044\u305F\u3089\u4E0B\u3078\u623B\u305D\u3046\u3002","Point the right mirror upward for B, then downward for the flowers.")]},{kind:"light",id:"L09",version:1,answerKey:"L09@1",size:6,title:Se("\u3072\u3068\u3059\u3058\u304C\u3001\u3075\u305F\u3059\u3058\u306B","One ray becomes two"),lesson:Se("\u56FA\u5B9A\u5206\u5149\u5668\u306F\u3001\u77E2\u5370\u306E\u5165\u53E3\u304B\u3089\u6765\u305F\u5149\u3092\u4E8C\u3064\u3078\u5206\u3051\u308B\u3002","The fixed splitter divides light arriving through its marked entrance."),source:30,direction:1,mirrors:[32],initial:[!1],flowers:[12,17],splitter:{cell:14,input:0,outputs:[3,1]},walls:[3,4,21,27],hints:[Se("\u5206\u5149\u5668\u306E\u5165\u53E3\u306F\u4E0B\u3002\u5149\u3092\u4E0A\u3078\u9001\u308D\u3046\u3002","The splitter\u2019s entrance is below it. Send light upward."),Se("\u5206\u5149\u5668\u306F\u56DE\u305B\u306A\u3044\u3002\u4E0B\u306E\u93E1\u3092\u56DE\u3059\u3068\u4E8C\u3064\u306E\u679D\u304C\u751F\u307E\u308C\u308B\u3002","The splitter stays fixed. Turn the lower mirror to create two branches.")]},{kind:"light",id:"L10",version:1,answerKey:"L10@1",size:6,title:Se("\u679D\u306E\u5148\u306E\u82B1","Flowers at the branch tips"),lesson:Se("\u679D\u3054\u3068\u306B\u93E1\u3092\u8ABF\u6574\u3057\u3066\u3001\u4E8C\u3064\u306E\u82B1\u3092\u540C\u6642\u306B\u3002","Adjust each branch to light both flowers together."),source:30,direction:1,mirrors:[32,13,16],initial:[!1,!1,!1],flowers:[25,4],splitter:{cell:14,input:0,outputs:[3,1]},walls:[0,2,6,8,21,23,27,29],hints:[Se("\u5DE6\u306E\u82B1\u306F\u4E0B\u3001\u53F3\u306E\u82B1\u306F\u4E0A\u306B\u3042\u308B\u3002","The left flower is below; the right flower is above."),Se("\u5206\u304B\u308C\u305F\u5149\u3092\u3001\u5DE6\u306E\u93E1\u3067\u4E0B\u3078\u3001\u53F3\u306E\u93E1\u3067\u4E0A\u3078\u3002","Turn the left branch downward and the right branch upward.")]},{kind:"light",id:"L11",version:1,answerKey:"L11@1",size:6,title:Se("\u679D\u306B\u3082\u5BC4\u308A\u9053","A branch takes a detour"),lesson:Se("\u4E00\u672C\u306E\u679D\u3067\u6E96\u5099\u3092\u3057\u3066\u3001\u305D\u306E\u679D\u3092\u82B1\u3078\u623B\u305D\u3046\u3002","Use one branch to prepare, then return it to the flower."),source:30,direction:1,mirrors:[32,13],initial:[!1,!0],flowers:[25,17],gate:19,switch:1,splitter:{cell:14,input:0,outputs:[3,1]},walls:[0,2,6,8,21,23,27,29],hints:[Se("\u5DE6\u306E\u679D\u306F\u3001\u5148\u306B\u4E0A\u306E\u30B9\u30A4\u30C3\u30C1\u3078\u3002","Send the left branch to the upper switch first."),Se("\u9580\u304C\u958B\u3044\u305F\u3089\u3001\u540C\u3058\u93E1\u3092\u4E0B\u5411\u304D\u3078\u623B\u305D\u3046\u3002","Once the gate opens, turn that same branch downward again.")]},{kind:"light",id:"L12",version:1,answerKey:"L12@1",size:6,title:Se("\u6E29\u5BA4\u306E\u5C0F\u3055\u306A\u5408\u594F","A little greenhouse chorus"),lesson:Se("\u9580\u3092\u6E96\u5099\u3057\u3066\u304B\u3089\u3001\u5206\u5149\u5668\u3078\u4E00\u672C\u306E\u5149\u3092\u5C4A\u3051\u3088\u3046\u3002","Prepare the gate, then bring a single ray to the splitter."),source:30,direction:1,mirrors:[32,14,16],initial:[!1,!1,!1],flowers:[2,5],gate:10,switch:12,splitter:{cell:4,input:0,outputs:[3,1]},walls:[6,7,18,19,21,25,27,33],hints:[Se("\u5206\u5149\u5668\u306E\u5165\u53E3\u306E\u624B\u524D\u306B\u3001\u9589\u3058\u305F\u9580\u304C\u3042\u308B\u3002","A closed gate stands just before the splitter\u2019s entrance."),Se("\u4E2D\u592E\u304B\u3089\u5DE6\u306E\u30B9\u30A4\u30C3\u30C1\u3078\u3002\u305D\u306E\u5F8C\u3001\u53F3\u306E\u93E1\u3067\u4E0A\u3078\u5C4A\u3051\u3088\u3046\u3002","Visit the left switch from the center, then send light upward at the right mirror.")]},{kind:"light",id:"L13",version:1,answerKey:"L13@1",size:6,title:Se("\u4E00\u5EA6\u3001\u82B1\u304B\u3089\u96E2\u308C\u3066","Step away from a flower"),lesson:Se("\u3082\u3046\u706F\u3063\u305F\u82B1\u304B\u3089\u5149\u3092\u5916\u3059\u3053\u3068\u304C\u3001\u5168\u4F53\u306E\u6E96\u5099\u306B\u306A\u308B\u3002","Leaving a lit flower can prepare the whole garden."),source:30,direction:1,mirrors:[32,12],initial:[!1,!0],flowers:[13,24,17],gate:16,switch:0,splitter:{cell:14,input:0,outputs:[3,1]},walls:[2,3,4,7,8,19,21,27,28],hints:[Se("\u53F3\u306E\u9580\u3092\u958B\u304F\u30B9\u30A4\u30C3\u30C1\u306F\u3001\u5DE6\u4E0A\u306B\u3042\u308B\u3002","The switch for the right gate is at the upper left."),Se("\u5DE6\u4E0B\u306E\u82B1\u306F\u4E00\u5EA6\u6D88\u3048\u3066\u3082\u5927\u4E08\u592B\u3002\u4E0A\u3078\u6E96\u5099\u3057\u305F\u3089\u623B\u305B\u308B\u3002","It is fine to darken the lower-left flower briefly. Return after preparing above.")]},{kind:"light",id:"L14",version:1,answerKey:"L14@1",size:7,title:Se("\u304A\u4E92\u3044\u306E\u9580\u3092\u958B\u3051\u3066","Open each other\u2019s gates"),lesson:Se("\u4E8C\u3064\u306E\u679D\u304C\u3001\u304A\u4E92\u3044\u306E\u901A\u308A\u9053\u3092\u6E96\u5099\u3059\u308B\u3002","The two branches prepare each other\u2019s paths."),source:42,direction:1,mirrors:[44,9,26],initial:[!1,!0,!1],flowers:[13,47],gates:[{id:"A",gate:40,switch:7},{id:"B",gate:11,switch:5}],splitter:{cell:23,input:0,outputs:[0,1]},walls:[0,1,3,4,14,15,17,18,20,28,29,31,32,35,36,38,39,41],hints:[Se("\u4E0A\u306E\u679D\u306E\u30B9\u30A4\u30C3\u30C1\u306F\u4E0B\u306E\u9580\u3001\u53F3\u306E\u679D\u306E\u30B9\u30A4\u30C3\u30C1\u306F\u4E0A\u306E\u9580\u3078\u3002","The upper branch opens the lower gate; the right branch opens the upper gate."),Se("\u4E21\u65B9\u306E\u93E1\u3067\u4E00\u5EA6\u30B9\u30A4\u30C3\u30C1\u3092\u8A2A\u306D\u3001\u4E21\u65B9\u3092\u82B1\u3078\u306E\u5411\u304D\u306B\u623B\u305D\u3046\u3002","Visit a switch with each mirror, then return both to their flower routes.")]},{kind:"light",id:"L15",version:1,answerKey:"L15@1",size:7,title:Se("\u5148\u306B\u958B\u3051\u308B\u306E\u306F\u3069\u3061\u3089","Which gate comes first?"),lesson:Se("\u679D\u304C\u5206\u304B\u308C\u3066\u3044\u3066\u3082\u3001\u9580\u306B\u306F\u958B\u3051\u308B\u9806\u756A\u304C\u3042\u308B\u3002","Even on separate branches, some gates have an opening order."),source:42,direction:1,mirrors:[44,21,26],initial:[!1,!0,!1],flowers:[35,47],gates:[{id:"A",gate:7,switch:5},{id:"B",gate:40,switch:0}],splitter:{cell:23,input:0,outputs:[3,1]},walls:[1,2,3,4,8,9,10,11,13,15,16,17,18,20,29,31,32,36,38,39,41],hints:[Se("\u5DE6\u4E0A\u306EB\u306FA\u306E\u9580\u306E\u5148\u3002\u307E\u305A\u53F3\u4E0A\u3092\u6E96\u5099\u3057\u3088\u3046\u3002","B at the upper left is beyond gate A. Prepare the upper right first."),Se("\u53F3\u4E0AA\u3001\u5DE6\u4E0AB\u3001\u6700\u5F8C\u306B\u4E21\u65B9\u306E\u679D\u3092\u4E0B\u306E\u82B1\u3078\u3002","Visit A at upper right, then B at upper left. Finish with both branches downward.")]},{kind:"light",id:"L16",version:1,answerKey:"L16@1",size:7,title:Se("\u5B8C\u6210\u56F3\u304B\u3089\u3001\u9006\u306B","Work back from the flowers"),lesson:Se("\u82B1\u3078\u5C4A\u304F\u6700\u5F8C\u306E\u5149\u8DEF\u304B\u3089\u3001\u6E96\u5099\u3059\u308B\u9053\u3092\u898B\u3064\u3051\u3088\u3046\u3002","Work backward from the final flower routes to find what must be prepared."),source:42,direction:1,mirrors:[44,16,19,29,8],initial:[!1,!1,!1,!0,!1],flowers:[13,34],gates:[{id:"A",gate:12,switch:14},{id:"B",gate:26,switch:5}],splitter:{cell:33,input:2,outputs:[3,1]},walls:[0,1,2,3,4,6,7,20,21,24,25,27,28,35,38,39,40,41,45,46,47,48],hints:[Se("\u4E0A\u306E\u82B1\u3078\u884C\u304F\u679D\u306F\u3001\u5DE6\u3092\u4E0A\u304C\u3063\u3066A\u306E\u9580\u3092\u6A2A\u5207\u308B\u3002","The branch to the upper flower rises on the left and crosses gate A."),Se("A\u304B\u3089B\u3092\u6E96\u5099\u3057\u3001\u5206\u5149\u5668\u3078\u3002\u5DE6\u306E\u4E8C\u3064\u306E\u93E1\u306F\u4E0A\u3001\u53F3\u3078\u3064\u306A\u3054\u3046\u3002","Prepare A then B and reach the splitter. Link the two left mirrors upward, then right.")]},{kind:"light",id:"L17",version:1,answerKey:"L17@1",size:7,title:Se("\u652F\u5EA6\u3092\u7D42\u3048\u305F\u3089\u3001\u914D\u308A\u76F4\u3059","Prepare, then redistribute"),lesson:Se("\u4E0A\u3067\u6E96\u5099\u3092\u7D42\u3048\u305F\u3089\u3001\u4E0B\u306E\u5206\u5149\u5668\u3078\u5149\u3092\u9001\u308A\u76F4\u305D\u3046\u3002","Finish preparing above, then redirect light to the splitter below."),source:21,direction:1,mirrors:[24,10,36,40],initial:[!0,!1,!0,!1],flowers:[15,19,39],gates:[{id:"A",gate:8,switch:13},{id:"B",gate:31,switch:7}],splitter:{cell:38,input:2,outputs:[3,1]},walls:[0,1,2,3,4,5,6,14,16,18,20,28,30,32,34,35,41,42,44,45,46,48],hints:[Se("\u4E0A\u306E\u93E1\u306F\u53F3\u3078A\u3001\u5DE6\u3078B\u3002B\u304C\u4E0B\u306E\u5165\u53E3\u3092\u958B\u304F\u3002","The upper mirror visits A to the right, then B to the left. B opens the lower entrance."),Se("\u4E2D\u592E\u306E\u5149\u3092\u4E0B\u3078\u5207\u308A\u66FF\u3048\u305F\u3089\u3001\u679D\u306E\u5148\u306E\u4E8C\u3064\u306E\u93E1\u3092\u4E0A\u3078\u3002","After redirecting the center downward, send both outer branches upward.")]},{kind:"light",id:"L18",version:1,answerKey:"L18@1",size:7,title:Se("\u6E29\u5BA4\u306E\u706F\u308A","The greenhouse lights"),lesson:Se("A\u3001B\u3001\u305D\u3057\u3066\u4E09\u3064\u306E\u82B1\u3078\u3002\u5EAD\u306E\u706F\u308A\u3092\u5B8C\u6210\u3055\u305B\u3088\u3046\u3002","A, then B, then three flowers. Complete the greenhouse lights."),source:35,direction:1,mirrors:[37,16,19,29],initial:[!1,!1,!1,!1],flowers:[31,34,43],gates:[{id:"A",gate:12,switch:14},{id:"B",gate:26,switch:5}],splitter:{cell:33,input:2,outputs:[3,1]},walls:[0,1,2,3,4,6,7,8,9,10,11,20,21,22,24,25,27,28,38,39,40,41,45,46,47,48],hints:[Se("\u5206\u5149\u5668\u3078\u884C\u304F\u524D\u306B\u3001\u5DE6\u306EA\u3001\u53F3\u4E0A\u306EB\u3092\u9806\u306B\u8A2A\u306D\u3088\u3046\u3002","Before the splitter, visit A on the left and B at the upper right."),Se("B\u304C\u958B\u3044\u305F\u3089\u53F3\u4E0A\u306E\u93E1\u3092\u4E0B\u3078\u3002\u5DE6\u306E\u679D\u306F\u82B1\u3092\u901A\u308A\u3001\u6700\u5F8C\u306B\u4E0B\u3078\u66F2\u3052\u3088\u3046\u3002","After B opens, turn the upper-right mirror downward. The left branch passes one flower, then turns down to the last.")]}];var Dh=[{kind:"home",id:"T01",version:1,answerKey:"T01@1",size:4,title:{ja:"\u3044\u3063\u3057\u3087\u306B\u4E00\u6B69",en:"One step together"},lesson:{ja:"\u3072\u3068\u3064\u306E\u65B9\u5411\u30DC\u30BF\u30F3\u3067\u3001\u3075\u305F\u308A\u304C\u52D5\u304F\u3002\u25CB\u3068\u25A1\u3092\u305D\u308C\u305E\u308C\u306E\u5BB6\u3078\u3002",en:"One direction moves both friends. Bring \u25CB and \u25A1 to their matching homes."},starts:[12,12],homes:[14,14],walls:[0,1,5,7],otherWalls:[0,2,5,7],hints:[{ja:"\u53F3\u3078\u62BC\u3059\u3068\u3001\u3075\u305F\u308A\u3068\u3082\u53F3\u3078\u4E00\u6B69\u3002",en:"Press right: both friends take one step."},{ja:"\u53F3\u3092\u3082\u3046\u4E00\u5EA6\u3002\u5BB6\u306E\u5370\u306B\u3075\u305F\u308A\u3092\u91CD\u306D\u3088\u3046\u3002",en:"Press right again to bring both friends home."}]},{kind:"home",id:"T02",version:1,answerKey:"T02@1",size:4,title:{ja:"\u58C1\u3067\u3072\u3068\u3084\u3059\u307F",en:"A wall lends a hand"},lesson:{ja:"\u58C1\u306B\u5F53\u305F\u3063\u305F\u5B50\u3060\u3051\u6B62\u307E\u308B\u3002\u3075\u305F\u308A\u306E\u4F4D\u7F6E\u3092\u305A\u3089\u305D\u3046\u3002",en:"Only the friend facing a wall stops. Use that to adjust their positions."},starts:[12,13],homes:[6,6],walls:[3,7,11],otherWalls:[0,4,8],hints:[{ja:"\u4F4D\u7F6E\u306E\u5DEE\u306F\u3001\u7247\u65B9\u3060\u3051\u6B62\u307E\u308B\u3068\u5909\u308F\u308B\u3002",en:"Their spacing changes when only one friend stops."},{ja:"\u5DE6\u53F3\u306E\u7AEF\u3092\u4F7F\u3063\u3066\u3001\u6A2A\u306E\u4F4D\u7F6E\u3092\u305D\u308D\u3048\u3088\u3046\u3002",en:"Use the left or right edge to line up their columns."}]},{kind:"home",id:"T03",version:1,answerKey:"T03@1",size:4,title:{ja:"\u8FD1\u9053\u306F\u3069\u3063\u3061\uFF1F",en:"Which way is shorter?"},lesson:{ja:"\u7247\u65B9\u3060\u3051\u3067\u306A\u304F\u3001\u3075\u305F\u3064\u306E\u5EAD\u3092\u898B\u6BD4\u3079\u3088\u3046\u3002",en:"Look at both gardens before choosing your next step."},starts:[12,15],homes:[3,0],walls:[5,6,10],otherWalls:[5,9,10],hints:[{ja:"\u7247\u65B9\u306E\u8FD1\u9053\u3092\u9078\u3076\u524D\u306B\u3001\u3082\u3046\u4E00\u65B9\u306E\u58C1\u3082\u898B\u3088\u3046\u3002",en:"Before taking one shortcut, check the other garden."},{ja:"\u5BB6\u306E\u5DE6\u53F3\u304C\u9006\u3002\u7247\u65B9\u3092\u7AEF\u3067\u6B62\u3081\u3066\u3001\u4F4D\u7F6E\u3092\u5165\u308C\u66FF\u3048\u3088\u3046\u3002",en:"The homes are on opposite sides. Hold one friend at an edge to change their spacing."}]},{kind:"home",id:"T04",version:1,answerKey:"T04@1",size:4,title:{ja:"\u304A\u304B\u3048\u308A\u3001\u3082\u3046\u4E00\u6B69",en:"Home, then one more step"},lesson:{ja:"\u3072\u3068\u308A\u5E30\u3063\u3066\u3082\u3001\u307E\u3060\u7D9A\u304F\u3002\u5BB6\u304B\u3089\u51FA\u3066\u3001\u3075\u305F\u308A\u540C\u6642\u306B\u5E30\u308D\u3046\u3002",en:"One friend home is not the finish. You can leave home to get both back together."},starts:[12,14],homes:[13,2],walls:[8,5,6,7],otherWalls:[10,13,4,5,9],hints:[{ja:"\u5148\u306B\u7740\u3044\u305F\u5B50\u3082\u3001\u6B21\u306E\u77E2\u5370\u3067\u52D5\u304F\u3002",en:"The first friend home still moves with the next arrow."},{ja:"\u53F3\u3067\u3072\u3068\u308A\u5E30\u5B85\u3057\u305F\u3089\u3001\u4E0A\u3078\u3002\u3044\u3063\u305F\u3093\u5BB6\u3092\u51FA\u3088\u3046\u3002",en:"After right brings one friend home, press up to leave it."}]},{kind:"home",id:"T05",version:1,answerKey:"T05@1",size:4,title:{ja:"\u6700\u5F8C\u306E\u5F85\u3061\u5408\u308F\u305B",en:"The last rendezvous"},lesson:{ja:"\u3069\u3061\u3089\u306E\u58C1\u3092\u4F7F\u304A\u3046\uFF1F\u305A\u3089\u3057\u3066\u3001\u6700\u5F8C\u306E\u4E00\u6B69\u3092\u305D\u308D\u3048\u3088\u3046\u3002",en:"Choose which walls to use. Line up the final step together."},starts:[12,3],homes:[3,13],walls:[5,6],otherWalls:[6,10],hints:[{ja:"\u540C\u3058\u65B9\u5411\u306B\u9032\u3081\u308B\u4E00\u6B69\u624B\u524D\u3092\u3001\u3075\u305F\u308A\u5206\u63A2\u305D\u3046\u3002",en:"Look for a square before each home that shares a final direction."},{ja:"\u7247\u65B9\u3092\u58C1\u3067\u6B62\u3081\u308B\u8ABF\u6574\u3092\u3001\u6A2A\u3068\u7E26\u3067\u4F7F\u304A\u3046\u3002",en:"Use a wall to adjust one friend horizontally and vertically."}]},{kind:"home",id:"T06",version:1,answerKey:"T06@1",size:4,title:{ja:"\u5EAD\u3092\u8AAD\u307F\u306A\u304A\u3059",en:"Read the gardens"},lesson:{ja:"\u3075\u305F\u308A\u306E\u4F4D\u7F6E\u3092\u898B\u3066\u3001\u81EA\u5206\u3067\u5BB6\u3078\u306E\u9053\u3092\u4F5C\u308D\u3046\u3002",en:"Read both positions and find your own route home."},starts:[12,10],homes:[0,7],walls:[1,5,10],otherWalls:[2,6,9],hints:[{ja:"\u5BB6\u307E\u3067\u306E\u9053\u3092\u3001\u3075\u305F\u308A\u5206\u307E\u3068\u3081\u3066\u8FFD\u3063\u3066\u307F\u3088\u3046\u3002",en:"Trace both routes home together."},{ja:"\u4E0A\u3092\u4E8C\u56DE\u3067\u58C1\u306B\u5408\u308F\u305B\u308B\u3002\u305D\u306E\u3042\u3068\u53F3\u3001\u4E0A\u3002",en:"Move up twice to align at the walls, then right and up."}]},{kind:"home",id:"T07",version:1,answerKey:"T07@1",size:4,title:{ja:"\u6A2A\u306E\u5F85\u3061\u5408\u308F\u305B",en:"Across the page"},lesson:{ja:"\u6A2A\u306E\u5DEE\u3092\u3001\u7AEF\u3067\u6B62\u307E\u308B\u4E00\u6B69\u3067\u8ABF\u6574\u3057\u3088\u3046\u3002",en:"Use an edge to adjust their columns."},starts:[11,0],homes:[10,1],walls:[5,6,9],otherWalls:[2,6,10],hints:[{ja:"\u8FD1\u3044\u5BB6\u3078\u76F4\u884C\u3059\u308B\u3068\u3001\u3082\u3046\u3072\u3068\u308A\u306E\u6A2A\u4F4D\u7F6E\u304C\u5408\u308F\u306A\u3044\u3002",en:"Going straight to the nearer home leaves the other friend in the wrong column."},{ja:"\u4E0B\u3078\u4E00\u6B69\u3001\u5DE6\u3078\u4E8C\u6B69\u3002\u7AEF\u3067\u5DEE\u3092\u4F5C\u3063\u3066\u304B\u3089\u53F3\u3001\u4E0A\u3002",en:"Go down once and left twice. Use the edge to change spacing, then right and up."}]},{kind:"home",id:"T08",version:1,answerKey:"T08@1",size:4,title:{ja:"\u7E26\u306E\u5F85\u3061\u5408\u308F\u305B",en:"A little further down"},lesson:{ja:"\u4E0B\u306E\u58C1\u3092\u4F7F\u3063\u3066\u3001\u3075\u305F\u308A\u306E\u9AD8\u3055\u3092\u8ABF\u6574\u3057\u3088\u3046\u3002",en:"Use the lower walls to adjust their rows."},starts:[0,0],homes:[13,1],walls:[1,5,7,10],otherWalls:[5,8,9,14],hints:[{ja:"\u4ECA\u5EA6\u306F\u4E0A\u4E0B\u306E\u4F4D\u7F6E\u3092\u305A\u3089\u3059\u3002\u4E0B\u5074\u306E\u58C1\u3092\u898B\u6BD4\u3079\u3088\u3046\u3002",en:"This time adjust their rows. Compare the walls below them."},{ja:"\u307E\u305A\u53F3\u3002\u4E0B\u3078\u4E09\u56DE\u3067\u7247\u65B9\u3092\u6B62\u3081\u305F\u3089\u3001\u5DE6\u3001\u53F3\u3002",en:"Start right. Press down three times to hold one friend, then left and right."}]},{kind:"home",id:"T09",version:1,answerKey:"T09@1",size:4,title:{ja:"\u89D2\u3067\u5F85\u3063\u3066\u3044\u3066",en:"Wait at the corner"},lesson:{ja:"\u89D2\u3067\u3072\u3068\u308A\u3092\u6B62\u3081\u3001\u3082\u3046\u3072\u3068\u308A\u306E\u4F4D\u7F6E\u3092\u4F5C\u308D\u3046\u3002",en:"Hold one friend at a corner to prepare the other position."},starts:[11,13],homes:[1,0],walls:[5,7,9,10],otherWalls:[1,5,6,10],hints:[{ja:"\u7AEF\u3067\u3072\u3068\u308A\u304C\u6B62\u307E\u308B\u9593\u3001\u3082\u3046\u3072\u3068\u308A\u3092\u89D2\u3078\u904B\u307C\u3046\u3002",en:"While one friend waits at an edge, bring the other to a corner."},{ja:"\u4E0B\u3078\u9032\u307F\u3001\u5DE6\u7AEF\u307E\u3067\u305D\u308D\u3048\u308B\u3002\u4E0A\u3078\u9032\u3093\u3067\u6700\u5F8C\u306F\u53F3\u3002",en:"Go down, then align at the left edge. Head up; finish with right."}]},{kind:"home",id:"T10",version:1,answerKey:"T10@1",size:5,title:{ja:"\u5BB6\u306F\u901A\u308A\u9053",en:"Home is on the way"},lesson:{ja:"\u5BB6\u3092\u901A\u308A\u9053\u306B\u3057\u3066\u3001\u6B21\u306E\u6E96\u5099\u3078\u9032\u3082\u3046\u3002",en:"Pass through an early home to prepare the next move."},starts:[15,24],homes:[21,3],walls:[6,7,8,16,18],otherWalls:[6,8,12,13,16],hints:[{ja:"\u5148\u7740\u3057\u305F\u5BB6\u306F\u901A\u308A\u9053\u3002\u5E30\u5B85\u5F8C\u3082\u52D5\u304B\u305B\u308B\u3002",en:"An early home is part of the route. Keep moving after one friend arrives."},{ja:"\u4E0B\u3001\u53F3\u3067\u3072\u3068\u308A\u5E30\u5B85\u3002\u4E0A\u3078\u56DB\u6B69\u9032\u307F\u3001\u53F3\u3001\u5DE6\u3067\u5408\u308F\u305B\u3088\u3046\u3002",en:"Down and right bring one home. Go up four times, then right and left to align."}]},{kind:"home",id:"T11",version:1,answerKey:"T11@1",size:5,title:{ja:"\u58C1\u3092\u4F7F\u3046\u9806\u756A",en:"Walls in order"},lesson:{ja:"\u6A2A\u306E\u5DEE\u3092\u4F5C\u3063\u3066\u304B\u3089\u3001\u7E26\u306E\u58C1\u3078\u5411\u304B\u304A\u3046\u3002",en:"Adjust across the garden, then use the vertical walls."},starts:[15,9],homes:[22,17],walls:[2,7,12,16,18],otherWalls:[6,8,11,13,18],hints:[{ja:"\u5148\u306B\u6A2A\u306E\u5DEE\u3092\u4F5C\u308B\u3068\u3001\u4E0B\u3078\u306E\u9053\u304C\u305D\u308D\u3046\u3002",en:"Change their columns first to align the way down."},{ja:"\u4E0A\u3001\u5DE6\u4E8C\u56DE\u3067\u6E96\u5099\u3002\u4E0B\u4E8C\u56DE\u3001\u53F3\u4E8C\u56DE\u3001\u4E0B\u3067\u5E30\u308D\u3046\u3002",en:"Prepare with up and two lefts. Then down twice, right twice, and down."}]},{kind:"home",id:"T12",version:1,answerKey:"T12@1",size:5,title:{ja:"\u3075\u305F\u3064\u306E\u8ABF\u6574",en:"Two adjustments"},lesson:{ja:"\u4E8C\u3064\u306E\u58C1\u306E\u50CD\u304D\u3092\u7D44\u307F\u5408\u308F\u305B\u3088\u3046\u3002",en:"Combine two wall adjustments."},starts:[1,1],homes:[22,4],walls:[6,8,11,13,18],otherWalls:[6,7,8,12,16],hints:[{ja:"\u6A2A\u3067\u4F5C\u3063\u305F\u5DEE\u3092\u3001\u7E26\u306E\u58C1\u3067\u4F7F\u304A\u3046\u3002",en:"Use the spacing made across the garden at the vertical walls."},{ja:"\u53F3\u3001\u4E0B\u3001\u53F3\u3001\u4E0B\u4E8C\u56DE\u3002\u7D42\u308F\u308A\u306F\u53F3\u3001\u5DE6\u3001\u4E0B\u3001\u53F3\u3002",en:"Go right, down, right, down twice. Finish right, left, down, right."}]},{kind:"home",id:"T13",version:1,answerKey:"T13@1",size:5,title:{ja:"\u6700\u5F8C\u306E\u4E00\u6B69\u304B\u3089",en:"Start with the last step"},lesson:{ja:"\u6700\u5F8C\u306F\u4E0A\u3078\u4E00\u6B69\u3002\u305D\u3053\u304B\u3089\u9006\u306B\u8003\u3048\u3088\u3046\u3002",en:"Finish with one step up. Plan backward from there."},starts:[14,19],homes:[19,0],walls:[1,6,8,12,16,18],otherWalls:[6,8,11,13,17,18],hints:[{ja:"\u6700\u5F8C\u306F\u4E0A\u3078\u4E00\u6B69\u3002\u5BB6\u306E\u771F\u4E0B\u306B\u3075\u305F\u308A\u3092\u305D\u308D\u3048\u3088\u3046\u3002",en:"The last step is up. Line up both friends just below home."},{ja:"\u4E0B\u3078\u9032\u307F\u5DE6\u3078\u4E09\u6B69\u3002\u4E0B\u3001\u5DE6\u304B\u3089\u4E0A\u3078\u623B\u308A\u3001\u53F3\u3067\u6700\u5F8C\u306E\u5217\u3092\u5408\u308F\u305B\u308B\u3002",en:"Go down and left three times. Down and left let you turn back up; right aligns the final columns."}]},{kind:"home",id:"T14",version:1,answerKey:"T14@1",size:5,title:{ja:"\u9060\u3056\u304B\u308B\u4E00\u6B69",en:"A step away"},lesson:{ja:"\u9060\u3056\u304B\u308B\u4E00\u6B69\u3082\u3001\u3075\u305F\u308A\u306E\u5E30\u308A\u9053\u306B\u306A\u308B\u3002",en:"A step away can bring both friends closer to home."},starts:[12,21],homes:[23,1],walls:[6,7,8,13,16,18],otherWalls:[6,8,11,12,16,18],hints:[{ja:"\u5BB6\u3078\u8FD1\u3065\u304F\u3060\u3051\u3067\u306F\u305D\u308D\u308F\u306A\u3044\u3002\u3044\u3063\u305F\u3093\u9060\u3056\u3051\u3066\u307F\u3088\u3046\u3002",en:"Getting closer is not enough. Try a step away from home."},{ja:"\u4E0B\u4E8C\u56DE\u3001\u5DE6\u3001\u4E0A\u4E09\u56DE\u3001\u53F3\u4E8C\u56DE\u3001\u4E0A\u3002\u6700\u5F8C\u306F\u5DE6\u3001\u53F3\u3002",en:"Down twice, left, up three times, right twice, up. Finish left and right."}]},{kind:"home",id:"T15",version:1,answerKey:"T15@1",size:5,title:{ja:"\u6E96\u5099\u306E\u5834\u6240",en:"A place to wait"},lesson:{ja:"\u5F85\u3066\u308B\u5834\u6240\u3092\u5148\u306B\u4F5C\u3063\u3066\u3001\u3075\u305F\u308A\u3092\u305D\u308D\u3048\u3088\u3046\u3002",en:"Prepare a waiting spot, then line up both friends."},starts:[5,18],homes:[9,4],walls:[6,8,11,13,16,18],otherWalls:[2,7,11,13,17],hints:[{ja:"\u7247\u65B9\u3092\u4E0B\u306E\u7AEF\u3067\u5F85\u305F\u305B\u3001\u3082\u3046\u7247\u65B9\u306E\u901A\u8DEF\u3092\u4F5C\u308D\u3046\u3002",en:"Hold one friend at the bottom edge while preparing the other route."},{ja:"\u4E0B\u4E09\u56DE\u304B\u3089\u53F3\u3001\u4E0A\u3002\u53F3\u3078\u4E09\u6B69\u3067\u5217\u3092\u305D\u308D\u3048\u3001\u4E0A\u3078\u3002",en:"Go down three times, then right and up. Three rights align the columns; head up."}]},{kind:"home",id:"T16",version:1,answerKey:"T16@1",size:5,title:{ja:"\u3075\u305F\u308A\u3067\u3072\u3068\u3064\u306E\u4F4D\u7F6E",en:"Think in pairs"},lesson:{ja:"\u3072\u3068\u308A\u305A\u3064\u3067\u306A\u304F\u3001\u3075\u305F\u308A\u306E\u4F4D\u7F6E\u3092\u3072\u3068\u7D44\u3067\u8003\u3048\u3088\u3046\u3002",en:"Think about both positions as a pair."},starts:[17,2],homes:[1,13],walls:[6,7,12,13,16,18],otherWalls:[6,8,12,16,17,18],hints:[{ja:"\u540C\u3058\u5834\u6240\u3078\u623B\u3063\u3066\u3082\u3001\u3082\u3046\u3072\u3068\u308A\u306E\u4F4D\u7F6E\u304C\u9055\u3048\u3070\u524D\u9032\u3002",en:"Returning to a square can help when the other friend is in a new place."},{ja:"\u4E0B\u3001\u5DE6\u4E8C\u56DE\u3001\u4E0A\u56DB\u56DE\u3002\u53F3\u4E8C\u56DE\u3001\u4E0B\u4E8C\u56DE\u3067\u6700\u5F8C\u306E\u5DE6\u3092\u6E96\u5099\u3002",en:"Down, left twice, up four times. Two rights and two downs prepare the final left."}]},{kind:"home",id:"T17",version:1,answerKey:"T17@1",size:5,title:{ja:"\u5E30\u308B\u524D\u306E\u5BC4\u308A\u9053",en:"One last detour"},lesson:{ja:"\u58C1\u3067\u6B62\u307E\u308A\u3001\u5BB6\u304B\u3089\u96E2\u308C\u3001\u6700\u5F8C\u306E\u4E00\u6B69\u3092\u5408\u308F\u305B\u3088\u3046\u3002",en:"Use walls, leave home, and align the last step."},starts:[5,10],homes:[19,5],walls:[1,6,8,11,13,17,18],otherWalls:[6,7,8,13,16,18],hints:[{ja:"\u58C1\u3067\u305A\u3089\u3059\u3053\u3068\u3068\u3001\u5148\u7740\u3057\u305F\u5BB6\u304B\u3089\u51FA\u308B\u3053\u3068\u3092\u7D44\u307F\u5408\u308F\u305B\u3088\u3046\u3002",en:"Combine wall adjustments with leaving an early home."},{ja:"\u53F3\u3001\u4E0B\u4E8C\u56DE\u3001\u5DE6\u3001\u4E0B\u3001\u53F3\u4E8C\u56DE\u3001\u4E0A\u4E8C\u56DE\u3002\u53F3\u4E8C\u56DE\u306E\u3042\u3068\u4E0B\u3001\u4E0A\u3002",en:"Right, down twice, left, down, right twice, up twice. Two rights, then down and up."}]},{kind:"home",id:"T18",version:1,answerKey:"T18@1",size:5,title:{ja:"\u304A\u304B\u3048\u308A",en:"Welcome home"},lesson:{ja:"\u4F55\u5EA6\u304B\u4F4D\u7F6E\u3092\u305A\u3089\u3057\u3066\u3001\u6700\u5F8C\u306F\u3075\u305F\u308A\u4E00\u7DD2\u306B\u5E30\u308D\u3046\u3002",en:"Adjust their positions, then take the last step home together."},starts:[10,6],homes:[1,23],walls:[6,7,8,11,13,16,18],otherWalls:[2,7,11,13,16,17,18],hints:[{ja:"\u5148\u7740\u3088\u308A\u3001\u3075\u305F\u308A\u306E\u6700\u5F8C\u306E\u4E00\u6B69\u3092\u6E96\u5099\u3057\u3088\u3046\u3002\u5BB6\u304B\u3089\u51FA\u3066\u3082\u5927\u4E08\u592B\u3002",en:"Prepare the shared last step, even if a friend must leave home first."},{ja:"\u4E0A\u4E8C\u56DE\u3001\u53F3\u4E8C\u56DE\u3001\u4E0B\u3001\u5DE6\u3001\u4E0B\u4E8C\u56DE\u3001\u5DE6\u3001\u4E0B\u3001\u53F3\u4E8C\u56DE\u3001\u4E0A\u3002\u6700\u5F8C\u306F\u53F3\u3002",en:"Up twice, right twice, down, left, down twice, left, down, right twice, up. Finish right."}]}];var es=i=>Array.from({length:16},(e,t)=>t).filter(e=>!i.includes(e)),lf=[{kind:"home",id:"T19",version:1,answerKey:"T19@1",size:4,title:{ja:"\u3072\u3068\u3064\u306E\u5408\u56F3",en:"One shared signal"},lesson:{ja:"\u3069\u3061\u3089\u306E\u5EAD\u3067\u3082\u3001\u65B9\u5411\u3092\u3072\u3068\u3064\u9001\u308B\u3068\u3075\u305F\u308A\u304C\u4E00\u6B69\u3002",en:"Send one direction in either garden: both friends take a step."},starts:[9,9],homes:[10,10],walls:es([9,10]),otherWalls:es([9,10]),hints:[{ja:"\u3075\u305F\u308A\u306E\u5BB6\u306F\u540C\u3058\u65B9\u5411\u306B\u3042\u308A\u307E\u3059\u3002",en:"Both homes lie in the same direction."},{ja:"\u53F3\u3078\u30B9\u30EF\u30A4\u30D7\u3001\u30C9\u30E9\u30C3\u30B0\u3001\u307E\u305F\u306F\u53F3\u30AD\u30FC\u3092\u4E00\u56DE\u3002",en:"Swipe or drag right, or press the right arrow once."}]},{kind:"home",id:"T20",version:1,answerKey:"T20@1",size:4,title:{ja:"\u58C1\u304C\u305D\u308D\u3048\u3066\u304F\u308C\u308B",en:"A wall lines them up"},lesson:{ja:"\u58C1\u306E\u524D\u306E\u5B50\u3060\u3051\u6B62\u307E\u308A\u307E\u3059\u3002\u3082\u3046\u3072\u3068\u308A\u306E\u4E00\u6B69\u3092\u898B\u3088\u3046\u3002",en:"The friend facing a wall stops. Watch the other take a step."},starts:[8,9],homes:[6,6],walls:es([8,9,10,6]),otherWalls:es([9,10,6]),hints:[{ja:"\u66F2\u304C\u308A\u89D2\u307E\u3067\u306E\u8DDD\u96E2\u304C\u3001\u4E00\u6B69\u9055\u3044\u307E\u3059\u3002",en:"One friend is one step further from the corner."},{ja:"\u53F3\u3078\u4E8C\u56DE\u3067\u89D2\u306B\u305D\u308D\u3044\u3001\u4E0A\u3078\u4E00\u6B69\u3067\u5E30\u5B85\u3002",en:"Two rights line them up at the corner; then one step up."}]},{kind:"home",id:"T21",version:1,answerKey:"T21@1",size:4,title:{ja:"\u3053\u3093\u3069\u306F\u7E26\u306E\u9053",en:"Try the upright path"},lesson:{ja:"\u5411\u304D\u304C\u5909\u308F\u3063\u3066\u3082\u3001\u58C1\u306E\u50CD\u304D\u306F\u540C\u3058\u3002\u81EA\u5206\u3067\u8A66\u305D\u3046\u3002",en:"A different direction, the same wall rule. Try it yourself."},starts:[2,6],homes:[9,9],walls:es([2,6,10,9]),otherWalls:es([6,10,9]),hints:[{ja:"\u66F2\u304C\u308A\u89D2\u3078\u3075\u305F\u308A\u3092\u305D\u308D\u3048\u308B\u306B\u306F\uFF1F",en:"How can both friends reach the corner together?"},{ja:"\u4E0B\u3078\u4E8C\u56DE\u3001\u5DE6\u3078\u4E00\u56DE\u3002\u7247\u65B9\u304C\u5F85\u3064\u4E00\u6B69\u3092\u78BA\u304B\u3081\u3088\u3046\u3002",en:"Down twice, then left. Watch the step where one friend waits."}]}],cf=["T19","T01","T20","T21","T02","T06","T07","T08","T09","T03","T04","T05","T10","T11","T12","T13","T14","T15","T16","T17","T18"],hf=[...Dh,...lf],Nh=cf.map(i=>hf.find(e=>e.id===i));var Zs={"light-garden":Lh,"two-ways-home":Nh,"tiny-delivery":Dn},uv=Object.keys(Zs);var Sa=i=>!!i&&typeof i=="object"&&!Array.isArray(i),js=(i,e)=>Object.keys(i).length===e.length&&e.every(t=>Object.hasOwn(i,t));function Js(i){return i.kind==="light"?{mirrors:[...i.initial],gate:!1,...i.gates?{gates:i.gates.map(()=>!1)}:{}}:i.kind==="home"?{positions:[...i.starts]}:{arrows:[...i.initial],wait:0,...i.waitCells?{waits:i.waitCells.map(()=>0)}:{}}}function Uh(i){let e=Zs[i][0];return{levelId:e.id,levelVersion:e.version,cleared:[],settings:{reducedMotion:!1},board:Js(e)}}function uf(i,e){return Sa(e)?i.kind==="light"?js(e,i.gates?["mirrors","gate","gates"]:["mirrors","gate"])&&Array.isArray(e.mirrors)&&e.mirrors.length===i.mirrors.length&&Array.from(e.mirrors).every(t=>typeof t=="boolean")&&typeof e.gate=="boolean"&&(i.gate!==void 0||e.gate===!1)&&(!i.gates||Array.isArray(e.gates)&&e.gates.length===i.gates.length&&Array.from(e.gates).every(t=>typeof t=="boolean")):i.kind==="home"?js(e,["positions"])&&Array.isArray(e.positions)&&e.positions.length===2&&Array.from(e.positions).every((t,n)=>Number.isInteger(t)&&t>=0&&t<i.size**2&&!(n===0?i.walls:i.otherWalls).includes(t)):js(e,i.waitCells?["arrows","wait","waits"]:["arrows","wait"])&&Array.isArray(e.arrows)&&e.arrows.length===i.sockets.length&&Array.from(e.arrows).every((t,n)=>Number.isInteger(t)&&t>=0&&t<=3&&(!i.allowedDirections?.[n]||i.allowedDirections[n].includes(t)))&&[0,1,2].includes(e.wait)&&(i.waitCell!==void 0||e.wait===0)&&(!i.waitCells||Array.isArray(e.waits)&&e.waits.length===i.waitCells.length&&Array.from(e.waits).every(t=>Number.isInteger(t)&&t>=0&&t<=(i.maxWait??2))):!1}function Fh(i,e){if(!Sa(e)||!js(e,["levelId","levelVersion","cleared","settings","board"]))return!1;let t=Zs[i],n=t.find(s=>s.id===e.levelId);return!!n&&e.levelVersion===n.version&&Array.isArray(e.cleared)&&e.cleared.length<=t.length&&new Set(e.cleared).size===e.cleared.length&&Array.from(e.cleared).every(s=>t.some(r=>r.id===s))&&Sa(e.settings)&&js(e.settings,["reducedMotion"])&&typeof e.settings.reducedMotion=="boolean"&&uf(n,e.board)}function Bh(i,e){let t=!0,n=`wgs:save:${i}`,s=n+":generation",r,a=h=>{let d=h.getItem(s);if(d===null)return"legacy";if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(d))throw new SyntaxError("Invalid reset generation");return d},o=(h,d)=>`${n}:completed:${h}:${d}`,l=h=>h==="legacy"?n:`${n}:state:${h}`;function c(h,d){let u=h.getItem(l(d)),f=Uh(i),g="empty";if(u!==null){let v=JSON.parse(u);if(!Sa(v)||v.schema!==1||v.gameId!==i||v.version!=="0.1.0"||!Fh(i,v.data)||v.generation!==void 0&&typeof v.generation!="string")throw new SyntaxError("Invalid save");(v.generation??"legacy")===d&&(f=v.data,g="ok")}for(let v of Zs[i])h.getItem(o(d,v.id))==="1"&&!f.cleared.includes(v.id)&&f.cleared.push(v.id);return f.cleared.length&&(g="ok"),{data:f,status:g}}return{load(){try{let h=e(),d=a(h);r!==void 0&&r!==d&&(t=!1),r??=d;let u=c(h,d);if(a(h)!==d)throw Error("Reset during load");return u}catch(h){return t=!1,{data:Uh(i),status:h instanceof SyntaxError?"invalid":"unavailable"}}},write(h){if(!t||!Fh(i,h))return!1;try{let d=e(),u=a(d);if(r??=u,u!==r)return!1;let f=c(d,u),g=[...new Set([...f.data.cleared,...h.cleared])];for(let w of g)if(a(d)!==u||(d.setItem(o(u,w),"1"),d.getItem(o(u,w))!=="1"))return!1;if(a(d)!==u)return!1;let v=c(d,u).data.cleared,m={...h,cleared:[...new Set([...g,...v])]},p=JSON.stringify({schema:1,gameId:i,version:"0.1.0",...u==="legacy"?{}:{generation:u},data:m});return d.setItem(l(u),p),a(d)!==u||d.getItem(l(u))!==p||u!=="legacy"&&(d.setItem(n,p),d.getItem(n)!==p)?!1:(h.cleared=m.cleared,!0)}catch{return!1}},reset(){try{let h=e(),d=globalThis.crypto?.randomUUID?.();if(!d||(t=!1,h.setItem(s,d),h.getItem(s)!==d)||(h.removeItem(n),h.getItem(n)!==null))return!1;let u=h;if(typeof u.key=="function"&&typeof u.length=="number")for(let f=u.length-1;f>=0;f--){let g=u.key(f);g&&(g.startsWith(n+":completed:")&&!g.startsWith(n+":completed:"+a(h)+":")||g.startsWith(n+":state:")&&g!==l(a(h)))&&h.removeItem(g)}return t=!1,!0}catch{return!1}}}}function Oh(i,e,t){let n,s,r=new Set,a=()=>{let h=n;n=void 0,s=void 0,h&&(h.target.classList.remove("pointer-pressed"),h.target.hasPointerCapture(h.id)&&h.target.releasePointerCapture(h.id))},o=()=>a(),l=(h,d)=>["x","y","width","height"].every(u=>Math.abs(h[u]-d[u])<.5);document.addEventListener("pointerdown",h=>{r.add(h.pointerId),r.size>1&&a()},!0),i.addEventListener("pointerdown",h=>{if(a(),!e()||!h.isPrimary||h.button!==0||r.size!==1||!(h.target instanceof Element))return;let d=h.target.closest(".cell-control,[data-swipe-board]");!d||!i.contains(d)||d instanceof HTMLButtonElement&&d.disabled||(n={id:h.pointerId,x:h.clientX,y:h.clientY,target:d,kind:d.hasAttribute("data-swipe-board")?"swipe":"tap",rect:d.getBoundingClientRect(),drift:!1},d.classList.add("pointer-pressed"),n.kind==="swipe"&&(d.setPointerCapture(h.pointerId),i.focus({preventScroll:!0})))}),document.addEventListener("pointermove",h=>{n?.id===h.pointerId&&n.kind==="tap"&&Math.hypot(h.clientX-n.x,h.clientY-n.y)>10&&(n.drift=!0,n.target.classList.remove("pointer-pressed"))}),document.addEventListener("pointerup",h=>{let d=n,u=r.size===1;if(r.delete(h.pointerId),!d||d.id!==h.pointerId)return;a();let f=d.target.getBoundingClientRect();if(!e()||!u||d.drift||!d.target.isConnected||!l(d.rect,f)||h.clientX<f.left||h.clientX>=f.right||h.clientY<f.top||h.clientY>=f.bottom)return;if(d.kind==="tap"){document.elementFromPoint(h.clientX,h.clientY)?.closest(".cell-control")===d.target&&(s=d.target);return}let g=h.clientX-d.x,v=h.clientY-d.y,m=Math.abs(g),p=Math.abs(v);Math.max(m,p)<20||Math.max(m,p)<Math.min(m,p)*1.3||t(m>p?g>0?1:3:v>0?2:0)}),document.addEventListener("pointercancel",h=>{r.delete(h.pointerId),a()}),i.addEventListener("lostpointercapture",()=>{n&&a()}),document.addEventListener("keydown",h=>{h.key==="Escape"&&a()}),window.addEventListener("pagehide",()=>{r.clear(),a()}),window.addEventListener("blur",()=>{r.clear(),a()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(r.clear(),a())}),window.addEventListener("resize",a),parent.addEventListener("resize",a),parent.addEventListener("scroll",a,{passive:!0});let c=new ResizeObserver(()=>{n&&!l(n.rect,n.target.getBoundingClientRect())&&a()});return{cancel:o,refresh(){c.disconnect();for(let h of i.querySelectorAll(".board"))c.observe(h)},acceptClick(h,d){if(!d.classList.contains("cell-control")||h.detail===0)return!0;let u=d===s;return s=void 0,u}}}var df=["arrow","wait","undo","start","arrive","collision","clear","complete"],ff={arrow:.075,wait:.095,undo:.13,start:.19,arrive:.22,collision:.16,clear:.39,complete:.62};function zh(i,e=0,t=44100){let n=ff[i],s=new Float32Array(Math.ceil(n*t)),r=29100+(df.indexOf(i)+1)*103+e*211,a=0,o=()=>(r=Math.imul(r,1664525)+1013904223>>>0,r/2147483648-1),l=(c,h,d)=>Math.sin(2*Math.PI*h*c)*Math.exp(-c/d);for(let c=0;c<s.length;c++){let h=c/t,d=o();a+=.18*(d-a);let u=d-a,f=e===1?.83:1,g=0;if(i==="arrow"&&(g=.21*u*Math.exp(-h/.006)+.21*l(h,790*f,.014)+.07*l(h,1370*f,.009)),i==="wait"&&(g=.12*u*Math.exp(-h/.009)+.19*l(h,490,.024)+.075*l(h,1120,.012)),i==="undo"&&(g=.12*a*Math.exp(-h/.018)+.19*Math.sin(2*Math.PI*(610*h-900*h*h))*Math.exp(-h/.03)),i==="start"&&(g=.1*u*Math.exp(-h/.011)+.15*l(h,240,.025)+(h>.045?.15*l(h-.045,480,.031):0)),i==="arrive"&&(g=.12*a*Math.exp(-h/.025)+.24*l(h,340*f,.035)+.09*l(h,1030*f,.025)+(h>.065?.11*l(h-.065,680*f,.026):0)),i==="collision"&&(g=.21*a*Math.exp(-h/.027)+.25*Math.sin(2*Math.PI*(160*h-180*h*h))*Math.exp(-h/.036)+.035*l(h,470,.016)),i==="clear"||i==="complete"){let m=i==="clear"?[510,680,850]:[510,680,765,1020],p=i==="clear"?.07:.105;for(let w=0;w<m.length;w++){let A=h-w*p;A>=0&&(g+=.16*(1-Math.exp(-A/.003))*(l(A,m[w]*f,.052)+.22*l(A,m[w]*2.73*f,.027)))}g+=.075*a*Math.exp(-h/.012)}let v=Math.min(1,h/.0018,(n-h)/.014);s[c]=g*Math.max(0,v)}return s}var Xl="wgs:audio:tiny-delivery";function kh(i){if(!i||typeof i!="object"||Array.isArray(i))return!1;let e=i;return Object.keys(e).sort().join(",")==="gain,mute,version"&&e.version===1&&typeof e.mute=="boolean"&&typeof e.gain=="number"&&Number.isFinite(e.gain)&&e.gain>=0&&e.gain<=1}function Vh(){let i={version:1,mute:!1,gain:.35},e=!0,t=!1,n,s=0,r=!0,a=0,o=!1;try{let p=localStorage.getItem(Xl);if(p!==null){let w=JSON.parse(p);if(!kh(w))throw Error("Invalid audio preference");i=w}}catch{i={version:1,mute:!1,gain:.2},e=!1,t=!0}let l=new Set,c=new Map,h=new Map,d={played:0,dropped:0,cancelled:0,failures:0,maxVoices:0,byEvent:{}};function u(p){try{p.source.disconnect()}catch{}try{p.gain.disconnect()}catch{}}function f(p=!1){s++,o=!1,h.clear();for(let w of l){try{let A=n.currentTime;w.gain.gain.cancelScheduledValues(A),w.gain.gain.setValueAtTime(w.gain.gain.value,A),w.gain.gain.linearRampToValueAtTime(0,A+.008),w.source.stop(A+.009)}catch{u(w)}d.cancelled++}if(p&&n&&n.state!=="closed"){for(let w of l){try{w.source.stop()}catch{}u(w)}l.clear(),n.suspend().catch(()=>{d.failures++})}}function g(p){if(!p.isTrusted||document.hidden||i.mute)return;let w=++a;o=!0;try{n??=new AudioContext({latencyHint:"interactive"}),n.state==="suspended"||n.state==="interrupted"?n.resume().then(()=>{w===a&&(!o&&n?.state==="running"?n.suspend().catch(()=>{}):r=!0)}).catch(()=>{d.failures++,w===a&&(r=!1)}):r=!0}catch{r=!1,d.failures++}}function v(p,w=0,A=0){if(i.mute||i.gain===0||document.hidden||!n||n.state!=="running"){d.dropped++;return}let y=n.currentTime;if(y-(h.get(p)??-100)<.045){d.dropped++;return}let M=["complete","clear","collision"].includes(p)?2:p==="arrive"?1:0;if(l.size>=3||M===0&&l.size>=2){d.dropped++;return}let S,E,x;try{let T=p+":"+w,R=c.get(T);if(!R){let N=zh(p,w,n.sampleRate);R=n.createBuffer(1,N.length,n.sampleRate),R.copyToChannel(new Float32Array(N),0),c.set(T,R)}S=n.createBufferSource(),E=n.createGain(),S.buffer=R,E.gain.value=i.gain*.65,S.connect(E),E.connect(n.destination),x={source:S,gain:E,priority:M},l.add(x);let P=x;S.onended=()=>{l.delete(P),u(P)},S.start(y+A),r=!0,h.set(p,y),d.played++,d.byEvent[p]=(d.byEvent[p]??0)+1,d.maxVoices=Math.max(d.maxVoices,l.size)}catch{x&&l.delete(x);try{S?.disconnect()}catch{}try{E?.disconnect()}catch{}r=!1,d.failures++}}function m(p){let w={version:1,...p};if(kh(w)){if(f(),i=w,!e){t=!0;return}try{let A=JSON.stringify(w);if(localStorage.setItem(Xl,A),localStorage.getItem(Xl)!==A)throw Error("Readback failed");t=!1}catch{t=!0}}}return{unlock:g,play:v,cancel:f,set:m,get preferences(){return{...i}},get storageFailed(){return t},get available(){return r},snapshot:()=>({preferences:{...i},storageFailed:t,available:r,context:n?.state??"uninitialized",voices:l.size,epoch:s,counts:structuredClone(d)})}}var ql="wgs:music-pilot:tiny-delivery",Gh=i=>{if(!i||typeof i!="object"||Array.isArray(i))return!1;let e=i;return Object.keys(e).sort().join(",")==="direction,enabled,gain,version"&&e.version===1&&typeof e.enabled=="boolean"&&(e.direction==="D1"||e.direction==="D2")&&typeof e.gain=="number"&&Number.isFinite(e.gain)&&e.gain>=0&&e.gain<=.5};function Hh(i,e){let t={version:1,enabled:i!=="C",direction:i==="D2"?"D2":"D1",gain:.18},n=!0,s=!1;try{let x=localStorage.getItem(ql);if(x!==null){let T=JSON.parse(x);if(!Gh(T))throw Error("Invalid music preferences");t=T}}catch{n=!1,s=!0}t={...t,direction:"D1"};let r,a,o="",l=!1,c=0,h=!0,d=!1,u,f=Promise.resolve(),g,v,m=new Set,p={starts:0,stops:0,failures:0,maxVoices:0,staleStartsDropped:0},w=[];function A(x=!1){if(c++,l=!1,clearTimeout(v),u){let T=u;u=void 0,p.stops++,f=new Promise(P=>{g=P});let R=()=>{m.delete(T.source);try{T.source.disconnect(),T.gain.disconnect()}catch{}g?.(),g=void 0};try{let P=r.currentTime;T.gain.gain.cancelAndHoldAtTime(P),T.gain.gain.linearRampToValueAtTime(0,P+.035),T.source.onended=R,T.source.stop(P+.04)}catch{try{T.source.stop()}catch{}R()}}if(x&&r){let T=c;v=setTimeout(()=>{T===c&&!u&&!l&&r?.suspend().catch(()=>{p.failures++})},60)}}async function y(x){if(i==="C"||!x.isTrusted||d||!t.enabled||t.gain===0||!e()||u||l)return;let T=++c,R=t.direction;l=!0,clearTimeout(v);let P=()=>T===c&&!d&&t.enabled&&t.direction===R&&t.gain>0&&e(),N,z;try{if(r??=new AudioContext({latencyHint:"playback"}),await r.resume(),!P()){p.staleStartsDropped++;return}if(!a||o!==R){let ne=await fetch("/games/tiny-delivery/parcel-grove-r1/bgm-audio/"+R+".wav");if(!ne.ok)throw Error("Music unavailable");let H=await ne.arrayBuffer();if(!P()){p.staleStartsDropped++;return}let J=await r.decodeAudioData(H);if(!P()){p.staleStartsDropped++;return}a=J,o=R}if(await f,!P()){p.staleStartsDropped++;return}let I=r.createBufferSource(),O=r.createGain();N=I,z=O,I.buffer=a,I.loop=!0,I.loopStart=0,I.loopEnd=a.duration;let q=r.currentTime;O.gain.setValueAtTime(0,q),O.gain.linearRampToValueAtTime(t.gain,q+.12),I.connect(O),O.connect(r.destination);let W={source:I,gain:O};I.onended=()=>{u===W&&(u=void 0),m.delete(I),I.disconnect(),O.disconnect()},I.start(q,0),u=W,m.add(I),N=void 0,z=void 0,p.starts++,p.maxVoices=Math.max(p.maxVoices,m.size),w.push({startedAt:q,direction:R,duration:a.duration}),w.length>64&&w.shift(),h=!0}catch{try{N?.stop()}catch{}try{N?.disconnect(),z?.disconnect()}catch{}T===c&&(h=!1),p.failures++}finally{T===c?l=!1:!u&&!l&&r?.state==="running"&&r.suspend().catch(()=>{})}}function M(x){if(i==="C"||!Gh(x))return;if((x.enabled!==t.enabled||x.direction!==t.direction||x.gain===0)&&A(),t={...x},u&&r){let R=r.currentTime;u.gain.gain.cancelAndHoldAtTime(R),u.gain.gain.linearRampToValueAtTime(t.gain,R+.04)}if(!n){s=!0;return}try{let R=JSON.stringify(t);if(localStorage.setItem(ql,R),localStorage.getItem(ql)!==R)throw Error("Readback");s=!1}catch{s=!0}}function S(){if(!u||!r)return;let x=r.currentTime;u.gain.gain.cancelAndHoldAtTime(x),u.gain.gain.linearRampToValueAtTime(t.gain*.25,x+.025),u.gain.gain.linearRampToValueAtTime(t.gain,x+.3)}function E(){d=!0,A(!0)}return{start:y,halt:A,set:M,duck:S,dispose:E,get preferences(){return{...t}},get storageFailed(){return s},snapshot:()=>({preferences:{...t},storageFailed:s,available:h,pending:l,playing:!!u,activeSources:m.size,context:r?.state??"uninitialized",contextTime:r?.currentTime??0,decodedBytes:a?a.length*a.numberOfChannels*4:0,counts:{...p},timeline:[...w]})}}var yu=0,Rc=1,Mu=2;var Xi=1,Su=2,Ls=3,bi=0,qt=1,Wn=2,Nt=0,Ds=1,Pc=2,Ic=3,Lc=4,Co=5;var Xn=100,bu=101,wu=102,Tu=103,Au=104,Fr=200,Eu=201,Cu=202,Ru=203,Dc=204,Nc=205,Ro=206,Pu=207,Po=208,Iu=209,Lu=210,Du=211,Nu=212,Uu=213,Fu=214,Ya=0,Za=1,ja=2,xs=3,Ja=4,$a=5,Ka=6,Qa=7,Io=0,Bu=1,Ou=2,An=0,Br=1,Or=2,zr=3,qi=4,kr=5,Vr=6,Gr=7;var Uc=300,wi=301,Yi=302,Lo=303,Do=304,Hr=306,ti=1e3,Un=1001,eo=1002,Et=1003,zu=1004;var Wr=1005;var Xt=1006,No=1007;var Ti=1008;var an=1009,Fc=1010,Bc=1011,Ns=1012,Uo=1013,En=1014,on=1015,Gt=1016,Fo=1017,Bo=1018,Ai=1020,Oc=35902,zc=35899,kc=1021,Vc=1022,xn=1023,Fn=1026,qn=1027,Us=1028,Oo=1029,Ei=1030,zo=1031;var ko=1033,Xr=33776,qr=33777,Yr=33778,Zr=33779,Vo=35840,Go=35841,Ho=35842,Wo=35843,Xo=36196,qo=37492,Yo=37496,Zo=37488,jo=37489,jr=37490,Jo=37491,$o=37808,Ko=37809,Qo=37810,el=37811,tl=37812,nl=37813,il=37814,sl=37815,rl=37816,al=37817,ol=37818,ll=37819,cl=37820,hl=37821,ul=36492,dl=36494,fl=36495,pl=36283,ml=36284,Jr=36285,gl=36286;var lr=2300,to=2301,Xa=2302,xc=2303,_c=2400,vc=2401,yc=2402;var ku=3200;var Fs=0,Vu=1,si="",zt="srgb",cr="srgb-linear",hr="linear",ht="srgb";var qa=7680;var Gu=519,Hu=512,Wu=513,Xu=514,xl=515,qu=516,Yu=517,_l=518,Zu=519,ju=35044;var Gc="300 es",Tn=2e3,_s=2001;function pf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function mf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ju(){let i=ur("canvas");return i.style.display="block",i}var Wh={},vs=null;function Hc(...i){let e="THREE."+i.shift();vs?vs("log",e,...i):console.log(e,...i)}function $u(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=$u(i);let e="THREE."+i.shift();if(vs)vs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function We(...i){i=$u(i);let e="THREE."+i.shift();if(vs)vs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function zi(...i){let e=i.join(" ");e in Wh||(Wh[e]=!0,Ge(...i))}function Ku(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Qu={[Ya]:Za,[ja]:Ka,[Ja]:Qa,[xs]:$a,[Za]:Ya,[Ka]:ja,[Qa]:Ja,[$a]:xs},Bn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xh=1234567,sr=Math.PI/180,ys=180/Math.PI;function Zi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function Wc(i,e){return(i%e+e)%e}function gf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function xf(i,e,t){return i!==e?(t-i)/(e-i):0}function rr(i,e,t){return(1-t)*i+t*e}function _f(i,e,t,n){return rr(i,e,1-Math.exp(-t*n))}function vf(i,e=1){return e-Math.abs(Wc(i,e*2)-e)}function yf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bf(i,e){return i+Math.random()*(e-i)}function wf(i){return i*(.5-Math.random())}function Tf(i){i!==void 0&&(Xh=i);let e=Xh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Af(i){return i*sr}function Ef(i){return i*ys}function Cf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Rf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function If(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:Ge("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ms(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Xc={DEG2RAD:sr,RAD2DEG:ys,generateUUID:Zi,clamp:nt,euclideanModulo:Wc,mapLinear:gf,inverseLerp:xf,lerp:rr,damp:_f,pingpong:vf,smoothstep:yf,smootherstep:Mf,randInt:Sf,randFloat:bf,randFloatSpread:wf,seededRandom:Tf,degToRad:Af,radToDeg:Ef,isPowerOfTwo:Cf,ceilPowerOfTwo:Rf,floorPowerOfTwo:Pf,setQuaternionFromProperEuler:If,normalize:en,denormalize:ms},he=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},On=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(d!==v||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){let w=Math.acos(m),A=Math.sin(w);p=Math.sin(p*w)/A,o=Math.sin(o*w)/A,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o;let w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yl.copy(this).projectOnVector(e),this.sub(Yl)}reflect(e){return this.sub(Yl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yl=new D,qh=new On,Ye=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],w=s[1],A=s[4],y=s[7],M=s[2],S=s[5],E=s[8];return r[0]=a*v+o*w+l*M,r[3]=a*m+o*A+l*S,r[6]=a*p+o*y+l*E,r[1]=c*v+h*w+d*M,r[4]=c*m+h*A+d*S,r[7]=c*p+h*y+d*E,r[2]=u*v+f*w+g*M,r[5]=u*m+f*A+g*S,r[8]=u*p+f*y+g*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Zl.makeScale(e,t)),this}rotate(e){return zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Zl.makeRotation(-e)),this}translate(e,t){return zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Zl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Zl=new Ye,Yh=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zh=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lf(){let i={enabled:!0,workingColorSpace:cr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ht&&(s.r=ei(s.r),s.g=ei(s.g),s.b=ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===si?hr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[cr]:{primaries:e,whitePoint:n,transfer:hr,toXYZ:Yh,fromXYZ:Zh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:Yh,fromXYZ:Zh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),i}var tt=Lf();function ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ts,no=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ts===void 0&&(ts=ur("canvas")),ts.width=e.width,ts.height=e.height;let s=ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ts}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ei(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Df=0,Ms=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(jl(s[a].image)):r.push(jl(s[a]))}else r=jl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function jl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?no.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}var Nf=0,Jl=new D,sn=class i extends Bn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=Un,s=Un,r=Xt,a=Ti,o=xn,l=an,c=i.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Zi(),this.name="",this.source=new Ms(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jl).x}get height(){return this.source.getSize(Jl).y}get depth(){return this.source.getSize(Jl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ti:e.x=e.x-Math.floor(e.x);break;case Un:e.x=e.x<0?0:1;break;case eo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ti:e.y=e.y-Math.floor(e.y);break;case Un:e.y=e.y<0?0:1;break;case eo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Uc;sn.DEFAULT_ANISOTROPY=1;var wt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,y=(f+1)/2,M=(p+1)/2,S=(h+u)/4,E=(d+v)/4,x=(g+m)/4;return A>y&&A>M?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=S/n,r=E/n):y>M?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=S/s,r=x/s):M<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),n=E/r,s=x/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-v)/w,this.z=(u-h)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},io=class extends Bn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new sn(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ms(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ct=class extends io{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},dr=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var so=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var pt=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,d,u,f,g,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/ns.setFromMatrixColumn(e,0).length(),r=1/ns.setFromMatrixColumn(e,1).length(),a=1/ns.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uf,e,Ff)}lookAt(e,t,n){let s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),hi.crossVectors(n,cn),hi.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),hi.crossVectors(n,cn)),hi.normalize(),ba.crossVectors(cn,hi),s[0]=hi.x,s[4]=ba.x,s[8]=cn.x,s[1]=hi.y,s[5]=ba.y,s[9]=cn.y,s[2]=hi.z,s[6]=ba.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],w=n[3],A=n[7],y=n[11],M=n[15],S=s[0],E=s[4],x=s[8],T=s[12],R=s[1],P=s[5],N=s[9],z=s[13],I=s[2],O=s[6],q=s[10],W=s[14],ne=s[3],H=s[7],J=s[11],K=s[15];return r[0]=a*S+o*R+l*I+c*ne,r[4]=a*E+o*P+l*O+c*H,r[8]=a*x+o*N+l*q+c*J,r[12]=a*T+o*z+l*W+c*K,r[1]=h*S+d*R+u*I+f*ne,r[5]=h*E+d*P+u*O+f*H,r[9]=h*x+d*N+u*q+f*J,r[13]=h*T+d*z+u*W+f*K,r[2]=g*S+v*R+m*I+p*ne,r[6]=g*E+v*P+m*O+p*H,r[10]=g*x+v*N+m*q+p*J,r[14]=g*T+v*z+m*W+p*K,r[3]=w*S+A*R+y*I+M*ne,r[7]=w*E+A*P+y*O+M*H,r[11]=w*x+A*N+y*q+M*J,r[15]=w*T+A*z+y*W+M*K,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],w=l*f-c*u,A=o*f-c*d,y=o*u-l*d,M=a*f-c*h,S=a*u-l*h,E=a*d-o*h;return t*(v*w-m*A+p*y)-n*(g*w-m*M+p*S)+s*(g*A-v*M+p*E)-r*(g*y-v*S+m*E)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],w=t*o-n*a,A=t*l-s*a,y=t*c-r*a,M=n*l-s*o,S=n*c-r*o,E=s*c-r*l,x=h*v-d*g,T=h*m-u*g,R=h*p-f*g,P=d*m-u*v,N=d*p-f*v,z=u*p-f*m,I=w*z-A*N+y*P+M*R-S*T+E*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/I;return e[0]=(o*z-l*N+c*P)*O,e[1]=(s*N-n*z-r*P)*O,e[2]=(v*E-m*S+p*M)*O,e[3]=(u*S-d*E-f*M)*O,e[4]=(l*R-a*z-c*T)*O,e[5]=(t*z-s*R+r*T)*O,e[6]=(m*y-g*E-p*A)*O,e[7]=(h*E-u*y+f*A)*O,e[8]=(a*N-o*R+c*x)*O,e[9]=(n*R-t*N-r*x)*O,e[10]=(g*S-v*y+p*w)*O,e[11]=(d*y-h*S-f*w)*O,e[12]=(o*T-a*P-l*x)*O,e[13]=(t*P-n*T+s*x)*O,e[14]=(v*A-g*M-m*w)*O,e[15]=(h*M-d*A+u*w)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,g=r*d,v=a*h,m=a*d,p=o*d,w=l*c,A=l*h,y=l*d,M=n.x,S=n.y,E=n.z;return s[0]=(1-(v+p))*M,s[1]=(f+y)*M,s[2]=(g-A)*M,s[3]=0,s[4]=(f-y)*S,s[5]=(1-(u+p))*S,s[6]=(m+w)*S,s[7]=0,s[8]=(g+A)*E,s[9]=(m-w)*E,s[10]=(1-(u+v))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ns.set(s[0],s[1],s[2]).length(),o=ns.set(s[4],s[5],s[6]).length(),l=ns.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Mn.copy(this);let c=1/a,h=1/o,d=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Tn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===Tn)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===_s)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Tn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===Tn)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===_s)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ns=new D,Mn=new pt,Uf=new D(0,0,0),Ff=new D(1,1,1),hi=new D,ba=new D,cn=new D,jh=new pt,Jh=new On,zn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jh.setFromEuler(this),this.setFromQuaternion(Jh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};zn.DEFAULT_ORDER="XYZ";var fr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Bf=0,$h=new D,is=new On,jn=new pt,wa=new D,$s=new D,Of=new D,zf=new On,Kh=new D(1,0,0),Qh=new D(0,1,0),eu=new D(0,0,1),tu={type:"added"},kf={type:"removed"},ss={type:"childadded",child:null},$l={type:"childremoved",child:null},kt=class i extends Bn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new D,t=new zn,n=new On,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ye}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.multiply(is),this}rotateOnWorldAxis(e,t){return is.setFromAxisAngle(e,t),this.quaternion.premultiply(is),this}rotateX(e){return this.rotateOnAxis(Kh,e)}rotateY(e){return this.rotateOnAxis(Qh,e)}rotateZ(e){return this.rotateOnAxis(eu,e)}translateOnAxis(e,t){return $h.copy(e).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Kh,e)}translateY(e){return this.translateOnAxis(Qh,e)}translateZ(e){return this.translateOnAxis(eu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?wa.copy(e):wa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt($s,wa,this.up):jn.lookAt(wa,$s,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),is.setFromRotationMatrix(jn),this.quaternion.premultiply(is.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(We("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tu),ss.child=e,this.dispatchEvent(ss),ss.child=null):We("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(kf),$l.child=e,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tu),ss.child=e,this.dispatchEvent(ss),ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,Of),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,zf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};kt.DEFAULT_UP=new D(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dt=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Vf={type:"move"},Ss=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vf)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ed={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function Kl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=tt.workingColorSpace){if(e=Wc(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Kl(a,r,e+1/3),this.g=Kl(a,r,e),this.b=Kl(a,r,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let n=ed[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return tt.workingToColorSpace($t.copy(this),e),Math.round(nt($t.r*255,0,255))*65536+Math.round(nt($t.g*255,0,255))*256+Math.round(nt($t.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=zt){tt.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Ta);let n=rr(ui.h,Ta.h,t),s=rr(ui.s,Ta.s,t),r=rr(ui.l,Ta.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ze;Ze.NAMES=ed;var ki=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sn=new D,Jn=new D,Ql=new D,$n=new D,rs=new D,as=new D,nu=new D,ec=new D,tc=new D,nc=new D,ic=new wt,sc=new wt,rc=new wt,mi=class i{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Sn.subVectors(e,t),s.cross(Sn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Sn.subVectors(s,t),Jn.subVectors(n,t),Ql.subVectors(e,t);let a=Sn.dot(Sn),o=Sn.dot(Jn),l=Sn.dot(Ql),c=Jn.dot(Jn),h=Jn.dot(Ql),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,$n)===null?!1:$n.x>=0&&$n.y>=0&&$n.x+$n.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,$n)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,$n.x),l.addScaledVector(a,$n.y),l.addScaledVector(o,$n.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ic.setScalar(0),sc.setScalar(0),rc.setScalar(0),ic.fromBufferAttribute(e,t),sc.fromBufferAttribute(e,n),rc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ic,r.x),a.addScaledVector(sc,r.y),a.addScaledVector(rc,r.z),a}static isFrontFacing(e,t,n,s){return Sn.subVectors(n,t),Jn.subVectors(e,t),Sn.cross(Jn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Sn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;rs.subVectors(s,n),as.subVectors(r,n),ec.subVectors(e,n);let l=rs.dot(ec),c=as.dot(ec);if(l<=0&&c<=0)return t.copy(n);tc.subVectors(e,s);let h=rs.dot(tc),d=as.dot(tc);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(rs,a);nc.subVectors(e,r);let f=rs.dot(nc),g=as.dot(nc);if(g>=0&&f<=g)return t.copy(r);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(as,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return nu.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(nu,o);let p=1/(m+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(rs,a).addScaledVector(as,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Aa.copy(n.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ks),Ea.subVectors(this.max,Ks),os.subVectors(e.a,Ks),ls.subVectors(e.b,Ks),cs.subVectors(e.c,Ks),di.subVectors(ls,os),fi.subVectors(cs,ls),Ni.subVectors(os,cs);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ni.z,Ni.y,di.z,0,-di.x,fi.z,0,-fi.x,Ni.z,0,-Ni.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ni.y,Ni.x,0];return!ac(t,os,ls,cs,Ea)||(t=[1,0,0,0,1,0,0,0,1],!ac(t,os,ls,cs,Ea))?!1:(Ca.crossVectors(di,fi),t=[Ca.x,Ca.y,Ca.z],ac(t,os,ls,cs,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Kn=[new D,new D,new D,new D,new D,new D,new D,new D],bn=new D,Aa=new kn,os=new D,ls=new D,cs=new D,di=new D,fi=new D,Ni=new D,Ks=new D,Ea=new D,Ca=new D,Ui=new D;function ac(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ui.fromArray(i,r);let o=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=n.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Lt=new D,Ra=new he,Gf=0,nn=class extends Bn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ju,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ra.fromBufferAttribute(this,t),Ra.applyMatrix3(e),this.setXY(t,Ra.x,Ra.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ms(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ms(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ms(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ms(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ms(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var pr=class extends nn{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var mr=class extends nn{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var _t=class extends nn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Hf=new kn,Qs=new D,oc=new D,gi=class{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Hf.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qs.subVectors(e,this.center);let t=Qs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qs.copy(e.center).add(oc)),this.expandByPoint(Qs.copy(e.center).sub(oc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Wf=0,mn=new pt,lc=new kt,hs=new D,hn=new kn,er=new kn,Ot=new D,Vt=class i extends Bn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pf(e)?mr:pr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return lc.lookAt(e),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new _t(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];hn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){let n=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];er.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(hn.min,er.min),hn.expandByPoint(Ot),Ot.addVectors(hn.max,er.max),hn.expandByPoint(Ot)):(hn.expandByPoint(er.min),hn.expandByPoint(er.max))}hn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ot));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Ot.add(hs)),s=Math.max(s,n.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new nn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new D,l[x]=new D;let c=new D,h=new D,d=new D,u=new he,f=new he,g=new he,v=new D,m=new D;function p(x,T,R){c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,R),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[x].add(v),o[T].add(v),o[R].add(v),l[x].add(m),l[T].add(m),l[R].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let x=0,T=w.length;x<T;++x){let R=w[x],P=R.start,N=R.count;for(let z=P,I=P+N;z<I;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let A=new D,y=new D,M=new D,S=new D;function E(x){M.fromBufferAttribute(s,x),S.copy(M);let T=o[x];A.copy(T),A.sub(M.multiplyScalar(M.dot(T))).normalize(),y.crossVectors(S,T);let P=y.dot(l[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,P)}for(let x=0,T=w.length;x<T;++x){let R=w[x],P=R.start,N=R.count;for(let z=P,I=P+N;z<I;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new nn(u,h,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var cc=new D,Xf=new D,qf=new Ye,wn=class{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=cc.subVectors(n,t).cross(Xf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qf.getNormalMatrix(e),s=this.coplanarPoint(cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Yf=0,Vn=class extends Bn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=Ds,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dc,this.blendDst=Nc,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qa,this.stencilZFail=qa,this.stencilZPass=qa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new wn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new he().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Qn=new D,hc=new D,Pa=new D,Ia=new D,ro=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){hc.copy(e).add(t).multiplyScalar(.5),Pa.copy(t).sub(e).normalize(),Ia.copy(this.origin).sub(hc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Pa),o=Ia.dot(this.direction),l=-Ia.dot(Pa),c=Ia.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(hc).addScaledVector(Pa,u),f}intersectSphere(e,t){if(e.radius<0)return null;Qn.subVectors(e.center,this.origin);let n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,v=t.y-a.y,m=t.z-a.z,p=n.x-a.x,w=n.y-a.y,A=n.z-a.z,y=Math.abs(l),M=Math.abs(c),S=Math.abs(h),E,x,T,R,P,N,z,I,O,q,W,ne;if(y>=M&&y>=S?(T=l,N=d,O=g,ne=p,l>=0?(E=c,x=h,R=u,P=f,z=v,I=m,q=w,W=A):(E=h,x=c,R=f,P=u,z=m,I=v,q=A,W=w)):M>=S?(T=c,N=u,O=v,ne=w,c>=0?(E=h,x=l,R=f,P=d,z=m,I=g,q=A,W=p):(E=l,x=h,R=d,P=f,z=g,I=m,q=p,W=A)):(T=h,N=f,O=m,ne=A,h>=0?(E=l,x=c,R=d,P=u,z=g,I=v,q=p,W=w):(E=c,x=l,R=u,P=d,z=v,I=g,q=w,W=p)),T===0)return null;let H=E/T,J=x/T,K=1/T,Ee=R-H*N,Te=P-J*N,rt=z-H*O,je=I-J*O,et=q-H*ne,Y=W-J*ne,$=et*je-Y*rt,de=Ee*Y-Te*et,Ue=rt*Te-je*Ee;if(s){if($<0||de<0||Ue<0)return null}else if(($<0||de<0||Ue<0)&&($>0||de>0||Ue>0))return null;let be=$+de+Ue;if(be===0)return null;let ke=K*($*N+de*O+Ue*ne);return(be>0?ke<0:ke>0)?null:this.at(ke/be,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xi=class extends Vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},iu=new pt,Fi=new ro,La=new gi,su=new D,Da=new D,Na=new D,Ua=new D,uc=new D,Fa=new D,ru=new D,Ba=new D,ut=class extends kt{constructor(e=new Vt,t=new xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Fa.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(uc.fromBufferAttribute(d,e),a?Fa.addScaledVector(uc,h):Fa.addScaledVector(uc.sub(t),h))}t.add(Fa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(r),Fi.copy(e.ray).recast(e.near),!(La.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(La,su)===null||Fi.origin.distanceToSquared(su)>(e.far-e.near)**2))&&(iu.copy(r).invert(),Fi.copy(e.ray).applyMatrix4(iu),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,M=A;y<M;y+=3){let S=o.getX(y),E=o.getX(y+1),x=o.getX(y+2);s=Oa(this,p,e,n,c,h,d,S,E,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let w=o.getX(m),A=o.getX(m+1),y=o.getX(m+2);s=Oa(this,a,e,n,c,h,d,w,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],w=Math.max(m.start,f.start),A=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,M=A;y<M;y+=3){let S=y,E=y+1,x=y+2;s=Oa(this,p,e,n,c,h,d,S,E,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let w=m,A=m+1,y=m+2;s=Oa(this,a,e,n,c,h,d,w,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Zf(i,e,t,n,s,r,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===bi,o),l===null)return null;Ba.copy(o),Ba.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Ba);return c<t.near||c>t.far?null:{distance:c,point:Ba.clone(),object:i}}function Oa(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Da),i.getVertexPosition(l,Na),i.getVertexPosition(c,Ua);let h=Zf(i,e,t,n,Da,Na,Ua,ru);if(h){let d=new D;mi.getBarycoord(ru,Da,Na,Ua,d),s&&(h.uv=mi.getInterpolatedAttribute(s,o,l,c,d,new he)),r&&(h.uv1=mi.getInterpolatedAttribute(r,o,l,c,d,new he)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new D,materialIndex:0};mi.getNormal(Da,Na,Ua,u.normal),h.face=u,h.barycoord=d}return h}var Vi=class extends sn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Et,h=Et,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var bs=class extends nn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},us=new pt,au=new pt,za=[],ou=new kn,jf=new pt,tr=new ut,nr=new gi,ni=class extends ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),ou.copy(e.boundingBox).applyMatrix4(us),this.boundingBox.union(ou)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,us),nr.copy(e.boundingSphere).applyMatrix4(us),this.boundingSphere.union(nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nr.copy(this.boundingSphere),nr.applyMatrix4(n),e.ray.intersectsSphere(nr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),au.multiplyMatrices(n,us),tr.matrixWorld=au,tr.raycast(e,za);for(let a=0,o=za.length;a<o;a++){let l=za[a];l.instanceId=r,l.object=this,t.push(l)}za.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Vi(new Float32Array(s*this.count),s,this.count,Us,on));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Bi=new gi,Jf=new he(.5,.5),ka=new D,ws=class{constructor(e=new wn,t=new wn,n=new wn,s=new wn,r=new wn,a=new wn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],w=r[12],A=r[13],y=r[14],M=r[15];if(s[0].setComponents(c-a,f-h,p-g,M-w).normalize(),s[1].setComponents(c+a,f+h,p+g,M+w).normalize(),s[2].setComponents(c+o,f+d,p+v,M+A).normalize(),s[3].setComponents(c-o,f-d,p-v,M-A).normalize(),n)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,f-u,p-m,M-y).normalize();else if(s[4].setComponents(c-l,f-u,p-m,M-y).normalize(),t===Tn)s[5].setComponents(c+l,f+u,p+m,M+y).normalize();else if(t===_s)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);let t=Jf.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ka.x=s.normal.x>0?e.max.x:e.min.x,ka.y=s.normal.y>0?e.max.y:e.min.y,ka.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ka)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var gr=class extends sn{constructor(e=[],t=wi,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},_i=class extends sn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Gn=class extends sn{constructor(e,t,n=En,s,r,a,o=Et,l=Et,c,h=Fn,d=1){if(h!==Fn&&h!==qn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ms(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ao=class extends Gn{constructor(e,t=En,n=wi,s,r,a=Et,o=Et,l,c=Fn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xr=class extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},gn=class i extends Vt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(d,2));function g(v,m,p,w,A,y,M,S,E,x,T){let R=y/E,P=M/x,N=y/2,z=M/2,I=S/2,O=E+1,q=x+1,W=0,ne=0,H=new D;for(let J=0;J<q;J++){let K=J*P-z;for(let Ee=0;Ee<O;Ee++){let Te=Ee*R-N;H[v]=Te*w,H[m]=K*A,H[p]=I,c.push(H.x,H.y,H.z),H[v]=0,H[m]=0,H[p]=S>0?1:-1,h.push(H.x,H.y,H.z),d.push(Ee/E),d.push(1-J/x),W+=1}}for(let J=0;J<x;J++)for(let K=0;K<E;K++){let Ee=u+K+O*J,Te=u+K+O*(J+1),rt=u+(K+1)+O*(J+1),je=u+(K+1)+O*J;l.push(Ee,Te,je),l.push(Te,rt,je),ne+=6}o.addGroup(f,ne,T),f+=ne,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Ts=class i extends Vt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,v=[],m=n/2,p=0;w(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new _t(d,3)),this.setAttribute("normal",new _t(u,3)),this.setAttribute("uv",new _t(f,2));function w(){let y=new D,M=new D,S=0,E=(t-e)/n;for(let x=0;x<=r;x++){let T=[],R=x/r,P=R*(t-e)+e;for(let N=0;N<=s;N++){let z=N/s,I=z*l+o,O=Math.sin(I),q=Math.cos(I);M.x=P*O,M.y=-R*n+m,M.z=P*q,d.push(M.x,M.y,M.z),y.set(O,E,q).normalize(),u.push(y.x,y.y,y.z),f.push(z,1-R),T.push(g++)}v.push(T)}for(let x=0;x<s;x++)for(let T=0;T<r;T++){let R=v[T][x],P=v[T+1][x],N=v[T+1][x+1],z=v[T][x+1];(e>0||T!==0)&&(h.push(R,P,z),S+=3),(t>0||T!==r-1)&&(h.push(P,N,z),S+=3)}c.addGroup(p,S,0),p+=S}function A(y){let M=g,S=new he,E=new D,x=0,T=y===!0?e:t,R=y===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*R,0),u.push(0,R,0),f.push(.5,.5),g++;let P=g;for(let N=0;N<=s;N++){let I=N/s*l+o,O=Math.cos(I),q=Math.sin(I);E.x=T*q,E.y=m*R,E.z=T*O,d.push(E.x,E.y,E.z),u.push(0,R,0),S.x=O*.5+.5,S.y=q*.5*R+.5,f.push(S.x,S.y),g++}for(let N=0;N<s;N++){let z=M+N,I=P+N;y===!0?h.push(I,I+1,z):h.push(I+1,I,z),x+=3}c.addGroup(p,x,y===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},_r=class i extends Ts{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new he:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new D,s=[],r=[],a=[],o=new D,l=new pt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(nt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(nt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},As=class extends un{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new he){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},oo=class extends As{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function qc(){let i=0,e=0,t=0,n=0;function s(r,a,o,l){i=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var lu=new D,cu=new D,dc=new qc,fc=new qc,pc=new qc,lo=class extends un{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new D){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(cu.subVectors(s[0],s[1]).add(s[0]),c=cu);let d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(lu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=lu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),dc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),fc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),pc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),fc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),pc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(dc.calc(l),fc.calc(l),pc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function hu(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,l=i*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*i+t}function $f(i,e){let t=1-i;return t*t*e}function Kf(i,e){return 2*(1-i)*i*e}function Qf(i,e){return i*i*e}function ar(i,e,t,n){return $f(i,e)+Kf(i,t)+Qf(i,n)}function ep(i,e){let t=1-i;return t*t*t*e}function tp(i,e){let t=1-i;return 3*t*t*i*e}function np(i,e){return 3*(1-i)*i*i*e}function ip(i,e){return i*i*i*e}function or(i,e,t,n,s){return ep(i,e)+tp(i,t)+np(i,n)+ip(i,s)}var vr=class extends un{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(or(e,s.x,r.x,a.x,o.x),or(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},co=class extends un{constructor(e=new D,t=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(or(e,s.x,r.x,a.x,o.x),or(e,s.y,r.y,a.y,o.y),or(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},yr=class extends un{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends un{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Mr=class extends un{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ar(e,s.x,r.x,a.x),ar(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},uo=class extends un{constructor(e=new D,t=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new D){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ar(e,s.x,r.x,a.x),ar(e,s.y,r.y,a.y),ar(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sr=class extends un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(hu(o,l.x,c.x,h.x,d.x),hu(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new he().fromArray(s))}return this}},Mc=Object.freeze({__proto__:null,ArcCurve:oo,CatmullRomCurve3:lo,CubicBezierCurve:vr,CubicBezierCurve3:co,EllipseCurve:As,LineCurve:yr,LineCurve3:ho,QuadraticBezierCurve:Mr,QuadraticBezierCurve3:uo,SplineCurve:Sr}),fo=class extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Mc[s.type]().fromJSON(s))}return this}},br=class extends fo{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new yr(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Mr(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new vr(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Sr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,a,o,l),this}absellipse(e,t,n,s,r,a,o,l){let c=new As(e,t,n,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Gi=class extends br{constructor(e){super(e),this.uuid=Zi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new br().fromJSON(s))}return this}};function sp(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=td(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=cp(i,e,r,t)),i.length>80*t){o=i[0],l=i[1];let h=o,d=l;for(let u=t;u<s;u+=t){let f=i[u],g=i[u+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return wr(r,a,t,o,l,c,0),a}function td(i,e,t,n,s){let r;if(s===yp(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=uu(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=uu(a/n|0,i[a],i[a+1],r);return r&&Es(r,r.next)&&(Ar(r),r=r.next),r}function Hi(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Es(t,t.next)||Tt(t.prev,t,t.next)===0)){if(Ar(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function wr(i,e,t,n,s,r,a){if(!i)return;!a&&r&&pp(i,n,s,r);let o=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?ap(i,n,s,r):rp(i)){e.push(l.i,i.i,c.i),Ar(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=op(Hi(i),e),wr(i,e,t,n,s,r,2)):a===2&&lp(i,e,t,n,s,r):wr(Hi(i),e,t,n,s,r,1);break}}}function rp(i){let e=i.prev,t=i,n=i.next;if(Tt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(s,r,a),d=Math.min(o,l,c),u=Math.max(s,r,a),f=Math.max(o,l,c),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&ir(s,o,r,l,a,c,g.x,g.y)&&Tt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ap(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Tt(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,d=r.y,u=a.y,f=Math.min(o,l,c),g=Math.min(h,d,u),v=Math.max(o,l,c),m=Math.max(h,d,u),p=Sc(f,g,e,t,n),w=Sc(v,m,e,t,n),A=i.prevZ,y=i.nextZ;for(;A&&A.z>=p&&y&&y.z<=w;){if(A.x>=f&&A.x<=v&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&ir(o,h,l,d,c,u,A.x,A.y)&&Tt(A.prev,A,A.next)>=0||(A=A.prevZ,y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&ir(o,h,l,d,c,u,y.x,y.y)&&Tt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;A&&A.z>=p;){if(A.x>=f&&A.x<=v&&A.y>=g&&A.y<=m&&A!==s&&A!==a&&ir(o,h,l,d,c,u,A.x,A.y)&&Tt(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;y&&y.z<=w;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==s&&y!==a&&ir(o,h,l,d,c,u,y.x,y.y)&&Tt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function op(i,e){let t=i;do{let n=t.prev,s=t.next.next;!Es(n,s)&&id(n,t,t.next,s)&&Tr(n,s)&&Tr(s,n)&&(e.push(n.i,t.i,s.i),Ar(t),Ar(t.next),t=i=s),t=t.next}while(t!==i);return Hi(t)}function lp(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&xp(a,o)){let l=sd(a,o);a=Hi(a,a.next),l=Hi(l,l.next),wr(a,e,t,n,s,r,0),wr(l,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function cp(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:i.length,c=td(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(gp(c))}s.sort(hp);for(let r=0;r<s.length;r++)t=up(s[r],t);return t}function hp(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function up(i,e){let t=dp(i,e);if(!t)return e;let n=sd(t,i);return Hi(n,n.next),Hi(t,t.next)}function dp(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(Es(i,t))return t;do{if(Es(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&nd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);Tr(t,i)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&fp(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function fp(i,e){return Tt(i.prev,i,e.prev)<0&&Tt(e.next,i,i.next)<0}function pp(i,e,t,n){let s=i;do s.z===0&&(s.z=Sc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,mp(s)}function mp(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function Sc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function gp(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function nd(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function ir(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&nd(i,e,t,n,s,r,a,o)}function xp(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!_p(i,e)&&(Tr(i,e)&&Tr(e,i)&&vp(i,e)&&(Tt(i.prev,i,e.prev)||Tt(i,e.prev,e))||Es(i,e)&&Tt(i.prev,i,i.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Es(i,e){return i.x===e.x&&i.y===e.y}function id(i,e,t,n){let s=Ga(Tt(i,e,t)),r=Ga(Tt(i,e,n)),a=Ga(Tt(t,n,i)),o=Ga(Tt(t,n,e));return!!(s!==r&&a!==o||s===0&&Va(i,t,e)||r===0&&Va(i,n,e)||a===0&&Va(t,i,n)||o===0&&Va(t,e,n))}function Va(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ga(i){return i>0?1:i<0?-1:0}function _p(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&id(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Tr(i,e){return Tt(i.prev,i,i.next)<0?Tt(i,e,i.next)>=0&&Tt(i,i.prev,e)>=0:Tt(i,e,i.prev)<0||Tt(i,i.next,e)<0}function vp(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function sd(i,e){let t=bc(i.i,i.x,i.y),n=bc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function uu(i,e,t,n){let s=bc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ar(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function bc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function yp(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var wc=class{static triangulate(e,t,n=2){return sp(e,t,n)}},Oi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];du(e),fu(n,e);let a=e.length;t.forEach(du);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,fu(n,t[l]);let o=wc.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function du(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function fu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Wi=class i extends Vt{constructor(e=new Gi([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new _t(s,3)),this.setAttribute("uv",new _t(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:Mp,A,y=!1,M,S,E,x;if(p){A=p.getSpacedPoints(h),y=!0,u=!1;let ee=p.isCatmullRomCurve3?p.closed:!1;M=p.computeFrenetFrames(h,ee),S=new D,E=new D,x=new D}u||(m=0,f=0,g=0,v=0);let T=o.extractPoints(c),R=T.shape,P=T.holes;if(!Oi.isClockWise(R)){R=R.reverse();for(let ee=0,re=P.length;ee<re;ee++){let ae=P[ee];Oi.isClockWise(ae)&&(P[ee]=ae.reverse())}}function z(ee){let ae=10000000000000001e-36,oe=ee[0];for(let ue=1;ue<=ee.length;ue++){let ze=ue%ee.length,Fe=ee[ze],Ve=Fe.x-oe.x,Xe=Fe.y-oe.y,L=Ve*Ve+Xe*Xe,at=Math.max(Math.abs(Fe.x),Math.abs(Fe.y),Math.abs(oe.x),Math.abs(oe.y)),Je=ae*at*at;if(L<=Je){ee.splice(ze,1),ue--;continue}oe=Fe}}z(R),P.forEach(z);let I=P.length,O=R;for(let ee=0;ee<I;ee++){let re=P[ee];R=R.concat(re)}function q(ee,re,ae){return re||We("ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector(re,ae)}let W=R.length;function ne(ee,re,ae){let oe,ue,ze,Fe=ee.x-re.x,Ve=ee.y-re.y,Xe=ae.x-ee.x,L=ae.y-ee.y,at=Fe*Fe+Ve*Ve,Je=Fe*L-Ve*Xe;if(Math.abs(Je)>Number.EPSILON){let C=Math.sqrt(at),_=Math.sqrt(Xe*Xe+L*L),B=re.x-Ve/C,k=re.y+Fe/C,Z=ae.x-L/_,le=ae.y+Xe/_,fe=((Z-B)*L-(le-k)*Xe)/(Fe*L-Ve*Xe);oe=B+Fe*fe-ee.x,ue=k+Ve*fe-ee.y;let j=oe*oe+ue*ue;if(j<=2)return new he(oe,ue);ze=Math.sqrt(j/2)}else{let C=!1;Fe>Number.EPSILON?Xe>Number.EPSILON&&(C=!0):Fe<-Number.EPSILON?Xe<-Number.EPSILON&&(C=!0):Math.sign(Ve)===Math.sign(L)&&(C=!0),C?(oe=-Ve,ue=Fe,ze=Math.sqrt(at)):(oe=Fe,ue=Ve,ze=Math.sqrt(at/2))}return new he(oe/ze,ue/ze)}let H=[];for(let ee=0,re=O.length,ae=re-1,oe=ee+1;ee<re;ee++,ae++,oe++)ae===re&&(ae=0),oe===re&&(oe=0),H[ee]=ne(O[ee],O[ae],O[oe]);let J=[],K,Ee=H.concat();for(let ee=0,re=I;ee<re;ee++){let ae=P[ee];K=[];for(let oe=0,ue=ae.length,ze=ue-1,Fe=oe+1;oe<ue;oe++,ze++,Fe++)ze===ue&&(ze=0),Fe===ue&&(Fe=0),K[oe]=ne(ae[oe],ae[ze],ae[Fe]);J.push(K),Ee=Ee.concat(K)}let Te;if(m===0)Te=Oi.triangulateShape(O,P);else{let ee=[],re=[];for(let ae=0;ae<m;ae++){let oe=ae/m,ue=f*Math.cos(oe*Math.PI/2),ze=g*Math.sin(oe*Math.PI/2)+v;for(let Fe=0,Ve=O.length;Fe<Ve;Fe++){let Xe=q(O[Fe],H[Fe],ze);de(Xe.x,Xe.y,-ue),oe===0&&ee.push(Xe)}for(let Fe=0,Ve=I;Fe<Ve;Fe++){let Xe=P[Fe];K=J[Fe];let L=[];for(let at=0,Je=Xe.length;at<Je;at++){let C=q(Xe[at],K[at],ze);de(C.x,C.y,-ue),oe===0&&L.push(C)}oe===0&&re.push(L)}}Te=Oi.triangulateShape(ee,re)}let rt=Te.length,je=g+v;for(let ee=0;ee<W;ee++){let re=u?q(R[ee],Ee[ee],je):R[ee];y?(E.copy(M.normals[0]).multiplyScalar(re.x),S.copy(M.binormals[0]).multiplyScalar(re.y),x.copy(A[0]).add(E).add(S),de(x.x,x.y,x.z)):de(re.x,re.y,0)}for(let ee=1;ee<=h;ee++)for(let re=0;re<W;re++){let ae=u?q(R[re],Ee[re],je):R[re];y?(E.copy(M.normals[ee]).multiplyScalar(ae.x),S.copy(M.binormals[ee]).multiplyScalar(ae.y),x.copy(A[ee]).add(E).add(S),de(x.x,x.y,x.z)):de(ae.x,ae.y,d/h*ee)}for(let ee=m-1;ee>=0;ee--){let re=ee/m,ae=f*Math.cos(re*Math.PI/2),oe=g*Math.sin(re*Math.PI/2)+v;for(let ue=0,ze=O.length;ue<ze;ue++){let Fe=q(O[ue],H[ue],oe);de(Fe.x,Fe.y,d+ae)}for(let ue=0,ze=P.length;ue<ze;ue++){let Fe=P[ue];K=J[ue];for(let Ve=0,Xe=Fe.length;Ve<Xe;Ve++){let L=q(Fe[Ve],K[Ve],oe);y?de(L.x,L.y+A[h-1].y,A[h-1].x+ae):de(L.x,L.y,d+ae)}}}et(),Y();function et(){let ee=s.length/3;if(u){let re=0,ae=W*re;for(let oe=0;oe<rt;oe++){let ue=Te[oe];Ue(ue[2]+ae,ue[1]+ae,ue[0]+ae)}re=h+m*2,ae=W*re;for(let oe=0;oe<rt;oe++){let ue=Te[oe];Ue(ue[0]+ae,ue[1]+ae,ue[2]+ae)}}else{for(let re=0;re<rt;re++){let ae=Te[re];Ue(ae[2],ae[1],ae[0])}for(let re=0;re<rt;re++){let ae=Te[re];Ue(ae[0]+W*h,ae[1]+W*h,ae[2]+W*h)}}n.addGroup(ee,s.length/3-ee,0)}function Y(){let ee=s.length/3,re=0;$(O,re),re+=O.length;for(let ae=0,oe=P.length;ae<oe;ae++){let ue=P[ae];$(ue,re),re+=ue.length}n.addGroup(ee,s.length/3-ee,1)}function $(ee,re){let ae=ee.length;for(;--ae>=0;){let oe=ae,ue=ae-1;ue<0&&(ue=ee.length-1);for(let ze=0,Fe=h+m*2;ze<Fe;ze++){let Ve=W*ze,Xe=W*(ze+1),L=re+oe+Ve,at=re+ue+Ve,Je=re+ue+Xe,C=re+oe+Xe;be(L,at,Je,C)}}}function de(ee,re,ae){l.push(ee),l.push(re),l.push(ae)}function Ue(ee,re,ae){ke(ee),ke(re),ke(ae);let oe=s.length/3,ue=w.generateTopUV(n,s,oe-3,oe-2,oe-1);ot(ue[0]),ot(ue[1]),ot(ue[2])}function be(ee,re,ae,oe){ke(ee),ke(re),ke(oe),ke(re),ke(ae),ke(oe);let ue=s.length/3,ze=w.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);ot(ze[0]),ot(ze[1]),ot(ze[3]),ot(ze[1]),ot(ze[2]),ot(ze[3])}function ke(ee){s.push(l[ee*3+0]),s.push(l[ee*3+1]),s.push(l[ee*3+2])}function ot(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Sp(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Mc[s.type]().fromJSON(s)),new i(n,e.options)}},Mp={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new he(r,a),new he(o,l),new he(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],g=e[s*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-d),new he(u,1-g),new he(v,1-p)]:[new he(o,1-l),new he(h,1-d),new he(f,1-g),new he(m,1-p)]}};function Sp(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var vi=class i extends Vt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let w=p*u-a;for(let A=0;A<c;A++){let y=A*d-r;g.push(y,-w,0),v.push(0,0,1),m.push(A/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){let A=w+c*p,y=w+c*(p+1),M=w+1+c*(p+1),S=w+1+c*p;f.push(A,y,S),f.push(y,M,S)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Er=class i extends Vt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new D,u=new D,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){let w=[],A=p/n,y=a+A*o,M=e*Math.cos(y),S=Math.sqrt(e*e-M*M),E=0;p===0&&a===0?E=.5/t:p===n&&l===Math.PI&&(E=-.5/t);for(let x=0;x<=t;x++){let T=x/t,R=s+T*r;d.x=-S*Math.cos(R),d.y=M,d.z=S*Math.sin(R),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(T+E,1-A),w.push(c++)}h.push(w)}for(let p=0;p<n;p++)for(let w=0;w<t;w++){let A=h[p][w+1],y=h[p][w],M=h[p+1][w],S=h[p+1][w+1];(p!==0||a>0)&&f.push(A,y,S),(p!==n-1||l<Math.PI)&&f.push(y,M,S)}this.setIndex(f),this.setAttribute("position",new _t(g,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Cs=class i extends Vt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new D,f=new D,g=new D;for(let v=0;v<=n;v++){let m=a+v/n*o;for(let p=0;p<=s;p++){let w=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(w),f.y=(e+t*Math.cos(m))*Math.sin(w),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(w),u.y=e*Math.sin(w),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/s),d.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=s;m++){let p=(s+1)*v+m-1,w=(s+1)*(v-1)+m-1,A=(s+1)*(v-1)+m,y=(s+1)*v+m;l.push(p,w,y),l.push(w,A,y)}this.setIndex(l),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(h,3)),this.setAttribute("uv",new _t(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};function ji(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(pu(s))s.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(pu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Kt(i){let e={};for(let t=0;t<i.length;t++){let n=ji(i[t]);for(let s in n)e[s]=n[s]}return e}function pu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function bp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}var Cn={clone:ji,merge:Kt},wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rt=class extends Vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=Tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=bp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ze().setHex(s.value);break;case"v2":this.uniforms[n].value=new he().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new wt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ye().fromArray(s.value);break;case"m4":this.uniforms[n].value=new pt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Rs=class extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ii=class extends Vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Cr=class extends Vn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Rr=class extends Vn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fs,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=Io,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},po=class extends Vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},mo=class extends Vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ds(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function mc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var yi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},go=class extends yi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:_c,endingEnd:_c}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vc:r=e,o=2*t-n;break;case yc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vc:a=e,l=2*n-t;break;case yc:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,p=-u*m+2*u*v-u*g,w=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,A=(-1-f)*m+(1.5+f)*v+.5*g,y=f*m-f*v;for(let M=0;M!==o;++M)r[M]=p*a[h+M]+w*a[c+M]+A*a[l+M]+y*a[d+M];return r}},xo=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},_o=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},vo=class extends yi{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(s-t),v=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*v+a[l+m]*g;return r}let u=o*2,f=e-1;for(let g=0;g!==o;++g){let v=a[c+g],m=a[l+g],p=f*u+g*2,w=d[p],A=d[p+1],y=e*u+g*2,M=h[y],S=h[y+1],E=Ep(n,t,w,M,s);r[g]=rd(E,v,A,S,m)}return r}};function rd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Ap(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Ep(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=rd(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let l=Ap(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ds(t,this.TimeBufferType),this.values=ds(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ds(e.times,Array),values:ds(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),mc(e.settings)&&(n.settings={inTangents:ds(e.settings.inTangents,Array),outTangents:ds(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case lr:t=this.InterpolantFactoryMethodDiscrete;break;case to:t=this.InterpolantFactoryMethodLinear;break;case Xa:t=this.InterpolantFactoryMethodSmooth;break;case xc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ge("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return lr;case this.InterpolantFactoryMethodLinear:return to;case this.InterpolantFactoryMethodSmooth:return Xa;case this.InterpolantFactoryMethodBezier:return xc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;mc(this.settings)&&(mu(this.settings.inTangents,e),mu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(We("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(We("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){We("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){We("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&mf(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){We("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Xa,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let v=t[d+g];if(v!==t[u+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,mc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function mu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=to;var Mi=class extends dn{constructor(e,t,n){super(e,t,n)}};Mi.prototype.ValueTypeName="bool";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=lr;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};yo.prototype.ValueTypeName="color";var Mo=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};Mo.prototype.ValueTypeName="number";var So=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)On.slerpFlat(r,0,a,c-o,a,c,l);return r}},Pr=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new So(this.times,this.values,this.getValueSize(),e)}};Pr.prototype.ValueTypeName="quaternion";Pr.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends dn{constructor(e,t,n){super(e,t,n)}};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=lr;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var bo=class extends dn{constructor(e,t,n,s){super(e,t,n,s)}};bo.prototype.ValueTypeName="vector";var wo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ad=new wo,To=class{constructor(e){this.manager=e!==void 0?e:ad,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};To.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ps=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ir=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},gc=new pt,gu=new D,xu=new D,Lr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ws,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(gu),xu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){gc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(gc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===_s||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(gc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ha=new D,Wa=new On,Nn=new D,Dr=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ha,Wa,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Wa,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ha,Wa,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Wa,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},pi=new D,_u=new he,vu=new he,tn=class extends Dr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ys*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(pi.x,pi.y).multiplyScalar(-e/pi.z),pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(pi.x,pi.y).multiplyScalar(-e/pi.z)}getViewSize(e,t){return this.getViewBounds(e,_u,vu),t.subVectors(vu,_u)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(sr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Tc=class extends Lr{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}},Nr=class extends Ps{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Tc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Hn=class extends Dr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ac=class extends Lr{constructor(){super(new Hn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Is=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new Ac}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var fs=-90,ps=1,Ao=class extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(fs,ps,e,t);s.layers=this.layers,this.add(s);let r=new tn(fs,ps,e,t);r.layers=this.layers,this.add(r);let a=new tn(fs,ps,e,t);a.layers=this.layers,this.add(a);let o=new tn(fs,ps,e,t);o.layers=this.layers,this.add(o);let l=new tn(fs,ps,e,t);l.layers=this.layers,this.add(l);let c=new tn(fs,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_s)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Eo=class extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ur=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Cp.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Cp(){this._document.hidden===!1&&this.reset()}var Zc="\\[\\]\\.:\\/",Rp=new RegExp("["+Zc+"]","g"),jc="[^"+Zc+"]",Pp="[^"+Zc.replace("\\.","")+"]",Ip=/((?:WC+[\/:])*)/.source.replace("WC",jc),Lp=/(WCOD+)?/.source.replace("WCOD",Pp),Dp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jc),Np=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jc),Up=new RegExp("^"+Ip+Lp+Dp+Np+"$"),Fp=["material","materials","bones","map"],Ec=class{constructor(e,t,n){let s=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rp,"")}static parseTrackName(e){let t=Up.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Fp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ge("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){We("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){We("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){We("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){We("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){We("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){We("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;We("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){We("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=Ec;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var yv=new Float32Array(1);var Cc=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};function Jc(i,e,t,n){let s=Bp(n);switch(t){case kc:return i*e;case Us:return i*e/s.components*s.byteLength;case Oo:return i*e/s.components*s.byteLength;case Ei:return i*e*2/s.components*s.byteLength;case zo:return i*e*2/s.components*s.byteLength;case Vc:return i*e*3/s.components*s.byteLength;case xn:return i*e*4/s.components*s.byteLength;case ko:return i*e*4/s.components*s.byteLength;case Xr:case qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yr:case Zr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Go:case Wo:return Math.max(i,16)*Math.max(e,8)/4;case Vo:case Ho:return Math.max(i,8)*Math.max(e,8)/2;case Xo:case qo:case Zo:case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yo:case jr:case Jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case tl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case cl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case hl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ul:case dl:case fl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Jr:case gl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bp(i){switch(i){case an:case Fc:return{byteLength:1,components:1};case Ns:case Bc:case Gt:return{byteLength:2,components:1};case Fo:case Bo:return{byteLength:2,components:4};case En:case Uo:case on:return{byteLength:4,components:1};case Oc:case zc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Cd(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Wp(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Xp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qp=`#ifdef USE_ALPHAHASH
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
#endif`,Yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$p=`#ifdef USE_AOMAP
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
#endif`,Kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qp=`#ifdef USE_BATCHING
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
#endif`,em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,im=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sm=`#ifdef USE_IRIDESCENCE
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
#endif`,rm=`#ifdef USE_BUMPMAP
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
#endif`,am=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,um=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,dm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,pm=`#define PI 3.141592653589793
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
} // validated`,mm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gm=`vec3 transformedNormal = objectNormal;
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
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bm=`#ifdef USE_ENVMAP
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
#endif`,wm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Tm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Em=`#ifdef USE_ENVMAP
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
#endif`,Cm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lm=`#ifdef USE_GRADIENTMAP
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
}`,Dm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Bm=`#ifdef USE_ENVMAP
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
#endif`,Om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,km=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gm=`PhysicalMaterial material;
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
#endif`,Hm=`uniform sampler2D dfgLUT;
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
}`,Wm=`
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
#endif`,Xm=`#if defined( RE_IndirectDiffuse )
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
#endif`,qm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ym=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Zm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$m=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Km=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,eg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tg=`#if defined( USE_POINTS_UV )
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
#endif`,ng=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ig=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,og=`#ifdef USE_MORPHTARGETS
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
#endif`,lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,pg=`#ifdef USE_NORMALMAP
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
#endif`,mg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_g=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ag=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pg=`float getShadowMask() {
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
}`,Ig=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lg=`#ifdef USE_SKINNING
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
#endif`,Dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ng=`#ifdef USE_SKINNING
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
#endif`,Ug=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Og=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zg=`#ifdef USE_TRANSMISSION
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
#endif`,kg=`#ifdef USE_TRANSMISSION
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
#endif`,Vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qg=`uniform sampler2D t2D;
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
}`,Yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`#include <common>
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
}`,Kg=`#if DEPTH_PACKING == 3200
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
}`,Qg=`#define DISTANCE
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
}`,e0=`#define DISTANCE
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,n0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i0=`uniform float scale;
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#include <common>
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
}`,a0=`uniform vec3 diffuse;
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
}`,o0=`#define LAMBERT
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
}`,l0=`#define LAMBERT
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
}`,c0=`#define MATCAP
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
}`,h0=`#define MATCAP
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
}`,u0=`#define NORMAL
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
}`,d0=`#define NORMAL
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
}`,f0=`#define PHONG
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
}`,p0=`#define PHONG
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
}`,m0=`#define STANDARD
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
}`,g0=`#define STANDARD
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
}`,x0=`#define TOON
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
}`,_0=`#define TOON
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
}`,v0=`uniform float size;
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
}`,y0=`uniform vec3 diffuse;
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
}`,M0=`#include <common>
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
}`,S0=`uniform vec3 color;
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
}`,b0=`uniform float rotation;
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
}`,w0=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:Xp,alphahash_pars_fragment:qp,alphamap_fragment:Yp,alphamap_pars_fragment:Zp,alphatest_fragment:jp,alphatest_pars_fragment:Jp,aomap_fragment:$p,aomap_pars_fragment:Kp,batching_pars_vertex:Qp,batching_vertex:em,begin_vertex:tm,beginnormal_vertex:nm,bsdfs:im,iridescence_fragment:sm,bumpmap_pars_fragment:rm,clipping_planes_fragment:am,clipping_planes_pars_fragment:om,clipping_planes_pars_vertex:lm,clipping_planes_vertex:cm,color_fragment:hm,color_pars_fragment:um,color_pars_vertex:dm,color_vertex:fm,common:pm,cube_uv_reflection_fragment:mm,defaultnormal_vertex:gm,displacementmap_pars_vertex:xm,displacementmap_vertex:_m,emissivemap_fragment:vm,emissivemap_pars_fragment:ym,colorspace_fragment:Mm,colorspace_pars_fragment:Sm,envmap_fragment:bm,envmap_common_pars_fragment:wm,envmap_pars_fragment:Tm,envmap_pars_vertex:Am,envmap_physical_pars_fragment:Bm,envmap_vertex:Em,fog_vertex:Cm,fog_pars_vertex:Rm,fog_fragment:Pm,fog_pars_fragment:Im,gradientmap_pars_fragment:Lm,lightmap_pars_fragment:Dm,lights_lambert_fragment:Nm,lights_lambert_pars_fragment:Um,lights_pars_begin:Fm,lights_toon_fragment:Om,lights_toon_pars_fragment:zm,lights_phong_fragment:km,lights_phong_pars_fragment:Vm,lights_physical_fragment:Gm,lights_physical_pars_fragment:Hm,lights_fragment_begin:Wm,lights_fragment_maps:Xm,lights_fragment_end:qm,lightprobes_pars_fragment:Ym,logdepthbuf_fragment:Zm,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Jm,logdepthbuf_vertex:$m,map_fragment:Km,map_pars_fragment:Qm,map_particle_fragment:eg,map_particle_pars_fragment:tg,metalnessmap_fragment:ng,metalnessmap_pars_fragment:ig,morphinstance_vertex:sg,morphcolor_vertex:rg,morphnormal_vertex:ag,morphtarget_pars_vertex:og,morphtarget_vertex:lg,normal_fragment_begin:cg,normal_fragment_maps:hg,normal_pars_fragment:ug,normal_pars_vertex:dg,normal_vertex:fg,normalmap_pars_fragment:pg,clearcoat_normal_fragment_begin:mg,clearcoat_normal_fragment_maps:gg,clearcoat_pars_fragment:xg,iridescence_pars_fragment:_g,opaque_fragment:vg,packing:yg,premultiplied_alpha_fragment:Mg,project_vertex:Sg,dithering_fragment:bg,dithering_pars_fragment:wg,roughnessmap_fragment:Tg,roughnessmap_pars_fragment:Ag,shadowmap_pars_fragment:Eg,shadowmap_pars_vertex:Cg,shadowmap_vertex:Rg,shadowmask_pars_fragment:Pg,skinbase_vertex:Ig,skinning_pars_vertex:Lg,skinning_vertex:Dg,skinnormal_vertex:Ng,specularmap_fragment:Ug,specularmap_pars_fragment:Fg,tonemapping_fragment:Bg,tonemapping_pars_fragment:Og,transmission_fragment:zg,transmission_pars_fragment:kg,uv_pars_fragment:Vg,uv_pars_vertex:Gg,uv_vertex:Hg,worldpos_vertex:Wg,background_vert:Xg,background_frag:qg,backgroundCube_vert:Yg,backgroundCube_frag:Zg,cube_vert:jg,cube_frag:Jg,depth_vert:$g,depth_frag:Kg,distance_vert:Qg,distance_frag:e0,equirect_vert:t0,equirect_frag:n0,linedashed_vert:i0,linedashed_frag:s0,meshbasic_vert:r0,meshbasic_frag:a0,meshlambert_vert:o0,meshlambert_frag:l0,meshmatcap_vert:c0,meshmatcap_frag:h0,meshnormal_vert:u0,meshnormal_frag:d0,meshphong_vert:f0,meshphong_frag:p0,meshphysical_vert:m0,meshphysical_frag:g0,meshtoon_vert:x0,meshtoon_frag:_0,points_vert:v0,points_frag:y0,shadow_vert:M0,shadow_frag:S0,sprite_vert:b0,sprite_frag:w0},ve={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Zn={basic:{uniforms:Kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ze(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Kt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Kt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Kt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Kt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Kt([ve.points,ve.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Kt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Kt([ve.common,ve.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Kt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Kt([ve.sprite,ve.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Kt([ve.common,ve.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Kt([ve.lights,ve.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Zn.physical={uniforms:Kt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var vl={r:0,b:0,g:0},T0=new pt,Rd=new Ye;Rd.set(-1,0,0,0,1,0,0,0,1);function A0(i,e,t,n,s,r){let a=new Ze(0),o=s===!0?0:1,l,c,h=null,d=0,u=null;function f(w){let A=w.isScene===!0?w.background:null;if(A&&A.isTexture){let y=w.backgroundBlurriness>0;A=e.get(A,y)}return A}function g(w){let A=!1,y=f(w);y===null?m(a,o):y&&y.isColor&&(m(y,1),A=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(w,A){let y=f(A);y&&(y.isCubeTexture||y.mapping===Hr)?(c===void 0&&(c=new ut(new gn(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:ji(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,S,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(T0.makeRotationFromEuler(A.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Rd),c.material.toneMapped=tt.getTransfer(y.colorSpace)!==ht,(h!==y||d!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ut(new vi(2,2),new Rt({name:"BackgroundMaterial",uniforms:ji(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=tt.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,A){w.getRGB(vl,Yc(i)),t.buffers.color.setClear(vl.r,vl.g,vl.b,A,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,A=1){a.set(w),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:g,addToRenderList:v,dispose:p}}function E0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(P,N,z,I,O){let q=!1,W=d(P,I,z,N);r!==W&&(r=W,c(r.object)),q=f(P,I,z,O),q&&g(P,I,z,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(P,N,z,I),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,N,z,I){let O=I.wireframe===!0,q=n[N.id];q===void 0&&(q={},n[N.id]=q);let W=P.isInstancedMesh===!0?P.id:0,ne=q[W];ne===void 0&&(ne={},q[W]=ne);let H=ne[z.id];H===void 0&&(H={},ne[z.id]=H);let J=H[O];return J===void 0&&(J=u(l()),H[O]=J),J}function u(P){let N=[],z=[],I=[];for(let O=0;O<t;O++)N[O]=0,z[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:z,attributeDivisors:I,object:P,attributes:{},index:null}}function f(P,N,z,I){let O=r.attributes,q=N.attributes,W=0,ne=z.getAttributes();for(let H in ne)if(ne[H].location>=0){let K=O[H],Ee=q[H];if(Ee===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(Ee=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(Ee=P.instanceColor)),K===void 0||K.attribute!==Ee||Ee&&K.data!==Ee.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function g(P,N,z,I){let O={},q=N.attributes,W=0,ne=z.getAttributes();for(let H in ne)if(ne[H].location>=0){let K=q[H];K===void 0&&(H==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),H==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));let Ee={};Ee.attribute=K,K&&K.data&&(Ee.data=K.data),O[H]=Ee,W++}r.attributes=O,r.attributesNum=W,r.index=I}function v(){let P=r.newAttributes;for(let N=0,z=P.length;N<z;N++)P[N]=0}function m(P){p(P,0)}function p(P,N){let z=r.newAttributes,I=r.enabledAttributes,O=r.attributeDivisors;z[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),O[P]!==N&&(i.vertexAttribDivisor(P,N),O[P]=N)}function w(){let P=r.newAttributes,N=r.enabledAttributes;for(let z=0,I=N.length;z<I;z++)N[z]!==P[z]&&(i.disableVertexAttribArray(z),N[z]=0)}function A(P,N,z,I,O,q,W){W===!0?i.vertexAttribIPointer(P,N,z,O,q):i.vertexAttribPointer(P,N,z,I,O,q)}function y(P,N,z,I){v();let O=I.attributes,q=z.getAttributes(),W=N.defaultAttributeValues;for(let ne in q){let H=q[ne];if(H.location>=0){let J=O[ne];if(J===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(J=P.instanceColor)),J!==void 0){let K=J.normalized,Ee=J.itemSize,Te=e.get(J);if(Te===void 0)continue;let rt=Te.buffer,je=Te.type,et=Te.bytesPerElement,Y=je===i.INT||je===i.UNSIGNED_INT||J.gpuType===Uo;if(J.isInterleavedBufferAttribute){let $=J.data,de=$.stride,Ue=J.offset;if($.isInstancedInterleavedBuffer){for(let be=0;be<H.locationSize;be++)p(H.location+be,$.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let be=0;be<H.locationSize;be++)m(H.location+be);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let be=0;be<H.locationSize;be++)A(H.location+be,Ee/H.locationSize,je,K,de*et,(Ue+Ee/H.locationSize*be)*et,Y)}else{if(J.isInstancedBufferAttribute){for(let $=0;$<H.locationSize;$++)p(H.location+$,J.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let $=0;$<H.locationSize;$++)m(H.location+$);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let $=0;$<H.locationSize;$++)A(H.location+$,Ee/H.locationSize,je,K,Ee*et,Ee/H.locationSize*$*et,Y)}}else if(W!==void 0){let K=W[ne];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(H.location,K);break;case 3:i.vertexAttrib3fv(H.location,K);break;case 4:i.vertexAttrib4fv(H.location,K);break;default:i.vertexAttrib1fv(H.location,K)}}}}w()}function M(){T();for(let P in n){let N=n[P];for(let z in N){let I=N[z];for(let O in I){let q=I[O];for(let W in q)h(q[W].object),delete q[W];delete I[O]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;let N=n[P.id];for(let z in N){let I=N[z];for(let O in I){let q=I[O];for(let W in q)h(q[W].object),delete q[W];delete I[O]}}delete n[P.id]}function E(P){for(let N in n){let z=n[N];for(let I in z){let O=z[I];if(O[P.id]===void 0)continue;let q=O[P.id];for(let W in q)h(q[W].object),delete q[W];delete O[P.id]}}}function x(P){for(let N in n){let z=n[N],I=P.isInstancedMesh===!0?P.id:0,O=z[I];if(O!==void 0){for(let q in O){let W=O[q];for(let ne in W)h(W[ne].object),delete W[ne];delete O[q]}delete z[I],Object.keys(z).length===0&&delete n[N]}}}function T(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:w}}function C0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function R0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==xn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let x=E===Gt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==an&&E!==on&&!x&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ge("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:A,maxFragmentUniforms:y,maxSamples:M,samples:S}}function P0(i){let e=this,t=null,n=0,s=!1,r=!1,a=new wn,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let w=r?0:n,A=w*4,y=p.clippingState||null;l.value=y,y=h(g,u,A,f);for(let M=0;M!==A;++M)y[M]=t[M];p.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,w=u.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,y=f;A!==v;++A,y+=4)a.copy(d[A]).applyMatrix4(w,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Os=4,I0=6,L0=20,D0=256,$r=new Hn,od=new Ze,$c=null,Kc=0,Qc=0,eh=!1,N0=new D,Ji=new D,ks=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=N0}=r;$c=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($c,Kc,Qc),this._renderer.xr.enabled=eh,e.scissorTest=!1,Bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$c=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Gt,format:xn,colorSpace:cr,depthBuffer:!1},s=ld(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ld(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=U0(r)),this._blurMaterial=B0(r,e,t),this._ggxMaterial=F0(r,e,t)}return s}_compileMaterial(e){let t=new ut(new Vt,e);this._renderer.compile(t,$r)}_sceneToCubeUV(e,t,n,s,r){let l=new tn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(od),d.toneMapping=An,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ut(new gn,new xi({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,p=!1,w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,p=!0):(m.color.copy(od),p=!0);for(let A=0;A<6;A++){let y=A%3;y===0?(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[A],r.y,r.z)):y===1?(l.up.set(0,0,c[A]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[A],r.z)):(l.up.set(0,c[A],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[A]));let M=this._cubeSize;Bs(s,y*M,A>2?M:0,M,M),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=w}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===wi||e.mapping===Yi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Bs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,$r)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Os?n-g+Os:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Bs(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,$r),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Bs(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(o,$r)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-Os?s-this._lodMax+Os:0),u=4*(this._cubeSize-h);Bs(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,$r)}};function U0(i){let e=[],t=[],n=i,s=i-Os+1+I0;for(let r=0;r<s;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),v=new Float32Array(f*u*d);for(let p=0;p<d;p++){let w=p%3*2/3-1,A=p>2?0:-1,y=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];g.set(y,f*u*p);for(let M=0;M<u;M++){let S=h[M*2]*2-1,E=h[M*2+1]*2-1;p===0?Ji.set(1,E,S):p===1?Ji.set(-S,1,-E):p===2?Ji.set(-S,E,1):p===3?Ji.set(-1,E,-S):p===4?Ji.set(-S,-1,E):Ji.set(S,E,-1),Ji.toArray(v,(p*u+M)*f)}}let m=new Vt;m.setAttribute("position",new nn(g,f)),m.setAttribute("outputDirection",new nn(v,f)),t.push(new ut(m,null)),n>Os&&n--}return{lodMeshes:t,sizeLods:e}}function ld(i,e,t){let n=new Ct(i,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function F0(i,e,t){return new Rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:D0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bl(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function B0(i,e,t){return new Rt({name:"SphericalGaussianBlur",defines:{SAMPLES:L0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:bl(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function cd(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bl(),fragmentShader:`

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
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function hd(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nt,depthTest:!1,depthWrite:!1})}function bl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ml=class extends Ct{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new gr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new gn(5,5,5),r=new Rt({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Nt});r.uniforms.tEquirect.value=t;let a=new ut(s,r),o=t.minFilter;return t.minFilter===Ti&&(t.minFilter=Xt),new Ao(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};function O0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Lo||f===Do)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new Ml(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Lo||f===Do,v=f===wi||f===Yi;if(g||v){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ks(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let w=u.image;return g&&w&&w.height>0||v&&w&&l(w)?(n===null&&(n=new ks(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Lo?u.mapping=wi:f===Do&&(u.mapping=Yi),u}function l(u){let f=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function z0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&zi("WebGLRenderer: "+n+" extension not supported."),s}}}function k0(i,e,t,n){let s={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(f!==null){let w=f.array;v=f.version;for(let A=0,y=w.length;A<y;A+=3){let M=w[A+0],S=w[A+1],E=w[A+2];u.push(M,S,S,E,E,M)}}else{let w=g.array;v=g.version;for(let A=0,y=w.length/3-1;A<y;A+=3){let M=A+0,S=A+1,E=A+2;u.push(M,S,S,E,E,M)}}let m=new(g.count>=65535?mr:pr)(u,1);m.version=v;let p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function V0(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let v=0;for(let m=0;m<f;m++)v+=u[m];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function G0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:We("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function H0(i,e,t){let n=new WeakMap,s=new wt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let T=function(){E.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let y=o.attributes.position.count*A,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let S=new Float32Array(y*M*4*d),E=new dr(S,y,M,d);E.type=on,E.needsUpdate=!0;let x=A*4;for(let R=0;R<d;R++){let P=m[R],N=p[R],z=w[R],I=y*M*4*R;for(let O=0;O<P.count;O++){let q=O*x;f===!0&&(s.fromBufferAttribute(P,O),S[I+q+0]=s.x,S[I+q+1]=s.y,S[I+q+2]=s.z,S[I+q+3]=0),g===!0&&(s.fromBufferAttribute(N,O),S[I+q+4]=s.x,S[I+q+5]=s.y,S[I+q+6]=s.z,S[I+q+7]=0),v===!0&&(s.fromBufferAttribute(z,O),S[I+q+8]=s.x,S[I+q+9]=s.y,S[I+q+10]=s.z,S[I+q+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:E,size:new he(y,M)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function W0(i,e,t,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var X0={[Br]:"LINEAR_TONE_MAPPING",[Or]:"REINHARD_TONE_MAPPING",[zr]:"CINEON_TONE_MAPPING",[qi]:"ACES_FILMIC_TONE_MAPPING",[Vr]:"AGX_TONE_MAPPING",[Gr]:"NEUTRAL_TONE_MAPPING",[kr]:"CUSTOM_TONE_MAPPING"};function q0(i,e,t,n,s,r){let a=new Ct(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Vt;c.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new _t([0,2,0,0,2,0],2));let h=new Rs({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new ut(c,h),u=new Hn(-1,1,1,-1,0,1),f=null,g=null,v=!1,m,p=null,w=[],A=!1;this.setSize=function(y,M){a.setSize(y,M),o!==null&&o.setSize(y,M),l!==null&&l.setSize(y,M);for(let S=0;S<w.length;S++){let E=w[S];E.setSize&&E.setSize(y,M)}},this.setEffects=function(y){w=y,A=w.length>0&&w[0].isRenderPass===!0;let M=a.width,S=a.height;w.length>0&&o===null&&(o=new Ct(M,S,{type:Gt,depthBuffer:!1,stencilBuffer:!1}),l=new Ct(M,S,{type:Gt,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<w.length;E++){let x=w[E];x.setSize&&x.setSize(M,S)}},this.begin=function(y,M){if(v||y.toneMapping===An&&w.length===0)return!1;if(p=M,M!==null){let S=M.width,E=M.height;(a.width!==S||a.height!==E)&&this.setSize(S,E)}return A===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=An,!0},this.hasRenderPass=function(){return A},this.end=function(y,M){y.toneMapping=m,v=!0;let S=a,E=o;for(let x=0;x<w.length;x++){let T=w[x];T.enabled!==!1&&(T.render(y,E,S,M),T.needsSwap!==!1&&(S=E,E=E===o?l:o))}if(f!==y.outputColorSpace||g!==y.toneMapping){f=y.outputColorSpace,g=y.toneMapping,h.defines={},tt.getTransfer(f)===ht&&(h.defines.SRGB_TRANSFER="");let x=X0[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(p),y.render(d,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Pd=new sn,ih=new Gn(1,1),Id=new dr,Ld=new so,Dd=new gr,ud=[],dd=[],fd=new Float32Array(16),pd=new Float32Array(9),md=new Float32Array(4);function Vs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=ud[s];if(r===void 0&&(r=new Float32Array(s),ud[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ft(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function wl(i,e){let t=dd[e];t===void 0&&(t=new Int32Array(e),dd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Ft(t,e)}}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Ft(t,e)}}function J0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Ft(t,e)}}function $0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;md.set(n),i.uniformMatrix2fv(this.addr,!1,md),Ft(t,n)}}function K0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;pd.set(n),i.uniformMatrix3fv(this.addr,!1,pd),Ft(t,n)}}function Q0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Ut(t,n))return;fd.set(n),i.uniformMatrix4fv(this.addr,!1,fd),Ft(t,n)}}function ex(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Ft(t,e)}}function nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Ft(t,e)}}function ix(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Ft(t,e)}}function sx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function rx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Ft(t,e)}}function ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Ft(t,e)}}function ox(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Ft(t,e)}}function lx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ih.compareFunction=t.isReversedDepthBuffer()?_l:xl,r=ih):r=Pd,t.setTexture2D(e||r,s)}function cx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ld,s)}function hx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Dd,s)}function ux(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Id,s)}function dx(i){switch(i){case 5126:return Y0;case 35664:return Z0;case 35665:return j0;case 35666:return J0;case 35674:return $0;case 35675:return K0;case 35676:return Q0;case 5124:case 35670:return ex;case 35667:case 35671:return tx;case 35668:case 35672:return nx;case 35669:case 35673:return ix;case 5125:return sx;case 36294:return rx;case 36295:return ax;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return lx;case 35679:case 36299:case 36307:return cx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return ux}}function fx(i,e){i.uniform1fv(this.addr,e)}function px(i,e){let t=Vs(e,this.size,2);i.uniform2fv(this.addr,t)}function mx(i,e){let t=Vs(e,this.size,3);i.uniform3fv(this.addr,t)}function gx(i,e){let t=Vs(e,this.size,4);i.uniform4fv(this.addr,t)}function xx(i,e){let t=Vs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _x(i,e){let t=Vs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function vx(i,e){let t=Vs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function yx(i,e){i.uniform1iv(this.addr,e)}function Mx(i,e){i.uniform2iv(this.addr,e)}function Sx(i,e){i.uniform3iv(this.addr,e)}function bx(i,e){i.uniform4iv(this.addr,e)}function wx(i,e){i.uniform1uiv(this.addr,e)}function Tx(i,e){i.uniform2uiv(this.addr,e)}function Ax(i,e){i.uniform3uiv(this.addr,e)}function Ex(i,e){i.uniform4uiv(this.addr,e)}function Cx(i,e,t){let n=this.cache,s=e.length,r=wl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ih:a=Pd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Rx(i,e,t){let n=this.cache,s=e.length,r=wl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ld,r[a])}function Px(i,e,t){let n=this.cache,s=e.length,r=wl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Dd,r[a])}function Ix(i,e,t){let n=this.cache,s=e.length,r=wl(t,s);Ut(n,r)||(i.uniform1iv(this.addr,r),Ft(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Id,r[a])}function Lx(i){switch(i){case 5126:return fx;case 35664:return px;case 35665:return mx;case 35666:return gx;case 35674:return xx;case 35675:return _x;case 35676:return vx;case 5124:case 35670:return yx;case 35667:case 35671:return Mx;case 35668:case 35672:return Sx;case 35669:case 35673:return bx;case 5125:return wx;case 36294:return Tx;case 36295:return Ax;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return Rx;case 35680:case 36300:case 36308:case 36293:return Px;case 36289:case 36303:case 36311:case 36292:return Ix}}var sh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dx(t.type)}},rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lx(t.type)}},ah=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},th=/(\w+)(\])?(\[|\.)?/g;function gd(i,e){i.seq.push(e),i.map[e.id]=e}function Dx(i,e,t){let n=i.name,s=n.length;for(th.lastIndex=0;;){let r=th.exec(n),a=th.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){gd(t,c===void 0?new sh(o,i,e):new rh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new ah(o),gd(t,d)),t=d}}}var zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Dx(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function xd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Nx=37297,Ux=0;function Fx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var _d=new Ye;function Bx(i){tt._getMatrix(_d,tt.workingColorSpace,i);let e=`mat3( ${_d.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case hr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function vd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Fx(i.getShaderSource(e),o)}else return r}function Ox(i,e){let t=Bx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var zx={[Br]:"Linear",[Or]:"Reinhard",[zr]:"Cineon",[qi]:"ACESFilmic",[Vr]:"AgX",[Gr]:"Neutral",[kr]:"Custom"};function kx(i,e){let t=zx[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var yl=new D;function Vx(){tt.getLuminanceCoefficients(yl);let i=yl.x.toFixed(4),e=yl.y.toFixed(4),t=yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qr).join(`
`)}function Hx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Qr(i){return i!==""}function yd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Md(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(i){return i.replace(Xx,Yx)}var qx=new Map;function Yx(i,e){let t=Qe[e];if(t===void 0){let n=qx.get(e);if(n!==void 0)t=Qe[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return oh(t)}var Zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sd(i){return i.replace(Zx,jx)}function jx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Jx={[Xi]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function $x(i){return Jx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Kx={[wi]:"ENVMAP_TYPE_CUBE",[Yi]:"ENVMAP_TYPE_CUBE",[Hr]:"ENVMAP_TYPE_CUBE_UV"};function Qx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Kx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var e_={[Yi]:"ENVMAP_MODE_REFRACTION"};function t_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":e_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var n_={[Io]:"ENVMAP_BLENDING_MULTIPLY",[Bu]:"ENVMAP_BLENDING_MIX",[Ou]:"ENVMAP_BLENDING_ADD"};function i_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":n_[i.combine]||"ENVMAP_BLENDING_NONE"}function s_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function r_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=$x(t),c=Qx(t),h=t_(t),d=i_(t),u=s_(t),f=Gx(t),g=Hx(r),v=s.createProgram(),m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Qr).join(`
`),p.length>0&&(p+=`
`)):(m=[bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),p=[bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Qe.tonemapping_pars_fragment:"",t.toneMapping!==An?kx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Ox("linearToOutputTexel",t.outputColorSpace),Vx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qr).join(`
`)),a=oh(a),a=yd(a,t),a=Md(a,t),o=oh(o),o=yd(o,t),o=Md(o,t),a=Sd(a),o=Sd(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=w+m+a,y=w+p+o,M=xd(s,s.VERTEX_SHADER,A),S=xd(s,s.FRAGMENT_SHADER,y);s.attachShader(v,M),s.attachShader(v,S),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(P){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(v)||"",z=s.getShaderInfoLog(M)||"",I=s.getShaderInfoLog(S)||"",O=N.trim(),q=z.trim(),W=I.trim(),ne=!0,H=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,M,S);else{let J=vd(s,M,"vertex"),K=vd(s,S,"fragment");We("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+J+`
`+K)}else O!==""?Ge("WebGLProgram: Program Info Log:",O):(q===""||W==="")&&(H=!1);H&&(P.diagnostics={runnable:ne,programLog:O,vertexShader:{log:q,prefix:m},fragmentShader:{log:W,prefix:p}})}s.deleteShader(M),s.deleteShader(S),x=new zs(s,v),T=Wx(s,v)}let x;this.getUniforms=function(){return x===void 0&&E(this),x};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,Nx)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ux++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=M,this.fragmentShader=S,this}var a_=0,lh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ch(e),t.set(e,n)),n}},ch=class{constructor(e){this.id=a_++,this.code=e,this.usedTimes=0}};function o_(i){return i===Ei||i===jr||i===Jr}function l_(i,e,t,n,s,r){let a=new fr,o=new lh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,T,R,P,N,z){let I=P.fog,O=N.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,W=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ne=e.get(x.envMap||q,W),H=ne&&ne.mapping===Hr?ne.image.height:null,J=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Ge("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let K=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ee=K!==void 0?K.length:0,Te=0;O.morphAttributes.position!==void 0&&(Te=1),O.morphAttributes.normal!==void 0&&(Te=2),O.morphAttributes.color!==void 0&&(Te=3);let rt,je,et,Y;if(J){let vt=Zn[J];rt=vt.vertexShader,je=vt.fragmentShader}else{rt=x.vertexShader,je=x.fragmentShader;let vt=o.getVertexShaderStage(x),dt=o.getFragmentShaderStage(x);o.update(x,vt,dt),et=vt.id,Y=dt.id}let $=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Ue=N.isInstancedMesh===!0,be=N.isBatchedMesh===!0,ke=!!x.map,ot=!!x.matcap,ee=!!ne,re=!!x.aoMap,ae=!!x.lightMap,oe=!!x.bumpMap&&x.wireframe===!1,ue=!!x.normalMap,ze=!!x.displacementMap,Fe=!!x.emissiveMap,Ve=!!x.metalnessMap,Xe=!!x.roughnessMap,L=x.anisotropy>0,at=x.clearcoat>0,Je=x.dispersion>0,C=x.retroreflectivity>0,_=x.iridescence>0,B=x.sheen>0,k=x.transmission>0,Z=L&&!!x.anisotropyMap,le=at&&!!x.clearcoatMap,fe=at&&!!x.clearcoatNormalMap,j=at&&!!x.clearcoatRoughnessMap,te=_&&!!x.iridescenceMap,ge=_&&!!x.iridescenceThicknessMap,De=B&&!!x.sheenColorMap,me=B&&!!x.sheenRoughnessMap,pe=!!x.specularMap,Re=!!x.specularColorMap,Be=!!x.specularIntensityMap,qe=k&&!!x.transmissionMap,F=k&&!!x.thicknessMap,xe=!!x.gradientMap,Q=!!x.alphaMap,_e=x.alphaTest>0,we=!!x.alphaHash,se=!!x.extensions,Oe=An;x.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Oe=i.toneMapping);let Le={shaderID:J,shaderType:x.type,shaderName:x.name,vertexShader:rt,fragmentShader:je,defines:x.defines,customVertexShaderID:et,customFragmentShaderID:Y,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:be,batchingColor:be&&N._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&N.instanceColor!==null,instancingMorph:Ue&&N.morphTexture!==null,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ke,matcap:ot,envMap:ee,envMapMode:ee&&ne.mapping,envMapCubeUVHeight:H,aoMap:re,lightMap:ae,bumpMap:oe,normalMap:ue,displacementMap:ze,emissiveMap:Fe,normalMapObjectSpace:ue&&x.normalMapType===Vu,normalMapTangentSpace:ue&&x.normalMapType===Fs,packedNormalMap:ue&&x.normalMapType===Fs&&o_(x.normalMap.format),metalnessMap:Ve,roughnessMap:Xe,anisotropy:L,anisotropyMap:Z,clearcoat:at,clearcoatMap:le,clearcoatNormalMap:fe,clearcoatRoughnessMap:j,dispersion:Je,retroreflection:C,iridescence:_,iridescenceMap:te,iridescenceThicknessMap:ge,sheen:B,sheenColorMap:De,sheenRoughnessMap:me,specularMap:pe,specularColorMap:Re,specularIntensityMap:Be,transmission:k,transmissionMap:qe,thicknessMap:F,gradientMap:xe,opaque:x.transparent===!1&&x.blending===Ds&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:_e,alphaHash:we,combine:x.combine,mapUv:ke&&g(x.map.channel),aoMapUv:re&&g(x.aoMap.channel),lightMapUv:ae&&g(x.lightMap.channel),bumpMapUv:oe&&g(x.bumpMap.channel),normalMapUv:ue&&g(x.normalMap.channel),displacementMapUv:ze&&g(x.displacementMap.channel),emissiveMapUv:Fe&&g(x.emissiveMap.channel),metalnessMapUv:Ve&&g(x.metalnessMap.channel),roughnessMapUv:Xe&&g(x.roughnessMap.channel),anisotropyMapUv:Z&&g(x.anisotropyMap.channel),clearcoatMapUv:le&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(x.sheenRoughnessMap.channel),specularMapUv:pe&&g(x.specularMap.channel),specularColorMapUv:Re&&g(x.specularColorMap.channel),specularIntensityMapUv:Be&&g(x.specularIntensityMap.channel),transmissionMapUv:qe&&g(x.transmissionMap.channel),thicknessMapUv:F&&g(x.thicknessMap.channel),alphaMapUv:Q&&g(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ue||L),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(ke||Q),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ue===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:de,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Te,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:ke&&x.map.isVideoTexture===!0&&tt.getTransfer(x.map.colorSpace)===ht,decodeVideoTextureEmissive:Fe&&x.emissiveMap.isVideoTexture===!0&&tt.getTransfer(x.emissiveMap.colorSpace)===ht,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Wn,flipSided:x.side===qt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&x.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function m(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)T.push(R),T.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(p(T,x),w(T,x),T.push(i.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function w(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){let T=f[x.type],R;if(T){let P=Zn[T];R=Cn.clone(P.uniforms)}else R=x.uniforms;return R}function y(x,T){let R=h.get(T);return R!==void 0?++R.usedTimes:(R=new r_(i,T,x,s),c.push(R),h.set(T,R)),R}function M(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){o.remove(x)}function E(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:A,acquireProgram:y,releaseProgram:M,releaseShaderCache:S,programs:c,dispose:E}}function c_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function h_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function wd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Td(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,m,p){let w=i[e];return w===void 0?(w={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[e]=w):(w.id=u.id,w.object=u,w.geometry=f,w.material=g,w.materialVariant=a(u),w.groupOrder=v,w.renderOrder=u.renderOrder,w.z=m,w.group=p),e++,w}function l(u,f,g,v,m,p,w){w.reversedDepth===!0&&(m=-m);let A=o(u,f,g,v,m,p);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):t.push(A)}function c(u,f,g,v,m,p){let w=o(u,f,g,v,m,p);g.transmission>0?n.unshift(w):g.transparent===!0?s.unshift(w):t.unshift(w)}function h(u,f){t.length>1&&t.sort(u||h_),n.length>1&&n.sort(f||wd),s.length>1&&s.sort(f||wd)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function u_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new Td,i.set(n,[a])):s>=r.length?(a=new Td,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function d_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new D,color:new Ze};break;case"SpotLight":t={position:new D,direction:new D,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function f_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var p_=0;function m_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function g_(i){let e=new d_,t=f_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);let s=new D,r=new pt,a=new pt;function o(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,w=0,A=0,y=0,M=0,S=0,E=0,x=0,T=0,R=0;c.sort(m_);for(let N=0,z=c.length;N<z;N++){let I=c[N],O=I.color,q=I.intensity,W=I.distance,ne=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ei?ne=I.shadow.map.texture:ne=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=O.r*q,d+=O.g*q,u+=O.b*q;else if(I.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(I.sh.coefficients[H],q);R++}else if(I.isSunLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,K=t.get(I);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[g]=K,n.sunShadowMap[g]=ne;let Ee=J.getViewportCount();for(let Te=0;Te<Ee;Te++)n.sunShadowMatrix[v+Te]=J.getMatrix(Te),n.sunShadowCascade[v+Te]=J._cascadeData[Te];v+=Ee,g++}n.sun[f]=H,f++}else if(I.isDirectionalLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let J=I.shadow,K=t.get(I);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=ne,n.directionalShadowMatrix[m]=I.shadow.matrix,M++}n.directional[m]=H,m++}else if(I.isSpotLight){let H=e.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(O).multiplyScalar(q),H.distance=W,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,n.spot[w]=H;let J=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,J.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[w]=J.matrix,I.castShadow){let K=t.get(I);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,n.spotShadow[w]=K,n.spotShadowMap[w]=ne,E++}w++}else if(I.isRectAreaLight){let H=e.get(I);H.color.copy(O).multiplyScalar(q),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),n.rectArea[A]=H,A++}else if(I.isPointLight){let H=e.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),H.distance=I.distance,H.decay=I.decay,I.castShadow){let J=I.shadow,K=t.get(I);K.shadowIntensity=J.intensity,K.shadowBias=J.bias,K.shadowNormalBias=J.normalBias,K.shadowRadius=J.radius,K.shadowMapSize=J.mapSize,K.shadowCameraNear=J.camera.near,K.shadowCameraFar=J.camera.far,n.pointShadow[p]=K,n.pointShadowMap[p]=ne,n.pointShadowMatrix[p]=I.shadow.matrix,S++}n.point[p]=H,p++}else if(I.isHemisphereLight){let H=e.get(I);H.skyColor.copy(I.color).multiplyScalar(q),H.groundColor.copy(I.groundColor).multiplyScalar(q),n.hemi[y]=H,y++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let P=n.hash;(P.sunLength!==f||P.directionalLength!==m||P.pointLength!==p||P.spotLength!==w||P.rectAreaLength!==A||P.hemiLength!==y||P.numSunShadows!==g||P.numDirectionalShadows!==M||P.numPointShadows!==S||P.numSpotShadows!==E||P.numSpotMaps!==x||P.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=m,n.spot.length=w,n.rectArea.length=A,n.point.length=p,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=E,n.spotShadowMap.length=E,n.spotLightMatrix.length=E+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.sunLength=f,P.directionalLength=m,P.pointLength=p,P.spotLength=w,P.rectAreaLength=A,P.hemiLength=y,P.numSunShadows=g,P.numDirectionalShadows=M,P.numPointShadows=S,P.numSpotShadows=E,P.numSpotMaps=x,P.numLightProbes=R,n.version=p_++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0,m=0,p=h.matrixWorldInverse;for(let w=0,A=c.length;w<A;w++){let y=c[w];if(y.isSunLight){let M=n.sun[d];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),u++}else if(y.isSpotLight){let M=n.spot[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),g++}else if(y.isRectAreaLight){let M=n.rectArea[v];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let M=n.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let M=n.hemi[m];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function Ad(i){let e=new g_(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function x_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Ad(i),e.set(s,[o])):r>=a.length?(o=new Ad(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var __=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v_=`uniform sampler2D shadow_pass;
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
}`,y_=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],M_=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Ed=new pt,Kr=new D,nh=new D;function S_(i,e,t){let n=new ws,s=new he,r=new he,a=new wt,o=new po,l=new mo,c={},h=t.maxTextureSize,d={[bi]:qt,[qt]:bi,[Wn]:Wn},u=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:__,fragmentShader:v_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Vt;g.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ut(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xi;let p=this.type;this.render=function(S,E,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Su&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xi);let T=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Nt),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let z=p!==this.type;z&&E.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(O=>O.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,O=S.length;I<O;I++){let q=S[I],W=q.shadow;if(W===void 0){Ge("WebGLShadowMap:",q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ne=W.getFrameExtents();s.multiply(ne),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,W.mapSize.y=r.y));let H=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=H,W.map===null||z===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Ls){if(q.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ct(s.x,s.y,{format:Ei,type:Gt,minFilter:Xt,magFilter:Xt,generateMipmaps:!1}),W.map.texture.name=q.name+".shadowMap",W.map.depthTexture=new Gn(s.x,s.y,on),W.map.depthTexture.name=q.name+".shadowMapDepth",W.map.depthTexture.format=Fn,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Et,W.map.depthTexture.magFilter=Et}else q.isPointLight?(W.map=new Ml(s.x),W.map.depthTexture=new ao(s.x,En)):(W.map=new Ct(s.x,s.y),W.map.depthTexture=new Gn(s.x,s.y,En)),W.map.depthTexture.name=q.name+".shadowMap",W.map.depthTexture.format=Fn,this.type===Xi?(W.map.depthTexture.compareFunction=H?_l:xl,W.map.depthTexture.minFilter=Xt,W.map.depthTexture.magFilter=Xt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Et,W.map.depthTexture.magFilter=Et);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let J=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();q.isPointLight!==!0&&W.updateMatrices(q,x);for(let K=0;K<J;K++){let Ee=W.getCamera(K);if(q.isPointLight){let Te=W.camera,rt=W.matrix,je=q.distance||Te.far;je!==Te.far&&(Te.far=je,Te.updateProjectionMatrix()),Kr.setFromMatrixPosition(q.matrixWorld),Te.position.copy(Kr),nh.copy(Te.position),nh.add(y_[K]),Te.up.copy(M_[K]),Te.lookAt(nh),Te.updateMatrixWorld(),rt.makeTranslation(-Kr.x,-Kr.y,-Kr.z),Ed.multiplyMatrices(Te.projectionMatrix,Te.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Ed,Te.coordinateSystem,Te.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,K),i.clear();else{K===0&&(i.setRenderTarget(W.map),i.clear());let Te=W.getViewport(K);a.set(r.x*Te.x,r.y*Te.y,r.x*Te.z,r.y*Te.w),N.viewport(a)}n=W.getFrustum(K),y(E,x,Ee,q,this.type)}W.isPointLightShadow!==!0&&this.type===Ls&&w(W,x),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,R,P)};function w(S,E){let x=e.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null?S.mapPass=new Ct(s.x,s.y,{format:Ei,type:Gt}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),u.uniforms.shadow_pass.value=S.map.depthTexture,u.uniforms.resolution.value.set(S.map.width,S.map.height),u.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(E,null,x,u,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(E,null,x,f,v,null)}function A(S,E,x,T){let R=null,P=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)R=P;else if(R=x.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let N=R.uuid,z=E.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let O=I[z];O===void 0&&(O=R.clone(),I[z]=O,E.addEventListener("dispose",M)),R=O}if(R.visible=E.visible,R.wireframe=E.wireframe,T===Ls?R.side=E.shadowSide!==null?E.shadowSide:E.side:R.side=E.shadowSide!==null?E.shadowSide:d[E.side],R.alphaMap=E.alphaMap,R.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,R.map=E.map,R.clipShadows=E.clipShadows,R.clippingPlanes=E.clippingPlanes,R.clipIntersection=E.clipIntersection,R.displacementMap=E.displacementMap,R.displacementScale=E.displacementScale,R.displacementBias=E.displacementBias,R.wireframeLinewidth=E.wireframeLinewidth,R.linewidth=E.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let N=i.properties.get(R);N.light=x}return R}function y(S,E,x,T,R){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===Ls)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);let z=e.update(S),I=S.material;if(Array.isArray(I)){let O=z.groups;for(let q=0,W=O.length;q<W;q++){let ne=O[q],H=I[ne.materialIndex];if(H&&H.visible){let J=A(S,H,T,R);S.onBeforeShadow(i,S,E,x,z,J,ne),i.renderBufferDirect(x,null,z,J,S,ne),S.onAfterShadow(i,S,E,x,z,J,ne)}}}else if(I.visible){let O=A(S,I,T,R);S.onBeforeShadow(i,S,E,x,z,O,null),i.renderBufferDirect(x,null,z,O,S,null),S.onAfterShadow(i,S,E,x,z,O,null)}}let N=S.children;for(let z=0,I=N.length;z<I;z++)y(N[z],E,x,T,R)}function M(S){S.target.removeEventListener("dispose",M);for(let x in c){let T=c[x],R=S.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function b_(i,e){function t(){let F=!1,xe=new wt,Q=null,_e=new wt(0,0,0,0);return{setMask:function(we){Q!==we&&!F&&(i.colorMask(we,we,we,we),Q=we)},setLocked:function(we){F=we},setClear:function(we,se,Oe,Le,vt){vt===!0&&(we*=Le,se*=Le,Oe*=Le),xe.set(we,se,Oe,Le),_e.equals(xe)===!1&&(i.clearColor(we,se,Oe,Le),_e.copy(xe))},reset:function(){F=!1,Q=null,_e.set(-1,0,0,0)}}}function n(){let F=!1,xe=!1,Q=null,_e=null,we=null;return{setReversed:function(se){if(xe!==se){let Oe=e.get("EXT_clip_control");se?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),xe=se;let Le=we;we=null,this.setClear(Le)}},getReversed:function(){return xe},setTest:function(se){se?$(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(se){Q!==se&&!F&&(i.depthMask(se),Q=se)},setFunc:function(se){if(xe&&(se=Qu[se]),_e!==se){switch(se){case Ya:i.depthFunc(i.NEVER);break;case Za:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case xs:i.depthFunc(i.LEQUAL);break;case Ja:i.depthFunc(i.EQUAL);break;case $a:i.depthFunc(i.GEQUAL);break;case Ka:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_e=se}},setLocked:function(se){F=se},setClear:function(se){we!==se&&(we=se,xe&&(se=1-se),i.clearDepth(se))},reset:function(){F=!1,Q=null,_e=null,we=null,xe=!1}}}function s(){let F=!1,xe=null,Q=null,_e=null,we=null,se=null,Oe=null,Le=null,vt=null;return{setTest:function(dt){F||(dt?$(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(dt){xe!==dt&&!F&&(i.stencilMask(dt),xe=dt)},setFunc:function(dt,yn,Pn){(Q!==dt||_e!==yn||we!==Pn)&&(i.stencilFunc(dt,yn,Pn),Q=dt,_e=yn,we=Pn)},setOp:function(dt,yn,Pn){(se!==dt||Oe!==yn||Le!==Pn)&&(i.stencilOp(dt,yn,Pn),se=dt,Oe=yn,Le=Pn)},setLocked:function(dt){F=dt},setClear:function(dt){vt!==dt&&(i.clearStencil(dt),vt=dt)},reset:function(){F=!1,xe=null,Q=null,_e=null,we=null,se=null,Oe=null,Le=null,vt=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,w=null,A=null,y=null,M=null,S=null,E=null,x=new Ze(0,0,0),T=0,R=!1,P=null,N=null,z=null,I=null,O=null,q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ne=0,H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=ne>=1):H.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=ne>=2);let J=null,K={},Ee=i.getParameter(i.SCISSOR_BOX),Te=i.getParameter(i.VIEWPORT),rt=new wt().fromArray(Ee),je=new wt().fromArray(Te);function et(F,xe,Q,_e){let we=new Uint8Array(4),se=i.createTexture();i.bindTexture(F,se),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<Q;Oe++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(xe,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,we):i.texImage2D(xe+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,we);return se}let Y={};Y[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(i.DEPTH_TEST),a.setFunc(xs),oe(!1),ue(Rc),$(i.CULL_FACE),re(Nt);function $(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function de(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Ue(F,xe){return u[F]!==xe?(i.bindFramebuffer(F,xe),u[F]=xe,F===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xe),F===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xe),!0):!1}function be(F,xe){let Q=g,_e=!1;if(F){Q=f.get(xe),Q===void 0&&(Q=[],f.set(xe,Q));let we=F.textures;if(Q.length!==we.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Oe=we.length;se<Oe;se++)Q[se]=i.COLOR_ATTACHMENT0+se;Q.length=we.length,_e=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,_e=!0);_e&&i.drawBuffers(Q)}function ke(F){return v!==F?(i.useProgram(F),v=F,!0):!1}let ot={[Xn]:i.FUNC_ADD,[bu]:i.FUNC_SUBTRACT,[wu]:i.FUNC_REVERSE_SUBTRACT};ot[Tu]=i.MIN,ot[Au]=i.MAX;let ee={[Fr]:i.ZERO,[Eu]:i.ONE,[Cu]:i.SRC_COLOR,[Dc]:i.SRC_ALPHA,[Lu]:i.SRC_ALPHA_SATURATE,[Po]:i.DST_COLOR,[Ro]:i.DST_ALPHA,[Ru]:i.ONE_MINUS_SRC_COLOR,[Nc]:i.ONE_MINUS_SRC_ALPHA,[Iu]:i.ONE_MINUS_DST_COLOR,[Pu]:i.ONE_MINUS_DST_ALPHA,[Du]:i.CONSTANT_COLOR,[Nu]:i.ONE_MINUS_CONSTANT_COLOR,[Uu]:i.CONSTANT_ALPHA,[Fu]:i.ONE_MINUS_CONSTANT_ALPHA};function re(F,xe,Q,_e,we,se,Oe,Le,vt,dt){if(F===Nt){m===!0&&(de(i.BLEND),m=!1);return}if(m===!1&&($(i.BLEND),m=!0),F!==Co){if(F!==p||dt!==R){if((w!==Xn||M!==Xn)&&(i.blendEquation(i.FUNC_ADD),w=Xn,M=Xn),dt)switch(F){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pc:i.blendFunc(i.ONE,i.ONE);break;case Ic:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Lc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:We("WebGLState: Invalid blending: ",F);break}else switch(F){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ic:We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lc:We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:We("WebGLState: Invalid blending: ",F);break}A=null,y=null,S=null,E=null,x.set(0,0,0),T=0,p=F,R=dt}return}we=we||xe,se=se||Q,Oe=Oe||_e,(xe!==w||we!==M)&&(i.blendEquationSeparate(ot[xe],ot[we]),w=xe,M=we),(Q!==A||_e!==y||se!==S||Oe!==E)&&(i.blendFuncSeparate(ee[Q],ee[_e],ee[se],ee[Oe]),A=Q,y=_e,S=se,E=Oe),(Le.equals(x)===!1||vt!==T)&&(i.blendColor(Le.r,Le.g,Le.b,vt),x.copy(Le),T=vt),p=F,R=!1}function ae(F,xe){F.side===Wn?de(i.CULL_FACE):$(i.CULL_FACE);let Q=F.side===qt;xe&&(Q=!Q),oe(Q),F.blending===Ds&&F.transparent===!1?re(Nt):re(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);let _e=F.stencilWrite;o.setTest(_e),_e&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Fe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function oe(F){P!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),P=F)}function ue(F){F!==yu?($(i.CULL_FACE),F!==N&&(F===Rc?i.cullFace(i.BACK):F===Mu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),N=F}function ze(F){F!==z&&(W&&i.lineWidth(F),z=F)}function Fe(F,xe,Q){F?($(i.POLYGON_OFFSET_FILL),(I!==xe||O!==Q)&&(I=xe,O=Q,a.getReversed()&&(xe=-xe),i.polygonOffset(xe,Q))):de(i.POLYGON_OFFSET_FILL)}function Ve(F){F?$(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function Xe(F){F===void 0&&(F=i.TEXTURE0+q-1),J!==F&&(i.activeTexture(F),J=F)}function L(F,xe,Q){Q===void 0&&(J===null?Q=i.TEXTURE0+q-1:Q=J);let _e=K[Q];_e===void 0&&(_e={type:void 0,texture:void 0},K[Q]=_e),(_e.type!==F||_e.texture!==xe)&&(J!==Q&&(i.activeTexture(Q),J=Q),i.bindTexture(F,xe||Y[F]),_e.type=F,_e.texture=xe)}function at(){let F=K[J];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Je(){try{i.compressedTexImage2D(...arguments)}catch(F){We("WebGLState:",F)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(F){We("WebGLState:",F)}}function _(){try{i.texSubImage2D(...arguments)}catch(F){We("WebGLState:",F)}}function B(){try{i.texSubImage3D(...arguments)}catch(F){We("WebGLState:",F)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(F){We("WebGLState:",F)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(F){We("WebGLState:",F)}}function le(){try{i.texStorage2D(...arguments)}catch(F){We("WebGLState:",F)}}function fe(){try{i.texStorage3D(...arguments)}catch(F){We("WebGLState:",F)}}function j(){try{i.texImage2D(...arguments)}catch(F){We("WebGLState:",F)}}function te(){try{i.texImage3D(...arguments)}catch(F){We("WebGLState:",F)}}function ge(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function De(F,xe){d[F]!==xe&&(i.pixelStorei(F,xe),d[F]=xe)}function me(F){rt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),rt.copy(F))}function pe(F){je.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),je.copy(F))}function Re(F,xe){let Q=c.get(xe);Q===void 0&&(Q=new WeakMap,c.set(xe,Q));let _e=Q.get(F);_e===void 0&&(_e=i.getUniformBlockIndex(xe,F.name),Q.set(F,_e))}function Be(F,xe){let _e=c.get(xe).get(F);l.get(xe)!==_e&&(i.uniformBlockBinding(xe,_e,F.__bindingPointIndex),l.set(xe,_e))}function qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},J=null,K={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,w=null,A=null,y=null,M=null,S=null,E=null,x=new Ze(0,0,0),T=0,R=!1,P=null,N=null,z=null,I=null,O=null,rt.set(0,0,i.canvas.width,i.canvas.height),je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:de,bindFramebuffer:Ue,drawBuffers:be,useProgram:ke,setBlending:re,setMaterial:ae,setFlipSided:oe,setCullFace:ue,setLineWidth:ze,setPolygonOffset:Fe,setScissorTest:Ve,activeTexture:Xe,bindTexture:L,unbindTexture:at,compressedTexImage2D:Je,compressedTexImage3D:C,texImage2D:j,texImage3D:te,pixelStorei:De,getParameter:ge,updateUBOMapping:Re,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:fe,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:k,compressedTexSubImage3D:Z,scissor:me,viewport:pe,reset:qe}}function w_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new he,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,_){return g?new OffscreenCanvas(C,_):ur("canvas")}function m(C,_,B){let k=1,Z=Je(C);if((Z.width>B||Z.height>B)&&(k=B/Math.max(Z.width,Z.height)),k<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let le=Math.floor(k*Z.width),fe=Math.floor(k*Z.height);u===void 0&&(u=v(le,fe));let j=_?v(le,fe):u;return j.width=le,j.height=fe,j.getContext("2d").drawImage(C,0,0,le,fe),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+fe+")."),j}else return"data"in C&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),C;return C}function p(C){return C.generateMipmaps}function w(C){i.generateMipmap(C)}function A(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,_,B,k,Z,le=!1){if(C!==null){if(i[C]!==void 0)return i[C];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let fe;k&&(fe=e.get("EXT_texture_norm16"),fe||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8),B===i.UNSIGNED_SHORT&&fe&&(j=fe.R16_EXT),B===i.SHORT&&fe&&(j=fe.R16_SNORM_EXT)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),_===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8),B===i.UNSIGNED_SHORT&&fe&&(j=fe.RG16_EXT),B===i.SHORT&&fe&&(j=fe.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(B===i.UNSIGNED_SHORT&&fe&&(j=fe.RGB16_EXT),B===i.SHORT&&fe&&(j=fe.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){let te=le?hr:tt.getTransfer(Z);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=te===ht?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&fe&&(j=fe.RGBA16_EXT),B===i.SHORT&&fe&&(j=fe.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(C,_){let B;return C?_===null||_===En||_===Ai?B=i.DEPTH24_STENCIL8:_===on?B=i.DEPTH32F_STENCIL8:_===Ns&&(B=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===En||_===Ai?B=i.DEPTH_COMPONENT24:_===on?B=i.DEPTH_COMPONENT32F:_===Ns&&(B=i.DEPTH_COMPONENT16),B}function S(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Et&&C.minFilter!==Xt?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function E(C){let _=C.target;_.removeEventListener("dispose",E),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(C){let _=C.target;_.removeEventListener("dispose",x),P(_)}function T(C){let _=n.get(C);if(_.__webglInit===void 0)return;let B=C.source,k=f.get(B);if(k){let Z=k[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(C),Object.keys(k).length===0&&f.delete(B)}n.remove(C)}function R(C){let _=n.get(C);i.deleteTexture(_.__webglTexture);let B=C.source,k=f.get(B);delete k[_.__cacheKey],a.memory.textures--}function P(C){let _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(_.__webglFramebuffer[k]))for(let Z=0;Z<_.__webglFramebuffer[k].length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[k][Z]);else i.deleteFramebuffer(_.__webglFramebuffer[k]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[k])}else{if(Array.isArray(_.__webglFramebuffer))for(let k=0;k<_.__webglFramebuffer.length;k++)i.deleteFramebuffer(_.__webglFramebuffer[k]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let k=0;k<_.__webglColorRenderbuffer.length;k++)_.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[k]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let B=C.textures;for(let k=0,Z=B.length;k<Z;k++){let le=n.get(B[k]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(B[k])}n.remove(C)}let N=0;function z(){N=0}function I(){return N}function O(C){N=C}function q(){let C=N;return C>=s.maxTextures&&Ge("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),N+=1,C}function W(C){let _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function ne(C,_){let B=n.get(C);if(C.isVideoTexture&&L(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){let k=C.image;if(k===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,C,_);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function H(C,_){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){de(B,C,_);return}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function J(C,_){let B=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){de(B,C,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function K(C,_){let B=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&B.__version!==C.version){Ue(B,C,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}let Ee={[ti]:i.REPEAT,[Un]:i.CLAMP_TO_EDGE,[eo]:i.MIRRORED_REPEAT},Te={[Et]:i.NEAREST,[zu]:i.NEAREST_MIPMAP_NEAREST,[Wr]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[No]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},rt={[Hu]:i.NEVER,[Zu]:i.ALWAYS,[Wu]:i.LESS,[xl]:i.LEQUAL,[Xu]:i.EQUAL,[_l]:i.GEQUAL,[qu]:i.GREATER,[Yu]:i.NOTEQUAL};function je(C,_){if(_.type===on&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Xt||_.magFilter===No||_.magFilter===Wr||_.magFilter===Ti||_.minFilter===Xt||_.minFilter===No||_.minFilter===Wr||_.minFilter===Ti)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Ee[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Ee[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Ee[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,Te[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,Te[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,rt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Et||_.minFilter!==Wr&&_.minFilter!==Ti||_.type===on&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function et(C,_){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",E));let k=_.source,Z=f.get(k);Z===void 0&&(Z={},f.set(k,Z));let le=W(_);if(le!==C.__cacheKey){Z[le]===void 0&&(Z[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[le].usedTimes++;let fe=Z[C.__cacheKey];fe!==void 0&&(Z[C.__cacheKey].usedTimes--,fe.usedTimes===0&&R(_)),C.__cacheKey=le,C.__webglTexture=Z[le].texture}return B}function Y(C,_,B){return Math.floor(Math.floor(C/B)/_)}function $(C,_,B,k){let le=C.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,B,k,_.data);else{le.sort((De,me)=>De.start-me.start);let fe=0;for(let De=1;De<le.length;De++){let me=le[fe],pe=le[De],Re=me.start+me.count,Be=Y(pe.start,_.width,4),qe=Y(me.start,_.width,4);pe.start<=Re+1&&Be===qe&&Y(pe.start+pe.count-1,_.width,4)===Be?me.count=Math.max(me.count,pe.start+pe.count-me.start):(++fe,le[fe]=pe)}le.length=fe+1;let j=t.getParameter(i.UNPACK_ROW_LENGTH),te=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let De=0,me=le.length;De<me;De++){let pe=le[De],Re=Math.floor(pe.start/4),Be=Math.ceil(pe.count/4),qe=Re%_.width,F=Math.floor(Re/_.width),xe=Be,Q=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,qe,F,xe,Q,B,k,_.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,te),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function de(C,_,B){let k=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(k=i.TEXTURE_3D);let Z=et(C,_),le=_.source;t.bindTexture(k,C.__webglTexture,i.TEXTURE0+B);let fe=n.get(le);if(le.version!==fe.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let Q=tt.getPrimaries(tt.workingColorSpace),_e=_.colorSpace===si?null:tt.getPrimaries(_.colorSpace),we=_.colorSpace===si||Q===_e?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let te=m(_.image,!1,s.maxTextureSize);te=at(_,te);let ge=r.convert(_.format,_.colorSpace),De=r.convert(_.type),me=y(_.internalFormat,ge,De,_.normalized,_.colorSpace,_.isVideoTexture);je(k,_);let pe,Re=_.mipmaps,Be=_.isVideoTexture!==!0,qe=fe.__version===void 0||Z===!0,F=le.dataReady,xe=S(_,te);if(_.isDepthTexture)me=M(_.format===qn,_.type),qe&&(Be?t.texStorage2D(i.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,me,te.width,te.height,0,ge,De,null));else if(_.isDataTexture)if(Re.length>0){Be&&qe&&t.texStorage2D(i.TEXTURE_2D,xe,me,Re[0].width,Re[0].height);for(let Q=0,_e=Re.length;Q<_e;Q++)pe=Re[Q],Be?F&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,De,pe.data):t.texImage2D(i.TEXTURE_2D,Q,me,pe.width,pe.height,0,ge,De,pe.data);_.generateMipmaps=!1}else Be?(qe&&t.texStorage2D(i.TEXTURE_2D,xe,me,te.width,te.height),F&&$(_,te,ge,De)):t.texImage2D(i.TEXTURE_2D,0,me,te.width,te.height,0,ge,De,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Be&&qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,me,Re[0].width,Re[0].height,te.depth);for(let Q=0,_e=Re.length;Q<_e;Q++)if(pe=Re[Q],_.format!==xn)if(ge!==null)if(Be){if(F)if(_.layerUpdates.size>0){let we=Jc(pe.width,pe.height,_.format,_.type);for(let se of _.layerUpdates){let Oe=pe.data.subarray(se*we/pe.data.BYTES_PER_ELEMENT,(se+1)*we/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,se,pe.width,pe.height,1,ge,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,pe.width,pe.height,te.depth,ge,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,me,pe.width,pe.height,te.depth,0,pe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,pe.width,pe.height,te.depth,ge,De,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Q,me,pe.width,pe.height,te.depth,0,ge,De,pe.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Be&&qe&&t.texStorage2D(i.TEXTURE_2D,xe,me,Re[0].width,Re[0].height);for(let Q=0,_e=Re.length;Q<_e;Q++)pe=Re[Q],_.format!==xn?ge!==null?Be?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,Q,me,pe.width,pe.height,0,pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?F&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,pe.width,pe.height,ge,De,pe.data):t.texImage2D(i.TEXTURE_2D,Q,me,pe.width,pe.height,0,ge,De,pe.data)}else if(_.isDataArrayTexture)if(Be){if(qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,xe,me,te.width,te.height,te.depth),F)if(_.layerUpdates.size>0){let Q=Jc(te.width,te.height,_.format,_.type);for(let _e of _.layerUpdates){let we=te.data.subarray(_e*Q/te.data.BYTES_PER_ELEMENT,(_e+1)*Q/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_e,te.width,te.height,1,ge,De,we)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ge,De,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,ge,De,te.data);else if(_.isData3DTexture)Be?(qe&&t.texStorage3D(i.TEXTURE_3D,xe,me,te.width,te.height,te.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ge,De,te.data)):t.texImage3D(i.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,ge,De,te.data);else if(_.isFramebufferTexture){if(qe)if(Be)t.texStorage2D(i.TEXTURE_2D,xe,me,te.width,te.height);else{let Q=te.width,_e=te.height;for(let we=0;we<xe;we++)t.texImage2D(i.TEXTURE_2D,we,me,Q,_e,0,ge,De,null),Q>>=1,_e>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let Q=i.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),te.parentNode!==Q){Q.appendChild(te),d.add(_),Q.onpaint=_e=>{let we=_e.changedElements;for(let se of d)we.includes(se.image)&&(se.needsUpdate=!0)},Q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,te);else{let we=i.RGBA,se=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,we,se,Oe,te)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Be&&qe){let Q=Je(Re[0]);t.texStorage2D(i.TEXTURE_2D,xe,me,Q.width,Q.height)}for(let Q=0,_e=Re.length;Q<_e;Q++)pe=Re[Q],Be?F&&t.texSubImage2D(i.TEXTURE_2D,Q,0,0,ge,De,pe):t.texImage2D(i.TEXTURE_2D,Q,me,ge,De,pe);_.generateMipmaps=!1}else if(Be){if(qe){let Q=Je(te);t.texStorage2D(i.TEXTURE_2D,xe,me,Q.width,Q.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,De,te)}else t.texImage2D(i.TEXTURE_2D,0,me,ge,De,te);p(_)&&w(k),fe.__version=le.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Ue(C,_,B){if(_.image.length!==6)return;let k=et(C,_),Z=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);let le=n.get(Z);if(Z.version!==le.__version||k===!0){t.activeTexture(i.TEXTURE0+B);let fe=tt.getPrimaries(tt.workingColorSpace),j=_.colorSpace===si?null:tt.getPrimaries(_.colorSpace),te=_.colorSpace===si||fe===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ge=_.isCompressedTexture||_.image[0].isCompressedTexture,De=_.image[0]&&_.image[0].isDataTexture,me=[];for(let se=0;se<6;se++)!ge&&!De?me[se]=m(_.image[se],!0,s.maxCubemapSize):me[se]=De?_.image[se].image:_.image[se],me[se]=at(_,me[se]);let pe=me[0],Re=r.convert(_.format,_.colorSpace),Be=r.convert(_.type),qe=y(_.internalFormat,Re,Be,_.normalized,_.colorSpace),F=_.isVideoTexture!==!0,xe=le.__version===void 0||k===!0,Q=Z.dataReady,_e=S(_,pe);je(i.TEXTURE_CUBE_MAP,_);let we;if(ge){F&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,qe,pe.width,pe.height);for(let se=0;se<6;se++){we=me[se].mipmaps;for(let Oe=0;Oe<we.length;Oe++){let Le=we[Oe];_.format!==xn?Re!==null?F?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,0,0,Le.width,Le.height,Re,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,qe,Le.width,Le.height,0,Le.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,0,0,Le.width,Le.height,Re,Be,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe,qe,Le.width,Le.height,0,Re,Be,Le.data)}}}else{if(we=_.mipmaps,F&&xe){we.length>0&&_e++;let se=Je(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,qe,se.width,se.height)}for(let se=0;se<6;se++)if(De){F?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,me[se].width,me[se].height,Re,Be,me[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,me[se].width,me[se].height,0,Re,Be,me[se].data);for(let Oe=0;Oe<we.length;Oe++){let vt=we[Oe].image[se].image;F?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,0,0,vt.width,vt.height,Re,Be,vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,qe,vt.width,vt.height,0,Re,Be,vt.data)}}else{F?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Re,Be,me[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,qe,Re,Be,me[se]);for(let Oe=0;Oe<we.length;Oe++){let Le=we[Oe];F?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,0,0,Re,Be,Le.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Oe+1,qe,Re,Be,Le.image[se])}}}p(_)&&w(i.TEXTURE_CUBE_MAP),le.__version=Z.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function be(C,_,B,k,Z,le){let fe=r.convert(B.format,B.colorSpace),j=r.convert(B.type),te=y(B.internalFormat,fe,j,B.normalized,B.colorSpace),ge=n.get(_),De=n.get(B);if(De.__renderTarget=_,!ge.__hasExternalTextures){let me=Math.max(1,_.width>>le),pe=Math.max(1,_.height>>le);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,me,pe,_.depth,0,fe,j,null):t.texImage2D(Z,le,te,me,pe,0,fe,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,Z,De.__webglTexture,0,Ve(_)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,Z,De.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(C,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){let k=_.depthTexture,Z=k&&k.isDepthTexture?k.type:null,le=M(_.stencilBuffer,Z),fe=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve(_),le,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve(_),le,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,le,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,fe,i.RENDERBUFFER,C)}else{let k=_.textures;for(let Z=0;Z<k.length;Z++){let le=k[Z],fe=r.convert(le.format,le.colorSpace),j=r.convert(le.type),te=y(le.internalFormat,fe,j,le.normalized,le.colorSpace);Xe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ve(_),te,_.width,_.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve(_),te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,te,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ot(C,_,B){let k=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Z=n.get(_.depthTexture);if(Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),k){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,_.depthTexture.addEventListener("dispose",E)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),je(i.TEXTURE_CUBE_MAP,_.depthTexture);let ge=r.convert(_.depthTexture.format),De=r.convert(_.depthTexture.type),me;_.depthTexture.format===Fn?me=i.DEPTH_COMPONENT24:_.depthTexture.format===qn&&(me=i.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,me,_.width,_.height,0,ge,De,null)}}else ne(_.depthTexture,0);let le=Z.__webglTexture,fe=Ve(_),j=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,te=_.depthTexture.format===qn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Fn)Xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,le,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,le,0);else if(_.depthTexture.format===qn)Xe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,le,0,fe):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ee(C){let _=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){let k=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),k){let Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,k.removeEventListener("dispose",Z)};k.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=k}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let k=0;k<6;k++)ot(_.__webglFramebuffer[k],C,k);else{let k=C.texture.mipmaps;k&&k.length>0?ot(_.__webglFramebuffer[0],C,0):ot(_.__webglFramebuffer,C,0)}else if(B){_.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[k]),_.__webglDepthbuffer[k]===void 0)_.__webglDepthbuffer[k]=i.createRenderbuffer(),ke(_.__webglDepthbuffer[k],C,!1);else{let Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}else{let k=C.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ke(_.__webglDepthbuffer,C,!1);else{let Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(C,_,B){let k=n.get(C);_!==void 0&&be(k.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&ee(C)}function ae(C){let _=C.texture,B=n.get(C),k=n.get(_);C.addEventListener("dispose",x);let Z=C.textures,le=C.isWebGLCubeRenderTarget===!0,fe=Z.length>1;if(fe||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=_.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let te=0;te<_.mipmaps.length;te++)B.__webglFramebuffer[j][te]=i.createFramebuffer()}else B.__webglFramebuffer[j]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)B.__webglFramebuffer[j]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(fe)for(let j=0,te=Z.length;j<te;j++){let ge=n.get(Z[j]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Xe(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){let te=Z[j];B.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[j]);let ge=r.convert(te.format,te.colorSpace),De=r.convert(te.type),me=y(te.internalFormat,ge,De,te.normalized,te.colorSpace,C.isXRRenderTarget===!0),pe=Ve(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,me,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,B.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(B.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),je(i.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)be(B.__webglFramebuffer[j][te],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,te);else be(B.__webglFramebuffer[j],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(_)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let j=0,te=Z.length;j<te;j++){let ge=Z[j],De=n.get(ge),me=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(me=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,De.__webglTexture),je(me,ge),be(B.__webglFramebuffer,C,ge,i.COLOR_ATTACHMENT0+j,me,0),p(ge)&&w(me)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,k.__webglTexture),je(j,_),_.mipmaps&&_.mipmaps.length>0)for(let te=0;te<_.mipmaps.length;te++)be(B.__webglFramebuffer[te],C,_,i.COLOR_ATTACHMENT0,j,te);else be(B.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,j,0);p(_)&&w(j),t.unbindTexture()}C.depthBuffer&&ee(C)}function oe(C){let _=C.textures;for(let B=0,k=_.length;B<k;B++){let Z=_[B];if(p(Z)){let le=A(C),fe=n.get(Z).__webglTexture;t.bindTexture(le,fe),w(le),t.unbindTexture()}}}let ue=[],ze=[];function Fe(C){if(C.samples>0){if(Xe(C)===!1){let _=C.textures,B=C.width,k=C.height,Z=i.COLOR_BUFFER_BIT,le=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=n.get(C),j=_.length>1;if(j)for(let ge=0;ge<_.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let te=C.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ge=0;ge<_.length;ge++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let De=n.get(_[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,De,0)}i.blitFramebuffer(0,0,B,k,0,0,B,k,Z,i.NEAREST),l===!0&&(ue.length=0,ze.length=0,ue.push(i.COLOR_ATTACHMENT0+ge),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ue.push(le),ze.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ze)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ge=0;ge<_.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let De=n.get(_[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,fe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,De,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Ve(C){return Math.min(s.maxSamples,C.samples)}function Xe(C){let _=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function L(C){let _=a.render.frame;h.get(C)!==_&&(h.set(C,_),C.update())}function at(C,_){let B=C.colorSpace,k=C.format,Z=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==cr&&B!==si&&(tt.getTransfer(B)===ht?(k!==xn||Z!==an)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):We("WebGLTextures: Unsupported texture color space:",B)),_}function Je(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=z,this.getTextureUnits=I,this.setTextureUnits=O,this.setTexture2D=ne,this.setTexture2DArray=H,this.setTexture3D=J,this.setTextureCube=K,this.rebindTextures=re,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=ee,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Xe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function T_(i,e){function t(n,s=si){let r,a=tt.getTransfer(s);if(n===an)return i.UNSIGNED_BYTE;if(n===Fo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Bo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fc)return i.BYTE;if(n===Bc)return i.SHORT;if(n===Ns)return i.UNSIGNED_SHORT;if(n===Uo)return i.INT;if(n===En)return i.UNSIGNED_INT;if(n===on)return i.FLOAT;if(n===Gt)return i.HALF_FLOAT;if(n===kc)return i.ALPHA;if(n===Vc)return i.RGB;if(n===xn)return i.RGBA;if(n===Fn)return i.DEPTH_COMPONENT;if(n===qn)return i.DEPTH_STENCIL;if(n===Us)return i.RED;if(n===Oo)return i.RED_INTEGER;if(n===Ei)return i.RG;if(n===zo)return i.RG_INTEGER;if(n===ko)return i.RGBA_INTEGER;if(n===Xr||n===qr||n===Yr||n===Zr)if(a===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Xr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Xr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vo||n===Go||n===Ho||n===Wo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Go)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ho)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xo||n===qo||n===Yo||n===Zo||n===jo||n===jr||n===Jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xo||n===qo)return a===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Yo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Zo)return r.COMPRESSED_R11_EAC;if(n===jo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===jr)return r.COMPRESSED_RG11_EAC;if(n===Jo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===$o||n===Ko||n===Qo||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl||n===hl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$o)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===el)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===tl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===il)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===al)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ol)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ll)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ul||n===dl||n===fl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ul)return a===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pl||n===ml||n===Jr||n===gl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===pl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ml)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ai?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var A_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,E_=`
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

}`,hh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Rt({vertexShader:A_,fragmentShader:E_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ut(new vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uh=class extends Bn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,v=typeof XRWebGLBinding<"u",m=new hh,p={},w=t.getContextAttributes(),A=null,y=null,M=[],S=[],E=new he,x=null,T=null,R=new tn;R.viewport=new wt;let P=new tn;P.viewport=new wt;let N=[R,P],z=new Eo,I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let $=M[Y];return $===void 0&&($=new Ss,M[Y]=$),$.getTargetRaySpace()},this.getControllerGrip=function(Y){let $=M[Y];return $===void 0&&($=new Ss,M[Y]=$),$.getGripSpace()},this.getHand=function(Y){let $=M[Y];return $===void 0&&($=new Ss,M[Y]=$),$.getHandSpace()};function q(Y){let $=S.indexOf(Y.inputSource);if($===-1)return;let de=M[$];de!==void 0&&(de.update(Y.inputSource,Y.frame,c||a),de.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ne);for(let Y=0;Y<M.length;Y++){let $=S[Y];$!==null&&(S[Y]=null,M[Y].disconnect($))}I=null,O=null,m.reset();for(let Y in p)delete p[Y];if(e.setRenderTarget(A),f=null,u=null,d=null,s=null,y=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(E.width,E.height,!1),T!==null){let Y=T.camera;Y.fov=T.fov,Y.zoom=T.zoom,Y.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ne),w.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ue=null,be=null;w.depth&&(be=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=w.stencil?qn:Fn,Ue=w.stencil?Ai:En);let ke={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ke),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ct(u.textureWidth,u.textureHeight,{format:xn,type:an,depthTexture:new Gn(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let de={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ct(f.framebufferWidth,f.framebufferHeight,{format:xn,type:an,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(Y){for(let $=0;$<Y.removed.length;$++){let de=Y.removed[$],Ue=S.indexOf(de);Ue>=0&&(S[Ue]=null,M[Ue].disconnect(de))}for(let $=0;$<Y.added.length;$++){let de=Y.added[$],Ue=S.indexOf(de);if(Ue===-1){for(let ke=0;ke<M.length;ke++)if(ke>=S.length){S.push(de),Ue=ke;break}else if(S[ke]===null){S[ke]=de,Ue=ke;break}if(Ue===-1)break}let be=M[Ue];be&&be.connect(de)}}let H=new D,J=new D;function K(Y,$,de){H.setFromMatrixPosition($.matrixWorld),J.setFromMatrixPosition(de.matrixWorld);let Ue=H.distanceTo(J),be=$.projectionMatrix.elements,ke=de.projectionMatrix.elements,ot=be[14]/(be[10]-1),ee=be[14]/(be[10]+1),re=(be[9]+1)/be[5],ae=(be[9]-1)/be[5],oe=(be[8]-1)/be[0],ue=(ke[8]+1)/ke[0],ze=ot*oe,Fe=ot*ue,Ve=Ue/(-oe+ue),Xe=Ve*-oe;if($.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Xe),Y.translateZ(Ve),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),be[10]===-1)Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let L=ot+Ve,at=ee+Ve,Je=ze-Xe,C=Fe+(Ue-Xe),_=re*ee/at*L,B=ae*ee/at*L;Y.projectionMatrix.makePerspective(Je,C,_,B,L,at),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Ee(Y,$){$===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices($.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let $=Y.near,de=Y.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(de=m.depthFar)),z.near=P.near=R.near=$,z.far=P.far=R.far=de,(I!==z.near||O!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),I=z.near,O=z.far),z.layers.mask=Y.layers.mask|6,R.layers.mask=z.layers.mask&-5,P.layers.mask=z.layers.mask&-3;let Ue=Y.parent,be=z.cameras;Ee(z,Ue);for(let ke=0;ke<be.length;ke++)Ee(be[ke],Ue);be.length===2?K(z,R,P):z.projectionMatrix.copy(R.projectionMatrix),T===null&&Y.isPerspectiveCamera&&(T={camera:Y,fov:Y.fov,zoom:Y.zoom}),Te(Y,z,Ue)};function Te(Y,$,de){de===null?Y.matrix.copy($.matrixWorld):(Y.matrix.copy(de.matrixWorld),Y.matrix.invert(),Y.matrix.multiply($.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy($.projectionMatrix),Y.projectionMatrixInverse.copy($.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ys*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(Y){return p[Y]};let rt=null;function je(Y,$){if(h=$.getViewerPose(c||a),g=$,h!==null){let de=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ue=!1;de.length!==z.cameras.length&&(z.cameras.length=0,Ue=!0);for(let ee=0;ee<de.length;ee++){let re=de[ee],ae=null;if(f!==null)ae=f.getViewport(re);else{let ue=d.getViewSubImage(u,re);ae=ue.viewport,ee===0&&(e.setRenderTargetTextures(y,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(y))}let oe=N[ee];oe===void 0&&(oe=new tn,oe.layers.enable(ee),oe.viewport=new wt,N[ee]=oe),oe.matrix.fromArray(re.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(re.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ae.x,ae.y,ae.width,ae.height),ee===0&&(z.matrix.copy(oe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ue===!0&&z.cameras.push(oe)}let be=s.enabledFeatures;if(be&&be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let ee=d.getDepthInformation(de[0]);ee&&ee.isValid&&ee.texture&&m.init(ee,s.renderState)}if(be&&be.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let ee=0;ee<de.length;ee++){let re=de[ee].camera;if(re){let ae=p[re];ae||(ae=new xr,p[re]=ae);let oe=d.getCameraImage(re);ae.sourceTexture=oe}}}}for(let de=0;de<M.length;de++){let Ue=S[de],be=M[de];Ue!==null&&be!==void 0&&be.update(Ue,$,c||a)}rt&&rt(Y,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let et=new Cd;et.setAnimationLoop(je),this.setAnimationLoop=function(Y){rt=Y},this.dispose=function(){}}},C_=new pt,Nd=new Ye;Nd.set(-1,0,0,0,1,0,0,0,1);function R_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Yc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,A,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let w=e.get(p),A=w.envMap,y=w.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(C_.makeRotationFromEuler(y)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Nd),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=A*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function P_(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){let S=M.program;n.uniformBlockBinding(y,S)}function c(y,M){let S=s[y.id];S===void 0&&(m(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",w));let E=M.program;n.updateUBOMapping(y,E);let x=e.render.frame;r[y.id]!==x&&(u(y),r[y.id]=x)}function h(y){let M=d();y.__bindingPointIndex=M;let S=i.createBuffer(),E=y.__size,x=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,E,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let M=s[y.id],S=y.uniforms,E=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,T=S.length;x<T;x++){let R=S[x];if(Array.isArray(R))for(let P=0,N=R.length;P<N;P++)f(R[P],x,P,E);else f(R,x,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,M,S,E){if(v(y,M,S,E)===!0){let x=y.__offset,T=y.value;if(Array.isArray(T)){let R=0;for(let P=0;P<T.length;P++){let N=T[P],z=p(N);g(N,y.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,y.__data)}}function g(y,M,S){typeof y=="number"||typeof y=="boolean"?M[0]=y:y.isMatrix3?(M[0]=y.elements[0],M[1]=y.elements[1],M[2]=y.elements[2],M[3]=0,M[4]=y.elements[3],M[5]=y.elements[4],M[6]=y.elements[5],M[7]=0,M[8]=y.elements[6],M[9]=y.elements[7],M[10]=y.elements[8],M[11]=0):ArrayBuffer.isView(y)?M.set(new y.constructor(y.buffer,y.byteOffset,M.length)):y.toArray(M,S)}function v(y,M,S,E){let x=y.value,T=M+"_"+S;if(E[T]===void 0)return typeof x=="number"||typeof x=="boolean"?E[T]=x:ArrayBuffer.isView(x)?E[T]=x.slice():E[T]=x.clone(),!0;{let R=E[T];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return E[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(y){let M=y.uniforms,S=0,E=16;for(let T=0,R=M.length;T<R;T++){let P=Array.isArray(M[T])?M[T]:[M[T]];for(let N=0,z=P.length;N<z;N++){let I=P[N],O=Array.isArray(I.value)?I.value:[I.value];for(let q=0,W=O.length;q<W;q++){let ne=O[q],H=p(ne),J=S%E,K=J%H.boundary,Ee=J+K;S+=K,Ee!==0&&E-Ee<H.storage&&(S+=E-Ee),I.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=H.storage}}}let x=S%E;return x>0&&(S+=E-x),y.__size=S,y.__cache={},this}function p(y){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",y),M}function w(y){let M=y.target;M.removeEventListener("dispose",w);let S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function A(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:A}}var I_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yn=null;function L_(){return Yn===null&&(Yn=new Vi(I_,16,16,Ei,Gt),Yn.name="DFG_LUT",Yn.minFilter=Xt,Yn.magFilter=Xt,Yn.wrapS=Un,Yn.wrapT=Un,Yn.generateMipmaps=!1,Yn.needsUpdate=!0),Yn}var Sl=class{constructor(e={}){let{canvas:t=Ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=an}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=f,m=new Set([ko,zo,Oo]),p=new Set([an,En,Ns,Ai,Fo,Bo]),w=new Uint32Array(4),A=new Int32Array(4),y=new D,M=null,S=null,E=[],x=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,N=null,z=null,I=null,O=null;this._outputColorSpace=zt;let q=0,W=0,ne=null,H=-1,J=null,K=new wt,Ee=new wt,Te=null,rt=new Ze(0),je=0,et=t.width,Y=t.height,$=1,de=null,Ue=null,be=new wt(0,0,et,Y),ke=new wt(0,0,et,Y),ot=!1,ee=new ws,re=!1,ae=!1,oe=new pt,ue=new D,ze=new wt,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ve=!1;function Xe(){return ne===null?$:1}let L=n;function at(b,U){return t.getContext(b,U)}let Je,C,_,B,k,Z,le,fe,j,te,ge,De,me,pe,Re,Be,qe,F,xe,Q,_e,we,se;try{let b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",vt,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",yn,!1),L===null){let U="webgl2";if(L=at(U,b),L===null)throw at(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(b){throw t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),We("WebGLRenderer: "+b.message),b}function Oe(){Je=new z0(L),Je.init(),_e=new T_(L,Je),C=new R0(L,Je,e,_e),_=new b_(L,Je),C.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),z=L.createFramebuffer(),I=L.createFramebuffer(),O=L.createFramebuffer(),B=new G0(L),k=new c_,Z=new w_(L,Je,_,k,C,_e,B),le=new O0(R),fe=new Wp(L),we=new E0(L,fe),j=new k0(L,fe,B,we),te=new W0(L,j,fe,we,B),F=new H0(L,C,Z),Re=new P0(k),ge=new l_(R,le,Je,C,we,Re),De=new R_(R,k),me=new u_,pe=new x_(Je),qe=new A0(R,le,_,te,g,l),Be=new S_(R,te,C),se=new P_(L,B,C,_),xe=new C0(L,Je,B),Q=new V0(L,Je,B),B.programs=ge.programs,R.capabilities=C,R.extensions=Je,R.properties=k,R.renderLists=me,R.shadowMap=Be,R.state=_,R.info=B}v!==an&&(T=new q0(v,t.width,t.height,o,s,r));let Le=new uh(R,L);this.xr=Le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let b=Je.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=Je.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(et,Y,!1))},this.getSize=function(b){return b.set(et,Y)},this.setSize=function(b,U,X=!0){if(Le.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}et=b,Y=U,t.width=Math.floor(b*$),t.height=Math.floor(U*$),X===!0&&(t.style.width=b+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(et*$,Y*$).floor()},this.setDrawingBufferSize=function(b,U,X){et=b,Y=U,$=X,t.width=Math.floor(b*X),t.height=Math.floor(U*X),this.setViewport(0,0,b,U)},this.setEffects=function(b){if(v===an){We("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let U=0;U<b.length;U++)if(b[U].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(K)},this.getViewport=function(b){return b.copy(be)},this.setViewport=function(b,U,X,V){b.isVector4?be.set(b.x,b.y,b.z,b.w):be.set(b,U,X,V),_.viewport(K.copy(be).multiplyScalar($).round())},this.getScissor=function(b){return b.copy(ke)},this.setScissor=function(b,U,X,V){b.isVector4?ke.set(b.x,b.y,b.z,b.w):ke.set(b,U,X,V),_.scissor(Ee.copy(ke).multiplyScalar($).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(b){_.setScissorTest(ot=b)},this.setOpaqueSort=function(b){de=b},this.setTransparentSort=function(b){Ue=b},this.getClearColor=function(b){return b.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,X=!0){let V=0;if(b){let G=!1;if(ne!==null){let Me=ne.texture.format;G=m.has(Me)}if(G){let Me=ne.texture.type,Ce=p.has(Me),ye=qe.getClearColor(),Pe=qe.getClearAlpha(),Ne=ye.r,Ke=ye.g,it=ye.b;Ce?(w[0]=Ne,w[1]=Ke,w[2]=it,w[3]=Pe,L.clearBufferuiv(L.COLOR,0,w)):(A[0]=Ne,A[1]=Ke,A[2]=it,A[3]=Pe,L.clearBufferiv(L.COLOR,0,A))}else V|=L.COLOR_BUFFER_BIT}U&&(V|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),N=b},this.dispose=function(){t.removeEventListener("webglcontextlost",vt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),qe.dispose(),me.dispose(),pe.dispose(),k.dispose(),le.dispose(),te.dispose(),we.dispose(),se.dispose(),ge.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Sh),Le.removeEventListener("sessionend",bh),Di.stop()};function vt(b){b.preventDefault(),Hc("WebGLRenderer: Context Lost."),P=!0}function dt(){Hc("WebGLRenderer: Context Restored."),P=!1;let b=B.autoReset,U=Be.enabled,X=Be.autoUpdate,V=Be.needsUpdate,G=Be.type;Oe(),B.autoReset=b,Be.enabled=U,Be.autoUpdate=X,Be.needsUpdate=V,Be.type=G}function yn(b){We("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Pn(b){let U=b.target;U.removeEventListener("dispose",Pn),Kd(U)}function Kd(b){Qd(b),k.remove(b)}function Qd(b){let U=k.get(b).programs;U!==void 0&&(U.forEach(function(X){ge.releaseProgram(X)}),b.isShaderMaterial&&ge.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,X,V,G,Me){U===null&&(U=Fe);let Ce=G.isMesh&&G.matrixWorld.determinantAffine()<0,ye=nf(b,U,X,V,G);_.setMaterial(V,Ce);let Pe=X.index,Ne=1;if(V.wireframe===!0){if(Pe=j.getWireframeAttribute(X),Pe===void 0)return;Ne=2}let Ke=X.drawRange,it=X.attributes.position,Ie=Ke.start*Ne,ft=(Ke.start+Ke.count)*Ne;Me!==null&&(Ie=Math.max(Ie,Me.start*Ne),ft=Math.min(ft,(Me.start+Me.count)*Ne)),Pe!==null?(Ie=Math.max(Ie,0),ft=Math.min(ft,Pe.count)):it!=null&&(Ie=Math.max(Ie,0),ft=Math.min(ft,it.count));let It=ft-Ie;if(It<0||It===1/0)return;we.setup(G,V,ye,X,Pe);let Mt,xt=xe;if(Pe!==null&&(Mt=fe.get(Pe),xt=Q,xt.setIndex(Mt)),G.isMesh)V.wireframe===!0?(_.setLineWidth(V.wireframeLinewidth*Xe()),xt.setMode(L.LINES)):xt.setMode(L.TRIANGLES);else if(G.isLine){let jt=V.linewidth;jt===void 0&&(jt=1),_.setLineWidth(jt*Xe()),G.isLineSegments?xt.setMode(L.LINES):G.isLineLoop?xt.setMode(L.LINE_LOOP):xt.setMode(L.LINE_STRIP)}else G.isPoints?xt.setMode(L.POINTS):G.isSprite&&xt.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(Je.get("WEBGL_multi_draw"))xt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let jt=G._multiDrawStarts,Ae=G._multiDrawCounts,Qt=G._multiDrawCount,lt=Pe?fe.get(Pe).bytesPerElement:1,pn=k.get(V).currentProgram.getUniforms();for(let In=0;In<Qt;In++)pn.setValue(L,"_gl_DrawID",In),xt.render(jt[In]/lt,Ae[In])}else if(G.isInstancedMesh)xt.renderInstances(Ie,It,G.count);else if(X.isInstancedBufferGeometry){let jt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,jt);xt.renderInstances(Ie,It,Ae)}else xt.render(Ie,It)};function Mh(b,U,X,V){N!==null&&b.isNodeMaterial&&N.setObject(V,b),re===!0&&Re.setState(b,X,!1),b.transparent===!0&&b.side===Wn&&b.forceSinglePass===!1?(b.side=qt,b.needsUpdate=!0,ya(b,U,V),b.side=bi,b.needsUpdate=!0,ya(b,U,V),b.side=Wn):ya(b,U,V)}this.compile=function(b,U,X=null){X===null&&(X=b),N!==null&&N.renderStart(b,U,X),S=pe.get(X),S.init(U),x.push(S),X.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),b!==X&&b.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights(),N!==null&&N.updateLights(S.state.lightsArray),ae=this.localClippingEnabled,re=Re.init(this.clippingPlanes,ae),re===!0&&Re.setGlobalState(this.clippingPlanes,U),N!==null&&Be.render(S.state.shadowsArray,X,U);let V=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let Me=G.material;if(Me)if(Array.isArray(Me))for(let Ce=0;Ce<Me.length;Ce++){let ye=Me[Ce];Mh(ye,X,U,G),V.add(ye)}else Mh(Me,X,U,G),V.add(Me)}),S=x.pop(),N!==null&&N.renderEnd(),V},this.compileAsync=function(b,U,X=null){let V=this.compile(b,U,X);return new Promise(G=>{function Me(){if(V.forEach(function(Ce){let Pe=k.get(Ce).currentProgram;(Pe===void 0||Pe.isReady())&&V.delete(Ce)}),V.size===0){G(b);return}setTimeout(Me,10)}Je.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Vl=null;function ef(b){Vl&&Vl(b)}function Sh(){Di.stop()}function bh(){Di.start()}let Di=new Cd;Di.setAnimationLoop(ef),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(b){Vl=b,Le.setAnimationLoop(b),b===null?Di.stop():Di.start()},Le.addEventListener("sessionstart",Sh),Le.addEventListener("sessionend",bh),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(b,U);let X=Le.enabled===!0&&Le.isPresenting===!0,V=T!==null&&(ne===null||X)&&T.begin(R,ne);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(U),U=Le.getCamera()),b.isScene===!0&&b.onBeforeRender(R,b,U,ne),S=pe.get(b,x.length),S.init(U),S.state.textureUnits=Z.getTextureUnits(),x.push(S),oe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ee.setFromProjectionMatrix(oe,Tn,U.reversedDepth),ae=this.localClippingEnabled,re=Re.init(this.clippingPlanes,ae),M=me.get(b,E.length),M.init(),E.push(M),Le.enabled===!0&&Le.isPresenting===!0){let Ce=R.xr.getDepthSensingMesh();Ce!==null&&Gl(Ce,U,-1/0,R.sortObjects)}Gl(b,U,0,R.sortObjects),M.finish(),N!==null&&N.updateLights(S.state.lightsArray),R.sortObjects===!0&&M.sort(de,Ue),Ve=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,Ve&&qe.addToRenderList(M,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),re===!0&&Re.beginShadows();let G=S.state.shadowsArray;if(Be.render(G,b,U),re===!0&&Re.endShadows(),(V&&T.hasRenderPass())===!1){let Ce=M.opaque,ye=M.transmissive;if(S.setupLights(),U.isArrayCamera){let Pe=U.cameras;if(ye.length>0)for(let Ne=0,Ke=Pe.length;Ne<Ke;Ne++){let it=Pe[Ne];Th(Ce,ye,b,it)}Ve&&qe.render(b);for(let Ne=0,Ke=Pe.length;Ne<Ke;Ne++){let it=Pe[Ne];wh(M,b,it,it.viewport)}}else ye.length>0&&Th(Ce,ye,b,U),Ve&&qe.render(b),wh(M,b,U)}ne!==null&&W===0&&(Z.updateMultisampleRenderTarget(ne),Z.updateRenderTargetMipmap(ne)),V&&T.end(R),b.isScene===!0&&b.onAfterRender(R,b,U),we.resetDefaultState(),H=-1,J=null,x.pop(),x.length>0?(S=x[x.length-1],Z.setTextureUnits(S.state.textureUnits),re===!0&&Re.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?M=E[E.length-1]:M=null,N!==null&&N.renderEnd()};function Gl(b,U,X,V){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)X=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(ee)){V&&ze.setFromMatrixPosition(b.matrixWorld).applyMatrix4(oe);let Ce=te.update(b),ye=b.material;ye.visible&&M.push(b,Ce,ye,X,ze.z,null,U)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(ee))){let Ce=te.update(b),ye=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ze.copy(b.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),ze.copy(Ce.boundingSphere.center)),ze.applyMatrix4(b.matrixWorld).applyMatrix4(oe)),Array.isArray(ye)){let Pe=Ce.groups;for(let Ne=0,Ke=Pe.length;Ne<Ke;Ne++){let it=Pe[Ne],Ie=ye[it.materialIndex];Ie&&Ie.visible&&M.push(b,Ce,Ie,X,ze.z,it,U)}}else ye.visible&&M.push(b,Ce,ye,X,ze.z,null,U)}}let Me=b.children;for(let Ce=0,ye=Me.length;Ce<ye;Ce++)Gl(Me[Ce],U,X,V)}function wh(b,U,X,V){let{opaque:G,transmissive:Me,transparent:Ce}=b;S.setupLightsView(X),re===!0&&Re.setGlobalState(R.clippingPlanes,X),V&&_.viewport(K.copy(V)),G.length>0&&va(G,U,X),Me.length>0&&va(Me,U,X),Ce.length>0&&va(Ce,U,X),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Th(b,U,X,V){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[V.id]===void 0){let Ie=Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[V.id]=new Ct(1,1,{generateMipmaps:!0,type:Ie?Gt:an,minFilter:Ti,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}let Me=S.state.transmissionRenderTarget[V.id],Ce=V.viewport||K;Me.setSize(Ce.z*R.transmissionResolutionScale,Ce.w*R.transmissionResolutionScale);let ye=R.getRenderTarget(),Pe=R.getActiveCubeFace(),Ne=R.getActiveMipmapLevel();R.setRenderTarget(Me),R.getClearColor(rt),je=R.getClearAlpha(),je<1&&R.setClearColor(16777215,.5),R.clear(),Ve&&qe.render(X);let Ke=R.toneMapping;R.toneMapping=An;let it=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),S.setupLightsView(V),re===!0&&Re.setGlobalState(R.clippingPlanes,V),va(b,X,V),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),Je.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ft=0,It=U.length;ft<It;ft++){let Mt=U[ft],{object:xt,geometry:jt,material:Ae,group:Qt}=Mt;if(Ae.side===Wn&&xt.layers.test(V.layers)){let lt=Ae.side;Ae.side=qt,Ae.needsUpdate=!0,Ah(xt,X,V,jt,Ae,Qt),Ae.side=lt,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}R.setRenderTarget(ye,Pe,Ne),R.setClearColor(rt,je),it!==void 0&&(V.viewport=it),R.toneMapping=Ke}function va(b,U,X){let V=U.isScene===!0?U.overrideMaterial:null;for(let G=0,Me=b.length;G<Me;G++){let Ce=b[G],{object:ye,geometry:Pe,group:Ne}=Ce,Ke=Ce.material;Ke.allowOverride===!0&&V!==null&&(Ke=V),ye.layers.test(X.layers)&&Ah(ye,U,X,Pe,Ke,Ne)}}function Ah(b,U,X,V,G,Me){N!==null&&G.isNodeMaterial&&N.setObject(b,G),b.onBeforeRender(R,U,X,V,G,Me),b.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(R,U,X,V,b,Me),G.transparent===!0&&G.side===Wn&&G.forceSinglePass===!1?(G.side=qt,G.needsUpdate=!0,R.renderBufferDirect(X,U,V,G,b,Me),G.side=bi,G.needsUpdate=!0,R.renderBufferDirect(X,U,V,G,b,Me),G.side=Wn):R.renderBufferDirect(X,U,V,G,b,Me),b.onAfterRender(R,U,X,V,G,Me)}function ya(b,U,X){U.isScene!==!0&&(U=Fe);let V=k.get(b),G=S.state.lights,Me=S.state.shadowsArray,Ce=G.state.version,ye=ge.getParameters(b,G.state,Me,U,X,S.state.lightProbeGridArray),Pe=ge.getProgramCacheKey(ye),Ne=V.programs;V.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?U.environment:null,V.fog=U.fog;let Ke=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;V.envMap=le.get(b.envMap||V.environment,Ke),V.envMapRotation=V.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Ne===void 0&&(b.addEventListener("dispose",Pn),Ne=new Map,V.programs=Ne);let it=Ne.get(Pe);if(it!==void 0){if(V.currentProgram===it&&V.lightsStateVersion===Ce)return Ch(b,ye),it}else ye.uniforms=ge.getUniforms(b),N!==null&&b.isNodeMaterial&&N.build(b,X,ye),b.onBeforeCompile(ye,R),it=ge.acquireProgram(ye,Pe),Ne.set(Pe,it),V.uniforms=ye.uniforms;let Ie=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ie.clippingPlanes=Re.uniform),Ch(b,ye),V.needsLights=rf(b),V.lightsStateVersion=Ce,V.needsLights&&(Ie.ambientLightColor.value=G.state.ambient,Ie.lightProbe.value=G.state.probe,Ie.sunLights.value=G.state.sun,Ie.sunLightShadows.value=G.state.sunShadow,Ie.directionalLights.value=G.state.directional,Ie.directionalLightShadows.value=G.state.directionalShadow,Ie.spotLights.value=G.state.spot,Ie.spotLightShadows.value=G.state.spotShadow,Ie.rectAreaLights.value=G.state.rectArea,Ie.ltc_1.value=G.state.rectAreaLTC1,Ie.ltc_2.value=G.state.rectAreaLTC2,Ie.pointLights.value=G.state.point,Ie.pointLightShadows.value=G.state.pointShadow,Ie.hemisphereLights.value=G.state.hemi,Ie.sunShadowMatrix.value=G.state.sunShadowMatrix,Ie.sunShadowCascade.value=G.state.sunShadowCascade,Ie.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ie.spotLightMatrix.value=G.state.spotLightMatrix,Ie.spotLightMap.value=G.state.spotLightMap,Ie.pointShadowMatrix.value=G.state.pointShadowMatrix),V.lightProbeGrid=S.state.lightProbeGridArray.length>0,V.currentProgram=it,V.uniformsList=null,it}function Eh(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=zs.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Ch(b,U){let X=k.get(b);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function tf(b,U){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(U.matrixWorld);for(let X=0,V=b.length;X<V;X++){let G=b[X];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function nf(b,U,X,V,G){U.isScene!==!0&&(U=Fe),Z.resetTextureUnits();let Me=U.fog,Ce=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?U.environment:null,ye=ne===null?R.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:tt.workingColorSpace,Pe=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ne=le.get(V.envMap||Ce,Pe),Ke=V.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,it=!!X.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ie=!!X.morphAttributes.position,ft=!!X.morphAttributes.normal,It=!!X.morphAttributes.color,Mt=An;V.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Mt=R.toneMapping);let xt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,jt=xt!==void 0?xt.length:0,Ae=k.get(V),Qt=S.state.lights;if(re===!0&&(ae===!0||b!==J)){let yt=b===J&&V.id===H;Re.setState(V,b,yt)}let lt=!1;V.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Qt.state.version||Ae.outputColorSpace!==ye||G.isBatchedMesh&&Ae.batching===!1||!G.isBatchedMesh&&Ae.batching===!0||G.isBatchedMesh&&Ae.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&Ae.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&Ae.instancing===!1||!G.isInstancedMesh&&Ae.instancing===!0||G.isSkinnedMesh&&Ae.skinning===!1||!G.isSkinnedMesh&&Ae.skinning===!0||G.isInstancedMesh&&Ae.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ae.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ae.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ae.instancingMorph===!1&&G.morphTexture!==null||Ae.envMap!==Ne||V.fog===!0&&Ae.fog!==Me||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==Re.numPlanes||Ae.numIntersection!==Re.numIntersection)||Ae.vertexAlphas!==Ke||Ae.vertexTangents!==it||Ae.morphTargets!==Ie||Ae.morphNormals!==ft||Ae.morphColors!==It||Ae.toneMapping!==Mt||Ae.morphTargetsCount!==jt||!!Ae.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(lt=!0):(lt=!0,Ae.__version=V.version);let pn=Ae.currentProgram;lt===!0&&(pn=ya(V,U,G),N&&V.isNodeMaterial&&N.onUpdateProgram(V,pn,Ae));let In=!1,oi=!1,Ki=!1,gt=pn.getUniforms(),At=Ae.uniforms;if(_.useProgram(pn.program)&&(In=!0,oi=!0,Ki=!0),V.id!==H&&(H=V.id,oi=!0),Ae.needsLights){let yt=tf(S.state.lightProbeGridArray,G);Ae.lightProbeGrid!==yt&&(Ae.lightProbeGrid=yt,oi=!0)}if(In||J!==b){_.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),gt.setValue(L,"projectionMatrix",b.projectionMatrix),gt.setValue(L,"viewMatrix",b.matrixWorldInverse);let ci=gt.map.cameraPosition;ci!==void 0&&ci.setValue(L,ue.setFromMatrixPosition(b.matrixWorld)),C.logarithmicDepthBuffer&&gt.setValue(L,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&gt.setValue(L,"isOrthographic",b.isOrthographicCamera===!0),J!==b&&(J=b,oi=!0,Ki=!0)}if(Ae.needsLights&&(Qt.state.sunShadowMap.length>0&&gt.setValue(L,"sunShadowMap",Qt.state.sunShadowMap,Z),Qt.state.directionalShadowMap.length>0&&gt.setValue(L,"directionalShadowMap",Qt.state.directionalShadowMap,Z),Qt.state.spotShadowMap.length>0&&gt.setValue(L,"spotShadowMap",Qt.state.spotShadowMap,Z),Qt.state.pointShadowMap.length>0&&gt.setValue(L,"pointShadowMap",Qt.state.pointShadowMap,Z)),G.isSkinnedMesh){gt.setOptional(L,G,"bindMatrix"),gt.setOptional(L,G,"bindMatrixInverse");let yt=G.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),gt.setValue(L,"boneTexture",yt.boneTexture,Z))}G.isBatchedMesh&&(gt.setOptional(L,G,"batchingTexture"),gt.setValue(L,"batchingTexture",G._matricesTexture,Z),gt.setOptional(L,G,"batchingIdTexture"),gt.setValue(L,"batchingIdTexture",G._indirectTexture,Z),gt.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&gt.setValue(L,"batchingColorTexture",G._colorsTexture,Z));let li=X.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&F.update(G,X,pn),(oi||Ae.receiveShadow!==G.receiveShadow)&&(Ae.receiveShadow=G.receiveShadow,gt.setValue(L,"receiveShadow",G.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&U.environment!==null&&(At.envMapIntensity.value=U.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=L_()),oi){if(gt.setValue(L,"toneMappingExposure",R.toneMappingExposure),Ae.needsLights&&sf(At,Ki),Me&&V.fog===!0&&De.refreshFogUniforms(At,Me),De.refreshMaterialUniforms(At,V,$,Y,S.state.transmissionRenderTarget[b.id]),Ae.needsLights&&Ae.lightProbeGrid){let yt=Ae.lightProbeGrid;At.probesSH.value=yt.texture,At.probesMin.value.copy(yt.boundingBox.min),At.probesMax.value.copy(yt.boundingBox.max),At.probesResolution.value.copy(yt.resolution)}zs.upload(L,Eh(Ae),At,Z)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(zs.upload(L,Eh(Ae),At,Z),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&gt.setValue(L,"center",G.center),gt.setValue(L,"modelViewMatrix",G.modelViewMatrix),gt.setValue(L,"normalMatrix",G.normalMatrix),gt.setValue(L,"modelMatrix",G.matrixWorld),V.uniformsGroups!==void 0){let yt=V.uniformsGroups;for(let ci=0,Qi=yt.length;ci<Qi;ci++){let Ph=yt[ci];se.update(Ph,pn),se.bind(Ph,pn)}}return pn}function sf(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.sunLights.needsUpdate=U,b.sunLightShadows.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function rf(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(b,U,X){let V=k.get(b);V.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),k.get(b.texture).__webglTexture=U,k.get(b.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:X,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){let X=k.get(b);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,X=0){ne=b,q=U,W=X;let V=null,G=!1,Me=!1;if(b){let ye=k.get(b);if(ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(L.FRAMEBUFFER,ye.__webglFramebuffer),K.copy(b.viewport),Ee.copy(b.scissor),Te=b.scissorTest,_.viewport(K),_.scissor(Ee),_.setScissorTest(Te),H=-1;return}else if(ye.__webglFramebuffer===void 0)Z.setupRenderTarget(b);else if(ye.__hasExternalTextures)Z.rebindTextures(b,k.get(b.texture).__webglTexture,k.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ke=b.depthTexture;if(ye.__boundDepthTexture!==Ke){if(Ke!==null&&k.has(Ke)&&(b.width!==Ke.image.width||b.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(b)}}let Pe=b.texture;(Pe.isData3DTexture||Pe.isDataArrayTexture||Pe.isCompressedArrayTexture)&&(Me=!0);let Ne=k.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?V=Ne[U][X]:V=Ne[U],G=!0):b.samples>0&&Z.useMultisampledRTT(b)===!1?V=k.get(b).__webglMultisampledFramebuffer:Array.isArray(Ne)?V=Ne[X]:V=Ne,K.copy(b.viewport),Ee.copy(b.scissor),Te=b.scissorTest}else K.copy(be).multiplyScalar($).floor(),Ee.copy(ke).multiplyScalar($).floor(),Te=ot;if(X!==0&&(V=z),_.bindFramebuffer(L.FRAMEBUFFER,V)&&_.drawBuffers(b,V),_.viewport(K),_.scissor(Ee),_.setScissorTest(Te),G){let ye=k.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+U,ye.__webglTexture,X)}else if(Me){let ye=U;for(let Pe=0;Pe<b.textures.length;Pe++){let Ne=k.get(b.textures[Pe]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Pe,Ne.__webglTexture,X,ye)}}else if(b!==null&&X!==0){let ye=k.get(b.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ye.__webglTexture,X)}H=-1};function Rh(b){let U=k.get(b);return(U.__readFormat!==b.format||U.__readType!==b.type)&&(U.__readFormat=b.format,U.__readType=b.type,U.__formatReadable=C.textureFormatReadable(b.format),U.__typeReadable=C.textureTypeReadable(b.type)),U}this.readRenderTargetPixels=function(b,U,X,V,G,Me,Ce,ye=0){if(!(b&&b.isWebGLRenderTarget)){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=k.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe){_.bindFramebuffer(L.FRAMEBUFFER,Pe);try{let Ne=b.textures[ye],Ke=Ne.format,it=Ne.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);let Ie=Rh(Ne);if(Ie.__formatReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ie.__typeReadable===!1){We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-V&&X>=0&&X<=b.height-G&&L.readPixels(U,X,V,G,_e.convert(Ke),_e.convert(it),Me)}finally{let Ne=ne!==null?k.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(b,U,X,V,G,Me,Ce,ye=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pe=k.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Pe=Pe[Ce]),Pe)if(U>=0&&U<=b.width-V&&X>=0&&X<=b.height-G){_.bindFramebuffer(L.FRAMEBUFFER,Pe);let Ne=b.textures[ye],Ke=Ne.format,it=Ne.type;b.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ye);let Ie=Rh(Ne);if(Ie.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ie.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ft=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ft),L.bufferData(L.PIXEL_PACK_BUFFER,Me.byteLength,L.STREAM_READ),L.readPixels(U,X,V,G,_e.convert(Ke),_e.convert(it),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let It=ne!==null?k.get(ne).__webglFramebuffer:null;_.bindFramebuffer(L.FRAMEBUFFER,It);let Mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ku(L,Mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ft),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Me),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(ft),L.deleteSync(Mt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,X=0){let V=Math.pow(2,-X),G=Math.floor(b.image.width*V),Me=Math.floor(b.image.height*V),Ce=U!==null?U.x:0,ye=U!==null?U.y:0;Z.setTexture2D(b,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Ce,ye,G,Me),_.unbindTexture()},this.copyTextureToTexture=function(b,U,X=null,V=null,G=0,Me=0){let Ce,ye,Pe,Ne,Ke,it,Ie,ft,It,Mt=b.isCompressedTexture?b.mipmaps[Me]:b.image;if(X!==null)Ce=X.max.x-X.min.x,ye=X.max.y-X.min.y,Pe=X.isBox3?X.max.z-X.min.z:1,Ne=X.min.x,Ke=X.min.y,it=X.isBox3?X.min.z:0;else{let At=Math.pow(2,-G);Ce=Math.floor(Mt.width*At),ye=Math.floor(Mt.height*At),b.isDataArrayTexture?Pe=Mt.depth:b.isData3DTexture?Pe=Math.floor(Mt.depth*At):Pe=1,Ne=0,Ke=0,it=0}V!==null?(Ie=V.x,ft=V.y,It=V.z):(Ie=0,ft=0,It=0);let xt=_e.convert(U.format),jt=_e.convert(U.type),Ae;U.isData3DTexture?(Z.setTexture3D(U,0),Ae=L.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Z.setTexture2DArray(U,0),Ae=L.TEXTURE_2D_ARRAY):(Z.setTexture2D(U,0),Ae=L.TEXTURE_2D),_.activeTexture(L.TEXTURE0),_.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,U.flipY),_.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),_.pixelStorei(L.UNPACK_ALIGNMENT,U.unpackAlignment);let Qt=_.getParameter(L.UNPACK_ROW_LENGTH),lt=_.getParameter(L.UNPACK_IMAGE_HEIGHT),pn=_.getParameter(L.UNPACK_SKIP_PIXELS),In=_.getParameter(L.UNPACK_SKIP_ROWS),oi=_.getParameter(L.UNPACK_SKIP_IMAGES);_.pixelStorei(L.UNPACK_ROW_LENGTH,Mt.width),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Mt.height),_.pixelStorei(L.UNPACK_SKIP_PIXELS,Ne),_.pixelStorei(L.UNPACK_SKIP_ROWS,Ke),_.pixelStorei(L.UNPACK_SKIP_IMAGES,it);let Ki=b.isDataArrayTexture||b.isData3DTexture,gt=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){let At=k.get(b),li=k.get(U),yt=k.get(At.__renderTarget),ci=k.get(li.__renderTarget);_.bindFramebuffer(L.READ_FRAMEBUFFER,yt.__webglFramebuffer),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let Qi=0;Qi<Pe;Qi++)Ki&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(b).__webglTexture,G,it+Qi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,k.get(U).__webglTexture,Me,It+Qi)),L.blitFramebuffer(Ne,Ke,Ce,ye,Ie,ft,Ce,ye,L.DEPTH_BUFFER_BIT,L.NEAREST);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||b.isRenderTargetTexture||k.has(b)){let At=k.get(b),li=k.get(U);_.bindFramebuffer(L.READ_FRAMEBUFFER,I),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,O);for(let yt=0;yt<Pe;yt++)Ki?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,At.__webglTexture,G,it+yt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,At.__webglTexture,G),gt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,li.__webglTexture,Me,It+yt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,li.__webglTexture,Me),G!==0?L.blitFramebuffer(Ne,Ke,Ce,ye,Ie,ft,Ce,ye,L.COLOR_BUFFER_BIT,L.NEAREST):gt?L.copyTexSubImage3D(Ae,Me,Ie,ft,It+yt,Ne,Ke,Ce,ye):L.copyTexSubImage2D(Ae,Me,Ie,ft,Ne,Ke,Ce,ye);_.bindFramebuffer(L.READ_FRAMEBUFFER,null),_.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else gt?b.isDataTexture||b.isData3DTexture?L.texSubImage3D(Ae,Me,Ie,ft,It,Ce,ye,Pe,xt,jt,Mt.data):U.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,Me,Ie,ft,It,Ce,ye,Pe,xt,Mt.data):L.texSubImage3D(Ae,Me,Ie,ft,It,Ce,ye,Pe,xt,jt,Mt):b.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Me,Ie,ft,Ce,ye,xt,jt,Mt.data):b.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Me,Ie,ft,Mt.width,Mt.height,xt,Mt.data):L.texSubImage2D(L.TEXTURE_2D,Me,Ie,ft,Ce,ye,xt,jt,Mt);_.pixelStorei(L.UNPACK_ROW_LENGTH,Qt),_.pixelStorei(L.UNPACK_IMAGE_HEIGHT,lt),_.pixelStorei(L.UNPACK_SKIP_PIXELS,pn),_.pixelStorei(L.UNPACK_SKIP_ROWS,In),_.pixelStorei(L.UNPACK_SKIP_IMAGES,oi),Me===0&&U.generateMipmaps&&L.generateMipmap(Ae),_.unbindTexture()},this.initRenderTarget=function(b){k.get(b).__webglFramebuffer===void 0&&Z.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Z.setTextureCube(b,0):b.isData3DTexture?Z.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Z.setTexture2DArray(b,0):Z.setTexture2D(b,0),_.unbindTexture()},this.resetState=function(){q=0,W=0,ne=null,_.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}};var ea=new D;function _n(i,e,t,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;ea.copy(e),ea[n]=0,ea.normalize();let c=.5*a/(a+o),h=1-ea.angleTo(i)/l;return Math.sign(ea[t])===1?h*c:o/(a+o)+c+c*(1-h)}var Tl=class i extends gn{constructor(e=1,t=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new D,c=new D,h=new D(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,g=d.length/6,v=new D,m=.5/a;for(let p=0,w=0;p<d.length;p+=3,w+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*m,c.y-=Math.sign(c.y)*m,c.z-=Math.sign(c.z)*m,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/g)){case 0:v.set(1,0,0),f[w+0]=_n(v,c,"z","y",r,n),f[w+1]=1-_n(v,c,"y","z",r,t);break;case 1:v.set(-1,0,0),f[w+0]=1-_n(v,c,"z","y",r,n),f[w+1]=1-_n(v,c,"y","z",r,t);break;case 2:v.set(0,1,0),f[w+0]=1-_n(v,c,"x","z",r,e),f[w+1]=_n(v,c,"z","x",r,n);break;case 3:v.set(0,-1,0),f[w+0]=1-_n(v,c,"x","z",r,e),f[w+1]=1-_n(v,c,"z","x",r,n);break;case 4:v.set(0,0,1),f[w+0]=1-_n(v,c,"x","y",r,e),f[w+1]=1-_n(v,c,"y","x",r,t);break;case 5:v.set(0,0,-1),f[w+0]=_n(v,c,"x","y",r,e),f[w+1]=1-_n(v,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}};function Fd(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Vt,c=0;for(let h=0;h<i.length;++h){let d=i[h],u=0;if(t!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(e){let f;if(t)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(t){let h=0,d=[];for(let u=0;u<i.length;++u){let f=i[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(let h in r){let d=Ud(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(let h in a){let d=a[h][0].length;if(d!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){let f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);let g=Ud(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Ud(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let a=new e(r),o=new nn(a,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let d=l/t;for(let u=0,f=h.count;u<f;u++)for(let g=0;g<t;g++){let v=h.getComponent(u,g);o.setComponent(u+d,g,v)}}else a.set(h.array,l);l+=h.count*t}return s!==void 0&&(o.gpuType=s),o}var Al=class extends ki{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new gn;e.deleteAttribute("uv");let t=new ii({side:qt}),n=new ii,s=new Nr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ut(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new ni(e,n,6),o=new kt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let l=new ut(e,Gs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ut(e,Gs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new ut(e,Gs(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new ut(e,Gs(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new ut(e,Gs(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new ut(e,Gs(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Gs(i){return new Rr({color:0,emissive:16777215,emissiveIntensity:i})}var Hs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var fn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},N_=new Hn(-1,1,1,-1,0,1),dh=class extends Vt{constructor(){super(),this.setAttribute("position",new _t([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _t([0,2,0,0,2,0],2))}},U_=new dh,Ci=class{constructor(e){this._mesh=new ut(U_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,N_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var El=class extends fn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Rt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Cn.clone(e.uniforms),this.material=new Rt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ci(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ta=class extends fn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Cl=class extends fn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var Rl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new he);this._width=n.width,this._height=n.height,t=new Ct(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new El(Hs),this.copyPass.material.blending=Nt,this.timer=new Ur}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ta!==void 0&&(a instanceof ta?n=!0:a instanceof Cl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new he);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Pl=class extends fn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ze}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var Il=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,s,r,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,g=e-u,v=t-f,m,p;g>v?(m=1,p=0):(m=0,p=1);let w=g-m+h,A=v-p+h,y=g-1+2*h,M=v-1+2*h,S=l&255,E=c&255,x=this.perm[S+this.perm[E]]%12,T=this.perm[S+m+this.perm[E+p]]%12,R=this.perm[S+1+this.perm[E+1]]%12,P=.5-g*g-v*v;P<0?n=0:(P*=P,n=P*P*this._dot(this.grad3[x],g,v));let N=.5-w*w-A*A;N<0?s=0:(N*=N,s=N*N*this._dot(this.grad3[T],w,A));let z=.5-y*y-M*M;return z<0?r=0:(z*=z,r=z*z*this._dot(this.grad3[R],y,M)),70*(n+s+r)}noise3d(e,t,n){let s,r,a,o,c=(e+t+n)*.3333333333333333,h=Math.floor(e+c),d=Math.floor(t+c),u=Math.floor(n+c),f=1/6,g=(h+d+u)*f,v=h-g,m=d-g,p=u-g,w=e-v,A=t-m,y=n-p,M,S,E,x,T,R;w>=A?A>=y?(M=1,S=0,E=0,x=1,T=1,R=0):w>=y?(M=1,S=0,E=0,x=1,T=0,R=1):(M=0,S=0,E=1,x=1,T=0,R=1):A<y?(M=0,S=0,E=1,x=0,T=1,R=1):w<y?(M=0,S=1,E=0,x=0,T=1,R=1):(M=0,S=1,E=0,x=1,T=1,R=0);let P=w-M+f,N=A-S+f,z=y-E+f,I=w-x+2*f,O=A-T+2*f,q=y-R+2*f,W=w-1+3*f,ne=A-1+3*f,H=y-1+3*f,J=h&255,K=d&255,Ee=u&255,Te=this.perm[J+this.perm[K+this.perm[Ee]]]%12,rt=this.perm[J+M+this.perm[K+S+this.perm[Ee+E]]]%12,je=this.perm[J+x+this.perm[K+T+this.perm[Ee+R]]]%12,et=this.perm[J+1+this.perm[K+1+this.perm[Ee+1]]]%12,Y=.6-w*w-A*A-y*y;Y<0?s=0:(Y*=Y,s=Y*Y*this._dot3(this.grad3[Te],w,A,y));let $=.6-P*P-N*N-z*z;$<0?r=0:($*=$,r=$*$*this._dot3(this.grad3[rt],P,N,z));let de=.6-I*I-O*O-q*q;de<0?a=0:(de*=de,a=de*de*this._dot3(this.grad3[je],I,O,q));let Ue=.6-W*W-ne*ne-H*H;return Ue<0?o=0:(Ue*=Ue,o=Ue*Ue*this._dot3(this.grad3[et],W,ne,H)),32*(s+r+a+o)}noise4d(e,t,n,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,d,u,f,g,v=(e+t+n+s)*l,m=Math.floor(e+v),p=Math.floor(t+v),w=Math.floor(n+v),A=Math.floor(s+v),y=(m+p+w+A)*c,M=m-y,S=p-y,E=w-y,x=A-y,T=e-M,R=t-S,P=n-E,N=s-x,z=T>R?32:0,I=T>P?16:0,O=R>P?8:0,q=T>N?4:0,W=R>N?2:0,ne=P>N?1:0,H=z+I+O+q+W+ne,J=a[H][0]>=3?1:0,K=a[H][1]>=3?1:0,Ee=a[H][2]>=3?1:0,Te=a[H][3]>=3?1:0,rt=a[H][0]>=2?1:0,je=a[H][1]>=2?1:0,et=a[H][2]>=2?1:0,Y=a[H][3]>=2?1:0,$=a[H][0]>=1?1:0,de=a[H][1]>=1?1:0,Ue=a[H][2]>=1?1:0,be=a[H][3]>=1?1:0,ke=T-J+c,ot=R-K+c,ee=P-Ee+c,re=N-Te+c,ae=T-rt+2*c,oe=R-je+2*c,ue=P-et+2*c,ze=N-Y+2*c,Fe=T-$+3*c,Ve=R-de+3*c,Xe=P-Ue+3*c,L=N-be+3*c,at=T-1+4*c,Je=R-1+4*c,C=P-1+4*c,_=N-1+4*c,B=m&255,k=p&255,Z=w&255,le=A&255,fe=o[B+o[k+o[Z+o[le]]]]%32,j=o[B+J+o[k+K+o[Z+Ee+o[le+Te]]]]%32,te=o[B+rt+o[k+je+o[Z+et+o[le+Y]]]]%32,ge=o[B+$+o[k+de+o[Z+Ue+o[le+be]]]]%32,De=o[B+1+o[k+1+o[Z+1+o[le+1]]]]%32,me=.6-T*T-R*R-P*P-N*N;me<0?h=0:(me*=me,h=me*me*this._dot4(r[fe],T,R,P,N));let pe=.6-ke*ke-ot*ot-ee*ee-re*re;pe<0?d=0:(pe*=pe,d=pe*pe*this._dot4(r[j],ke,ot,ee,re));let Re=.6-ae*ae-oe*oe-ue*ue-ze*ze;Re<0?u=0:(Re*=Re,u=Re*Re*this._dot4(r[te],ae,oe,ue,ze));let Be=.6-Fe*Fe-Ve*Ve-Xe*Xe-L*L;Be<0?f=0:(Be*=Be,f=Be*Be*this._dot4(r[ge],Fe,Ve,Xe,L));let qe=.6-at*at-Je*Je-C*C-_*_;return qe<0?g=0:(qe*=qe,g=qe*qe*this._dot4(r[De],at,Je,C,_)),27*(h+d+u+f+g)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,s){return e[0]*t+e[1]*n+e[2]*s}_dot4(e,t,n,s,r){return e[0]*t+e[1]*n+e[2]*s+e[3]*r}};var na={name:"SSAOShader",defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new he},cameraProjectionMatrix:{value:new pt},cameraInverseProjectionMatrix:{value:new pt},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

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

		}`},ia={name:"SSAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

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

		}`},sa={name:"SSAOBlurShader",uniforms:{tDiffuse:{value:null},resolution:{value:new he}},vertexShader:`varying vec2 vUv;

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

		}`};var ra=class i extends fn{constructor(e,t,n=512,s=512,r=32){super(),this.width=n,this.height=s,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();let a=new Gn;a.format=qn,a.type=Ai,this.normalRenderTarget=new Ct(this.width,this.height,{minFilter:Et,magFilter:Et,type:Gt,depthTexture:a}),this.ssaoRenderTarget=new Ct(this.width,this.height,{type:Gt,depthBuffer:!1}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new Rt({defines:Object.assign({},na.defines),uniforms:Cn.clone(na.uniforms),vertexShader:na.vertexShader,fragmentShader:na.fragmentShader,blending:Nt}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Cr,this.normalMaterial.blending=Nt,this.blurMaterial=new Rt({defines:Object.assign({},sa.defines),uniforms:Cn.clone(sa.uniforms),vertexShader:sa.vertexShader,fragmentShader:sa.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new Rt({defines:Object.assign({},ia.defines),uniforms:Cn.clone(ia.uniforms),vertexShader:ia.vertexShader,fragmentShader:ia.fragmentShader,blending:Nt}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Rt({uniforms:Cn.clone(Hs.uniforms),vertexShader:Hs.vertexShader,fragmentShader:Hs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Po,blendDst:Fr,blendEquation:Xn,blendSrcAlpha:Ro,blendDstAlpha:Fr,blendEquationAlpha:Xn}),this._fsQuad=new Ci(null),this._originalClearColor=new Ze}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,n){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case i.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=Nt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Nt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Nt,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;case i.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Co,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:n);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,s,r){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,s=t.clearColor||s,r=t.clearAlpha||r,s!=null&&(e.setClearColor(s),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){let t=this.kernel;for(let n=0;n<e;n++){let s=new D;s.x=Math.random()*2-1,s.y=Math.random()*2-1,s.z=Math.random(),s.normalize();let r=n/e;r=Xc.lerp(.1,1,r*r),s.multiplyScalar(r),t.push(s)}}_generateRandomKernelRotations(){let n=new Il,s=16,r=new Float32Array(s);for(let a=0;a<s;a++){let o=Math.random()*2-1,l=Math.random()*2-1,c=0;r[a]=n.noise3d(o,l,c)}this.noiseTexture=new Vi(r,4,4,Us,on),this.noiseTexture.wrapS=ti,this.noiseTexture.wrapT=ti,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(n){(n.isPoints||n.isLine||n.isLine2)&&n.visible&&(n.visible=!1,t.push(n))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}};ra.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};var aa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Ll=class extends fn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Cn.clone(aa.uniforms),this.material=new Rs({name:aa.name,uniforms:this.uniforms,vertexShader:aa.vertexShader,fragmentShader:aa.fragmentShader}),this._fsQuad=new Ci(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},tt.getTransfer(this._outputColorSpace)===ht&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Br?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Or?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===zr?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===qi?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Vr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Gr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===kr&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var F_=new Set(["D03","D18"]),oa=[{ja:"\u6728\u6F0F\u308C\u65E5\u306E\u5C0F\u9053",en:"Sunlit Lanes",noteJa:"\u306F\u3058\u3081\u306E\u4E00\u6B69\u3002\u5C11\u3057\u305A\u3064\u3001\u9053\u304C\u3064\u306A\u304C\u308B\u3002",noteEn:"Small beginnings. Lovely ways through.",grass:7904322,leaf:4155447,light:9546321,flower:16108164},{ja:"\u679C\u6A39\u5712\u306E\u307E\u304C\u308A\u89D2",en:"Orchard Bends",noteJa:"\u9060\u56DE\u308A\u306B\u3082\u3001\u3044\u3044\u767A\u898B\u304C\u3042\u308B\u3002",noteEn:"There is something good around the bend.",grass:8559432,leaf:5075011,light:10728286,flower:15775648},{ja:"\u4E18\u306E\u4E0A\u3078\u306E\u914D\u9054",en:"The Way Home",noteJa:"\u3075\u305F\u3064\u306E\u9053\u3092\u3001\u3072\u3068\u3064\u306E\u8A08\u753B\u3067\u3002",noteEn:"Two little routes. One thoughtful plan.",grass:7574859,leaf:3697225,light:10005604,flower:15847578}];function B_(i){let e=Number(i.id.slice(1)),t=F_.has(i.id),n=Math.floor((e-1)/6);return{order:e,gold:t,district:n,seed:t?i.size*149:i.size*149+e*971,...t?oa[0]:oa[n],name:oa[n]}}function fh(i,e){return{x:e%i.size-(i.size-1)/2,z:Math.floor(e/i.size)-(i.size-1)/2}}var Ri=(i,e)=>Math.hypot(i.x-e.x,i.z-e.z);function ph(i,e,t){let n=t.x-e.x,s=t.z-e.z,r=Math.max(0,Math.min(1,((i.x-e.x)*n+(i.z-e.z)*s)/(n*n+s*s||1)));return Ri(i,{x:e.x+r*n,z:e.z+r*s})}function Bd(i){let e=B_(i),t=i.size,n=Array.from({length:t*t},(v,m)=>m).filter(v=>!i.walls.includes(v)),s=n.map(v=>fh(i,v)),r=t===7?4.12:t===6?3.65:3.33,a=t===6?3.65:3.35,o=i.robots.map(v=>{let m=fh(i,v.goal);if(e.gold)return v.goal%t===t-1?{x:m.x+(t===7?.2:.44),z:m.z,rotation:-Math.PI/2}:Math.floor(v.goal/t)===t-1?{x:m.x,z:m.z+.5,rotation:Math.PI}:{x:m.x,z:m.z-.48,rotation:0};let p=[{dx:0,dz:-1,rotation:0},{dx:1,dz:0,rotation:-Math.PI/2},{dx:0,dz:1,rotation:Math.PI},{dx:-1,dz:0,rotation:Math.PI/2}],w=y=>{let M={x:m.x+y.dx*.72,z:m.z+y.dz*.72};return s.reduce((S,E,x)=>S+(n[x]===v.goal?0:Math.max(0,1.02-Ri(M,E))*12),0)+Math.max(0,Math.abs(M.x)-r)*2+Math.max(0,Math.abs(M.z)-a)*2},A=p.sort((y,M)=>w(y)-w(M))[0];return{x:m.x+A.dx*.62,z:m.z+A.dz*.62,rotation:A.rotation}}),l=[];for(let[v,m]of Ys(i).entries()){let p=fh(i,m);if(e.gold){l.push(i.id==="D03"?{x:p.x,z:p.z+1.07}:v===0?{x:p.x,z:p.z-.94}:{x:p.x-1.04,z:p.z});continue}let w=[{x:0,z:1.07},{x:-1.07,z:0},{x:1.07,z:0},{x:0,z:-1.07},{x:-.82,z:.82},{x:.82,z:.82},{x:-.82,z:-.82},{x:.82,z:-.82},{x:-1.28,z:0},{x:1.28,z:0}].map(y=>({x:p.x+y.x,z:p.z+y.z})),A=y=>s.reduce((M,S)=>M+Math.max(0,.82-Ri(y,S))*15,0)+o.reduce((M,S)=>M+Math.max(0,1.05-Ri(y,S))*16,0)+l.reduce((M,S)=>M+Math.max(0,1.05-Ri(y,S))*25,0)+Math.max(0,Math.abs(y.x)-r+.22)*8+Math.max(0,Math.abs(y.z)-a+.22)*8;l.push(w.sort((y,M)=>A(y)-A(M))[0])}let c=t===7?[[-3,-2.8,.8],[2.9,-2.9,.72],[-2.85,2.65,.5]]:[[-2.45,-1.8,.9],[1.2,-2.65,.85],[-2.7,1.6,.62]],h=[[-r+.45,-a+.35,.78],[r-.5,-a+.3,.73],[-.6,-a-.15,.72],[r-.18,-1.5,.59],[-r+.12,-1.2,.58],[.8,-a-.22,.64]],d=e.gold?c:h.filter(([v,m])=>!s.some(p=>Ri(p,{x:v,z:m})<1.18)&&!o.some(p=>Ri(p,{x:v,z:m})<1.24)&&!l.some(p=>Ri(p,{x:v,z:m})<.9)).slice(0,3),u=e.gold?[]:[...s.flatMap(v=>[-.64,.64].flatMap(m=>[-.64,.64].map(p=>({x:v.x+m,z:v.z+p})))),...o.flatMap(v=>[-.68,.68].flatMap(m=>[-.68,.68].map(p=>({x:v.x+m,z:v.z+p})))),...l,...d.map(([v,m])=>({x:v,z:m}))];function f(v){let m=1+.035*Math.sin(v*5)+.035*Math.cos(v*3);if(e.gold)return m;for(let p of u){let w=Math.atan2(p.z/a,p.x/r),A=Math.atan2(Math.sin(v-w),Math.cos(v-w)),y=Math.hypot(p.x/r,p.z/a);m=Math.max(m,1+(y-1+.055)*Math.exp(-((A/.25)**2)))}return m}let g=[];for(let v=0;v<10;v++){let m=.17+v*.21,p=m+.17,w=e.gold?1:f(m),A=e.gold?1:f(p),y={x:Math.cos(m)*r*.97*w,z:Math.sin(m)*a*.97*w},M={x:Math.cos(p)*r*.97*A,z:Math.sin(p)*a*.97*A};Math.abs(y.x)<.8||Math.abs(y.z)<.6||!e.gold&&(s.some(S=>ph(S,y,M)<.83)||o.some(S=>ph(S,y,M)<1)||l.some(S=>ph(S,y,M)<.6))||g.push({a:y,b:M})}return{profile:e,roads:n,rx:r,rz:a,houses:o,clocks:l,trees:d,radius:f,fences:g}}function Od(i,e,t,n=44){let s=i.map(a=>({...a})),r=17;for(let a=0;a<36;a++){let o=!1;for(let l=0;l<s.length;l++)for(let c=l+1;c<s.length;c++){let h=s[l],d=s[c],u=d.x-h.x,f=d.y-h.y,g=n+.4-Math.abs(u),v=n+.4-Math.abs(f);if(g<=0||v<=0)continue;o=!0;let m=g<v?"x":"y",p=(m==="x"?u:f)>=0?1:-1,w=(m==="x"?g:v)/2;h[m]-=p*w,d[m]+=p*w}if(s.forEach((l,c)=>{let h=i[c];l.x=Math.max(n/2,Math.min(e-n/2,Math.max(h.x-r,Math.min(h.x+r,l.x)))),l.y=Math.max(n/2,Math.min(t-n/2,Math.max(h.y-r,Math.min(h.y+r,l.y))))}),!o)break}return s}var ri={cream:16772557,stone:14993824,rock:11048322,grass:7904322,leaf:4155447,coral:15303271,teal:4562074,ink:2309449,gold:15384426},O_=new D(0,1,0),z_=i=>1-(1-i)**3,la=i=>(2-i)*Math.PI/2,k_=(i,e,t)=>i+Math.atan2(Math.sin(e-i),Math.cos(e-i))*t;function kd(i){return()=>(i=i*1664525+1013904223>>>0,i/4294967296)}var xh=new Er(1,12,8),Vd=new Tl(1,1,1,3,.11),V_=new gn(1,1,1),Rn=new Ts(1,1,1,24),Ht=(i,e=.8,t=0)=>new ii({color:i,roughness:e,metalness:t}),ce={cream:Ht(ri.cream,.68),stone:Ht(ri.stone),rock:Ht(ri.rock),grass:Ht(ri.grass),leaf:Ht(ri.leaf),leafLight:Ht(9546321),wood:Ht(10647108),coral:Ht(ri.coral,.52),teal:Ht(ri.teal,.45),ink:Ht(ri.ink,.38),gold:Ht(ri.gold,.4,.35),white:Ht(16776415,.7),parcel:Ht(12159827),dark:Ht(6574666),flower:Ht(16108164),water:Ht(9030608,.22,.1),light:new ii({color:16767380,emissive:16758337,emissiveIntensity:.7,roughness:.45})};function Nl(i){let e=document.createElement("canvas");e.width=e.height=256;let t=e.getContext("2d"),n=kd(i);t.fillStyle="#ede9d9",t.fillRect(0,0,256,256);for(let r=0;r<14e3;r++){let a=190+Math.floor(n()*65);t.fillStyle=`rgba(${a},${a},${a},.22)`,t.fillRect(n()*256,n()*256,1+n()*2,1+n()*2)}let s=new _i(e);return s.wrapS=s.wrapT=ti,s.colorSpace=zt,s}var Gd=Nl(31);ce.stone.map=Gd;ce.rock.map=Gd;ce.cream.map=Nl(33);ce.wood.map=Nl(87);ce.grass.map=Nl(112);var G_=(()=>{let i=document.createElement("canvas");i.width=i.height=64;let e=i.getContext("2d"),t=e.createRadialGradient(32,32,4,32,32,32);return t.addColorStop(0,"rgba(38,45,21,.36)"),t.addColorStop(.45,"rgba(38,45,21,.20)"),t.addColorStop(1,"rgba(38,45,21,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new xi({map:new _i(i),transparent:!0,depthWrite:!1})})();function mh(i,e,t,n,s,r){let a=Pt(i,new vi(1,1),G_,e,t,n,s,r,1,!1);return a.rotation.x=-Math.PI/2,a}function Pt(i,e,t,n,s,r,a=1,o=1,l=1,c=!0){let h=new ut(e,t);return h.position.set(n,s,r),h.scale.set(a,o,l),h.castShadow=c,h.receiveShadow=!0,i.add(h),h}function $e(i,e,t,n,s,r,a,o){return Pt(i,Vd,e,t,n,s,r,a,o)}function ln(i,e,t,n,s,r,a,o){return Pt(i,xh,e,t,n,s,r,a,o)}function ca(i,e,t,n,s){let r=Pt(i,Rn,e,0,0,0,s,t.distanceTo(n),s);return r.position.copy(t).add(n).multiplyScalar(.5),r.quaternion.setFromUnitVectors(O_,n.clone().sub(t).normalize()),r}function zd(i,e,t="transparent"){let n=document.createElement("canvas");n.width=n.height=128;let s=n.getContext("2d");t!=="transparent"&&(s.fillStyle=t,s.fillRect(0,0,128,128)),s.fillStyle=e,s.font="bold 84px Arial",s.textAlign="center",s.textBaseline="middle",s.fillText(i,64,69);let r=new _i(n);return r.colorSpace=zt,new xi({map:r,transparent:!0,depthWrite:!1})}var H_={A:zd("A","#fff9e6"),B:zd("B","#fff9e6")};function ha(i,e,t,n,s,r=.22){return Pt(i,new vi(1,1),H_[e],t,n,s,r,r,1,!1)}function W_(){let i=new Gi;i.moveTo(-.09,-.27),i.lineTo(.09,-.27),i.lineTo(.09,.03),i.lineTo(.25,.03),i.lineTo(0,.29),i.lineTo(-.25,.03),i.lineTo(-.09,.03),i.closePath();let e=new Wi(i,{depth:.035,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:.018,bevelThickness:.015});return e.rotateX(Math.PI/2),e}var gh=W_(),Dl=class{constructor(e,t=!1){this.container=e;this.capture=t;this.renderer=new Sl({antialias:!0,alpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:t}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.75)),this.renderer.outputColorSpace=zt,this.renderer.toneMapping=qi,this.renderer.toneMappingExposure=1.03,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.autoUpdate=!1,this.renderer.shadowMap.type=Xi,this.renderer.setClearColor(0,0),this.renderer.domElement.setAttribute("aria-hidden","true"),e.append(this.renderer.domElement);let n=document.createElement("canvas");n.width=2,n.height=256;let s=n.getContext("2d"),r=s.createLinearGradient(0,0,0,256);r.addColorStop(0,"#e3f0ed"),r.addColorStop(.6,"#eef1df"),r.addColorStop(1,"#f4ecd5"),s.fillStyle=r,s.fillRect(0,0,2,256);let a=new _i(n);a.colorSpace=zt,this.scene.background=a;let o=new Ir(15135999,9599831,1.35);this.scene.add(o);let l=new Is(16770489,3);l.position.set(-5,10,6),l.castShadow=!0,l.shadow.mapSize.set(2048,2048),Object.assign(l.shadow.camera,{left:-7,right:7,top:7,bottom:-7,near:1,far:30}),l.shadow.bias=-3e-4,l.shadow.normalBias=.025,l.shadow.radius=3,this.scene.add(l);let c=new Is(11788022,1.1);c.position.set(6,5,-7),this.scene.add(c);let h=new ks(this.renderer),d=new Al,u=h.fromScene(d,.08);this.scene.environment=u.texture,this.scene.environmentIntensity=.23,d.dispose(),h.dispose();let f=new Ct(1,1,{type:Gt,samples:4});this.composer=new Rl(this.renderer,f),this.composer.addPass(new Pl(this.scene,this.camera)),this.ao=new ra(this.scene,this.camera,512,512,16),this.ao.kernelRadius=.48,this.ao.minDistance=3e-4,this.ao.maxDistance=.045,this.composer.addPass(this.ao),this.composer.addPass(new Ll),this.renderer.info.autoReset=!1,this.scene.add(this.content),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.frame=requestAnimationFrame(g=>this.animate(g))}container;capture;renderer;scene=new ki;camera=new Hn;composer;ao;anchors=[];content=new Dt;movers=[];arrows=[];clockHands=[];effects=new Dt;level;run;before;moveTime=0;enterTime=0;lastTime=0;screen="title";reduce=!1;frame=0;samples=[];waitBadges=[];waterMeshes=[];projectFn;observer;target=new D;mobile=!1;disposed=!1;materials=[];courierState;dirty=!0;renderedFrames=0;skippedFrames=0;cpuSamples=[];geometryBytes=0;onProject(e){this.projectFn=e,this.project()}onCourierState(e){this.courierState=e}point(e){let t=this.level.size;return new D(e%t-(t-1)/2,.13,Math.floor(e/t)-(t-1)/2)}setScreen(e){this.screen=e,this.resize()}setReducedMotion(e){this.reduce=e,this.dirty=!0}setLevel(e,t){let n=new Set;this.content.traverse(M=>{M instanceof ni&&M.dispose(),M instanceof ut&&![Vd,xh,Rn,V_,gh].includes(M.geometry)&&n.add(M.geometry)}),n.forEach(M=>M.dispose()),this.materials.forEach(M=>M.dispose()),this.materials=[],this.scene.remove(this.content),this.content=new Dt,this.scene.add(this.content),this.level=e,this.run=void 0,this.before=void 0,this.movers=[],this.arrows=[],this.anchors.length=0,this.clockHands=[],this.waitBadges=[],this.waterMeshes=[],this.effects=new Dt;let s=Bd(e),r=kd(s.profile.seed),a=new Dt;this.content.add(a),ce.grass.color.setHex(s.profile.grass),ce.leaf.color.setHex(s.profile.leaf),ce.leafLight.color.setHex(s.profile.light),ce.flower.color.setHex(s.profile.flower);let o=e.size,l=o===7,c=s.rx,h=s.rz,d=new Gi;for(let M=0;M<=80;M++){let S=M/80*Math.PI*2,E=s.radius(S),x=Math.cos(S)*c*E,T=Math.sin(S)*h*E;M===0?d.moveTo(x,T):d.lineTo(x,T)}d.closePath();let u=new Wi(d,{depth:.92,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.18,bevelThickness:.2});u.rotateX(-Math.PI/2),u.translate(0,-1.24,0),Pt(a,u,ce.rock,0,0,0);let f=new Wi(d,{depth:.08,bevelEnabled:!0,bevelSegments:3,steps:1,bevelSize:.13,bevelThickness:.08});f.rotateX(-Math.PI/2),f.translate(0,-.08,0),Pt(a,f,ce.grass,0,0,0);for(let M=0;M<66;M++){let S=M/66*Math.PI*2,E=s.radius(S),x=.55+r()*.55,T=$e(a,M%3?ce.rock:ce.stone,Math.cos(S)*c*E,-.53,Math.sin(S)*h*E,.42+r()*.32,x,.38);T.rotation.y=-S,T.rotation.z=(r()-.5)*.22,ln(a,M%2?ce.grass:ce.leafLight,Math.cos(S)*c*E,-.05,Math.sin(S)*h*E,.3,.18,.26)}let g=Array.from({length:o*o},(M,S)=>S).filter(M=>!e.walls.includes(M));g.forEach(M=>{let S=this.point(M);$e(a,ce.stone,S.x,.005,S.z,.992,.18,.992),$e(a,ce.cream,S.x,.088,S.z,.972,.055,.972);for(let x=0;x<3;x++)$e(a,x===1?ce.stone:ce.cream,S.x-.315+x*.315,.127,S.z,.305,.018,.9);[[0,-1],[1,0],[0,1],[-1,0]].forEach(([x,T])=>{let R=M%o+x,P=Math.floor(M/o)+T;R>=0&&R<o&&P>=0&&P<o&&!e.walls.includes(P*o+R)||$e(a,ce.stone,S.x+x*.52,.08,S.z+T*.52,x?.08:.99,.17,x?.99:.08)})});for(let M=0;M<450;M++){let S=(r()*2-1)*c,E=(r()*2-1)*h;if((S/c)**2+(E/h)**2>.94||g.some(R=>{let P=this.point(R);return Math.abs(P.x-S)<.61&&Math.abs(P.z-E)<.61}))continue;let T=.055+r()*.1;if(ln(a,M%4===0?ce.leafLight:ce.leaf,S,.06,E,T,.085+r()*.08,T),M%3===0){let R=M%9===0?ce.coral:ce.white;ln(a,R,S,.19,E,.046,.025,.046),ln(a,ce.flower,S+.026,.195,E,.014,.018,.014)}}let v=s.trees;for(let[M,S,E]of v)this.tree(a,M,S,E,r);let m=l?[[-1.05,-1.95],[-1.2,0],[1.05,-2.1],[2,1.15],[2.65,2.2],[-3,1.4]]:[[-1.4,-1.45],[1.4,-1.25],[-1.5,1.7],[1.4,1.7]];for(let[M,S,E]of v)ln(a,ce.grass,M,.02,S,.68*E,.24*E,.65*E);m.forEach(([M,S],E)=>{if(g.some(T=>{let R=this.point(T);return Math.abs(R.x-M)<.78&&Math.abs(R.z-S)<.78}))return;let x=$e(a,E%2?ce.rock:ce.stone,M,.16,S,.5,.4,.4);x.rotation.y=.4+E,x.rotation.z=.12});let p={x:l?1.5:-1.55,z:l?2.5:2.6};(s.profile.gold||!g.some(M=>{let S=this.point(M);return Math.abs(S.x-p.x)<.9&&Math.abs(S.z-p.z)<.8}))&&this.bench(a,p.x,p.z);for(let{a:M,b:S}of s.fences)$e(a,ce.wood,M.x,.19,M.z,.075,.42,.075),ln(a,ce.gold,M.x,.43,M.z,.07,.045,.07),ca(a,ce.wood,new D(M.x,.3,M.z),new D(S.x,.3,S.z),.022);let w=$e(a,ce.water,-c*.53,-.69,h*.89,.48,1.28,.12);w.rotation.y=-.35;for(let M=0;M<5;M++){let S=$e(a,ce.white,-c*.53-.17+M*.08,-.63,h*.89+.08,.015,.78+r()*.35,.018);S.rotation.y=-.35}let A=Ht(13224120),y=Ht(12438948);this.materials.push(A,y);for(let[M,S,E]of[[-6.3,-4.4,.85],[6.2,-3.7,.65],[3.4,-6.2,.46]]){let x=new Dt;x.position.set(M,-1.2,S),x.scale.setScalar(E),Pt(x,new _r(.8,1.5,7),A,0,-.65,0,1,-1,1,!1),Pt(x,Rn,y,0,.05,0,.78,.14,.65,!1),ln(x,y,-.2,.3,-.1,.27,.26,.24),ln(x,y,.25,.4,0,.3,.36,.25),a.add(x)}e.robots.forEach((M,S)=>{let E=this.point(M.goal),x=new Dt;x.position.copy(E),x.position.y=0;let T=s.houses[S];x.position.x=T.x,x.position.z=T.z,x.rotation.y=T.rotation,this.depot(x,M.id),a.add(x);let R=this.point(M.start),P=Pt(a,Rn,S?ce.teal:ce.coral,R.x,.145,R.z,.34,.028,.34);P.castShadow=!1;let N=this.courier(M.id);N.position.copy(R),N.position.y=.15,N.rotation.y=la(M.direction),this.content.add(N),this.movers.push(N)}),Object.entries(e.fixedArrows??{}).forEach(([M,S])=>{let E=this.point(+M),x=Pt(a,gh,ce.wood,E.x,.16,E.z);x.rotation.y=la(S)}),e.sockets.forEach((M,S)=>{let E=this.point(M),x=new Dt;x.position.copy(E);let T=Pt(x,Rn,ce.wood,0,.025,0,.35,.055,.35);T.castShadow=!1,Pt(x,Rn,ce.cream,0,.062,0,.31,.03,.31);let R=Pt(x,gh,ce.ink,0,.115,0);x.userData.arrow=R,this.content.add(x),this.arrows.push(x),this.anchors.push({kind:"arrow",index:S,cell:M,position:E.clone().setY(.24)})}),Ys(e).forEach((M,S)=>{let E=this.point(M),x=new Dt,T=s.clocks[S],R=new D(T.x,E.y,T.z);ca(a,ce.gold,new D(E.x,.17,E.z),new D(R.x,.17,R.z),.017);let P=Pt(a,new Cs(.41,.018,6,32),ce.gold,E.x,.155,E.z);P.rotation.x=-Math.PI/2,P.castShadow=!1,x.position.copy(R).setY(.1),Pt(x,Rn,ce.gold,0,.08,0,.3,.16,.3),Pt(x,Rn,ce.cream,0,.18,0,.25,.065,.25);let N=$e(x,ce.ink,.015,.223,-.04,.032,.026,.18);this.clockHands.push(N),this.content.add(x),this.waitBadges.push(x),this.anchors.push({kind:"wait",index:S,cell:M,position:R.clone().setY(.33)})}),this.mergeStatic(a,!0),this.content.add(this.effects),this.setEdit(t),this.enterTime=performance.now(),this.dirty=!0,this.resize(),this.measureGeometry()}tree(e,t,n,s,r){let a=new Dt;a.position.set(t,0,n),a.scale.setScalar(s),mh(a,0,.09,0,1.8,1.5),ca(a,ce.wood,new D(0,0,0),new D(.1,1.25,0),.12);for(let o=0;o<5;o++){let l=o*1.25;ca(a,ce.wood,new D(.03,.65,0),new D(Math.cos(l)*.45,1.22,Math.sin(l)*.4),.055)}for(let o=0;o<18;o++){let l=o*2.39,c=Math.sqrt(r())*.65;ln(a,ce.leaf,Math.cos(l)*c,1.2+r()*.5,Math.sin(l)*c,.25,.2,.24)}for(let o=0;o<260;o++){let l=o*2.399,c=Math.sqrt(r())*.79;ln(a,o%5?ce.leaf:ce.leafLight,Math.cos(l)*c,1.33+Math.sqrt(1-(c/.85)**2)*.35+(r()-.5)*.35,Math.sin(l)*c,.085,.035,.13).rotation.set(r()*.9,r()*6.28,r()*.8)}e.add(a)}bench(e,t,n){for(let s=0;s<3;s++)$e(e,ce.wood,t,.22,n+s*.065,.72,.05,.06);for(let s=0;s<2;s++)$e(e,ce.dark,t+(s?1:-1)*.26,.1,n+.08,.05,.2,.21),$e(e,ce.wood,t,.38+s*.08,n+.22,.72,.05,.05)}depot(e,t){let n=t==="A"?ce.coral:ce.teal;mh(e,0,.09,.1,1.4,1.3),$e(e,ce.stone,0,.075,0,1.03,.15,.86),$e(e,ce.cream,0,.5,-.06,.87,.83,.64),$e(e,ce.wood,0,.37,.28,.44,.59,.045),$e(e,ce.dark,0,.37,.31,.035,.52,.03),$e(e,ce.wood,0,.48,-.397,.35,.39,.028),$e(e,ce.light,0,.48,-.414,.27,.3,.015),$e(e,ce.cream,0,.48,-.427,.025,.32,.018),$e(e,ce.cream,0,.48,-.427,.3,.025,.018);for(let r=0;r<2;r++)for(let a=0;a<3;a++){let o=r?-.443:.443;$e(e,ce.stone,o,.24+a*.23,-.1+a%2*.06,.022,.018,.52)}for(let r of[-.2,.2])$e(e,ce.gold,r,.32,.32,.026,.06,.025);$e(e,n,0,.145,.51,.59,.05,.36);for(let r=0;r<9;r++){let a=(r-4)*.115,o=.91+Math.cos((r-4)/4*Math.PI/2)*.2;for(let l=0;l<4;l++){let c=$e(e,n,a,o,-.37+l*.21,.128,.09,.225);c.rotation.z=-(r-4)*.12}}let s=ha(e,t,0,1.165,-.08,.42);s.rotation.x=-Math.PI/2,Pt(e,Rn,n,0,.78,.3,.165,.055,.165).rotation.x=Math.PI/2,ha(e,t,0,.79,.336,.19);for(let r of[-.44,.44])$e(e,ce.wood,r,.56,.32,.08,.28,.09),$e(e,ce.light,r,.56,.373,.046,.17,.035),$e(e,ce.gold,r,.715,.32,.13,.035,.14);$e(e,ce.wood,.36,1.28,-.2,.035,.64,.035),ln(e,ce.gold,.36,1.62,-.2,.05,.05,.05),$e(e,n,.51,1.49,-.2,.3,.22,.025),ha(e,t,.51,1.49,-.18,.14);for(let r=0;r<3;r++)$e(e,ce.parcel,-.59+r%2*.18,.16+Math.floor(r/2)*.24,.07,.23,.24,.23),$e(e,ce.cream,-.59+r%2*.18,.285+Math.floor(r/2)*.24,.07,.04,.01,.24)}courier(e){let t=new Dt,n=e==="A"?ce.coral:ce.teal;mh(t,0,.004,0,.9,.9),$e(t,n,0,.22,0,.55,.23,.61),$e(t,ce.cream,0,.46,.08,.57,.47,.52),$e(t,ce.ink,0,.48,.347,.38,.25,.024);for(let a of[-.1,.1])ln(t,ce.light,a,.49,.368,.035,.065,.018);$e(t,n,0,.245,.369,.45,.07,.043),$e(t,ce.gold,0,.709,.035,.12,.033,.16);for(let a of[-.29,.29])for(let o of[-.21,.21]){let l=Pt(t,Rn,ce.dark,a,.14,o,.12,.085,.12);l.rotation.z=Math.PI/2;let c=Pt(t,Rn,ce.gold,a+(a>0?.047:-.047),.14,o,.048,.015,.048);c.rotation.z=Math.PI/2}$e(t,ce.parcel,0,.415,-.31,.46,.36,.28),$e(t,ce.cream,0,.601,-.31,.065,.012,.295),$e(t,ce.cream,0,.42,-.454,.065,.36,.012);for(let a of[-.3,.3]){$e(t,n,a,.47,.055,.018,.2,.22);let o=ha(t,e,a+(a>0?.013:-.013),.47,.058,.17);o.rotation.y=a>0?Math.PI/2:-Math.PI/2}let s=ha(t,e,0,.735,.04,.27);s.rotation.x=-Math.PI/2;let r=ca(t,ce.dark,new D(.14,.7,0),new D(.14,.8,0),.012);return ln(t,n,.14,.81,0,.042,.035,.042),this.mergeStatic(t,!1),t}mergeStatic(e,t=!1){e.updateMatrixWorld(!0);let n=new Map;e.traverse(s=>{if(!(s instanceof ut))return;let r=s.material,a=r.uuid+String(s.castShadow)+(t?s.geometry.uuid:""),o=n.get(a);o||(o={material:r,shadow:s.castShadow,geometry:s.geometry,matrices:[],parts:[]},n.set(a,o)),t?o.matrices.push(s.matrixWorld.clone()):o.parts.push((s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone()).applyMatrix4(s.matrixWorld))}),e.clear();for(let s of n.values())if(t)if(s.matrices.length===1||s.matrices.some(r=>r.determinant()<0))for(let r of s.matrices){let a=new ut(s.geometry,s.material);a.matrix.copy(r),a.matrixAutoUpdate=!1,a.castShadow=s.shadow,a.receiveShadow=!0,e.add(a)}else{let r=new ni(s.geometry,s.material,s.matrices.length);s.matrices.forEach((a,o)=>r.setMatrixAt(o,a)),r.instanceMatrix.needsUpdate=!0,r.castShadow=s.shadow,r.receiveShadow=!0,r.computeBoundingSphere(),e.add(r)}else{let r=Fd(s.parts,!1);if(s.parts.forEach(a=>a.dispose()),r){let a=new ut(r,s.material);a.castShadow=s.shadow,a.receiveShadow=!0,e.add(a)}}}measureGeometry(){let e=new Set,t=0;this.content.traverse(n=>{if(n instanceof ut&&!e.has(n.geometry)){e.add(n.geometry);for(let s of Object.values(n.geometry.attributes))t+=s.array.byteLength;n.geometry.index&&(t+=n.geometry.index.array.byteLength)}n instanceof ni&&(t+=n.instanceMatrix.array.byteLength)}),this.geometryBytes=t}setEdit(e){this.dirty=!0,this.arrows.forEach((t,n)=>{t.userData.arrow.rotation.y=la(e.arrows[n])}),this.clockHands.forEach((t,n)=>{let s=e.waits?.[n]??e.wait;t.rotation.y=s*Math.PI/2})}setRun(e){if(this.dirty=!0,this.before=this.run??{...e,bots:this.level.robots.map(t=>({id:t.id,p:t.start,d:t.direction,remaining:0,delivered:!1})),tick:0,status:"running",seen:[]},this.run=e,this.moveTime=performance.now(),this.effects.traverse(t=>{t instanceof ut&&t.geometry!==xh&&t.geometry.dispose()}),this.effects.clear(),e?.status==="failed")for(let t of e.failureCells??[]){let n=this.point(t),s=Pt(this.effects,new Cs(.4,.042,8,32),ce.coral,n.x,.18,n.z);s.rotation.x=-Math.PI/2,s.userData.failure=!0}if(e?.status==="won")for(let t=0;t<24;t++){let n=this.level.robots[t%this.level.robots.length],s=this.point(n.goal),r=ln(this.effects,t%2?ce.gold:ce.white,s.x,.5,s.z,.04,.07,.04);r.userData={spark:t,base:s}}}cancelMotion(){this.dirty=!0,this.before=this.run,this.moveTime=-1e3}resize(){this.dirty=!0;let e=this.container.clientWidth,t=this.container.clientHeight;if(!e||!t||!this.level)return;this.mobile=e<700,this.renderer.setSize(e,t,!1);let n=this.level.size,s=this.screen==="play";this.target.set(0,-.12,0);let r=this.mobile?1.95:1.35;this.camera.position.set(this.mobile?-.15:-4,11*r,13),this.camera.lookAt(this.target),this.composer.setSize(e,t),this.ao.setSize(Math.round(e*.7),Math.round(t*.7));let a=this.mobile?n===7?8.5:n===6?7.6:6.95:n===7?10.3:n===6?9.8:9.35;!s&&!this.mobile&&(a*=1.25);let o=this.mobile?6.95:s?7.7:7,l=Math.max(o,a*t/e);if(a=l*e/t,this.camera.left=-a/2,this.camera.right=a/2,this.camera.top=l/2,this.camera.bottom=-l/2,this.camera.near=.1,this.camera.far=120,!s&&!this.mobile){let c=a*.18;this.camera.position.x-=c,this.target.x-=c,this.camera.lookAt(this.target)}this.camera.updateProjectionMatrix(),this.ao.ssaoMaterial.defines.PERSPECTIVE_CAMERA=0,this.ao.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ao.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ao.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ao.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.project()}project(){let e=this.container.clientWidth,t=this.container.clientHeight;this.camera.updateMatrixWorld();let n=this.anchors.map(s=>{let r=s.position.clone().project(this.camera);return{kind:s.kind,index:s.index,cell:s.cell,x:(r.x+1)*e/2,y:(1-r.y)*t/2}});this.projectFn?.(Od(n,e,t,this.mobile?44:46))}animate(e){if(this.disposed)return;if(this.frame=requestAnimationFrame(o=>this.animate(o)),document.hidden){this.lastTime=0;return}if(this.lastTime&&e-this.lastTime<16)return;let t=e-this.moveTime<900||e-this.enterTime<260,n=this.run?.status==="running"&&this.run.bots.some(o=>o.remaining>0),s=this.run?.status==="failed",r=!this.reduce&&(t||n||s);if(!this.capture&&!this.dirty&&!r){this.skippedFrames++;return}if(this.lastTime){let o=e-this.lastTime;o<100&&(this.samples.push(o),this.samples.length>1800&&this.samples.shift())}if(this.lastTime=e,this.level){let o=this.reduce?1:Math.min(1,Math.max(0,(e-this.moveTime)/180)),l=z_(o),c=this.run;this.movers.forEach((h,d)=>{let u=c?.bots[d]??{...this.level.robots[d],p:this.level.robots[d].start,d:this.level.robots[d].direction,remaining:0,delivered:!1},f=this.before?.bots[d]??u,g=this.point(u.p),v=this.point(f.p);h.position.copy(v).lerp(g,l),h.position.y=.15,h.rotation.y=k_(la(f.d),la(u.d),Math.min(1,o*2)),h.rotation.z=0,h.rotation.x=0,this.reduce||(u.p!==f.p&&o<1?(h.position.y+=Math.sin(o*Math.PI)*.035,h.rotation.x=Math.sin(o*Math.PI)*.055):u.remaining>0&&c?.status==="running"&&(h.rotation.z=Math.sin(e/180)*.025),u.delivered&&e-this.moveTime<420&&(h.position.y+=Math.sin(Math.min(1,(e-this.moveTime)/420)*Math.PI)*.1),c?.status==="failed"&&e-this.moveTime<300&&(h.rotation.z=Math.sin((e-this.moveTime)/28)*.035*(1-(e-this.moveTime)/300)))}),this.courierState?.(this.movers.map((h,d)=>{let u=c?.bots[d],f=this.before?.bots[d],g=h.position.clone().add(new D(0,1.05,0)).project(this.camera);return{id:this.level.robots[d].id,x:(g.x+1)*this.container.clientWidth/2,y:(1-g.y)*this.container.clientHeight/2,remaining:u?.remaining??0,waiting:!!u&&c?.status==="running"&&(u.remaining>0||!!f&&f.remaining>0&&f.p===u.p)}})),this.effects.children.forEach(h=>{if(h.userData.failure&&h.scale.setScalar(this.reduce?1:1+Math.sin(e/120)*.035),h.userData.spark!==void 0){let d=(e-this.moveTime)/850,u=h.userData.spark,f=h.userData.base;h.visible=d<1&&!this.reduce,h.position.set(f.x+Math.cos(u*2.4)*d*.55,.5+Math.sin(d*Math.PI)*.85,f.z+Math.sin(u*2.4)*d*.55),h.rotation.set(d*3,u,d*2),h.scale.setScalar(.8*(1-d))}}),this.content.position.y=this.reduce?0:Math.max(0,1-(e-this.enterTime)/240)*-.13}let a=performance.now();this.renderer.info.reset(),this.renderer.shadowMap.needsUpdate=this.dirty||r,this.composer.render(),this.dirty=!1,this.renderedFrames++,this.cpuSamples.push(performance.now()-a),this.cpuSamples.length>600&&this.cpuSamples.shift()}stats(){let e=[...this.samples].sort((t,n)=>t-n);return{settled:performance.now()-this.enterTime>300,width:this.container.clientWidth,height:this.container.clientHeight,mobileCamera:this.mobile,frames:e.length,renderedFrames:this.renderedFrames,skippedIdleFrames:this.skippedFrames,geometryAttributeBytes:this.geometryBytes,cpuSubmissionMsP95:[...this.cpuSamples].sort((t,n)=>t-n)[Math.floor(this.cpuSamples.length*.95)]??0,qualityTier:"Gold geometry / 2048 shadow / 70% AO",captureMode:this.capture,frameMsMedian:e[Math.floor(e.length*.5)]??0,frameMsP95:e[Math.floor(e.length*.95)]??0,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,pixelRatio:this.renderer.getPixelRatio(),webgl:this.renderer.getContext().getParameter(this.renderer.getContext().VERSION)}}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.observer.disconnect(),this.ao.dispose(),this.composer.dispose(),this.renderer.dispose()}};function _h(i){return Dn.find(e=>!i.cleared.includes(e.id))?.id??"D01"}function Hd(i,e,t,n){let s=(r,a)=>t==="ja"?r:a;i.replaceChildren(),oa.forEach((r,a)=>{let o=document.createElement("section");o.className="journey-chapter",o.dataset.chapter=String(a+1);let l=document.createElement("div");l.className="chapter-intro";let c=document.createElement("p");c.className="eyebrow",c.textContent=`0${a+1} / PARCEL GROVE`;let h=document.createElement("h3");h.textContent=r[t];let d=document.createElement("p");d.textContent=t==="ja"?r.noteJa:r.noteEn;let u=document.createElement("span");u.className="chapter-seal",u.textContent=["\u273F","\u2767","\u2302"][a],u.setAttribute("aria-hidden","true"),l.append(u,c,h,d);let f=document.createElement("div");f.className="journey-stops",f.setAttribute("role","group"),f.setAttribute("aria-label",r[t]);for(let[g,v]of Dn.slice(a*6,a*6+6).entries()){let m=e.cleared.includes(v.id),p=e.levelId===v.id,w=_h(e)===v.id&&!m,A=document.createElement("button");A.type="button",A.className="delivery-stop",A.dataset.level=v.id,A.dataset.completed=String(m),A.dataset.current=String(p),A.dataset.recommended=String(w),A.dataset.unlocked="true",A.style.setProperty("--stop",String(g)),p&&A.setAttribute("aria-current","step"),A.setAttribute("aria-label",`${v.id} ${v.title[t]} \xB7 ${m?s("\u304A\u5C4A\u3051\u6E08\u307F","Delivered"):s("\u9078\u629E\u3067\u304D\u307E\u3059","Available")}${p?s(" \xB7 \u73FE\u5728\u306E\u914D\u9054"," \xB7 Current delivery"):""}`);let y=document.createElement("span");y.className="stop-number",y.textContent=v.id.slice(1);let M=document.createElement("span");M.className="stop-stamp",M.textContent=m?"\u2713":w?"\u2192":"\u25C7",M.setAttribute("aria-hidden","true");let S=document.createElement("strong");S.textContent=v.title[t];let E=document.createElement("small");E.textContent=m?s("\u304A\u5C4A\u3051\u6E08\u307F","Delivered"):p?s("\u3053\u306E\u914D\u9054\u306E\u3064\u3065\u304D","Your current stop"):w?s("\u6B21\u306E\u304A\u3059\u3059\u3081","Up next"):s("\u914D\u9054\u3059\u308B","Make a delivery"),A.append(y,M,S,E),A.addEventListener("click",x=>n(v.id,x)),f.append(A)}o.append(l,f),i.append(o)})}var ie=i=>document.getElementById(i),ua=new URLSearchParams(location.search);ua.has("lang")||ua.set("lang",/^\/en\//.test(location.pathname)?"en":/^\/ja\//.test(location.pathname)?"ja":document.documentElement.lang);var Bt=ua.get("lang")==="en"?"en":"ja",Yt="title",mt=Dn.find(i=>i.id==="D03"),Zt=Js(mt),He,vn=!1,Ws,Fl=0,da=0,Xd=Bh("tiny-delivery",()=>localStorage),Bl=Xd.load(),ct=Bl.data,ga=Bl.status==="ok",vh=Bl.status==="invalid"||Bl.status==="unavailable",bt=Vh(),rn=Hh("D1",()=>Yt==="play"&&!vn&&!document.hidden&&!bt.preferences.mute&&!ie("settings").open&&(!He||He.status==="running")),st=(i,e)=>Bt==="ja"?i:e,Wt,fa=!1;try{Wt=new Dl(ie("world"),!1)}catch(i){ie("loading").hidden=!0,document.body.dataset.ready="false",document.documentElement.lang=Bt,ie("title").hidden=!0,ie("game").querySelectorAll("button").forEach(n=>{n.disabled=!0});let e=ie("unsupported"),t=document.createElement("a");throw t.href=`/${Bt}/games/tiny-delivery/`,t.textContent=st("Hakorilo\u306E\u904A\u3073\u65B9\u3078\u623B\u308B","Back to Hakorilo details"),t.style.cssText="display:inline-flex;align-items:center;min-height:44px;color:inherit",e.replaceChildren(document.createTextNode(st("3D\u63CF\u753B\u3092\u958B\u59CB\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u3084\u7AEF\u672B\u3067\u306FWebGL 2\u3092\u5229\u7528\u3067\u304D\u306A\u3044\u5834\u5408\u304C\u3042\u308A\u307E\u3059\u3002\u5BFE\u5FDC\u30D6\u30E9\u30A6\u30B6\u30FC\u3067\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002","3D rendering could not start. WebGL 2 may be unavailable in this browser or on this device. Try a compatible browser.")),document.createElement("br"),t),e.hidden=!1,e.tabIndex=-1,e.focus(),i}Wt.setReducedMotion(ct.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches);Wt.setLevel(mt,Zt);Wt.setScreen(Yt);var Ol=Oh(ie("controls"),()=>Yt==="play"&&!He&&!ie("settings").open,()=>{});function xa(i=!0){i&&(ct={...ct,levelId:mt.id,levelVersion:mt.version,board:structuredClone(Zt)},ga=!0),vh=!Xd.write(ct),qd()}function qd(){ie("title-save").textContent=vh?st("\u3053\u306E\u8A2A\u554F\u4E2D\u306E\u30D7\u30EC\u30A4\u3067\u3059\u3002\u4FDD\u5B58\u306F\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002","Playing for this visit. Saving is unavailable."):ga?st(`\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u306B\u4FDD\u5B58\u6E08\u307F \xB7 ${ct.levelId}`,`Saved in this browser \xB7 ${ct.levelId}`):st("\u3053\u306E\u30D6\u30E9\u30A6\u30B6\u30FC\u306B\u81EA\u52D5\u4FDD\u5B58\u3057\u307E\u3059\u3002","Your journey saves in this browser."),ie("title-progress").textContent=st(`${ct.cleared.length} / 18 \u306E\u914D\u9054\u3092\u5B8C\u4E86`,`${ct.cleared.length} / 18 deliveries complete`),ie("save-warning").hidden=!vh,ie("save-warning").textContent=st("\u3053\u306E\u74B0\u5883\u3067\u306F\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3002\u73FE\u5728\u306E\u30D7\u30EC\u30A4\u306F\u7D9A\u3051\u3089\u308C\u307E\u3059\u3002\u5143\u306E\u4FDD\u5B58\u30C7\u30FC\u30BF\u306F\u4FDD\u6301\u3057\u307E\u3059\u3002","Saving is unavailable here. You can keep playing; existing save data is preserved.")}function Li(){Fl++,clearInterval(Ws),Ws=void 0,Ol.cancel(),bt.cancel(),rn.halt(!0),Wt.cancelMotion(),He&&He.status!=="running"&&(ie("result").dataset.interruptedPending=String(!ie("result").classList.contains("visible")),ie("result").classList.add("visible"))}function ai(){He?.status==="running"&&(vn=!0),Li(),Pi()}function Yd(){ie("controls").replaceChildren(),Wt.anchors.forEach(i=>{let e=document.createElement("button");e.type="button",e.className="cell-control "+i.kind,e.dataset.kind=i.kind,e.dataset.index=String(i.index),e.dataset.cell=String(i.cell),e.addEventListener("click",t=>{if(!(!Ol.acceptClick(t,e)||He)){if(bt.unlock(t),rn.start(t),i.kind==="arrow"){let n=mt.allowedDirections?.[i.index]??[0,1,2,3];Zt.arrows[i.index]=n[(n.indexOf(Zt.arrows[i.index])+1)%n.length],bt.play("arrow")}else mt.waitCells?Zt.waits[i.index]=(Zt.waits[i.index]+1)%((mt.maxWait??2)+1):Zt.wait=(Zt.wait+1)%3,bt.play("wait");Wt.setEdit(Zt),xa(),pa(),e.classList.remove("changed"),requestAnimationFrame(()=>e.classList.add("changed"))}}),ie("controls").append(e)}),Wt.onProject(i=>{for(let e of i){let t=ie("controls").querySelector(`[data-kind="${e.kind}"][data-index="${e.index}"]`);t&&(t.style.left=e.x+"px",t.style.top=e.y+"px")}}),pa(),Ol.refresh()}function pa(){for(let i of ie("controls").querySelectorAll("button")){let e=+i.dataset.index,t=+i.dataset.cell;i.disabled=!!He;let n=st(`${Math.floor(t/mt.size)+1}\u884C${t%mt.size+1}\u5217`,`row ${Math.floor(t/mt.size)+1}, column ${t%mt.size+1}`);if(i.dataset.kind==="wait"){let s=Zt.waits?.[e]??Zt.wait;i.textContent=String(s),i.setAttribute("aria-label",st(`\u5F85\u6A5F ${e+1}\uFF1A${s}\u62CD\u3002${n}\u3002\u30BF\u30C3\u30D7\u3067\u5909\u66F4`,`Wait ${e+1}: ${s} beats. ${n}. Tap to change`)),i.dataset.value=String(s)}else{let s=Zt.arrows[e];i.textContent="",i.setAttribute("aria-label",st(`\u77E2\u5370 ${e+1}\uFF1A${["\u5317","\u6771","\u5357","\u897F"][s]}\u3002${n}\u3002\u30BF\u30C3\u30D7\u3067\u5909\u66F4`,`Arrow ${e+1}: ${["North","East","South","West"][s]}. ${n}. Tap to turn`)),i.dataset.direction=String(s)}}}function _a(i,e){if(Li(),mt=Dn.find(t=>t.id===i),!mt)throw Error("Unknown canonical stage");Zt=ct.levelId===i?structuredClone(ct.board):Js(mt),He=void 0,vn=!1,da=0,fa=!1,ie("game").dataset.settled="false",Wt.setLevel(mt,Zt),Wt.setReducedMotion(ct.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches),Yd(),$i("play"),xa(),e&&(bt.unlock(e),rn.start(e))}function Zd(){ie("progress-count").textContent=st(`${ct.cleared.length} / 18 \u9762 \u304A\u5C4A\u3051\u5B8C\u4E86`,`${ct.cleared.length} / 18 deliveries complete`),ie("journey-progress").style.setProperty("--complete",String(ct.cleared.length/18)),ie("journey-resume").textContent=st("\u3064\u3065\u304D\u304B\u3089 \xB7 "+ct.levelId,"Continue \xB7 "+ct.levelId),ie("journey-resume").hidden=!ga,Hd(ie("journey"),ct,Bt,_a)}function $i(i){Yt=i,document.body.dataset.screen=Yt,Wt.setScreen(Yt),ie("title").hidden=Yt!=="title",ie("levels").hidden=Yt!=="levels",ie("play-ui").hidden=Yt!=="play",ie("controls").hidden=Yt!=="play",ie("game").dataset.screen=Yt,ie("continue").hidden=!ga,Pi(),Yt==="levels"&&Zd()}function yh(i){Li(),He=void 0,vn=!1,fa=!1,Wt.setRun(),pa(),Pi(),i&&(bt.unlock(i),bt.play("undo"),rn.start(i))}function jd(){if(!He||He.status!=="running")return;let i=He;He=Wl(mt,Zt,He),Wt.setRun(He),Pi();let e=Fl,t=He.bots.filter((n,s)=>n.delivered&&!i.bots[s].delivered).length;if(He.status!=="running"){if(clearInterval(Ws),Ws=void 0,rn.halt(),He.status==="won"){let n=ct.cleared.length;ct.cleared.includes(mt.id)||ct.cleared.push(mt.id),fa=n<18&&ct.cleared.length===18,xa(),Pi()}setTimeout(()=>{Fl===e&&(bt.play(He?.status==="won"?fa?"complete":"clear":"collision"),ie("result").classList.add("visible"))},ct.settings.reducedMotion||Ii.matches?0:180)}else t&&setTimeout(()=>{Fl===e&&(bt.play("arrive"),rn.duck())},ct.settings.reducedMotion||Ii.matches?0:180)}function X_(i){if(bt.unlock(i),!He)Ol.cancel(),He=Ma(mt),Wt.setRun(He),vn=!1,bt.play("start");else{if(He.status!=="running")return;if(vn)vn=!1;else{ai();return}}rn.start(i),clearInterval(Ws),Ws=setInterval(jd,600),pa(),Pi()}function Pi(){ie("game").dataset.stage=mt.id,ie("game").dataset.run=He?.status??"editing",ie("game").dataset.tick=String(He?.tick??0),ie("game").dataset.paused=String(vn),ie("stage-id").textContent=`${mt.id} / 18`,ie("stage-name").textContent=mt.title[Bt],ie("lesson").textContent=mt.lesson[Bt],ie("status").textContent=He?He.status==="won"?st("\u304A\u5C4A\u3051\u5B8C\u4E86","Delivered"):He.status==="failed"?st("\u9053\u3092\u898B\u76F4\u305D\u3046","Let\u2019s try another route"):vn?st("\u4E00\u6642\u505C\u6B62","Paused"):st("\u914D\u9054\u4E2D","Delivering"):st("\u77E2\u5370\u3068\u6642\u8A08\u3092\u30BF\u30C3\u30D7\u3057\u3066\u3001\u51FA\u767A\u3002","Set the arrows and clocks. Then go."),ie("tick").textContent=He?st(`${He.tick} \u62CD`,`${He.tick} beats`):st("\u30EB\u30FC\u30C8\u3092\u6E96\u5099","Plan your route"),ie("delivery-count").innerHTML=mt.robots.map((e,t)=>`<span class="parcel ${t?"teal":"coral"} ${He?.bots[t]?.delivered?"delivered":""}">${e.id}<small>${He?.bots[t]?.delivered?"\u2713":"\u25C7"}</small></span>`).join("");let i=ie("go");if(i.textContent=He?.status==="running"?vn?st("\u25B6 \u7D9A\u3051\u308B","\u25B6 Resume"):st("\u2161 \u4E00\u6642\u505C\u6B62","\u2161 Pause"):st("\u25B6 \u51FA\u767A","\u25B6 Go"),i.disabled=!!He&&He.status!=="running",ie("step").hidden=!He||He.status!=="running"||!vn,ie("edit-route").hidden=!He,ie("reset").hidden=!!He,ie("result").hidden=!He||He.status==="running",(!He||He.status==="running")&&ie("result").classList.remove("visible"),He?.status==="failed"){let e={wall:["\u9053\u306E\u306A\u3044\u5834\u6240\u3078\u9032\u3082\u3046\u3068\u3057\u307E\u3057\u305F\u3002","A courier tried to leave the road."],boundary:["\u9053\u306E\u5916\u3078\u9032\u3082\u3046\u3068\u3057\u307E\u3057\u305F\u3002","A courier tried to leave the island."],"wrong-goal":["\u5225\u306E\u53D7\u53D6\u53E3\u3078\u5411\u304B\u3063\u3066\u3044\u307E\u3059\u3002","That depot belongs to the other courier."],collision:["\u540C\u3058\u30DE\u30B9\u306B\u3001\u3075\u305F\u308A\u304C\u6765\u3066\u3057\u307E\u3044\u307E\u3057\u305F\u3002","Both couriers need the same cell."],swap:["\u540C\u3058\u9053\u3067\u3059\u308C\u9055\u3046\u3053\u3068\u306F\u3067\u304D\u307E\u305B\u3093\u3002","The couriers cannot swap places on one beat."],loop:["\u540C\u3058\u9053\u3092\u56DE\u3063\u3066\u3044\u307E\u3059\u3002","The route keeps repeating."],limit:["\u9053\u304C\u9577\u304F\u7D9A\u304D\u3059\u304E\u3066\u3044\u307E\u3059\u3002","The route is taking too long."]},t={wall:["\u9053\u3092\u3064\u306A\u304E\u76F4\u305D\u3046","Keep to the path"],boundary:["\u9053\u3092\u3064\u306A\u304E\u76F4\u305D\u3046","Keep to the path"],"wrong-goal":["\u53D7\u53D6\u53E3\u3092\u78BA\u304B\u3081\u3088\u3046","Check the delivery address"],swap:["\u3059\u308C\u9055\u3046\u9053\u3092\u898B\u76F4\u305D\u3046","Make room to pass"],loop:["\u5225\u306E\u9053\u3092\u63A2\u305D\u3046","Find another way"],limit:["\u9053\u3092\u77ED\u304F\u3064\u306A\u3054\u3046","Try a shorter route"],collision:["\u3053\u3053\u3067\u9053\u304C\u91CD\u306A\u308A\u307E\u3057\u305F","Let\u2019s check the route"]};ie("result-kicker").textContent=st("\u3082\u3046\u4E00\u5EA6\u3001\u3086\u3063\u304F\u308A\u8003\u3048\u3088\u3046","A little rethink"),ie("result-title").textContent=t[He.reason??"collision"][Bt==="ja"?0:1],ie("result-copy").textContent=e[He.reason??"collision"][Bt==="ja"?0:1],ie("next").hidden=!0}else He?.status==="won"&&(ie("result-kicker").textContent="SPECIAL DELIVERY",ie("result-title").textContent=fa?st("18\u306E\u914D\u9054\u3001\u3042\u308A\u304C\u3068\u3046\u3002","Every parcel has found a home."):mt.robots.length===1?st("\u8377\u7269\u304C\u3001\u5C4A\u3044\u305F\uFF01","A little parcel. Delivered!"):st("\u3075\u305F\u308A\u3068\u3082\u3001\u5C4A\u3044\u305F\uFF01","Two little parcels. Delivered!"),ie("result-copy").textContent=st("\u3072\u3068\u3064\u8B72\u3063\u3066\u3001\u3072\u3068\u3064\u9032\u3080\u3002\u3044\u3044\u914D\u9054\u3067\u3057\u305F\u3002","A little patience. A lovely delivery."),ie("next").hidden=!1,ie("next").textContent=mt.id!=="D18"?st("\u6B21\u306E\u914D\u9054\u3078 \u2192","Next delivery \u2192"):st("\u914D\u9054\u3092\u9078\u3076 \u2192","Choose a delivery \u2192"));ie("accessible-state").textContent=(He?.bots??Ma(mt).bots).map(e=>`${e.id}: ${st("\u30DE\u30B9","cell")} ${e.p}, ${e.delivered?st("\u5230\u7740","delivered"):e.remaining?st(`\u3042\u3068${e.remaining}\u62CD\u5F85\u6A5F`,`waiting ${e.remaining} beats`):st("\u8D70\u884C\u53EF\u80FD","ready")}`).join(" / "),ie("hint-copy").textContent=da?mt.hints?.[da-1]?.[Bt]??"":"",qd()}function Jd(){document.documentElement.lang=Bt,document.querySelectorAll("[data-ja]").forEach(i=>i.textContent=i.dataset[Bt]??""),ie("language").textContent=Bt==="ja"?"EN":"JA",ie("language").setAttribute("aria-label",Bt==="ja"?"Switch to English":"\u65E5\u672C\u8A9E\u306B\u5207\u66FF");{let i=["a","b","c"].includes(ua.get("cover")??"")?ua.get("cover"):"a";for(let e of document.querySelectorAll('a[href="/"],a[data-portal-back],.brand'))e.href=`/${Bt}/games/tiny-delivery/`,e.dataset.portalBack="true",e.setAttribute("aria-label","Tinlumo"),e.closest(".game-footer")&&(e.textContent=st("\u904A\u3073\u65B9\u3078","How to play"))}pa(),Pi(),Yt==="levels"&&Zd()}document.addEventListener("keydown",i=>{i.repeat&&["Enter"," "].includes(i.key)&&i.preventDefault(),i.key==="Escape"&&Yt==="play"&&!ie("settings").open&&ai()});ie("start").addEventListener("click",i=>{Li(),$i("levels"),bt.unlock(i)});ie("continue").hidden=!ga;ie("continue").addEventListener("click",i=>_a(ct.levelId,i));ie("journey-resume").addEventListener("click",i=>_a(ct.levelId,i));ie("journey-next").addEventListener("click",i=>_a(_h(ct),i));ie("back-title").addEventListener("click",()=>{Li(),$i("title")});ie("back").addEventListener("click",()=>{Li(),$i("levels")});ie("go").addEventListener("click",X_);ie("step").addEventListener("click",i=>{He?.status==="running"&&vn&&(bt.unlock(i),jd())});ie("edit-route").addEventListener("click",yh);ie("retry").addEventListener("click",yh);ie("next").addEventListener("click",i=>{let e=Dn[Dn.indexOf(mt)+1];e?_a(e.id,i):(Li(),$i("levels"))});ie("result-levels").addEventListener("click",()=>{Li(),$i("levels")});ie("hint").addEventListener("click",()=>{da=da%2+1,Pi()});ie("reset").addEventListener("click",()=>{ai(),ie("confirm-reset").showModal()});ie("cancel-reset").addEventListener("click",()=>ie("confirm-reset").close());ie("confirm-initial").addEventListener("click",i=>{ie("confirm-reset").close(),Zt=Js(mt),Wt.setEdit(Zt),xa(),yh(i)});function $d(){ai(),ie("mute").checked=bt.preferences.mute,ie("sfx-gain").value=String(bt.preferences.gain),ie("music-enabled").checked=rn.preferences.enabled,ie("music-gain").value=String(rn.preferences.gain),ie("reduce").checked=ct.settings.reducedMotion,ie("settings").showModal()}ie("settings-button").addEventListener("click",$d);ie("title-settings").addEventListener("click",$d);ie("close-settings").addEventListener("click",()=>ie("settings").close());ie("mute").addEventListener("change",i=>{bt.set({mute:ie("mute").checked,gain:bt.preferences.gain}),rn.halt(!0),bt.preferences.mute||bt.unlock(i)});ie("sfx-gain").addEventListener("input",()=>bt.set({mute:bt.preferences.mute,gain:+ie("sfx-gain").value}));ie("music-enabled").addEventListener("change",()=>rn.set({...rn.preferences,enabled:ie("music-enabled").checked,direction:"D1"}));ie("music-gain").addEventListener("input",()=>rn.set({...rn.preferences,gain:+ie("music-gain").value,direction:"D1"}));ie("reduce").addEventListener("change",()=>{ct.settings.reducedMotion=ie("reduce").checked,Wt.setReducedMotion(ct.settings.reducedMotion||matchMedia("(prefers-reduced-motion: reduce)").matches),xa(!1)});ie("language").addEventListener("click",()=>{Bt=Bt==="ja"?"en":"ja";let i=new URL(location.href);i.searchParams.set("lang",Bt),history.replaceState(null,"",i),Jd()});document.addEventListener("visibilitychange",()=>{document.hidden&&ai()});window.addEventListener("pagehide",ai);window.addEventListener("blur",ai);window.addEventListener("pageshow",i=>{document.body.dataset.restored=i.persisted?"bfcache":"navigation"});var Wd=innerWidth+":"+innerHeight;window.addEventListener("resize",()=>{let i=innerWidth+":"+innerHeight;i!==Wd&&(Wd=i,ai())});var Ii=matchMedia("(prefers-reduced-motion: reduce)");Ii.addEventListener("change",()=>{ai(),Wt.setReducedMotion(ct.settings.reducedMotion||Ii.matches)});Yd();Jd();$i("title");document.body.dataset.reduce=String(ct.settings.reducedMotion||Ii.matches);var ma=document.createElement("div");ma.className="wait-feedback";ma.setAttribute("aria-hidden","true");ie("game").append(ma);var Ul=[];Wt.onCourierState(i=>{if(Ul.length!==i.length){ma.replaceChildren(),Ul.length=0;for(let e of i){let t=document.createElement("span");ma.append(t),Ul.push(t)}}i.forEach((e,t)=>{let n=Ul[t];if(n.hidden=Yt!=="play"||!e.waiting,n.hidden)return;let s=`${e.id} \xB7 \u25F7 ${e.remaining}`;n.textContent!==s&&(n.textContent=s);let r=e.x+"px",a=e.y+"px";n.style.left!==r&&(n.style.left=r),n.style.top!==a&&(n.style.top=a)})});var zl=document.createElement("p");zl.className="settings-note";ie("settings").append(zl);setInterval(()=>{zl.hidden=!bt.storageFailed&&!rn.storageFailed,zl.textContent=st("\u97F3\u8A2D\u5B9A\u3092\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3002\u3053\u306E\u753B\u9762\u5185\u306E\u5909\u66F4\u306F\u6709\u52B9\u3067\u3059\u3002","Sound settings could not be saved. Changes still apply to this visit.")},1e3);document.addEventListener("pointerdown",i=>{Yt==="play"&&bt.unlock(i)},!0);document.addEventListener("keydown",i=>{Yt==="play"&&!i.repeat&&bt.unlock(i)},!0);ie("reduce").addEventListener("change",()=>{document.body.dataset.reduce=String(ct.settings.reducedMotion||Ii.matches)});Ii.addEventListener("change",()=>{document.body.dataset.reduce=String(ct.settings.reducedMotion||Ii.matches)});requestAnimationFrame(()=>{ie("loading").hidden=!0,document.body.dataset.ready="true"});var kl;window.addEventListener("pagehide",()=>{try{kl=localStorage.getItem("wgs:save:tiny-delivery")}catch{kl=void 0}});window.addEventListener("pageshow",i=>{if(i.persisted&&kl!==void 0)try{localStorage.getItem("wgs:save:tiny-delivery")!==kl&&location.reload()}catch{location.reload()}});window.addEventListener("storage",i=>{(i.key==="wgs:save:tiny-delivery"&&i.newValue===null||i.key===null)&&location.reload()});var Xs=document.createElement("a");Xs.href="/"+Bt+"/settings/#hakorilo-save";Xs.textContent=st("\u4FDD\u5B58\u306E\u8A2D\u5B9A\u30FB\u9032\u884C\u306E\u6D88\u53BB","Save settings / erase progress");Xs.style.cssText="display:inline-flex;min-height:44px;align-items:center;text-decoration:underline;font-size:12px";ie("settings").append(Xs);ie("language").addEventListener("click",()=>{Xs.href="/"+Bt+"/settings/#hakorilo-save",Xs.textContent=st("\u4FDD\u5B58\u306E\u8A2D\u5B9A\u30FB\u9032\u884C\u306E\u6D88\u53BB","Save settings / erase progress")});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
